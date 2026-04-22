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
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  ChevronRight,
  BookOpen,
  Eye,
  ThumbsUp,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "@/data/blog";

const categories = [
  "All",
  "Web Development",
  "React",
  "Backend",
  "Design",
  "DevOps",
  "Mobile",
  "Accessibility",
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);

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
          <div className="lg:w-3/4">
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
                                {post.category}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                            </div>
                            <CardTitle className="text-xl hover:text-primary transition-colors">
                              {/* <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link> */}
                              <Link href={`/company/blog/${post.id}`}>
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
                              {/* <Link href={`/blog/${post.slug}`}>
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                              </Link> */}
                              <Link href={`/company/blog/${post.id}`}>
                                Read More{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
              >
                Load More Articles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            {/* Categories */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-between text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {category}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
                    .slice(0, 15)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-purple-600/5">
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest articles and tutorials delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Enter your email"
                  className="bg-background"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start space-x-3 group cursor-pointer"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={60}
                      height={40}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/company/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
