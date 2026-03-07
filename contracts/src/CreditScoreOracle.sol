// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditScoreOracle is Ownable {
    struct CreditHistory {
        uint256 totalLoans;
        uint256 successfulRepayments;
        uint256 totalBorrowed;
        uint256 totalRepaid;
        uint256 lastUpdateTimestamp;
    }

    struct CreditScore {
        uint256 score;
        uint256 ltvRatio;
        uint256 interestRate;
    }

    mapping(address => CreditHistory) public creditHistories;
    mapping(address => bool) public authorizedCallers;
    
    uint256 public constant BASE_LTV = 50;
    uint256 public constant MAX_LTV = 90;
    uint256 public constant BASE_INTEREST_RATE = 1000;
    uint256 public constant MIN_INTEREST_RATE = 500;

    event CreditHistoryUpdated(address indexed user, uint256 totalLoans, uint256 successfulRepayments);
    event CreditScoreCalculated(address indexed user, uint256 score, uint256 ltvRatio, uint256 interestRate);

    constructor() Ownable(msg.sender) {}

    function setAuthorizedCaller(address caller, bool authorized) external onlyOwner {
        authorizedCallers[caller] = authorized;
    }

    function recordLoan(address user, uint256 amount) external {
        require(authorizedCallers[msg.sender] || msg.sender == owner(), "Not authorized");
        CreditHistory storage history = creditHistories[user];
        history.totalLoans++;
        history.totalBorrowed += amount;
        history.lastUpdateTimestamp = block.timestamp;
    }

    function recordRepayment(address user, uint256 amount) external {
        require(authorizedCallers[msg.sender] || msg.sender == owner(), "Not authorized");
        CreditHistory storage history = creditHistories[user];
        history.successfulRepayments++;
        history.totalRepaid += amount;
        history.lastUpdateTimestamp = block.timestamp;
        emit CreditHistoryUpdated(user, history.totalLoans, history.successfulRepayments);
    }

    function updateCreditHistory(
        address user,
        uint256 totalLoans,
        uint256 successfulRepayments,
        uint256 totalBorrowed,
        uint256 totalRepaid
    ) external onlyOwner {
        creditHistories[user] = CreditHistory({
            totalLoans: totalLoans,
            successfulRepayments: successfulRepayments,
            totalBorrowed: totalBorrowed,
            totalRepaid: totalRepaid,
            lastUpdateTimestamp: block.timestamp
        });

        emit CreditHistoryUpdated(user, totalLoans, successfulRepayments);
    }

    function calculateCreditScore(address user) public view returns (CreditScore memory) {
        CreditHistory memory history = creditHistories[user];
        
        if (history.totalLoans == 0) {
            return CreditScore({
                score: 0,
                ltvRatio: BASE_LTV,
                interestRate: BASE_INTEREST_RATE
            });
        }

        uint256 repaymentRate = (history.successfulRepayments * 100) / history.totalLoans;
        uint256 score = repaymentRate;

        uint256 ltvRatio = BASE_LTV + ((repaymentRate * (MAX_LTV - BASE_LTV)) / 100);
        uint256 interestRate = BASE_INTEREST_RATE - ((repaymentRate * (BASE_INTEREST_RATE - MIN_INTEREST_RATE)) / 100);

        return CreditScore({
            score: score,
            ltvRatio: ltvRatio,
            interestRate: interestRate
        });
    }

    function getCreditHistory(address user) external view returns (CreditHistory memory) {
        return creditHistories[user];
    }

    function getCreditScore(address user) external view returns (uint256 score, uint256 ltvRatio, uint256 interestRate) {
        CreditScore memory cs = calculateCreditScore(user);
        return (cs.score, cs.ltvRatio, cs.interestRate);
    }
}
