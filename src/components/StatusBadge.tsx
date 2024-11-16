import React from 'react';
import { motion } from 'framer-motion';
import { type VenueStatus } from '../types/venue';

const statusConfig: Record<VenueStatus, { gradient: string; label: string; animation: string }> = {
  peak: {
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    label: 'Peak Hours',
    animation: 'animate-pulse'
  },
  busy: {
    gradient: 'from-amber-400 via-orange-400 to-red-400',
    label: 'Busy Now',
    animation: 'animate-[pulse_2s_ease-in-out_infinite]'
  },
  live: {
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    label: 'Live Event',
    animation: 'animate-[pulse_1.5s_ease-in-out_infinite]'
  }
};

interface StatusBadgeProps {
  status: VenueStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} blur-xl opacity-20 ${config.animation}`} />
      <motion.div 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative bg-gradient-to-r ${config.gradient} 
          px-3 py-1 rounded-full 
          inline-flex items-center gap-1.5
          shadow-lg shadow-${status === 'peak' ? 'rose' : status === 'busy' ? 'amber' : 'emerald'}-500/20
        `}
      >
        <span className={`
          h-1.5 w-1.5 rounded-full bg-white 
          ${config.animation}
          transition-transform duration-500
        `} />
        <span className="text-sm font-medium text-white tracking-wide">
          {config.label}
        </span>
      </motion.div>
    </motion.div>
  );
}