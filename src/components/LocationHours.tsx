import React, { useMemo } from 'react';
import { MapPin, Clock, ExternalLink, Phone, Globe2 } from 'lucide-react';
import { restaurantContent } from '../data/restaurantContent';
import { getEstablishmentStatus } from '../utils/schedule';

// Custom SVG Brand Icons for real social platforms
const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-pink-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TripAdvisorIcon = () => (
  <svg className="w-5 h-5 text-[#00AA6C] shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.5 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm9 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-4.5-5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
  </svg>
);

const YelpIcon = () => (
  <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.171 12l2.35 6.843c.123.361-.25.688-.571.503l-5.632-3.238 3.853-4.108zm-1.89-1.579L3.486 8.358c-.372-.158-.33-.701.063-.799l6.386-1.597.346 4.459zm1.314-1.353l1.107-6.425c.065-.378.536-.505.782-.211l4.137 4.939-6.026 1.697zm2.463 2.118l6.239 1.838c.371.109.431.605.093.803l-5.59 3.265-.742-5.906zm-4.819 1.258l-5.845 2.871c-.347.17-.681-.197-.512-.533l3.085-6.143 3.272 3.805z"/>
  </svg>
);

export const LocationHours: React.FC = () => {
  const { general, operatingHours } = restaurantContent;
  const { socials } = general;

  // Calculate real live opening status based on Philippines Timezone (PHT - Asia/Manila)
  const currentStatus = useMemo(() => {
    return getEstablishmentStatus();
  }, [operatingHours]);

  const socialCards = [
    {
      name: "Google Reviews",
      subtitle: "4.9 ★ Rating",
      url: socials.googleReviews,
      Icon: GoogleIcon,
      accentBorder: "hover:border-blue-500/50 hover:bg-blue-500/10",
      badgeText: "Review Us",
    },
    {
      name: "Instagram",
      subtitle: "@sora.culinary",
      url: socials.instagram,
      Icon: InstagramIcon,
      accentBorder: "hover:border-pink-500/50 hover:bg-pink-500/10",
      badgeText: "Follow",
    },
    {
      name: "Facebook",
      subtitle: "Official Page",
      url: socials.facebook,
      Icon: FacebookIcon,
      accentBorder: "hover:border-blue-600/50 hover:bg-blue-600/10",
      badgeText: "Community",
    },
    {
      name: "TripAdvisor",
      subtitle: "Top Rated Diner",
      url: socials.tripadvisor,
      Icon: TripAdvisorIcon,
      accentBorder: "hover:border-emerald-500/50 hover:bg-emerald-500/10",
      badgeText: "Ratings",
    },
    {
      name: "Yelp",
      subtitle: "Diner Reviews",
      url: socials.yelp,
      Icon: YelpIcon,
      accentBorder: "hover:border-red-500/50 hover:bg-red-500/10",
      badgeText: "Feedback",
    },
  ];

  return (
    <section id="visit" className="py-12 sm:py-16 bg-zinc-950 relative border-t border-zinc-900 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Hours & Location
          </h2>
          <p className="mt-3 text-zinc-400 font-light text-sm sm:text-lg">
            Check our daily schedule, find our address, and connect with us online.
          </p>
        </div>

        {/* Location & Schedule Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-12">
          {/* Operating Hours & Contact */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <div className="glass-card rounded-3xl p-5 sm:p-7 border border-zinc-800 space-y-5 flex-grow w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-100">
                      Operating Schedule
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium mt-1">
                    <Globe2 className="w-3 h-3 text-amber-400/80 shrink-0" />
                    <span>JST Time (Asia/Tokyo): {currentStatus.jstTimeString}</span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full border max-w-full ${
                  currentStatus.isOpen
                    ? 'bg-emerald-950/90 text-emerald-400 border-emerald-800/60'
                    : 'bg-amber-950/80 text-amber-400 border-amber-800/60'
                }`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${currentStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                  <span className="truncate">{currentStatus.statusText}</span>
                </span>
              </div>

              <div className="space-y-2">
                {operatingHours.map((schedule, idx) => {
                  const isToday = schedule.day === currentStatus.dayName;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm transition-colors ${
                        isToday
                          ? 'bg-amber-500/15 border border-amber-500/30 font-semibold text-amber-300'
                          : 'text-zinc-300 hover:bg-zinc-900/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="truncate">{schedule.day}</span>
                        {isToday && <span className="text-[9px] bg-amber-500 text-zinc-950 font-bold px-1.5 py-0.5 rounded shrink-0">TODAY</span>}
                      </span>
                      <span className="font-mono text-xs sm:text-sm shrink-0 ml-2">{schedule.open} – {schedule.close}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Phone Card */}
            <div className="glass-card rounded-3xl p-5 sm:p-7 border border-zinc-800 space-y-4 w-full">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">Address</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                    {general.address.fullAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 pt-3.5 border-t border-zinc-800/80">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">Phone Number</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                    {general.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="lg:col-span-7 w-full h-full min-h-[300px] sm:min-h-[420px]">
            <div className="glass-card rounded-3xl overflow-hidden border border-zinc-800 relative h-full group w-full p-1.5 sm:p-2 bg-zinc-900/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.23949906467!2d135.43014458316277!3d34.67751801269588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e6553406e2e1%3A0xc55bc16ee46a2fe7!2sOsaka%2C%20Japan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem', filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[280px] sm:min-h-[400px] object-cover transition-all duration-700 group-hover:filter-none"
              ></iframe>

              {/* External Google Maps Button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(general.address.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3.5 py-2 rounded-xl bg-zinc-950/90 hover:bg-amber-500 hover:text-zinc-950 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Connect With Us - Compact Cards Section */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-zinc-100">Connect With Us</h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">Follow our social channels and leave a review for Sora.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {socialCards.map((card, idx) => {
              const { Icon } = card;
              return (
                <a
                  key={idx}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 transition-all flex items-center gap-3 group cursor-pointer ${card.accentBorder}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                        {card.name}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-light">
                      {card.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
