export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  category: 'signature-ramen' | 'tsukemen' | 'izakaya' | 'toppings' | 'beverages' | 'desserts';
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  spicyLevel?: number; // 0 = not spicy, 3 = very spicy
  badges?: ('Chef Special' | 'Popular' | 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'New')[];
  calories?: number;
  allergens?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  japaneseName: string;
  description: string;
  iconName: string;
}

export interface CraftPillar {
  title: string;
  japaneseTitle: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  source: string;
  rating: number;
  comment: string;
  date: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface SocialLinks {
  googleReviews: string;
  facebook: string;
  instagram: string;
  tripadvisor: string;
  linktree: string;
  yelp: string;
  website: string;
}

export interface RestaurantContent {
  general: {
    name: string;
    japaneseName: string;
    tagline: string;
    subtagline: string;
    phone: string;
    email: string;
    address: {
      street: string;
      cityStateZip: string;
      fullAddress: string;
      neighborhood: string;
      mapQuery: string;
    };
    socials: SocialLinks;
    currencySymbol: string;
  };
  priceDisclaimer: {
    title: string;
    body: string;
    subtext: string;
  };
  hero: {
    badgeText: string;
    headline: string;
    headlineAccent: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    statusOpenText: string;
    statusClosedText: string;
    stats: { label: string; value: string; detail: string }[];
  };
  story: {
    title: string;
    japaneseTitle: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    chefQuote: string;
    chefTitle: string;
    pillars: CraftPillar[];
  };
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  operatingHours: BusinessHours[];
  parkingAndTransitInfo: {
    parking: string;
    transit: string;
  };
  reviews: Review[];
  faqs: FAQItem[];
}
