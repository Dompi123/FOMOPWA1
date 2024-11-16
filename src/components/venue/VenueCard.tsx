import React from 'react';
import { motion } from 'framer-motion';
import { type Venue } from '../../types/venue';
import { StatusBadge } from './StatusBadge';
import { VenueMetrics } from './VenueMetrics';

interface VenueCardProps {
  venue: Venue;
  onSelect: (venue: Venue) => void;
}

export function VenueCard({ venue, onSelect }: VenueCardProps) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/10"
      onClick={() => onSelect(venue)}
    >
      {/* Image with zoom effect preserved */}
      <div className="relative h-48">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute inset-0"
        >
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </motion.div>
        
        <div className="absolute top-4 right-4">
          <StatusBadge status={venue.status} />
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            {venue.name}
          </h3>
          <p className="text-white/60 mt-1">
            {venue.description}
          </p>
        </div>

        <VenueMetrics
          waitTime={venue.waitTime}
          capacity={venue.capacity}
          skipPrice={venue.skipPrice}
        />
      </div>
    </motion.div>
  );
}