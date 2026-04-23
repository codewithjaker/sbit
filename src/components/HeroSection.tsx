// components/hero-section.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Sparkles,
  Code,
  Users,
  Award,
  Zap,
  UserCheck,
  Briefcase,
} from "lucide-react";
import Image from "next/image";

// Helper to parse potentially double-encoded JSON
function safeJsonParse<T>(value: string | null | undefined, defaultValue: T): T {
  if (!value) return defaultValue;
  try {
    const parsed = JSON.parse(value);
    // If the result is still a string, parse again
    if (typeof parsed === "string") {
      return JSON.parse(parsed);
    }
    return parsed;
  } catch {
    return defaultValue;
  }
}

// Types for the API response
interface HeroSectionAPI {
  id: number;
  badge_text: string;
  heading: string;
  sub_heading: string;
  typed_words: string;
  cta: string;
  stats: string;
  features: string;
  hero_image: string;
  created_at: string;
  updated_at: string;
}

interface CTA {
  primary?: {
    text: string;
    link: string;
  };
  secondary?: {
    text: string;
    link: string;
  };
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Feature {
  title: string;
  description: string;
}

// Map icon string to Lucide icon component
const iconMap: Record<string, any> = {
  user: Users,
  users: Users,
  briefcase: Briefcase,
  code: Code,
  sparkles: Sparkles,
  award: Award,
  zap: Zap,
  "user-check": UserCheck,
};

// Default fallback data
const DEFAULT_WORDS = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Next.js & React",
  "TypeScript",
  "Node.js & Express",
  "UI/UX Design",
  "Mobile Development",
  "DevOps & CI/CD",
];

const DEFAULT_STATS: Stat[] = [
  { value: "5000+", label: "Students Trained", icon: "users" },
  { value: "98%", label: "Success Rate", icon: "sparkles" },
  { value: "400+", label: "Projects Completed", icon: "code" },
  { value: "450+", label: "Satisfied Clients", icon: "user-check" },
];

const DEFAULT_CTA: CTA = {
  primary: { text: "Explore Courses", link: "/courses" },
};

export default function HeroSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<HeroSectionAPI | null>(null);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      if (!baseUrl) {
        console.error("Missing API URL");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/get-hero-section`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        const data = json?.data?.data?.[0] || null;
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [baseUrl]);

  // Parse data safely using helper
  const words: string[] = safeJsonParse(heroData?.typed_words, DEFAULT_WORDS);
  const stats: Stat[] = safeJsonParse(heroData?.stats, DEFAULT_STATS);
  const cta: CTA = safeJsonParse(heroData?.cta, DEFAULT_CTA);
  const features: Feature[] = safeJsonParse(heroData?.features, []);

  // Build full image URL
  const heroImage = heroData?.hero_image
    ? (heroData.hero_image.startsWith("http")
        ? heroData.hero_image
        : `${imageBasePath}${heroData.hero_image}`)
    : "/hero.png";

  const badgeText = heroData?.badge_text || "Top Rated IT Institute in Feni";
  const headingText = heroData?.heading || "Master Modern";
  const subHeadingText =
    heroData?.sub_heading ||
    "Transform your career with industry-leading software training and custom software solutions. Get certified, build real projects, and land your dream job.";

  // Typing animation effect
  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[currentWordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    if (!isDeleting && typedText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
      return;
    }

    if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentWord.substring(0, typedText.length - 1)
          : currentWord.substring(0, typedText.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex, words]);

  // Skeleton loading
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-purple-600 text-white">
        <div className="container relative mx-auto px-4 py-14 lg:py-14">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <Skeleton className="h-8 w-48 bg-white/20 rounded-full" />
              <Skeleton className="h-16 w-3/4 bg-white/20" />
              <Skeleton className="h-20 w-full bg-white/20" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 bg-white/20 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 bg-white/20 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <Skeleton className="aspect-video w-full bg-white/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-purple-600 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 animate-float delay-300">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-14 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">{badgeText}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {headingText} <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 animate-gradient">
                    {typedText}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-white/90 leading-relaxed">
                {subHeadingText}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {cta.primary && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg cursor-pointer"
                      onClick={() => router.push(cta.primary!.link)}
                    >
                      <span>{cta.primary.text}</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                )}

                {cta.secondary && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                      onClick={() => router.push(cta.secondary!.link)}
                    >
                      <span>{cta.secondary.text}</span>
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const IconComponent = iconMap[stat.icon] || Users;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-4 h-4 text-yellow-300" />
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={heroImage}
                    alt="Hero Illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Card 1 */}
              {features[0] && (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -top-4 -left-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-2xl z-20 w-48"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Code className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {features[0].title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {features[0].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Floating Card 2 */}
              {features[1] && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-2xl z-20 w-56"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {features[1].title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {features[1].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Animated Orbit Circles */}
              <div className="absolute -top-10 -right-10 w-64 h-64 border border-white/20 rounded-full animate-spin-slow">
                <div className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full transform -translate-y-1/2" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 border border-white/10 rounded-full animate-spin-slow-reverse">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-white/50 rounded-full transform -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}