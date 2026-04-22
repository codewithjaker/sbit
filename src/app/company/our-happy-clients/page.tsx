"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  Building,
  MapPin,
  Globe,
  Package,
  Book,
  Newspaper,
} from "lucide-react";
import Image from "next/image";

// API response types
interface ClientAPI {
  id: number;
  name: string;
  image: string | null;
  category: string;
  url: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

interface ClientsResponse {
  status_code: number;
  data: {
    current_page: number;
    data: ClientAPI[];
    last_page: number;
    total: number;
    per_page: number;
  };
}

export type Client = {
  id: number;
  name: string;
  image: string;
  category: string;
  url?: string;
  location?: string;
};

export default function OurHappyClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH!;

  // Fetch all clients (all pages)
  useEffect(() => {
    const fetchAllClients = async () => {
      if (!baseUrl) {
        console.error("Missing API URL");
        setLoading(false);
        return;
      }

      try {
        // Fetch first page to get pagination info
        const firstRes = await fetch(`${baseUrl}/our-happy-clients?page=1`, {
          cache: "no-store",
        });
        if (!firstRes.ok) throw new Error("Failed to fetch");
        const firstJson: ClientsResponse = await firstRes.json();
        const firstPageData = firstJson.data;

        let allClientsData: ClientAPI[] = firstPageData.data || [];

        // If more pages, fetch them in parallel
        const lastPage = firstPageData.last_page;
        if (lastPage > 1) {
          const pagePromises = [];
          for (let page = 2; page <= lastPage; page++) {
            pagePromises.push(
              fetch(`${baseUrl}/our-happy-clients?page=${page}`, {
                cache: "no-store",
              }).then((res) => res.json())
            );
          }
          const additionalPages = await Promise.all(pagePromises);
          additionalPages.forEach((json: ClientsResponse) => {
            if (json.data?.data) {
              allClientsData = allClientsData.concat(json.data.data);
            }
          });
        }

        // Map to UI shape
        const mappedClients: Client[] = allClientsData.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image ? `${imageBasePath}${item.image}` : "/placeholder-client.png",
          category: item.category,
          url: item.url || undefined,
          location: item.location || undefined,
        }));

        setClients(mappedClients);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllClients();
  }, [baseUrl, imageBasePath]);

  // Compute categories dynamically from fetched clients
  const categories = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    clients.forEach((client) => {
      // Split if category contains commas (though API seems single string)
      const cats = client.category.split(",").map((c) => c.trim());
      cats.forEach((cat) => {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
    });

    const categoryList = [
      { id: "all", name: "All Clients", icon: Building, count: clients.length },
    ];

    // Add each unique category
    Object.entries(categoryCount).forEach(([id, count]) => {
      const icon = {
        website: Globe,
        ecommerce: Package,
        education: Book,
        inventory: Package,
        news: Newspaper,
        cms: Globe,
      }[id] || Globe;

      const name = {
        website: "Website/Software",
        ecommerce: "E-commerce",
        education: "Education",
        inventory: "Inventory",
        news: "News Portal",
        cms: "CMS",
      }[id] || id.charAt(0).toUpperCase() + id.slice(1);

      categoryList.push({ id, name, icon, count });
    });

    return categoryList;
  }, [clients]);

  // Filter clients based on search and category
  const displayedClients = useMemo(() => {
    let filtered = clients;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((client) =>
        client.category.split(",").map((c) => c.trim()).includes(selectedCategory)
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(term) ||
          client.location?.toLowerCase().includes(term) ||
          client.category.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [clients, searchTerm, selectedCategory]);

  // Skeleton loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <section className="bg-gradient-to-r from-primary-200 to-primary-300 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-2/3 mx-auto mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Skeleton className="flex-1 h-10 bg-white/20" />
                <Skeleton className="w-24 h-10 bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Skeleton */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-28" />
              ))}
            </div>
          </div>
        </section>

        {/* Grid Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="p-0 overflow-hidden">
                  <CardContent className="p-4 md:p-6 flex flex-col items-center">
                    <Skeleton className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-lg" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-200 to-primary-300 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Happy Clients
            </h1>
            <p className="text-xl text-white mb-8">
              Trusted by {clients.length}+ organizations worldwide. We&apos;ve delivered
              exceptional software solutions to businesses across multiple
              industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  placeholder="Search clients by name, location, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold cursor-pointer">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCategory === "all"
                ? "All Clients"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-muted-foreground">
              Showing {displayedClients.length} of {clients.length} clients
            </p>
          </div>

          {displayedClients.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {displayedClients.map((client) => (
                <a
                  key={client.id}
                  href={client.url || "#"}
                  target={client.url ? "_blank" : undefined}
                  rel={client.url ? "noopener noreferrer" : undefined}
                  className="h-full"
                >
                  <Card className="p-0 overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
                    <CardContent className="p-4 md:p-6 flex flex-col items-center h-full">
                      {/* Logo Container */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 rounded-lg bg-gradient-to-br from-background to-muted/50 p-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={client.image}
                            alt={client.name}
                            width={120}
                            height={120}
                            className="object-contain max-w-full max-h-full"
                          />
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="text-center flex-1">
                        <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">
                          {client.name}
                        </h3>
                        {client.location && (
                          <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="line-clamp-1">{client.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}