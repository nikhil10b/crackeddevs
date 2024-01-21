// Lander.js

import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";

const Lander = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedNFTs, setSelectedNFTs] = useState([]);

  useEffect(() => {
    // Check if Metamask is installed
    if (window.ethereum) {
      // Detect Metamask account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletConnected(true);
        } else {
          setWalletConnected(false);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Request Metamask to connect
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setWalletConnected(true);
      } else {
        console.error('Failed to connect to Metamask.');
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  const importAll = (context) => context.keys().map(context);
  const images = importAll(require.context("../Assets/", false, /\.jpg$/));

  const nftData = images.map((image, index) => {
    const imageName = image.match(/\/([^/]+)\.jpg$/)[1];
    const title = `NFT ${index + 1}`;
    return {
      id: index + 1,
      title: title,
      imageUrl: image,
    };
  });

  const addToCart = (nft) => {
    setSelectedNFTs([...selectedNFTs, nft]);
  };

  return (
    <div>
      {/* Big Heading */}
      <h1 className="text-6xl font-bold text-white text-center mb-6">Education4You</h1>

      {/* Wallet Connection and Cart Buttons */}
      <div className="flex justify-center items-center mb-6">
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 transition-all`}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-4 transition-all`}
          >
            Wallet Connected
          </button>
        )}

        <button
          onClick={() => console.log("View Cart")}
          className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all`}
        >
          View Cart ({selectedNFTs.length})
        </button>
      </div>

      {/* Display NFT Cards */}
      <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nftData.map((nft) => (
          <div key={nft.id} className="bg-gray-200 p-4 rounded-md shadow-md h-full">
            <NFTCard
              nft={nft}
              addToCart={() => addToCart(nft)}
              disabled={!walletConnected}
            />
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <div className="m-3">
        <h2 className="text-2xl font-bold mb-2">Shopping Cart</h2>
        <ul>
          {selectedNFTs.map((nft) => (
            <li key={nft.id} className="mb-2">
              {nft.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lander;
