import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { type PlanProps } from './types';
import { fadeInUp } from './animations';

export function SubscriptionPlan({ plan, onSelect }: PlanProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`relative ${plan.popular ? 'scale-105' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] rounded-full text-xs font-semibold text-white shadow-lg shadow-purple-500/20">
          Most Popular
        </div>
      )}
      
      <div className="rounded-2xl bg-gradient-to-r from-white/10 to-white/5 p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#9D5CFF]/20">
        <div className={`
          rounded-2xl p-6 backdrop-blur-xl
          ${plan.popular ? 'bg-zinc-900/90' : 'bg-zinc-900/70'}
        `}>
          {/* Plan Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-white/60">/{plan.period}</span>
              </div>
            </div>
            {plan.badge && plan.badge !== "Most Popular" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
                {plan.badge}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4 mb-6">
            {plan.features.map((feature, i) => (
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

          {/* CTA Button */}
          <motion.button
            onClick={onSelect}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full rounded-xl py-3 px-6 font-medium
              flex items-center justify-center gap-2
              transition-all duration-300
              ${plan.popular 
                ? 'bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30'
                : 'bg-white/10 hover:bg-white/15'
              }
            `}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}