import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Complaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Water leakage in bathroom",
      description: "There's a constant water leak from the bathroom ceiling. It's causing water to accumulate on the floor.",
      category: "Water",
      room: "Room 204",
      status: "pending",
      date: "2024-07-25"
    },
    {
      id: 2,
      title: "Electricity issue in study room",
      description: "The power outlets in the study room are not working properly. Students can't charge their devices.",
      category: "Electricity",
      room: "Study Room A",
      status: "in-progress",
      date: "2024-07-24"
    },
    {
      id: 3,
      title: "Air conditioning not working",
      description: "The AC unit in the common area has stopped working completely. It's getting very hot.",
      category: "Maintenance",
      room: "Common Area",
      status: "resolved",
      date: "2024-07-23"
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Water',
    room: ''
  });

  const categories = ['Water', 'Electricity', 'Cleaning', 'Maintenance', 'Other'];
  const statuses = ['all', 'pending', 'in-progress', 'resolved'];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = filter === 'all' || complaint.status === filter;
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = () => {
    if (!newComplaint.title || !newComplaint.description || !newComplaint.room) {
      return; // Basic validation
    }
    
    const complaint = {
      ...newComplaint,
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setComplaints([complaint, ...complaints]);
    setNewComplaint({ title: '', description: '', category: 'Water', room: '' });
    setShowForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    if (user?.role === 'admin') {
      setComplaints(complaints.map(complaint =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      ));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-orange-500" size={16} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={16} />;
      case 'resolved':
        return <CheckCircle className="text-green-500" size={16} />;
      default:
        return <XCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300';
      case 'in-progress':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300';
      case 'resolved':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300';
    }
  };

  const getStatusCount = (status) => {
    if (status === 'all') return complaints.length;
    return complaints.filter(c => c.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="transform hover:scale-105 transition-all duration-300">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Hostel Complaints
            </h1>
            <p className="text-gray-600">Manage and track hostel maintenance requests</p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
              <span>Register Complaint</span>
            </div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" size={20} />
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full capitalize font-medium transition-all duration-300 transform hover:scale-105 ${
                    filter === status 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'bg-white/70 backdrop-blur-sm text-gray-600 border border-gray-200 hover:bg-white/80'
                  }`}
                >
                  {status === 'all' ? 'All' : status.replace('-', ' ')} ({getStatusCount(status)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Complaint Form */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showForm ? 'opacity-100 scale-100 translate-y-0 mb-8' : 'opacity-0 scale-95 -translate-y-4 h-0 overflow-hidden'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3"></div>
              Register New Complaint
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Complaint Title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
                <input
                  type="text"
                  placeholder="Room Number/Location"
                  value={newComplaint.room}
                  onChange={(e) => setNewComplaint({...newComplaint, room: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
              </div>
              
              <select
                value={newComplaint.category}
                onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <textarea
                placeholder="Describe the issue in detail..."
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none transition-all duration-300 hover:bg-white/80"
              />
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Complaint
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

        {/* Complaints Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredComplaints.map((complaint, index) => (
            <div
              key={complaint.id}
              className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover:bg-white/90"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {complaint.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{complaint.room}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{complaint.category}</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{complaint.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {getStatusIcon(complaint.status)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)} transform group-hover:scale-105 transition-all duration-300`}>
                    {complaint.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{complaint.description}</p>
              
              {/* Admin Controls */}
              {user?.role === 'admin' && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'pending')}
                    className="px-3 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-xl text-sm font-medium hover:from-orange-200 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 border border-orange-300"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'in-progress')}
                    className="px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:from-blue-200 hover:to-blue-300 transform hover:scale-105 transition-all duration-300 border border-blue-300"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'resolved')}
                    className="px-3 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-xl text-sm font-medium hover:from-green-200 hover:to-green-300 transform hover:scale-105 transition-all duration-300 border border-green-300"
                  >
                    Resolved
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComplaints.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-purple-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No complaints found</h3>
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

export default Complaints;