import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PlanButtonProps {
  popular?: boolean;
  onClick?: () => void;
}

export function PlanButton({ popular, onClick }: PlanButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-xl py-3 px-6 font-medium
        flex items-center justify-center gap-2
        transition-all duration-300
        ${popular 
          ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02]'
          : 'bg-white/10 hover:bg-white/15'
        }
        active:scale-95
      `}
    >
      Choose Plan
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}