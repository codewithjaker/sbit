// components/clients/clients-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MapPin, Code } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  };
}

// UI-friendly client shape
interface UIClient {
  id: number;
  name: string;
  image: string;
  location: string;
  url?: string;
}

async function fetchAllClients(): Promise<UIClient[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) return [];

  const allClients: ClientAPI[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/our-happy-clients?page=${currentPage}`, {
        cache: "no-store",
      });
      if (!res.ok) break;
      const json: ClientsResponse = await res.json();
      const pageData = json?.data;
      const clients = pageData?.data || [];
      allClients.push(...clients);
      hasMore = pageData?.current_page < pageData?.last_page;
      currentPage++;
    }

    return allClients.map((client) => ({
      id: client.id,
      name: client.name,
      image: client.image
        ? `${imageBasePath}${client.image}`
        : "/placeholder-client.png",
      location: client.location || "",
      url: client.url || undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}

export function ClientsSection() {
  const router = useRouter();
  const [clients, setClients] = useState<UIClient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchAllClients();
      setClients(data);
      setLoading(false);
    };
    loadClients();
  }, []);

  // Show first 8 clients
  const displayClients = clients.slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm font-semibold">
            <Code className="w-4 h-4 mr-2" />
            Our Valuable Clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are proud to have delivered exceptional software solutions to clients across various industries and countries.
          </p>
        </div>

        {/* Client Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-0 overflow-hidden">
                <CardContent className="p-4 md:p-6 flex flex-col items-center">
                  <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-lg mb-4" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {displayClients.map((client) => (
              <div key={client.id} className="relative group">
                <a
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
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="line-clamp-1">{client.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={() => router.push(`/company/our-happy-clients`)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            View Our All Happy Clients <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}