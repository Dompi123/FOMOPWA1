import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PassCard } from './PassCard';
import { type Venue } from '../../types/venue';

interface PassCarouselProps {
  venue: Venue;
  selectedTickets: {
    lineskip: number;
    drink: number;
  };
  onTicketChange: (tickets: { lineskip: number; drink: number }) => void;
}

export function PassCarousel({ venue, selectedTickets, onTicketChange }: PassCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const passes = [
    {
      type: 'lineskip' as const,
      title: 'LineSkip Pass',
      price: venue.skipPrice,
      description: 'Skip the line + includes cover charge',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      bgColor: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80'
    },
    {
      type: 'drink' as const,
      title: 'Happy Thursday Drink',
      price: Math.floor(venue.skipPrice * 0.6),
      description: 'Includes one complimentary drink',
      expires: new Date(Date.now() + 24*60*60*1000).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      bgColor: 'bg-pink-500',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80'
    }
  ];

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex >= 0 && newIndex < passes.length) {
        setCurrentIndex(newIndex);
        const card = scrollRef.current.children[newIndex] as HTMLElement;
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const handleQuantityChange = (type: 'lineskip' | 'drink', delta: number) => {
    const current = selectedTickets[type];
    const newQuantity = Math.max(0, Math.min(10, current + delta));
    onTicketChange({
      ...selectedTickets,
      [type]: newQuantity
    });
  };

  return (
    <div className="relative" role="region" aria-label="Pass selection carousel">
      {/* Navigation Arrows */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
            aria-label="Previous pass"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
            aria-label="Next pass"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Passes Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4"
        onScroll={checkScrollButtons}
      >
        {passes.map((pass) => (
          <motion.div
            key={pass.type}
            className="flex-shrink-0 w-full snap-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <PassCard
              {...pass}
              quantity={selectedTickets[pass.type]}
              onQuantityChange={handleQuantityChange}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4" role="tablist">
        {passes.map((pass, index) => (
          <motion.button
            key={pass.type}
            onClick={() => {
              setCurrentIndex(index);
              scrollRef.current?.children[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
              });
            }}
            initial={{ scale: 0.8 }}
            animate={{
              scale: currentIndex === index ? 1 : 0.8,
              backgroundColor: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.2)'
            }}
            className="h-1.5 w-1.5 rounded-full"
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Select ${pass.title}`}
          />
        ))}
      </div>
    </div>
  );
}