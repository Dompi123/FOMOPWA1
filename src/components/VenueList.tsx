import React from 'react';
import { motion } from 'framer-motion';
import { VenueCard } from './VenueCard';
import { type Venue } from '../types/venue';

interface VenueListProps {
  venues: Venue[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function VenueList({ venues }: VenueListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 px-4 pb-4"
    >
      {venues.map((venue) => (
        <motion.div 
          key={venue.id}
          variants={item}
          className="w-full"
        >
          <VenueCard venue={venue} />
        </motion.div>
      ))}
    </motion.div>
  );
}