// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RWAAsset is ERC721, Ownable {
    enum AssetType { Land, Crop, Vehicle, Other }
    enum VerificationStatus { Pending, Verified, Rejected }

    struct AssetMetadata {
        AssetType assetType;
        string location;
        uint256 valuation;
        string documentHash;
        VerificationStatus verificationStatus;
        uint256 timestamp;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => AssetMetadata) public assetMetadata;

    event AssetMinted(uint256 indexed tokenId, address indexed owner, AssetType assetType, uint256 valuation);
    event AssetVerified(uint256 indexed tokenId, VerificationStatus status);

    constructor() ERC721("CrediFi RWA", "CRWA") Ownable(msg.sender) {}

    function mintAsset(
        address to,
        AssetType assetType,
        string memory location,
        uint256 valuation,
        string memory documentHash
    ) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);

        assetMetadata[tokenId] = AssetMetadata({
            assetType: assetType,
            location: location,
            valuation: valuation,
            documentHash: documentHash,
            verificationStatus: VerificationStatus.Verified,
            timestamp: block.timestamp
        });

        emit AssetMinted(tokenId, to, assetType, valuation);
        return tokenId;
    }

    function updateVerificationStatus(uint256 tokenId, VerificationStatus status) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        assetMetadata[tokenId].verificationStatus = status;
        emit AssetVerified(tokenId, status);
    }

    function getAssetMetadata(uint256 tokenId) external view returns (AssetMetadata memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return assetMetadata[tokenId];
    }
}
