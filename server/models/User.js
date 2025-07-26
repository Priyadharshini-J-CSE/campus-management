const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  studentId: {
    type: String,
    sparse: true // Only required for students
  },
  department: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1,
    max: 4
  },
  roomNumber: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ studentId: 1 });

module.exports = mongoose.model('User', userSchema);
