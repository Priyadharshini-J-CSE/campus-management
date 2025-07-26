import React, { useState } from 'react';
import { Plus, Megaphone, Calendar, User, Filter, Search, Bell } from 'lucide-react';

const Announcements = () => {
  const [user] = useState({ role: 'admin', name: 'Admin User' }); // Mock user for demo
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Mess Timing Changes for Weekend",
      content: "Please note that the mess timings will be changed for this weekend due to maintenance work. Breakfast: 8:00-10:00 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM.",
      category: "General",
      date: "2024-07-25",
      author: "Hostel Warden"
    },
    {
      id: 2,
      title: "Mid-Term Examination Schedule",
      content: "The mid-term examinations will commence from August 1st, 2024. Students are advised to check their individual timetables on the student portal and prepare accordingly.",
      category: "Exams",
      date: "2024-07-24",
      author: "Academic Office"
    },
    {
      id: 3,
      title: "Cultural Night - Save the Date",
      content: "Get ready for an amazing cultural night on August 15th! Registration for performances starts from July 30th. Prizes worth ₹50,000 to be won!",
      category: "Events",
      date: "2024-07-23",
      author: "Cultural Committee"
    },
    {
      id: 4,
      title: "Library Extended Hours",
      content: "Due to approaching exams, the library will remain open 24/7 starting from July 28th until August 15th. Additional study spaces have been arranged.",
      category: "Academic",
      date: "2024-07-22",
      author: "Library Staff"
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'General'
  });

  const categories = ['all', 'General', 'Exams', 'Events', 'Academic'];
  
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesFilter = filter === 'all' || announcement.category === filter;
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      return; // Basic validation
    }
    
    const announcement = {
      ...newAnnouncement,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      author: user?.name
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', category: 'General' });
    setShowForm(false);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Exams':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300';
      case 'Events':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300';
      case 'Academic':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300';
      default:
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Exams':
        return '📝';
      case 'Events':
        return '🎉';
      case 'Academic':
        return '📚';
      default:
        return '📢';
    }
  };

  const getAnnouncementCount = (category) => {
    if (category === 'all') return announcements.length;
    return announcements.filter(a => a.category === category).length;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Megaphone className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Announcements
              </h1>
            </div>
            <p className="text-gray-600 ml-15">Stay updated with the latest hostel news and updates</p>
          </div>
          
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
                <span>Add Announcement</span>
              </div>
            </button>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={20} />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                    filter === category 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-white/70 backdrop-blur-sm text-gray-600 border border-gray-200 hover:bg-white/80'
                  }`}
                >
                  <span>{category !== 'all' && getCategoryIcon(category)}</span>
                  <span>
                    {category === 'all' ? 'All' : category} ({getAnnouncementCount(category)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcement Form */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showForm ? 'opacity-100 scale-100 translate-y-0 mb-8' : 'opacity-0 scale-95 -translate-y-4 h-0 overflow-hidden'
        }`}>
          {user?.role === 'admin' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3 flex items-center justify-center">
                  <Bell className="text-white" size={16} />
                </div>
                New Announcement
              </h3>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
                
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                >
                  <option value="General">📢 General</option>
                  <option value="Exams">📝 Exams</option>
                  <option value="Events">🎉 Events</option>
                  <option value="Academic">📚 Academic</option>
                </select>
                
                <textarea
                  placeholder="Announcement Content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-all duration-300 hover:bg-white/80"
                />
                
                <div className="flex space-x-4">
                  <button 
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Post Announcement
                  </button>
                  <button 
                    onClick={() => setShowForm(false)} 
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Announcements Grid */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 hover:bg-white/90"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-3 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(announcement.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {announcement.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{announcement.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(announcement.category)} transform group-hover:scale-105 transition-all duration-300`}>
                    {announcement.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="ml-15 lg:ml-15">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {announcement.content}
                </p>
              </div>

              {/* Footer with pulse animation for new announcements */}
              {index === 0 && (
                <div className="mt-4 ml-15 lg:ml-15">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                    Latest
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Megaphone className="text-blue-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Announcements;