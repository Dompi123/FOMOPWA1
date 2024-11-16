import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { VenueList } from './components/VenueList';
import { type Venue } from './types/venue';

const venues: Venue[] = [
  {
    id: '1',
    name: "Neon Lounge",
    description: "Premium nightclub experience",
    status: "peak",
    waitTime: 45,
    capacity: 95,
    skipPrice: 40,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80"
  },
  {
    id: '2',
    name: "Sky Bar",
    description: "Rooftop cocktails & views",
    status: "busy",
    waitTime: 30,
    capacity: 75,
    skipPrice: 35,
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80"
  },
  {
    id: '3',
    name: "The Underground",
    description: "Live music & craft drinks",
    status: "live",
    waitTime: 20,
    capacity: 60,
    skipPrice: 25,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
  }
];

export default function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A] text-white"
    >
      <Header />
      
      <main className="p-6 max-w-2xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D5CFF] to-[#FF3B7F] mb-8"
        >
          Tonight's Hotspots
        </motion.h2>
        
        <VenueList venues={venues} />
      </main>
    </motion.div>
  );
}