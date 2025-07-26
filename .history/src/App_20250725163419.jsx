import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import SimpleLogin from './components/Auth/SimpleLogin';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import LostFound from './pages/LostFound';
import Timetable from './pages/Timetable';
import Complaints from './pages/Complaints';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'announcements':
        return <Announcements />;
      case 'lostfound':
        return <LostFound />;
      case 'timetable':
        return <Timetable />;
      case 'complaints':
        return <Complaints />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <SimpleLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 ml-64 pt-4">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;