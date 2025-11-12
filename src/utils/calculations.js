// ========================================
// CORE UTILITY FUNCTIONS FOR FPTI
// ========================================

/**
 * Round-up calculation logic
 * Rounds to nearest specified increment and calculates spare change
 * @param {number} amount - Original transaction amount
 * @param {number} roundUpTo - Round up to this value (5, 10, 20, 50, 100)
 * @returns {object} - Contains original, rounded, and spare amounts
 */
export const calculateRoundUp = (amount, roundUpTo = 10) => {
  // Ensure roundUpTo is a valid number, default to 10 if invalid
  const validRoundUpTo = [5, 10, 20, 50, 100].includes(roundUpTo) ? roundUpTo : 10;
  
  const roundedAmount = Math.ceil(amount / validRoundUpTo) * validRoundUpTo;
  const spare = roundedAmount - amount;
  
  return {
    original: amount,
    rounded: roundedAmount,
    spare: parseFloat(spare.toFixed(2)),
    roundUpPreference: validRoundUpTo
  };
};

/**
 * Check if wallet has reached investment threshold
 * @param {number} walletBalance - Current wallet balance
 * @param {number} threshold - Investment threshold (default 100)
 * @returns {boolean}
 */
export const shouldAutoInvest = (walletBalance, threshold = 100) => {
  return walletBalance >= threshold;
};

/**
 * Calculate investment growth with simulated returns
 * @param {number} principal - Initial investment amount
 * @param {string} assetType - Type of investment (mutual_fund, etf, bond)
 * @param {number} days - Number of days invested
 * @returns {number} - Current value with growth
 */
export const calculateInvestmentGrowth = (principal, assetType, days) => {
  // Annual return rates (simulated ranges)
  const returnRates = {
    mutual_fund: { min: 0.06, max: 0.08 }, // 6-8% annually
    etf: { min: 0.04, max: 0.06 },          // 4-6% annually
    bond: { min: 0.02, max: 0.04 }          // 2-4% annually
  };
  
  const rates = returnRates[assetType] || returnRates.etf;
  
  // Random return within range + some volatility
  const randomRate = rates.min + Math.random() * (rates.max - rates.min);
  const dailyRate = randomRate / 365;
  
  // Add small random volatility (-0.5% to +0.5% daily)
  const volatility = (Math.random() - 0.5) * 0.01;
  const adjustedDailyRate = dailyRate + volatility;
  
  const currentValue = principal * Math.pow(1 + adjustedDailyRate, days);
  
  return parseFloat(currentValue.toFixed(2));
};

/**
 * Calculate total portfolio value
 * @param {array} investments - Array of investment objects
 * @returns {object} - Total invested, current value, profit/loss
 */
