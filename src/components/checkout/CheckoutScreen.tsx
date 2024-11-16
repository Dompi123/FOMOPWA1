import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CreditCard, Lock, Tag } from 'lucide-react';
import { type Venue } from '../../types/venue';
import { PassCard } from './PassCard';

interface CheckoutScreenProps {
  venue: Venue;
  onClose: () => void;
}

export function CheckoutScreen({ venue, onClose }: CheckoutScreenProps) {
  const [selectedTickets, setSelectedTickets] = useState({
    lineskip: 0,
    drink: 0
  });
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const calculateTotal = () => {
    const subtotal = (
      selectedTickets.lineskip * venue.skipPrice +
      selectedTickets.drink * Math.floor(venue.skipPrice * 0.6)
    );
    const serviceFee = subtotal * 0.05; // 5% service fee
    return {
      subtotal,
      serviceFee,
      total: subtotal + serviceFee
    };
  };

  const { subtotal, serviceFee, total } = calculateTotal();
  const hasSelectedPass = selectedTickets.lineskip > 0 || selectedTickets.drink > 0;

  const handleTicketChange = (type: 'lineskip' | 'drink', delta: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(10, prev[type] + delta))
    }));
  };

  const passes = [
    {
      type: 'lineskip' as const,
      title: 'LineSkip Pass',
      price: venue.skipPrice,
      description: 'Skip the line + includes cover charge',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      bgColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
      quantity: selectedTickets.lineskip
    },
    {
      type: 'drink' as const,
      title: 'Happy Thursday Drink',
      price: Math.floor(venue.skipPrice * 0.6),
      description: 'Includes one complimentary drink',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      bgColor: 'bg-pink-500',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
      quantity: selectedTickets.drink
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col max-h-screen overflow-hidden"
    >
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 sm:px-6 py-4 flex items-center bg-black/50 backdrop-blur-xl border-b border-white/10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <h1 className="flex-1 text-center text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
          Select Tickets
        </h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Pass Cards */}
          <div className="space-y-4">
            {passes.map(pass => (
              <PassCard
                key={pass.type}
                {...pass}
                onQuantityChange={handleTicketChange}
              />
            ))}
          </div>

          {/* Payment Section */}
          <AnimatePresence>
            {hasSelectedPass && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Payment Method */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors" />
                    <span className="text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors font-medium">
                      Add Payment Method
                    </span>
                  </div>
                </motion.button>

                {/* Promo Code */}
                {!showPromoInput ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPromoInput(true)}
                    className="w-full p-4 rounded-xl border border-white/10 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-[#FF3B7F]" />
                      <span className="text-[#FF3B7F] font-medium">
                        Apply promo code
                      </span>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF3B7F] transition-colors"
                    />
                    <button
                      onClick={() => setShowPromoInput(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#FF3B7F] hover:text-[#FF3B7F]/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-3 rounded-xl bg-white/5 p-4">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-semibold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                >
                  <Lock className="w-5 h-5" />
                  Confirm and Pay ${total.toFixed(2)}
                </motion.button>

                {/* Security Note */}
                <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  Secure payment powered by Stripe
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}