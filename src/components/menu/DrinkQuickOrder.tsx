import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { type Drink } from './types';

interface DrinkQuickOrderProps {
  drink: Drink;
  onClose: () => void;
}

export function DrinkQuickOrder({ drink, onClose }: DrinkQuickOrderProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", bounce: 0.2 }}
        className="w-full bg-[#1A1A1A] rounded-t-3xl p-6 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white">{drink.name}</h3>
            <p className="text-white/70 mt-1">{drink.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#2A2A2A]"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="flex items-center justify-between bg-[#2A2A2A] rounded-xl p-4">
          <span className="text-xl font-bold text-white">${drink.price}</span>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 rounded-full hover:bg-[#3A3A3A] disabled:opacity-50"
            >
              <Minus className="w-5 h-5 text-white" />
            </motion.button>
            <span className="text-xl font-medium text-white w-8 text-center">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 rounded-full hover:bg-[#3A3A3A] disabled:opacity-50"
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white font-semibold"
        >
          Add to Order - ${(drink.price * quantity).toFixed(2)}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}