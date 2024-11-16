import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Minus } from 'lucide-react';

interface PassCardProps {
  type: 'lineskip' | 'drink';
  title: string;
  price: number;
  description: string;
  expires: string;
  bgColor: string;
  image: string;
  quantity: number;
  onQuantityChange: (type: 'lineskip' | 'drink', delta: number) => void;
}

export function PassCard({
  type,
  title,
  price,
  description,
  expires,
  bgColor,
  image,
  quantity,
  onQuantityChange
}: PassCardProps) {
  const handleQuantityChange = (delta: number) => {
    onQuantityChange(type, delta);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative rounded-3xl overflow-hidden min-h-[240px]
        ${bgColor} backdrop-blur-xl
        transition-all duration-300
        ${quantity > 0 ? 'ring-2 ring-white shadow-lg' : 'opacity-80'}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/90">FOMO</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-white/80 text-sm mt-1">{description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/60">Price</p>
              <p className="text-2xl font-bold text-white">${price}</p>
            </div>

            <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 0}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-white" />
              </motion.button>

              <span className="w-8 text-center text-white font-medium">
                {quantity}
              </span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(1)}
                disabled={quantity === 10}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expires {expires}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}