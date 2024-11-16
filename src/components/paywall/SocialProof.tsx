import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield } from 'lucide-react';
import { fadeInUp } from './animations';

export function SocialProof() {
  return (
    <motion.div
      variants={fadeInUp}
      className="space-y-4"
    >
      <div className="rounded-xl bg-white/5 backdrop-blur-lg p-4 text-center">
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="h-4 w-4 text-yellow-500 fill-yellow-500" 
            />
          ))}
        </div>
        <p className="text-sm text-white/70">
          Trusted by 10,000+ nightlife enthusiasts in NYC
        </p>
      </div>

      <div className="rounded-xl bg-white/5 backdrop-blur-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#9D5CFF] mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-white">
              30-day money-back guarantee
            </p>
            <p className="text-sm text-white/70">
              Try FOMO VIP risk-free. Not satisfied? Get a full refund within 30 days.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}