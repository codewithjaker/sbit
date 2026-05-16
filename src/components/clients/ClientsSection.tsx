// components/clients/clients-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, MapPin, Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchAllClients } from "@/services/client.service";
import { ClientCard } from "@/components/clients/ClientCard";
import type { Client } from "@/types/client";

export function ClientsSection() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchAllClients(); // already sorted by order_by
      setClients(data);
      setLoading(false);
    };
    loadClients();
  }, []);

  // Show first 8 clients
  const displayClients = clients.slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm font-semibold border-orange-200 bg-orange-50 text-orange-700"
          >
            <Code className="w-4 h-4 mr-2" />
            Our Valuable Clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are proud to have delivered exceptional software solutions to
            clients across various industries and countries.
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
              <div key={client.id} className="relative group h-full">
                <a
                  href={client.url || "#"}
                  target={client.url ? "_blank" : undefined}
                  rel={client.url ? "noopener noreferrer" : undefined}
                  className="h-full"
                >
                  <ClientCard client={client} />
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
            className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors"
          >
            View Our All Happy Clients <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}