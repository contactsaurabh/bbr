const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Twitter OAuth strategy setup
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'YOUR_TWITTER_CONSUMER_KEY',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'YOUR_TWITTER_CONSUMER_SECRET',
    callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:5000/api/auth/twitter/callback'
  },
  async (token, tokenSecret, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ xId: profile.id });
      
      if (!user) {
        // Create new user if doesn't exist
        user = new User({
          xId: profile.id,
          username: profile.username,
          profilePicture: profile.photos[0].value
        });
        await user.save();
      }
      
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Twitter auth routes
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', 
  passport.authenticate('twitter', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { id: req.user.id, xId: req.user.xId },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    // Redirect to app with token
    res.redirect(`${process.env.FRONTEND_URL || 'exp://localhost:19000'}/auth?token=${token}`);
  }
);

// Get current user
router.get('/me', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
