const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with fallback
let isMongoConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-management';
    console.log(`Attempting to connect to MongoDB at: ${mongoUri}`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
    });

    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database: campus-management');
    console.log('🔗 You can view the database in MongoDB Compass at: mongodb://localhost:27017');
    isMongoConnected = true;
  } catch (error) {
    console.warn('❌ MongoDB connection failed, running in fallback mode with mock data');
    console.warn('📋 To use MongoDB:');
    console.warn('   1. Install MongoDB Community Server');
    console.warn('   2. Start MongoDB service');
    console.warn('   3. Install MongoDB Compass for GUI management');
    console.warn('   4. Restart this server');
    console.warn(`   Error: ${error.message}`);
    isMongoConnected = false;
  }
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/lostfound', require('./routes/lostfound'));
app.use('/api/timetable', require('./routes/timetable'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Middleware to check MongoDB connection
app.use((req, res, next) => {
  req.isMongoConnected = isMongoConnected;
  next();
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!isMongoConnected) {
      console.log('Note: Running in fallback mode. Install MongoDB for full functionality.');
    }
  });
};

startServer();
