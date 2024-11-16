import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import { DrinkGrid } from './DrinkGrid';
import { DrinkQuickOrder } from './DrinkQuickOrder';
import { CategoryTabs } from './CategoryTabs';
import { type Drink, type Category } from './types';

interface DrinkMenuProps {
  onClose: () => void;
}

const categories: Category[] = [
  { id: 'popular', name: 'Popular', icon: '🔥' },
  { id: 'cocktails', name: 'Cocktails', icon: '🍸' },
  { id: 'wine', name: 'Wine', icon: '🍷' },
  { id: 'beer', name: 'Beer', icon: '🍺' },
  { id: 'shots', name: 'Shots', icon: '🥃' }
];

const drinks: Drink[] = [
  {
    id: '1',
    name: 'Neon Nights',
    description: 'Vodka, blue curaçao, lemon, prosecco',
    price: 16,
    category: 'cocktails',
    image: 'https://images.unsplash.com/photo-1578664182354-e3878186e52f?auto=format&fit=crop&q=80',
    popular: true,
    popularity: 85
  },
  {
    id: '2',
    name: 'Sunset Boulevard',
    description: 'Tequila, blood orange, lime, agave',
    price: 15,
    category: 'cocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
    popularity: 72
  },
  {
    id: '3',
    name: 'Velvet Reserve',
    description: 'Cabernet Sauvignon, California 2019',
    price: 14,
    category: 'wine',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80',
    popularity: 68
  }
];

export function DrinkMenu({ onClose }: DrinkMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category['id']>('popular');
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrinks = drinks
    .filter(drink => {
      const matchesSearch = drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drink.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'popular' ? drink.popular : drink.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      {/* Header with Search */}
      <header className="sticky top-0 z-10 bg-black border-b border-white/10">
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1A1A1A]"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your vibe..."
                className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#9D5CFF] transition-colors"
              />
            </div>
          </div>

          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </header>

      {/* Drink Grid */}
      <main className="flex-1 overflow-y-auto">
        <DrinkGrid
          drinks={filteredDrinks}
          onDrinkSelect={setSelectedDrink}
        />
      </main>

      {/* Quick Order Modal */}
      <AnimatePresence>
        {selectedDrink && (
          <DrinkQuickOrder
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}