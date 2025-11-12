# 🏗️ FPTI - Architecture & Data Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FPTI Application                        │
│                    (React 18 + Context API)                     │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                  │
        ┌───────▼────────┐              ┌────────▼────────┐
        │   Components    │              │  State Layer    │
        │   (UI Layer)    │◄────────────►│   (Context)     │
        └────────────────┘              └─────────────────┘
                │                                  │
      ┌─────────┼─────────┐                       │
      │         │         │                       │
   ┌──▼──┐  ┌──▼──┐  ┌──▼──┐                    │
   │Home │  │Trans│  │Invest│                    │
   │Page │  │Page │  │Page │                     │
   └─────┘  └─────┘  └─────┘                     │
      │         │         │                       │
   ┌──▼──┐  ┌──▼──┐                              │
   │Port │  │Reward                               │
   │folio│  │Page │                               │
   └─────┘  └─────┘                               │
                                                  │
                                          ┌───────▼───────┐
                                          │ Local Storage │
                                          │  (Persistence)│
                                          └───────────────┘
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      User Actions                            │
└──────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼──────┐ ┌───▼────┐ ┌─────▼─────┐
        │ Add Trans.   │ │ Invest │ │  Settings │
        └──────────────┘ └────────┘ └───────────┘
                │             │             │
                └─────────────┼─────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Context Actions  │
                    │ (addTransaction,  │
                    │  manualInvest,    │
                    │  updateSettings)  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  State Updates    │
                    │  • transactions   │
                    │  • wallet         │
                    │  • investments    │
                    │  • settings       │
                    └─────────┬─────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼──────┐ ┌───▼────┐ ┌─────▼─────┐
        │ Auto-Invest  │ │  Save  │ │ Re-render │
        │   Logic      │ │to Local│ │Components │
        └──────────────┘ └────────┘ └───────────┘
```

---

## Component Hierarchy

```
App
├── Navigation Bar
│   ├── Brand Logo
│   ├── Menu Items (5)
│   │   ├── Home
│   │   ├── Add Transaction
│   │   ├── Invest
│   │   ├── Portfolio
│   │   └── Rewards
│   └── Actions
│       ├── Add Demo Data
│       └── Reset
│
├── Main Content (Router)
│   │
│   ├── Dashboard
│   │   ├── Hero Section
│   │   ├── Stats Grid (4 cards)
│   │   │   ├── Wallet Card
│   │   │   ├── Invested Card
│   │   │   ├── Portfolio Card
│   │   │   └── Streak Card
│   │   ├── Tip Card
│   │   ├── Badge Section
│   │   ├── Quick Actions (3 buttons)
│   │   └── Recent Transactions
│   │
│   ├── TransactionInput
│   │   ├── Wallet Display
│   │   ├── Success Message (conditional)
│   │   ├── Form
│   │   │   ├── Description Input
│   │   │   ├── Amount Input
│   │   │   └── Quick Buttons
│   │   └── Info Section
│   │
│   ├── InvestmentSelection
│   │   ├── Wallet Info
│   │   ├── Amount Input
│   │   ├── Asset Cards (3)
│   │   │   ├── Mutual Fund
│   │   │   ├── ETF
│   │   │   └── Bond
│   │   ├── Auto-Invest Settings
│   │   └── Invest Button
│   │
│   ├── Portfolio
│   │   ├── Summary Cards (4)
│   │   ├── Growth Chart (Line)
│   │   ├── Distribution Chart (Pie)
│   │   └── Investment List
│   │
│   └── Rewards
│       ├── Current Level Badge
│       ├── Stats Overview (3 cards)
│       ├── Progress Section
│       ├── Achievements Grid (8)
│       └── Motivation Section
│
└── Footer
```

---

## State Structure

```javascript
InvestmentContext State
{
  // Core Data
  transactions: [
    {
      id: number,              // Unique identifier
      description: string,     // "Coffee", "Lunch", etc.
      amount: number,          // Original amount (73)
      rounded: number,         // Rounded amount (80)
      spare: number,          // Spare change (7)
      date: ISOString         // "2025-11-12T10:30:00"
    }
  ],
  
  wallet: number,             // Accumulated spare change
  
  investments: [
    {
      id: number,              // Unique identifier
      amount: number,          // Investment amount (100)
      type: string,           // "mutual_fund", "etf", "bond"
      date: ISOString,        // Investment date
      manual: boolean         // True if manual, false if auto
    }
  ],
  
  settings: {
    autoInvest: boolean,      // Auto-invest enabled?
    investmentThreshold: number, // 50, 100, 200, or 500
    preferredAsset: string   // "mutual_fund", "etf", "bond"
  },
  
  // Computed Values
  portfolioValue: {
    totalInvested: number,    // Sum of all investments
    currentValue: number,     // With simulated growth
    profitLoss: number,       // Current - Invested
    profitLossPercentage: number  // Percentage gain/loss
  },
  
  savingsStreak: number,      // Consecutive days
  totalSpareChange: number    // All-time spare change
}
```

---

## Calculation Flow

### Round-Up Calculation
```
Input: Transaction amount (73)
    ↓
