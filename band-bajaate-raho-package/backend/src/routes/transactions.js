const express = require('express');
const router = express.Router();
const passport = require('passport');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Middleware to authenticate user
const auth = passport.authenticate('jwt', { session: false });

// Get user transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create redemption request
router.post('/redeem', auth, async (req, res) => {
  try {
    const { points, paymentMethod, paymentDetails } = req.body;
    
    // Minimum points check
    if (points < 500) {
      return res.status(400).json({ 
        message: 'Minimum 500 points required for redemption' 
      });
    }
    
    // Get user
    const user = await User.findById(req.user.id);
    
    // Check if user has enough points
    if (user.points < points) {
      return res.status(400).json({ 
        message: 'Insufficient points' 
      });
    }
    
    // Calculate amount (100 points = $1)
    const amount = points / 100;
    
    // Create transaction
    const transaction = new Transaction({
      user: req.user.id,
      points,
      amount,
      paymentMethod,
      paymentDetails,
      status: 'pending'
    });
    
    await transaction.save();
    
    // Deduct points from user
    user.points -= points;
    await user.save();
    
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
