# CrediFi Demo Video Script

**Duration:** 2-3 minutes  
**Format:** Screen recording with voiceover  
**Tone:** Professional, clear, confident

---

## INTRO (0:00 - 0:15)

**[Screen: Landing page of CrediFi]**

**Script:**
"Hello, I'm [Your Name], and this is CrediFi - a decentralized lending platform that combines real-world asset tokenization with on-chain credit scoring to provide financial inclusion for underbanked populations."

**Action:**
- Show the landing page briefly
- Cursor hovers over navigation menu

---

## PROBLEM & SOLUTION (0:15 - 0:30)

**[Screen: Still on landing page or transition to Assets page]**

**Script:**
"1.7 billion people globally lack access to financial services because they have no credit history. CrediFi solves this by allowing users to tokenize real-world assets as collateral and build verifiable credit scores on-chain that improve their loan terms over time."

**Action:**
- Quick transition through pages to show platform overview

---

## WALLET CONNECTION (0:30 - 0:40)

**[Screen: Top navigation bar]**

**Script:**
"Let me show you how it works. First, I'll connect my MetaMask wallet to the Sepolia testnet."

**Action:**
- Click "Connect Wallet" button
- MetaMask popup appears
- Click "Connect"
- Show connected wallet address in navigation bar

---

## ASSET TOKENIZATION (0:40 - 1:00)

**[Screen: Navigate to Assets page]**

**Script:**
"Step one is tokenizing a real-world asset. I'll mint an NFT representing a piece of land in Lagos, Nigeria, valued at 1 ETH."

**Action:**
- Click "Assets" in navigation
- Fill in the mint form:
  - Asset Type: Select "Land"
  - Location: Type "Lagos, Nigeria"
  - Valuation: Type "1000000000000000000" (1 ETH in wei)
  - Document Hash: Type "QmExampleHash123"
- Click "Mint Asset"
- MetaMask popup appears
- Click "Confirm"
- Wait for transaction confirmation
- Toast notification: "Asset minted successfully!"

**Script (while waiting):**
"The asset is automatically verified and stored on-chain with all metadata."

---

## VIEW ASSET (1:00 - 1:10)

**[Screen: Asset appears in portfolio]**

**Script:**
"Here's my tokenized asset. It shows the location, valuation of 1 ETH, and verified status. This NFT can now be used as collateral."

**Action:**
- Scroll to show the asset card
- Point out key details: Token ID, valuation, verified status

---

## PROVIDE LIQUIDITY (1:10 - 1:25)

**[Screen: Navigate to Lending Pool page]**

**Script:**
"Before borrowing, the pool needs liquidity. I'll deposit 0.5 ETH as a liquidity provider to earn yield from borrower interest payments."

**Action:**
- Click "Lending Pool" in navigation
- Scroll to Deposit section
- Enter "0.5" in deposit amount
- Click "Deposit"
- Confirm MetaMask transaction
- Wait for confirmation
- Show updated "Your Deposited Amount: 0.5 ETH"

---

## BORROW AGAINST COLLATERAL (1:25 - 1:50)

**[Screen: Scroll to Borrow section]**

**Script:**
"Now I'll borrow against my land NFT. With a 50% loan-to-value ratio for new borrowers, I can borrow up to 0.5 ETH. I'll borrow 0.1 ETH."

**Action:**
- Scroll to Borrow section
- Enter token ID: "0" (or your actual token ID)
- Wait for "Max borrow" to appear showing "0.5000 ETH (50% LTV)"
- Enter borrow amount: "0.1"
- Click "Borrow"
- Confirm first transaction (NFT approval)
- Wait for approval confirmation
- Second transaction automatically triggers (borrow)
- Confirm borrow transaction
- Toast notification: "Borrow successful! Credit history updated."

**Script (while waiting):**
"The platform requires two transactions: first to approve the NFT transfer, then to execute the borrow. Notice how my credit history is automatically updated."

---

## CREDIT SCORE UPDATE (1:50 - 2:05)

**[Screen: Navigate to Credit Score page]**

**Script:**
"Let's check my credit score. I now have 1 total loan recorded on-chain. As I make successful repayments, my credit score will improve, unlocking better terms."

**Action:**
- Click "Credit Score" in navigation
- Show credit score dashboard:
  - Current Score: 0 (no repayments yet)
  - LTV Ratio: 50%
  - Interest Rate: 10%
  - Total Loans: 1
  - Successful Repayments: 0
- Point to the impact metrics section

**Script:**
"With perfect repayment history, my LTV can increase to 90%, and my interest rate can drop to just 5%."

---

## LOAN REPAYMENT (2:05 - 2:25)

**[Screen: Navigate back to Lending Pool]**

