const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  xId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  postsShared: {
    type: Number,
    default: 0
  },
  repostsReceived: {
    type: Number,
    default: 0
  },
  repostsMade: {
    type: Number,
    default: 0
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
