# CrediFi - 2-Minute Demo Video Script

## Duration: 2 minutes (120 seconds)

---

## INTRO (0:00 - 0:15) - 15 seconds

**Screen**: Landing page of CrediFi

**Narration**:
"Meet CrediFi - a decentralized platform solving financial inclusion for 1.7 billion unbanked adults in emerging markets. We combine real-world asset tokenization with on-chain credit scoring to unlock DeFi lending for those without traditional credit histories."

---

## SECTION 1: RWA TOKENIZATION (0:15 - 0:45) - 30 seconds

**Screen**: Navigate to Assets page, show mint form

**Narration**:
"Users can tokenize real-world assets like land, crops, or vehicles as ERC-721 tokens. Let me mint a land asset in Lagos, Nigeria, valued at 10 ETH."

**Actions**:
1. Fill in asset form:
   - Type: Land
   - Location: Lagos, Nigeria
   - Valuation: 10 ETH
   - Document Hash: QmHash123
2. Click "Mint Asset"
3. Confirm MetaMask transaction

**Screen**: Show transaction confirmation on Etherscan

**Narration**:
"The asset is now tokenized on-chain with verifiable metadata. This creates a digital representation of real-world value that can be used as collateral."

**Transaction to demonstrate**: Asset minting transaction on Sepolia
- Contract: 0xaA5685419dBd36d93dD4627da89B8f94c39399C4

---

## SECTION 2: CREDIT SCORING (0:45 - 1:05) - 20 seconds

**Screen**: Navigate to Credit Score page

**Narration**:
"CrediFi tracks on-chain credit history to calculate dynamic loan terms. Users with perfect repayment history unlock up to 90% LTV ratios and interest rates as low as 5%."

**Screen**: Show credit score dashboard with metrics

**Actions**:
1. Display credit score: 90/100
2. Show LTV ratio: 86%
3. Show interest rate: 5.5%
4. Highlight real-world impact section

**Narration**:
"This creates portable, verifiable credit that follows users across platforms - solving the credit invisibility problem in emerging markets."

---

## SECTION 3: LENDING POOL (1:05 - 1:40) - 35 seconds

**Screen**: Navigate to Lending Pool page

**Narration**:
"The lending pool connects liquidity providers with borrowers. Providers deposit ETH to earn yield, while borrowers use RWA tokens as collateral."

**Actions**:
1. Show pool statistics:
   - Total Liquidity
   - Total Borrowed
   - Utilization Rate
   - APY

**Screen**: Show deposit interface

**Narration**:
"Let me deposit 5 ETH as a liquidity provider."

**Actions**:
1. Enter 5 ETH in deposit field
2. Click "Deposit"
3. Confirm transaction

**Screen**: Show borrow interface

**Narration**:
"Now I can borrow against my RWA collateral. The system automatically calculates my maximum borrow amount based on my credit score and asset valuation."

**Actions**:
1. Enter collateral token ID: 0
2. Enter borrow amount: 5 ETH
3. Show calculated terms
4. Click "Borrow"

**Transaction to demonstrate**: Borrow transaction on Sepolia
- Contract: 0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4

---

## SECTION 4: USC V2 INTEGRATION (1:40 - 1:50) - 10 seconds

**Screen**: Show USCVerifier contract on Etherscan

**Narration**:
"CrediFi integrates Creditcoin's USC v2 for trustless cross-chain verification. The Native Query Verifier precompile validates asset data without centralized oracles."

**Screen**: Highlight verifyAssetData function

**Transaction to demonstrate**: USC verification call (if available)
- Contract: 0xe7c3C0f487Fa701373EA119041c3653Cf4F86063

---

## CLOSING (1:50 - 2:00) - 10 seconds

**Screen**: Return to landing page, show all three feature cards

**Narration**:
"CrediFi brings financial inclusion to emerging markets through RWA tokenization, on-chain credit scoring, and DeFi lending. Built on Creditcoin's USC v2 architecture for trustless, cross-chain verification. Thank you."

**Screen**: Show GitHub repository and deployed contract addresses

---

## Key Transactions to Record

1. **RWA Asset Minting**:
   - Contract: 0xaA5685419dBd36d93dD4627da89B8f94c39399C4
   - Function: mintAsset()
   - Explorer: https://sepolia.etherscan.io/address/0xaA5685419dBd36d93dD4627da89B8f94c39399C4

2. **Liquidity Deposit**:
   - Contract: 0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4
   - Function: deposit()
   - Explorer: https://sepolia.etherscan.io/address/0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4

3. **Borrow Against Collateral**:
   - Contract: 0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4
   - Function: borrow()
   - Explorer: https://sepolia.etherscan.io/address/0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4

4. **Credit Score Query**:
   - Contract: 0x95c033E817023e2B1C4e6e55F70d488FeC39fd24
   - Function: getCreditScore()
   - Explorer: https://sepolia.etherscan.io/address/0x95c033E817023e2B1C4e6e55F70d488FeC39fd24

---

## Technical Setup for Recording

1. Ensure MetaMask is connected to Sepolia
2. Have sufficient Sepolia ETH for transactions
3. Pre-mint at least one RWA asset before recording
4. Have Etherscan tabs ready for transaction confirmations
5. Use screen recording software (OBS, Loom, etc.)
6. Record at 1080p resolution
7. Use clear, professional narration
8. Add background music (optional, low volume)

---

## Emphasis Points

- Financial inclusion for 1.7 billion unbanked adults
- Real-world asset tokenization (land, crops, vehicles)
- On-chain credit scoring (50% to 90% LTV, 10% to 5% interest)
- USC v2 trustless cross-chain verification
- Emerging markets focus (Nigeria, Kenya, India)
- Portable, verifiable credit history
- No centralized oracles required
