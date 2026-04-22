// components/software/software-products-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SoftwareCard, SoftwareProduct } from "./SoftwareCard";

interface SoftwareAPIResponse {
  id: number;
  name: string;
  slug: string;
  hero_image: string;
  hero: {
    title: string;
    description: string;
    buttons: { text: string; link: string }[];
    statistics: { value: string; label: string }[];
  };
  what_we_build: {
    title: string;
    description: string;
    components: { title: string; description: string }[];
  };
  key_features: {
    title: string;
    subtitle: string;
    features: { category: string; items: string[] }[];
  };
  // other fields omitted for brevity
}

// Helper to map API product to SoftwareProduct
function mapAPIToSoftwareProduct(item: SoftwareAPIResponse): SoftwareProduct {
  // Extract features from key_features (flatten first category items or combine)
  const features: string[] = [];
  if (item.key_features?.features?.length) {
    // Take up to 5 items from the first category, or combine all categories
    item.key_features.features.slice(0, 2).forEach((cat) => {
      cat.items.slice(0, 3).forEach((feat) => features.push(feat));
    });
  }
  // Fallback if no features
  if (features.length === 0) {
    features.push("Customizable solution", "Scalable architecture", "24/7 Support");
  }

  return {
    slug: item.slug, // use slug as id for routing
    title: item.name,
    description: item.hero?.description || "",
    image: item.hero_image || "/placeholder-software.jpg",
    category: "Software", // Could be derived from first component or static
    features: features.slice(0, 5),
    // Optional fields
    rating: 4.8,
    users: "50+",
    technologies: ["React", "Node.js", "Laravel"].slice(0, 3),
  };
}

export function SoftwareProductsSection() {
  const router = useRouter();
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchSoftware = async () => {
      if (!baseUrl) return;
      try {
        const res = await fetch(`${baseUrl}/software-products`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        const items = json?.data?.data || [];
        const mapped = items.map(mapAPIToSoftwareProduct);
        setProducts(mapped);
      } catch (error) {
        console.error("Error fetching software products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoftware();
  }, [baseUrl]);

  // Skeleton loading
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-48 mx-auto mb-4" />
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show only first 9 products on home page
  const displayProducts = products.slice(0, 9);

  return (
    <section id="software" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm font-semibold">
            <Code className="w-4 h-4 mr-2" />
            Our Software Solutions
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product) => (
            <SoftwareCard key={product.slug} product={product} />
          ))}
        </div>

        {/* <div className="text-center">
          <Button
            onClick={() => router.push(`/software`)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}