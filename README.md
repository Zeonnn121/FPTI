# 🚀 FPTI - Micro-Investment Platform

**Round-up Savings & Auto Invest**

## 📖 Overview

FPTI is an intuitive micro-investment platform that helps users save and invest effortlessly by rounding up daily transactions and automatically investing spare change into virtual mutual funds, ETFs, or government bonds.

## ✨ Features

- **Automatic Round-up Calculation**: Every transaction is rounded up to the nearest ₹10
- **Digital Wallet**: Accumulate spare change automatically
- **Auto-Invest**: Money is invested when threshold is reached (₹100, ₹200, etc.)
- **Investment Options**:
  - Mutual Funds (Moderate risk, 6-8% returns)
  - ETFs (Low risk, 4-6% returns)
  - Government Bonds (Very low risk, 2-4% returns)
- **Portfolio Dashboard**: Track your investments with beautiful charts
- **Growth Analytics**: View profit/loss and projections
- **Gamification**: Earn badges and maintain savings streaks
- **Smart Insights**: Get motivational tips about your savings

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

1. **Add Transaction**: Log your daily expenses manually or connect your bank (simulated)
2. **Automatic Round-up**: System rounds up each transaction (e.g., ₹73 → ₹80, spare ₹7)
3. **Accumulation**: Spare change accumulates in your wallet
4. **Auto-Invest**: When wallet reaches ₹100, money is automatically invested
5. **Track Growth**: Monitor your portfolio with real-time charts and analytics

## 🏗️ Project Structure

```
fpti/
├── public/
├── src/
│   ├── components/     # React components
│   ├── context/        # State management
│   ├── utils/          # Utility functions
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
└── package.json
```

## 🎨 Design Philosophy

Built with the Design Thinking approach:
- **Empathize**: Understanding users who want to save but often forget
- **Define**: Providing effortless, low-risk saving solutions
- **Ideate**: Creating automated micro-investment features
- **Prototype**: Intuitive UI with clear financial insights
- **Test**: Continuous user feedback integration

## 📊 Technologies Used

- **React 18**: Modern UI framework
- **React Router**: Navigation
- **Recharts**: Beautiful data visualizations
- **Context API**: State management
- **Local Storage**: Data persistence

## 🎮 Gamification Elements

- **Savings Streaks**: Track consecutive saving days
- **Achievement Badges**: Unlock milestones
- **Progress Levels**: Grow from Bronze to Platinum
- **Smart Tips**: Motivational insights

## 📈 Investment Simulation

The platform simulates realistic market conditions:
- Daily portfolio value updates
- Random growth rates within asset class ranges
- Profit/Loss tracking
- Historical performance charts

## 🔒 Security Note

This is a demonstration platform with simulated investments. For real financial transactions, ensure proper security measures, regulatory compliance, and integration with licensed financial service providers.

## 📝 License

MIT License - Feel free to use this project for learning and development purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ for financial empowerment**
