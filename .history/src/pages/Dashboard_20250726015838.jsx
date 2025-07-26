import React from 'react';
import Card from '../components/Common/Card';
import { Bell, Search, AlertTriangle, Calendar } from 'lucide-react';
import { mockAnnouncements, mockLostFoundItems, mockComplaints, mockTimetable } from '../utils/mockData';
import myVideo from '../assets/myvideo.mp4.mp4';
import video2 from '../assets/video2.mp4';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Announcements',
      value: mockAnnouncements.length,
      icon: Bell,
      color: 'blue'
    },
    {
      title: 'Lost & Found Items',
      value: mockLostFoundItems.length,
      icon: Search,
      color: 'green'
    },
    {
      title: 'Active Complaints',
      value: mockComplaints.filter(c => c.status !== 'resolved').length,
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Classes Today',
      value: mockTimetable.filter(t => t.day === 'Monday').length,
      icon: Calendar,
      color: 'purple'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Video Section 1 */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          className="w-full h-64 object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="auto"
          src={myVideo}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Section 2 */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          className="w-full h-64 object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="auto"
          src={video2}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
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
            {mockAnnouncements.slice(0, 3).map(announcement => (
              <div key={announcement.id} className="p-3 bg-green-50 rounded-lg">
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
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
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