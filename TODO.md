# CrediFi - BUIDL CTC Hackathon TODO Plan

## PHASE 1: SMART CONTRACT DEVELOPMENT ✅ COMPLETED

- [x] Step 1: Core RWA Token Contracts (90 min)
  - [x] 1.1: Create RWAAsset.sol (ERC-721)
  - [x] 1.2: Create FractionalRWA.sol (ERC-1155)
  - [x] 1.3: Add asset metadata structures

- [x] Step 2: Credit Score Integration (60 min)
  - [x] 2.1: Create CreditScoreOracle.sol
  - [x] 2.2: Implement credit history aggregation logic
  - [x] 2.3: Build credit score calculation algorithm

- [x] Step 3: USC v2 Integration (90 min)
  - [x] 3.1: Research Creditcoin USC v2 documentation
  - [x] 3.2: Create USCVerifier.sol
  - [x] 3.3: Implement verification call to precompile 0x0FD2
  - [x] 3.4: Add verification result storage and events

- [x] Step 4: DeFi Lending Pool (120 min)
  - [x] 4.1: Create LendingPool.sol with deposit/withdraw
  - [x] 4.2: Implement borrow function with dynamic LTV
  - [x] 4.3: Add interest accrual mechanism
  - [x] 4.4: Implement liquidation mechanism
  - [x] 4.5: Add yield distribution logic

- [x] Step 5: Contract Testing (90 min)
  - [x] 5.1: Write tests for RWAAsset and FractionalRWA
  - [x] 5.2: Write tests for CreditScoreOracle
  - [x] 5.3: Write tests for LendingPool
  - [x] 5.4: Write integration tests
  - [x] 5.5: Run forge test (all tests passing)

- [x] Step 6: Deployment Scripts (45 min)
  - [x] 6.1: Create Deploy.s.sol script
  - [x] 6.2: Configure Creditcoin testnet parameters
  - [x] 6.3: Add contract initialization logic
  - [x] 6.4: Create .env.example

## PHASE 2: TESTNET DEPLOYMENT (Estimated: 2-3 hours)

- [ ] Step 7: Testnet Deployment and Verification (90 min) - IN PROGRESS
  - [ ] 7.1: Obtain tCTC from Creditcoin testnet faucet
  - [ ] 7.2: Deploy all contracts to Creditcoin testnet
  - [ ] 7.3: Verify source code on Blockscout explorer
  - [ ] 7.4: Document all deployed contract addresses
  - [ ] 7.5: Test basic contract interactions via cast

- [ ] Step 8: Testnet Integration Testing (60 min)
  - [ ] 8.1: Execute end-to-end flow on testnet
  - [ ] 8.2: Verify USC v2 cross-chain verification
  - [ ] 8.3: Test credit score queries and LTV adjustments
  - [ ] 8.4: Document transaction hashes for demo

## PHASE 3: FRONTEND DEVELOPMENT (Estimated: 8-10 hours)

- [ ] Step 9: Frontend Setup and Configuration (45 min)
  - [ ] 9.1: Install additional dependencies (wagmi, viem)
  - [ ] 9.2: Configure Creditcoin testnet in wagmi config
  - [ ] 9.3: Set up contract ABIs and addresses
  - [ ] 9.4: Create environment variables file

- [ ] Step 10: Wallet Connection and Web3 Provider (30 min)
  - [ ] 10.1: Implement wallet connection component
  - [ ] 10.2: Add network switching to Creditcoin testnet
  - [ ] 10.3: Display connected address and tCTC balance

- [ ] Step 11: RWA Tokenization Interface (120 min)
  - [ ] 11.1: Create asset registration form
  - [ ] 11.2: Implement RWA minting function
  - [ ] 11.3: Display user's owned RWAs with metadata
  - [ ] 11.4: Add fractionalization interface

- [ ] Step 12: Credit Score Dashboard (90 min)
  - [ ] 12.1: Create credit score display component
  - [ ] 12.2: Fetch and display on-chain credit history
  - [ ] 12.3: Show LTV ratio and interest rate
  - [ ] 12.4: Display real-world impact metrics

- [ ] Step 13: Lending Pool Interface (120 min)
  - [ ] 13.1: Create liquidity provider deposit/withdraw interface
  - [ ] 13.2: Display pool statistics (TVL, utilization, APY)
  - [ ] 13.3: Implement borrow interface
  - [ ] 13.4: Create loan management dashboard

- [ ] Step 14: USC Verification Status Display (45 min)
  - [ ] 14.1: Create verification status component
  - [ ] 14.2: Display pending/completed verifications
  - [ ] 14.3: Show cross-chain proof details

- [ ] Step 15: UI/UX Polish and Mobile Responsiveness (90 min)
  - [ ] 15.1: Apply Tailwind CSS styling
  - [ ] 15.2: Ensure mobile responsiveness
  - [ ] 15.3: Add loading states and error handling
  - [ ] 15.4: Implement toast notifications

## PHASE 4: END-TO-END TESTING (Estimated: 2 hours)

- [ ] Step 16: Frontend-Contract Integration Testing (120 min)
  - [ ] 16.1: Test complete user flow on testnet
  - [ ] 16.2: Verify all contract interactions
  - [ ] 16.3: Test edge cases and error scenarios
  - [ ] 16.4: Record transaction hashes and screenshots

## PHASE 5: DOCUMENTATION AND SUBMISSION (Estimated: 3-4 hours)

- [ ] Step 17: Professional README.md (60 min)
  - [ ] 17.1: Write project title and description
  - [ ] 17.2: Document technology stack
  - [ ] 17.3: Create installation instructions
  - [ ] 17.4: Add deployment instructions
  - [ ] 17.5: Write usage guide
  - [ ] 17.6: Explain hackathon alignment and impact
  - [ ] 17.7: Add team information

- [ ] Step 18: Demo Video Script (45 min)
  - [ ] 18.1: Write 2-minute demo script
  - [ ] 18.2: List key testnet transactions
  - [ ] 18.3: Highlight USC v2 integration
  - [ ] 18.4: Emphasize real-world impact

- [ ] Step 19: Submission Package (60 min)
  - [ ] 19.1: Create submission description for dorahacks.io
  - [ ] 19.2: List all deployed contract addresses
  - [ ] 19.3: Prepare architecture diagram
  - [ ] 19.4: Create future roadmap section
  - [ ] 19.5: Final git repository cleanup

- [ ] Step 20: Final Quality Assurance (45 min)
  - [ ] 20.1: Review all code for security
  - [ ] 20.2: Verify all contracts deployed and verified
  - [ ] 20.3: Test frontend one final time
  - [ ] 20.4: Ensure .gitignore is configured
  - [ ] 20.5: Confirm repository ready to push

---

**Total Estimated Time: 21-27 hours**
**Current Status: Phase 1 Complete, Starting Phase 2**
