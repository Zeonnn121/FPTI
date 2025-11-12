import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { formatCurrency, getAssetDetails } from '../utils/calculations';
import './InvestmentSelection.css';

const InvestmentSelection = ({ onNavigate }) => {
  const { wallet, manualInvest, settings, updateSettings } = useInvestment();
  const [selectedAsset, setSelectedAsset] = useState(settings.preferredAsset);
  const [investAmount, setInvestAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const assetTypes = ['mutual_fund', 'etf', 'bond'];

  const handleInvest = () => {
    const amount = parseFloat(investAmount);
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount > wallet) {
      alert('Insufficient wallet balance');
      return;
    }

    try {
      manualInvest(amount, selectedAsset);
      setShowSuccess(true);
      setInvestAmount('');
      
      setTimeout(() => {
        setShowSuccess(false);
        onNavigate('portfolio');
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSetPreferred = (assetType) => {
    updateSettings({ preferredAsset: assetType });
    setSelectedAsset(assetType);
  };

  return (
    <div className="investment-selection">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>← Back</button>
        <h1>Invest Your Money</h1>
      </div>

      <div className="wallet-info">
        <p>Available Balance</p>
        <h2>{formatCurrency(wallet)}</h2>
      </div>

      {showSuccess && (
        <div className="success-banner">
          <span className="success-icon">🎉</span>
          <p>Investment successful! Redirecting to portfolio...</p>
        </div>
      )}

      <div className="investment-amount">
        <label>Amount to Invest</label>
        <div className="amount-input-wrapper">
          <span className="currency-symbol">₹</span>
          <input
            type="number"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
            placeholder="0.00"
            step="10"
            min="10"
          />
        </div>
        <div className="quick-invest">
          <button onClick={() => setInvestAmount('100')}>₹100</button>
          <button onClick={() => setInvestAmount('200')}>₹200</button>
          <button onClick={() => setInvestAmount('500')}>₹500</button>
          <button onClick={() => setInvestAmount(wallet.toString())}>All</button>
        </div>
      </div>

      <div className="asset-selection">
        <h3>Choose Investment Type</h3>
        <div className="asset-grid">
          {assetTypes.map(type => {
            const asset = getAssetDetails(type);
            const isSelected = selectedAsset === type;
            const isPreferred = settings.preferredAsset === type;

            return (
              <div
                key={type}
                className={`asset-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(type)}
              >
                {isPreferred && <span className="preferred-badge">⭐ Preferred</span>}
                <div className="asset-icon" style={{ color: asset.color }}>
                  {asset.icon}
                </div>
                <h4>{asset.name}</h4>
                <div className="asset-risk">
                  <span className={`risk-badge ${asset.risk.toLowerCase().replace(' ', '-')}`}>
                    {asset.risk} Risk
                  </span>
                </div>
                <p className="asset-returns">{asset.returns}</p>
                <p className="asset-description">{asset.description}</p>
                
                <button
                  className="set-preferred-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetPreferred(type);
                  }}
                >
                  {isPreferred ? '✓ Preferred' : 'Set as Preferred'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="auto-invest-info">
        <div className="info-header">
          <h3>Auto-Invest Settings</h3>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.autoInvest}
              onChange={(e) => updateSettings({ autoInvest: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <p>
          {settings.autoInvest 
            ? `Automatically invest when wallet reaches ₹${settings.investmentThreshold} into ${getAssetDetails(settings.preferredAsset).name}`
            : 'Auto-invest is disabled. You can manually invest anytime.'
          }
        </p>
        
        {settings.autoInvest && (
          <>
            <div className="threshold-selector">
              <label>Investment Threshold</label>
              <select
                value={settings.investmentThreshold}
                onChange={(e) => updateSettings({ investmentThreshold: parseInt(e.target.value) })}
              >
                <option value="50">₹50</option>
                <option value="100">₹100</option>
                <option value="200">₹200</option>
                <option value="500">₹500</option>
              </select>
            </div>

            <div className="threshold-selector">
              <label>Round-up To Nearest</label>
              <select
                value={settings.roundUpPreference}
                onChange={(e) => updateSettings({ roundUpPreference: parseInt(e.target.value) })}
              >
                <option value="5">₹5 (More frequent savings)</option>
                <option value="10">₹10 (Default)</option>
                <option value="20">₹20 (Medium savings)</option>
                <option value="50">₹50 (Larger savings)</option>
                <option value="100">₹100 (Maximum savings)</option>
              </select>
              <p className="setting-help">
                Current setting: Transactions round up to nearest ₹{settings.roundUpPreference}
              </p>
            </div>
          </>
        )}
      </div>

      <button
        className="invest-btn"
        onClick={handleInvest}
        disabled={!investAmount || parseFloat(investAmount) <= 0 || parseFloat(investAmount) > wallet}
      >
        Invest {investAmount ? formatCurrency(parseFloat(investAmount)) : 'Now'}
      </button>
    </div>
  );
};

export default InvestmentSelection;
