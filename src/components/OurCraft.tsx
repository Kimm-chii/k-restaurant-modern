import React from 'react';
import { Flame, UtensilsCrossed, Sparkles, Wine, Quote, CheckCircle2 } from 'lucide-react';
import { restaurantContent } from '../data/restaurantContent';
import chefCraftImg from '../assets/images/craft_broth_chef_1785357104884.jpg';

export const OurCraft: React.FC = () => {
  const { story } = restaurantContent;

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Wine':
        return <Wine className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="craft" className="py-14 sm:py-16 bg-zinc-950 relative overflow-hidden scroll-mt-14">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Our Heritage & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            {story.title} {story.japaneseTitle && <span className="text-amber-400 font-serif font-medium text-2xl sm:text-3xl ml-2">({story.japaneseTitle})</span>}
          </h2>
          {story.subtitle && (
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
              {story.subtitle}
            </p>
          )}
        </div>

        {/* Story & Chef Image Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Chef Craft Image */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src={chefCraftImg}
                alt="Master Chef Kenji Takahashi crafting ramen broth"
                className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-amber-500/20">
                <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">Chef's Sacred Commitment</p>
                <p className="text-sm text-zinc-200 font-semibold mt-1">20 Hours • Zero Additives • 100% Organic Wheat</p>
              </div>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-zinc-300 leading-relaxed text-base sm:text-lg font-light">
              {story.p1 && <p>{story.p1}</p>}
              {story.p2 && <p>{story.p2}</p>}
              {story.p3 && <p>{story.p3}</p>}
            </div>

            {/* Chef Quote Card */}
            {story.chefQuote && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 relative mt-6">
                <Quote className="w-8 h-8 text-amber-500/30 absolute top-4 left-4" />
                <blockquote className="pl-6 italic text-amber-200 text-sm sm:text-base font-medium leading-relaxed relative z-10">
                  "{story.chefQuote}"
                </blockquote>
                <div className="mt-3 pl-6 text-xs text-amber-400/80 font-bold tracking-wider uppercase">
                  — {story.chefTitle}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Craft Pillars Grid */}
        {story.pillars && story.pillars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {story.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                    {pillar.japaneseTitle}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-zinc-300/80 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Crafted Daily</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
