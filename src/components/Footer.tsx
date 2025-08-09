import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-lg font-semibold text-primary/90">Moodly</div>
            <p className="mt-2 text-sm text-primary/70">
              Your mood, your music. Crafted with love for clean listening.
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-sm"
          >
            <div className="font-medium text-primary/80">Product</div>
            <ul className="mt-3 space-y-2 text-primary/70">
              <li><a href="#features" className="hover:text-primary/90">Features</a></li>
              <li><a href="#how" className="hover:text-primary/90">How it works</a></li>
              <li><a href="#cta" className="hover:text-primary/90">Get started</a></li>
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm"
          >
            <div className="font-medium text-primary/80">Legal</div>
            <ul className="mt-3 space-y-2 text-primary/70">
              <li><a href="#" className="hover:text-primary/90">Terms</a></li>
              <li><a href="#" className="hover:text-primary/90">Privacy</a></li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-primary/60">
          <span>© {new Date().getFullYear()} Moodly. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary/90">Twitter</a>
            <a href="#" className="hover:text-primary/90">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


