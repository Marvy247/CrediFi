# CrediFi

Decentralized RWA tokenization and lending platform powered by on-chain credit scoring for financial inclusion in emerging markets.

## Description

CrediFi is a comprehensive DeFi platform that bridges real-world assets with decentralized finance through tokenization, on-chain credit scoring, and dynamic lending mechanisms. Built on Ethereum (Sepolia testnet), CrediFi enables users in emerging markets to tokenize real-world assets such as land, crops, and vehicles, build verifiable credit history on-chain, and access better loan terms based on their repayment performance.

The platform integrates Universal Smart Contracts (USC) v2 architecture for trustless cross-chain data verification, allowing asset valuations and ownership proofs to be verified without centralized oracles. By combining RWA tokenization with credit-based lending, CrediFi unlocks financial services for underbanked populations who lack traditional credit histories.

## Key Features

### RWA Tokenization
- ERC-721 tokens for unique real-world assets (land, crops, vehicles)
- ERC-1155 tokens for fractional ownership
- On-chain metadata storage with IPFS document hashing
- Asset verification status tracking

### On-Chain Credit Scoring
- Transparent credit history aggregation
- Dynamic LTV ratio calculation (50% to 90% based on credit score)
- Interest rate optimization (10% to 5% based on repayment performance)
- Verifiable credit building for emerging market users

### DeFi Lending Pool
- Liquidity provider deposits with yield generation
- Collateralized borrowing against RWA tokens
- Automated interest accrual
- Liquidation mechanism for under-collateralized positions
- Real-time pool statistics (TVL, utilization rate, APY)

### USC v2 Integration
- Cross-chain data verification via Native Query Verifier Precompile (0x0FD2)
- Trustless asset valuation verification
- Merkle and continuity proof validation
- Replay protection for verified transactions

### User Dashboard
- Real-time credit score display
- Loan term improvement tracking
- Asset portfolio management
- Transaction history and impact metrics

## Technology Stack

### Smart Contracts
- Solidity 0.8.24
- Foundry (development, testing, deployment)
- OpenZeppelin contracts (ERC-721, ERC-1155, access control)
- Via-IR optimization enabled

### Frontend
- React 18 with TypeScript
- Vite build tool
- Wagmi v2 for Ethereum interactions
- Viem for contract interactions
- TanStack React Query for state management
- Tailwind CSS for styling
- React Router for navigation
- React Hot Toast for notifications

### Blockchain
- Ethereum Sepolia Testnet
- Chain ID: 11155111
- Etherscan verification via Sourcify

## Installation and Setup

### Prerequisites
- Node.js 18+ and npm
- Foundry (forge, cast)
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

### Clone Repository
```bash
git clone <repository-url>
cd CrediFi
```

