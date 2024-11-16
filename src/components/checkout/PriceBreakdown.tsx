import React from 'react';
import { Info } from 'lucide-react';
import { type Venue } from '../../types/venue';

interface PriceBreakdownProps {
  selectedTickets: {
    lineskip: number;
    drink: number;
  };
  venue: Venue;
  promoCode?: string;
}

export function PriceBreakdown({ selectedTickets, venue, promoCode }: PriceBreakdownProps) {
  const lineskipSubtotal = selectedTickets.lineskip * venue.skipPrice;
  const drinkSubtotal = selectedTickets.drink * Math.floor(venue.skipPrice * 0.6);
  const subtotal = lineskipSubtotal + drinkSubtotal;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const discount = promoCode ? subtotal * 0.1 : 0; // 10% discount if promo code
  const total = subtotal + serviceFee - discount;

  return (
    <div className="space-y-4 rounded-xl bg-white/5 p-4">
      {selectedTickets.lineskip > 0 && (
        <div className="flex justify-between text-white/70">
          <span>LineSkip Pass ({selectedTickets.lineskip}x)</span>
          <span>${lineskipSubtotal.toFixed(2)}</span>
        </div>
      )}
      
      {selectedTickets.drink > 0 && (
        <div className="flex justify-between text-white/70">
          <span>Happy Thursday Drink ({selectedTickets.drink}x)</span>
          <span>${drinkSubtotal.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between items-center text-white/70">
        <div className="flex items-center gap-2">
          <span>Service Fee</span>
          <Info className="h-4 w-4 text-white/40" />
        </div>
        <span>${serviceFee.toFixed(2)}</span>
      </div>

      {promoCode && discount > 0 && (
        <div className="flex justify-between text-[#FF3B7F]">
          <span>Promo discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}

      <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-semibold text-white">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="text-sm text-white/40 text-center">
        Price last updated {new Date().toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}
      </div>
    </div>
  );
}