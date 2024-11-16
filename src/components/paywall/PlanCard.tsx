import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SubscriptionPlan } from './types';
import { fadeInUp } from './animations';
import { PlanFeatureList } from './PlanFeatureList';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onSelect: (plan: SubscriptionPlan) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative"
    >
      <div className="rounded-2xl bg-gradient-to-r from-white/10 to-white/5 p-[1px]">
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
            {plan.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F]">
                {plan.badge}
              </span>
            )}
          </div>

          <PlanFeatureList features={plan.features} />

          <motion.button
            onClick={() => onSelect(plan)}
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
            Choose Plan
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}