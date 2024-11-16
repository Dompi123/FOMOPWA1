import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  icon: LucideIcon;
  popular: boolean;
}

interface SubscriptionCardProps {
  plan: Plan;
}

export function SubscriptionCard({ plan }: SubscriptionCardProps) {
  const Icon = plan.icon;
  
  return (
    <div className={`group relative ${plan.popular ? 'scale-105' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] rounded-full text-xs font-semibold text-white">
          Most Popular
        </div>
      )}
      
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#9D5CFF]/20">
        <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent group-hover:from-white/[0.08] transition-colors duration-300" />
          
          <div className="relative space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-white/70">Perfect for nightlife enthusiasts</p>
              </div>
              <div className="p-2 rounded-xl bg-gradient-to-r from-[#9D5CFF]/10 to-[#FF3B7F]/10">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-white/70">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#9D5CFF]/20 hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}