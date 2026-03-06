# CrediFi - BUIDL CTC Hackathon Submission

## Project Title
CrediFi: Decentralized RWA Tokenization and Lending Platform with On-Chain Credit Scoring

## Tagline
Unlocking financial inclusion in emerging markets through RWA tokenization and credit-based DeFi lending.

---

## Problem Statement

1.7 billion adults globally lack access to formal financial services, with the majority concentrated in emerging markets such as Nigeria, Kenya, and India. Traditional credit systems exclude these individuals because they lack documented credit histories, preventing them from accessing loans, mortgages, and other financial products.

Key challenges:
- No verifiable credit history for underbanked populations
- Real-world assets (land, crops, vehicles) cannot be easily used as collateral in DeFi
- Centralized oracles create trust issues for cross-chain asset verification
- High interest rates and low LTV ratios for first-time borrowers
- Credit scores are not portable across financial platforms

---

## Solution Overview

CrediFi is a comprehensive DeFi platform that bridges real-world assets with decentralized finance through three core innovations:

### 1. RWA Tokenization
Users can tokenize real-world assets as ERC-721 tokens (unique assets) or ERC-1155 tokens (fractional ownership). Each token contains verifiable metadata including asset type, location, valuation, and IPFS document hashes for ownership proofs.

### 2. On-Chain Credit Scoring
CrediFi tracks loan history on-chain to calculate dynamic credit scores. Users with perfect repayment records unlock:
- Up to 90% LTV ratios (from 50% baseline)
- Interest rates as low as 5% (from 10% baseline)
- Access to under-collateralized lending for high-credit users

### 3. Credit-Based DeFi Lending
A lending pool connects liquidity providers with borrowers. Loan terms are automatically calculated based on:
- Borrower's on-chain credit score
- RWA collateral valuation
- Pool utilization rate

---

## How It Leverages Creditcoin Ecosystem

CrediFi is built specifically for the Creditcoin ecosystem and leverages its core primitives:

### USC v2 Native Query Verifier
- Integrates the Native Query Verifier Precompile at address 0x0FD2
- Enables trustless cross-chain verification of asset valuations and ownership proofs
- Validates Merkle and continuity proofs without centralized oracles
- Implements replay protection for verified transactions

### On-Chain Credit Primitives
- Designed to integrate with Creditcoin's native credit history data
- Aggregates loans, repayments, and offers for credit score calculation
- Creates portable credit history that follows users across platforms

### Decentralized Oracle Architecture
- USC v2 eliminates reliance on centralized oracles
- Trustless data provisioning for asset verification
- Cross-chain interoperability for multi-blockchain asset verification

### Technical Implementation
- USCVerifier contract implements verifyAssetData() function
- Calls VERIFIER.verifyAndEmit() for synchronous proof verification
- Stores verification records with chainKey, blockHeight, and transactionIndex
- Tracks processed assets to prevent duplicate verifications

---

## Real-World Impact in Emerging Markets

### For Borrowers
- **80% increase in borrowing power**: LTV ratio improves from 50% to 90% with good credit
- **50% reduction in interest costs**: Rates drop from 10% to 5% based on repayment history
- **Asset liquidity**: Convert illiquid real-world assets into DeFi collateral
- **Portable credit**: Build verifiable on-chain credit history that follows users

### For Liquidity Providers
- **Yield generation**: Earn interest from borrower repayments
- **Transparent risk metrics**: Real-time pool statistics and utilization rates
- **Automated protection**: Liquidation mechanism for under-collateralized positions

### For Emerging Markets
- **Financial inclusion**: Access to DeFi for 1.7 billion unbanked adults
- **No traditional banking required**: Smartphone + crypto wallet is sufficient
- **Trustless verification**: USC v2 eliminates need for centralized authorities
- **Cross-border capital**: Connect global liquidity with local borrowers

### Use Cases
1. **Nigerian farmer**: Tokenizes land title, borrows against it to buy seeds, repays after harvest, builds credit for next season
2. **Kenyan entrepreneur**: Tokenizes vehicle, uses as collateral for business loan, improves credit score for future expansion
3. **Indian smallholder**: Fractionalizes crop yield, sells shares to investors, uses proceeds for equipment upgrades

---

## Technology Stack

### Smart Contracts
- Solidity 0.8.24 with via-IR optimization
- Foundry for development, testing, and deployment
- OpenZeppelin contracts for security standards
- 5 core contracts: RWAAsset, FractionalRWA, CreditScoreOracle, USCVerifier, LendingPool

### Frontend
- React 18 with TypeScript
- Wagmi v2 for Ethereum interactions
- Viem for contract interactions
- TanStack React Query for state management
- Tailwind CSS for responsive design

### Blockchain
- Deployed on Ethereum Sepolia Testnet (Chain ID: 11155111)
- All contracts verified on Etherscan via Sourcify
- Ready for Creditcoin mainnet deployment

---

## Deployed Contracts (Sepolia Testnet)

