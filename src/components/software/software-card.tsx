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