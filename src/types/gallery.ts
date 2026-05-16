// types/gallery.ts

export interface GalleryAPI {
  id: number;
  title: string;
  description: string;
  thumbnail: string;          // API returns "thumbnail"
  published_at: string;
  is_featured: boolean;
  tags: string[] | null;      // can be null
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;              // full URL after mapping
  category: string;           // derived from first tag or "uncategorized"
  tags: string[];
  likes: number;              // we'll manage likes locally, default 0
  views: number;              // API doesn't have views, set to 0
  featured: boolean;
  published_at?: string;
  created_at?: string;
}