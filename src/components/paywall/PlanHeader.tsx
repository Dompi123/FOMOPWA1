import React from 'react';

interface PlanHeaderProps {
  name: string;
  price: number;
  period: string;
  badge?: string;
}

export function PlanHeader({ name, price, period, badge }: PlanHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-white/60">/{period}</span>
        </div>
      </div>
      {badge && (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
          {badge}
        </span>
      )}
    </div>
  );
}