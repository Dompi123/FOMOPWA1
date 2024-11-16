import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';
import { VenueMetrics } from './VenueMetrics';
import { type Venue } from '../types/venue';
import { CheckoutModal } from './checkout/CheckoutModal';

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => setShowCheckout(true)}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#9D5CFF] group-hover:to-[#FF3B7F] transition-all duration-500">
                {venue.name}
              </h3>
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-500">
                {venue.description}
              </p>
            </motion.div>
            <StatusBadge status={venue.status} />
          </div>

          {/* Metrics */}
          <VenueMetrics waitTime={venue.waitTime} capacity={venue.capacity} />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ y: -2 }}
              className="space-y-1"
            >
              <p className="text-sm text-white/70">Skip the Line</p>
              <p className="text-xl font-bold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-transparent bg-clip-text">
                ${venue.skipPrice}
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white font-medium"
            >
              Get Pass
            </motion.button>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9D5CFF]/10 to-[#FF3B7F]/10 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,white_10%,transparent_20%)] animate-[shine_3s_ease-in-out_infinite]" />
        </div>
      </motion.div>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        venue={venue}
      />
    </>
  );
}