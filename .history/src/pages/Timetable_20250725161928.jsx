import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Common/Card';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Timetable = () => {
  const { user } = useAuth();
  const { timetable, setTimetable } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [newClass, setNewClass] = useState({
    subject: '',
    day: 'Monday',
    time: '',
    room: '',
    instructor: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClass) {
      setTimetable(timetable.map(item => 
        item.id === editingClass.id ? { ...newClass, id: editingClass.id } : item
      ));
      setEditingClass(null);
    } else {
      const classItem = { ...newClass, id: Date.now() };
      setTimetable([...timetable, classItem]);
    }
    setNewClass({ subject: '', day: 'Monday', time: '', room: '', instructor: '' });
    setShowForm(false);
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setNewClass(classItem);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTimetable(timetable.filter(item => item.id !== id));
  };

  const getClassesForDay = (day) => {
    return timetable.filter(item => item.day === day).sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={18} />
          <span>Add Class</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingClass ? 'Edit Class' : 'Add New Class'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Subject Name"
                value={newClass.subject}
                onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                value={newClass.day}
                onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Time (e.g., 09:00-10:00)"
                value={newClass.time}
                onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Room/Location"
                value={newClass.room}
                onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Instructor"
                value={newClass.instructor}
                onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                {editingClass ? 'Update Class' : 'Add Class'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingClass(null);
                  setNewClass({ subject: '', day: 'Monday', time: '', room: '', instructor: '' });
                }} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Timetable Grid */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold text-gray-700">Time</th>
                {days.map(day => (
                  <th key={day} className="text-left p-4 font-semibold text-gray-700">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot} className="border-b">
                  <td className="p-4 font-medium text-gray-600">{timeSlot}</td>
                  {days.map(day => {
                    const classForSlot = timetable.find(item => 
                      item.day === day && item.time === timeSlot
                    );
                    return (
                      <td key={day} className="p-4">
                        {classForSlot ? (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="font-medium text-blue-800">{classForSlot.subject}</div>
                            <div className="text-sm text-blue-600">{classForSlot.room}</div>
                            <div className="text-sm text-blue-600">{classForSlot.instructor}</div>
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => handleEdit(classForSlot)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(classForSlot.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-16"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Weekly View */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {days.map(day => (
          <Card key={day}>
            <h3 className="font-semibold text-gray-800 mb-4">{day}</h3>
            <div className="space-y-3">
              {getClassesForDay(day).map(classItem => (
                <div key={classItem.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-medium text-gray-800">{classItem.subject}</div>
                  <div className="text-sm text-gray-600">{classItem.time}</div>
                  <div className="text-sm text-gray-600">{classItem.room}</div>
                  <div className="text-sm text-gray-600">{classItem.instructor}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
