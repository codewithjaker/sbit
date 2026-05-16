// components/CoursesSection.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Star, Clock, BarChart3, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchAllCourses } from "@/services/course.service";
import type { CourseAPI } from "@/types/course";

// ---------- enriched card shape ----------
interface CourseCard {
  id: string; // slug
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  rating: number;
  totalReviews: number;
  duration: string; // formatted
  featured: boolean;
  price?: string;
  originalPrice?: string;
}

// ---------- helpers ----------
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
}



const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

export default function CoursesSection() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allCourses = await fetchAllCourses();
      // Map to enriched card shape – take first 6
      const mapped: CourseCard[] = allCourses
        .slice(0, 6)
        .map((c: CourseAPI) => ({
          id: c.slug,
          slug: c.slug,
          title: c.title,
          description: c.description,
          image: c.image ? `${imageBasePath}${c.image}` : "/placeholder-course.jpg",
          level: c.level || "All Levels",
          rating: c.rating ? parseFloat(c.rating) : 0,
          totalReviews: c.total_reviews || 0,
          duration: formatDuration(c.duration),
          featured: c.featured || false,
          price: c.price,
          originalPrice: c.original_price || undefined,
        }));

      setCourses(mapped);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Professional Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The syllabus for each course is arranged from basic to advanced
            levels, ensuring comprehensive learning for all skill levels.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden pt-0">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 pt-0 border-0 bg-background"
              >
                {/* Image with overlay */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.featured && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                        Featured
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl leading-tight">
                    <Link href={`/courses/${course.slug}`} className="hover:text-orange-600 transition-colors">
                      {course.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats row */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium text-foreground">
                        {course.rating > 0 ? course.rating.toFixed(1) : "New"}
                      </span>
                      {course.totalReviews > 0 && (
                        <span className="text-xs">({course.totalReviews})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium mt-2"
                    onClick={() => router.push(`/courses/${course.slug}`)}
                  >
                    See Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Optional: View All Courses button */}
        {/* <div className="text-center mt-8">
          <Button
            onClick={() => router.push(`/courses`)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}