import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaywallHeader } from './PaywallHeader';
import { SubscriptionPlan } from './SubscriptionPlan';
import { SocialProof } from './SocialProof';
import { CheckoutScreen } from '../checkout/CheckoutScreen';
import { type Plan } from './types';
import { type Venue } from '../../types/venue';
import { containerAnimation } from './animations';

interface PaywallScreenProps {
  venue: Venue;
  onClose: () => void;
}

const getPlans = (venue: Venue): Plan[] => [
  {
    name: "LineSkip Basic",
    price: venue.skipPrice,
    period: "pass",
    badge: "Most Popular",
    popular: true,
    features: [
      { text: `Skip the line at ${venue.name}`, included: true },
      { text: "Priority entry on off-peak hours", included: true },
      { text: "Basic venue notifications", included: true },
      { text: "VIP access & table service", included: false },
      { text: "Special event priority", included: false }
    ]
  },
  {
    name: "LineSkip Pro",
    price: venue.skipPrice * 1.5,
    period: "pass",
    badge: "Best Value",
    features: [
      { text: `Skip the line at ${venue.name}`, included: true },
      { text: "Priority entry 24/7", included: true },
      { text: "Real-time venue alerts", included: true },
      { text: "VIP access & table service", included: true },
      { text: "Special event priority", included: true }
    ]
  }
];

export function PaywallScreen({ venue, onClose }: PaywallScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const plans = getPlans(venue);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleBack = () => {
    if (showCheckout) {
      setShowCheckout(false);
      setSelectedPlan(null);
    } else {
      onClose();
    }
  };

  if (showCheckout && selectedPlan) {
    return (
      <CheckoutScreen 
        plan={selectedPlan} 
        venue={venue}
        onBack={handleBack} 
      />
    );
  }

  return (
    <motion.div 
      className="p-6 space-y-8 max-w-lg mx-auto"
      initial="initial"
      animate="animate"
      variants={containerAnimation}
    >
      <PaywallHeader venue={venue} />

      <div className="grid gap-6">
        {plans.map((plan) => (
          <SubscriptionPlan
            key={plan.name}
            plan={plan}
            onSelect={() => handlePlanSelect(plan)}
          />
        ))}
      </div>

      <SocialProof />
    </motion.div>
  );
}