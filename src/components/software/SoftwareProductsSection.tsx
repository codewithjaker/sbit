// components/software/software-products-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Code, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SoftwareCard, SoftwareProduct } from "./SoftwareCard";
import { getSoftwareProducts } from "@/services/software.service";
import type { Software } from "@/types/software";

// ---------- Helper: map the full Software to card shape ----------
function toSoftwareProduct(software: Software): SoftwareProduct {
  // extract features from the first two key‑feature categories (up to 5 total)
  const features: string[] = [];
  if (software.keyFeatures?.features?.length) {
    software.keyFeatures.features.slice(0, 2).forEach((cat) => {
      cat.items.slice(0, 3).forEach((item) => features.push(item));
    });
  }
  if (features.length === 0) {
    features.push(
      "Customizable solution",
      "Scalable architecture",
      "24/7 Support"
    );
  }

  return {
    slug: software.slug,
    title: software.name,
    description: software.hero?.description || "",
    image: software.heroImage || "/placeholder-software.jpg",
    category: "Software", // or use the first component title if you prefer
    features: features.slice(0, 5),
    rating: 4.8,
    users: "50+",
    technologies: ["React", "Node.js", "Laravel"],
  };
}

export function SoftwareProductsSection() {
  const router = useRouter();
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allSoftware = await getSoftwareProducts(); // from service
      const mapped = allSoftware.slice(0, 9).map(toSoftwareProduct); // show max 9
      setProducts(mapped);
      setLoading(false);
    };
    load();
  }, []);

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

  return (
    <section id="software" className="py-16 bg-white">
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <SoftwareCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Optional: View All Products button (uncomment if needed) */}
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