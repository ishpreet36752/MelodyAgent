
import React from 'react';
import AnimatedLogo  from './AnimatedLogo';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-2">
        <AnimatedLogo />
        <h1 className="font-bold text-xl md:text-2xl tracking-tight">
          <span className="text-gradient">MoodMelody</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm md:text-base font-medium text-primary/80 hover:text-primary transition-colors">
          About
        </button>
        <button className="text-sm md:text-base font-medium text-primary/80 hover:text-primary transition-colors">
          Help
        </button>
        <button className="pulse-on-hover hover:bg-primary hover:text-black glassmorphism px-4 py-2 rounded-full text-sm md:text-base font-medium text-primary">
          Sign In
        </button>
      </div>
    </header>
  );
};
