import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OurCraft } from './components/OurCraft';
import { MenuSection } from './components/MenuSection';
import { MenuItemModal } from './components/MenuItemModal';
import { LocationHours } from './components/LocationHours';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { Footer } from './components/Footer';
import { MenuItem } from './types';
import { restaurantContent } from './data/restaurantContent';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);

  // Scroll spy to update active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'craft', 'menu', 'visit', 'reviews'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Offset calculation accounting for floating header height cleanly without dead space
      const headerOffset = 52;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Main Header */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleNavigate('menu')}
          onConnectLinks={() => handleNavigate('visit')}
        />

        {/* Story & Philosophy Section */}
        <OurCraft />

        {/* Full Menu Browser Section */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
        />

        {/* Location & Hours Schedule */}
        <LocationHours />

        {/* Reviews & FAQ Section */}
        <TestimonialsFAQ />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Item Details Info Modal */}
      <MenuItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
      />

      {/* Disclaimer Full Info Modal */}
      {isDisclaimerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setIsDisclaimerModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
              <Sparkles className="w-5 h-5" />
              <h3>{restaurantContent.priceDisclaimer.title}</h3>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {restaurantContent.priceDisclaimer.body}
            </p>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              {restaurantContent.priceDisclaimer.subtext}
            </p>
            <button
              onClick={() => setIsDisclaimerModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
