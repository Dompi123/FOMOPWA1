import React from 'react';
import { motion } from 'framer-motion';
import { Info, Heart, Share2, Sparkles } from 'lucide-react';
import { type Drink } from './types';

interface DrinkCardProps {
  drink: Drink;
  onSelect: (drink: Drink) => void;
}

export function DrinkCard({ drink, onSelect }: DrinkCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 p-3 rounded-xl bg-[#1A1A1A] border border-white/10 cursor-pointer group"
      onClick={() => onSelect(drink)}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        <img
          src={drink.image}
          alt={drink.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-white">{drink.name}</h3>
          {drink.popular && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2A2A2A] text-xs">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-white/80">Popular</span>
            </span>
          )}
        </div>
        <p className="text-sm text-white/60 mt-1">{drink.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-medium bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-transparent bg-clip-text">
            ${drink.price.toFixed(2)}
          </p>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                // Implement like functionality
              }}
            >
              <Heart className="w-4 h-4 text-white/60" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                // Implement share functionality
              }}
            >
              <Share2 className="w-4 h-4 text-white/60" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(drink);
              }}
            >
              <Info className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}