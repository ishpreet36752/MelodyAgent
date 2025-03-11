import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

const Index = () => {
  const texts = [
    "🎶 Let the Music Find You",
    "🔮Tune Into Your Soul",
    "🌌 Echoes of You",
    "⚡ Resonate With Sound",
    "🌿 Sonic Enlightenment",
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r bg-black">
      <Header />
      <div className="app-container flex-1 flex flex-col">
        <div className="pt-8 pb-16 flex-1 flex flex-col">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-2">
              AI-Powered Music Assistant
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-primary/80">
              Your <span className="text-gradient">Mood</span>, Your{" "}
              <span className="text-gradient">Music</span>
            </h1>
            <p className=" max-w-xl mx-auto text-base md:text-lg text-primary/80">
              Chat with our AI to discover music that matches exactly how you
              feel. No more endless scrolling, just tell us your mood.
            </p>
          </div>

          <div className="flex-1   rounded-2xl p-4  animate-scale-in">
            {/* <ChatInterface /> */}
            <div className="flex justify-center">
              <Link to={"/dashboard"}>
                <button className=" bg-primary/70 p-4 rounded-3xl text-xl font-semibold">
                  {texts[index]}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 bg-gradient-radial from-white to-background opacity-80 pointer-events-none"></div>
    </div>
  );
};

export default Index;
