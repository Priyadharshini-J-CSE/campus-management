const express = require('express');
const TechNews = require('../models/TechNews');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Mock data for fallback mode
let mockTechNews = [
  {
    id: 1,
    type: 'hackathon',
    title: 'Google Summer of Code 2025',
    description: 'Open source coding program for students worldwide. Work with top organizations and get mentored by industry experts.',
    date: new Date('2025-03-15'),
    location: 'Remote',
    participants: '15K+ students',
    deadline: new Date('2025-02-20'),
    link: 'https://summerofcode.withgoogle.com',
    tags: ['Open Source', 'Coding', 'Mentorship'],
    createdByName: 'Admin',
    createdAt: new Date('2025-01-15')
  },
  {
    id: 2,
    type: 'internship',
    title: 'Microsoft Software Engineering Internship',
    description: 'Join Microsoft as a Software Engineering Intern. Work on cutting-edge projects and learn from the best in the industry.',
    company: 'Microsoft',
    location: 'Bangalore, India',
    duration: '3 months',
    deadline: new Date('2025-08-10'),
    link: 'https://careers.microsoft.com',
    tags: ['Software Engineering', 'Full-time', 'Tech Giant'],
    createdByName: 'Career Services',
    createdAt: new Date('2025-01-10')
  },
  {
    id: 3,
    type: 'event',
    title: 'TechCrunch Disrupt 2025',
    description: 'The world\'s leading authority in debuting revolutionary startups, introducing game-changing technologies.',
    date: new Date('2025-09-20'),
    location: 'San Francisco, CA',
    organizer: 'TechCrunch',
    link: 'https://techcrunch.com/events',
    tags: ['Startups', 'Innovation', 'Networking'],
    createdByName: 'Tech Club',
    createdAt: new Date('2025-01-05')
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

// Get all tech news
router.get('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;

    if (req.isMongoConnected) {
      // Use MongoDB
      const query = { isActive: true };
      
      if (type && type !== 'all') {
        query.type = type;
      }
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      const techNews = await TechNews.find(query)
        .populate('createdBy', 'name email')
        .sort({ isFeatured: -1, date: -1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await TechNews.countDocuments(query);

      res.json({
        techNews,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } else {
      // Use mock data
      let filteredNews = mockTechNews.filter(n => n.isActive !== false);
      
      if (type && type !== 'all') {
        filteredNews = filteredNews.filter(n => n.type === type);
      }
      
      if (search) {
        filteredNews = filteredNews.filter(n => 
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.description.toLowerCase().includes(search.toLowerCase()) ||
          (n.company && n.company.toLowerCase().includes(search.toLowerCase())) ||
          n.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        );
      }
      
      res.json({
        techNews: filteredNews,
        totalPages: 1,
        currentPage: 1,
        total: filteredNews.length
      });
    }
  } catch (error) {
    console.error('Get tech news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create tech news (admin only)
router.post('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create tech news' });
    }

    const {
      type,
      title,
      description,
      date,
      location,
      company,
      participants,
      duration,
      deadline,
      link,
      tags,
      prize,
      requirements,
      organizer,
      registrationFee,
      maxParticipants,
      isFeatured
    } = req.body;

    // Validate required fields
    if (!type || !title || !description || !date || !location) {
      return res.status(400).json({ message: 'Type, title, description, date, and location are required' });
    }

    if (req.isMongoConnected) {
      // Use MongoDB
      const techNews = new TechNews({
        type,
        title,
        description,
        date,
        location,
        company,
        participants,
        duration,
        deadline,
        link,
        tags: tags || [],
        prize,
        requirements: requirements || [],
        organizer,
        registrationFee: registrationFee || 'Free',
        maxParticipants,
        isFeatured: isFeatured || false,
        createdBy: req.user._id,
        createdByName: req.user.name
      });

      await techNews.save();
      await techNews.populate('createdBy', 'name email');

      res.status(201).json(techNews);
    } else {
      // Use mock data
      const newTechNews = {
        id: Date.now(),
        type,
        title,
        description,
        date: new Date(date),
        location,
        company,
        participants,
        duration,
        deadline: deadline ? new Date(deadline) : null,
        link,
        tags: tags || [],
        prize,
        requirements: requirements || [],
        organizer,
        registrationFee: registrationFee || 'Free',
        maxParticipants,
        currentParticipants: 0,
        isFeatured: isFeatured || false,
        createdByName: req.user.name,
        isActive: true,
        createdAt: new Date()
      };
      
      mockTechNews.unshift(newTechNews);
      res.status(201).json(newTechNews);
    }
  } catch (error) {
    console.error('Create tech news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tech news by ID
router.get('/:id', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const newsId = req.params.id;

    if (req.isMongoConnected) {
      const techNews = await TechNews.findById(newsId)
        .populate('createdBy', 'name email');
      
      if (!techNews) {
        return res.status(404).json({ message: 'Tech news not found' });
      }

      res.json(techNews);
    } else {
      const techNews = mockTechNews.find(n => n.id == newsId);
      
      if (!techNews) {
        return res.status(404).json({ message: 'Tech news not found' });
      }

      res.json(techNews);
    }
  } catch (error) {
    console.error('Get tech news by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update tech news (admin only)
router.put('/:id', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update tech news' });
    }

    const newsId = req.params.id;

    if (req.isMongoConnected) {
      const techNews = await TechNews.findByIdAndUpdate(
        newsId,
        { ...req.body },
        { new: true, runValidators: true }
      ).populate('createdBy', 'name email');

      if (!techNews) {
        return res.status(404).json({ message: 'Tech news not found' });
      }

      res.json(techNews);
    } else {
      const newsIndex = mockTechNews.findIndex(n => n.id == newsId);
      
      if (newsIndex === -1) {
        return res.status(404).json({ message: 'Tech news not found' });
      }

      mockTechNews[newsIndex] = { ...mockTechNews[newsIndex], ...req.body };
      res.json(mockTechNews[newsIndex]);
    }
  } catch (error) {
    console.error('Update tech news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
