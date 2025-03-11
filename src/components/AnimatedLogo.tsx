
import React from 'react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-400 animate-pulse-soft"></div>
      <div className="relative z-10 w-6 h-6 md:w-7 md:h-6">
        <div className="music-wave">
          <div className="music-wave-bar"></div>
          <div className="music-wave-bar"></div>
          <div className="music-wave-bar"></div>
          <div className="music-wave-bar"></div>
          <div className="music-wave-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
