// services/hero.service.ts
import { HeroSectionAPI } from "@/types/hero";

export async function fetchHeroSection(): Promise<HeroSectionAPI | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_API_URL");
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/get-hero-section`, {
      cache: "no-store",        // always fresh
    });
    if (!res.ok) throw new Error("Failed to fetch hero section");
    const json = await res.json();
    // API wraps data inside data.data[0]
    return json?.data?.data?.[0] || null;
  } catch (error) {
    console.error("Hero fetch error:", error);
    return null;
  }
}