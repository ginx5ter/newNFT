const { expect } = require("chai");

describe("NFT Collection", function () {
    let MyNFT;  // Updated contract name
    let NFTContract;  // Contract instance
    let owner;

    before(async function () {
        // Update the contract name to match your Solidity file
        MyNFT = await ethers.getContractFactory("MyNFT");
        NFTContract = await MyNFT.deploy();
        [owner] = await ethers.getSigners();  // Get the first account as the owner
    });

    it("Should mint an NFT", async function () {
        // Replace with the desired token ID and user address
        const tokenId = 1;  // Unique token ID for the NFT
        const userAddress = await owner.getAddress();  // Ethereum address to mint to

        await NFTContract.mint(userAddress, tokenId);
        const ownerOfToken = await NFTContract.ownerOf(tokenId);
        expect(ownerOfToken).to.equal(userAddress);
    });
});

