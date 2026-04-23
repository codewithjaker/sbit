"use client";

import { SoftwareProductsSection } from "@/components/software/SoftwareProductsSection";
import HeroSection from "@/components/HeroSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import CoursesSection from "@/components/CoursesSection";


export default function Home() {

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

