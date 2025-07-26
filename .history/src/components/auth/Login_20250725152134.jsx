import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight, UserCheck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
    // Add some floating animation to the illustration
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Simple validation
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    login({
      name: formData.role === 'admin' ? 'Admin User' : 'Student User',
      email: formData.username,
      role: formData.role
    });
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Subtle animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 4}s infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className={`w-full max-w-md relative z-10 transform transition-all duration-1000 ${
          mounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`}>
          
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-4xl font-bold text-white mb-2 transform transition-all duration-700 delay-200 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Login
            </h1>
            <p className={`text-gray-400 text-sm transform transition-all duration-700 delay-300 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Enter your account details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className={`transform transition-all duration-500 delay-400 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => handleFocus('username')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'username' 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-gray-750' 
                      : errors.username 
                        ? 'border-red-500' 
                        : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.username}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className={`transform transition-all duration-500 delay-500 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 pr-12 bg-gray-800 border rounded-lg text-white placeholder-gray-500 transition-all duration-300 outline-none ${
                    focusedField === 'password' 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20 bg-gray-750' 
                      : errors.password 
                        ? 'border-red-500' 
                        : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 animate-pulse">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className={`flex items-center justify-between text-sm transform transition-all duration-500 delay-600 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className={`transform transition-all duration-500 delay-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden ${
                  isLoading 
                    ? 'cursor-not-allowed opacity-80' 
                    : 'hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className={`mt-6 text-center transform transition-all duration-500 delay-800 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <p className="text-gray-400 text-sm">
              Don't have an account? 
              <button className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors duration-200 hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse floating"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse floating" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse floating" style={{animationDelay: '2s'}}></div>
        </div>

        <div className={`text-center relative z-10 transform transition-all duration-1000 delay-300 ${
          mounted ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}>
          <div className={`mb-8 transform transition-all duration-700 delay-500 ${
            mounted ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            {/* Your existing illustration can go here */}
            <div className="w-64 h-64 mx-auto mb-6 relative">
              {/* Placeholder for your student portal illustration */}
              <div className="w-full h-full bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <User size={64} className="text-white" />
              </div>
            </div>
          </div>
          
          <h2 className={`text-4xl font-bold text-white mb-4 transform transition-all duration-700 delay-600 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Welcome to<br />student portal
          </h2>
          
          <p className={`text-purple-100 text-lg transform transition-all duration-700 delay-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Login to access your account
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
