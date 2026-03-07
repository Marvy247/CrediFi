// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalRWA is ERC1155, Ownable, ERC1155Holder {
    struct FractionalAsset {
        uint256 parentTokenId;
        uint256 totalShares;
        uint256 pricePerShare;
        string metadataURI;
    }

    uint256 private _assetIdCounter;
    mapping(uint256 => FractionalAsset) public fractionalAssets;

    event AssetFractionalized(uint256 indexed assetId, uint256 parentTokenId, uint256 totalShares, uint256 pricePerShare);
    event SharesPurchased(uint256 indexed assetId, address indexed buyer, uint256 amount);

    constructor() ERC1155("") Ownable(msg.sender) {}
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function fractionalizeAsset(
        uint256 parentTokenId,
        uint256 totalShares,
        uint256 pricePerShare,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        uint256 assetId = _assetIdCounter++;

        fractionalAssets[assetId] = FractionalAsset({
            parentTokenId: parentTokenId,
            totalShares: totalShares,
            pricePerShare: pricePerShare,
            metadataURI: metadataURI
        });

        _mint(address(this), assetId, totalShares, "");
        emit AssetFractionalized(assetId, parentTokenId, totalShares, pricePerShare);
        return assetId;
    }

    function purchaseShares(uint256 assetId, uint256 amount) external payable {
        FractionalAsset memory asset = fractionalAssets[assetId];
        require(asset.totalShares > 0, "Asset does not exist");
        require(msg.value == amount * asset.pricePerShare, "Incorrect payment");
        require(balanceOf(address(this), assetId) >= amount, "Insufficient shares available");

        _safeTransferFrom(address(this), msg.sender, assetId, amount, "");
        emit SharesPurchased(assetId, msg.sender, amount);
    }

    function uri(uint256 assetId) public view override returns (string memory) {
        return fractionalAssets[assetId].metadataURI;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
