import React, { useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";
import { Link } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
import { LogOut } from 'lucide-react';

export const Header: React.FC = ({}) => {
  const accessToken = localStorage.getItem("spotify_access_token");
  const authorizationHandler = () => {
    window.location.href = "http://localhost:8888/login"; // Direct navigation
  };

  // useEffect(() => {
  //   authorizationHandler();
  // }, []);

  const signOutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8888/logout');
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="py-6 px-4 md:px-6 flex items-center justify-between animate-fade-in">
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <AnimatedLogo />
          <h1 className="font-bold text-xl md:text-2xl tracking-tight">
            <span className="text-gradient">MoodMelody</span>
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <button className="text-sm md:text-base font-medium text-primary/80 hover:text-primary transition-colors">
          About
        </button>
        <button className="text-sm md:text-base font-medium text-primary/80 hover:text-primary transition-colors">
          Help
        </button>
        {!accessToken ? (
          <button
            className="pulse-on-hover hover:bg-primary hover:text-black glassmorphism px-4 py-2 rounded-full text-sm md:text-base font-medium text-primary"
            onClick={authorizationHandler}
          >
            Sign In
          </button>
        ) : (
          <>
          <UserProfile />
          <button
              className="text-sm md:text-base font-medium text-primary/80 hover:text-primary transition-colors"
              onClick={signOutHandler}
            >
              <LogOut className="text-white"/>
            </button>
            </>
        )}
      </div>
    </header>
  );
};
