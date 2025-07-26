import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield } from 'lucide-react';

const SimpleLogin = () => {
  const { login } = useAuth();

  const handleLogin = (role) => {
    login({
      name: role === 'admin' ? 'Admin User' : 'Student User',
      email: role === 'admin' ? 'admin@example.com' : 'student@example.com',
      role: role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Campus Portal</h1>
          <p className="text-gray-300">Choose your login type</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('student')}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <User size={24} />
            <span>Login as Student</span>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Shield size={24} />
            <span>Login as Admin</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Click above to test different user roles and see how data sharing works between admin and student views.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
