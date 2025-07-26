import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
    
    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    login({
      name: 'Student User',
      email: formData.username,
      role: 'student'
    });
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/api/placeholder/video/background-waves.mp4" type="video/mp4" />
        {/* Fallback animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"></div>
      </video>

      {/* Animated overlay with flowing patterns */}
      <div className="absolute inset-0 bg-black/30">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
        }}></div>
        
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left Side - Illustration/Branding */}
        <div className={`flex-1 pr-12 transform transition-all duration-1500 ${
          mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}>
          <div className="text-white space-y-6">
            <div className="relative">
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Welcome to
              </h1>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Future Portal
              </h2>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="text-yellow-400 animate-pulse" size={32} />
              </div>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-md">
              Step into tomorrow's learning experience. Your journey to excellence starts here.
            </p>
            
            {/* Animated wave pattern */}
            <div className="relative h-32 overflow-hidden">
              <svg viewBox="0 0 400 150" className="w-full h-full">
                <path
                  d="M0,75 Q100,25 200,75 T400,75 L400,150 L0,150 Z"
                  fill="url(#waveGradient)"
                  className="animate-pulse"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0;20,0;0,0"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`flex-1 max-w-md transform transition-all duration-1500 delay-300 ${
          mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        }`}>
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center transform transition-all duration-1000 delay-500 ${
                mounted ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              } hover:scale-110 hover:rotate-12`}>
                <User className="text-white" size={32} />
              </div>
              
              <h3 className={`text-3xl font-bold text-white mb-2 transform transition-all duration-700 delay-600 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                Sign In
              </h3>
              
              <p className={`text-gray-300 transform transition-all duration-700 delay-700 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                Access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className={`transform transition-all duration-500 delay-800 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <label className="block text-white/90 font-medium mb-2">Username</label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                    focusedField === 'username' ? 'text-cyan-400 scale-110' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 outline-none ${
                      focusedField === 'username' 
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/30 bg-white/20' 
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className={`transform transition-all duration-500 delay-900 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <label className="block text-white/90 font-medium mb-2">Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                    focusedField === 'password' ? 'text-cyan-400 scale-110' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 outline-none ${
                      focusedField === 'password' 
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/30 bg-white/20' 
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between transform transition-all duration-500 delay-1000 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-cyan-500 bg-white/10 border-white/30 rounded focus:ring-cyan-400 focus:ring-2"
                  />
                  <span className="text-white/80 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <div className={`transform transition-all duration-500 delay-1100 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden ${
                    isLoading 
                      ? 'cursor-not-allowed' 
                      : 'hover:from-purple-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Register Link */}
            <div className={`mt-8 text-center transform transition-all duration-500 delay-1200 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <p className="text-white/70">
                New to our platform?{' '}
                <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline">
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-20px) rotate(90deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
          }
          75% { 
            transform: translateY(-30px) rotate(270deg); 
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
