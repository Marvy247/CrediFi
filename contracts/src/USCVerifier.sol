// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INativeQueryVerifier.sol";

contract USCVerifier is Ownable {
    INativeQueryVerifier public immutable VERIFIER;
    
    enum VerificationStatus { Pending, Verified, Failed }
    
    struct VerificationRecord {
        uint64 chainKey;
        uint64 blockHeight;
        uint256 transactionIndex;
        bytes32 dataHash;
        VerificationStatus status;
        uint256 timestamp;
    }
    
    mapping(bytes32 => VerificationRecord) public verifications;
    mapping(uint256 => bool) public processedAssets;
    
    event AssetVerificationRequested(uint256 indexed assetId, bytes32 verificationId);
    event AssetVerificationCompleted(uint256 indexed assetId, bytes32 verificationId, bool success);
    
    constructor() Ownable(msg.sender) {
        VERIFIER = NativeQueryVerifierLib.getVerifier();
    }
    
    function verifyAssetData(
        uint256 assetId,
        uint64 chainKey,
        uint64 blockHeight,
        bytes calldata encodedTransaction,
        bytes32 merkleRoot,
        INativeQueryVerifier.MerkleProofEntry[] calldata siblings,
        bytes32 lowerEndpointDigest,
        bytes32[] calldata continuityRoots
    ) external returns (bytes32 verificationId) {
        uint256 transactionIndex = _calculateTransactionIndex(siblings);
        verificationId = keccak256(abi.encodePacked(assetId, chainKey, blockHeight, transactionIndex));
        require(verifications[verificationId].timestamp == 0, "Already verified");
        
        bool verified = _verifyProof(chainKey, blockHeight, encodedTransaction, merkleRoot, siblings, lowerEndpointDigest, continuityRoots);
        
        verifications[verificationId] = VerificationRecord({
            chainKey: chainKey,
            blockHeight: blockHeight,
            transactionIndex: transactionIndex,
            dataHash: keccak256(encodedTransaction),
            status: verified ? VerificationStatus.Verified : VerificationStatus.Failed,
            timestamp: block.timestamp
        });
        
        if (verified) {
            processedAssets[assetId] = true;
        }
        
        emit AssetVerificationCompleted(assetId, verificationId, verified);
        return verificationId;
    }
    
    function _verifyProof(
        uint64 chainKey,
        uint64 blockHeight,
        bytes calldata encodedTransaction,
        bytes32 merkleRoot,
        INativeQueryVerifier.MerkleProofEntry[] calldata siblings,
        bytes32 lowerEndpointDigest,
        bytes32[] calldata continuityRoots
    ) internal returns (bool) {
        INativeQueryVerifier.MerkleProof memory merkleProof = 
            INativeQueryVerifier.MerkleProof({root: merkleRoot, siblings: siblings});
        
        INativeQueryVerifier.ContinuityProof memory continuityProof = 
            INativeQueryVerifier.ContinuityProof({
                lowerEndpointDigest: lowerEndpointDigest,
                roots: continuityRoots
            });
        
        return VERIFIER.verifyAndEmit(chainKey, blockHeight, encodedTransaction, merkleProof, continuityProof);
    }
    
    function getVerificationStatus(bytes32 verificationId) external view returns (VerificationRecord memory) {
        return verifications[verificationId];
    }
    
    function isAssetVerified(uint256 assetId) external view returns (bool) {
        return processedAssets[assetId];
    }
    
    function _calculateTransactionIndex(INativeQueryVerifier.MerkleProofEntry[] memory proof) 
        internal pure returns (uint256 index) 
    {
        index = 0;
        for (uint256 i = 0; i < proof.length; i++) {
            if (proof[i].isLeft) {
                index |= 1 << i;
            }
        }
        return index;
    }
}
