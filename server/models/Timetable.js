const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  room: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true
  },
  credits: {
    type: Number,
    default: 3
  },
  type: {
    type: String,
    enum: ['lecture', 'lab', 'tutorial'],
    default: 'lecture'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
timetableSchema.index({ department: 1, year: 1 });
timetableSchema.index({ day: 1 });
timetableSchema.index({ startTime: 1 });

module.exports = mongoose.model('Timetable', timetableSchema);
