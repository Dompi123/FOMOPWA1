import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { type Venue } from '../../types/venue';

interface TicketOption {
  type: 'lineskip' | 'drink';
  title: string;
  price: number;
  description: string;
  expires: string;
  bgColor: string;
  image: string;
}

interface TicketSelectorProps {
  venue: Venue;
  selectedTickets: {
    lineskip: number;
    drink: number;
  };
  onTicketChange: (tickets: { lineskip: number; drink: number }) => void;
}

export function TicketSelector({ venue, selectedTickets, onTicketChange }: TicketSelectorProps) {
  const tickets: TicketOption[] = [
    {
      type: 'lineskip',
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
      type: 'drink',
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

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
      if (newIndex >= 0 && newIndex < tickets.length) {
        setCurrentIndex(newIndex);
        const card = scrollRef.current.children[newIndex] as HTMLElement;
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const updateQuantity = (type: 'lineskip' | 'drink', delta: number) => {
    const current = selectedTickets[type];
    const newQuantity = Math.max(0, Math.min(10, current + delta));
    onTicketChange({
      ...selectedTickets,
      [type]: newQuantity
    });
  };

  return (
    <div className="relative" role="region" aria-label="Ticket selection">
      {/* Navigation Arrows */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-colors"
            aria-label="Previous ticket"
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
            aria-label="Next ticket"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tickets Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4"
        onScroll={checkScrollButtons}
      >
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.type}
            className="flex-shrink-0 w-full snap-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={`
              relative rounded-3xl overflow-hidden
              ${ticket.bgColor} backdrop-blur-xl
              transition-all duration-300
              ${selectedTickets[ticket.type] > 0 ? 'ring-2 ring-white shadow-lg' : 'opacity-80'}
            `}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={ticket.image}
                  alt=""
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{ticket.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{ticket.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white/60">Price</p>
                    <p className="text-2xl font-bold text-white">${ticket.price}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(ticket.type, -1)}
                      disabled={selectedTickets[ticket.type] === 0}
                      className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
                      aria-label={`Decrease ${ticket.title} quantity`}
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </motion.button>

                    <span className="w-8 text-center text-white font-medium">
                      {selectedTickets[ticket.type]}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(ticket.type, 1)}
                      disabled={selectedTickets[ticket.type] === 10}
                      className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
                      aria-label={`Increase ${ticket.title} quantity`}
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>

                <div className="text-sm text-white/60">
                  Expires {ticket.expires}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4" role="tablist">
        {tickets.map((ticket, index) => (
          <motion.button
            key={ticket.type}
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
            aria-label={`Select ${ticket.title}`}
          />
        ))}
      </div>
    </div>
  );
}