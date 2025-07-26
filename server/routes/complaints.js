const express = require('express');
const Complaint = require('../models/Complaint');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all complaints
router.get('/', auth, async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Students can only see their own complaints, admins can see all
    if (req.user.role === 'student') {
      query.submittedBy = req.user._id;
    }
    
    if (status && status !== 'All') {
      query.status = status;
    }
    
    if (category && category !== 'All') {
      query.category = category;
    }

    const complaints = await Complaint.find(query)
      .populate('submittedBy', 'name studentId')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Complaint.countDocuments(query);

    res.json({
      complaints,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single complaint
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('submittedBy', 'name studentId')
      .populate('assignedTo', 'name');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Students can only view their own complaints
    if (req.user.role === 'student' && complaint.submittedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create complaint (Admin only based on your requirement)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, category, room, priority } = req.body;

    const complaint = new Complaint({
      title,
      description,
      category,
      room,
      priority,
      submittedBy: req.user._id,
      submittedByName: req.user.name
    });

    await complaint.save();
    await complaint.populate('submittedBy', 'name studentId');

    res.status(201).json(complaint);
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status (Admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, adminNotes, assignedTo } = req.body;
    const updateData = { status, adminNotes };
    
    if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }
    
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('submittedBy', 'name studentId')
     .populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete complaint (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
