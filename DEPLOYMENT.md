# CrediFi - Deployed Contracts (Sepolia Testnet)

## Network Information
- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://ethereum-sepolia-rpc.publicnode.com
- **Explorer**: https://sepolia.etherscan.io

## Deployed Contract Addresses

### RWAAsset (ERC-721)
- **Address**: `0xaA5685419dBd36d93dD4627da89B8f94c39399C4`
- **Explorer**: https://sepolia.etherscan.io/address/0xaA5685419dBd36d93dD4627da89B8f94c39399C4
- **Verified**: ✅ Yes

### FractionalRWA (ERC-1155)
- **Address**: `0x3b097f7C439B62B293F5c013685605de3B446152`
- **Explorer**: https://sepolia.etherscan.io/address/0x3b097f7C439B62B293F5c013685605de3B446152
- **Verified**: ✅ Yes

### CreditScoreOracle
- **Address**: `0x95c033E817023e2B1C4e6e55F70d488FeC39fd24`
- **Explorer**: https://sepolia.etherscan.io/address/0x95c033E817023e2B1C4e6e55F70d488FeC39fd24
- **Verified**: ✅ Yes

### USCVerifier
- **Address**: `0xe7c3C0f487Fa701373EA119041c3653Cf4F86063`
- **Explorer**: https://sepolia.etherscan.io/address/0xe7c3C0f487Fa701373EA119041c3653Cf4F86063
- **Verified**: ✅ Yes

### LendingPool
- **Address**: `0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4`
- **Explorer**: https://sepolia.etherscan.io/address/0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4
- **Verified**: ✅ Yes

## Deployment Details
- **Deployer Address**: `0x27A2dD1823D883935c9824fbaC0a018cE8e891E5`
- **Deployment Date**: 2026-03-06
- **Total Gas Used**: 6,661,564
- **Deployment Cost**: ~0.000024 ETH

## Contract Interactions

### For Frontend Integration
Use these addresses in your frontend configuration:

```javascript
export const contracts = {
  rwaAsset: "0xaA5685419dBd36d93dD4627da89B8f94c39399C4",
  fractionalRWA: "0x3b097f7C439B62B293F5c013685605de3B446152",
  creditScoreOracle: "0x95c033E817023e2B1C4e6e55F70d488FeC39fd24",
  uscVerifier: "0xe7c3C0f487Fa701373EA119041c3653Cf4F86063",
  lendingPool: "0xea6D4D4b9aAc36f63A70beA0c2a1cfC0cFacdbD4"
};
```

## Testing on Sepolia

To interact with the contracts:
1. Get Sepolia ETH from faucets:
   - https://sepoliafaucet.com
   - https://www.alchemy.com/faucets/ethereum-sepolia
2. Connect your wallet to Sepolia network
3. Use the contract addresses above

## Notes

- All contracts are verified on Etherscan via Sourcify
- Source code is publicly viewable and auditable
- Contracts use Solidity 0.8.24 with via-ir optimization enabled
