// services/team.service.ts
import { TeamMemberAPI, TeamMemberCard } from "@/types/team";

export async function fetchAllTeamMembers(): Promise<TeamMemberCard[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

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

    // Filter active members
    const activeMembers = allMembers.filter((m) => m.isActive);

    // Map to UI shape
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

export async function fetchTeamMemberById(
  id: string
): Promise<TeamMemberAPI | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  try {
    // Direct ID endpoint
    const res = await fetch(`${baseUrl}/team-members/${id}`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      return json?.data || json;
    }
    // Fallback: fetch all and find
    const listRes = await fetch(`${baseUrl}/team-members`, {
      headers: { Accept: "application/json" },
    });
    if (!listRes.ok) return null;
    const listJson = await listRes.json();
    const members = listJson?.data?.data || [];
    return members.find((m: any) => m.id.toString() === id) || null;
  } catch (error) {
    console.error("Fetch team member error:", error);
    return null;
  }
}

export async function fetchAllMemberIds(): Promise<string[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  const ids: string[] = [];
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
      ids.push(...members.map((m: any) => m.id.toString()));
      currentUrl = pageData?.next_page_url || null;
    }
  } catch (error) {
    console.error("fetchAllMemberIds error:", error);
  }
  return ids;
}