const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [pollOptionSchema],
  totalVotes: {
    type: Number,
    default: 0
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
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
  voters: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    optionIndex: {
      type: Number,
      required: true
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  category: {
    type: String,
    enum: ['Academic', 'Campus Life', 'Events', 'Facilities', 'General'],
    default: 'General'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
pollSchema.index({ status: 1 });
pollSchema.index({ createdAt: -1 });
pollSchema.index({ endDate: 1 });
pollSchema.index({ 'voters.userId': 1 });

module.exports = mongoose.model('Poll', pollSchema);
