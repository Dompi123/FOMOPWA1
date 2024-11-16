import React from 'react';
import { motion } from 'framer-motion';
import { type Venue } from '../../types/venue';
import { fadeInUp } from './animations';

interface PaywallHeaderProps {
  venue: Venue;
}

export function PaywallHeader({ venue }: PaywallHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center space-y-3"
    >
      <h1 className="text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
          Skip the Line at {venue.name}
        </span>
      </h1>
      <p className="text-white/70">
        Choose your pass to unlock instant access
      </p>
    </motion.div>
  );
}