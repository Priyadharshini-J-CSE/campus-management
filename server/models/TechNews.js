const mongoose = require('mongoose');

const techNewsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hackathon', 'internship', 'job', 'event', 'news', 'workshop']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  company: {
    type: String,
    trim: true
  },
  participants: {
    type: String
  },
  duration: {
    type: String
  },
  deadline: {
    type: Date
  },
  link: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  prize: {
    type: String
  },
  requirements: [{
    type: String
  }],
  organizer: {
    type: String,
    trim: true
  },
  registrationFee: {
    type: String,
    default: 'Free'
  },
  maxParticipants: {
    type: Number
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdByName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better performance
techNewsSchema.index({ type: 1 });
techNewsSchema.index({ date: -1 });
techNewsSchema.index({ deadline: 1 });
techNewsSchema.index({ tags: 1 });
techNewsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('TechNews', techNewsSchema);
