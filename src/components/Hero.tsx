import React, { useMemo } from 'react';
import { Utensils, Globe, ChevronDown } from 'lucide-react';
import { restaurantContent } from '../data/restaurantContent';
import { getEstablishmentStatus } from '../utils/schedule';
import heroRamenImg from '../assets/images/hero_ramen_bg_1785357057470.jpg';

interface HeroProps {
  onExploreMenu: () => void;
  onConnectLinks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onConnectLinks }) => {
  const { hero } = restaurantContent;
  const status = useMemo(() => getEstablishmentStatus(), []);

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden scroll-mt-14">
      {/* Background Image with Dark Gradient & Lantern Glow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroRamenImg}
          alt="Steaming bowl of artisan ramen"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105 transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium shadow-xl backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom duration-500">
          <span className={`w-2 h-2 rounded-full shrink-0 ${status.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span className={`w-2 h-2 rounded-full -ml-4 shrink-0 ${status.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="text-zinc-200">{status.statusText} ({status.timezoneLabel})</span>
        </div>

        {/* Headlines */}
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-400/90 font-semibold">
            {hero.badgeText}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-100 tracking-tight leading-[1.1]">
            {hero.headline}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              {hero.headlineAccent}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300/90 max-w-2xl mx-auto leading-relaxed font-light pt-2">
            {hero.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Utensils className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{hero.primaryCtaText}</span>
          </button>

          <button
            onClick={onConnectLinks}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-base border border-amber-500/30 hover:border-amber-400/60 shadow-xl backdrop-blur-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Globe className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Visit Us</span>
          </button>
        </div>

        {/* Hero Highlights Stats Bar */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 text-center border border-zinc-800/80 hover:border-amber-500/30 transition-colors"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                {stat.label}
              </div>
              {stat.detail && (
                <div className="text-[11px] text-zinc-400 mt-0.5 font-light">
                  {stat.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onExploreMenu}
            className="text-zinc-500 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 group cursor-pointer"
            aria-label="Scroll to menu"
          >
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">Discover Menu</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-amber-400/80" />
          </button>
        </div>
      </div>
    </section>
  );
};
