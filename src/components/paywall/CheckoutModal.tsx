import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, ChevronDown, ChevronUp, Ticket } from 'lucide-react';
import { type Plan } from './types';

interface CheckoutModalProps {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
}

const modalAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export function CheckoutModal({ plan, isOpen, onClose }: CheckoutModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  if (!plan) return null;

  const subtotal = plan.price * quantity;
  const tax = subtotal * 0.0875; // NYC sales tax
  const total = subtotal + tax;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            variants={overlayAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          
          <motion.div
            className="relative w-full max-w-lg bg-zinc-900 rounded-3xl overflow-hidden"
            variants={modalAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-[#9D5CFF] to-[#FF3B7F] p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="absolute bottom-6 left-6 space-y-2">
                <h3 className="text-2xl font-bold text-white">{plan.name} Pass</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-white/80">/{plan.period}</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6">
                <Ticket className="w-12 h-12 text-white/20" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Quantity</label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-xl font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors disabled:opacity-50"
                    disabled={quantity >= 10}
                  >
                    <ChevronUp className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowPromo(!showPromo)}
                  className="text-sm font-medium text-[#9D5CFF] hover:text-[#FF3B7F] transition-colors"
                >
                  {showPromo ? 'Hide promo code' : 'Add promo code'}
                </button>
                {showPromo && (
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#9D5CFF]"
                  />
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button className="w-full p-4 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <Lock className="w-4 h-4" />
                Pay Now
              </button>

              {/* Security Note */}
              <p className="text-center text-sm text-white/40 flex items-center justify-center gap-1.5">
                <Lock className="w-4 h-4" />
                Secure payment powered by Stripe
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}