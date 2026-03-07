// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./CreditScoreOracle.sol";
import "./RWAAsset.sol";

contract LendingPool is Ownable, ReentrancyGuard, IERC721Receiver {
    CreditScoreOracle public creditScoreOracle;
    RWAAsset public rwaAsset;
    
    struct Loan {
        address borrower;
        uint256 collateralTokenId;
        uint256 borrowedAmount;
        uint256 interestRate;
        uint256 startTime;
        uint256 lastAccrualTime;
        uint256 accruedInterest;
        bool active;
    }
    
    struct LiquidityProvider {
        uint256 depositedAmount;
        uint256 lastDepositTime;
    }
    
    mapping(address => LiquidityProvider) public liquidityProviders;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public borrowerLoans;
    
    uint256 public totalLiquidity;
    uint256 public totalBorrowed;
    uint256 public loanIdCounter;
    uint256 public constant LIQUIDATION_THRESHOLD = 110;
    uint256 public constant PRECISION = 10000;
    
    event Deposited(address indexed provider, uint256 amount);
    event Withdrawn(address indexed provider, uint256 amount);
    event Borrowed(address indexed borrower, uint256 loanId, uint256 amount, uint256 collateralTokenId);
    event Repaid(address indexed borrower, uint256 loanId, uint256 amount);
    event Liquidated(uint256 indexed loanId, address indexed liquidator);
    
    constructor(address _creditScoreOracle, address _rwaAsset) Ownable(msg.sender) {
        creditScoreOracle = CreditScoreOracle(_creditScoreOracle);
        rwaAsset = RWAAsset(_rwaAsset);
    }
    
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Deposit must be greater than 0");
        
        liquidityProviders[msg.sender].depositedAmount += msg.value;
        liquidityProviders[msg.sender].lastDepositTime = block.timestamp;
        totalLiquidity += msg.value;
        
        emit Deposited(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        require(liquidityProviders[msg.sender].depositedAmount >= amount, "Insufficient balance");
        require(totalLiquidity - totalBorrowed >= amount, "Insufficient liquidity");
        
        liquidityProviders[msg.sender].depositedAmount -= amount;
        totalLiquidity -= amount;
        
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }
    
    function borrow(uint256 collateralTokenId, uint256 amount) external nonReentrant returns (uint256) {
        require(rwaAsset.ownerOf(collateralTokenId) == msg.sender, "Not collateral owner");
        require(amount > 0, "Borrow amount must be greater than 0");
        require(totalLiquidity - totalBorrowed >= amount, "Insufficient pool liquidity");
        
        RWAAsset.AssetMetadata memory metadata = rwaAsset.getAssetMetadata(collateralTokenId);
        require(metadata.verificationStatus == RWAAsset.VerificationStatus.Verified, "Asset not verified");
        
        (, uint256 ltvRatio, uint256 interestRate) = creditScoreOracle.getCreditScore(msg.sender);
        uint256 maxBorrow = (metadata.valuation * ltvRatio) / 100;
        require(amount <= maxBorrow, "Exceeds max LTV");
        
        rwaAsset.transferFrom(msg.sender, address(this), collateralTokenId);
        
        uint256 loanId = loanIdCounter++;
        loans[loanId] = Loan({
            borrower: msg.sender,
            collateralTokenId: collateralTokenId,
            borrowedAmount: amount,
            interestRate: interestRate,
            startTime: block.timestamp,
            lastAccrualTime: block.timestamp,
            accruedInterest: 0,
            active: true
        });
        
        borrowerLoans[msg.sender].push(loanId);
        totalBorrowed += amount;
        
        creditScoreOracle.recordLoan(msg.sender, amount);
        
        payable(msg.sender).transfer(amount);
        emit Borrowed(msg.sender, loanId, amount, collateralTokenId);
        
        return loanId;
    }
    
    function repay(uint256 loanId) external payable nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.active, "Loan not active");
        require(loan.borrower == msg.sender, "Not loan borrower");
        
        _accrueInterest(loanId);
        uint256 totalOwed = loan.borrowedAmount + loan.accruedInterest;
        require(msg.value >= totalOwed, "Insufficient repayment");
        
        loan.active = false;
        totalBorrowed -= loan.borrowedAmount;
        
        creditScoreOracle.recordRepayment(msg.sender, totalOwed);
        
        rwaAsset.transferFrom(address(this), msg.sender, loan.collateralTokenId);
        
        if (msg.value > totalOwed) {
            payable(msg.sender).transfer(msg.value - totalOwed);
        }
        
        emit Repaid(msg.sender, loanId, totalOwed);
    }
    
    function liquidate(uint256 loanId) external nonReentrant {
        Loan storage loan = loans[loanId];
        require(loan.active, "Loan not active");
        
        _accrueInterest(loanId);
        
        RWAAsset.AssetMetadata memory metadata = rwaAsset.getAssetMetadata(loan.collateralTokenId);
        uint256 totalOwed = loan.borrowedAmount + loan.accruedInterest;
        uint256 healthFactor = (metadata.valuation * 100) / totalOwed;
        
        require(healthFactor < LIQUIDATION_THRESHOLD, "Loan is healthy");
        
        loan.active = false;
        totalBorrowed -= loan.borrowedAmount;
        
        rwaAsset.transferFrom(address(this), msg.sender, loan.collateralTokenId);
        
        emit Liquidated(loanId, msg.sender);
    }
    
    function _accrueInterest(uint256 loanId) internal {
        Loan storage loan = loans[loanId];
        uint256 timeElapsed = block.timestamp - loan.lastAccrualTime;
        uint256 interest = (loan.borrowedAmount * loan.interestRate * timeElapsed) / (365 days * PRECISION);
        loan.accruedInterest += interest;
        loan.lastAccrualTime = block.timestamp;
    }
    
    function getLoanDetails(uint256 loanId) external view returns (Loan memory) {
        return loans[loanId];
    }
    
    function getRepaymentAmount(uint256 loanId) external view returns (uint256) {
        Loan memory loan = loans[loanId];
        require(loan.active, "Loan not active");
        
        uint256 timeElapsed = block.timestamp - loan.lastAccrualTime;
        uint256 interest = (loan.borrowedAmount * loan.interestRate * timeElapsed) / (365 days * PRECISION);
        return loan.borrowedAmount + loan.accruedInterest + interest;
    }
    
    function getUtilizationRate() external view returns (uint256) {
        if (totalLiquidity == 0) return 0;
        return (totalBorrowed * 100) / totalLiquidity;
    }
    
    function getAPY() external view returns (uint256) {
        if (totalLiquidity == 0) return 0;
        return (totalBorrowed * 1000) / totalLiquidity;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
