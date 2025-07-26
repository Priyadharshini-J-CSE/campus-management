import React, { useState } from 'react';
import { BarChart3, Users, Clock, CheckCircle, Plus, Vote } from 'lucide-react';

const PollsFeedback = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] });
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'Do you prefer offline exams over online exams?',
      options: [
        { text: 'Yes, offline is better', votes: 45 },
        { text: 'No, online is more convenient', votes: 32 },
        { text: 'Both have their advantages', votes: 18 }
      ],
      totalVotes: 95, // 45 + 32 + 18 = 95 ✓
      endDate: '2025-08-15',
      status: 'active',
      userVoted: false,
      userVotedOption: null,
      createdBy: 'Admin',
      createdAt: '2025-07-20'
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
      totalVotes: 150, // 67 + 43 + 25 + 15 = 150 ✓
      endDate: '2025-08-20',
      status: 'active',
      userVoted: true,
      userVotedOption: 0,
      createdBy: 'CS Department',
      createdAt: '2025-07-18'
    },
    {
      id: 3,
      question: 'Rate the recent Tech Symposium event',
      options: [
        { text: 'Excellent', votes: 38 },
        { text: 'Good', votes: 42 },
        { text: 'Average', votes: 15 },
        { text: 'Needs Improvement', votes: 8 }
      ],
      totalVotes: 103, // 38 + 42 + 15 + 8 = 103 ✓
      endDate: '2025-07-25',
      status: 'closed',
      userVoted: true,
      userVotedOption: 1,
      createdBy: 'Event Committee',
      createdAt: '2025-07-15'
    }
  ]);

  const handleVote = (pollId, optionIndex) => {
    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId && !poll.userVoted && poll.status === 'active') {
          const newOptions = [...poll.options];
          newOptions[optionIndex].votes += 1;

          // Calculate new total votes
          const newTotalVotes = newOptions.reduce((sum, option) => sum + option.votes, 0);

          return {
            ...poll,
            options: newOptions,
            totalVotes: newTotalVotes,
            userVoted: true,
            userVotedOption: optionIndex
          };
        }
        return poll;
      })
    );
  };

  const addOption = () => {
    if (newPoll.options.length < 6) {
      setNewPoll(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (newPoll.options.length > 2) {
      setNewPoll(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index, value) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const createPoll = () => {
    // Validate input
    const question = newPoll.question.trim();
    const validOptions = newPoll.options.filter(opt => opt.trim()).map(opt => opt.trim());

    if (!question) {
      alert('Please enter a poll question');
      return;
    }

    if (validOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    // Create new poll
    const poll = {
      id: Date.now(), // Use timestamp for unique ID
      question: question,
      options: validOptions.map(opt => ({ text: opt, votes: 0 })),
      totalVotes: 0,
      endDate: '2025-08-30',
      status: 'active',
      userVoted: false,
      userVotedOption: null,
      createdBy: 'Admin',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPolls(prev => [poll, ...prev]);
    setNewPoll({ question: '', options: ['', ''] });
    setShowCreatePoll(false);
  };

  const filteredPolls = polls.filter(poll => 
    activeTab === 'all' || poll.status === activeTab
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Polls & Feedback</h1>
          <p className="text-gray-600">Participate in polls and share your feedback</p>
        </div>
        <button
          onClick={() => setShowCreatePoll(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Poll</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-white p-1 rounded-lg shadow-sm">
        {[
          { key: 'active', label: 'Active Polls' },
          { key: 'closed', label: 'Closed Polls' },
          { key: 'all', label: 'All Polls' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Create Poll Modal */}
      {showCreatePoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Poll</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poll Question
              </label>
              <textarea
                value={newPoll.question}
                onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter your poll question..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              {newPoll.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                  {newPoll.options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              
              {newPoll.options.length < 6 && (
                <button
                  onClick={addOption}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Option
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={createPoll}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Create Poll
              </button>
              <button
                onClick={() => setShowCreatePoll(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Polls List */}
      <div className="space-y-6">
        {filteredPolls.map((poll) => (
          <div key={poll.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{poll.question}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {poll.totalVotes} votes
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Ends: {new Date(poll.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    Created by {poll.createdBy}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(poll.status)}`}>
                {poll.status}
              </span>
            </div>

            <div className="space-y-3">
              {poll.options.map((option, index) => {
                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes * 100) : 0;
                const isUserChoice = poll.userVoted && poll.userVotedOption === index;
                const canVote = !poll.userVoted && poll.status === 'active';

                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => canVote && handleVote(poll.id, index)}
                      disabled={!canVote}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        canVote
                          ? 'hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
                          : 'cursor-default'
                      } ${
                        isUserChoice
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 flex items-center">
                          {option.text}
                          {isUserChoice && <CheckCircle className="w-4 h-4 ml-2 text-blue-500" />}
                        </span>
                        <span className="text-sm text-gray-600">
                          {option.votes} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      
                      {(poll.userVoted || poll.status === 'closed') && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isUserChoice ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {!poll.userVoted && poll.status === 'active' && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm flex items-center">
                  <Vote className="w-4 h-4 mr-2" />
                  Click on an option to cast your vote
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BarChart3 className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No polls found</h3>
          <p className="text-gray-600">Try switching to a different tab or create a new poll.</p>
        </div>
      )}
    </div>
  );
};

export default PollsFeedback;