// NFTCard.js
import React from "react";

const NFTCard = ({ nft, addToCart, disabled }) => {
  return (
    <div className="flex flex-col h-full">
      <img
        src={nft.imageUrl}
        alt={nft.title}
        className="object-cover w-full h-64 mb-4 rounded-md"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{nft.title}</h3>
        <button
          onClick={addToCart}
          disabled={disabled}
          className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
