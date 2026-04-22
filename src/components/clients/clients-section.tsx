"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  MapPin,
  Code,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { allClients } from "@/data/clients";

export function ClientsSection() {
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const router = useRouter();

  const getCategoryBadges = (categoryString: string) => {
    const categories = categoryString.split(",").map((c) => c.trim());
    return categories.map((cat, index) => {
      const categoryConfig = {
        website: {
          label: "Website",
          variant: "default" as const,
          color: "bg-blue-100 text-blue-800",
        },
        ecommerce: {
          label: "E-commerce",
          variant: "secondary" as const,
          color: "bg-green-100 text-green-800",
        },
        education: {
          label: "Education",
          variant: "destructive" as const,
          color: "bg-purple-100 text-purple-800",
        },
        inventory: {
          label: "Inventory",
          variant: "outline" as const,
          color: "bg-amber-100 text-amber-800",
        },
        news: {
          label: "News",
          variant: "secondary" as const,
          color: "bg-red-100 text-red-800",
        },
        cms: {
          label: "CMS",
          variant: "default" as const,
          color: "bg-indigo-100 text-indigo-800",
        },
        courier: {
          label: "Courier",
          variant: "outline" as const,
          color: "bg-cyan-100 text-cyan-800",
        },
      }[cat];

      if (!categoryConfig) return null;

      return (
        <Badge
          key={index}
          variant={categoryConfig.variant}
          className={`mr-1 mb-1 text-xs ${categoryConfig.color}`}
        >
          {categoryConfig.label}
        </Badge>
      );
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm font-semibold"
          >
            <Code className="w-4 h-4 mr-2" />
            Our Valuable Clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Custom Software for Your Business
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We develop robust, scalable software solutions tailored to your
            specific business needs. From enterprise systems to mobile apps, we
            deliver quality that drives growth.
          </p>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {allClients.slice(0, 8).map((client) => (
            <div
              key={client.id}
              className="relative group"
              onMouseEnter={() => setHoveredClient(client.id)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full"
              >
                <Card className="p-0 overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
                  <CardContent className="p-4 md:p-6 flex flex-col items-center h-full">
                    {/* Logo Container */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 rounded-lg bg-gradient-to-br from-background to-muted/50 p-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Client Logo */}
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={client.image}
                            alt={client.name}
                            width={120}
                            height={120}
                            className="object-contain max-w-full max-h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="text-center flex-1">
                      <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">
                        {client.name}
                      </h3>
                      <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">{client.location}</span>
                      </div>

                      {/* Categories */}
                      {/* <div className="flex flex-wrap justify-center mb-4">
                      {getCategoryBadges(client.category)}
                    </div> */}
                    </div>
                  </CardContent>
                </Card>
              </a>
              {/* Hover Overlay */}
              {/* <div
                className={`absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  hoveredClient === client.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-white text-center p-6">
                  <h4 className="font-bold text-xl mb-2">{client.name}</h4>
                  <p className="text-sm mb-4">{client.location}</p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/clients">View Details</Link>
                  </Button>
                </div>
              </div> */}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => router.push(`/company/our-happy-clients`)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            {/* View All Courses & Products{" "} */}
            View Our All Happy Clients <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
