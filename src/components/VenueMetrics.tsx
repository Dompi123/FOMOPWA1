import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

interface VenueMetricsProps {
  waitTime: number;
  capacity: number;
}

export function VenueMetrics({ waitTime, capacity }: VenueMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        whileHover={{ y: -2 }}
        className="group"
      >
        <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-colors duration-500 group-hover:bg-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#9D5CFF]/20 to-[#9D5CFF]/10">
              <Clock className="w-5 h-5 text-[#9D5CFF]" />
            </div>
            <div>
              <p className="text-sm text-white/70">Wait Time</p>
              <p className="text-base font-medium text-white">{waitTime} mins</p>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9D5CFF]/0 to-[#9D5CFF]/0 group-hover:from-[#9D5CFF]/10 group-hover:to-[#9D5CFF]/5 transition-colors duration-500" />
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -2 }}
        className="group"
      >
        <div className="relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-colors duration-500 group-hover:bg-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#FF3B7F]/20 to-[#FF3B7F]/10">
              <Users className="w-5 h-5 text-[#FF3B7F]" />
            </div>
            <div>
              <p className="text-sm text-white/70">Capacity</p>
              <p className="text-base font-medium text-white">{capacity}%</p>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF3B7F]/0 to-[#FF3B7F]/0 group-hover:from-[#FF3B7F]/10 group-hover:to-[#FF3B7F]/5 transition-colors duration-500" />
        </div>
      </motion.div>
    </div>
  );
}