import React from 'react';
import { motion } from 'framer-motion';

interface DescriptionProps {
  venueName: string;
}

export function Description({ venueName }: DescriptionProps) {
  const features = ['Priority Entry', 'Skip the Line', '30-Day Access'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold text-white">Description</h2>
      <p className="text-white/60 text-sm leading-relaxed">
        Skip the line at {venueName} with your LineSkip Pass. Show the pass to door staff 
        for priority entry. Valid for 30 days from purchase. Must be 21+ with valid ID.
      </p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/80"
          >
            {feature}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}