// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import "../src/RWAAsset.sol";
import "../src/LendingPool.sol";
import "../src/CreditScoreOracle.sol";

contract TestBorrow is Script {
    function run() external {
        address rwaAsset = 0x3e23aCD980a8550Ecd71b589F517Dd632E0D7d98;
        address lendingPool = 0xEA3582Ec1B7F43dAF91d4850Bb33d56B50EDC25e;
        address creditOracle = 0x241dEDF00F4F7b10E23076F1039cDD874F1C28E0;
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        RWAAsset rwa = RWAAsset(rwaAsset);
        LendingPool pool = LendingPool(payable(lendingPool));
        
        // 1. Mint an asset
        console.log("Minting asset...");
        uint256 tokenId = rwa.mintAsset(
            deployer,
            RWAAsset.AssetType.Land,
            "Test Location",
            1 ether, // 1 ETH valuation
            "QmTest123"
        );
        console.log("Minted token ID:", tokenId);
        
        // 2. Check verification status
        RWAAsset.AssetMetadata memory metadata = rwa.getAssetMetadata(tokenId);
        console.log("Verification status:", uint256(metadata.verificationStatus));
        console.log("Valuation:", metadata.valuation);
        
        // 3. Deposit liquidity
        console.log("Depositing 0.5 ETH...");
        pool.deposit{value: 0.5 ether}();
        console.log("Total liquidity:", pool.totalLiquidity());
        
        // 4. Approve NFT
        console.log("Approving NFT...");
        rwa.approve(lendingPool, tokenId);
        
        // 5. Try to borrow
        console.log("Attempting to borrow 0.1 ETH...");
        try pool.borrow(tokenId, 0.1 ether) returns (uint256 loanId) {
            console.log("SUCCESS! Loan ID:", loanId);
        } catch Error(string memory reason) {
            console.log("FAILED:", reason);
        } catch {
            console.log("FAILED: Unknown error");
        }
        
        vm.stopBroadcast();
    }
}
