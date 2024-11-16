import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Tag, ChevronRight } from 'lucide-react';

interface PaymentSectionProps {
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
}

export function PaymentSection({ promoCode, onPromoCodeChange }: PaymentSectionProps) {
  const [showPromoInput, setShowPromoInput] = useState(false);

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors" />
          <span className="text-[#9D5CFF] group-hover:text-[#FF3B7F] transition-colors font-medium">
            Add Payment Method
          </span>
        </div>
      </motion.button>

      {!showPromoInput ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPromoInput(true)}
          className="w-full p-4 rounded-xl border border-white/10 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-[#FF3B7F]" />
            <span className="text-[#FF3B7F] font-medium">Apply promo code</span>
          </div>
          <ChevronRight className="w-5 w-5 text-white/40 group-hover:text-white/60 transition-colors" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Enter promo code"
            className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF3B7F] transition-colors"
          />
          <button
            onClick={() => setShowPromoInput(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#FF3B7F] hover:text-[#FF3B7F]/80 transition-colors"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
}