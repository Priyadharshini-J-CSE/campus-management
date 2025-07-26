import React from 'react';
import { Home, Bell, Search, Calendar, MessageSquare } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'lostfound', label: 'Lost & Found', icon: Search },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare }
  ];

  return (
    <div className="bg-white shadow-sm border-r h-screen w-64 fixed left-0 top-16">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;