import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import IPFSImageUploader from './contracts/IPFSImageUploader.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = IPFSImageUploader.networks[networkId];
        const contract = new web3.eth.Contract(
          IPFSImageUploader.abi,
          deployedNetwork && deployedNetwork.address
        );
        const accounts = await web3.eth.getAccounts();
        setWeb3(web3);
        setContract(contract);
        setAccount(accounts[0]);
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask and refresh the page.');
    }
  };

  const uploadImage = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.uploadImage(ipfsHash, description).send({ from: accounts[0] });
        setStatus('Image uploaded successfully.');
      } catch (error) {
        console.error('Image upload error:', error);
        setStatus('Image upload failed.');
      }
    } else {
      alert('Connect to MetaMask first.');
    }
  };

  useEffect(() => {
    connectMetaMask();
  }, []);

  return (
    <div>
      <h1>IPFS Image Uploader DApp</h1>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <input
            type="text"
            placeholder="IPFS Hash"
            onChange={(e) => setIpfsHash(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={uploadImage}>Upload Image</button>
          <p>Status: {status}</p>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      )}
    </div>
  );
}

export default App;
