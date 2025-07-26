import React, { useState, useEffect } from 'react';
import { Bell, Search, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

// Mock data (you can replace with your actual mock data)
const mockAnnouncements = [
  { id: 1, title: "New Library Hours", content: "Library will be open 24/7 during finals week", category: "Academic" },
  { id: 2, title: "Campus Event", content: "Annual tech fest registration opens tomorrow", category: "Events" },
  { id: 3, title: "Maintenance Notice", content: "Wi-Fi maintenance scheduled for this weekend", category: "IT" }
];

const mockTimetable = [
  { id: 1, subject: "Data Structures", room: "CS-101", instructor: "Dr. Smith", time: "09:00 AM", day: "Monday" },
  { id: 2, subject: "Web Development", room: "CS-205", instructor: "Prof. Johnson", time: "11:00 AM", day: "Monday" },
  { id: 3, subject: "Database Systems", room: "CS-301", instructor: "Dr. Williams", time: "02:00 PM", day: "Monday" }
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: 'Total Announcements',
      value: mockAnnouncements.length,
      icon: Bell,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: '+12%'
    },
    {
      title: 'Lost & Found Items',
      value: 8,
      icon: Search,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      change: '+5%'
    },
    {
      title: 'Active Complaints',
      value: 3,
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      change: '-8%'
    },
    {
      title: 'Classes Today',
      value: mockTimetable.filter(t => t.day === 'Monday').length,
      icon: Calendar,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      change: '0%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 mt-2">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-slate-800">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-slate-600">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Video Section */}
      <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 z-10 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-500"></div>
          <div className="relative z-20 p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Campus Highlights</h3>
            <p className="text-blue-100 text-lg">Stay updated with the latest campus events and announcements</p>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp size={40} />
              </div>
              <p className="text-lg font-medium">Video Content Placeholder</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800 mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 
                        stat.change.startsWith('-') ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${stat.iconColor} group-hover:rotate-12 transition-transform duration-300`} size={28} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Announcements */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <Bell className="mr-2 text-blue-600" size={24} />
                Recent Announcements
              </h3>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {mockAnnouncements.length} New
              </span>
            </div>
            <div className="space-y-4">
              {mockAnnouncements.map((announcement, index) => (
                <div 
                  key={announcement.id} 
                  className="group p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-md transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                      {announcement.title}
                    </h4>
                    <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full font-medium">
                      {announcement.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{announcement.content}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Today's Schedule */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <Calendar className="mr-2 text-purple-600" size={24} />
                Today's Schedule
              </h3>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {mockTimetable.filter(t => t.day === 'Monday').length} Classes
              </span>
            </div>
            <div className="space-y-4">
              {mockTimetable.filter(t => t.day === 'Monday').map((item, index) => (
                <div 
                  key={item.id} 
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:shadow-md transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors duration-200 mb-1">
                      {item.subject}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      <span className="font-medium">{item.room}</span> • {item.instructor}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Card className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'View All Announcements', color: 'blue', icon: Bell },
              { name: 'Lost & Found', color: 'green', icon: Search },
              { name: 'Submit Complaint', color: 'orange', icon: AlertTriangle },
              { name: 'Full Schedule', color: 'purple', icon: Calendar }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`group p-4 rounded-xl border-2 border-${action.color}-200 hover:border-${action.color}-400 bg-${action.color}-50 hover:bg-${action.color}-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                >
                  <Icon className={`text-${action.color}-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`} size={24} />
                  <p className={`text-${action.color}-700 text-sm font-medium text-center`}>{action.name}</p>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;