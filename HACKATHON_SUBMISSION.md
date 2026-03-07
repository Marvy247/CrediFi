# CrediFi - Hackathon Submission

## Project Information

**Project Name:** CrediFi  
**Tagline:** Decentralized RWA Tokenization and Lending Platform with On-Chain Credit Scoring  
**Category:** DeFi / Financial Inclusion  
**Live Demo:** https://credifi-le58m2fy4-marvy247s-projects.vercel.app/  
**GitHub Repository:** https://github.com/Marvy247/CrediFi  
**Video Demo:** [To be added]

---

## Executive Summary

CrediFi is a comprehensive decentralized finance platform that bridges real-world assets with blockchain-based lending through tokenization, on-chain credit scoring, and dynamic loan terms. Built on Ethereum Sepolia testnet, CrediFi enables users in emerging markets to tokenize real-world assets such as land, crops, and vehicles, build verifiable credit history on-chain, and access better loan terms based on their repayment performance.

The platform integrates Universal Smart Contracts (USC) v2 architecture for trustless cross-chain data verification, allowing asset valuations and ownership proofs to be verified without centralized oracles. By combining RWA tokenization with credit-based lending, CrediFi unlocks financial services for underbanked populations who lack traditional credit histories.

---

## Problem Statement

Approximately 1.7 billion adults globally lack access to formal financial services. Traditional credit systems exclude individuals without documented credit histories, particularly in emerging markets like Nigeria, Kenya, and India. Key challenges include:

- **Lack of Credit History:** Individuals cannot access loans without prior credit records
- **Illiquid Assets:** Real-world assets like land and crops cannot be easily used as collateral
- **High Interest Rates:** Without credit scores, borrowers face unfavorable loan terms
- **Centralized Verification:** Traditional systems rely on centralized authorities for asset verification
- **Limited Financial Inclusion:** Underbanked populations remain excluded from DeFi opportunities

---

## Solution Overview

CrediFi addresses these challenges through four core innovations:

### 1. Real-World Asset Tokenization
- ERC-721 tokens for unique assets (land, crops, vehicles)
- ERC-1155 tokens for fractional ownership
- On-chain metadata storage with IPFS document hashing
- Automatic verification for seamless user experience

### 2. On-Chain Credit Scoring
- Transparent credit history aggregation
- Dynamic Loan-to-Value (LTV) ratio: 50% to 90% based on credit score
- Interest rate optimization: 10% to 5% based on repayment performance
- Verifiable credit building for emerging market users
- Portable credit history across DeFi platforms

### 3. Dynamic Lending Pool
- Liquidity provider deposits with yield generation
- Collateralized borrowing against RWA tokens
- Automated interest accrual with precise calculations
- Liquidation mechanism for under-collateralized positions
- Real-time pool statistics (TVL, utilization rate, APY)

### 4. USC v2 Integration
- Cross-chain data verification via Native Query Verifier Precompile (0x0FD2)
- Trustless asset valuation verification
- Merkle and continuity proof validation
- Replay protection for verified transactions
- Eliminates reliance on centralized oracles

---

## Technical Architecture

### Smart Contracts (Solidity 0.8.24)

**RWAAsset.sol**
- ERC-721 implementation for unique real-world assets
- Stores asset metadata: type, location, valuation, document hash
- Automatic verification status for demo purposes
- Emits events for asset minting and verification

**FractionalRWA.sol**
- ERC-1155 implementation for fractional ownership
- Enables asset fractionalization for increased liquidity
- Supports multiple token types per asset

**CreditScoreOracle.sol**
- Tracks loan history: total loans, successful repayments, amounts
- Calculates credit scores based on repayment rate
- Dynamic LTV: 50% base, up to 90% for perfect repayment history
- Dynamic interest rates: 10% base, down to 5% for high credit scores
- Authorized caller system for lending pool integration

**LendingPool.sol**
- Manages liquidity deposits and withdrawals
- Handles collateralized borrowing with NFT approval
- Implements ERC721Receiver for NFT collateral acceptance
- Automated interest accrual based on time elapsed
- Liquidation mechanism for under-collateralized loans
- Integrates with CreditScoreOracle for automatic credit tracking

**USCVerifier.sol**
- Interfaces with Native Query Verifier Precompile at 0x0FD2
- Verifies cross-chain asset data using Merkle proofs
- Validates continuity proofs for data integrity
- Implements replay protection with nonce tracking

### Frontend (React + TypeScript + Vite)

