const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: '👨‍💻'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  skills: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Design', 'Languages', 'Music', 'Business', 'Photography', 'Other']
  },
  bio: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: String,
    default: 'Free'
  },
  location: {
    type: String,
    required: true
  },
  availability: [{
    type: String
  }],
  sessionsCompleted: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
skillSchema.index({ category: 1 });
skillSchema.index({ skills: 1 });
skillSchema.index({ rating: -1 });
skillSchema.index({ userId: 1 });

module.exports = mongoose.model('Skill', skillSchema);
