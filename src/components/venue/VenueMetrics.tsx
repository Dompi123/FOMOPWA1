import React from 'react';
import { Clock, Users, Zap } from 'lucide-react';

interface VenueMetricsProps {
  waitTime: number;
  capacity: number;
  skipPrice: number;
}

export function VenueMetrics({ waitTime, capacity, skipPrice }: VenueMetricsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-[#FF3B7F]" />
        <span className="text-white/70">{waitTime}min</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-[#9D5CFF]" />
        <span className="text-white/70">{capacity}%</span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Zap className="h-4 w-4 text-[#FF3B7F]" />
        <span className="font-semibold text-white">${skipPrice}</span>
      </div>
    </div>
  );
}