import React, { useState } from 'react';
import { InvestmentProvider, useInvestment } from './context/InvestmentContext';
import Dashboard from './components/Dashboard';
import TransactionInput from './components/TransactionInput';
import InvestmentSelection from './components/InvestmentSelection';
import Portfolio from './components/Portfolio';
import Rewards from './components/Rewards';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { addDemoData, resetAllData, transactions } = useInvestment();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'transaction':
        return <TransactionInput onNavigate={setCurrentPage} />;
      case 'invest':
        return <InvestmentSelection onNavigate={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio onNavigate={setCurrentPage} />;
      case 'rewards':
        return <Rewards onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo">💰</span>
          <span className="brand-name">FPTI</span>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'transaction' ? 'active' : ''}`}
            onClick={() => setCurrentPage('transaction')}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-label">Add</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'invest' ? 'active' : ''}`}
            onClick={() => setCurrentPage('invest')}
          >
            <span className="nav-icon">💸</span>
            <span className="nav-label">Invest</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'portfolio' ? 'active' : ''}`}
            onClick={() => setCurrentPage('portfolio')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Portfolio</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'rewards' ? 'active' : ''}`}
            onClick={() => setCurrentPage('rewards')}
          >
            <span className="nav-icon">🏆</span>
            <span className="nav-label">Rewards</span>
          </button>
        </div>
        <div className="nav-actions">
          {transactions.length === 0 && (
            <button className="demo-btn" onClick={addDemoData}>
              Add Demo Data
            </button>
          )}
          {transactions.length > 0 && (
            <button className="reset-btn" onClick={() => {
              if (window.confirm('Are you sure you want to reset all data?')) {
                resetAllData();
                setCurrentPage('home');
              }
            }}>
              Reset
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Footer */}
     
    </div>
  );
}

function App() {
  return (
    <InvestmentProvider>
      <AppContent />
    </InvestmentProvider>
  );
}

export default App;
