"use client";

import { useRouter } from "next/navigation";
import { SoftwareProductsSection } from "@/components/software/software-products";
import HeroSection from "@/components/hero-section";
import { ClientsSection } from "@/components/clients/clients-section";
import CoursesSection from "@/components/CoursesSection";


export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      {/* Courses Section */}
      <CoursesSection />
      {/* SOFTWARE PRODUCTS SECTION */}
      <SoftwareProductsSection />
      {/* Clients Section */}
      <ClientsSection />
    </div>
  );
}

