import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/LoginNew';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/DashboardNew';
import Announcements from './pages/Announcements';
import LostFound from './pages/LostFound';
import Timetable from './pages/Timetable';
import Complaints from './pages/Complaints';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
    // Check if we should show register or login
    const urlParams = new URLSearchParams(window.location.search);
    const shouldRegister = urlParams.get('register') === 'true';

    if (shouldRegister) {
      return <Register />;
    }
    return <Login />;
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
      <AppContent />
    </AuthProvider>
  );
};

export default App;