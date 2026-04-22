"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Maximize2, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// API response types
interface GalleryItemAPI {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  published_at: string;
  is_featured: boolean;
  tags: string[];
}

interface GalleryResponse {
  status_code: number;
  data: {
    current_page: number;
    data: GalleryItemAPI[];
    last_page: number;
    total: number;
    per_page: number;
  };
}

// UI photo shape
interface Photo {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  featured: boolean;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH!;

  // Fetch gallery page
  const fetchGallery = useCallback(
  async (page: number, append: boolean = false) => {
    if (!baseUrl) {
      console.error("Missing API URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/galleries?page=${page}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json: GalleryResponse = await res.json();

      const items = json?.data?.data || [];

      const mappedPhotos: Photo[] = items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: `${imageBasePath}${item.thumbnail}`, // ✅ FIXED
        tags: item.tags || [],
        date: item.published_at,
        featured: item.is_featured,
      }));

      if (append) {
        setPhotos((prev) => [...prev, ...mappedPhotos]);
      } else {
        setPhotos(mappedPhotos);
      }

      setHasMore(json.data.current_page < json.data.last_page);
      setCurrentPage(json.data.current_page);
    } catch (error) {
      console.error("Gallery fetch error:", error);
    } finally {
      setLoading(false);
    }
  },
  [baseUrl, imageBasePath]
);

  // Initial fetch
  useEffect(() => {
    fetchGallery(1, false);
  }, [fetchGallery]);

  // Load more
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchGallery(currentPage + 1, true);
    }
  };

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevPhoto = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      switch (e.key) {
        case "ArrowRight":
          handleNextPhoto();
          break;
        case "ArrowLeft":
          handlePrevPhoto();
          break;
        case "Escape":
          handleCloseModal();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentIndex, photos.length]);

  // Skeleton loading state
  if (loading && photos.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8 text-center">
            <Skeleton className="h-10 w-64 mx-auto mb-3" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>

          {/* Photo Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden p-0">
                <Skeleton className="aspect-[4/3] w-full" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Photo Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore moments from our campus, events, and achievements
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <Card
              key={photo.id}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer p-0"
              onClick={() => handlePhotoClick(photo, index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {photo.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Photos"}
            </Button>
          </div>
        )}

        {/* Empty state */}
        {photos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos available.</p>
          </div>
        )}

        {/* Modal Dialog */}
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Viewer */}
              <div className="relative flex-1 min-h-[400px] lg:min-h-[500px] bg-black">
                {selectedPhoto && (
                  <Image
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-10 w-10"
                  onClick={handlePrevPhoto}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-10 w-10"
                  onClick={handleNextPhoto}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}