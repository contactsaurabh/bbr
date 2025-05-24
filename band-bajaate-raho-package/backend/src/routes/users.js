const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Middleware to authenticate user
const auth = passport.authenticate('jwt', { session: false });

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow a user
router.post('/follow/:id', auth, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }
    
    const user = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);
    
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if already following
    if (user.following.includes(req.params.id)) {
      return res.status(400).json({ message: 'Already following this user' });
    }
    
    // Add to following
    user.following.push(req.params.id);
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Unfollow a user
router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Check if not following
    if (!user.following.includes(req.params.id)) {
      return res.status(400).json({ message: 'Not following this user' });
    }
    
    // Remove from following
    user.following = user.following.filter(
      followingId => followingId.toString() !== req.params.id
    );
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard/points', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select('username profilePicture points');
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