Calculation: Math.ceil(73 / 10) × 10 = 80
    ↓
Spare: 80 - 73 = 7
    ↓
Output: { original: 73, rounded: 80, spare: 7 }
```

### Investment Growth Simulation
```
Input: 
  - Principal: ₹100
  - Asset Type: Mutual Fund (6-8% annual)
  - Days: 30
    ↓
Daily Rate: (7% / 365) = 0.0192%
    ↓
Volatility: Random(-0.5% to +0.5%) = 0.2%
    ↓
Adjusted Rate: 0.0192% + 0.2% = 0.2192%
    ↓
Growth: 100 × (1.002192)^30 = ₹106.74
    ↓
Output: Current Value = ₹106.74
```

### Auto-Invest Trigger
```
Input: New transaction with ₹7 spare
    ↓
Wallet Update: ₹95 + ₹7 = ₹102
    ↓
Check: Is auto-invest ON? YES
Check: Wallet ≥ Threshold (100)? YES (102 ≥ 100)
    ↓
Action: Invest ₹100 in preferred asset
    ↓
Wallet Update: ₹102 - ₹100 = ₹2
    ↓
Create Investment Record
    ↓
Output: New investment + Updated wallet
```

### Badge Level Calculation
```
Input: Total Invested = ₹2,500
    ↓
Check Levels:
  Bronze (₹0+): ✓ Passed
  Silver (₹500+): ✓ Passed
  Gold (₹2,000+): ✓ Passed
  Platinum (₹5,000+): ✗ Not reached
    ↓
Current Level: Gold
Next Level: Platinum
    ↓
Progress: (2,500 - 2,000) / (5,000 - 2,000) × 100 = 16.67%
    ↓
