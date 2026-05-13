// app/courses/[slug]/client.tsx
"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  Download,
  Lock,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ========== Type Definitions ==========
interface CourseAPI {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  full_description: string;
  image: string | null;
  preview_video_url: string | null;
  level: string;
  category_id: number;
  tags: string[];
  price: string;
  original_price: string | null;
  rating: string | null;
  total_reviews: number;
  duration: number; // minutes
  featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  certification: string | null;
  requirements: string[];
  learning_outcomes: string[];
  target_audience: string[];
  language: string;
  course_projects: string[];
  course_software: string[];
  course_features: string[];
  instructor_id: number;
  status: string;
  published_at: string;
}

interface CategoryAPI {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

interface TeamMemberAPI {
  id: number;
  name: string;
  role: string;
  image: string | null;
  email: string | null;
  phone: string | null;
  joinDate: string;
  bio: string | null;
  expertise: string[];
  isActive: boolean;
}

interface SyllabusItemAPI {
  id: number;
  section_id: number;
  title: string;
  type: string;
  content: string;
  duration: number; // seconds
  is_free: number; // 1 = free/preview, 0 = locked
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

interface SyllabusSectionAPI {
  id: number;
  course_id: number;
  title: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
  items: SyllabusItemAPI[];
}

interface UICourse {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  videoUrl: string | null;
  videoThumbnail: string;
  level: string;
  category: string;
  categorySlug: string;
  tags: string[];
  price: string;
  originalPrice: string | null;
  rating: number;
  totalReviews: number;
  duration: string; // formatted
  durationMinutes: number;
  featured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  certification: string | null;
  prerequisites: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  language: string;
  projects: string[];
  software: string[];
  features: string[];
  instructor: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  syllabus: any[];
  students: number;
  outlineUrl: string;
}

// ========== Helpers ==========
function formatDurationFromMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
}

function formatDurationFromSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}h ${remainingMins > 0 ? `${remainingMins}m` : ""}`.trim();
  }
  return `${mins}m`;
}

// ========== Data Fetching ==========
async function fetchSyllabusByCourseId(courseId: number): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/syllabus-sections`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    const allSections: SyllabusSectionAPI[] = json?.data || [];

    // Filter sections for this course and sort by order_index
    const courseSections = allSections
      .filter((section) => section.course_id === courseId)
      .sort((a, b) => a.order_index - b.order_index);

    // Map to UI syllabus shape
    return courseSections.map((section) => {
      // Calculate total section duration
      const totalSeconds = section.items.reduce(
        (sum, item) => sum + (item.duration || 0),
        0
      );
      const sectionDuration = formatDurationFromSeconds(totalSeconds);

      const items = section.items
        .sort((a, b) => a.order_index - b.order_index)
        .map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          duration: formatDurationFromSeconds(item.duration),
          isPreview: item.is_free === 1,
          isGhost: false,
          description: item.type === "article" ? item.content : undefined,
        }));

      return {
        id: section.id,
        title: section.title,
        itemCount: items.length,
        duration: sectionDuration,
        items,
      };
    });
  } catch (error) {
    console.error("Failed to fetch syllabus:", error);
    return [];
  }
}