| Contract | Address | Verified |
|----------|---------|----------|
| RWAAsset | [0xaA5685419dBd36d93dD4627da89B8f94c39399C4](https://sepolia.etherscan.io/address/0xaA5685419dBd36d93dD4627da89B8f94c39399C4) | ✅ |
| FractionalRWA | [0x3b097f7C439B62B293F5c013685605de3B446152](https://sepolia.etherscan.io/address/0x3b097f7C439B62B293F5c013685605de3B446152) | ✅ |
| CreditScoreOracle | [0x95c033E817023e2B1C4e6e55F70d488FeC39fd24](https://sepolia.etherscan.io/address/0x95c033E817023e2B1C4e6e55F70d488FeC39fd24) | ✅ |
| USCVerifier | [0xe7c3C0f487Fa701373EA119041c3653Cf4F86063](https://sepolia.etherscan.io/address/0xe7c3C0f487Fa701373EA119041c3653Cf4F86063) | ✅ |
| LendingPool | [0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4](https://sepolia.etherscan.io/address/0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4) | ✅ |

All contracts are publicly auditable and verified on Etherscan.

---

## Key Features Implemented

### RWA Tokenization
- Mint ERC-721 tokens for unique assets
- Fractionalize assets into ERC-1155 tokens
- Store metadata on-chain with IPFS document hashing
- Asset verification status tracking

### Credit Scoring System
- Aggregate credit history (loans, repayments, amounts)
- Calculate credit scores (0-100 scale)
- Dynamic LTV ratio calculation (50% to 90%)
- Dynamic interest rate calculation (10% to 5%)

### Lending Pool
- Liquidity provider deposits and withdrawals
- Collateralized borrowing against RWA tokens
- Automated interest accrual
- Liquidation mechanism for unhealthy loans
- Real-time pool statistics (TVL, utilization, APY)

### USC v2 Integration
- USCVerifier contract with Native Query Verifier integration
- Cross-chain asset data verification
- Merkle and continuity proof validation
- Verification record storage and tracking

### User Interface
- Wallet connection with network switching
- Asset minting and portfolio management
- Credit score dashboard with impact metrics
- Lending pool interface (deposit, withdraw, borrow, repay)
- Mobile-responsive design
- Transaction notifications and error handling

---

## Testing and Quality Assurance

### Smart Contract Testing
- Comprehensive test suite with Foundry
- 9 core tests covering all contract functionality
- 100% test pass rate
- Gas optimization with via-IR compilation

### Deployment Verification
- All contracts deployed to Sepolia testnet
- Source code verified on Etherscan via Sourcify
- Contract interactions tested via cast commands
- Read functions validated on-chain

### Frontend Testing
- Build successful with TypeScript strict mode
- Wagmi integration tested with Sepolia network
- Contract ABI integration verified
- Responsive design tested across devices

---

## Future Roadmap

### Phase 1: Creditcoin Mainnet (Q2 2026)
- Deploy to Creditcoin mainnet
- Integrate with real land registry APIs (Nigeria, Kenya)
- Partner with agricultural cooperatives
- Launch mobile PWA for smartphone access

### Phase 2: Advanced Features (Q3 2026)
- Multi-chain deployment (Polygon, Arbitrum)
- Machine learning credit scoring
- Insurance pool for lender protection
- Governance token launch

### Phase 3: Market Expansion (Q4 2026)
- Fiat on/off ramps for local currencies
- Mobile money integration (M-Pesa, etc.)
- Microfinance institution partnerships
- Credit score portability across DeFi protocols

### Phase 4: Ecosystem Growth (2027)
- Decentralized identity integration
- Reputation system for asset verifiers
- Secondary market for fractional RWA tokens
- Cross-border remittance features

---

## Hackathon Theme Alignment: BUIDL For The Real World

CrediFi directly addresses the hackathon theme by:

1. **Solving Real Problems**: Tackles financial exclusion affecting 1.7 billion people
2. **Real-World Assets**: Enables tokenization of tangible assets (land, crops, vehicles)
3. **Real Impact**: Provides measurable improvements in loan terms and access to capital
4. **Real Users**: Designed for emerging market populations in Nigeria, Kenya, and India
5. **Real Integration**: Leverages Creditcoin's USC v2 for trustless verification

The platform creates a bridge between the physical world (real-world assets) and the digital world (DeFi), enabling financial inclusion for populations that traditional systems have left behind.

---

## Team

Solo developer with expertise in:
- Smart contract development (Solidity, Foundry)
- Full-stack web development (React, TypeScript)
- DeFi protocol design
- Financial inclusion initiatives

Built specifically for the BUIDL CTC Hackathon with a focus on leveraging Creditcoin's USC v2 architecture.

---

## Repository and Demo

- **GitHub Repository**: [Link to be provided]
- **Live Demo**: [Link to be provided]
- **Demo Video**: [Link to be provided]
- **Documentation**: Comprehensive README, deployment guide, and demo script included

---

## Why CrediFi Should Win

1. **Complete Implementation**: Fully functional smart contracts, frontend, and USC v2 integration
2. **Real-World Focus**: Addresses genuine financial inclusion challenges in emerging markets
3. **Creditcoin Integration**: Leverages USC v2 Native Query Verifier for trustless verification
4. **Measurable Impact**: Quantifiable improvements in loan terms (80% LTV increase, 50% interest reduction)
5. **Production Ready**: All contracts deployed, verified, and tested on testnet
6. **Scalable Architecture**: Designed for multi-chain expansion and real-world adoption
7. **Innovation**: Combines RWA tokenization with on-chain credit scoring in a novel way
8. **Documentation**: Professional README, demo script, and deployment guides

CrediFi represents a complete, production-ready solution that directly aligns with Creditcoin's mission of bringing credit to the underbanked while showcasing the power of USC v2 for trustless cross-chain verification.

---

## Contact

For questions, partnerships, or technical discussions, please reach out via the GitHub repository or hackathon platform.

Thank you for considering CrediFi for the BUIDL CTC Hackathon.