Output: { current: Gold, next: Platinum, progress: 16.67% }
```

---

## Technology Stack Details

```
┌──────────────────────────────────────────┐
│           Frontend Stack                 │
├──────────────────────────────────────────┤
│ React 18.2.0                             │
│ ├─ Functional Components                │
│ ├─ Hooks (useState, useEffect, useContext│
│ └─ Context API (State Management)       │
├──────────────────────────────────────────┤
│ Recharts 2.5.0                          │
│ ├─ LineChart (Portfolio Growth)         │
│ ├─ PieChart (Asset Distribution)        │
│ └─ Responsive Containers                │
├──────────────────────────────────────────┤
│ React Router DOM 6.8.0                  │
│ ├─ Client-side Routing                  │
│ └─ Navigation State Management          │
├──────────────────────────────────────────┤
│ CSS3                                     │
│ ├─ Custom Properties (Variables)        │
│ ├─ Grid & Flexbox Layouts               │
│ ├─ Animations & Transitions             │
│ └─ Media Queries (Responsive)           │
├──────────────────────────────────────────┤
│ Local Storage API                        │
│ ├─ Data Persistence                     │
│ ├─ Automatic Sync                       │
│ └─ JSON Serialization                   │
└──────────────────────────────────────────┘
```

---

## File Dependencies

```
App.js
├── requires → InvestmentContext.js
├── requires → Dashboard.js
│   └── requires → calculations.js
├── requires → TransactionInput.js
│   └── requires → calculations.js
├── requires → InvestmentSelection.js
│   └── requires → calculations.js
├── requires → Portfolio.js
│   ├── requires → calculations.js
│   └── requires → recharts
└── requires → Rewards.js
    └── requires → calculations.js

InvestmentContext.js
└── requires → calculations.js

calculations.js
└── (no dependencies - pure functions)
```

---

## Performance Optimizations

```
┌────────────────────────────────────────┐
│        Optimization Strategies         │
├────────────────────────────────────────┤
│ ✓ Context API                          │
│   └─ Prevents prop drilling            │
│   └─ Centralized state                 │
├────────────────────────────────────────┤
│ ✓ Local Storage                        │
│   └─ Only save on state change         │
│   └─ Debounced writes                  │
├────────────────────────────────────────┤
│ ✓ Calculations                         │
│   └─ Cached derived values             │
│   └─ Memoized computations             │
├────────────────────────────────────────┤
│ ✓ Rendering                            │
│   └─ Conditional rendering             │
│   └─ Key-based lists                   │
├────────────────────────────────────────┤
│ ✓ CSS                                  │
│   └─ Hardware-accelerated transforms   │
│   └─ Optimized animations              │
└────────────────────────────────────────┘
```

---

## Responsive Breakpoints

```
Mobile First Approach:

Base (320px+)
├─ Single column layouts
├─ Stacked navigation
├─ Full-width cards
└─ Touch-optimized buttons

Tablet (768px+)
├─ 2-column grids
├─ Horizontal navigation
├─ Side-by-side charts
└─ Medium-sized cards

Desktop (1024px+)
├─ 3-4 column grids
├─ Full navigation bar
├─ Split-screen layouts
└─ Expanded content

Large Desktop (1400px+)
├─ Centered max-width
├─ Optimal reading width
├─ Enhanced spacing
└─ Premium experience
```

---

## Security Considerations

```
Current Implementation (Demo):
├─ Local storage only
├─ No authentication
├─ Client-side only
├─ No API calls
└─ Simulated data

Production Requirements:
├─ User Authentication
│   ├─ JWT tokens
│   ├─ Secure sessions
│   └─ Password hashing
├─ Data Encryption
│   ├─ HTTPS only
│   ├─ Encrypted storage
│   └─ Secure transmission
├─ API Security
│   ├─ Rate limiting
│   ├─ CORS policies
│   └─ Input validation
└─ Compliance
    ├─ GDPR
    ├─ PCI DSS
    └─ SEBI regulations
```

---

## Development Workflow

```
Setup
  ↓
npm install
  ↓
npm start
  ↓
Development Server @ localhost:3000
  ↓
Code Changes → Hot Reload
  ↓
Testing (Add Demo Data)
  ↓
Ready for Production
  ↓
npm run build
  ↓
Production Build in /build folder
  ↓
Deploy to Hosting
```

---

## Future Scalability

```
Phase 1: Backend Integration
├─ Node.js/Express API
├─ MongoDB/PostgreSQL Database
├─ Authentication Service
└─ RESTful endpoints

Phase 2: Real Financial APIs
├─ Bank Account Connection
├─ Mutual Fund APIs
├─ Stock Market Data
└─ Payment Gateway

Phase 3: Advanced Features
├─ AI Recommendations
├─ Robo-advisor
├─ Tax Optimization
└─ Financial Planning

Phase 4: Enterprise
├─ Multi-tenant
├─ White-label Solution
├─ Admin Dashboard
└─ Analytics Platform
```

---

## Git Repository Structure (Recommended)

```
main/master
  ├─ Initial commit (Project setup)
  ├─ Feature: Core utilities
  ├─ Feature: Context & State
  ├─ Feature: Dashboard component
  ├─ Feature: Transaction input
  ├─ Feature: Investment selection
  ├─ Feature: Portfolio & charts
  ├─ Feature: Rewards & gamification
  ├─ Feature: Styling & animations
  ├─ Documentation update
  └─ Production ready

develop
  └─ Ongoing development

feature/*
  ├─ feature/banking-integration
  ├─ feature/real-time-api
  └─ feature/social-features
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure
- ✅ Easy to understand flow
- ✅ Maintainable codebase
- ✅ Ready for expansion
