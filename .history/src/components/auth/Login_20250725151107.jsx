import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication
    login({
      name: formData.role === 'admin' ? 'Admin User' : 'John Doe',
      email: formData.email,
      role: formData.role
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campus Portal</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@college.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Lock size={18} />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Eye, EyeOff, Mail, UserCheck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login({
      name: formData.role === 'admin' ? 'Admin User' : 'John Doe',
      email: formData.email,
      role: formData.role
    });
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 transform transition-all duration-1000 ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Header with staggered animation */}
        <div className="text-center mb-8">
          <div className={`bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-700 ${
            mounted ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          } hover:scale-110 hover:rotate-12`}>
            <User className="text-white" size={36} />
          </div>
          
          <h1 className={`text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 transform transition-all duration-500 delay-200 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Welcome Back
          </h1>
          
          <p className={`text-gray-500 transform transition-all duration-500 delay-300 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className={`transform transition-all duration-500 delay-400 ${
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${
                focusedField === 'email' ? 'text-blue-500 scale-110' : ''
              }`} size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none ${
                  focusedField === 'email' 
                    ? 'border-blue-500 shadow-lg shadow-blue-100 bg-blue-50/30' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:ring-0`}
                placeholder="your.email@college.edu"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={`transform transition-all duration-500 delay-500 ${
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${
                focusedField === 'password' ? 'text-blue-500 scale-110' : ''
              }`} size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300 outline-none ${
                  focusedField === 'password' 
                    ? 'border-blue-500 shadow-lg shadow-blue-100 bg-blue-50/30' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:ring-0`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className={`transform transition-all duration-500 delay-600 ${
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              I am a
            </label>
            <div className="relative group">
              <UserCheck className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ${
                focusedField === 'role' ? 'text-blue-500 scale-110' : ''
              }`} size={20} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={handleBlur}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none appearance-none cursor-pointer ${
                  focusedField === 'role' 
                    ? 'border-blue-500 shadow-lg shadow-blue-100 bg-blue-50/30' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:ring-0`}
              >
                <option value="student">Student</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className={`transform transition-all duration-500 delay-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isLoading ? 'cursor-not-allowed opacity-80' : 'hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <Lock size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className={`mt-8 text-center transform transition-all duration-500 delay-800 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-sm text-gray-500">
            New to campus? 
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium ml-1 transition-colors duration-200">
              Get help here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
