import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Share2, Eye, Bookmark, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock blog posts data - in real app, this would come from CMS or API
const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development: Next.js 14 and Beyond",
    excerpt: "Exploring the latest features in Next.js 14 and how they're shaping modern web development practices.",
    content: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 represents a significant leap forward in the React ecosystem, introducing powerful new features that are changing how we build web applications. With the stable release of the App Router and Server Components, developers now have more tools than ever to create high-performance applications.</p>
      
      <h3>Key Features in Next.js 14</h3>
      <p>The latest version brings several groundbreaking features:</p>
      
      <h4>Server Actions</h4>
      <p>Server Actions allow you to write server-side code that can be called directly from your React components. This eliminates the need for API routes for simple data mutations and provides a more integrated development experience.</p>
      
      <h4>Improved Performance</h4>
      <p>With enhanced static generation and dynamic rendering optimizations, Next.js 14 offers even better performance out of the box. The new Turbopack bundler in development mode provides lightning-fast refresh times.</p>
      
      <h4>Enhanced Developer Experience</h4>
      <p>Better error handling, improved TypeScript support, and more intuitive routing make development smoother and more productive.</p>
      
      <h2>Real-World Applications</h2>
      <p>At MoonTech, we've already started implementing Next.js 14 in our client projects. The results have been impressive:</p>
      
      <ul>
        <li>40% faster page loads</li>
        <li>Reduced bundle sizes by 25%</li>
        <li>Improved SEO performance</li>
        <li>Better developer productivity</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>If you're new to Next.js 14, we recommend starting with the official documentation and exploring the new App Router paradigm. Our Full-Stack Web Development course now includes comprehensive coverage of Next.js 14 features.</p>
    `,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Michael Chen",
      role: "Senior Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    views: 1247,
    featured: true
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Patterns for Enterprise Applications",
    excerpt: "Deep dive into advanced TypeScript patterns that can help scale your applications and improve code quality.",
    content: `
      <h2>Why TypeScript Matters for Enterprise</h2>
      <p>TypeScript has become the de facto standard for large-scale JavaScript applications. Its type system not only catches errors at compile time but also serves as living documentation for your codebase.</p>
      
      <h3>Advanced Type Patterns</h3>
      
      <h4>Conditional Types</h4>
      <p>Conditional types allow you to create types that depend on other types. This powerful feature enables sophisticated type transformations and utility types.</p>
      
      <h4>Template Literal Types</h4>
      <p>With template literal types, you can create complex string literal types that are incredibly useful for API route typing, CSS-in-JS libraries, and more.</p>
      
      <h4>Branded Types</h4>
      <p>Learn how to create branded types to prevent primitive type confusion and enforce type safety across your domain models.</p>
      
      <h2>Best Practices at MoonTech</h2>
      <p>Our team has developed several best practices for TypeScript in enterprise environments:</p>
      
      <ul>
        <li>Strict mode enabled by default</li>
        <li>Comprehensive type coverage requirements</li>
        <li>Custom utility types for common patterns</li>
        <li>Automated type checking in CI/CD</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Sarah Johnson",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Programming",
    tags: ["TypeScript", "Enterprise", "Best Practices"],
    views: 892,
    featured: true
  },
  {
    id: "3",
    title: "The Rise of AI in Software Development: Tools and Trends 2024",
    excerpt: "How artificial intelligence is transforming the software development lifecycle and what tools you should be using.",
    content: `
      <h2>AI-Powered Development Tools</h2>
      <p>The integration of AI in development tools is no longer a luxury but a necessity for staying competitive. From code completion to automated testing, AI is revolutionizing how we write software.</p>
      
      <h3>Must-Have AI Tools</h3>
      
      <h4>GitHub Copilot</h4>
      <p>GitHub Copilot has evolved from a simple code completion tool to a comprehensive AI pair programmer. It now supports entire code blocks, test generation, and even documentation.</p>
      
      <h4>AI-Assisted Code Reviews</h4>
      <p>Tools like SonarQube with AI capabilities can now detect complex code smells and suggest improvements that go beyond traditional static analysis.</p>
      
      <h4>Automated Testing with AI</h4>
      <p>AI-powered testing tools can generate test cases, identify edge cases, and even maintain test suites as your codebase evolves.</p>
      
      <h2>Impact on Development Workflow</h2>
      <p>At MoonTech, we've observed significant improvements in developer productivity and code quality after integrating AI tools:</p>
      
      <ul>
        <li>30% reduction in development time</li>
        <li>40% fewer bugs in production</li>
        <li>Improved code consistency</li>
        <li>Faster onboarding for new developers</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Robert Kim",
      role: "AI Research Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Machine Learning", "Development Tools"],
    views: 1563,
    featured: true
  },
  {
    id: "4",
    title: "Building Scalable Microservices with Node.js and Docker",
    excerpt: "A comprehensive guide to designing and implementing microservices architecture using modern tools and practices.",
    content: `
      <h2>Microservices Architecture Fundamentals</h2>
      <p>Microservices have become the standard for building large-scale, maintainable applications. However, implementing them correctly requires careful planning and the right tools.</p>
      
      <h3>Key Components</h3>
      
      <h4>Service Discovery</h4>
      <p>Implementing robust service discovery is crucial for microservices communication. We'll explore patterns using Consul and Eureka.</p>
      
      <h4>API Gateway</h4>
      <p>Learn how to implement an API gateway using Node.js and Express to handle routing, authentication, and rate limiting.</p>
      
      <h4>Containerization with Docker</h4>
      <p>Docker provides the perfect environment for microservices. We'll cover multi-stage builds, container orchestration, and best practices.</p>
      
      <h2>Real-World Implementation</h2>
      <p>Our experience at MoonTech has taught us several valuable lessons about microservices:</p>
      
      <ul>
        <li>Start with a monolith and extract services gradually</li>
        <li>Implement comprehensive monitoring from day one</li>
        <li>Use contract testing to ensure service compatibility</li>
        <li>Plan for failure with circuit breakers and retry mechanisms</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "James Anderson",
      role: "DevOps Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-01-08",
    readTime: "12 min read",
    category: "Backend Development",
    tags: ["Microservices", "Node.js", "Docker", "Architecture"],
    views: 734,
    featured: false
  },
  {
    id: "5",
    title: "UI/UX Design Trends That Will Dominate 2024",
    excerpt: "Discover the latest design trends and how they're influencing user experience across digital platforms.",
    content: `
      <h2>Emerging Design Trends</h2>
      <p>As we move further into 2024, several design trends are shaping how users interact with digital products. Understanding these trends is crucial for creating engaging user experiences.</p>
      
      <h3>Key Trends to Watch</h3>
      
      <h4>Neumorphism and Glass Morphism</h4>
      <p>These design styles continue to evolve, offering fresh takes on skeuomorphism that work well with modern interfaces.</p>
      
      <h4>Dark Mode Excellence</h4>
      <p>Dark mode is no longer an afterthought. Learn how to implement it properly with attention to contrast, readability, and brand consistency.</p>
      
      <h4>Voice User Interface (VUI)</h4>
      <p>With the rise of smart devices, VUI design is becoming increasingly important for creating seamless multi-modal experiences.</p>
      
      <h2>Implementation at MoonTech</h2>
      <p>Our design team has been experimenting with these trends in client projects:</p>
      
      <ul>
        <li>Improved user engagement with personalized dark modes</li>
        <li>30% faster task completion with optimized VUI</li>
        <li>Higher conversion rates with trend-aligned interfaces</li>
        <li>Better accessibility through thoughtful design choices</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Lisa Wang",
      role: "Lead UX Designer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Design",
    tags: ["UI/UX", "Design Trends", "User Experience"],
    views: 1023,
    featured: true
  }
];

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <article className="mb-12">
          {/* Category and Featured Badge */}
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{post.author.name}</p>
                  <p className="text-muted-foreground">{post.author.role}</p>
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
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${relatedPost.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedPost.readTime}</span>
                        <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        {/* <Card className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Tech Journey?</h2>
            <p className="mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our industry-focused training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/courses">
                  Explore Courses
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground" asChild>
                <Link href="/contact">
                  Get Consultation
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

// Generate static params for SSG
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} | MoonTech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}