import React from 'react';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { SubscriptionCard } from './SubscriptionCard';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: 'month',
    features: [
      'Skip the line at select venues',
      'Basic venue analytics',
      'Standard support'
    ],
    icon: Star,
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: 'month',
    features: [
      'Skip the line at all venues',
      'Real-time capacity updates',
      'Priority support',
      'Exclusive events access'
    ],
    icon: Crown,
    popular: true
  },
  {
    id: 'lite',
    name: 'Lite',
    price: 19,
    period: 'month',
    features: [
      'View wait times',
      'Basic venue info',
      'Email support'
    ],
    icon: Zap,
    popular: false
  }
];

export function Paywall() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] text-transparent bg-clip-text">
          Choose Your VIP Access
        </h2>
        <p className="text-white/70">
          Skip the lines, get exclusive access, and never miss out
        </p>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="pt-4">
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#9D5CFF] mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-white">
                Risk-free guarantee
              </p>
              <p className="text-sm text-white/70">
                Try FOMO VIP risk-free. Cancel anytime during your first 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}