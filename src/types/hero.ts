// types/hero.ts

export interface HeroSectionAPI {
  id: number;
  badge_text: string;
  heading: string;
  sub_heading: string;
  typed_words: string;     // JSON string array
  cta: string;             // JSON string object
  stats: string;           // JSON string array
  features: string;        // JSON string array
  hero_image: string;
}

export interface CTA {
  primary?: { text: string; link: string };
  secondary?: { text: string; link: string };
}

export interface Stat {
  value: string;
  label: string;
  icon: string;            // key for iconMap
}

export interface Feature {
  title: string;
  description: string;
}