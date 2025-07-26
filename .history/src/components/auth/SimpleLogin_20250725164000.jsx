import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Handle login logic here
    console.log('Login attempt:', formData);
    
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
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className={`w-full max-w-md transform transition-all duration-1000 ${
          mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-gray-600">Enter your credentials to get in</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-gray-900 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLoading 
                  ? 'cursor-not-allowed opacity-70' 
                  : 'hover:bg-gray-800 transform hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Not a Member?{' '}
              <button className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Artistic Background */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-float"
              style={{
                left: ${Math.random() * 100}%,
                top: ${Math.random() * 100}%,
                width: ${30 + Math.random() * 50}px,
                height: ${30 + Math.random() * 50}px,
                animationDelay: ${Math.random() * 5}s,
                animationDuration: ${6 + Math.random() * 4}s
              }}
            />
          ))}
        </div>

        {/* Main Triangle/Mountain Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Large Triangle */}
            <div 
              className="w-0 h-0 animate-pulse-slow"
              style={{
                borderLeft: '150px solid transparent',
                borderRight: '150px solid transparent',
                borderBottom: '200px solid rgba(255, 255, 255, 0.15)',
                filter: 'blur(1px)'
              }}
            />
            
            {/* Medium Triangle */}
            <div 
              className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0 h-0 animate-pulse-slow"
              style={{
                borderLeft: '100px solid transparent',
                borderRight: '100px solid transparent',
                borderBottom: '130px solid rgba(255, 255, 255, 0.25)',
                animationDelay: '1s'
              }}
            />
            
            {/* Small Triangle */}
            <div 
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0 h-0 animate-pulse-slow"
              style={{
                borderLeft: '60px solid transparent',
                borderRight: '60px solid transparent',
                borderBottom: '80px solid rgba(255, 255, 255, 0.35)',
                animationDelay: '2s'
              }}
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div className={`absolute bottom-16 left-16 text-white transform transition-all duration-1500 delay-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-2xl font-light mb-2">Be a Part of</h2>
          <h3 className="text-3xl font-bold">
            Something <span className="italic">Beautiful</span>
          </h3>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8">
          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        </div>
        
        <div className="absolute bottom-8 right-16">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.9;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;