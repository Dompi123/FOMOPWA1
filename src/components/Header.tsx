import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
            <PartyPopper className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-transparent bg-clip-text">
            FOMO
          </h1>
        </motion.div>
      </div>
    </header>
  );
}