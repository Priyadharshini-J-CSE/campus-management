import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Common/Card';
import { Plus } from 'lucide-react';

const Announcements = () => {
  const { user } = useAuth();
  const { announcements, setAnnouncements } = useData();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'General'
  });

  const categories = ['all', 'General', 'Exams', 'Events', 'Academic'];
  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            <span>Add Announcement</span>
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && user?.role === 'admin' && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">New Announcement</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Announcement Title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Announcement Content"
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
            <select
              value={newAnnouncement.category}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="General">General</option>
              <option value="Exams">Exams</option>
              <option value="Events">Events</option>
              <option value="Academic">Academic</option>
            </select>
            <div className="flex space-x-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Post Announcement
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
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg ${
              filter === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => (
          <Card key={announcement.id}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                announcement.category === 'Exams' ? 'bg-red-100 text-red-700' :
                announcement.category === 'Events' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {announcement.category}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{announcement.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {announcement.author}</span>
              <span>{announcement.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;