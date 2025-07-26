const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Announcement = require('./models/Announcement');
const Complaint = require('./models/Complaint');
const LostFound = require('./models/LostFound');
const Timetable = require('./models/Timetable');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-management');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await Complaint.deleteMany({});
    await LostFound.deleteMany({});
    await Timetable.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: adminPassword,
      role: 'admin',
      department: 'Administration'
    });

    // Create student user
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = await User.create({
      name: 'John Doe',
      email: 'john@campus.edu',
      password: studentPassword,
      role: 'student',
      studentId: 'CS2021001',
      department: 'Computer Science',
      year: 3,
      roomNumber: 'A-204'
    });

    console.log('Created users');

    // Create sample announcements
    const announcements = [
      {
        title: "Mess Timing Changes for Weekend",
        content: "Please note that the mess timings will be changed for this weekend due to maintenance work. Breakfast: 8:00-10:00 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM.",
        category: "General",
        author: admin._id,
        authorName: admin.name,
        priority: "medium"
      },
      {
        title: "Mid-Term Examination Schedule",
        content: "The mid-term examinations will commence from August 1st, 2024. Students are advised to check their individual timetables on the student portal and prepare accordingly.",
        category: "Exams",
        author: admin._id,
        authorName: admin.name,
        priority: "high"
      },
      {
        title: "Cultural Night - Save the Date",
        content: "Get ready for an amazing cultural night on August 15th! Registration for performances starts from July 30th. Prizes worth ₹50,000 to be won!",
        category: "Events",
        author: admin._id,
        authorName: admin.name,
        priority: "medium"
      },
      {
        title: "Library Extended Hours",
        content: "Due to approaching exams, the library will remain open 24/7 starting from July 28th until August 15th. Additional study spaces have been arranged.",
        category: "Academic",
        author: admin._id,
        authorName: admin.name,
        priority: "medium"
      }
    ];

    await Announcement.insertMany(announcements);
    console.log('Created announcements');

    // Create sample complaints
    const complaints = [
      {
        title: "Water leakage in bathroom",
        description: "There's a constant water leak from the bathroom ceiling. It's causing water to accumulate on the floor.",
        category: "Water",
        room: "Room 204",
        status: "pending",
        submittedBy: student._id,
        submittedByName: student.name,
        priority: "high"
      },
      {
        title: "Electricity issue in study room",
        description: "The power outlets in the study room are not working properly. Students can't charge their devices.",
        category: "Electricity",
        room: "Study Room A",
        status: "in-progress",
        submittedBy: student._id,
        submittedByName: student.name,
        priority: "medium"
      }
    ];

    await Complaint.insertMany(complaints);
    console.log('Created complaints');

    // Create sample lost and found items
    const lostFoundItems = [
      {
        title: "Lost iPhone 13",
        description: "Black iPhone 13 with a blue case. Lost near the library.",
        type: "lost",
        category: "Electronics",
        location: "Library",
        contactInfo: "john@campus.edu",
        submittedBy: student._id,
        submittedByName: student.name
      },
      {
        title: "Found Wallet",
        description: "Brown leather wallet found in the cafeteria. Contains ID cards.",
        type: "found",
        category: "Accessories",
        location: "Cafeteria",
        contactInfo: "admin@campus.edu",
        submittedBy: admin._id,
        submittedByName: admin.name
      }
    ];

    await LostFound.insertMany(lostFoundItems);
    console.log('Created lost and found items');

    // Create sample timetable
    const timetableEntries = [
      {
        subject: "Data Structures",
        instructor: "Dr. Smith",
        room: "CS-101",
        day: "Monday",
        time: "9:00-10:00 AM",
        startTime: "09:00",
        endTime: "10:00",
        department: "Computer Science",
        year: 3,
        semester: 5,
        subjectCode: "CS301",
        credits: 4,
        type: "lecture"
      },
      {
        subject: "Database Management",
        instructor: "Prof. Johnson",
        room: "CS-102",
        day: "Monday",
        time: "10:00-11:00 AM",
        startTime: "10:00",
        endTime: "11:00",
        department: "Computer Science",
        year: 3,
        semester: 5,
        subjectCode: "CS302",
        credits: 3,
        type: "lecture"
      },
      {
        subject: "Web Development Lab",
        instructor: "Dr. Brown",
        room: "CS-Lab1",
        day: "Tuesday",
        time: "2:00-5:00 PM",
        startTime: "14:00",
        endTime: "17:00",
        department: "Computer Science",
        year: 3,
        semester: 5,
        subjectCode: "CS303",
        credits: 2,
        type: "lab"
      }
    ];

    await Timetable.insertMany(timetableEntries);
    console.log('Created timetable entries');

    console.log('Sample data seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@campus.edu / admin123');
    console.log('Student: john@campus.edu / student123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
