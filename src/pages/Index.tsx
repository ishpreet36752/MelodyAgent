import React, { useEffect, useState, lazy, Suspense } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClickSpark from "@/ui/ClickSpark";
import GlassSurface from "../components/GlassSurface";
import Footer from "../components/Footer";
// Lazy Spline wrapper
const SplineScene = lazy(() => import("../components/SplineScene"));

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
        type: "spring" as const,
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
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (

    <div className="min-h-screen flex flex-col bg-gradient-to-r bg-black relative overflow-hidden">
      {/* Background Spline - lazy and scroll-activated */}
      {/* <Suspense fallback={null}>
        <div className=""><SplineScene sceneUrl="https://prod.spline.design/BWKQMiH2x7TXQJyt/scene.splinecode" /></div>

      </Suspense> */}
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
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

            {/* Features */}
            <section id="features" className="mx-auto mt-16 w-full max-w-6xl px-4">
              <motion.h2
                className="mb-6 text-center text-2xl font-semibold text-primary/90"
                variants={itemVariants}
              >
                Crafted for clarity
              </motion.h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Mood Detection",
                    desc: "Describe your vibe; we translate emotion into sound.",
                  },
                  {
                    title: "Smart Playlists",
                    desc: "Instant Spotify mixes tailored to how you feel.",
                  },
                  {
                    title: "Live Context",
                    desc: "Recommendations adapt to what you are playing now.",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <GlassSurface className="h-full p-5">
                      <div className="flex h-full flex-col gap-2">
                        <div className="text-base font-medium text-primary/90">
                          {card.title}
                        </div>
                        <p className="text-sm text-primary/70">{card.desc}</p>
                      </div>
                    </GlassSurface>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section id="how" className="mx-auto mt-16 w-full max-w-5xl px-4">
              <GlassSurface className="px-6 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[
                    { step: "1", text: "Connect Spotify securely." },
                    { step: "2", text: "Tell us your mood in a sentence." },
                    { step: "3", text: "Play your tailored soundtrack." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary/90">
                        {item.step}
                      </span>
                      <p className="text-sm text-primary/80">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassSurface>
            </section>

            {/* CTA */}
            <section id="cta" className="mx-auto mt-16 w-full max-w-xl px-4">
              <GlassSurface className="px-6 py-6 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 text-primary/80"
                >
                  Ready to tune into your mood?
                </motion.p>
                <Link to={"/dashboard"}>
                  <motion.button
                    className="rounded-2xl bg-primary/70 px-5 py-3 text-base font-semibold"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Start listening
                  </motion.button>
                </Link>
              </GlassSurface>
            </section>
          </div>
        </motion.div>

        <motion.div
          className="fixed inset-0 -z-10 bg-gradient-radial from-white to-background opacity-80 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <Footer />
      </ClickSpark>
    </div>
  );
};

export default Index;
