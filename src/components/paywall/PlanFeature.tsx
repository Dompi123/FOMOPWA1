import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeatureProps {
  text: string;
  included: boolean;
}

export function PlanFeature({ text, included }: PlanFeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        rounded-full p-1
        ${included 
          ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]' 
          : 'bg-white/10'
        }
      `}>
        <Check className={`
          h-4 w-4
          ${included ? 'text-white' : 'text-white/30'}
        `} />
      </div>
      <span className={included ? 'text-white' : 'text-white/30'}>
        {text}
      </span>
    </div>
  );
}