import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Clock } from 'lucide-react';

interface TicketOption {
  type: 'lineskip' | 'cover';
  title: string;
  price: number;
  description: string;
  expires: string;
}

interface TicketCardProps {
  ticket: TicketOption;
  isActive: boolean;
  onClick: () => void;
}

export function TicketCard({ ticket, isActive, onClick }: TicketCardProps) {
  const isLineSkip = ticket.type === 'lineskip';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative rounded-3xl p-6 cursor-pointer
        backdrop-blur-xl border border-white/10
        ${isLineSkip 
          ? 'bg-purple-600/90' 
          : 'bg-blue-500/90'}
        ${isActive ? 'ring-2 ring-white shadow-lg shadow-white/10' : 'opacity-80'}
      `}
      role="button"
      aria-pressed={isActive}
      tabIndex={0}
    >
      {/* Badge */}
      {isLineSkip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-3 right-6 px-3 py-1 bg-white rounded-full"
        >
          <span className="text-xs font-bold text-purple-600">
            SKIP THE LINE
          </span>
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{ticket.title}</h2>
            <p className="mt-1 text-sm text-white/80">{ticket.description}</p>
          </div>
          <Ticket className="w-6 h-6 text-white/20" />
        </div>

        {/* Price and Expiry */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-sm text-white/80">Price</div>
            <div className="text-3xl font-bold text-white">${ticket.price}</div>
          </div>
          <div className="text-right flex items-center gap-1 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expires {ticket.expires}</span>
          </div>
        </div>
      </div>

      {/* Glass Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,white_10%,transparent_20%)] animate-[shine_3s_ease-in-out_infinite]" />
      </div>
    </motion.div>
  );
}