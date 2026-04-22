// app/company/blog/[slug]/page.tsx
import { BlogDetailClient } from "./client";
import { fetchAllBlogSlugs } from "@/lib/api/blog";

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}