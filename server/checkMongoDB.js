const mongoose = require('mongoose');
require('dotenv').config();

const checkMongoDB = async () => {
  try {
    console.log('🔍 Checking MongoDB connection...');
    console.log(`📍 Connection URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-management'}`);
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-management', {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB is running and accessible!');
    console.log('📊 Database: campus-management');
    console.log('🔗 MongoDB Compass URL: mongodb://localhost:27017');
    console.log('📁 You can now view your database in MongoDB Compass');
    
    // List existing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      console.log('\n📋 Existing collections:');
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    } else {
      console.log('\n📋 No collections found. Run "npm run seed" to create sample data.');
    }
    
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log(`   Error: ${error.message}`);
    console.log('\n📋 To fix this:');
    console.log('   1. Install MongoDB Community Server from: https://www.mongodb.com/try/download/community');
    console.log('   2. Start MongoDB service:');
    console.log('      - Windows: Run "net start MongoDB" as Administrator');
    console.log('      - Or start via Windows Services');
    console.log('   3. Install MongoDB Compass from: https://www.mongodb.com/try/download/compass');
    console.log('   4. Connect to: mongodb://localhost:27017');
  } finally {
    mongoose.connection.close();
  }
};

checkMongoDB();
