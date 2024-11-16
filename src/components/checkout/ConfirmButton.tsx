import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { type Venue } from '../../types/venue';

interface ConfirmButtonProps {
  selectedTickets: {
    lineskip: number;
    drink: number;
  };
  venue: Venue;
  onClick: () => void;
}

export function ConfirmButton({ selectedTickets, venue, onClick }: ConfirmButtonProps) {
  const total = (
    selectedTickets.lineskip * venue.skipPrice +
    selectedTickets.drink * Math.floor(venue.skipPrice * 0.6)
  ) * 1.05; // Including 5% service fee

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full py-4 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-2 shadow-xl shadow-white/10"
      >
        <Lock className="w-5 h-5" />
        Confirm and Pay ${total.toFixed(2)}
      </motion.button>

      <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
        <Lock className="w-4 h-4" />
        Secure payment powered by Stripe
      </p>
    </div>
  );
}