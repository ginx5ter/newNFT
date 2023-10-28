// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSImageUploader {
    struct Image {
        string ipfsHash;
        string description;
    }

    mapping(uint256 => Image) public images;
    uint256 public imageCount;

    event ImageUploaded(uint256 indexed id, string ipfsHash, string description);

    function uploadImage(string memory _ipfsHash, string memory _description) external {
        imageCount++;
        images[imageCount] = Image(_ipfsHash, _description);
        emit ImageUploaded(imageCount, _ipfsHash, _description);
    }
}
