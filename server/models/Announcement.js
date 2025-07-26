const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['General', 'Academic', 'Hostel', 'Events', 'Exams', 'Sports'],
    default: 'General'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better performance
announcementSchema.index({ category: 1 });
announcementSchema.index({ createdAt: -1 });
announcementSchema.index({ isActive: 1 });

module.exports = mongoose.model('Announcement', announcementSchema);
