import React from 'react';
import { motion } from 'framer-motion';
import { type VenueStatus } from '../../types/venue';

interface StatusBadgeProps {
  status: VenueStatus;
}

const statusConfig: Record<VenueStatus, { gradient: string; label: string }> = {
  peak: {
    gradient: 'from-rose-500 to-orange-500',
    label: 'Peak Hours'
  },
  busy: {
    gradient: 'from-amber-400 to-red-400',
    label: 'Busy Now'
  },
  live: {
    gradient: 'from-emerald-400 to-teal-500',
    label: 'Live'
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        bg-gradient-to-r ${config.gradient}
        px-3 py-1 rounded-full
        flex items-center gap-1.5
        shadow-lg
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      <span className="text-xs font-semibold text-white">{config.label}</span>
    </motion.div>
  );
}