async function fetchCourseBySlug(slug: string): Promise<UICourse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) return null;

  try {
    // 1. Fetch all courses (paginated)
    let allCourses: CourseAPI[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(`${baseUrl}/courses?page=${currentPage}`, {
        cache: "no-store",
      });
      if (!res.ok) break;
      const json = await res.json();
      const pageData = json?.data;
      const courses = pageData?.data || [];
      allCourses = allCourses.concat(courses);
      hasMore = pageData?.current_page < pageData?.last_page;
      currentPage++;
    }

    const course = allCourses.find((c) => c.slug === slug);
    if (!course) return null;

    // 2. Fetch syllabus for this course
    const syllabus = await fetchSyllabusByCourseId(course.id);

    // 3. Fetch categories to get category name
    let categoryName = "";
    let categorySlug = "";
    try {
      const catRes = await fetch(`${baseUrl}/categories`, {
        cache: "no-store",
      });
      if (catRes.ok) {
        const catJson = await catRes.json();
        const categories: CategoryAPI[] = catJson?.data?.data || [];
        const cat = categories.find((c) => c.id === course.category_id);
        if (cat) {
          categoryName = cat.name;
          categorySlug = cat.slug;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch categories", e);
    }

    // 4. Fetch instructor from team-members
    let instructor = {
      id: course.instructor_id,
      name: "Instructor",
      role: "Expert",
      image: "/placeholder-avatar.jpg",
      bio: "",
    };
    try {
      // Try direct ID endpoint first
      let instRes = await fetch(`${baseUrl}/team-members/${course.instructor_id}`, {
        cache: "no-store",
      });
      if (instRes.ok) {
        const instJson = await instRes.json();
        const inst: TeamMemberAPI = instJson?.data || instJson;
        instructor = {
          id: inst.id,
          name: inst.name,
          role: inst.role,
          image: inst.image
            ? `${imageBasePath}${inst.image}`
            : "/placeholder-avatar.jpg",
          bio: inst.bio || "",
        };
      } else {
        // Fallback: fetch all team members
        const membersRes = await fetch(`${baseUrl}/team-members?page=1`, {
          cache: "no-store",
        });
        if (membersRes.ok) {
          const membersJson = await membersRes.json();
          const members: TeamMemberAPI[] = membersJson?.data?.data || [];
          const found = members.find(
            (m) => m.id.toString() === course.instructor_id.toString()
          );
          if (found) {
            instructor = {
              id: found.id,
              name: found.name,
              role: found.role,
              image: found.image
                ? `${imageBasePath}${found.image}`
                : "/placeholder-avatar.jpg",
              bio: found.bio || "",
            };
          }
        }
      }
    } catch (e) {
      console.warn("Failed to fetch instructor", e);
    }

    // 5. Build UI course object
    const uiCourse: UICourse = {
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle || "",
      description: course.description,
      fullDescription: course.full_description,
      image: course.image
        ? `${imageBasePath}${course.image}`
        : "/placeholder-course.jpg",
      videoUrl: course.preview_video_url,
      videoThumbnail: course.image
        ? `${imageBasePath}${course.image}`
        : "/placeholder-course.jpg",
      level: course.level,
      category: categoryName || "Uncategorized",
      categorySlug: categorySlug || "",
      tags: course.tags || [],
      price: course.price,
      originalPrice: course.original_price,
      rating: course.rating ? parseFloat(course.rating) : 0,
      totalReviews: course.total_reviews || 0,
      duration: formatDurationFromMinutes(course.duration),
      durationMinutes: course.duration,
      featured: course.featured,
      isNew: course.is_new,
      isBestseller: course.is_bestseller,
      certification: course.certification,
      prerequisites: course.requirements || [],
      learningOutcomes: course.learning_outcomes || [],
      targetAudience: course.target_audience || [],
      language: course.language || "English",
      projects: course.course_projects || [],
      software: course.course_software || [],
      features: course.course_features || [],
      instructor,
      syllabus, // now populated from API
      students: 0,
      outlineUrl: "#",
    };

    return uiCourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

// ========== Main Component ==========
export function CourseDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<UICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);

  useEffect(() => {
    const loadCourse = async () => {
      const data = await fetchCourseBySlug(slug);
      setCourse(data);

      if (data) {
        // Fetch related courses (same category, exclude current)
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";
          const res = await fetch(`${baseUrl}/courses?page=1`, {
            cache: "no-store",
          });
          if (res.ok) {
            const json = await res.json();
            const allCourses: CourseAPI[] = json?.data?.data || [];
            const related = allCourses
              .filter((c) => c.category_id === data.id && c.slug !== slug)
              .slice(0, 2)
              .map((c) => ({
                id: c.id,
                slug: c.slug,
                title: c.title,
                description: c.description,
                image: c.image
                  ? `${imageBasePath}${c.image}`
                  : "/placeholder-course.jpg",
                duration: formatDurationFromMinutes(c.duration),
                rating: c.rating ? parseFloat(c.rating) : 0,
                category: data.category,
              }));
            setRelatedCourses(related);
          }
        } catch (e) {
          console.warn("Failed to fetch related courses", e);
        }
      }

      setLoading(false);
    };
    loadCourse();
  }, [slug]);

  // ========== Skeleton Loading ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative py-12 bg-gradient-to-r from-primary/5 to-purple-600/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="aspect-video rounded-xl" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-full max-w-md mb-6" />
            <div className="space-y-6">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const {
    title,
    fullDescription,
    image,
    videoUrl,
    videoThumbnail,
    level,
    category,
    rating,
    totalReviews,
    duration,
    learningOutcomes,
    features,
    software,
    prerequisites,
    projects,
    instructor,
    syllabus,
    students,
    outlineUrl,
  } = course;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 relative">
              <Badge variant="secondary" className="w-fit">
                {category}
              </Badge>
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-xl text-muted-foreground">{fullDescription}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Enroll Now
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={outlineUrl} download>
                    Download Outline
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 bg-background/80 p-4 rounded-lg shadow-lg mt-6 lg:absolute lg:bottom-[-75px] lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%] lg:max-w-xl lg:mt-0">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{students} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span>{rating} rating</span>
                </div>
                <Badge variant="outline">{level}</Badge>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden pt-0">
                <div className="relative aspect-video bg-black">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      poster={videoThumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      controls={false}
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Preview video
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Watch a short preview of the course content (auto‑plays).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Software & Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {software.map((tool, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {prerequisites.map((prereq, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {projects.map((project, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {duration} • {syllabus.length} Sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {syllabus.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {syllabus.map((section, idx) => (
                        <AccordionItem
                          key={section.id}
                          value={`section-${section.id}`}
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-start justify-between w-full pr-4">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0">
                                  <div className="text-primary font-semibold text-sm">
                                    {idx + 1}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-left">
                                    {section.title}
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center">
                                      <PlayCircle className="h-3 w-3 mr-1" />
                                      {section.itemCount} lessons
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {section.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground flex-shrink-0">
                                {section.duration}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              {section.items.map((item: any) => (
                                <div
                                  key={item.id}
                                  className={`flex items-center justify-between p-3 rounded-lg border ${
                                    item.isGhost
                                      ? "bg-muted/50 border-dashed"
                                      : "bg-background"
                                  }`}
                                >
                                  <div className="flex items-start space-x-3 flex-1">
                                    <div
                                      className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                                        item.type === "video"
                                          ? "bg-blue-100 text-blue-600"
                                          : item.type === "resource"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {item.type === "video" ? (
                                        <PlayCircle className="h-4 w-4" />
                                      ) : item.type === "resource" ? (
                                        <Download className="h-4 w-4" />
                                      ) : (
                                        <FileText className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2">
                                        <span
                                          className={`font-medium ${
                                            item.isPreview
                                              ? "text-primary"
                                              : "text-foreground"
                                          }`}
                                        >
                                          {item.title}
                                        </span>
                                        {item.isPreview && (
                                          <Badge variant="outline" className="text-xs">
                                            Preview
                                          </Badge>
                                        )}
                                        {item.isGhost && (
                                          <Badge variant="secondary" className="text-xs">
                                            Coming Soon
                                          </Badge>
                                        )}
                                      </div>
                                      {item.description && (
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                                    <span className="text-sm text-muted-foreground">
                                      {item.duration}
                                    </span>
                                    {item.isPreview && !item.isGhost ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8"
                                      >
                                        <PlayCircle className="h-3 w-3 mr-1" />
                                        Watch
                                      </Button>
                                    ) : item.type === "resource" ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8"
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8"
                                        disabled={item.isGhost}
                                      >
                                        <Lock className="h-3 w-3 mr-1" />
                                        {item.isGhost ? "Coming Soon" : "Locked"}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Curriculum details coming soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {instructor.name}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-4">
                        {instructor.role}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {instructor.bio ||
                          "Experienced instructor passionate about teaching."}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {students}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Students
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {rating}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold">{rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {totalReviews} reviews
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Excellent Course!</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 text-yellow-500 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Recently
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        This course completely transformed my understanding.
                        Highly recommended!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCourses.map((related) => (
                <Card
                  key={related.id}
                  className="overflow-hidden hover:shadow-lg transition-all p-5"
                >
                  <div className="flex">
                    <div className="w-32 h-32 relative flex-shrink-0">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {related.category}
                      </Badge>
                      <h3 className="font-semibold mb-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {related.duration}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {related.rating}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/courses/${related.slug}`}>
                            View Course
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of students who have transformed their careers with
            our industry-focused training programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 font-semibold"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}