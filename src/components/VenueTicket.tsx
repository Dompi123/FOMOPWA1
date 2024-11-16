import React from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface VenueTicketProps {
  name: string;
  status: 'peak' | 'busy' | 'live';
  waitTime: number;
  capacity: number;
  skipPrice: number;
}

const statusConfig = {
  peak: 'bg-gradient-to-r from-red-500 to-orange-500',
  busy: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  live: 'bg-gradient-to-r from-green-400 to-emerald-500'
};

const statusText = {
  peak: 'Peak Hours',
  busy: 'Busy Now',
  live: 'Live Event'
};

export function VenueTicket({ name, status, waitTime, capacity, skipPrice }: VenueTicketProps) {
  return (
    <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
      <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <span className={`${statusConfig[status]} px-3 py-1 rounded-full text-sm font-medium text-white`}>
            {statusText[status]}
          </span>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white/70" />
            <div>
              <p className="text-sm text-white/70">Wait Time</p>
              <p className="text-base font-medium text-white">{waitTime} mins</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white/70" />
            <div>
              <p className="text-sm text-white/70">Capacity</p>
              <p className="text-base font-medium text-white">{capacity}%</p>
            </div>
          </div>
        </div>

        {/* Skip Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">Skip the Line</p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-transparent bg-clip-text">
              ${skipPrice}
            </p>
          </div>
          <button className="group/btn bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] p-3 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95">
            <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}