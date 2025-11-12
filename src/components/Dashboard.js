import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { formatCurrency, generateSavingsTip, calculateBadgeLevel } from '../utils/calculations';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const { 
    wallet, 
    portfolioValue, 
    savingsStreak, 
    totalSpareChange,
    transactions,
    settings
  } = useInvestment();

  const [showTip, setShowTip] = useState(true);
  const badge = calculateBadgeLevel(portfolioValue.totalInvested);
  const tip = generateSavingsTip(totalSpareChange, savingsStreak);

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to JAZ Invest</h1>
        <p className="tagline">Invest your spare change, build your future</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card wallet-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Spare Change Wallet</h3>
            <p className="stat-value">{formatCurrency(wallet)}</p>
            <span className="stat-label">Ready to invest</span>
          </div>
        </div>

        <div className="stat-card invested-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Total Invested</h3>
            <p className="stat-value">{formatCurrency(portfolioValue.totalInvested)}</p>
            <span className="stat-label">Principal amount</span>
          </div>
        </div>

        <div className="stat-card portfolio-card">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <h3>Portfolio Value</h3>
            <p className="stat-value">{formatCurrency(portfolioValue.currentValue)}</p>
            <span className={`stat-label ${portfolioValue.profitLoss >= 0 ? 'profit' : 'loss'}`}>
              {portfolioValue.profitLoss >= 0 ? '↑' : '↓'} {formatCurrency(Math.abs(portfolioValue.profitLoss))} 
              ({portfolioValue.profitLossPercentage}%)
            </span>
          </div>
        </div>

        <div className="stat-card savings-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>Savings Streak</h3>
            <p className="stat-value">{savingsStreak} days</p>
            <span className="stat-label">Keep it going!</span>
          </div>
        </div>
      </div>

      {/* Motivational Tip */}
      {showTip && (
        <div className="tip-card">
          <button className="tip-close" onClick={() => setShowTip(false)}>×</button>
          <div className="tip-icon">💡</div>
          <p className="tip-text">{tip}</p>
          <p className="tip-subtext">Round-up set to: ₹{settings.roundUpPreference}</p>
        </div>
      )}

      {/* Badge Progress */}
      <div className="badge-section">
        <div className="badge-header">
          <div className="current-badge">
            <span className="badge-icon">{badge.current.icon}</span>
            <div>
              <h3>{badge.current.name}</h3>
              <p>Current Level</p>
            </div>
          </div>
          {badge.next !== badge.current && (
            <div className="next-badge">
              <span className="badge-icon-small">{badge.next.icon}</span>
              <div>
                <p className="next-label">Next: {badge.next.name}</p>
                <p className="next-target">{formatCurrency(badge.next.threshold)}</p>
              </div>
            </div>
          )}
        </div>
        
        {badge.next !== badge.current && (
          <div className="badge-progress">
            <div 
              className="badge-progress-bar" 
              style={{ width: `${badge.progress}%`, backgroundColor: badge.current.color }}
            ></div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn primary" onClick={() => onNavigate('transaction')}>
          <span className="btn-icon">➕</span>
          Add Transaction
        </button>
        <button className="action-btn secondary" onClick={() => onNavigate('portfolio')}>
          <span className="btn-icon">📊</span>
          View Portfolio
        </button>
        <button className="action-btn tertiary" onClick={() => onNavigate('invest')}>
          <span className="btn-icon">💸</span>
          Invest Now
        </button>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Transactions</h2>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Start adding your expenses!</p>
          </div>
        ) : (
          <div className="transaction-list">
            {transactions.slice(-5).reverse().map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.description}</h4>
                  <p>{new Date(transaction.date).toLocaleDateString('en-IN')} • Rounded to ₹{transaction.roundUpPreference || 10}</p>
                </div>
                <div className="transaction-amounts">
                  <span className="original-amount">{formatCurrency(transaction.amount)}</span>
                  <span className="spare-amount">+{formatCurrency(transaction.spare)} saved</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
