import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(255,255,255,0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r bg-black">
      <Header />
      <motion.div 
        className="app-container flex-1 flex flex-col"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="pt-8 pb-16 flex-1 flex flex-col">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              AI-Powered Music Assistant
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-primary/80"
              variants={itemVariants}
            >
              Your <span className="text-gradient">Mood</span>, Your{" "}
              <span className="text-gradient">Music</span>
            </motion.h1>
            <motion.p 
              className="max-w-xl mx-auto text-base md:text-lg text-primary/80"
              variants={itemVariants}
            >
              Chat with our AI to discover music that matches exactly how you
              feel. No more endless scrolling, just tell us your mood.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex-1 rounded-2xl p-4"
            variants={itemVariants}
          >
            {/* <ChatInterface /> */}
            <div className="flex justify-center">
              <Link to={"/dashboard"}>
                <motion.button 
                  className="bg-primary/70 p-4 rounded-3xl text-xl font-semibold"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={{
                    scale: [1, 1.03, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  {texts[index]}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="fixed inset-0 -z-10 bg-gradient-radial from-white to-background opacity-80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
    </div>
  );
};

export default Index;
