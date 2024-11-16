import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface CheckoutButtonProps {
  quantity: number;
  basePrice: number;
  onClick: () => void;
}

export function CheckoutButton({ quantity, basePrice, onClick }: CheckoutButtonProps) {
  const total = basePrice * quantity;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-white rounded-xl py-4 text-black font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-white/10 transition-shadow"
    >
      <Lock className="w-4 h-4" />
      Confirm and Pay ${total.toFixed(2)}
    </motion.button>
  );
}