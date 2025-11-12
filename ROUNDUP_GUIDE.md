# 🎯 Round-up Preference Feature Guide

## 🆕 What's New?

You can now **customize how much your transactions round up** instead of being locked to ₹10!

---

## 📊 Available Round-up Options

### **₹5 - Frequent Small Savings**
- **Best for**: Daily small transactions
- **Example**: ₹73 → ₹75, saves ₹2
- **Advantage**: Builds savings gradually without feeling it
- **Use case**: Coffee, snacks, small purchases

### **₹10 - Default Balanced**
- **Best for**: Most users
- **Example**: ₹73 → ₹80, saves ₹7
- **Advantage**: Good balance between savings speed and amount
- **Use case**: General daily expenses

### **₹20 - Medium Savings**
- **Best for**: Moderate spenders
- **Example**: ₹73 → ₹80, saves ₹7; ₹185 → ₹200, saves ₹15
- **Advantage**: Faster wallet growth
- **Use case**: Lunch, transport, shopping

### **₹50 - Larger Savings**
- **Best for**: Regular large transactions
- **Example**: ₹456 → ₹500, saves ₹44
- **Advantage**: Quick investment threshold reach
- **Use case**: Groceries, bills, entertainment

### **₹100 - Maximum Savings**
- **Best for**: Big spenders, aggressive savers
- **Example**: ₹456 → ₹500, saves ₹44; ₹523 → ₹600, saves ₹77
- **Advantage**: Fastest path to investments
- **Use case**: Major purchases, rent, utilities

---

## 🔧 How to Change Your Preference

### **Method 1: From Transaction Page**
1. Navigate to **"Add Transaction"**
2. At the top of the form, find **"Round-up To Nearest"**
3. Select your preferred value from dropdown
4. Your choice is saved automatically
5. All future transactions use this setting

### **Method 2: From Investment Settings**
1. Navigate to **"Invest"** page
2. Scroll to **"Auto-Invest Settings"**
3. Find **"Round-up To Nearest"** selector
4. Choose your preference
5. Setting applies immediately

---

## 💡 Smart Examples

### **Scenario 1: Coffee Lover**
**Profile**: Buys coffee 2-3 times daily (₹50-₹100 each)

**Best Setting**: ₹5 or ₹10
```
Round-up ₹5:
- Coffee ₹73 → ₹75 = ₹2 saved
- Coffee ₹58 → ₹60 = ₹2 saved
- Coffee ₹92 → ₹95 = ₹3 saved
Daily savings: ~₹7, Monthly: ~₹210
```

### **Scenario 2: Regular Commuter**
**Profile**: Daily transport + lunch (₹100-₹300 each)

**Best Setting**: ₹10 or ₹20
```
Round-up ₹20:
- Bus ₹42 → ₹60 = ₹18 saved
- Lunch ₹185 → ₹200 = ₹15 saved
Daily savings: ~₹33, Monthly: ~₹990
```

### **Scenario 3: Family Shopper**
**Profile**: Weekly groceries (₹2,000-₹5,000)

**Best Setting**: ₹50 or ₹100
```
Round-up ₹100:
- Groceries ₹2,456 → ₹2,500 = ₹44 saved
- Utilities ₹1,823 → ₹1,900 = ₹77 saved
Weekly savings: ~₹120, Monthly: ~₹480
```

---

## 🎯 Choosing the Right Setting

### **Ask Yourself:**

1. **How often do I make transactions?**
   - Very often (5+ daily) → ₹5 or ₹10
   - Moderately (2-4 daily) → ₹10 or ₹20
   - Less often (weekly) → ₹50 or ₹100

2. **What's my average transaction size?**
   - Small (₹20-₹100) → ₹5 or ₹10
   - Medium (₹100-₹500) → ₹10 or ₹20
   - Large (₹500+) → ₹50 or ₹100

3. **How fast do I want to invest?**
   - Slow & steady → ₹5
   - Balanced → ₹10 or ₹20
   - Fast → ₹50 or ₹100

---

## 📈 Impact on Investment Timeline

### **Assuming 5 transactions daily, average ₹150 each:**

| Round-up | Daily Savings | Days to ₹100 | Monthly Investment |
|----------|--------------|--------------|-------------------|
| ₹5       | ~₹15         | 7 days       | ~₹450            |
| ₹10      | ~₹35         | 3 days       | ~₹1,050          |
| ₹20      | ~₹60         | 2 days       | ~₹1,800          |
| ₹50      | ~₹100        | 1 day        | ~₹3,000          |
| ₹100     | ~₹125        | < 1 day      | ~₹3,750          |

