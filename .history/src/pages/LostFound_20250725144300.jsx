import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Common/Card';
import { Plus } from 'lucide-react';
import { mockLostFoundItems } from '../utils/mockData';

const LostFound = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(mockLostFoundItems);
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
                placeholder="Item Title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
            <textarea
              placeholder="Item Description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 h-24"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="Personal">Personal Items</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books & Stationery</option>
                <option value="Clothing">Clothing</option>
              </select>
              <input
                type="text"