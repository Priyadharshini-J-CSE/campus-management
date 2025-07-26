import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('campusUser');
    const savedAuth = localStorage.getItem('campusAuth');

    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Save to localStorage
    localStorage.setItem('campusUser', JSON.stringify(userData));
    localStorage.setItem('campusAuth', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear from localStorage
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusAuth');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};