---

## 🔄 Dynamic Adjustment

### **You Can Change Anytime!**

Your round-up preference can be changed at any moment:
- Each transaction uses the **current** setting
- Past transactions keep their original round-up value
- No penalties for switching
- Try different settings to find what works!

### **Pro Tip: Seasonal Adjustment**
```
Holiday Season → Increase to ₹50 or ₹100
  (More spending = bigger round-ups)

Budget Month → Decrease to ₹5 or ₹10
  (Controlled savings during tight months)

Normal Times → Keep at ₹10 or ₹20
  (Balanced approach)
```

---

## 🎮 See It In Action

### **Test Different Settings:**
1. Go to "Add Transaction"
2. Set round-up to ₹5
3. Add expense: ₹73
4. See: Saves ₹2

5. Change to ₹50
6. Add expense: ₹73
7. See: Saves ₹27

8. Change to ₹100
9. Add expense: ₹456
10. See: Saves ₹44!

---

## 💰 Real-World Examples

### **₹5 Round-up Example:**
```
Monday:
- Breakfast ₹48 → ₹50 = ₹2
- Coffee ₹73 → ₹75 = ₹2
- Lunch ₹95 → ₹100 = ₹5
Total saved: ₹9
```

### **₹20 Round-up Example:**
```
Monday:
- Breakfast ₹48 → ₹60 = ₹12
- Coffee ₹73 → ₹80 = ₹7
- Lunch ₹95 → ₹100 = ₹5
Total saved: ₹24
```

### **₹100 Round-up Example:**
```
Weekly Grocery:
- Shopping ₹2,456 → ₹2,500 = ₹44
- Pharmacy ₹327 → ₹400 = ₹73
- Fuel ₹899 → ₹900 = ₹1
Total saved: ₹118
```

---

## ⚙️ Technical Details

### **How It Works:**
```javascript
Round-up Formula:
roundedAmount = Math.ceil(originalAmount / preference) × preference
spareChange = roundedAmount - originalAmount

Example (₹73 with ₹20 preference):
= Math.ceil(73 / 20) × 20
= Math.ceil(3.65) × 20
= 4 × 20
= ₹80

Spare = ₹80 - ₹73 = ₹7
```

### **Valid Preferences:**
- System accepts: 5, 10, 20, 50, 100
- Invalid entries default to ₹10
- Setting persists across sessions
- Stored in local storage

---

## 🎯 Best Practices

### **DO:**
✅ Start with ₹10 to understand the system
✅ Adjust based on your spending patterns
✅ Try different settings for a week each
✅ Match round-up to transaction frequency
✅ Use higher values for big expenses

### **DON'T:**
❌ Change too frequently (let it settle)
❌ Set too high if transactions are small
❌ Set too low if you want fast growth
❌ Forget to check your wallet balance

---

## 📊 Optimization Strategy

### **Week 1-2: Discovery**
- Use ₹10 (default)
- Track your daily savings
- Note transaction patterns

### **Week 3-4: Optimization**
- Adjust based on findings
- If savings too slow → Increase
- If too aggressive → Decrease

### **Month 2+: Automation**
- Set and forget
- Let auto-invest work
- Check portfolio growth monthly

---

## 🏆 Achievement Impact

### **Round-up preference affects achievements:**

**"Committed Saver" (₹500 spare change)**
- With ₹5: ~100 transactions
- With ₹10: ~50 transactions
- With ₹50: ~20 transactions

**Strategy**: Higher round-up = Faster achievement unlock!

---

## 💡 Pro Tips

1. **Match to Paycheck**: 
   - Start of month → Higher round-up
   - End of month → Lower round-up

2. **Category-Based**:
   - Use mental categories for different values
   - Food & Coffee → ₹5
   - Shopping → ₹20
   - Bills → ₹100

3. **Goal-Driven**:
   - Investment goal of ₹5,000/month?
   - Work backwards to find right round-up

4. **Combo Strategy**:
   - Most days: ₹10
   - Payday week: ₹50
   - Flexible approach!

---

## 🎉 Start Experimenting!

**Your round-up preference is now customizable!**

Visit **"Add Transaction"** or **"Invest"** page to set your preference and start saving your way! 🚀

---

*Happy Saving! Every rupee counts, at YOUR pace! 💰*
