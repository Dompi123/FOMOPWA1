import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  price: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, price, onChange }: QuantitySelectorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
    >
      <div className="text-xl text-white">${price.toFixed(2)} ea</div>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Minus className="h-6 w-6 text-white" />
        </motion.button>
        <span className="text-xl text-white w-8 text-center">{quantity}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(quantity + 1)}
          disabled={quantity >= 10}
          className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Plus className="h-6 w-6 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}