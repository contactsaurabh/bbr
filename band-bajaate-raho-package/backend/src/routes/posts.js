const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../models/Post');
const User = require('../models/User');

// Middleware to authenticate user
const auth = passport.authenticate('jwt', { session: false });

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePicture');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts from users the current user follows
router.get('/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate('user', 'username profilePicture');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { xPostUrl } = req.body;
    
    // Extract X post ID from URL
    const urlParts = xPostUrl.split('/');
    const xPostId = urlParts[urlParts.length - 1];
    
    // Check if post already exists
    const existingPost = await Post.findOne({ xPostId });
    if (existingPost) {
      return res.status(400).json({ message: 'Post already shared' });
    }
    
    const newPost = new Post({
      user: req.user.id,
      xPostUrl,
      xPostId
    });
    
    await newPost.save();
    
    // Update user stats
    await User.findByIdAndUpdate(req.user.id, { $inc: { postsShared: 1 } });
    
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Repost a post
router.post('/:id/repost', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user already reposted
    const alreadyReposted = post.reposts.some(
      repost => repost.user.toString() === req.user.id
    );
    
    if (alreadyReposted) {
      return res.status(400).json({ message: 'Post already reposted' });
    }
    
    // Add repost
    post.reposts.unshift({ user: req.user.id });
    post.repostCount += 1;
    await post.save();
    
    // Update user stats
    await User.findByIdAndUpdate(req.user.id, { $inc: { repostsMade: 1 } });
    await User.findByIdAndUpdate(post.user, { 
      $inc: { 
        repostsReceived: 1,
        points: 1 
      } 
    });
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profilePicture')
      .populate('reposts.user', 'username profilePicture');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
