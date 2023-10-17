// uploadMetadata.js

const fetch = require("node-fetch");

const IPFS_API_URL = "https://ipfs.infura.io:5001/api/v0/add";

async function uploadMetadataToIPFS(metadata) {
    const response = await fetch(IPFS_API_URL, {
        method: "POST",
        body: metadata,
    });
    const data = await response.json();
    return data.Hash;
}

module.exports = uploadMetadataToIPFS;
