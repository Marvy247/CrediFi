// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "../src/RWAAsset.sol";
import "../src/FractionalRWA.sol";
import "../src/CreditScoreOracle.sol";
import "../src/LendingPool.sol";

contract CrediFiTest is Test {
    RWAAsset public rwaAsset;
    FractionalRWA public fractionalRWA;
    CreditScoreOracle public creditScoreOracle;
    LendingPool public lendingPool;
    
    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    address public liquidityProvider = address(4);
    
    function setUp() public {
        vm.startPrank(owner);
        
        rwaAsset = new RWAAsset();
        fractionalRWA = new FractionalRWA();
        creditScoreOracle = new CreditScoreOracle();
        lendingPool = new LendingPool(address(creditScoreOracle), address(rwaAsset));
        
        vm.stopPrank();
        
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
        vm.deal(liquidityProvider, 100 ether);
    }
    
    function testMintRWAAsset() public {
        vm.prank(user1);
        uint256 tokenId = rwaAsset.mintAsset(
            user1,
            RWAAsset.AssetType.Land,
            "Lagos, Nigeria",
            10 ether,
            "QmHash123"
        );
        
        assertEq(rwaAsset.ownerOf(tokenId), user1);
        RWAAsset.AssetMetadata memory metadata = rwaAsset.getAssetMetadata(tokenId);
        assertEq(uint(metadata.assetType), uint(RWAAsset.AssetType.Land));
        assertEq(metadata.valuation, 10 ether);
    }
    
    function testVerifyAsset() public {
        vm.prank(user1);
        uint256 tokenId = rwaAsset.mintAsset(user1, RWAAsset.AssetType.Land, "Lagos, Nigeria", 10 ether, "QmHash123");
        
        vm.prank(owner);
        rwaAsset.updateVerificationStatus(tokenId, RWAAsset.VerificationStatus.Verified);
        
        RWAAsset.AssetMetadata memory metadata = rwaAsset.getAssetMetadata(tokenId);
        assertEq(uint(metadata.verificationStatus), uint(RWAAsset.VerificationStatus.Verified));
    }
    
    function testFractionalizeAsset() public {
        vm.prank(owner);
        uint256 assetId = fractionalRWA.fractionalizeAsset(1, 1000, 0.01 ether, "ipfs://metadata");
        
        assertEq(fractionalRWA.balanceOf(address(fractionalRWA), assetId), 1000);
    }
    
    function testPurchaseShares() public {
        vm.prank(owner);
        uint256 assetId = fractionalRWA.fractionalizeAsset(1, 1000, 0.01 ether, "ipfs://metadata");
        
        vm.prank(user1);
        fractionalRWA.purchaseShares{value: 0.1 ether}(assetId, 10);
        
        assertEq(fractionalRWA.balanceOf(user1, assetId), 10);
    }
    
    function testCreditScoreCalculation() public {
        vm.prank(owner);
        creditScoreOracle.updateCreditHistory(user1, 10, 9, 100 ether, 90 ether);
        
        (uint256 score, uint256 ltvRatio, uint256 interestRate) = creditScoreOracle.getCreditScore(user1);
        
        assertEq(score, 90);
        assertGt(ltvRatio, 50);
        assertLt(interestRate, 1000);
    }
    
    function testDepositToPool() public {
        vm.prank(liquidityProvider);
        lendingPool.deposit{value: 10 ether}();
        
        assertEq(lendingPool.totalLiquidity(), 10 ether);
        (uint256 deposited,) = lendingPool.liquidityProviders(liquidityProvider);
        assertEq(deposited, 10 ether);
    }
    
    function testBorrowFromPool() public {
        vm.prank(user1);
        uint256 tokenId = rwaAsset.mintAsset(user1, RWAAsset.AssetType.Land, "Lagos, Nigeria", 10 ether, "QmHash123");
        
        vm.prank(owner);
        rwaAsset.updateVerificationStatus(tokenId, RWAAsset.VerificationStatus.Verified);
        
        vm.prank(owner);
        creditScoreOracle.updateCreditHistory(user1, 10, 10, 100 ether, 100 ether);
        
        vm.prank(liquidityProvider);
        lendingPool.deposit{value: 20 ether}();
        
        vm.startPrank(user1);
        rwaAsset.approve(address(lendingPool), tokenId);
        uint256 loanId = lendingPool.borrow(tokenId, 5 ether);
        vm.stopPrank();
        
        assertEq(lendingPool.totalBorrowed(), 5 ether);
        LendingPool.Loan memory loan = lendingPool.getLoanDetails(loanId);
        assertTrue(loan.active);
        assertEq(loan.borrower, user1);
    }
    
    function testRepayLoan() public {
        vm.prank(user1);
        uint256 tokenId = rwaAsset.mintAsset(user1, RWAAsset.AssetType.Land, "Lagos, Nigeria", 10 ether, "QmHash123");
        
        vm.prank(owner);
        rwaAsset.updateVerificationStatus(tokenId, RWAAsset.VerificationStatus.Verified);
        
        vm.prank(owner);
        creditScoreOracle.updateCreditHistory(user1, 10, 10, 100 ether, 100 ether);
        
        vm.prank(liquidityProvider);
        lendingPool.deposit{value: 20 ether}();
        
        vm.startPrank(user1);
        rwaAsset.approve(address(lendingPool), tokenId);
        uint256 loanId = lendingPool.borrow(tokenId, 5 ether);
        
        lendingPool.repay{value: 6 ether}(loanId);
        vm.stopPrank();
        
        LendingPool.Loan memory loan = lendingPool.getLoanDetails(loanId);
        assertFalse(loan.active);
        assertEq(rwaAsset.ownerOf(tokenId), user1);
    }
    
    function testWithdrawFromPool() public {
        vm.prank(liquidityProvider);
        lendingPool.deposit{value: 10 ether}();
        
        vm.prank(liquidityProvider);
        lendingPool.withdraw(5 ether);
        
        assertEq(lendingPool.totalLiquidity(), 5 ether);
    }
}
