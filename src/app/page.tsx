"use client";

import { SoftwareProductsSection } from "@/components/software/SoftwareProductsSection";
import HeroSection from "@/components/HeroSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import CoursesSection from "@/components/courses/CoursesSection";


export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      {/* SOFTWARE PRODUCTS SECTION */}
      <SoftwareProductsSection />
      {/* Courses Section */}
      <CoursesSection />
      {/* Clients Section */}
      <ClientsSection />
    </div>
  );
}

