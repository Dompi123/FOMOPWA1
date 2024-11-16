import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface CheckoutHeaderProps {
  onClose: () => void;
}

export function CheckoutHeader({ onClose }: CheckoutHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-lg mx-auto px-6 py-4 flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Close checkout"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <h1 className="flex-1 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
          Select Tickets
        </h1>
        <div className="w-10" />
      </div>
    </header>
  );
}