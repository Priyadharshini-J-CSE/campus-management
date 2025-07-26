import React, { useState } from 'react';
import { Plus, Edit, Trash2, Clock, User, MapPin, BookOpen, Calendar, Grid, List } from 'lucide-react';

const Timetable = () => {
  const [timetable, setTimetable] = useState([
    {
      id: 1,
      subject: "Computer Networks",
      day: "Monday",
      time: "09:00-10:00",
      room: "Lab 301",
      instructor: "Dr. Smith"
    },
    {
      id: 2,
      subject: "Database Systems",
      day: "Monday",
      time: "10:00-11:00",
      room: "Room 205",
      instructor: "Prof. Johnson"
    },
    {
      id: 3,
      subject: "Software Engineering",
      day: "Tuesday",
      time: "09:00-10:00",
      room: "Room 301",
      instructor: "Dr. Williams"
    },
    {
      id: 4,
      subject: "Machine Learning",
      day: "Wednesday",
      time: "14:30-15:30",
      room: "Lab 101",
      instructor: "Prof. Davis"
    },
    {
      id: 5,
      subject: "Web Development",
      day: "Thursday",
      time: "15:30-16:30",
      room: "Lab 202",
      instructor: "Dr. Brown"
    },
    {
      id: 6,
      subject: "Data Structures",
      day: "Friday",
      time: "11:30-12:30",
      room: "Room 105",
      instructor: "Prof. Wilson"
    },
    {
      id: 7,
      subject: "Mobile App Development",
      day: "Tuesday",
      time: "13:30-14:30",
      room: "Lab 303",
      instructor: "Dr. Anderson"
    },
    {
      id: 8,
      subject: "Artificial Intelligence",
      day: "Wednesday",
      time: "09:30-10:30",
      room: "Room 401",
      instructor: "Prof. Taylor"
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'weekly'
  const [newClass, setNewClass] = useState({
    subject: '',
    day: 'Monday',
    time: '',
    room: '',
    instructor: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00-10:00', '09:30-10:30', '10:00-11:00', '10:30-11:30',
    '11:00-12:00', '11:30-12:30', '13:30-14:30', '14:00-15:00',
    '14:30-15:30', '15:00-16:00', '15:30-16:30', '16:00-17:00'
  ];

  // Function to format time to ensure consistent format
  const formatTime = (timeString) => {
    if (!timeString) return '';

    // Handle different time formats like "9:30-10:30" or "09:30-10:30"
    const timePattern = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/;
    const match = timeString.match(timePattern);

    if (match) {
      const [, startHour, startMin, endHour, endMin] = match;
      const formattedStartHour = startHour.padStart(2, '0');
      const formattedEndHour = endHour.padStart(2, '0');
      return `${formattedStartHour}:${startMin}-${formattedEndHour}:${endMin}`;
    }

    return timeString; // Return as-is if format doesn't match
  };

  const handleSubmit = () => {
    if (!newClass.subject || !newClass.time || !newClass.room || !newClass.instructor) {
      alert('Please fill in all fields');
      return; // Basic validation
    }

    // Format the time before saving
    const formattedTime = formatTime(newClass.time.trim());
    const classToSave = { ...newClass, time: formattedTime };

    if (editingClass) {
      setTimetable(timetable.map(item =>
        item.id === editingClass.id ? { ...classToSave, id: editingClass.id } : item
      ));
      setEditingClass(null);
    } else {
      const classItem = { ...classToSave, id: Date.now() };
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

  const getSubjectColor = (subject) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600',
      'from-orange-400 to-orange-600',
      'from-red-400 to-red-600'
    ];
    const index = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const getDayIcon = (day) => {
    const icons = {
      'Monday': '🌟',
      'Tuesday': '🚀',
      'Wednesday': '⚡',
      'Thursday': '🔥',
      'Friday': '🎉'
    };
    return icons[day] || '📅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Calendar className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                My Timetable
              </h1>
            </div>
            <p className="text-gray-600 ml-15">Organize your academic schedule</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Grid size={16} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('weekly')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'weekly' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <List size={16} />
                <span>Weekly</span>
              </button>
            </div>

            {/* Add Class Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
                <span>Add Class</span>
              </div>
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className={`transition-all duration-500 ease-in-out transform ${
          showForm ? 'opacity-100 scale-100 translate-y-0 mb-8' : 'opacity-0 scale-95 -translate-y-4 h-0 overflow-hidden'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3 flex items-center justify-center">
                <BookOpen className="text-white" size={16} />
              </div>
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
                <select
                  value={newClass.day}
                  onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{getDayIcon(day)} {day}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Time (e.g., 9:30-10:30 or 09:30-10:30)"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Clock size={16} className="text-gray-400" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Room/Location"
                  value={newClass.room}
                  onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
                <input
                  type="text"
                  placeholder="Instructor"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {editingClass ? 'Update Class' : 'Add Class'}
                </button>
                <button 
                  onClick={() => {
                    setShowForm(false);
                    setEditingClass(null);
                    setNewClass({ subject: '', day: 'Monday', time: '', room: '', instructor: '' });
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Views */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 rounded-tl-2xl">
                      <div className="flex items-center space-x-2">
                        <Clock size={18} />
                        <span>Time</span>
                      </div>
                    </th>
                    {days.map((day, index) => (
                      <th key={day} className={`text-left p-4 font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 ${index === days.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getDayIcon(day)}</span>
                          <span>{day}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot, rowIndex) => (
                    <tr key={timeSlot} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-300">
                      <td className="p-4 font-semibold text-gray-600 bg-gradient-to-r from-gray-50/50 to-transparent">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-purple-500" />
                          <span>{timeSlot}</span>
                        </div>
                      </td>
                      {days.map(day => {
                        const classForSlot = timetable.find(item => 
                          item.day === day && item.time === timeSlot
                        );
                        return (
                          <td key={day} className="p-4">
                            {classForSlot ? (
                              <div className={`bg-gradient-to-r ${getSubjectColor(classForSlot.subject)} rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
                                <div className="font-bold text-lg mb-2">{classForSlot.subject}</div>
                                <div className="flex items-center space-x-1 text-white/90 text-sm mb-1">
                                  <MapPin size={12} />
                                  <span>{classForSlot.room}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-white/90 text-sm mb-3">
                                  <User size={12} />
                                  <span>{classForSlot.instructor}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEdit(classForSlot)}
                                    className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(classForSlot.id)}
                                    className="p-1.5 bg-white/20 rounded-lg hover:bg-red-500/80 transition-colors duration-300"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="h-32 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center opacity-50 hover:opacity-70 transition-opacity duration-300">
                                <span className="text-gray-400 text-sm">No class</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Weekly View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {days.map((day, dayIndex) => (
              <div
                key={day}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500"
                style={{
                  animationDelay: `${dayIndex * 0.1}s`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-2xl">
                    {getDayIcon(day)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{day}</h3>
                </div>
                <div className="space-y-4">
                  {getClassesForDay(day).map((classItem, index) => (
                    <div 
                      key={classItem.id} 
                      className={`bg-gradient-to-r ${getSubjectColor(classItem.subject)} rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                      style={{
                        animationDelay: `${(dayIndex * 0.1) + (index * 0.05)}s`,
                        animation: 'fadeInScale 0.5s ease-out forwards'
                      }}
                    >
                      <div className="font-bold text-lg mb-2">{classItem.subject}</div>
                      <div className="flex items-center space-x-1 text-white/90 text-sm mb-1">
                        <Clock size={12} />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/90 text-sm mb-1">
                        <MapPin size={12} />
                        <span>{classItem.room}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white/90 text-sm mb-3">
                        <User size={12} />
                        <span>{classItem.instructor}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(classItem)}
                          className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(classItem.id)}
                          className="p-1.5 bg-white/20 rounded-lg hover:bg-red-500/80 transition-colors duration-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {getClassesForDay(day).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Calendar size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No classes today</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Timetable;