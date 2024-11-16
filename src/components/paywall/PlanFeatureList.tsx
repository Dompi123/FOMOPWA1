import React from 'react';
import { Check } from 'lucide-react';
import { PlanFeature as PlanFeatureType } from './types';

interface PlanFeatureListProps {
  features: PlanFeatureType[];
}

export function PlanFeatureList({ features }: PlanFeatureListProps) {
  return (
    <div className="space-y-4 mb-6">
      {features.map((feature, i) => (
        <div 
          key={i}
          className="flex items-center gap-3"
        >
          <div className={`
            rounded-full p-1
            ${feature.included 
              ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]' 
              : 'bg-white/10'
            }
          `}>
            <Check className={`
              h-4 w-4
              ${feature.included ? 'text-white' : 'text-white/30'}
            `} />
          </div>
          <span className={feature.included ? 'text-white' : 'text-white/30'}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
}