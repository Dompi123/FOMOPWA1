import React from 'react';
import { motion } from 'framer-motion';
import { DrinkCard } from './DrinkCard';
import { type Drink } from './types';

interface DrinkGridProps {
  drinks: Drink[];
  onDrinkSelect: (drink: Drink) => void;
}

const container = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function DrinkGrid({ drinks, onDrinkSelect }: DrinkGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 p-6"
    >
      {drinks.map((drink) => (
        <DrinkCard
          key={drink.id}
          drink={drink}
          onSelect={onDrinkSelect}
        />
      ))}
    </motion.div>
  );
}