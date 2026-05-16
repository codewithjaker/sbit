// services/gallery.service.ts
import { GalleryAPI, GalleryItem } from "@/types/gallery";

export async function fetchAllGalleryItems(): Promise<GalleryItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) {
    console.error("Missing NEXT_PUBLIC_API_URL");
    return [];
  }

  const allRaw: GalleryAPI[] = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/galleries?page=${page}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const json = await res.json();
      const pageData = json?.data;
      const items = pageData?.data || [];
      allRaw.push(...items);
      hasMore = pageData?.current_page < pageData?.last_page;
      page++;
    }
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return [];
  }

  // Map to UI shape
  return allRaw.map((item) => {
    // Use first tag as category, fallback to "uncategorized"
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const category = tags.length > 0 ? tags[0] : "uncategorized";

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: `${imageBasePath}${item.thumbnail}`,   // use thumbnail
      category,
      tags,
      likes: 0,
      views: 0,
      featured: item.is_featured,
      published_at: item.published_at,
      created_at: item.published_at, // same for simplicity
    };
  });
}