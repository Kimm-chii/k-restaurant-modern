import React from 'react';
import { X, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { restaurantContent } from '../data/restaurantContent';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose }) => {
  const { general, priceDisclaimer } = restaurantContent;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero Image */}
            <div className="relative h-64 sm:h-80 w-full shrink-0 bg-zinc-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-sm font-serif text-amber-400 font-semibold uppercase tracking-widest">
                  {item.japaneseName}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                  {item.name}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Price & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-amber-400">
                    {general.currencySymbol}{item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500 font-light">
                    (Base Price)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {item.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                  {item.spicyLevel && item.spicyLevel > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-950 text-rose-300 border border-rose-800/50">
                      🌶️ Spicy Level {item.spicyLevel}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Description
                </h4>
                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Ingredients Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Key Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, iIdx) => (
                    <span
                      key={iIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Calories & Allergens */}
              {(item.calories || item.allergens) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs">
                  {item.calories && (
                    <div>
                      <span className="text-zinc-500 font-medium">Estimated Energy:</span>{' '}
                      <span className="text-zinc-200 font-semibold">{item.calories} kcal</span>
                    </div>
                  )}
                  {item.allergens && (
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Allergens: {item.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Close & Disclaimer */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-zinc-500 font-light text-center sm:text-left">
                  * {priceDisclaimer.body}
                </p>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-sm transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
