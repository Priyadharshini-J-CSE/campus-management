const express = require('express');
const Skill = require('../models/Skill');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Mock data for fallback mode
let mockSkills = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: '👨‍💻',
    rating: 4.9,
    reviews: 127,
    skills: ['React', 'Node.js', 'Python'],
    category: 'Programming',
    bio: 'Full-stack developer with 3 years experience. Love teaching and sharing knowledge!',
    hourlyRate: 'Free',
    location: 'Computer Science Building',
    availability: ['Mon 2-5 PM', 'Wed 10-12 PM', 'Fri 1-4 PM'],
    sessionsCompleted: 89,
    userEmail: 'alex@campus.edu',
    isActive: true,
    createdAt: new Date('2024-07-20')
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '👩‍🎨',
    rating: 4.8,
    reviews: 93,
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
    category: 'Design',
    bio: 'Creative designer passionate about user experience and visual storytelling.',
    hourlyRate: 'Free',
    location: 'Design Studio',
    availability: ['Tue 1-4 PM', 'Thu 9-12 PM', 'Sat 10-2 PM'],
    sessionsCompleted: 67,
    userEmail: 'sarah@campus.edu',
    isActive: true,
    createdAt: new Date('2024-07-18')
  }
];

// Simple auth for fallback mode
const fallbackAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  if (token === 'admin-token') {
    req.user = { id: 'admin1', name: 'Admin User', role: 'admin', email: 'admin@campus.edu' };
  } else if (token === 'student-token') {
    req.user = { id: 'student1', name: 'John Doe', role: 'student', email: 'john@campus.edu' };
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  next();
};

// Get all skills
router.get('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    if (req.isMongoConnected) {
      // Use MongoDB
      const query = { isActive: true };
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { skills: { $in: [new RegExp(search, 'i')] } },
          { bio: { $regex: search, $options: 'i' } }
        ];
      }

      const skills = await Skill.find(query)
        .populate('userId', 'name email')
        .sort({ rating: -1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Skill.countDocuments(query);

      res.json({
        skills,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } else {
      // Use mock data
      let filteredSkills = mockSkills.filter(s => s.isActive);
      
      if (category && category !== 'all') {
        filteredSkills = filteredSkills.filter(s => s.category === category);
      }
      
      if (search) {
        filteredSkills = filteredSkills.filter(s => 
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
          s.bio.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      res.json({
        skills: filteredSkills,
        totalPages: 1,
        currentPage: 1,
        total: filteredSkills.length
      });
    }
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create skill
router.post('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { name, skills, category, bio, hourlyRate, location, availability, avatar } = req.body;

    if (req.isMongoConnected) {
      // Use MongoDB
      const skill = new Skill({
        name: name || req.user.name,
        skills,
        category,
        bio,
        hourlyRate: hourlyRate || 'Free',
        location,
        availability: availability || [],
        avatar: avatar || '👨‍💻',
        userId: req.user._id,
        userEmail: req.user.email
      });

      await skill.save();
      await skill.populate('userId', 'name email');

      res.status(201).json(skill);
    } else {
      // Use mock data
      const newSkill = {
        id: Date.now(),
        name: name || req.user.name,
        skills,
        category,
        bio,
        hourlyRate: hourlyRate || 'Free',
        location,
        availability: availability || [],
        avatar: avatar || '👨‍💻',
        userEmail: req.user.email,
        rating: 0,
        reviews: 0,
        sessionsCompleted: 0,
        isActive: true,
        createdAt: new Date()
      };
      
      mockSkills.unshift(newSkill);
      res.status(201).json(newSkill);
    }
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's skills
router.get('/my-skills', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    if (req.isMongoConnected) {
      const skills = await Skill.find({ userId: req.user._id })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
      res.json(skills);
    } else {
      const userSkills = mockSkills.filter(s => s.userEmail === req.user.email);
      res.json(userSkills);
    }
  } catch (error) {
    console.error('Get user skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
