"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Eye,
  Bookmark,
  Tag,
} from "lucide-react";
import { fetchAllBlogs, fetchBlogCategories } from "@/lib/api/blog";

interface BlogData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string | null;
  author: { name: string; email: string };
  published_at: string;
  read_time_minutes: number;
  views: number;
  featured: boolean;
  tags: string[];
  blog_category_id: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export function BlogDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const [blogs, cats] = await Promise.all([
          fetchAllBlogs(),
          fetchBlogCategories(),
        ]);
        setCategories(cats);

        const found = blogs.find((b) => b.slug === slug);
        if (!found) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(found);

        // Related posts (same category, exclude current)
        const related = blogs
          .filter(
            (b) => b.blog_category_id === found.blog_category_id && b.slug !== slug
          )
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (error) {
        console.error("Error loading blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  // Skeleton loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-24 mb-8" />
          <Skeleton className="h-6 w-20 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-20 w-full mb-8" />
          <div className="flex gap-6 mb-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  const categoryName =
    categories.find((c) => c.id === blog.blog_category_id)?.name ||
    "Uncategorized";

  const blogImage = blog.image
    ? `${imageBasePath}${blog.image}`
    : "/placeholder-blog.jpg";

  const formattedDate = new Date(blog.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime =
    blog.read_time_minutes > 0
      ? `${blog.read_time_minutes} min read`
      : "5 min read";

  const blogContent = blog.content || blog.excerpt;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link href="/company/blog">
          <Button variant="ghost" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="mb-12">
          {/* Category and Featured */}
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="secondary" className="text-sm">
              {categoryName}
            </Badge>
            {blog.featured && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    blog.author.name
                  )}&background=random`}
                  alt={blog.author.name}
                />
                <AvatarFallback>
                  {blog.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{blog.author.name}</p>
                <p className="text-xs">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{blog.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={blogImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: blogContent }}
          />

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      blog.author.name
                    )}&background=random`}
                    alt={blog.author.name}
                  />
                  <AvatarFallback>
                    {blog.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{blog.author.name}</p>
                  <p className="text-muted-foreground">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((related) => {
                const relatedImage = related.image
                  ? `${imageBasePath}${related.image}`
                  : "/placeholder-blog.jpg";
                const relatedCategory =
                  categories.find((c) => c.id === related.blog_category_id)?.name ||
                  "Uncategorized";
                return (
                  <Card
                    key={related.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/company/blog/${related.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={relatedImage}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {relatedCategory}
                        </Badge>
                        <h3 className="font-semibold line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {related.read_time_minutes > 0
                              ? `${related.read_time_minutes} min read`
                              : "5 min read"}
                          </span>
                          <span>
                            {new Date(related.published_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}