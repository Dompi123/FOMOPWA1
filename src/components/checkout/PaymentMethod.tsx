import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface PaymentMethodProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function PaymentMethod({ icon: Icon, label, onClick }: PaymentMethodProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-xl flex items-center gap-3 group"
    >
      <Icon className="w-5 h-5 text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors duration-300" />
      <span className="text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors duration-300 font-medium">
        {label}
      </span>
    </motion.button>
  );
}