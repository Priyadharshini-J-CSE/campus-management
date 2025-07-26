import React, { useState, useEffect } from 'react';
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
  
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Multiple Wave Layers */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,400 C150,300 350,500 600,400 C850,300 1050,500 1200,400 L1200,800 L0,800 Z"
              fill="url(#waveGradient1)"
              className="animate-wave-slow"
            />
            <path
              d="M0,450 C200,350 400,550 700,450 C900,350 1100,550 1200,450 L1200,800 L0,800 Z"
              fill="url(#waveGradient2)"
              className="animate-wave-medium"
            />
            <path
              d="M0,500 C250,400 450,600 750,500 C950,400 1150,600 1200,500 L1200,800 L0,800 Z"
              fill="url(#waveGradient3)"
              className="animate-wave-fast"
            />
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.4)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Flowing Line Patterns */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-flow"
              style={{
                top: `${20 + i * 10}%`,
                left: '-100%',
                width: '200%',
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Glass Morphism Login Card */}
          <div className={`backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden transform transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}>
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 animate-border-glow"></div>
            <div className="absolute inset-[2px] rounded-3xl bg-slate-900/50 backdrop-blur-xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center transform transition-all duration-1000 delay-300 ${
                  mounted ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                } hover:scale-110 hover:rotate-12 shadow-lg shadow-purple-500/30`}>
                  <User className="text-white" size={32} />
                </div>
                
                <h1 className={`text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-3 transform transition-all duration-700 delay-400 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  Welcome Back
                </h1>
                
                <p className={`text-gray-300 transform transition-all duration-700 delay-500 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  Sign in to continue your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className={`transform transition-all duration-500 delay-600 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <label className="block text-white/90 font-medium mb-2 text-sm">
                    Username
                  </label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                      focusedField === 'username' ? 'text-cyan-400 scale-110' : 'text-gray-400'
                    }`} size={18} />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 outline-none ${
                        focusedField === 'username' 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/20 bg-white/10' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className={`transform transition-all duration-500 delay-700 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <label className="block text-white/90 font-medium mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                      focusedField === 'password' ? 'text-cyan-400 scale-110' : 'text-gray-400'
                    }`} size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 outline-none ${
                        focusedField === 'password' 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/20 bg-white/10' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className={`transform transition-all duration-500 delay-750 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <label className="block text-white/90 font-medium mb-2 text-sm">
                    Login as
                  </label>
                  <select
                    name="role"
                    value={formData.role || 'student'}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white transition-all duration-300 outline-none hover:border-white/30 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/20 focus:bg-white/10"
                  >
                    <option value="student" className="bg-slate-800 text-white">Student</option>
                    <option value="admin" className="bg-slate-800 text-white">Admin</option>
                  </select>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={`flex items-center justify-between text-sm transform transition-all duration-500 delay-800 ${
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
                <div className={`transform transition-all duration-500 delay-900 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden ${
                      isLoading 
                        ? 'cursor-not-allowed opacity-80' 
                        : 'hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
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

              {/* Register Link */}
              <div className={`mt-8 text-center transform transition-all duration-500 delay-1000 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <p className="text-white/70 text-sm">
                  Don't have an account?{' '}
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline">
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave-slow {
          0%, 100% { 
            transform: translateX(0) translateY(0);
          }
          50% { 
            transform: translateX(-25px) translateY(-15px);
          }
        }
        
        @keyframes wave-medium {
          0%, 100% { 
            transform: translateX(0) translateY(0);
          }
          50% { 
            transform: translateX(25px) translateY(-20px);
          }
        }
        
        @keyframes wave-fast {
          0%, 100% { 
            transform: translateX(0) translateY(0);
          }
          50% { 
            transform: translateX(-15px) translateY(-25px);
          }
        }
        
        @keyframes flow {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        @keyframes border-glow {
          0%, 100% { 
            opacity: 0.5;
            transform: rotate(0deg);
          }
          50% { 
            opacity: 0.8;
            transform: rotate(180deg);
          }
        }
        
        @keyframes shimmer {
          0% { 
            background-position: -200% center;
          }
          100% { 
            background-position: 200% center;
          }
        }
        
        .animate-wave-slow { animation: wave-slow 8s ease-in-out infinite; }
        .animate-wave-medium { animation: wave-medium 6s ease-in-out infinite; }
        .animate-wave-fast { animation: wave-fast 4s ease-in-out infinite; }
        .animate-flow { animation: flow 4s linear infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-border-glow { animation: border-glow 3s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
