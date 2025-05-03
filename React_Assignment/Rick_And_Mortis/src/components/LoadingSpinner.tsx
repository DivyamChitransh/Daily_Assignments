import React from 'react';

interface LoadingSpinnerProps {
  theme: 'light' | 'dark';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
          theme === 'dark' ? 'border-purple-400' : 'border-green-500'
        }`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
            theme === 'dark' ? 'border-green-400 animate-[spin_0.5s_linear_infinite_reverse]' : 'border-purple-500 animate-[spin_0.5s_linear_infinite_reverse]'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;