const { ethers } = require('hardhat');

async function main() {
  const NFTCollection = await ethers.getContractFactory('NFTCollection');
  const nftCollection = await NFTCollection.deploy('NFTCollection', 'NFTC', 'https://api.example.com/metadata/');


  await nftCollection.deployed();

  if (nftCollection.address) {
    console.log('Contract deployed at address:', nftCollection.address);

    const [owner, recipient] = await ethers.getSigners();
    await nftCollection.connect(owner).mint(owner.address);

    const tokenId = await nftCollection.tokenOfOwnerByIndex(owner.address, 0);

    await nftCollection.connect(owner).replaceNFT(owner.address, tokenId, recipient.address);

    console.log('NFT replaced successfully!');
  } else {
    console.error('Contract deployment failed. Contract address is undefined.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
