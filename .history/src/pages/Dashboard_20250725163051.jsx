import React from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/Common/Card';
import { Bell, Search, AlertTriangle, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { announcements, lostFoundItems, complaints, timetable } = useData();

  const stats = [
    {
      title: 'Total Announcements',
      value: announcements.length,
      icon: Bell,
      color: 'blue'
    },
    {
      title: 'Lost & Found Items',
      value: lostFoundItems.length,
      icon: Search,
      color: 'green'
    },
    {
      title: 'Active Complaints',
      value: complaints.filter(c => c.status !== 'resolved').length,
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Classes Today',
      value: timetable.filter(t => t.day === 'Monday').length,
      icon: Calendar,
      color: 'purple'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-600`}>
                    {stat.value}
                  </p>
                </div>
                <Icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            {announcements.slice(0, 3).map(announcement => (
              <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {announcement.category}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {mockTimetable.filter(t => t.day === 'Monday').map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{item.subject}</h4>
                  <p className="text-sm text-gray-600">{item.room} - {item.instructor}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;