export const calculatePortfolioValue = (investments) => {
  let totalInvested = 0;
  let currentValue = 0;
  
  investments.forEach(inv => {
    totalInvested += inv.amount;
    
    const daysSinceInvestment = Math.floor(
      (Date.now() - new Date(inv.date).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    currentValue += calculateInvestmentGrowth(
      inv.amount,
      inv.type,
      daysSinceInvestment
    );
  });
  
  const profitLoss = currentValue - totalInvested;
  const profitLossPercentage = totalInvested > 0 
    ? ((profitLoss / totalInvested) * 100).toFixed(2)
    : 0;
  
  return {
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    currentValue: parseFloat(currentValue.toFixed(2)),
    profitLoss: parseFloat(profitLoss.toFixed(2)),
    profitLossPercentage: parseFloat(profitLossPercentage)
  };
};

/**
 * Format currency in Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Generate motivational savings tips
 * @param {number} totalSaved - Total amount saved through roundups
 * @param {number} streak - Current savings streak
 * @returns {string} - Motivational message
 */
export const generateSavingsTip = (totalSaved, streak) => {
  const tips = [
    `Amazing! You've saved ${formatCurrency(totalSaved)} without even noticing! 🎉`,
    `${streak} days streak! You're building wealth one round-up at a time! 💪`,
    `Small changes add up! You've invested ${formatCurrency(totalSaved)} in spare change! 🚀`,
    `You're ${formatCurrency(totalSaved)} richer than you think! Keep going! 💰`,
    `Every rupee counts! Your future self will thank you! 🌟`,
    `Consistency is key! ${streak} days of smart saving! 🔥`,
    `You're not just saving, you're investing in your dreams! ✨`
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

/**
 * Calculate badge level based on total invested
 * @param {number} totalInvested - Total amount invested
 * @returns {object} - Badge info
 */
export const calculateBadgeLevel = (totalInvested) => {
  const levels = [
    { name: 'Bronze Saver', threshold: 0, icon: '🥉', color: '#CD7F32' },
    { name: 'Silver Investor', threshold: 500, icon: '🥈', color: '#C0C0C0' },
    { name: 'Gold Accumulator', threshold: 2000, icon: '🥇', color: '#FFD700' },
    { name: 'Platinum Wealth Builder', threshold: 5000, icon: '💎', color: '#E5E4E2' },
    { name: 'Diamond Elite', threshold: 10000, icon: '👑', color: '#B9F2FF' }
  ];
  
  let currentLevel = levels[0];
  let nextLevel = levels[1];
  
  for (let i = 0; i < levels.length; i++) {
    if (totalInvested >= levels[i].threshold) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1] || currentLevel;
    }
  }
  
  const progress = nextLevel !== currentLevel
    ? ((totalInvested - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100
    : 100;
  
  return {
    current: currentLevel,
    next: nextLevel,
    progress: Math.min(progress, 100)
  };
};

/**
 * Get investment asset details
 * @param {string} type - Asset type
 * @returns {object} - Asset details
 */
export const getAssetDetails = (type) => {
  const assets = {
    mutual_fund: {
      name: 'Mutual Fund',
      risk: 'Moderate',
      returns: '6-8% annually',
      description: 'Diversified portfolio with balanced risk-return',
      icon: '📈',
      color: '#10b981'
    },
    etf: {
      name: 'ETF',
      risk: 'Low',
      returns: '4-6% annually',
      description: 'Exchange-traded funds with market tracking',
      icon: '📊',
      color: '#3b82f6'
    },
    bond: {
      name: 'Government Bond',
      risk: 'Very Low',
      returns: '2-4% annually',
      description: 'Safe government-backed securities',
      icon: '🏛️',
      color: '#8b5cf6'
    }
  };
  
  return assets[type] || assets.etf;
};

/**
 * Generate chart data for portfolio growth
 * @param {array} investments - Array of investments
 * @param {number} days - Number of days to show
 * @returns {array} - Chart data points
 */
export const generatePortfolioChartData = (investments, days = 30) => {
  const chartData = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    let dayValue = 0;
    
    investments.forEach(inv => {
      const invDate = new Date(inv.date);
      if (invDate <= date) {
        const daysFromInv = Math.floor((date - invDate) / (1000 * 60 * 60 * 24));
        dayValue += calculateInvestmentGrowth(inv.amount, inv.type, daysFromInv);
      }
    });
    
    chartData.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: parseFloat(dayValue.toFixed(2))
    });
  }
  
  return chartData;
};

/**
 * Calculate savings streak
 * @param {array} transactions - Array of transactions
 * @returns {number} - Consecutive days with transactions
 */
export const calculateSavingsStreak = (transactions) => {
  if (!transactions || transactions.length === 0) return 0;
  
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sortedTransactions.length; i++) {
    const transactionDate = new Date(sortedTransactions[i].date);
    transactionDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate - transactionDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff > streak) {
      break;
    }
  }
  
  return streak;
};

/**
 * Calculate future investment value using compound interest
 * @param {number} principal - Current portfolio value
 * @param {number} monthlyContribution - Expected monthly additions
 * @param {number} annualRate - Expected annual return rate (as decimal)
 * @param {number} years - Number of years to project
 * @returns {number} - Future value
 */
export const calculateCompoundInterest = (principal, monthlyContribution, annualRate, years) => {
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  
  // Future value of current principal
  const principalFV = principal * Math.pow(1 + monthlyRate, months);
  
  // Future value of monthly contributions (annuity)
  let contributionFV = 0;
  if (monthlyContribution > 0 && monthlyRate > 0) {
    contributionFV = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  
  return parseFloat((principalFV + contributionFV).toFixed(2));
};

/**
 * Generate forecast data for portfolio
 * @param {number} currentValue - Current portfolio value
 * @param {number} monthlyContribution - Expected monthly additions
 * @param {string} assetMix - Predominant asset type for rate estimation
 * @returns {array} - Forecast data for different time periods
 */
export const generateForecastData = (currentValue, monthlyContribution, assetMix = 'balanced') => {
  // Determine rates based on asset mix
  const rates = {
    conservative: 0.03,  // 3% annual (mostly bonds)
    balanced: 0.05,      // 5% annual (mixed)
    moderate: 0.06,      // 6% annual (ETFs + Mutual Funds)
    aggressive: 0.07     // 7% annual (mostly Mutual Funds)
  };
  
  const rate = rates[assetMix] || rates.balanced;
  
  const periods = [
    { label: '3 Months', years: 0.25 },
    { label: '6 Months', years: 0.5 },
    { label: '9 Months', years: 0.75 },
    { label: '1 Year', years: 1 },
    { label: '2 Years', years: 2 },
    { label: '5 Years', years: 5 }
  ];
  
  return periods.map(period => {
    const futureValue = calculateCompoundInterest(currentValue, monthlyContribution, rate, period.years);
    const totalContributions = monthlyContribution * period.years * 12;
    const totalGrowth = futureValue - currentValue - totalContributions;
    
    return {
      period: period.label,
      years: period.years,
      futureValue,
      currentValue,
      totalContributions,
      growth: totalGrowth,
      totalInvested: currentValue + totalContributions,
      roi: currentValue > 0 ? ((futureValue - currentValue - totalContributions) / (currentValue + totalContributions) * 100).toFixed(2) : 0
    };
  });
};

