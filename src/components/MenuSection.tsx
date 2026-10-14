import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Sparkles, Eye, AlertCircle, Info, Compass, UtensilsCrossed, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { restaurantContent } from '../data/restaurantContent';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const { menuCategories, menuItems, priceDisclaimer, general } = restaurantContent;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [isMenuInView, setIsMenuInView] = useState<boolean>(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMenuInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const floatingCategories = [
    { id: 'all', shortName: 'All' },
    ...menuCategories.map((cat) => {
      let shortName = cat.name;
      if (cat.id === 'ramen') shortName = 'Ramen';
      if (cat.id === 'tsukemen') shortName = 'Tsukemen';
      if (cat.id === 'izakaya') shortName = 'Izakaya';
      if (cat.id === 'toppings') shortName = 'Toppings';
      if (cat.id === 'beverages') shortName = 'Drinks';
      if (cat.id === 'desserts') shortName = 'Sweets';
      return { id: cat.id, shortName };
    }),
  ];

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setMobileCategoryOpen(false);
    // Smooth scroll slightly up to menu grid if scrolled far down
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < -200) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const dietaryOptions = [
    { id: 'all', label: 'All Items' },
    { id: 'chef', label: "Chef's Special" },
    { id: 'popular', label: 'Popular' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'spicy', label: 'Spicy 🌶️' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (selectedDietary === 'chef' && !item.badges?.includes("Chef Special")) return false;
      if (selectedDietary === 'popular' && !item.badges?.includes("Popular")) return false;
      if (selectedDietary === 'vegetarian' && !item.badges?.includes("Vegetarian") && !item.badges?.includes("Vegan")) return false;
      if (selectedDietary === 'vegan' && !item.badges?.includes("Vegan")) return false;
      if (selectedDietary === 'spicy' && (!item.spicyLevel || item.spicyLevel <= 0)) return false;

      return true;
    });
  }, [menuItems, activeCategory, selectedDietary]);

  const renderSpiceIndicator = (level?: number) => {
    if (!level || level === 0) return null;
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-rose-400 font-semibold bg-rose-950/80 border border-rose-800/60 px-2 py-0.5 rounded-full" title={`Spice Level ${level}`}>
        {'🌶️'.repeat(level)}
      </span>
    );
  };

  return (
    <section id="menu" ref={sectionRef} className="py-14 sm:py-16 bg-zinc-950 relative scroll-mt-14">
      {/* Small Floating Category Capsule Bar on Bottom-Right */}
      <AnimatePresence>
        {isMenuInView && (
          <motion.aside
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-5 right-3 sm:right-6 z-40"
            aria-label="Floating menu category navigation"
          >
            {/* Desktop View: Horizontal Glass Capsule */}
            <div className="hidden sm:flex bg-zinc-950/85 backdrop-blur-2xl border border-zinc-800/90 shadow-2xl shadow-black/90 rounded-full p-1.5 items-center gap-1.5">
              <div className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 text-amber-400 font-bold text-xs uppercase tracking-wider shrink-0 border-r border-zinc-800/80">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                <span>Categories</span>
              </div>

              <div className="flex items-center gap-1">
                {floatingCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`relative px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0 ${
                        isActive
                          ? 'text-amber-300 font-bold'
                          : 'text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFloatingCategoryDesktop"
                          className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/35 shadow-sm shadow-amber-500/10"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{cat.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile View: Compact Expandable Glassmorphic Capsule */}
            <div className="sm:hidden flex flex-col items-end">
              <AnimatePresence>
                {mobileCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mb-2 p-2 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/90 shadow-2xl shadow-black/90 rounded-2xl w-48 flex flex-col gap-1 max-h-[calc(var(--sh,1vh)*55)] overflow-y-auto custom-scrollbar"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-wider text-amber-400 border-b border-zinc-800/80 mb-1 flex items-center justify-between">
                      <span>Jump to Category</span>
                      <UtensilsCrossed className="w-3 h-3 text-amber-400/80" />
                    </div>
                    {floatingCategories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                              : 'text-zinc-300 hover:bg-zinc-900 hover:text-amber-300'
                          }`}
                        >
                          <span>{cat.shortName}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Trigger Capsule Button */}
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-amber-500/35 text-amber-400 shadow-2xl shadow-black/90 font-bold text-xs uppercase tracking-wider hover:border-amber-400 active:scale-95 transition-all cursor-pointer"
                aria-expanded={mobileCategoryOpen}
                aria-label="Toggle menu categories"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                <span>Categories</span>
                <ChevronUp
                  className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-200 ${
                    mobileCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Creations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Our Menu
          </h2>
          <p className="mt-3 text-zinc-400 font-light text-base sm:text-lg">
            Explore our artisanal ramen bowls, izakaya appetizers, and Japanese beverages.
          </p>
        </div>

        {/* Pricing & Seasonal Disclaimer Alert Box */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900/90 to-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-300">
                {priceDisclaimer.title}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300/90 font-light mt-0.5">
                {priceDisclaimer.body} {priceDisclaimer.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-4 mb-10">
          {/* Main Category Tabs - Compact & Wraps smoothly without cropping */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-300 hover:bg-zinc-850'
              }`}
            >
              All Dishes
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-300 hover:bg-zinc-850'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({cat.japaneseName})</span>
              </button>
            ))}
          </div>

          {/* Secondary Dietary Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-2 pt-1">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mr-1 shrink-0">
              Filter:
            </span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDietary(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedDietary === opt.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-800 max-w-md mx-auto">
            <Info className="w-10 h-10 text-amber-500/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-200">No dishes found</h3>
            <p className="text-sm text-zinc-400 font-light mt-1 px-6">
              Try adjusting your category or dietary filters to explore our full menu.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer border border-zinc-800/80"
              >
                {/* Dish Photo & Floating Badges */}
                <div>
                  <div className="relative h-52 overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex flex-wrap gap-1.5">
                        {item.badges?.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md shadow-md ${
                              badge === 'Chef Special'
                                ? 'bg-amber-500 text-zinc-950'
                                : badge === 'Popular'
                                ? 'bg-zinc-900/90 text-amber-400 border border-amber-500/30'
                                : 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/50'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {renderSpiceIndicator(item.spicyLevel)}
                    </div>

                    {/* Quick View Hover Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/40 backdrop-blur-[2px]">
                      <span className="px-4 py-2 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-xl">
                        <Eye className="w-4 h-4" /> View Ingredients & Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-xs text-amber-400/90 font-serif font-medium">
                          {item.japaneseName}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-lg font-extrabold text-amber-400 shrink-0">
                        {general.currencySymbol}
                        {item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Ingredients tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.ingredients.slice(0, 4).map((ing, iIdx) => (
                        <span
                          key={iIdx}
                          className="text-[10px] bg-zinc-900/80 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 4 && (
                        <span className="text-[10px] text-amber-400/80 px-1 py-0.5 font-medium">
                          +{item.ingredients.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-zinc-800/50 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-500 italic">
                    Prices & availability subject to change
                  </span>

                  <button
                    onClick={() => onSelectItem(item)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