### Smart Contracts Setup
```bash
cd contracts
forge install
forge build
forge test
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Deployment Instructions

### Smart Contracts Deployment

1. Create `.env` file in `contracts/` directory:
```bash
PRIVATE_KEY=0x<your-private-key>
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
CHAIN_ID=11155111
```

2. Deploy contracts:
```bash
cd contracts
forge script script/Deploy.s.sol:Deploy --rpc-url $RPC_URL --broadcast --legacy
```

3. Verify contracts:
```bash
forge verify-contract <CONTRACT_ADDRESS> src/<CONTRACT_NAME>.sol:<CONTRACT_NAME> --chain sepolia --watch
```

### Frontend Deployment

1. Update contract addresses in `frontend/src/contracts/addresses.ts`

2. Build production bundle:
```bash
cd frontend
npm run build
```

3. Deploy `dist/` folder to hosting service (Vercel, Netlify, etc.)

## Deployed Contracts (Sepolia Testnet)

| Contract | Address | Explorer |
|----------|---------|----------|
| RWAAsset | `0xaA5685419dBd36d93dD4627da89B8f94c39399C4` | [View](https://sepolia.etherscan.io/address/0xaA5685419dBd36d93dD4627da89B8f94c39399C4) |
| FractionalRWA | `0x3b097f7C439B62B293F5c013685605de3B446152` | [View](https://sepolia.etherscan.io/address/0x3b097f7C439B62B293F5c013685605de3B446152) |
| CreditScoreOracle | `0x95c033E817023e2B1C4e6e55F70d488FeC39fd24` | [View](https://sepolia.etherscan.io/address/0x95c033E817023e2B1C4e6e55F70d488FeC39fd24) |
| USCVerifier | `0xe7c3C0f487Fa701373EA119041c3653Cf4F86063` | [View](https://sepolia.etherscan.io/address/0xe7c3C0f487Fa701373EA119041c3653Cf4F86063) |
| LendingPool | `0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4` | [View](https://sepolia.etherscan.io/address/0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4) |

All contracts are verified and publicly auditable on Etherscan.

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the navigation bar
- Approve MetaMask connection
- Ensure you are on Sepolia network (switch if prompted)

### 2. Tokenize Real-World Assets
- Navigate to "Assets" page
- Fill in asset details (type, location, valuation, document hash)
- Click "Mint Asset" and confirm transaction
- View your minted assets by entering token ID

### 3. Build Credit History
- Navigate to "Credit Score" page
- View your current credit score, LTV ratio, and interest rate
- Credit history updates automatically after loan repayments
- Monitor real-world impact metrics

### 4. Provide Liquidity
- Navigate to "Lending Pool" page
- Enter deposit amount in ETH
- Click "Deposit" and confirm transaction
- Earn yield based on pool utilization

### 5. Borrow Against Collateral
- Ensure your RWA asset is verified (contact admin)
- Navigate to "Lending Pool" page
- Enter collateral token ID and borrow amount
- Approve RWA token transfer
- Click "Borrow" and confirm transaction
- Loan terms are dynamically calculated based on your credit score

### 6. Repay Loans
- Navigate to "Lending Pool" page
- Enter loan ID and repayment amount (principal + interest)
- Click "Repay Loan" and confirm transaction
- Collateral is returned upon successful repayment
- Credit history is updated automatically

## Hackathon Alignment and Impact

### BUIDL For The Real World Theme

CrediFi directly addresses financial inclusion challenges in emerging markets by:

**Problem**: 1.7 billion adults globally lack access to formal financial services. Traditional credit systems exclude individuals without documented credit histories, particularly in emerging markets like Nigeria, Kenya, and India.

**Solution**: CrediFi enables users to:
- Tokenize real-world assets they already own (land, crops, vehicles)
- Build verifiable on-chain credit history through loan repayments
- Access better loan terms as credit improves (up to 90% LTV, down to 5% interest)
- Participate in DeFi without traditional banking infrastructure

### Real-World Impact Metrics

**For Borrowers**:
- 80% increase in LTV ratio (50% to 90%) for users with perfect repayment history
- 50% reduction in interest rates (10% to 5%) based on credit score
- Access to under-collateralized lending for high-credit users
- Portable credit history across platforms

**For Liquidity Providers**:
- Yield generation from interest payments
- Transparent pool statistics and risk metrics
- Automated liquidation protection

**For Emerging Markets**:
- Financial inclusion for underbanked populations
- Asset liquidity through tokenization and fractionalization
- Trustless verification via USC v2 (no centralized oracles)
- Cross-border capital access

### Creditcoin Ecosystem Integration

CrediFi leverages Creditcoin's core primitives:

1. **USC v2 Native Query Verifier**: Trustless cross-chain verification of asset valuations and ownership proofs via precompile at 0x0FD2

2. **On-Chain Credit Primitives**: Integration with Creditcoin's native credit history data (loans, repayments, offers) for credit score calculation

3. **Decentralized Oracle**: USC v2 eliminates reliance on centralized oracles for asset verification, ensuring trustless data provisioning

4. **Cross-Chain Interoperability**: Architecture supports verification of assets and credit data from multiple blockchains

## Team Information

Built for the BUIDL CTC Hackathon by a solo developer focused on financial inclusion and DeFi innovation.

## Future Roadmap

### Phase 1 (Post-Hackathon)
- Deploy to Creditcoin mainnet
- Integrate with real land registry APIs in Nigeria and Kenya
- Partner with agricultural cooperatives for crop tokenization
- Mobile-responsive PWA for smartphone access

### Phase 2 (Q2 2026)
- Multi-chain deployment (Polygon, Arbitrum)
- Advanced credit scoring with machine learning
- Insurance pool for lender protection
- Governance token for protocol decisions

### Phase 3 (Q3 2026)
- Fiat on/off ramps for local currencies
- Integration with mobile money (M-Pesa, etc.)
- Microfinance institution partnerships
- Credit score portability across DeFi protocols

### Phase 4 (Q4 2026)
- Decentralized identity integration
- Reputation system for asset verifiers
- Secondary market for fractional RWA tokens
- Cross-border remittance features

## License

MIT License

## Contact

For questions, partnerships, or support, please open an issue in this repository.

## Acknowledgments

- Creditcoin team for USC v2 documentation and testnet infrastructure
- OpenZeppelin for secure smart contract libraries
- Foundry team for excellent development tools
- BUIDL CTC Hackathon organizers
