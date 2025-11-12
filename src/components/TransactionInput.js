import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { formatCurrency } from '../utils/calculations';
import './TransactionInput.css';

const TransactionInput = ({ onNavigate }) => {
  const { addTransaction, wallet, settings, updateSettings } = useInvestment();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [roundUpResult, setRoundUpResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid transaction details');
      return;
    }

    const result = addTransaction(description, parseFloat(amount));
    setRoundUpResult(result);
    setShowSuccess(true);

    // Reset form
    setDescription('');
    setAmount('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setRoundUpResult(null);
    }, 3000);
  };

  // Quick amount buttons
  const quickAmounts = [50, 100, 200, 500];

  return (
    <div className="transaction-input">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>← Back</button>
        <h1>Add Transaction</h1>
      </div>

      <div className="wallet-display">
        <p>Current Wallet Balance</p>
        <h2>{formatCurrency(wallet)}</h2>
      </div>

      {showSuccess && roundUpResult && (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Transaction Added!</h3>
          <div className="roundup-details">
            <div className="roundup-row">
              <span>Original Amount:</span>
              <span>{formatCurrency(roundUpResult.original)}</span>
            </div>
            <div className="roundup-row">
              <span>Rounded To:</span>
              <span>{formatCurrency(roundUpResult.rounded)}</span>
            </div>
            <div className="roundup-row highlight">
              <span>Spare Change:</span>
              <span className="spare-highlight">{formatCurrency(roundUpResult.spare)}</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="roundUpPreference">Round-up To Nearest</label>
          <select
            id="roundUpPreference"
            value={settings.roundUpPreference}
            onChange={(e) => updateSettings({ roundUpPreference: parseInt(e.target.value) })}
            className="roundup-selector"
          >
            <option value="5">₹5</option>
            <option value="10">₹10 (Default)</option>
            <option value="20">₹20</option>
            <option value="50">₹50</option>
            <option value="100">₹100</option>
          </select>
          <p className="help-text">
            Your transactions will be rounded up to the nearest ₹{settings.roundUpPreference}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee, Lunch, Groceries"
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
          />
        </div>

        <div className="quick-amounts">
          <p>Quick Select:</p>
          <div className="quick-buttons">
            {quickAmounts.map(amt => (
              <button
                key={amt}
                type="button"
                className="quick-btn"
                onClick={() => setAmount(amt.toString())}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Calculate Round-up & Save
        </button>
      </form>

      <div className="info-section">
        <h3>How it works</h3>
        <div className="info-cards">
          <div className="info-card">
            <span className="info-number">1</span>
            <p>Set your round-up preference (₹5, ₹10, ₹20, ₹50, or ₹100)</p>
          </div>
          <div className="info-card">
            <span className="info-number">2</span>
            <p>Enter your transaction amount</p>
          </div>
          <div className="info-card">
            <span className="info-number">3</span>
            <p>We round it up to your preference</p>
          </div>
          <div className="info-card">
            <span className="info-number">4</span>
            <p>Spare change goes to your wallet</p>
          </div>
          <div className="info-card">
            <span className="info-number">5</span>
            <p>Auto-invest when wallet reaches ₹{settings.autoInvest ? settings.investmentThreshold : '100'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInput;
