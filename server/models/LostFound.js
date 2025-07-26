const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Books', 'Clothing', 'Accessories', 'Documents', 'Keys', 'Other'],
    default: 'Other'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submittedByName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'expired'],
    default: 'active'
  },
  resolvedAt: {
    type: Date
  },
  expiryDate: {
    type: Date,
    default: function() {
      // Set expiry to 30 days from creation
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  }
}, {
  timestamps: true
});

// Index for better performance
lostFoundSchema.index({ type: 1 });
lostFoundSchema.index({ category: 1 });
lostFoundSchema.index({ status: 1 });
lostFoundSchema.index({ createdAt: -1 });

module.exports = mongoose.model('LostFound', lostFoundSchema);
