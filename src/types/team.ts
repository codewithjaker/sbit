// types/team.ts

export interface TeamMemberAPI {
  id: string;
  name: string;
  role: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  joinDate: string;
  bio: string | null;
  expertise: string[];
  education: { degree: string; institution: string; year: string }[];
  experience: {
    position: string;
    company: string;
    period: string;
    description: string;
  }[];
  achievements: string[];
  social?: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    website?: string;
  };
  availability: string;
  isActive: boolean;
  order: number;
}

export interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  image: string;
  initials: string;
  expertise: string;
  email: string;
  social: {
    linkedin: string;
    github: string;
    website: string;
    email: string;
  };
}

// types/team.ts
export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  joinDate: string;
  location: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string[];
  coursesTeaching: {
    id: string;
    title: string;
    enrolled: number;
    rating: number;
    progress: number;
  }[];
  education: { degree: string; institution: string; year: string }[];
  experience: {
    position: string;
    company: string;
    period: string;
    description: string;
  }[];
  achievements: string[];
  availability: string;
  status: "active" | "inactive";
}