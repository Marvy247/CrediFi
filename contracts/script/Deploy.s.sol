// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import "../src/RWAAsset.sol";
import "../src/FractionalRWA.sol";
import "../src/CreditScoreOracle.sol";
import "../src/USCVerifier.sol";
import "../src/LendingPool.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        RWAAsset rwaAsset = new RWAAsset();
        console.log("RWAAsset deployed at:", address(rwaAsset));
        
        FractionalRWA fractionalRWA = new FractionalRWA();
        console.log("FractionalRWA deployed at:", address(fractionalRWA));
        
        CreditScoreOracle creditScoreOracle = new CreditScoreOracle();
        console.log("CreditScoreOracle deployed at:", address(creditScoreOracle));
        
        USCVerifier uscVerifier = new USCVerifier();
        console.log("USCVerifier deployed at:", address(uscVerifier));
        
        LendingPool lendingPool = new LendingPool(address(creditScoreOracle), address(rwaAsset));
        console.log("LendingPool deployed at:", address(lendingPool));
        
        // Authorize lending pool to update credit history
        creditScoreOracle.setAuthorizedCaller(address(lendingPool), true);
        console.log("LendingPool authorized in CreditScoreOracle");
        
        vm.stopBroadcast();
        
        console.log("\n=== Deployment Summary ===");
        console.log("RWAAsset:", address(rwaAsset));
        console.log("FractionalRWA:", address(fractionalRWA));
        console.log("CreditScoreOracle:", address(creditScoreOracle));
        console.log("USCVerifier:", address(uscVerifier));
        console.log("LendingPool:", address(lendingPool));
    }
}
