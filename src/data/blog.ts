// Mock blog data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Next.js 15 and Beyond",
    excerpt: "Explore the latest features in Next.js 15 and how they're shaping the future of React development with server components and enhanced performance.",
    content: "Next.js 15 introduces groundbreaking features that are revolutionizing how we build web applications...",
    author: {
      name: "Michael Chen",
      role: "Senior Full-Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-12-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    views: 1247,
    likes: 89,
    slug: "future-of-web-development-nextjs-15"
  },
  {
    id: "2",
    title: "Mastering State Management in React Applications",
    excerpt: "A comprehensive guide to choosing and implementing the right state management solution for your React projects.",
    content: "State management is crucial for building scalable React applications. Let's explore the options...",
    author: {
      name: "Sarah Johnson",
      role: "Frontend Architect",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-12-10",
    readTime: "12 min read",
    category: "React",
    tags: ["React", "State Management", "Zustand", "Redux"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    views: 892,
    likes: 67,
    slug: "mastering-state-management-react"
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js and TypeScript",
    excerpt: "Learn how to build robust, type-safe APIs using Node.js and TypeScript with best practices for scalability.",
    content: "TypeScript brings type safety to Node.js development, making your APIs more reliable and maintainable...",
    author: {
      name: "David Wilson",
      role: "Backend Engineer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-12-05",
    readTime: "10 min read",
    category: "Backend",
    tags: ["Node.js", "TypeScript", "API", "Backend"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    views: 756,
    likes: 45,
    slug: "building-scalable-apis-nodejs-typescript"
  },
  {
    id: "4",
    title: "UI/UX Design Principles for Developers",
    excerpt: "Essential design principles every developer should know to create better user experiences.",
    content: "Understanding basic design principles can significantly improve the usability of your applications...",
    author: {
      name: "Lisa Wang",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-11-28",
    readTime: "6 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "User Experience", "Figma"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    views: 1123,
    likes: 78,
    slug: "ui-ux-design-principles-developers"
  },
  {
    id: "6",
    title: "Mobile App Performance Optimization Techniques",
    excerpt: "Advanced techniques to optimize your React Native and Flutter applications for better performance.",
    content: "Performance is crucial for mobile apps. Learn how to identify and fix common performance issues...",
    author: {
      name: "Emily Rodriguez",
      role: "Mobile Developer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-11-15",
    readTime: "11 min read",
    category: "Mobile",
    tags: ["React Native", "Flutter", "Performance", "Mobile"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    views: 987,
    likes: 63,
    slug: "mobile-app-performance-optimization"
  },
  {
    id: "7",
    title: "The Rise of AI in Software Development",
    excerpt: "How artificial intelligence is transforming the way we write, test, and deploy code.",
    content: "AI tools are becoming indispensable in modern software development workflows...",
    author: {
      name: "Dr. Robert Kim",
      role: "AI Research Scientist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-11-10",
    readTime: "14 min read",
    category: "AI & ML",
    tags: ["AI", "Machine Learning", "Development", "Future"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: false,
    views: 1567,
    likes: 124,
    slug: "rise-of-ai-software-development"
  },
  {
    id: "8",
    title: "Building Accessible Web Applications",
    excerpt: "A practical guide to implementing web accessibility standards in your projects.",
    content: "Web accessibility is not just a legal requirement but a moral imperative...",
    author: {
      name: "Maria Gonzalez",
      role: "Accessibility Specialist",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    date: "2024-11-05",
    readTime: "7 min read",
    category: "Accessibility",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "Web"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    featured: true,
    views: 723,
    likes: 41,
    slug: "building-accessible-web-applications"
  }
];