import React from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { formatCurrency, calculateBadgeLevel } from '../utils/calculations';
import './Rewards.css';

const Rewards = ({ onNavigate }) => {
  const { portfolioValue, savingsStreak, totalSpareChange, transactions } = useInvestment();
  
  const badge = calculateBadgeLevel(portfolioValue.totalInvested);

  // Achievement milestones
  const achievements = [
    {
      id: 1,
      title: 'First Step',
      description: 'Add your first transaction',
      icon: '🎯',
      achieved: transactions.length >= 1,
      reward: 'Bronze Badge'
    },
    {
      id: 2,
      title: 'Regular Saver',
      description: 'Maintain a 7-day savings streak',
      icon: '🔥',
      achieved: savingsStreak >= 7,
      reward: '50 Bonus Points'
    },
    {
      id: 3,
      title: 'Investor',
      description: 'Make your first investment',
      icon: '💰',
      achieved: portfolioValue.totalInvested > 0,
      reward: 'Silver Badge'
    },
    {
      id: 4,
      title: 'Committed Saver',
      description: 'Save ₹500 in spare change',
      icon: '💎',
      achieved: totalSpareChange >= 500,
      reward: 'Gold Badge'
    },
    {
      id: 5,
      title: 'Portfolio Builder',
      description: 'Invest ₹1000 or more',
      icon: '📈',
      achieved: portfolioValue.totalInvested >= 1000,
      reward: 'Platinum Badge'
    },
    {
      id: 6,
      title: 'Consistency King',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      achieved: savingsStreak >= 30,
      reward: 'Crown Badge'
    },
    {
      id: 7,
      title: 'Wealth Builder',
      description: 'Reach ₹5000 total invested',
      icon: '🏆',
      achieved: portfolioValue.totalInvested >= 5000,
      reward: 'Trophy Badge'
    },
    {
      id: 8,
      title: 'Profit Maker',
      description: 'Earn ₹100 in returns',
      icon: '💸',
      achieved: portfolioValue.profitLoss >= 100,
      reward: 'Money Master Badge'
    }
  ];

  const achievedCount = achievements.filter(a => a.achieved).length;
  const totalCount = achievements.length;
  const completionPercentage = (achievedCount / totalCount) * 100;

  return (
    <div className="rewards">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>← Back</button>
        <h1>Rewards & Achievements</h1>
      </div>

      {/* Current Level Badge */}
      <div className="current-level">
        <div className="level-badge" style={{ borderColor: badge.current.color }}>
          <span className="level-icon">{badge.current.icon}</span>
        </div>
        <h2>{badge.current.name}</h2>
        <p className="level-description">Total Invested: {formatCurrency(portfolioValue.totalInvested)}</p>
        
        {badge.next !== badge.current && (
          <>
            <div className="level-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${badge.progress}%`,
                    backgroundColor: badge.current.color 
                  }}
                ></div>
              </div>
              <p className="progress-text">
                {formatCurrency(portfolioValue.totalInvested)} / {formatCurrency(badge.next.threshold)}
              </p>
            </div>
            <p className="next-level">
              Next Level: {badge.next.icon} {badge.next.name}
            </p>
          </>
        )}
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-box">
          <span className="stat-icon">📊</span>
          <h3>{achievedCount}/{totalCount}</h3>
          <p>Achievements</p>
        </div>
        <div className="stat-box">
          <span className="stat-icon">🔥</span>
          <h3>{savingsStreak}</h3>
          <p>Day Streak</p>
        </div>
        <div className="stat-box">
          <span className="stat-icon">💰</span>
          <h3>{formatCurrency(totalSpareChange)}</h3>
          <p>Total Saved</p>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="achievement-progress">
        <div className="progress-header">
          <h3>Achievement Progress</h3>
          <span>{completionPercentage.toFixed(0)}% Complete</span>
        </div>
        <div className="progress-bar-large">
          <div 
            className="progress-fill-large" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="achievements-section">
        <h2>All Achievements</h2>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.achieved ? 'achieved' : 'locked'}`}
            >
              <div className="achievement-icon">
                {achievement.achieved ? achievement.icon : '🔒'}
              </div>
              <h4>{achievement.title}</h4>
              <p className="achievement-description">{achievement.description}</p>
              <div className="achievement-reward">
                {achievement.achieved ? (
                  <span className="reward-badge">✓ {achievement.reward}</span>
                ) : (
                  <span className="reward-badge locked">🔒 Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="motivation-section">
        <h3>Keep Going! 🚀</h3>
        <p>Every transaction brings you closer to financial freedom. Your future self will thank you!</p>
        <div className="motivation-stats">
          <p>💡 You've made <strong>{transactions.length}</strong> smart transactions</p>
          <p>🎯 Spare change saved: <strong>{formatCurrency(totalSpareChange)}</strong></p>
          <p>📈 Portfolio value: <strong>{formatCurrency(portfolioValue.currentValue)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
