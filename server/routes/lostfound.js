const express = require('express');
const LostFound = require('../models/LostFound');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all lost and found items
router.get('/', auth, async (req, res) => {
  try {
    const { type, category, status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (type && type !== 'All') {
      query.type = type;
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (status && status !== 'All') {
      query.status = status;
    } else {
      query.status = 'active'; // Default to active items
    }

    const items = await LostFound.find(query)
      .populate('submittedBy', 'name studentId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await LostFound.countDocuments(query);

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get lost found items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single lost/found item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id)
      .populate('submittedBy', 'name studentId');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get lost found item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create lost/found item
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, type, category, location, contactInfo } = req.body;

    const item = new LostFound({
      title,
      description,
      type,
      category,
      location,
      contactInfo,
      submittedBy: req.user._id,
      submittedByName: req.user.name
    });

    await item.save();
    await item.populate('submittedBy', 'name studentId');

    res.status(201).json(item);
  } catch (error) {
    console.error('Create lost found item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lost/found item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Only the submitter or admin can update
    if (item.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, description, category, location, contactInfo, status } = req.body;
    const updateData = { title, description, category, location, contactInfo };
    
    if (status && (req.user.role === 'admin' || item.submittedBy.toString() === req.user._id.toString())) {
      updateData.status = status;
      if (status === 'resolved') {
        updateData.resolvedAt = new Date();
      }
    }

    const updatedItem = await LostFound.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('submittedBy', 'name studentId');

    res.json(updatedItem);
  } catch (error) {
    console.error('Update lost found item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lost/found item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Only the submitter or admin can delete
    if (item.submittedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await LostFound.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete lost found item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
