// app/company/our-team/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  BookOpen,
  Mail,
  // Linkedin,
  // Github,
  Globe,
  Users,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Updated API response type to match actual data
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

// UI-friendly shape for a team member card
interface TeamMemberCard {
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

async function fetchAllTeamMembers(): Promise<TeamMemberCard[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH!;

  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_API_URL is missing");
    return [];
  }

  const allMembers: TeamMemberAPI[] = [];
  let currentUrl: string | null = `${baseUrl}/team-members?page=1`;

  try {
    while (currentUrl) {
      const res = await fetch(currentUrl, { cache: "no-store" });

      if (!res.ok) {
        console.error("❌ API failed:", res.status);
        break;
      }

      const json = await res.json();
      const pageData = json?.data;

      if (pageData?.data) {
        allMembers.push(...pageData.data);
      }

      currentUrl = pageData?.next_page_url || null;
    }

    const activeMembers = allMembers.filter((m) => m.isActive);

    return activeMembers.map((m) => {
      const initials = m.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return {
        id: m.id,
        name: m.name,
        role: m.role,
        image: m.image
          ? `${imageBasePath}${m.image}`
          : "/placeholder-avatar.jpg",
        initials,
        expertise: m.expertise?.[0] || m.role,
        email: m.email || "info@sbit.com.bd",
        social: {
          linkedin: m.social?.linkedin || "#",
          github: m.social?.github || "#",
          website: m.social?.website || "#",
          email: m.email || "info@sbit.com.bd",
        },
      };
    });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}

export default function OurTeamPage() {
  const [members, setMembers] = useState<TeamMemberCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      const data = await fetchAllTeamMembers();
      setMembers(data);
      setLoading(false);
    };
    loadMembers();
  }, []);

  // Skeleton loading state (mimics gallery pattern)
  if (loading) {
    return (
      <div className="space-y-6">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="w-30 h-30 rounded-full mb-4" />
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-20 mt-2" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="flex-1 h-8 rounded-md" />
                      <Skeleton className="flex-1 h-8 rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Our Expert Team
            </Badge>
          </div>

          {members.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-gradient-to-br from-background to-muted/30 overflow-hidden"
                >
                  <CardHeader className="relative">
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <Avatar className="w-30 h-30 mb-4 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-lg font-bold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                      <CardDescription className="font-semibold text-primary">
                        {member.role}
                      </CardDescription>

                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Social Links */}
                    <div className="flex justify-center space-x-2">
                      {member.social.linkedin !== "#" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {member.social.github !== "#" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {member.social.website !== "#" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <a
                            href={member.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Globe className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <a href={`mailto:${member.social.email}`}>
                          <Mail className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1 text-xs" asChild>
                        <a href={`/our_team/${member.id}`}>
                          <BookOpen className="w-3 h-3 mr-1" />
                          Profile
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        asChild
                      >
                        <a href={`/courses?instructor=${member.name}`}>
                          <Briefcase className="w-3 h-3 mr-1" />
                          Courses
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}