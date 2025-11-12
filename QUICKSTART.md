# 🚀 FPTI Quick Start Guide

Welcome to FPTI - Your Micro-Investment Platform!

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start the App
```bash
npm start
```
The app will automatically open at http://localhost:3000

### 3️⃣ Try Demo Data
- Click the **"Add Demo Data"** button in the navigation bar
- This will populate the app with sample transactions and investments
- Explore all features with pre-loaded data!

---

## 🎯 Core Features Overview

### 💰 Round-up Savings
Every transaction you add is automatically rounded up to the nearest ₹10, and the spare change goes to your wallet.

**Example:**
- Buy coffee for ₹73
- Rounded to ₹80
- ₹7 saved automatically!

### 📈 Auto-Invest
When your wallet reaches ₹100 (configurable), money is automatically invested in your preferred asset.

### 🎮 Gamification
- Earn badges from Bronze to Diamond
- Unlock 8+ achievements
- Track your savings streak
- Get motivational tips

### 📊 Portfolio Tracking
- View investment growth with beautiful charts
- Track profit/loss in real-time
- See asset distribution
- Monitor individual investments

---

## 🗺️ Navigation Guide

### 🏠 Home (Dashboard)
- Overview of all your metrics
- Wallet balance, investments, portfolio value
- Recent transactions
- Badge progress
- Quick action buttons

### ➕ Add Transaction
- Enter your expense (description + amount)
- See round-up calculation
- Spare change added to wallet automatically
- Quick amount buttons for fast entry

### 💸 Invest
- Manually invest from your wallet
- Choose between:
  - 📈 Mutual Funds (6-8% returns, moderate risk)
  - 📊 ETFs (4-6% returns, low risk)
  - 🏛️ Government Bonds (2-4% returns, very low risk)
- Configure auto-invest settings
- Set investment threshold

### 📊 Portfolio
- View 30-day growth chart
- See asset distribution pie chart
- Track each investment's performance
- Monitor profit/loss with percentages

### 🏆 Rewards
- See your current badge level
- Track progress to next level
- View all achievements (locked/unlocked)
- Check your savings streak
- Get motivated with stats!

---

## 🎨 Feature Highlights

### Auto-Invest Settings
1. Go to **Invest** page
2. Toggle auto-invest ON/OFF
3. Choose threshold: ₹50, ₹100, ₹200, or ₹500
4. Set preferred asset type (Mutual Fund, ETF, or Bond)

### Investment Options Explained

| Asset Type | Risk | Returns | Best For |
|------------|------|---------|----------|
| 🏛️ Government Bonds | Very Low | 2-4% | Safety-first approach |
| 📊 ETFs | Low | 4-6% | Balanced growth |
| 📈 Mutual Funds | Moderate | 6-8% | Higher potential |

### Badge Progression
- 🥉 **Bronze Saver**: ₹0+ invested
- 🥈 **Silver Investor**: ₹500+ invested  
- 🥇 **Gold Accumulator**: ₹2,000+ invested
- 💎 **Platinum Wealth Builder**: ₹5,000+ invested
- 👑 **Diamond Elite**: ₹10,000+ invested

---

## 💡 Pro Tips

1. **Daily Habit**: Add transactions every day to build your streak
2. **Start Small**: Even ₹50 transactions add up over time
3. **Diversify**: Try different investment types
4. **Check Portfolio**: Watch your money grow with daily updates
5. **Unlock Achievements**: Complete all 8 achievements for maximum motivation

---

## 🔄 Reset Data

If you want to start fresh:
1. Click the **"Reset"** button in navigation (appears when you have data)
2. Confirm the action
3. All data will be cleared from local storage

---

## 📱 Mobile Responsive

FPTI works great on all devices:
- 💻 Desktop: Full feature experience
- 📱 Tablet: Optimized layouts
- 📱 Mobile: Touch-friendly, single column

---

## 🧮 How It Works

### Round-Up Formula
```
Rounded Amount = ⌈Original Amount / 10⌉ × 10
Spare Change = Rounded Amount - Original Amount
```

### Auto-Invest Logic
```
IF wallet_balance >= threshold THEN
  - Invest threshold amount
  - Deduct from wallet
  - Use preferred asset type
END IF
```

### Growth Simulation
Investments grow daily with realistic market simulation:
- Mutual Funds: 6-8% annual returns
- ETFs: 4-6% annual returns
- Bonds: 2-4% annual returns
- Small daily volatility for realism

---

