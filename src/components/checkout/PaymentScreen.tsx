import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AppleIcon, CreditCard, Lock } from 'lucide-react';
import { type Venue } from '../../types/venue';
import { PassCard } from './PassCard';
import { PaymentMethod } from './PaymentMethod';

interface PaymentScreenProps {
  venue: Venue;
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentScreen({ venue, onBack, onComplete }: PaymentScreenProps) {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="flex-1 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
            Checkout
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-6 max-w-lg mx-auto">
        <PassCard venue={venue} />

        <div className="space-y-4">
          <PaymentMethod
            icon={AppleIcon}
            label="Pay with Apple Pay"
            onClick={() => {}}
          />
          <PaymentMethod
            icon={CreditCard}
            label="Add Card"
            onClick={() => {}}
          />
        </div>

        {/* Secure Payment Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-white/40">
          <Lock className="w-4 h-4" />
          <span>Secure payment powered by Stripe</span>
        </div>
      </main>
    </motion.div>
  );
}