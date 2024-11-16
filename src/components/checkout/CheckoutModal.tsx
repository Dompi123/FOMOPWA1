import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { CheckoutHeader } from './CheckoutHeader';
import { PassCarousel } from './PassCarousel';
import { PaymentSection } from './PaymentSection';
import { PriceBreakdown } from './PriceBreakdown';
import { ConfirmButton } from './ConfirmButton';
import { DrinkMenu } from '../menu/DrinkMenu';
import { type Venue } from '../../types/venue';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
}

type CheckoutView = 'tickets' | 'confirmation' | 'drinks';

export function CheckoutModal({ isOpen, onClose, venue }: CheckoutModalProps) {
  const [currentView, setCurrentView] = useState<CheckoutView>('tickets');
  const [selectedTickets, setSelectedTickets] = useState({
    lineskip: 0,
    drink: 0
  });
  const [promoCode, setPromoCode] = useState('');

  const handleTicketChange = (tickets: { lineskip: number; drink: number }) => {
    setSelectedTickets(tickets);
  };

  const handleCheckout = () => {
    setCurrentView('confirmation');
    // Auto-transition to drinks menu after 2 seconds
    setTimeout(() => {
      setCurrentView('drinks');
    }, 2000);
  };

  const renderConfirmation = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white">Payment Confirmed!</h2>
        <p className="text-white/60">Redirecting to drink menu...</p>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
        >
          <AnimatePresence mode="wait">
            {currentView === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen flex flex-col"
              >
                <CheckoutHeader onClose={onClose} />
                
                <main className="flex-1 overflow-y-auto">
                  <div className="max-w-lg mx-auto p-6 space-y-6">
                    <PassCarousel
                      venue={venue}
                      selectedTickets={selectedTickets}
                      onTicketChange={handleTicketChange}
                    />

                    {(selectedTickets.lineskip > 0 || selectedTickets.drink > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <PaymentSection
                          promoCode={promoCode}
                          onPromoCodeChange={setPromoCode}
                        />

                        <PriceBreakdown
                          selectedTickets={selectedTickets}
                          venue={venue}
                          promoCode={promoCode}
                        />

                        <ConfirmButton
                          selectedTickets={selectedTickets}
                          venue={venue}
                          onClick={handleCheckout}
                        />
                      </motion.div>
                    )}
                  </div>
                </main>
              </motion.div>
            )}

            {currentView === 'confirmation' && renderConfirmation()}

            {currentView === 'drinks' && (
              <motion.div
                key="drinks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen"
              >
                <DrinkMenu onClose={onClose} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}