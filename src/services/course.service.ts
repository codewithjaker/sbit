// services/course.service.ts
import {
  CourseAPI,
  CategoryAPI,
  TeamMemberAPI,
  SyllabusSectionAPI,
  UICourse,
} from "@/types/course";

// ---------- helpers ----------
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
  if (hrs > 0) return `${hrs}h ${remainingMins > 0 ? `${remainingMins}m` : ""}`.trim();
  return `${mins}m`;
}

const baseUrl = () => process.env.NEXT_PUBLIC_API_URL;
const imageBasePath = () => process.env.NEXT_PUBLIC_IMAGE_PATH || "";

// ---------- individual fetches ----------
async function fetchAllCourses(): Promise<CourseAPI[]> {
  if (!baseUrl()) return [];
  const all: CourseAPI[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`${baseUrl()}/courses?page=${page}`, { cache: "no-store" });
    if (!res.ok) break;
    const json = await res.json();
    const data = json?.data;
    all.push(...(data?.data || []));
    hasMore = data?.current_page < data?.last_page;
    page++;
  }
  return all;
}

async function fetchSyllabusByCourseId(courseId: number): Promise<any[]> {
  if (!baseUrl()) return [];
  try {
    const res = await fetch(`${baseUrl()}/syllabus-sections`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const sections: SyllabusSectionAPI[] = json?.data || [];
    return sections
      .filter((s) => s.course_id === courseId)
      .sort((a, b) => a.order_index - b.order_index)
      .map((section) => {
        const totalSeconds = section.items.reduce((sum, i) => sum + (i.duration || 0), 0);
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
  } catch {
    return [];
  }
}

async function fetchCategoryName(categoryId: number): Promise<{ name: string; slug: string }> {
  if (!baseUrl()) return { name: "", slug: "" };
  try {
    const res = await fetch(`${baseUrl()}/categories`, { cache: "no-store" });
    if (!res.ok) return { name: "", slug: "" };
    const json = await res.json();
    const cats: CategoryAPI[] = json?.data?.data || [];
    const cat = cats.find((c) => c.id === categoryId);
    return cat ? { name: cat.name, slug: cat.slug } : { name: "", slug: "" };
  } catch {
    return { name: "", slug: "" };
  }
}

async function fetchInstructor(
  instructorId: number
): Promise<{ id: number; name: string; role: string; image: string; bio: string }> {
  const fallback = { id: instructorId, name: "Instructor", role: "Expert", image: "/placeholder-avatar.jpg", bio: "" };
  if (!baseUrl()) return fallback;
  try {
    // direct ID
    let res = await fetch(`${baseUrl()}/team-members/${instructorId}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const inst = json?.data || json;
      return {
        id: inst.id,
        name: inst.name,
        role: inst.role,
        image: inst.image ? `${imageBasePath()}${inst.image}` : fallback.image,
        bio: inst.bio || "",
      };
    }
    // fallback list
    res = await fetch(`${baseUrl()}/team-members?page=1`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const members: TeamMemberAPI[] = json?.data?.data || [];
      const found = members.find((m) => m.id.toString() === instructorId.toString());
      if (found) {
        return {
          id: found.id,
          name: found.name,
          role: found.role,
          image: found.image ? `${imageBasePath()}${found.image}` : fallback.image,
          bio: found.bio || "",
        };
      }
    }
  } catch {}
  return fallback;
}

// ---------- main public function ----------
export async function fetchCourseBySlug(slug: string): Promise<UICourse | null> {
  if (!baseUrl()) return null;
  const courses = await fetchAllCourses();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return null;

  const [syllabus, category, instructor] = await Promise.all([
    fetchSyllabusByCourseId(course.id),
    fetchCategoryName(course.category_id),
    fetchInstructor(course.instructor_id),
  ]);

  const fullImage = course.image ? `${imageBasePath()}${course.image}` : "/placeholder-course.jpg";

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle || "",
    description: course.description,
    fullDescription: course.full_description,
    image: fullImage,
    videoUrl: course.preview_video_url,
    videoThumbnail: fullImage,
    level: course.level,
    category: category.name || "Uncategorized",
    categorySlug: category.slug || "",
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
    syllabus,
    students: 0,
    outlineUrl: "#",
  };
}

export async function fetchRelatedCourses(
  categoryId: number,
  excludeSlug: string
): Promise<any[]> {
  if (!baseUrl()) return [];
  const courses = await fetchAllCourses();
  return courses
    .filter((c) => c.category_id === categoryId && c.slug !== excludeSlug)
    .slice(0, 2)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      image: c.image ? `${imageBasePath()}${c.image}` : "/placeholder-course.jpg",
      duration: formatDurationFromMinutes(c.duration),
      rating: c.rating ? parseFloat(c.rating) : 0,
      category: "", // will be filled by client using current course's category
    }));
}

// For listing pages
export { fetchAllCourses };