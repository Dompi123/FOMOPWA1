import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface CategoryTabProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryTab({ category, isSelected, onClick }: CategoryTabProps) {
  const Icon = category.icon;
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl
        transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white'
          : 'bg-white/5 text-white/70 hover:bg-white/10'
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
      
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] rounded-xl -z-10"
        />
      )}
    </motion.button>
  );
}