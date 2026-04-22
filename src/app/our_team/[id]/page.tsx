// app/team-members/[id]/page.tsx
import { notFound } from "next/navigation";
import { TeamMemberDetailClient } from "./client";

// API response type
interface TeamMemberAPI {
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

interface Member {
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

async function fetchTeamMember(id: string): Promise<TeamMemberAPI | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/team-members/${id}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      return json?.data || json;
    }

    // Fallback: fetch all and find by id
    const listRes = await fetch(`${baseUrl}/team-members`, {
      headers: { Accept: "application/json" },
    });

    if (!listRes.ok) return null;

    const listJson = await listRes.json();
    const members = listJson?.data?.data || [];
    return members.find((m: any) => m.id.toString() === id) || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function fetchAllMemberIds(): Promise<string[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  const allIds: string[] = [];
  let currentUrl: string | null = `${baseUrl}/team-members?page=1`;

  try {
    while (currentUrl) {
      const res = await fetch(currentUrl, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) break;

      const json = await res.json();
      const pageData = json?.data;
      const members = pageData?.data || [];

      allIds.push(...members.map((m: any) => m.id.toString()));

      currentUrl = pageData?.next_page_url || null;
    }
  } catch (error) {
    console.error("fetchAllMemberIds error:", error);
  }

  return allIds;
}

export async function generateStaticParams() {
  const ids = await fetchAllMemberIds();
  return ids.map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  const apiMember = await fetchTeamMember(id);

  if (!apiMember) {
    notFound();
  }

  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  // Map API data to UI shape
  const member: Member = {
    id: apiMember.id.toString(),
    name: apiMember.name,
    role: apiMember.role,
    image: apiMember.image
      ? `${imageBasePath}${apiMember.image}`
      : "/placeholder-avatar.jpg",
    email: apiMember.email || "Not provided",
    phone: apiMember.phone || "Not provided",
    joinDate: apiMember.joinDate,
    location: "Bangladesh",
    bio: apiMember.bio || "No biography available.",
    rating: 4.8,
    students: 1200,
    courses: 8,
    expertise: apiMember.expertise || [],
    coursesTeaching: [
      {
        id: "1",
        title: "Full-Stack Web Development",
        enrolled: 245,
        rating: 4.9,
        progress: 100,
      },
    ],
    education: apiMember.education || [],
    experience: apiMember.experience || [],
    achievements: apiMember.achievements || [],
    availability: apiMember.availability,
    status: apiMember.isActive ? "active" : "inactive",
  };

  return <TeamMemberDetailClient member={member} />;
}