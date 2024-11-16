import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { TicketSelector } from './TicketSelector';
import { type Venue } from '../../types/venue';
import { type TicketOption } from './types';

interface CheckoutProps {
  venue: Venue;
  onClose: () => void;
}

export function Checkout({ venue, onClose }: CheckoutProps) {
  const [selectedTicket, setSelectedTicket] = useState<'lineskip' | 'cover'>('lineskip');

  const tickets: TicketOption[] = [
    {
      type: 'lineskip',
      title: 'LineSkip Pass',
      venue: venue.name,
      price: venue.skipPrice,
      description: 'Skip the line + includes cover charge',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    },
    {
      type: 'cover',
      title: 'Cover Only',
      venue: venue.name,
      price: Math.floor(venue.skipPrice * 0.6),
      description: 'Standard entry, regular line',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50"
    >
      <header className="sticky top-0 z-10 px-6 py-4 flex items-center bg-black/50 backdrop-blur-xl">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <h1 className="flex-1 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
          Select Ticket
        </h1>
        <div className="w-10" />
      </header>

      <main className="px-6 space-y-6 pb-8">
        <TicketSelector
          tickets={tickets}
          selectedTicket={selectedTicket}
          onSelect={setSelectedTicket}
        />

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-xl flex items-center gap-3"
          >
            <CreditCard className="w-5 h-5 text-[#9D5CFF]" />
            <span className="text-[#9D5CFF] font-medium">Add Payment Method</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-2 shadow-xl shadow-white/10"
          >
            <Lock className="w-5 h-5" />
            Confirm and Pay ${selectedTicket === 'lineskip' ? venue.skipPrice : Math.floor(venue.skipPrice * 0.6)}
          </motion.button>

          <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
            <Lock className="w-4 h-4" />
            Secure payment powered by Stripe
          </p>
        </div>
      </main>
    </motion.div>
  );
}