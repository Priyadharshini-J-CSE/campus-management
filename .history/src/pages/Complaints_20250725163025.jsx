import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Common/Card';
import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const Complaints = () => {
  const { user } = useAuth();
  const { complaints, setComplaints } = useData();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Water',
    room: ''
  });

  const categories = ['Water', 'Electricity', 'Cleaning', 'Maintenance', 'Other'];
  const statuses = ['all', 'pending', 'in-progress', 'resolved'];

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        return 'bg-orange-100 text-orange-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hostel Complaints</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={18} />
          <span>Register Complaint</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Register New Complaint</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Complaint Title"
              value={newComplaint.title}
              onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              required
            />
            <textarea
              placeholder="Describe the issue in detail..."
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 h-32"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newComplaint.category}
                onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Room Number/Location"
                value={newComplaint.room}
                onChange={(e) => setNewComplaint({...newComplaint, room: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Submit Complaint
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === status 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All Complaints' : status.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map(complaint => (
          <Card key={complaint.id}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{complaint.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>Room: {complaint.room}</span>
                  <span>Category: {complaint.category}</span>
                  <span>Date: {complaint.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(complaint.status)}
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                  {complaint.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{complaint.description}</p>
            
            {user?.role === 'admin' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange(complaint.id, 'pending')}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange(complaint.id, 'in-progress')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange(complaint.id, 'resolved')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Resolved
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Complaints;