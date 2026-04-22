// app/company/blog/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  ChevronRight,
  Eye,
  ThumbsUp,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ========== Types ==========
interface BlogCategoryAPI {
  id: number;
  name: string;
  slug: string;
}

interface BlogAuthorAPI {
  name: string;
  email: string;
}

interface BlogAPI {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  author: BlogAuthorAPI;
  published_at: string;
  read_time_minutes: number;
  views: number;
  featured: boolean;
  tags: string[];
  blog_category_id: number;
}

interface BlogsResponse {
  status_code: number;
  data: {
    current_page: number;
    data: BlogAPI[];
    last_page: number;
    total: number;
    per_page: number;
  };
}

interface CategoriesResponse {
  status_code: number;
  data: {
    current_page: number;
    data: BlogCategoryAPI[];
    last_page: number;
  };
}

interface UIBlog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: { name: string; email: string };
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number; // Placeholder
  featured: boolean;
  tags: string[];
  categoryId: number;
  categoryName: string;
}

// ========== Helpers ==========
function formatReadTime(minutes: number): string {
  if (minutes <= 0) return "5 min read";
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ========== Data Fetching ==========
async function fetchBlogCategories(): Promise<BlogCategoryAPI[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/blog-categories`);
    if (!res.ok) return [];
    const json: CategoriesResponse = await res.json();
    return json?.data?.data || [];
  } catch {
    return [];
  }
}

async function fetchBlogs(page: number = 1): Promise<{
  blogs: BlogAPI[];
  total: number;
  currentPage: number;
  lastPage: number;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return { blogs: [], total: 0, currentPage: 1, lastPage: 1 };

  try {
    const res = await fetch(`${baseUrl}/blogs?page=${page}`);
    if (!res.ok) return { blogs: [], total: 0, currentPage: 1, lastPage: 1 };
    const json: BlogsResponse = await res.json();
    const data = json.data;
    return {
      blogs: data.data,
      total: data.total,
      currentPage: data.current_page,
      lastPage: data.last_page,
    };
  } catch {
    return { blogs: [], total: 0, currentPage: 1, lastPage: 1 };
  }
}

// ========== Component ==========
export default function BlogPage() {
  const [blogs, setBlogs] = useState<UIBlog[]>([]);
  const [categories, setCategories] = useState<BlogCategoryAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  // Fetch categories once
  useEffect(() => {
    fetchBlogCategories().then(setCategories);
  }, []);

  // Fetch blogs when page or category/search changes
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const { blogs: apiBlogs, lastPage, total } = await fetchBlogs(currentPage);
      setTotalBlogs(total);
      setHasMore(currentPage < lastPage);

      // Map API to UI with category name
      const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
      const uiBlogs: UIBlog[] = apiBlogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        image: blog.image ? `${imageBasePath}${blog.image}` : "/placeholder-blog.jpg",
        author: blog.author,
        publishedAt: formatDate(blog.published_at),
        readTime: formatReadTime(blog.read_time_minutes),
        views: blog.views || 0,
        likes: 0, // placeholder
        featured: blog.featured,
        tags: blog.tags || [],
        categoryId: blog.blog_category_id,
        categoryName: categoryMap.get(blog.blog_category_id) || "Uncategorized",
      }));

      if (currentPage === 1) {
        setBlogs(uiBlogs);
      } else {
        setBlogs((prev) => [...prev, ...uiBlogs]);
      }
      setLoading(false);
      setLoadingMore(false);
    };

    if (categories.length > 0 || currentPage === 1) {
      // Wait for categories to map names; if page > 1 we already have categories
      loadBlogs();
    }
  }, [currentPage, categories, imageBasePath]);

  // Filter blogs client‑side by search term and category
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.categoryName === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.excerpt.toLowerCase().includes(term) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchTerm]);

  const featuredPosts = useMemo(
    () => filteredBlogs.filter((blog) => blog.featured),
    [filteredBlogs]
  );

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    setBlogs([]); // Clear existing blogs – will refetch page 1
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Searching is client‑side, no refetch needed
  };

  // Skeleton loading (initial)
  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary-200 to-primary-300 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
              <Skeleton className="h-20 w-full mx-auto mb-8 bg-white/20" />
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Skeleton className="flex-1 h-12 bg-white/20" />
                <Skeleton className="w-24 h-12 bg-white/20" />
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md p-4">
                <div className="md:flex">
                  <Skeleton className="md:w-2/5 h-48 md:h-full" />
                  <div className="md:w-3/5 p-4 space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-200 to-primary-300 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skill Based IT Blog
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Insights, tutorials, and industry news from our team of software
              experts. Stay updated with the latest trends in web development,
              design, and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/15"
                />
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold cursor-pointer">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Posts */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("all")}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Featured Articles</h2>
                  <Badge variant="secondary" className="text-sm">
                    Latest & Greatest
                  </Badge>
                </div>
                <div className="grid gap-6">
                  {featuredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 shadow-md p-4"
                    >
                      <div className="md:flex">
                        <div className="md:w-2/5">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="w-full h-48 md:h-full object-cover rounded-sm"
                          />
                        </div>
                        <div className="md:w-3/5">
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge
                                variant="default"
                                className="bg-primary hover:bg-primary/90"
                              >
                                {post.categoryName}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.publishedAt}
                              </div>
                            </div>
                            <CardTitle className="text-xl hover:text-primary transition-colors">
                              <Link href={`/company/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {post.author.name}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {post.readTime}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {post.views}
                                </div>
                                <div className="flex items-center">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {post.likes}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              asChild
                              variant="ghost"
                              className="p-0 text-primary hover:bg-transparent hover:underline"
                            >
                              <Link href={`/company/blog/${post.slug}`}>
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts (non-featured) */}
            {filteredBlogs.filter((b) => !b.featured).length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
                <div className="grid gap-6">
                  {filteredBlogs
                    .filter((b) => !b.featured)
                    .map((post) => (
                      <Card
                        key={post.id}
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 shadow-md p-4"
                      >
                        <div className="md:flex">
                          <div className="md:w-2/5">
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={400}
                              height={250}
                              className="w-full h-48 md:h-full object-cover rounded-sm"
                            />
                          </div>
                          <div className="md:w-3/5">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge
                                  variant="default"
                                  className="bg-primary hover:bg-primary/90"
                                >
                                  {post.categoryName}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {post.publishedAt}
                                </div>
                              </div>
                              <CardTitle className="text-xl hover:text-primary transition-colors">
                                <Link href={`/company/blog/${post.slug}`}>
                                  {post.title}
                                </Link>
                              </CardTitle>
                              <CardDescription className="text-base mt-2">
                                {post.excerpt}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {post.author.name}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {post.readTime}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    {post.views}
                                  </div>
                                  <div className="flex items-center">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {post.likes}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                asChild
                                variant="ghost"
                                className="p-0 text-primary hover:bg-transparent hover:underline"
                              >
                                <Link href={`/company/blog/${post.slug}`}>
                                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* Load More */}
            {hasMore && filteredBlogs.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                >
                  {loadingMore ? (
                    "Loading..."
                  ) : (
                    <>
                      Load More Articles
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* No results */}
            {filteredBlogs.length === 0 && !loading && (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}