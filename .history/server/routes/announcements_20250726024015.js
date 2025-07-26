const express = require('express');
const Announcement = require('../models/Announcement');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

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
