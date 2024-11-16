import React from 'react';
import { motion } from 'framer-motion';
import { type Category } from './types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: Category['id'];
  onSelect: (category: Category['id']) => void;
}

export function CategoryTabs({ categories, selectedCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`
            relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl
            transition-all duration-300
            ${selectedCategory === category.id 
              ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
            }
          `}
        >
          <span className="text-xl">{category.icon}</span>
          <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
          
          {selectedCategory === category.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] rounded-xl -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}