**Script:**
"Now I'll repay my loan. The platform calculates the exact amount including accrued interest. I'll click MAX to auto-fill the precise repayment amount."

**Action:**
- Click "Lending Pool" in navigation
- Scroll to Repay section
- Enter loan ID: "0" (or your actual loan ID)
- Wait for "Total to repay" to appear (e.g., "0.100001 ETH")
- Click "MAX" button
- Amount auto-fills
- Click "Repay Loan"
- Confirm MetaMask transaction
- Wait for confirmation
- Toast notification: "Repay successful! Credit score updated."

**Script (while waiting):**
"Upon successful repayment, my collateral NFT is returned, and my credit history is updated automatically."

---

## CREDIT SCORE IMPROVEMENT (2:25 - 2:40)

**[Screen: Navigate to Credit Score page]**

**Script:**
"Let's verify the credit update. My successful repayments counter has increased, and with continued responsible borrowing, I'll unlock progressively better loan terms."

**Action:**
- Click "Credit Score" in navigation
- Show updated stats:
  - Total Loans: 1
  - Successful Repayments: 1
  - Credit score improved
- Scroll to show the improvement metrics

---

## PLATFORM OVERVIEW (2:40 - 2:50)

**[Screen: Quick navigation through pages]**

**Script:**
"CrediFi provides a complete DeFi lending experience: tokenize assets, provide liquidity, borrow with dynamic terms, and build portable credit history—all on-chain and transparent."

**Action:**
- Quick scroll through Assets page
- Quick scroll through Lending Pool stats
- Quick scroll through Credit Score dashboard

---

## CLOSING (2:50 - 3:00)

**[Screen: Landing page or GitHub/Vercel link]**

**Script:**
"All smart contracts are verified on Sepolia Etherscan, and the platform is live at [Vercel URL]. CrediFi is bringing financial inclusion to 1.7 billion underbanked people worldwide through decentralized lending and on-chain credit scoring. Thank you."

**Action:**
- Show Vercel URL on screen
- Show GitHub repository link
- Fade to black or end screen with:
  - "CrediFi"
  - "Built for BUIDL CTC Hackathon 2026"
  - Links: Demo | GitHub | Contracts

---

## TECHNICAL NOTES

**Before Recording:**
1. Clear browser cache and cookies
2. Have MetaMask installed and connected to Sepolia
3. Ensure you have sufficient Sepolia ETH (at least 0.6 ETH)
4. Close unnecessary browser tabs
5. Set browser zoom to 100%
6. Use 1920x1080 resolution for recording
7. Test audio levels

**During Recording:**
1. Speak clearly and at moderate pace
2. Pause briefly between sections
3. Keep cursor movements smooth
4. Wait for all transactions to confirm
5. Show toast notifications clearly
6. Don't rush through forms

**Recording Tools:**
- OBS Studio (free, professional)
- Loom (easy, web-based)
- Screen Studio (Mac, premium quality)

**Video Settings:**
- Resolution: 1920x1080 (1080p)
- Frame rate: 30fps minimum
- Format: MP4
- Audio: Clear voiceover, no background music needed

**Editing Tips:**
1. Speed up transaction waiting times (2x speed)
2. Add subtle zoom-ins on important UI elements
3. Add text overlays for key metrics (optional)
4. Keep total length under 3 minutes
5. Add captions/subtitles for accessibility

---

## BACKUP PLAN

**If transactions fail:**
- Have a pre-recorded successful transaction ready
- Or explain: "In a live environment, this would confirm in 10-15 seconds"
- Continue with the next step

**If MetaMask doesn't connect:**
- Restart browser
- Use a different wallet address
- Have screenshots ready as backup

**If network is slow:**
- Record in segments and edit together
- Use video editing to speed up waiting times
- Consider using a local testnet for smoother demo

---

## POST-PRODUCTION CHECKLIST

- [ ] Video is under 3 minutes
- [ ] Audio is clear and professional
- [ ] All key features demonstrated
- [ ] Transaction confirmations visible
- [ ] URLs and links shown clearly
- [ ] No personal information exposed
- [ ] Exported in 1080p MP4
- [ ] File size under 100MB (for easy upload)
- [ ] Uploaded to YouTube (unlisted or public)
- [ ] Link added to hackathon submission

---

## ALTERNATIVE: SHORTER VERSION (90 seconds)

If you need a condensed version:

**0:00-0:10** - Intro + Problem
**0:10-0:25** - Mint asset (show form, skip transaction wait)
**0:25-0:40** - Deposit liquidity (show form, skip transaction wait)
**0:40-0:60** - Borrow (show form and max borrow amount)
**0:60-0:75** - Show credit score update
**0:75-0:90** - Repay with MAX button + closing

Use faster pacing and speed up all transaction waits to 3x.
