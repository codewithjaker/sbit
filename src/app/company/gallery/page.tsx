"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Grid,
  Share2,
  Heart,
  Trophy,
  Users,
  BookOpen,
  Award,
  Star,
  Image as ImageIcon,
  FileText,
  Loader2,
  RefreshCw,
  X,
  Eye,
  CalendarDays,
  Tag,
} from "lucide-react";
import Image from "next/image";

// Define GalleryItem type locally
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  featured?: boolean;
  published_at?: string;
  created_at?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH!;

// Map category names to icons
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("success")) return Trophy;
  if (name.includes("writing")) return FileText;
  if (name.includes("speaking")) return Users;
  if (name.includes("classroom") || name.includes("class")) return BookOpen;
  if (name.includes("certificate")) return Award;
  return Grid;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      let allItems: GalleryItem[] = [];
      let page = 1;
      let lastPage = 1;

      do {
        const res = await fetch(`${API_BASE}/api/galleries?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const json = await res.json();
        allItems = [...allItems, ...(json.data?.data ?? [])];
        lastPage = json.data.last_page;
        page++;
      } while (page <= lastPage);

      setItems(allItems);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Dynamic categories
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      const cat = item.category || "uncategorized";
      counts.set(cat, (counts.get(cat) || 0) + 1);
    });
    return [
      { id: "all", name: "All Resources", count: items.length },
      ...Array.from(counts, ([name, count]) => ({ id: name, name, count })),
    ];
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, searchTerm]);

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-700 border-blue-200"
          >
            Gallery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments, resources, and success stories from CF
            International
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-2 border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Dynamic Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => {
                const IconComponent = getCategoryIcon(cat.id);
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {cat.name}
                    <Badge
                      variant="secondary"
                      className="ml-1 bg-blue-100 text-blue-700"
                    >
                      {cat.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchGallery} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => {
              const imgUrl = item.image
                ? `${IMAGE_PATH}/${item.image}`
                : "/placeholder.jpg";
              const isLiked = likedItems.includes(item.id);

              return (
                <Card
                  key={item.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 overflow-hidden flex flex-col h-full pt-0"
                >
                  {/* Image Container with click handler */}
                  <div
                    className="relative w-full pt-[56.25%] bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    {item.featured && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-700"
                        >
                          <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    {/* Action Buttons Overlay */}
                    <div className="absolute top-12 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Heart className="h-3 w-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
                      <span>{item.views} views</span>
                      <span>{formatDate(item.published_at || item.created_at)}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Want to See More?
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Explore our full collection of resources and success stories to
                get inspired.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Browse All
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-blue-700"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Full Image */}
                <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
                  <div className="relative w-full" style={{ maxHeight: "70vh" }}>
                    <Image
                      src={
                        selectedItem.image
                          ? `${IMAGE_PATH}/${selectedItem.image}`
                          : "/placeholder.jpg"
                      }
                      alt={selectedItem.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      unoptimized={!selectedItem.image?.startsWith("/")}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Category:</span>
                      <span>{selectedItem.category || "Uncategorized"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Published:</span>
                      <span>{formatDate(selectedItem.published_at || selectedItem.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Views:</span>
                      <span>{selectedItem.views}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Likes:</span>
                      <span>{selectedItem.likes}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedItem.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button
                    onClick={() => toggleLike(selectedItem.id)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedItems.includes(selectedItem.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                    {likedItems.includes(selectedItem.id) ? "Liked" : "Like"}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 ml-auto"
                    onClick={closeModal}
                  >
                    <X className="h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}