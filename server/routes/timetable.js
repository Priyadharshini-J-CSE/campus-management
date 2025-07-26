const express = require('express');
const Timetable = require('../models/Timetable');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get timetable
router.get('/', auth, async (req, res) => {
  try {
    const { department, year, day, page = 1, limit = 50 } = req.query;
    const query = { isActive: true };
    
    // If user is a student, filter by their department and year
    if (req.user.role === 'student') {
      if (req.user.department) query.department = req.user.department;
      if (req.user.year) query.year = req.user.year;
    } else {
      // Admin can filter by any department/year
      if (department) query.department = department;
      if (year) query.year = parseInt(year);
    }
    
    if (day) query.day = day;

    const timetable = await Timetable.find(query)
      .sort({ day: 1, startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Timetable.countDocuments(query);

    // Group by day for better organization
    const groupedTimetable = timetable.reduce((acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    }, {});

    res.json({
      timetable: groupedTimetable,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get timetable error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single timetable entry
router.get('/:id', auth, async (req, res) => {
  try {
    const entry = await Timetable.findById(req.params.id);
    
    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Get timetable entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create timetable entry (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const {
      subject,
      instructor,
      room,
      day,
      time,
      startTime,
      endTime,
      department,
      year,
      semester,
      subjectCode,
      credits,
      type
    } = req.body;

    const entry = new Timetable({
      subject,
      instructor,
      room,
      day,
      time,
      startTime,
      endTime,
      department,
      year,
      semester,
      subjectCode,
      credits,
      type
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Create timetable entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update timetable entry (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const {
      subject,
      instructor,
      room,
      day,
      time,
      startTime,
      endTime,
      department,
      year,
      semester,
      subjectCode,
      credits,
      type,
      isActive
    } = req.body;

    const entry = await Timetable.findByIdAndUpdate(
      req.params.id,
      {
        subject,
        instructor,
        room,
        day,
        time,
        startTime,
        endTime,
        department,
        year,
        semester,
        subjectCode,
        credits,
        type,
        isActive
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Update timetable entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete timetable entry (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    
    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    console.error('Delete timetable entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
