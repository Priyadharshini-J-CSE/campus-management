const express = require('express');
const Poll = require('../models/Poll');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Mock data for fallback mode
let mockPolls = [
  {
    id: 1,
    question: 'Do you prefer offline exams over online exams?',
    options: [
      { text: 'Yes, offline is better', votes: 45 },
      { text: 'No, online is more convenient', votes: 32 },
      { text: 'Both have their advantages', votes: 18 }
    ],
    totalVotes: 95,
    endDate: new Date('2025-08-15'),
    status: 'active',
    createdByName: 'Admin',
    category: 'Academic',
    voters: [],
    createdAt: new Date('2025-07-20')
  },
  {
    id: 2,
    question: 'Which programming language should be added to the curriculum?',
    options: [
      { text: 'Python', votes: 67 },
      { text: 'JavaScript', votes: 43 },
      { text: 'Go', votes: 25 },
      { text: 'Rust', votes: 15 }
    ],
    totalVotes: 150,
    endDate: new Date('2025-08-20'),
    status: 'active',
    createdByName: 'CS Department',
    category: 'Academic',
    voters: [{ userId: 'student1', optionIndex: 0, votedAt: new Date() }],
    createdAt: new Date('2025-07-18')
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

// Get all polls
router.get('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    if (req.isMongoConnected) {
      // Use MongoDB
      const query = { isActive: true };
      
      if (status && status !== 'all') {
        query.status = status;
      }

      const polls = await Poll.find(query)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      // Add user voting status
      const pollsWithUserStatus = polls.map(poll => {
        const userVote = poll.voters.find(v => v.userId.toString() === req.user._id?.toString() || v.userId === req.user.id);
        return {
          ...poll.toObject(),
          userVoted: !!userVote,
          userVotedOption: userVote ? userVote.optionIndex : null
        };
      });

      const total = await Poll.countDocuments(query);

      res.json({
        polls: pollsWithUserStatus,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } else {
      // Use mock data
      let filteredPolls = mockPolls.filter(p => p.status !== 'deleted');
      
      if (status && status !== 'all') {
        filteredPolls = filteredPolls.filter(p => p.status === status);
      }
      
      // Add user voting status
      const pollsWithUserStatus = filteredPolls.map(poll => {
        const userVote = poll.voters.find(v => v.userId === req.user.id);
        return {
          ...poll,
          userVoted: !!userVote,
          userVotedOption: userVote ? userVote.optionIndex : null
        };
      });
      
      res.json({
        polls: pollsWithUserStatus,
        totalPages: 1,
        currentPage: 1,
        total: filteredPolls.length
      });
    }
  } catch (error) {
    console.error('Get polls error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create poll
router.post('/', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { question, options, endDate, category } = req.body;

    // Validate input
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: 'Question and at least 2 options are required' });
    }

    if (req.isMongoConnected) {
      // Use MongoDB
      const poll = new Poll({
        question,
        options: options.map(opt => ({ text: opt, votes: 0 })),
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
        category: category || 'General',
        createdBy: req.user._id,
        createdByName: req.user.name
      });

      await poll.save();
      await poll.populate('createdBy', 'name email');

      res.status(201).json({
        ...poll.toObject(),
        userVoted: false,
        userVotedOption: null
      });
    } else {
      // Use mock data
      const newPoll = {
        id: Date.now(),
        question,
        options: options.map(opt => ({ text: opt, votes: 0 })),
        totalVotes: 0,
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: category || 'General',
        createdByName: req.user.name,
        voters: [],
        createdAt: new Date(),
        userVoted: false,
        userVotedOption: null
      };
      
      mockPolls.unshift(newPoll);
      res.status(201).json(newPoll);
    }
  } catch (error) {
    console.error('Create poll error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Vote on poll
router.post('/:id/vote', (req, res, next) => {
  if (req.isMongoConnected) {
    auth(req, res, next);
  } else {
    fallbackAuth(req, res, next);
  }
}, async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const pollId = req.params.id;

    if (req.isMongoConnected) {
      // Use MongoDB
      const poll = await Poll.findById(pollId);
      
      if (!poll) {
        return res.status(404).json({ message: 'Poll not found' });
      }

      if (poll.status !== 'active') {
        return res.status(400).json({ message: 'Poll is not active' });
      }

      // Check if user already voted
      const existingVote = poll.voters.find(v => v.userId.toString() === req.user._id.toString());
      if (existingVote) {
        return res.status(400).json({ message: 'You have already voted on this poll' });
      }

      // Add vote
      poll.options[optionIndex].votes += 1;
      poll.totalVotes += 1;
      poll.voters.push({
        userId: req.user._id,
        optionIndex,
        votedAt: new Date()
      });

      await poll.save();

      res.json({
        ...poll.toObject(),
        userVoted: true,
        userVotedOption: optionIndex
      });
    } else {
      // Use mock data
      const poll = mockPolls.find(p => p.id == pollId);
      
      if (!poll) {
        return res.status(404).json({ message: 'Poll not found' });
      }

      if (poll.status !== 'active') {
        return res.status(400).json({ message: 'Poll is not active' });
      }

      // Check if user already voted
      const existingVote = poll.voters.find(v => v.userId === req.user.id);
      if (existingVote) {
        return res.status(400).json({ message: 'You have already voted on this poll' });
      }

      // Add vote
      poll.options[optionIndex].votes += 1;
      poll.totalVotes += 1;
      poll.voters.push({
        userId: req.user.id,
        optionIndex,
        votedAt: new Date()
      });

      res.json({
        ...poll,
        userVoted: true,
        userVotedOption: optionIndex
      });
    }
  } catch (error) {
    console.error('Vote on poll error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
