const express = require('express');
const Announcement = require('../models/Announcement');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Mock data for fallback mode
let mockAnnouncements = [
  {
    id: 1,
    title: "Mess Timing Changes for Weekend",
    content: "Please note that the mess timings will be changed for this weekend due to maintenance work. Breakfast: 8:00-10:00 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM.",
    category: "General",
    authorName: "Admin User",
    priority: "medium",
    isActive: true,
    createdAt: new Date('2024-07-25')
  },
  {
    id: 2,
    title: "Mid-Term Examination Schedule",
    content: "The mid-term examinations will commence from August 1st, 2024. Students are advised to check their individual timetables on the student portal and prepare accordingly.",
    category: "Exams",
    authorName: "Admin User",
    priority: "high",
    isActive: true,
    createdAt: new Date('2024-07-24')
  },
  {
    id: 3,
    title: "Cultural Night - Save the Date",
    content: "Get ready for an amazing cultural night on August 15th! Registration for performances starts from July 30th. Prizes worth ₹50,000 to be won!",
    category: "Events",
    authorName: "Admin User",
    priority: "medium",
    isActive: true,
    createdAt: new Date('2024-07-23')
  },
  {
    id: 4,
    title: "Library Extended Hours",
    content: "Due to approaching exams, the library will remain open 24/7 starting from July 28th until August 15th. Additional study spaces have been arranged.",
    category: "Academic",
    authorName: "Admin User",
    priority: "medium",
    isActive: true,
    createdAt: new Date('2024-07-22')
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
    req.user = { id: 'admin1', name: 'Admin User', role: 'admin' };
  } else if (token === 'student-token') {
    req.user = { id: 'student1', name: 'John Doe', role: 'student' };
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

// Get all announcements
router.get('/', auth, async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }

    const announcements = await Announcement.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Announcement.countDocuments(query);

    res.json({
      announcements,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single announcement
router.get('/:id', auth, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'name');
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error('Get announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create announcement (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, content, category, priority, expiryDate } = req.body;

    const announcement = new Announcement({
      title,
      content,
      category,
      priority,
      expiryDate,
      author: req.user._id,
      authorName: req.user.name
    });

    await announcement.save();
    await announcement.populate('author', 'name');

    res.status(201).json(announcement);
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update announcement (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, content, category, priority, expiryDate, isActive } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, category, priority, expiryDate, isActive },
      { new: true }
    ).populate('author', 'name');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete announcement (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
