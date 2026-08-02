import React, { useState, useEffect, useMemo } from 'react';
import { Phone, MapPin, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { restaurantContent } from '../data/restaurantContent';
import { getEstablishmentStatus } from '../utils/schedule';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const status = useMemo(() => getEstablishmentStatus(), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Menu' },
    { id: 'craft', label: 'Story' },
    { id: 'visit', label: 'Visit' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto ${
          scrolled
            ? 'bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-xl shadow-2xl shadow-black/80 py-2 sm:py-2.5 px-4 sm:px-6'
            : 'bg-zinc-950/60 border border-zinc-800/60 backdrop-blur-md shadow-xl py-2.5 sm:py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none cursor-pointer z-10 shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-amber-400 font-serif font-extrabold text-lg sm:text-xl border border-amber-500/30">
                空
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {restaurantContent.general.name}
                </span>
                <span className="text-xs font-serif text-amber-400/80 font-medium sm:hidden">
                  (空)
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-400/90 font-medium leading-tight">
                {restaurantContent.general.tagline}
              </p>
            </div>
          </button>

          {/* Centered Capsule Navigation (Mathematically Centered) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 border border-zinc-800/80 backdrop-blur-md shadow-inner absolute left-1/2 -translate-x-1/2 z-20">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'text-amber-300'
                      : 'text-zinc-300 hover:text-amber-300 hover:bg-zinc-800/50'
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-amber-500/15 border border-amber-500/30 shadow-sm shadow-amber-500/10"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Action Controls (Aligned Right on Tablet & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 z-10 ml-auto shrink-0">
            {/* CTA View Menu Button (sm & up) */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all group cursor-pointer border border-amber-300/40 shrink-0"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>View Menu</span>
            </button>

            {/* Status indicator badge (hidden on tiny mobile, shown on xs and up) */}
            <span className={`hidden xs:inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
              status.isOpen
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'
                : 'bg-amber-950/80 text-amber-400 border-amber-800/50'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{status.isOpen ? 'OPEN (JST)' : 'CLOSED (JST)'}</span>
            </span>

            {/* Hamburger Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-1.5 text-zinc-200 hover:text-amber-400 transition-colors cursor-pointer focus:outline-none shadow-md shrink-0"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-current rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 h-0.5 bg-current rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 bg-current rounded-full block"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden pointer-events-auto max-w-6xl mx-auto mt-2 p-5 rounded-3xl bg-zinc-950/95 border border-zinc-800/90 backdrop-blur-2xl shadow-2xl space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-left font-bold text-sm transition-all cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-zinc-200 hover:bg-zinc-900 hover:text-amber-300'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}

              <div className="pt-3 mt-1 border-t border-zinc-800/80 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('menu')}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 uppercase tracking-wider text-xs cursor-pointer"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>View Menu</span>
                </button>

                <div className="flex items-center justify-around text-xs text-zinc-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{restaurantContent.general.phone}</span>
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{restaurantContent.general.address.neighborhood}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
