// import React from 'react';

// const Card = ({ children, className = '' }) => {
//   return (
//     <div className={`bg-white rounded-xl shadow-sm border p-6 ${className}`}>
//       {children}
//     </div>
//   );
// };

// export default Card;
import React, { useState } from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  clickable = false,
  loading = false,
  variant = 'default',
  onClick
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "bg-white rounded-xl border transition-all duration-300 ease-out";
  
  const variantClasses = {
    default: "shadow-sm hover:shadow-md",
    elevated: "shadow-md hover:shadow-lg",
    outlined: "border-2 border-gray-200 hover:border-blue-300",
    gradient: "bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md"
  };

  const hoverClasses = hover ? "transform hover:-translate-y-1 hover:scale-[1.02]" : "";
  const clickableClasses = clickable ? "cursor-pointer active:scale-[0.98]" : "";
  const pressedClasses = isPressed ? "scale-[0.98]" : "";

  const handleMouseDown = () => {
    if (clickable) setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (clickable) setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (clickable) setIsPressed(false);
  };

  return (
    <div 
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${clickableClasses}
        ${pressedClasses}
        ${loading ? 'animate-pulse' : ''}
        ${className}
        group
        relative
        overflow-hidden
      `}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shimmer effect for loading */}
      {loading && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      )}
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Content with entrance animation */}
      <div className="relative z-10 animate-fadeInUp p-6">
        {children}
      </div>

      {/* Ripple effect for clickable cards */}
      {clickable && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-blue-400/10 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

// Specialized card variants
export const GlassCard = ({ children, className = '', ...props }) => (
  <Card 
    className={`backdrop-blur-sm bg-white/80 border-white/20 ${className}`}
    {...props}
  >
    {children}
  </Card>
);

export const FeatureCard = ({ children, className = '', icon, title, ...props }) => (
  <Card 
    className={`group/feature hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 ${className}`}
    hover={true}
    {...props}
  >
    <div className="flex items-start space-x-4">
      {icon && (
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover/feature:bg-blue-200 group-hover/feature:scale-110 transition-all duration-300">
          {icon}
        </div>
      )}
      <div className="flex-1">
        {title && (
          <h3 className="font-semibold text-gray-900 mb-2 group-hover/feature:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  </Card>
);

export const StatCard = ({ children, className = '', value, label, trend, ...props }) => (
  <Card 
    className={`text-center group/stat ${className}`}
    hover={true}
    {...props}
  >
    <div className="space-y-2">
      {value && (
        <div className="text-3xl font-bold text-gray-900 group-hover/stat:text-blue-600 transition-colors duration-300 animate-countUp">
          {value}
        </div>
      )}
      {label && (
        <div className="text-sm text-gray-600 group-hover/stat:text-gray-800 transition-colors duration-300">
          {label}
        </div>
      )}
      {trend && (
        <div className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'} animate-bounce`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      )}
      {children}
    </div>
  </Card>
);

// Add custom CSS animations to your global CSS or Tailwind config
const customAnimations = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes countUp {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-countUp {
  animation: countUp 0.8s ease-out;
}
`;

export default Card;