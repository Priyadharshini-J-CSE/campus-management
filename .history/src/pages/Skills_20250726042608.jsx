import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Star, Users, BookOpen, Filter, Plus, MapPin, Video, MessageCircle } from 'lucide-react';
import { skillsAPI } from '../services/api';

const SkillExchangeMarketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mySkills, setMySkills] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Sample data
  const categories = ['all', 'Programming', 'Design', 'Languages', 'Music', 'Business', 'Photography'];
  
  const skillProviders = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: '👨‍💻',
      rating: 4.9,
      reviews: 127,
      skills: ['React', 'Node.js', 'Python'],
      category: 'Programming',
      bio: 'Full-stack developer with 3 years experience. Love teaching and sharing knowledge!',
      hourlyRate: 'Free',
      location: 'Computer Science Building',
      availability: ['Mon 2-5 PM', 'Wed 10-12 PM', 'Fri 1-4 PM'],
      sessionsCompleted: 89
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: '👩‍🎨',
      rating: 4.8,
      reviews: 94,
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      category: 'Design',
      bio: 'Design student passionate about creating beautiful user experiences.',
      hourlyRate: 'Free',
      location: 'Art Building Studio 3',
      availability: ['Tue 1-3 PM', 'Thu 9-11 AM', 'Sat 2-5 PM'],
      sessionsCompleted: 67
    },
    {
      id: 3,
      name: 'James Park',
      avatar: '🗣️',
      rating: 4.7,
      reviews: 82,
      skills: ['Korean', 'Japanese', 'Mandarin'],
      category: 'Languages',
      bio: 'Native Korean speaker, fluent in multiple Asian languages.',
      hourlyRate: 'Free',
      location: 'Language Center Room 201',
      availability: ['Mon 10-12 PM', 'Wed 3-5 PM', 'Fri 11-1 PM'],
      sessionsCompleted: 112
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      avatar: '📸',
      rating: 4.9,
      reviews: 156,
      skills: ['Photography', 'Lightroom', 'Photo Editing'],
      category: 'Photography',
      bio: 'Photography major with experience in portrait and landscape photography.',
      hourlyRate: 'Free',
      location: 'Media Lab',
      availability: ['Tue 2-4 PM', 'Thu 1-3 PM', 'Sun 10-12 PM'],
      sessionsCompleted: 78
    },
    {
      id: 5,
      name: 'David Kim',
      avatar: '💼',
      rating: 4.6,
      reviews: 73,
      skills: ['Marketing', 'Business Strategy', 'Excel'],
      category: 'Business',
      bio: 'Business student with internship experience at top consulting firms.',
      hourlyRate: 'Free',
      location: 'Business Building 105',
      availability: ['Mon 1-3 PM', 'Wed 11-1 PM', 'Fri 2-4 PM'],
      sessionsCompleted: 45
    }
  ];

  const [filteredProviders, setFilteredProviders] = useState(skillProviders);

  // Filter providers based on search and category
  useEffect(() => {
    let filtered = skillProviders;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(provider => provider.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        provider.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProviders(filtered);
  }, [searchTerm, selectedCategory]);

  const handleBookSession = (provider, timeSlot) => {
    const newBooking = {
      id: Date.now(),
      provider: provider,
      timeSlot: timeSlot,
      date: new Date().toLocaleDateString(),
      status: 'Confirmed'
    };
    setBookings([...bookings, newBooking]);
    setShowBookingModal(false);
    setSelectedSkill(null);
  };

  const addMySkill = (skillData) => {
    const newSkill = {
      id: Date.now(),
      ...skillData,
      sessionsBooked: 0
    };
    setMySkills([...mySkills, newSkill]);
  };

  const SkillCard = ({ provider }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{provider.avatar}</div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-yellow-500 mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{provider.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{provider.reviews} reviews</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {provider.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{provider.sessionsCompleted} sessions</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-semibold text-green-600">{provider.hourlyRate}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            setSelectedSkill(provider);
            setShowBookingModal(true);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
        >
          Book Session
        </button>
      </div>
    </div>
  );

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-3xl">{selectedSkill?.avatar}</div>
          <div>
            <h3 className="font-bold text-lg">{selectedSkill?.name}</h3>
            <p className="text-gray-600">{selectedSkill?.skills.join(', ')}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Available Time Slots</h4>
          <div className="space-y-2">
            {selectedSkill?.availability.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleBookSession(selectedSkill, slot)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{slot}</span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => {
              setShowBookingModal(false);
              setSelectedSkill(null);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const AddSkillForm = () => {
    const [skillForm, setSkillForm] = useState({
      title: '',
      category: 'Programming',
      description: '',
      availability: ''
    });

    const handleSubmit = () => {
      if (skillForm.title && skillForm.description && skillForm.availability) {
        addMySkill(skillForm);
        setSkillForm({ title: '', category: 'Programming', description: '', availability: '' });
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">Add Your Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Skill title (e.g., React Development)"
            value={skillForm.title}
            onChange={(e) => setSkillForm({...skillForm, title: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={skillForm.category}
            onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Describe what you can teach..."
          value={skillForm.description}
          onChange={(e) => setSkillForm({...skillForm, description: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="3"
        />
        <input
          type="text"
          placeholder="Your availability (e.g., Mon 2-4 PM, Wed 10-12 PM)"
          value={skillForm.availability}
          onChange={(e) => setSkillForm({...skillForm, availability: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Skill
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SkillSwap Campus</h1>
            </div>
            <nav className="flex space-x-1">
              {['browse', 'myskills', 'bookings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab === 'browse' ? 'Browse Skills' : tab === 'myskills' ? 'My Skills' : 'My Bookings'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Browse Skills Tab */}
        {activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search skills, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">{skillProviders.length}</span>
                  </div>
                  <p className="text-gray-600 text-sm">Active Tutors</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">127</span>
                  </div>
                  <p className="text-gray-600 text-sm">Skills Available</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-2xl font-bold text-gray-900">891</span>
                  </div>
                  <p className="text-gray-600 text-sm">Sessions Completed</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">4.8</span>
                  </div>
                  <p className="text-gray-600 text-sm">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Skill Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map(provider => (
                <SkillCard key={provider.id} provider={provider} />
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No skills found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}

        {/* My Skills Tab */}
        {activeTab === 'myskills' && (
          <>
            <AddSkillForm />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Listed Skills</h2>
              {mySkills.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No skills listed yet</h3>
                  <p className="text-gray-500">Add your first skill above to start teaching others!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {mySkills.map(skill => (
                    <div key={skill.id} className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{skill.title}</h3>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm mt-1">
                            {skill.category}
                          </span>
                          <p className="text-gray-600 mt-2">{skill.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {skill.availability}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{skill.sessionsBooked}</div>
                          <div className="text-sm text-gray-500">sessions booked</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500">Book your first learning session to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{booking.provider.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{booking.provider.name}</h3>
                          <p className="text-gray-600">{booking.provider.skills.join(', ')}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.timeSlot}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {booking.provider.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {booking.status}
                        </span>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default SkillExchangeMarketplace;