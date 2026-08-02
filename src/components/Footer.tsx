import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Globe, ExternalLink, Star } from 'lucide-react';
import { restaurantContent } from '../data/restaurantContent';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { general, priceDisclaimer } = restaurantContent;
  const { socials } = general;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 relative">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-amber-400 font-serif font-extrabold text-xl border border-amber-500/30">
                  空
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold tracking-tight text-zinc-100">
                    {general.name}
                  </span>
                  <span className="text-xs font-serif text-amber-400 font-medium">
                    ({general.japaneseName})
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-amber-400/90 font-semibold -mt-0.5">
                  {general.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              {general.subtagline}
            </p>

            {/* Price disclaimer reminder */}
            <p className="text-[11px] text-zinc-500 font-light italic border-l-2 border-amber-500/30 pl-3">
              "{priceDisclaimer.body}"
            </p>
          </div>

          {/* Quick Nav Links Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Site Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Our Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craft')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  The Craft & Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Visit Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Reviews & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* External Portals & Socials */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              External Pages
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href={socials.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Google Business Page</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook Page</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={socials.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TripAdvisor Guide</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href={socials.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  <span>Linktree Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Contact Placeholder
            </h4>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{general.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{general.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{general.address.fullAddress}</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <p>© {new Date().getFullYear()} {general.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
