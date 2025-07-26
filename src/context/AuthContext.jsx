import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('campusUser');
    const savedAuth = localStorage.getItem('campusAuth');
    const savedToken = localStorage.getItem('campusToken');

    if (savedUser && savedAuth === 'true' && savedToken) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login...');
      const response = await authAPI.login(credentials);

      const { user: userData, token } = response.data;

      console.log('AuthContext: Login successful, setting authentication state...');
      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem('campusUser', JSON.stringify(userData));
      localStorage.setItem('campusAuth', 'true');
      localStorage.setItem('campusToken', token);

      return { success: true, user: userData };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { user: newUser, token } = response.data;

      setUser(newUser);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem('campusUser', JSON.stringify(newUser));
      localStorage.setItem('campusAuth', 'true');
      localStorage.setItem('campusToken', token);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear from localStorage
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusAuth');
    localStorage.removeItem('campusToken');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};