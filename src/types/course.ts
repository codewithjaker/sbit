// types/course.ts

export interface CourseAPI {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  full_description: string;
  image: string | null;
  preview_video_url: string | null;
  level: string;
  category_id: number;
  tags: string[];
  price: string;
  original_price: string | null;
  rating: string | null;
  total_reviews: number;
  duration: number; // minutes
  featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  certification: string | null;
  requirements: string[];
  learning_outcomes: string[];
  target_audience: string[];
  language: string;
  course_projects: string[];
  course_software: string[];
  course_features: string[];
  instructor_id: number;
  status: string;
  published_at: string;
}

export interface CategoryAPI {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface TeamMemberAPI {
  id: number;
  name: string;
  role: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  joinDate: string;
  bio: string | null;
  expertise: string[];
  isActive: boolean;
}

export interface SyllabusItemAPI {
  id: number;
  section_id: number;
  title: string;
  type: string;
  content: string;
  duration: number; // seconds
  is_free: number;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface SyllabusSectionAPI {
  id: number;
  course_id: number;
  title: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  items: SyllabusItemAPI[];
}

export interface UICourse {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  videoUrl: string | null;
  videoThumbnail: string;
  level: string;
  category: string;
  categorySlug: string;
  tags: string[];
  price: string;
  originalPrice: string | null;
  rating: number;
  totalReviews: number;
  duration: string;
  durationMinutes: number;
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  certification: string | null;
  prerequisites: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  language: string;
  projects: string[];
  software: string[];
  features: string[];
  instructor: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  syllabus: any[];
  students: number;
  outlineUrl: string;
}


