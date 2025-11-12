import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  calculateRoundUp, 
  shouldAutoInvest, 
  calculatePortfolioValue,
  calculateSavingsStreak 
} from '../utils/calculations';

// Create Context
const InvestmentContext = createContext();

// Custom hook to use the context
export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within InvestmentProvider');
  }
  return context;
};

// Initial state
const initialState = {
  transactions: [],
  wallet: 500, // Starting wallet balance
  investments: [],
  settings: {
    autoInvest: true,
    investmentThreshold: 100,
    preferredAsset: 'mutual_fund',
    roundUpPreference: 10 // New setting: round up to nearest 5, 10, 20, 50, or 100
  }
};

// Provider Component
export const InvestmentProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('fpti_data');
    return saved ? JSON.parse(saved) : initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fpti_data', JSON.stringify(state));
  }, [state]);

  // Add a new transaction
  const addTransaction = (description, amount) => {
    const roundUpData = calculateRoundUp(amount, state.settings.roundUpPreference);
    
    const newTransaction = {
      id: Date.now(),
      description,
      amount: roundUpData.original,
      rounded: roundUpData.rounded,
      spare: roundUpData.spare,
      roundUpPreference: roundUpData.roundUpPreference,
      date: new Date().toISOString()
    };

    setState(prev => {
      const updatedWallet = prev.wallet + roundUpData.spare;
      let updatedInvestments = [...prev.investments];
      let finalWallet = updatedWallet;

      // Check for auto-invest
      if (prev.settings.autoInvest && shouldAutoInvest(updatedWallet, prev.settings.investmentThreshold)) {
        const amountToInvest = prev.settings.investmentThreshold;
        finalWallet = updatedWallet - amountToInvest;

        const newInvestment = {
          id: Date.now() + 1,
          amount: amountToInvest,
          type: prev.settings.preferredAsset,
          date: new Date().toISOString(),
          fromTransaction: newTransaction.id
        };

        updatedInvestments.push(newInvestment);
      }

      return {
        ...prev,
        transactions: [...prev.transactions, newTransaction],
        wallet: parseFloat(finalWallet.toFixed(2)),
        investments: updatedInvestments
      };
    });

    return roundUpData;
  };

  // Manual investment from wallet
  const manualInvest = (amount, assetType) => {
    if (amount > state.wallet) {
      throw new Error('Insufficient wallet balance');
    }

    setState(prev => ({
      ...prev,
      wallet: parseFloat((prev.wallet - amount).toFixed(2)),
      investments: [
        ...prev.investments,
        {
          id: Date.now(),
          amount,
          type: assetType,
          date: new Date().toISOString(),
          manual: true
        }
      ]
    }));
  };

  // Withdraw from wallet
  const withdrawFromWallet = (amount) => {
    if (amount > state.wallet) {
      throw new Error('Insufficient wallet balance');
    }

    setState(prev => ({
      ...prev,
      wallet: parseFloat((prev.wallet - amount).toFixed(2))
    }));
  };

  // Update settings
  const updateSettings = (newSettings) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  };

  // Clear all data (reset)
  const resetAllData = () => {
    setState(initialState);
    localStorage.removeItem('fpti_data');
  };

  // Add demo data for testing
  const addDemoData = () => {
    const demoTransactions = [
      { desc: 'Coffee at Cafe', amt: 73 },
      { desc: 'Grocery Shopping', amt: 456 },
      { desc: 'Bus Ticket', amt: 42 },
      { desc: 'Lunch', amt: 185 },
      { desc: 'Movie Ticket', amt: 299 },
      { desc: 'Book Purchase', amt: 349 },
      { desc: 'Medicine', amt: 127 },
      { desc: 'Mobile Recharge', amt: 239 },
      { desc: 'Snacks', amt: 95 },
      { desc: 'Fuel', amt: 523 }
    ];

    setState(prev => {
      let newState = { ...prev };
      
      demoTransactions.forEach((t, index) => {
        const roundUpData = calculateRoundUp(t.amt, newState.settings.roundUpPreference);
        const demoDate = new Date();
        demoDate.setDate(demoDate.getDate() - (9 - index)); // Spread over 10 days

        const newTransaction = {
          id: Date.now() + index,
          description: t.desc,
          amount: roundUpData.original,
          rounded: roundUpData.rounded,
          spare: roundUpData.spare,
          roundUpPreference: roundUpData.roundUpPreference,
          date: demoDate.toISOString()
        };

        newState.transactions.push(newTransaction);
        newState.wallet += roundUpData.spare;
      });

      // Create some demo investments
      const demoInvestDate1 = new Date();
      demoInvestDate1.setDate(demoInvestDate1.getDate() - 5);
      
      const demoInvestDate2 = new Date();
      demoInvestDate2.setDate(demoInvestDate2.getDate() - 2);

      newState.investments = [
        {
          id: Date.now() + 1000,
          amount: 100,
          type: 'mutual_fund',
          date: demoInvestDate1.toISOString()
        },
        {
          id: Date.now() + 1001,
          amount: 100,
          type: 'etf',
          date: demoInvestDate2.toISOString()
        }
      ];

      newState.wallet = parseFloat((newState.wallet - 200).toFixed(2));

      return newState;
    });
  };

  // Calculate derived values
  const portfolioValue = calculatePortfolioValue(state.investments);
  const savingsStreak = calculateSavingsStreak(state.transactions);
  const totalSpareChange = state.transactions.reduce((sum, t) => sum + t.spare, 0);

  const value = {
    // State
    transactions: state.transactions,
    wallet: state.wallet,
    investments: state.investments,
    settings: state.settings,
    
    // Derived values
    portfolioValue,
    savingsStreak,
    totalSpareChange: parseFloat(totalSpareChange.toFixed(2)),
    
    // Actions
    addTransaction,
    manualInvest,
    withdrawFromWallet,
    updateSettings,
    resetAllData,
    addDemoData
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};
