import React, { useState } from 'react';
import { Plus, Search, MapPin, Calendar, Mail, Package, Filter, Eye } from 'lucide-react';

const LostFound = () => {
  const [user] = useState({ email: 'student@hostel.edu' }); // Mock user for demo
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Black iPhone 13",
      description: "Black iPhone 13 with a blue case. Has a small crack on the screen. Contains important photos and contacts.",
      category: "Electronics",
      location: "Library - 2nd Floor",
      type: "lost",
      date: "2024-07-25",
      contact: "john.doe@hostel.edu"
    },
    {
      id: 2,
      title: "Red Water Bottle",
      description: "Stainless steel red water bottle with university stickers. Brand: Hydro Flask.",
      category: "Personal",
      location: "Cafeteria",
      type: "found",
      date: "2024-07-24",
      contact: "jane.smith@hostel.edu"
    },
    {
      id: 3,
      title: "Blue Backpack",
      description: "Navy blue backpack with laptop compartment. Contains textbooks and notebooks for Computer Science.",
      category: "Personal",
      location: "Room 305",
      type: "lost",
      date: "2024-07-23",
      contact: "mike.wilson@hostel.edu"
    },
    {
      id: 4,
      title: "Gold Watch",
      description: "Classic gold wristwatch with brown leather strap. Sentimental value - family heirloom.",
      category: "Accessories",
      location: "Gym",
      type: "found",
      date: "2024-07-22",
      contact: "sarah.jones@hostel.edu"
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Personal',
    location: '',
    type: 'lost'
  });

  const categories = ['Personal', 'Electronics', 'Accessories', 'Documents', 'Other'];
  const types = ['all', 'lost', 'found'];

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = () => {
    if (!newItem.title || !newItem.description || !newItem.location) {
      return; // Basic validation
    }
    
    const item = {
      ...newItem,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      contact: user?.email
    };
    setItems([item, ...items]);
    setNewItem({ title: '', description: '', category: 'Personal', location: '', type: 'lost' });
    setShowForm(false);
  };

  const getTypeColor = (type) => {
    return type === 'lost' 
      ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300'
      : 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300';
  };

  const getTypeIcon = (type) => {
    return type === 'lost' ? '🔍' : '✅';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Electronics':
        return '📱';
      case 'Accessories':
        return '⌚';
      case 'Documents':
        return '📄';
      case 'Personal':
        return '🎒';
      default:
        return '📦';
    }
  };

  const getItemCount = (type) => {
    if (type === 'all') return items.length;
    return items.filter(item => item.type === type).length;
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Package className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Lost & Found
              </h1>
            </div>
            <p className="text-gray-600 ml-15">Help reunite lost items with their owners</p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
              <span>Report Item</span>
            </div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={20} />
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full capitalize font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                    filter === type 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                      : 'bg-white/70 backdrop-blur-sm text-gray-600 border border-gray-200 hover:bg-white/80'
                  }`}
                >
                  <span>{type !== 'all' && getTypeIcon(type)}</span>
                  <span>
                    {type === 'all' ? 'All Items' : type} ({getItemCount(type)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Form */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showForm ? 'opacity-100 scale-100 translate-y-0 mb-8' : 'opacity-0 scale-95 -translate-y-4 h-0 overflow-hidden'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-3 flex items-center justify-center">
                <Eye className="text-white" size={16} />
              </div>
              Report Lost/Found Item
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Item Title (e.g., Black iPhone 13)"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
                <input
                  type="text"
                  placeholder="Location (e.g., Library - 2nd Floor)"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getCategoryIcon(category)} {category}
                    </option>
                  ))}
                </select>
                
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                >
                  <option value="lost">🔍 Lost Item</option>
                  <option value="found">✅ Found Item</option>
                </select>
              </div>
              
              <textarea
                placeholder="Detailed description of the item..."
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none transition-all duration-300 hover:bg-white/80"
              />
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Report
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
        </div>

        {/* Items Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover:bg-white/90"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)} transform group-hover:scale-105 transition-all duration-300`}>
                    {getTypeIcon(item.type)} {item.type.toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
              
              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Package size={16} />
                    <span className="font-medium">Category:</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{item.category}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <MapPin size={16} />
                    <span className="font-medium">Location:</span>
                  </div>
                  <span className="text-blue-800 font-semibold">{item.location}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Calendar size={16} />
                    <span className="font-medium">Date:</span>
                  </div>
                  <span className="text-purple-800 font-semibold">{formatDate(item.date)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Mail size={16} />
                    <span className="font-medium">Contact:</span>
                  </div>
                  <a 
                    href={`mailto:${item.contact}`}
                    className="text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 hover:underline"
                  >
                    {item.contact}
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 py-3 rounded-2xl font-semibold hover:from-green-200 hover:to-emerald-200 transform hover:scale-105 transition-all duration-300 border border-green-300">
                  Contact Owner
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-green-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
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

export default LostFound;