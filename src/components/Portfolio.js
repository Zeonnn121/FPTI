import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { useInvestment } from '../context/InvestmentContext';
import { formatCurrency, getAssetDetails, generatePortfolioChartData, calculateInvestmentGrowth, generateForecastData } from '../utils/calculations';
import './Portfolio.css';

const Portfolio = ({ onNavigate }) => {
  const { investments, portfolioValue, wallet } = useInvestment();
  const [showForecast, setShowForecast] = useState(false);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [assetMix, setAssetMix] = useState('balanced');

  // Generate chart data
  const chartData = generatePortfolioChartData(investments, 30);

  // Calculate asset distribution
  const assetDistribution = {};
  investments.forEach(inv => {
    const currentDays = Math.floor((Date.now() - new Date(inv.date).getTime()) / (1000 * 60 * 60 * 24));
    const currentValue = calculateInvestmentGrowth(inv.amount, inv.type, currentDays);
    
    if (!assetDistribution[inv.type]) {
      assetDistribution[inv.type] = 0;
    }
    assetDistribution[inv.type] += currentValue;
  });

  const pieData = Object.keys(assetDistribution).map(type => ({
    name: getAssetDetails(type).name,
    value: assetDistribution[type],
    color: getAssetDetails(type).color
  }));

  const COLORS = pieData.map(d => d.color);

  // Generate forecast data
  const forecastData = generateForecastData(portfolioValue.currentValue, monthlyContribution, assetMix);

  return (
    <div className="portfolio">
      <div className="page-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>← Back</button>
        <h1>Investment Portfolio</h1>
      </div>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card">
          <h3>Total Invested</h3>
          <p className="summary-value">{formatCurrency(portfolioValue.totalInvested)}</p>
        </div>
        <div className="summary-card">
          <h3>Current Value</h3>
          <p className="summary-value">{formatCurrency(portfolioValue.currentValue)}</p>
        </div>
        <div className="summary-card">
          <h3>Profit/Loss</h3>
          <p className={`summary-value ${portfolioValue.profitLoss >= 0 ? 'profit' : 'loss'}`}>
            {portfolioValue.profitLoss >= 0 ? '+' : ''}{formatCurrency(portfolioValue.profitLoss)}
            <span className="percentage">({portfolioValue.profitLossPercentage}%)</span>
          </p>
        </div>
        <div className="summary-card">
          <h3>Wallet Balance</h3>
          <p className="summary-value">{formatCurrency(wallet)}</p>
        </div>
      </div>

      {investments.length === 0 ? (
        <div className="empty-portfolio">
          <div className="empty-icon">📊</div>
          <h2>No Investments Yet</h2>
          <p>Start investing your spare change to see your portfolio grow!</p>
          <button className="start-btn" onClick={() => onNavigate('invest')}>
            Start Investing
          </button>
        </div>
      ) : (
        <>
          {/* Growth Chart */}
          <div className="chart-section">
            <h2>Portfolio Growth (Last 30 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Investment Forecast Section */}
          <div className="forecast-section">
            <div className="forecast-header">
              <div>
                <h2>Investment Forecast</h2>
                <p className="forecast-subtitle">Project your portfolio growth using compound interest</p>
              </div>
              <button 
                className={`forecast-toggle-btn ${showForecast ? 'active' : ''}`}
                onClick={() => setShowForecast(!showForecast)}
              >
                {showForecast ? '📊 Hide Forecast' : '🔮 View Forecast'}
              </button>
            </div>

            {showForecast && (
              <div className="forecast-content">
                {/* Forecast Settings */}
                <div className="forecast-settings">
                  <div className="setting-group">
                    <label>Expected Monthly Contribution</label>
                    <div className="contribution-input">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                      />
                    </div>
                    <p className="setting-help">How much you plan to invest monthly</p>
                  </div>

                  <div className="setting-group">
                    <label>Investment Strategy</label>
                    <select 
                      value={assetMix}
                      onChange={(e) => setAssetMix(e.target.value)}
                      className="strategy-selector"
                    >
                      <option value="conservative">Conservative (3% annual) - Mostly Bonds</option>
                      <option value="balanced">Balanced (5% annual) - Mixed Portfolio</option>
                      <option value="moderate">Moderate (6% annual) - ETFs + Mutual Funds</option>
                      <option value="aggressive">Aggressive (7% annual) - Mostly Mutual Funds</option>
                    </select>
                    <p className="setting-help">Expected return based on your investment mix</p>
                  </div>
                </div>

                {/* Forecast Chart */}
                <div className="forecast-chart">
                  <h3>Projected Portfolio Value</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="period" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Bar dataKey="currentValue" name="Current Value" fill="#6366f1" />
                      <Bar dataKey="totalContributions" name="Future Contributions" fill="#f59e0b" />
                      <Bar dataKey="growth" name="Investment Growth" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Forecast Details Table */}
                <div className="forecast-table">
                  <h3>Detailed Projections</h3>
                  <div className="forecast-grid">
                    {forecastData.map((forecast, index) => (
                      <div key={index} className="forecast-card">
                        <div className="forecast-period">{forecast.period}</div>
                        <div className="forecast-main-value">
                          <span className="forecast-label">Future Value</span>
                          <span className="forecast-value">{formatCurrency(forecast.futureValue)}</span>
                        </div>
                        <div className="forecast-details">
                          <div className="forecast-row">
                            <span>Current Portfolio:</span>
                            <span>{formatCurrency(forecast.currentValue)}</span>
                          </div>
                          <div className="forecast-row">
                            <span>Your Contributions:</span>
                            <span className="contribution-color">{formatCurrency(forecast.totalContributions)}</span>
                          </div>
                          <div className="forecast-row">
                            <span>Investment Growth:</span>
                            <span className="growth-color">{formatCurrency(forecast.growth)}</span>
                          </div>
                          <div className="forecast-row highlight">
                            <span>Total Gain:</span>
                            <span className="gain-color">+{forecast.roi}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forecast Disclaimer */}
                <div className="forecast-disclaimer">
                  <p>⚠️ <strong>Disclaimer:</strong> These projections are estimates based on compound interest calculations and assumed returns. Actual returns may vary based on market conditions, investment choices, and economic factors. Past performance does not guarantee future results.</p>
                </div>
              </div>
            )}
          </div>

          {/* Asset Distribution */}
          <div className="distribution-section">
            <h2>Asset Distribution</h2>
            <div className="distribution-content">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="distribution-legend">
                {pieData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investment List */}
          <div className="investments-list">
            <h2>All Investments</h2>
            {investments.map(inv => {
              const asset = getAssetDetails(inv.type);
              const daysSinceInvestment = Math.floor(
                (Date.now() - new Date(inv.date).getTime()) / (1000 * 60 * 60 * 24)
              );
              const currentValue = calculateInvestmentGrowth(inv.amount, inv.type, daysSinceInvestment);
              const gain = currentValue - inv.amount;
              const gainPercentage = ((gain / inv.amount) * 100).toFixed(2);

              return (
                <div key={inv.id} className="investment-item">
                  <div className="investment-header">
                    <div className="investment-icon" style={{ color: asset.color }}>
                      {asset.icon}
                    </div>
                    <div className="investment-info">
                      <h4>{asset.name}</h4>
                      <p>{new Date(inv.date).toLocaleDateString('en-IN')} • {daysSinceInvestment} days ago</p>
                    </div>
                  </div>
                  <div className="investment-values">
                    <div className="value-row">
                      <span>Invested:</span>
                      <span>{formatCurrency(inv.amount)}</span>
                    </div>
                    <div className="value-row">
                      <span>Current:</span>
                      <span>{formatCurrency(currentValue)}</span>
                    </div>
                    <div className={`value-row gain ${gain >= 0 ? 'profit' : 'loss'}`}>
                      <span>Gain/Loss:</span>
                      <span>
                        {gain >= 0 ? '+' : ''}{formatCurrency(gain)} ({gainPercentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
