import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ChevronRight } from 'lucide-react';

interface PromoCodeProps {
  value: string;
  onChange: (code: string) => void;
}

export function PromoCode({ value, onChange }: PromoCodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {!isExpanded ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between bg-transparent border border-white/10 rounded-xl p-4 group"
        >
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-[#FF3B7F]" />
            <span className="text-[#FF3B7F] font-medium">Apply promo code</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/60 transition-colors" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter promo code"
            className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF3B7F] transition-colors"
          />
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#FF3B7F] hover:text-[#FF3B7F]/80 transition-colors"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
}