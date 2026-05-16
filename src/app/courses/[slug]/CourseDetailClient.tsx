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
import { fetchCourseBySlug, fetchRelatedCourses } from "@/services/course.service";
import type { UICourse } from "@/types/course";

export function CourseDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<UICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchCourseBySlug(slug);
      setCourse(data);

      if (data) {
        const related = await fetchRelatedCourses(data.id, slug);
        // set category name from current course
        setRelatedCourses(related.map((r) => ({ ...r, category: data.category })));
      }
      setLoading(false);
    })();
  }, [slug]);

  // Skeleton loading
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
              <Badge variant="secondary" className="w-fit">{category}</Badge>
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-xl text-muted-foreground">{fullDescription}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">Enroll Now</Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={outlineUrl} download>Download Outline</a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 bg-background/80 p-4 rounded-lg shadow-lg mt-6 lg:absolute lg:bottom-[-75px] lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%] lg:max-w-xl lg:mt-0">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span>{duration}</span></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>{students} enrolled</span></div>
                <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /><span>{rating} rating</span></div>
                <Badge variant="outline">{level}</Badge>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden pt-0">
                <div className="relative aspect-video bg-black">
                  {videoUrl ? (
                    <video src={videoUrl} poster={videoThumbnail} autoPlay muted loop playsInline className="w-full h-full object-cover" controls={false} />
                  ) : (
                    <Image src={image} alt={title} fill className="object-cover" />

                  )}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Course Preview </div>
                </div>
                <CardHeader><CardTitle>Course Preview</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Watch a preview of the course content and get a feel for the teaching style. </p></CardContent>
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
                <CardHeader><CardTitle>What You'll Learn</CardTitle></CardHeader>
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
                <CardHeader><CardTitle>Course Features</CardTitle></CardHeader>
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
                <CardHeader><CardTitle>Software & Tools</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {software.map((tool, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">{tool}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Prerequisites</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {prerequisites.map((prereq, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">{prereq}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {projects.map((project, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">{project}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>{duration} • {syllabus.length} Sections</CardDescription>
                </CardHeader>
                <CardContent>
                  {syllabus.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {syllabus.map((section, idx) => (
                        <AccordionItem key={section.id} value={`section-${section.id}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-start justify-between w-full pr-4">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1 flex-shrink-0">
                                  <div className="text-primary font-semibold text-sm">{idx + 1}</div>
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-left">{section.title}</div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center"><PlayCircle className="h-3 w-3 mr-1" />{section.itemCount} lessons</span>
                                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{section.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground flex-shrink-0">{section.duration}</div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              {section.items.map((item: any) => (
                                <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border ${item.isGhost ? "bg-muted/50 border-dashed" : "bg-background"}`}>
                                  <div className="flex items-start space-x-3 flex-1">
                                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${item.type === "video" ? "bg-blue-100 text-blue-600" : item.type === "resource" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                                      {item.type === "video" ? <PlayCircle className="h-4 w-4" /> : item.type === "resource" ? <Download className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2">
                                        <span className={`font-medium ${item.isPreview ? "text-primary" : "text-foreground"}`}>{item.title}</span>
                                        {item.isPreview && <Badge variant="outline" className="text-xs">Preview</Badge>}
                                        {item.isGhost && <Badge variant="secondary" className="text-xs">Coming Soon</Badge>}
                                      </div>
                                      {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                                    {item.isPreview && !item.isGhost ? (
                                      <Button variant="outline" size="sm" className="h-8"><PlayCircle className="h-3 w-3 mr-1" />Watch</Button>
                                    ) : item.type === "resource" ? (
                                      <Button variant="outline" size="sm" className="h-8"><Download className="h-3 w-3 mr-1" />Download</Button>
                                    ) : (
                                      <Button variant="ghost" size="sm" className="h-8" disabled={item.isGhost}><Lock className="h-3 w-3 mr-1" />{item.isGhost ? "Coming Soon" : "Locked"}</Button>
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
                    <p className="text-muted-foreground text-center py-8">Curriculum details coming soon.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor">
              <Card>
                <CardHeader><CardTitle>About the Instructor</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                    <Image src={instructor.image} alt={instructor.name} width={150} height={150} className="rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{instructor.name}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{instructor.role}</p>
                      <p className="text-muted-foreground mb-6">{instructor.bio || "Experienced instructor passionate about teaching."}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{students}</div>
                          <div className="text-sm text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{rating}</div>
                          <div className="text-sm text-muted-foreground">Rating</div>
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
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
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
                              <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">Recently</span>
                      </div>
                      <p className="text-muted-foreground">This course completely transformed my understanding. Highly recommended!</p>
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
                  className="overflow-hidden hover:shadow-lg transition-all group p-4"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-sm"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {related.category}
                        </Badge>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {related.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {related.rating}
                          </span>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
                          asChild
                        >
                          <Link href={`/courses/${related.slug}`}>View Course</Link>
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
            Join thousands of students who have transformed their careers with our industry-focused training programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 font-semibold">Enroll Now</Button>
            <Button size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold">Schedule a Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}