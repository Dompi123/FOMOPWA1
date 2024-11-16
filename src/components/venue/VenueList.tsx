import React from 'react';
import { motion } from 'framer-motion';
import { type Venue } from '../../types/venue';
import { VenueCard } from './VenueCard';

interface VenueListProps {
  venues: Venue[];
  onVenueSelect: (venue: Venue) => void;
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

export function VenueList({ venues, onVenueSelect }: VenueListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 space-y-4"
    >
      {venues.map((venue) => (
        <motion.div key={venue.id} variants={item}>
          <VenueCard
            venue={venue}
            onSelect={onVenueSelect}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}