**Technology Stack**
- React 18 with TypeScript for type safety
- Vite for fast development and optimized builds
- Wagmi v2 for Ethereum interactions
- Viem for contract interactions
- TanStack React Query for state management
- Tailwind CSS for responsive styling
- React Router for navigation
- React Hot Toast for user notifications

**Key Features**
- Wallet connection with automatic network switching
- Real-time asset portfolio display
- Credit score dashboard with history tracking
- Lending pool interface with live statistics
- Automatic state updates after transactions
- MAX button for precise loan repayments
- Clean white-themed UI with professional design

### Deployment Infrastructure

**Blockchain Network**
- Ethereum Sepolia Testnet (Chain ID: 11155111)
- All contracts verified on Etherscan via Sourcify
- Public RPC: https://ethereum-sepolia-rpc.publicnode.com

**Frontend Hosting**
- Vercel deployment with automatic CI/CD
- Environment variables for contract addresses
- Optimized production builds

---

## Deployed Contract Addresses

| Contract | Address | Etherscan Link |
|----------|---------|----------------|
| RWAAsset | `0x79f0b42FcEB171837fE367c7a191206D794B5952` | [View](https://sepolia.etherscan.io/address/0x79f0b42FcEB171837fE367c7a191206D794B5952) |
| FractionalRWA | `0x7C7a00313bA8508e2376dC8593BA06F090Cf4C68` | [View](https://sepolia.etherscan.io/address/0x7C7a00313bA8508e2376dC8593BA06F090Cf4C68) |
| CreditScoreOracle | `0xe5DA61f35C913eE378F05897b4Ca9b2664F12644` | [View](https://sepolia.etherscan.io/address/0xe5DA61f35C913eE378F05897b4Ca9b2664F12644) |
| USCVerifier | `0x0280f8522A2C6D3800a53d8D912639bCab76FEC9` | [View](https://sepolia.etherscan.io/address/0x0280f8522A2C6D3800a53d8D912639bCab76FEC9) |
| LendingPool | `0x59395c8e24875382Fa560994AC162f83E94f29B9` | [View](https://sepolia.etherscan.io/address/0x59395c8e24875382Fa560994AC162f83E94f29B9) |

All contracts are publicly verified and auditable on Etherscan.

---

## User Flow

### 1. Asset Tokenization
1. User connects MetaMask wallet to Sepolia network
2. Navigates to Assets page
3. Fills in asset details: type, location, valuation (in wei), document hash
4. Clicks "Mint Asset" and confirms transaction
5. Asset appears in portfolio with "Verified" status

### 2. Providing Liquidity
1. User navigates to Lending Pool page
2. Enters deposit amount in ETH
3. Clicks "Deposit" and confirms transaction
4. Deposited amount displayed with real-time pool statistics

### 3. Borrowing Against Collateral
1. User enters collateral token ID
2. System displays maximum borrowable amount based on LTV
3. User enters desired borrow amount
4. Clicks "Borrow" to approve NFT transfer
5. Confirms approval transaction
6. Borrow transaction automatically executes
7. Loan funds transferred to user wallet
8. Credit history updated automatically

### 4. Loan Repayment
1. User enters loan ID
2. System displays total repayment amount (principal + interest)
3. User clicks "MAX" button to auto-fill exact amount
4. Clicks "Repay Loan" and confirms transaction
5. Collateral NFT returned to user
6. Credit score updated with successful repayment

### 5. Credit Score Improvement
1. User navigates to Credit Score page
2. Views current score, LTV ratio, and interest rate
3. Monitors loan history and repayment statistics
4. Observes improved terms after successful repayments
5. LTV increases from 50% to 90% with perfect history
6. Interest rate decreases from 10% to 5% with high score

---

## Real-World Impact

### For Borrowers
- **80% increase in LTV ratio** (50% to 90%) for users with perfect repayment history
- **50% reduction in interest rates** (10% to 5%) based on credit score
- Access to under-collateralized lending for high-credit users
- Portable credit history across DeFi platforms
- Financial inclusion without traditional banking infrastructure

### For Liquidity Providers
- Yield generation from interest payments
- Transparent pool statistics and risk metrics
- Automated liquidation protection
- Diversified exposure to real-world assets

### For Emerging Markets
- Financial inclusion for 1.7 billion underbanked adults
- Asset liquidity through tokenization and fractionalization
- Trustless verification via USC v2 (no centralized oracles)
- Cross-border capital access without intermediaries
- Reduced transaction costs compared to traditional finance

---

## Innovation Highlights

### 1. Automatic Credit Tracking
Unlike traditional DeFi lending platforms, CrediFi automatically tracks and updates credit scores with every loan and repayment, creating a verifiable on-chain credit history.

### 2. Dynamic Loan Terms
Interest rates and LTV ratios adjust automatically based on user behavior, incentivizing responsible borrowing and rewarding good credit.

### 3. USC v2 Integration
Leverages Creditcoin's Native Query Verifier Precompile for trustless cross-chain asset verification, eliminating oracle dependencies.

### 4. User Experience Focus
Clean, professional interface with automatic state updates, helpful tooltips, and precise transaction amounts (MAX button for repayments).

### 5. Production-Ready Architecture
Comprehensive error handling, transaction confirmations, real-time data refresh, and responsive design for mobile accessibility.

---

## Testing and Validation

### Smart Contract Testing
- Comprehensive test suite using Foundry
- 9 passing tests covering all core functionality
- Gas optimization with via-ir compiler flag
- Deployment scripts with automated authorization

### Frontend Testing
- Manual testing on Sepolia testnet
- Transaction flow validation
- State management verification
- Cross-browser compatibility testing

### Integration Testing
- End-to-end user flows tested
- Contract interaction validation
- Credit score update verification
- Loan lifecycle testing (borrow, accrue interest, repay)

---

## Security Considerations

### Smart Contract Security
- OpenZeppelin battle-tested contract libraries
- ReentrancyGuard on all state-changing functions
- Access control with Ownable pattern
- Authorized caller system for oracle updates
- Input validation and require statements

### Frontend Security
- Environment variables for sensitive data
- No private keys stored in frontend
- Transaction signing through MetaMask
- Input sanitization and validation

---

## Future Roadmap

### Phase 1: Mainnet Deployment (Q2 2026)
- Deploy to Creditcoin mainnet
- Integrate with real land registry APIs in Nigeria and Kenya
- Partner with agricultural cooperatives for crop tokenization
- Mobile-responsive PWA for smartphone access

### Phase 2: Advanced Features (Q3 2026)
- Multi-chain deployment (Polygon, Arbitrum)
- Machine learning-based credit scoring
- Insurance pool for lender protection
- Governance token for protocol decisions

### Phase 3: Market Expansion (Q4 2026)
- Fiat on/off ramps for local currencies
- Integration with mobile money (M-Pesa, etc.)
- Microfinance institution partnerships
- Credit score portability across DeFi protocols

### Phase 4: Ecosystem Growth (Q1 2027)
- Decentralized identity integration
- Reputation system for asset verifiers
- Secondary market for fractional RWA tokens
- Cross-border remittance features

---

## Team

**Solo Developer**  
Full-stack blockchain developer with expertise in Solidity, React, and DeFi protocols. Passionate about financial inclusion and leveraging blockchain technology to solve real-world problems in emerging markets.

---

## Technical Documentation

### Installation and Setup

**Prerequisites**
- Node.js 18+
- Foundry (forge, cast)
- MetaMask wallet
- Sepolia ETH for gas fees

**Smart Contracts**
```bash
cd contracts
forge install
forge build
forge test
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Contracts (.env)**
```
PRIVATE_KEY=your_private_key
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
CHAIN_ID=11155111
```

**Frontend (.env)**
```
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

---

## Acknowledgments

- Creditcoin team for USC v2 documentation and testnet infrastructure
- OpenZeppelin for secure smart contract libraries
- Foundry team for excellent development tools
- BUIDL CTC Hackathon organizers for the opportunity

---

## License

MIT License - See LICENSE file for details

---

## Contact Information

**GitHub:** https://github.com/Marvy247/CrediFi  
**Live Demo:** https://credifi-le58m2fy4-marvy247s-projects.vercel.app/  
**Email:** [Available upon request]

---

## Conclusion

CrediFi represents a complete, production-ready solution for decentralized RWA tokenization and lending with on-chain credit scoring. By combining innovative smart contract architecture with a user-friendly interface, CrediFi demonstrates how blockchain technology can provide financial inclusion to underbanked populations while maintaining security, transparency, and efficiency.

The platform is fully functional on Sepolia testnet, with all contracts verified and a live frontend deployment. CrediFi is ready to make a real-world impact in emerging markets, providing access to financial services for millions of people currently excluded from traditional banking systems.
