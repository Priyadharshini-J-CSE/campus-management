import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Common/Card';
import { Plus } from 'lucide-react';

const LostFound = () => {
  const { user } = useAuth();
  const { lostFoundItems: items, setLostFoundItems: setItems } = useData();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Personal',
    location: '',
    type: 'lost'
  });

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lost & Found</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={18} />
          <span>Report Item</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Report Lost/Found Item</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={newItem.location}
                onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Submit Report
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
        {['all', 'lost', 'found'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === type 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {type === 'all' ? 'All Items' : type}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {item.type.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{item.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{item.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span>{item.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{item.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact:</span>
                <span className="text-blue-600">{item.contact}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LostFound;