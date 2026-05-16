// types/software.ts

export interface Software {
  slug: string;
  name: string;
  heroImage: string;
  hero: {
    title: string;
    description: string;
    buttons: { text: string; link: string }[];
    statistics: { value: string; label: string }[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  problem: { title: string; description: string };
  whatWeBuild: {
    title: string;
    description: string;
    components: { title: string; description: string }[];
  };
  keyFeatures: {
    title: string;
    subtitle: string;
    features: { category: string; items: string[] }[];
  };
  techStack: {
    title: string;
    description: string;
    categories: { name: string; technologies: string[] }[];
  };
  whyChooseUs: {
    title: string;
    reasons: { title: string; description: string }[];
  };
  howWeWork: {
    title: string;
    description: string;
    steps: { step: string; title: string; description: string }[];
  };
  clients: {
    logos: string[];
    testimonials: {
      name: string;
      designation: string;
      avatar?: string;
      rating: number;
      review: string;
    }[];
  };
  support: {
    title: string;
    items: { title: string; description: string }[];
  };
  faq: { question: string; answer: string }[];
  screenshots: { image: string; title: string; link?: string }[];
}