## 🎯 Try These Examples

### Example 1: Coffee Lover
```
Day 1: Add "Morning Coffee" ₹45 → Spare ₹5
Day 2: Add "Afternoon Coffee" ₹60 → Spare ₹0
Day 3: Add "Coffee" ₹73 → Spare ₹7
Day 4: Add "Latte" ₹95 → Spare ₹5
...
After 20 transactions: ₹100+ in wallet → Auto-invest!
```

### Example 2: Daily Expenses
```
Groceries ₹456 → ₹460 → Spare ₹4
Bus Ticket ₹42 → ₹50 → Spare ₹8
Lunch ₹185 → ₹190 → Spare ₹5
Movie ₹299 → ₹300 → Spare ₹1
...
Small amounts add up to significant savings!
```

---

## 🚀 What Makes FPTI Special?

✅ **Effortless Saving**: No active thinking required
✅ **Automatic Investment**: Set it and forget it
✅ **Real-time Growth**: Watch your money grow daily
✅ **Gamification**: Stay motivated with achievements
✅ **Beautiful UI**: Modern, intuitive design
✅ **Fully Responsive**: Works on any device
✅ **No Login Required**: Start immediately (demo version)
✅ **Local Storage**: Your data stays with you

---

## 📊 Understanding Your Dashboard

### Wallet Card 💰
Your spare change ready to be invested

### Invested Card 📈
Total amount you've put into investments (principal)

### Portfolio Card 💎
Current value of all investments (with growth/loss)

### Streak Card 🔥
Consecutive days you've added transactions

---

## 🎮 Achievement Guide

1. **First Step** - Add your first transaction ✅
2. **Regular Saver** - Maintain 7-day streak 🔥
3. **Investor** - Make your first investment 💰
4. **Committed Saver** - Save ₹500 in spare change 💎
5. **Portfolio Builder** - Invest ₹1,000+ 📈
6. **Consistency King** - Maintain 30-day streak 👑
7. **Wealth Builder** - Reach ₹5,000 invested 🏆
8. **Profit Maker** - Earn ₹100+ in returns 💸

---

## 🔧 Troubleshooting

### Problem: App won't load
**Solution**: Check if development server is running (`npm start`)

### Problem: Charts not showing
**Solution**: Ensure you have investments in your portfolio

### Problem: Data disappeared
**Solution**: Check browser local storage settings, don't use incognito mode

### Problem: Auto-invest not working
**Solution**: Verify auto-invest is enabled in settings and threshold is set correctly

---

## 🌟 Best Practices

1. **Consistency Over Amount**: Regular small transactions beat sporadic large ones
2. **Diversify**: Try all three investment types
3. **Set Realistic Thresholds**: Start with ₹100, increase as you save more
4. **Check Daily**: Watch your portfolio grow for motivation
5. **Complete Achievements**: Unlocking achievements keeps you engaged

---

## 📈 Expected Results

### After 1 Week
- 5-10 transactions added
- ₹20-50 in wallet
- First auto-investment triggered
- First achievement unlocked

### After 1 Month
- 30+ transactions
- ₹200-500 invested
- 2-4 investments made
- 3-4 achievements unlocked
- Visible portfolio growth

### After 3 Months
- 100+ transactions
- ₹1,000+ invested
- Multiple investment types
- Most achievements unlocked
- Significant portfolio value

---

## 🎓 Learning Resources

### Understanding Investments
- **Mutual Funds**: Professionally managed diversified portfolios
- **ETFs**: Index-tracking funds, lower fees
- **Bonds**: Fixed-income government securities

### Risk vs Returns
- Higher risk = Higher potential returns
- Diversification reduces overall risk
- Long-term investing smooths volatility

---

## 🤝 Contributing Ideas

Have ideas for FPTI? Consider:
- Social features (leaderboards, challenges)
- Goal-based savings
- Expense categorization
- Budget tracking
- Financial tips and education
- Real bank integration
- Multiple currencies

---

## 📞 Support

Need help?
- Check DOCUMENTATION.md for detailed info
- Review this quick start guide
- Check browser console for errors
- Ensure all dependencies are installed

---

## 🎉 Ready to Start!

1. **Click "Add Demo Data"** to explore features
2. **Or add your first transaction** to begin your journey
3. **Watch your wealth grow** one round-up at a time!

**Remember**: Every ₹5 saved today is an investment in your future! 🚀

---

*Happy Investing! 💰*

**FPTI - Micro-Investment Made Simple**
