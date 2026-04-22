// app/courses/[slug]/page.tsx
import { CourseDetailClient } from "./client";

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/courses?page=1`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    const courses = json?.data?.data || [];
    return courses.map((course: any) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}

export default function CoursePage() {
  return <CourseDetailClient />;
}