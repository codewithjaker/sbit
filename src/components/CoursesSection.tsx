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
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// API response types
interface CourseAPI {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  duration: number; // minutes
  level: string;
  rating: string | null;
  category_id: number;
  featured: boolean;
}

interface CoursesResponse {
  status_code: number;
  data: {
    current_page: number;
    data: CourseAPI[];
    last_page: number;
    total: number;
  };
}

// UI Course shape
interface UICourse {
  id: string; // using slug for routing
  slug: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
}

// Helper: format minutes to readable duration
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
}

// Fetch all courses (paginated)
async function fetchAllCourses(): Promise<UICourse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) return [];

  const allCourses: CourseAPI[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/courses?page=${currentPage}`, {
        cache: "no-store",
      });
      if (!res.ok) break;
      const json: CoursesResponse = await res.json();
      const pageData = json?.data;
      const courses = pageData?.data || [];
      allCourses.push(...courses);
      hasMore = pageData?.current_page < pageData?.last_page;
      currentPage++;
    }

    // Map to UI shape and sort (e.g., featured first, then by title)
    return allCourses
      .map((course) => ({
        id: course.slug,
        slug: course.slug,
        title: course.title,
        description: course.description,
        image: course.image
          ? `${imageBasePath}${course.image}`
          : "/placeholder-course.jpg",
        duration: formatDuration(course.duration),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export default function CoursesSection() {
  const router = useRouter();
  const [courses, setCourses] = useState<UICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchAllCourses();
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, []);

  // Show only first 6 courses on home page (or featured if available)
  const displayCourses = courses.slice(0, 6);

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
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 pt-0"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl cursor-pointer">
                    <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {course.description}
                  </CardDescription>
                  {course.duration && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Duration: {course.duration}
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    className="p-0 text-primary hover:bg-transparent hover:underline cursor-pointer"
                    onClick={() => router.push(`/courses/${course.slug}`)}
                  >
                    See Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={() => router.push(`/courses`)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
          >
            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}