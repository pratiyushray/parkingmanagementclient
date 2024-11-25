import React, { useState } from 'react';
import '../Styles/Wallet.css'; // Ensure the CSS file is properly linked

const WalletNav = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [message, setMessage] = useState('');

  // Function to add money to the wallet with cashback
  const addMoney = (amount) => {
    const cashback = 50; // Fixed cashback offer
    setWalletBalance(walletBalance + amount + cashback); // Add amount and cashback
    setMessage(`🎉 ₹${amount} added to your wallet! You earned ₹${cashback} cashback.`);
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // Function to remove money from the wallet
  const removeMoney = (amount) => {
    if (walletBalance >= amount) {
      setWalletBalance(walletBalance - amount); // Remove amount from wallet
      setMessage(`✅ ₹${amount} has been successfully removed from your wallet.`);
    } else {
      setMessage("❌ Insufficient balance in your wallet!");
    }
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div id="wallet-nav">
      <h1>🛍️ Your Wallet Dashboard</h1>
      
      <div id="wallet-info">
        <p>💼 Current Wallet Balance: <span id="wallet-amount">₹{walletBalance}</span></p>
      </div>
      
      <div id="cashback-info">
        <p>🔥 <strong>Exclusive Offer:</strong> Earn ₹50 cashback every time you add money! 🔥</p>
      </div>

      <div id="wallet-buttons">
        <button onClick={() => addMoney(300)}>Add ₹300</button>
        <button onClick={() => addMoney(500)}>Add ₹500</button>
        <button onClick={() => addMoney(1000)}>Add ₹1000</button>
        <button onClick={() => removeMoney(300)}>Remove ₹300</button>
        <button onClick={() => removeMoney(500)}>Remove ₹500</button>
        <button onClick={() => removeMoney(1000)}>Remove ₹1000</button>
      </div>

      {message && <p id="wallet-message">{message}</p>}

      <div id="wallet-images">
        <img src="https://static.vecteezy.com/system/resources/previews/016/461/447/original/animated-wallet-with-cash-money-inside-icon-illustration-vector.jpg" alt="Wallet Illustration" id="wallet-image" />
      </div>

      <div id="tips">
        <h2>💡 Smart Wallet Tips</h2>
        <ul>
          <li>📈 Regularly add money to your wallet and enjoy exclusive discounts.</li>
          <li>🎁 Use earned cashback for your next transactions.</li>
          <li>🔒 Your wallet is highly secure and updates balances instantly.</li>
        </ul>
      </div>

      <div id="extras">
        <h2>Why Choose Our Wallet?</h2>
        <ul>
          <li>⚡ Instant transactions with zero delays.</li>
          <li>💳 Secure payment methods and encrypted data.</li>
          <li>🏷️ Additional rewards for frequent users.</li>
          <li>🌟 24/7 support to resolve wallet-related queries.</li>
        </ul>
      </div>
    </div>
  );
};

export default WalletNav;
