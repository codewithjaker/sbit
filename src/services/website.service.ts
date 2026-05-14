// services/website.service.ts
import { WebSettingsAPI, WebsiteContent } from "@/types/website";

export async function fetchWebsiteSettings(): Promise<WebsiteContent | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) {
    console.error("Missing API URL");
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/web-settings`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch website settings");
    const json = await res.json();
    const data: WebSettingsAPI = json?.data;

    if (!data) return null;

    return {
      id: data.id,
      logo: data.logo ? `${imageBasePath}${data.logo}` : "/logo.png",
      favicon: data.favicon ? `${imageBasePath}${data.favicon}` : "/favicon.ico",
      title: data.title,
      phone: data.phone,
      email: data.email,
      address: data.address,
      map: data.map,
      slogan: data.slogan,
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      youtube: data.youtube,
      support_phone: data.support_phone,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      tax: data.tax,
      seller_center_logo: data.seller_center_logo
        ? `${imageBasePath}${data.seller_center_logo}`
        : null,
    };
  } catch (error) {
    console.error("Failed to fetch website settings:", error);
    return null;
  }
}