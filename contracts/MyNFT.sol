// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFT is ERC721Enumerable {
    uint256 public totalReceivedEther;

    constructor() ERC721("My NFT Collection", "MNFT") {}

    function mint(address to, uint256 tokenId) external {
        _safeMint(to, tokenId);
    }

    function replaceNFT(address oldOwner, address newOwner, uint256 oldTokenId, uint256 newTokenId) external {
        require(ownerOf(oldTokenId) == msg.sender || isApprovedForAll(ownerOf(oldTokenId), msg.sender), "Not approved to transfer");
        _transfer(oldOwner, newOwner, oldTokenId);
        _burn(oldTokenId);
        _safeMint(newOwner, newTokenId);
    }

    receive() external payable {
        // Handle received Ether (if needed)
        totalReceivedEther += msg.value;
    }

    fallback() external payable {
        // Handle fallback (if needed)
        totalReceivedEther += msg.value;
    }
}
