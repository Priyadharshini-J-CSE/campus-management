import React, { useState } from 'react';
import { Calendar, MapPin, Users, ExternalLink, Clock, Trophy, Briefcase, Newspaper } from 'lucide-react';

const TechNewsFeed = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const feedItems = [
    {
      id: 1,
      type: 'hackathon',
      title: 'Google Summer of Code 2025',
      description: 'Open source coding program for students worldwide. Work with top organizations and get mentored by industry experts.',
      date: '2025-03-15',
      location: 'Remote',
      participants: '15K+ students',
      deadline: '2025-02-20',
      link: '#',
      tags: ['Open Source', 'Coding', 'Mentorship']
    },
    {
      id: 2,
      type: 'internship',
      title: 'Microsoft Software Engineering Internship',
      description: 'Join Microsoft as a Software Engineering Intern. Work on cutting-edge projects and learn from the best in the industry.',
      company: 'Microsoft',
      location: 'Bangalore, India',
      duration: '3 months',
      deadline: '2025-08-10',
      link: '#',
      tags: ['Software Engineering', 'Full-time', 'Tech Giant']
    },
    {
      id: 3,
      type: 'news',
      title: 'AI Revolution in Education: New Learning Platforms',
      description: 'Discover how artificial intelligence is transforming the way students learn and educators teach in 2025.',
      publishedAt: '2025-07-24',
      readTime: '5 min read',
      source: 'TechCrunch',
      link: '#',
      tags: ['AI', 'Education', 'Innovation']
    },
    {
      id: 4,
      type: 'hackathon',
      title: 'Smart India Hackathon 2025',
      description: 'Nation\'s biggest hackathon bringing together brilliant minds to solve real-world problems using technology.',
      date: '2025-09-15',
      location: 'Multiple Cities',
      participants: '100K+ students',
      deadline: '2025-08-30',
      link: '#',
      tags: ['Government', 'Innovation', 'Problem Solving']
    }
  ];

  const filteredItems = activeFilter === 'all' ? feedItems : feedItems.filter(item => item.type === activeFilter);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hackathon': return <Trophy className="w-5 h-5" />;
      case 'internship': return <Briefcase className="w-5 h-5" />;
      case 'news': return <Newspaper className="w-5 h-5" />;
      default: return <Newspaper className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hackathon': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'internship': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'news': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech News & Opportunities</h1>
        <p className="text-gray-600">Stay updated with the latest opportunities and tech news</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 bg-white p-1 rounded-lg shadow-sm">
        {[
          { key: 'all', label: 'All' },
          { key: 'hackathon', label: 'Hackathons' },
          { key: 'internship', label: 'Internships' },
          { key: 'news', label: 'Tech News' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeFilter === filter.key
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getTypeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
              </div>
              <a
                href={item.link}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <p className="text-gray-700 mb-4">{item.description}</p>

            {/* Type-specific information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {item.type === 'hackathon' && (
                <>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.participants}</span>
                  </div>
                </>
              )}

              {item.type === 'internship' && (
                <>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.duration}</span>
                  </div>
                </>
              )}

              {item.type === 'news' && (
                <>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.readTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Newspaper className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.source}</span>
                  </div>
                </>
              )}
            </div>

            {/* Deadline warning */}
            {(item.type === 'hackathon' || item.type === 'internship') && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-800 text-sm font-medium">
                  Application Deadline: {new Date(item.deadline).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Newspaper className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more content.</p>
        </div>
      )}
    </div>
  );
};

export default TechNewsFeed;