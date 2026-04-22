// Simplified courses list type for listings
export interface Courses {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  category: string;
  price: number;
  originalPrice: number;
  featured: boolean;
  softwareIncluded: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

export interface SyllabusItem {
  id: string;
  title: string;
   type: "video" | "resource" | "article" | "quiz" | "coding" | "exercise" | "assignment";
  duration: string;
  isPreview: boolean;
  isGhost: boolean;
  videoUrl?: string;
  thumbnail?: string;
  description: string;
}

// Detailed course type
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
   videoThumbnail: string,
    videoUrl: string,
    outlineUrl: string,
  duration: string;
  level: string;
  // students: string;
  students: number;
  rating: number;
  price: number;
  originalPrice: number;
  category: string;
  featured: boolean;
  softwareIncluded: boolean;
  instructor: {
    name: string;
    role: string;
    image: string;
  };
  syllabus: {
    id: string;
    title: string;
    itemCount: number;
    duration: string;
    items: SyllabusItem[];
  }[];
  features: string[];
  software: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  certification: string;
  projects: string[];
}
