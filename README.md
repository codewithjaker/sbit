// components/software/software-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Star, Users, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface SoftwareProduct {
  slug: string;                // This should be the slug
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  category: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  features: string[];
  rating?: number;
  users?: string;
  technologies?: string[];
  deployment?: string;
  support?: string;
  demoUrl?: string;
  documentationUrl?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export function SoftwareCard({ product }: { product: SoftwareProduct }) {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/software/${product.slug}`);
  };

  const handleGetDemo = () => {
    // Navigate to demo page, optionally pre-select this product
    router.push(`/software-demo?product=${product.slug}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group pt-0">
      {/* Image */}
      <div className="relative h-54 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl leading-tight line-clamp-2">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3 space-y-4">
        {/* Features List */}
        <div className="space-y-2">
          {product.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {product.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
              <span>{product.rating}</span>
            </div>
          )}
          {product.users && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{product.users}</span>
            </div>
          )}
          {product.technologies && product.technologies.length > 0 && (
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              <span>{product.technologies.length} tech</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        <Button
          onClick={handleGetDemo}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
        >
          Get Demo
        </Button>
        <Button
          onClick={handleLearnMore}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

-------------------------------------

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


--------------------------------------------------------


then, nextly implement and clean this software api same api 