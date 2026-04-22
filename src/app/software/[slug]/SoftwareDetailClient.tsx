// app/software/[slug]/client.tsx
"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Rocket,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  Award,
  Star,
  Globe,
  Package,
  Smartphone,
  Headphones,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSoftwareProducts, Software } from "@/lib/api/software";

export function SoftwareDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSoftware = async () => {
      try {
        const allSoftware = await getSoftwareProducts();
        const found = allSoftware.find((s: Software) => s.slug === slug);
        setSoftware(found || null);
      } catch (error) {
        console.error("Failed to fetch software:", error);
        setSoftware(null);
      } finally {
        setLoading(false);
      }
    };
    loadSoftware();
  }, [slug]);

  // Comprehensive skeleton that mirrors the page structure
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-orange-50/30 to-white py-8 md:py-8">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-6">
                <Skeleton className="h-6 w-40 rounded-full" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="h-8 w-16 mx-auto mb-1" />
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
              <Skeleton className="aspect-[3/2] rounded-2xl w-full" />
            </div>
          </div>
        </section>

        {/* About Skeleton */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto mb-16">
              <Skeleton className="h-6 w-24 rounded-full mb-6" />
              <Skeleton className="h-10 w-64 mb-4" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Problem Skeleton */}
        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <Skeleton className="h-6 w-32 rounded-full mb-6" />
              <Skeleton className="h-10 w-64 mb-6" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </section>

        {/* What We Build Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto mb-16">
              <Skeleton className="h-6 w-32 rounded-full mb-6" />
              <Skeleton className="h-10 w-64 mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Rest of skeleton for brevity – a few more sections */}
        <div className="py-20 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!software) {
    notFound();
  }

  const {
    name,
    heroImage,
    hero,
    about,
    problem,
    whatWeBuild,
    keyFeatures,
    techStack,
    whyChooseUs,
    howWeWork,
    clients,
    support,
    faq,
  } = software;

  // Helper function to pick icon by index
  const getIcon = (idx: number, type: "whatWeBuild" | "whyChooseUs" | "support") => {
    if (type === "whatWeBuild") {
      const icons = [Globe, Package, Shield, Smartphone];
      return icons[idx % icons.length];
    }
    if (type === "whyChooseUs") {
      const icons = [Shield, Users, TrendingUp, Zap, Headphones, Award, CreditCard];
      return icons[idx % icons.length];
    }
    if (type === "support") {
      const icons = [Clock, Users, TrendingUp];
      return icons[idx % icons.length];
    }
    return Globe;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-orange-50/30 to-white py-8 md:py-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                🚀 Enterprise‑Grade Solution
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-2xl md:text-3xl text-orange-600">
                {hero.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {hero.buttons.map((btn, idx) => (
                  <Button
                    key={idx}
                    size="lg"
                    asChild
                    className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all text-white border-0 group"
                  >
                    <a href={btn.link}>
                      {btn.text}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                {hero.statistics.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-orange-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={heroImage}
                  alt={name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-justify mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              {about.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{about.mission}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{about.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-justify">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              The Challenge
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">
              {problem.title}
            </h2>
            <div className="relative pl-6 border-l-4 border-orange-500">
              <p className="whitespace-pre-line text-gray-600 leading-relaxed text-lg">
                {problem.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-justify max-w-7xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              What We Build
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              {whatWeBuild.title}
            </h2>
            <p className="text-lg text-gray-600">{whatWeBuild.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeBuild.components.map((comp, idx) => {
              const IconComponent = getIcon(idx, "whatWeBuild");
              return (
                <Card
                  key={idx}
                  className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-200"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl">{comp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{comp.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-justify max-w-7xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              Key Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              {keyFeatures.title}
            </h2>
            <p className="text-lg text-gray-600">{keyFeatures.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    {feature.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-orange-500 mt-1">✦</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-justify max-w-7xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              Technology Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              {techStack.title}
            </h2>
            <p className="text-lg text-gray-600">{techStack.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techStack.categories.map((cat, idx) => (
              <Card
                key={idx}
                className="text-center hover:shadow-lg transition-all bg-white border border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">
                    {cat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-500">
                    {cat.technologies.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* See It in Action */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-justify max-w-7xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              Live Projects
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              See Our Live Projects
            </h2>
            <p className="text-lg text-gray-600">
              Real‑world deployments – click to explore live demos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {software.screenshots.map((screenshot, idx) => (
              <Link
                key={idx}
                href={screenshot.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 pt-0">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                      <span className="text-white font-semibold flex items-center gap-1">
                        View Demo <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">
                      {screenshot.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-orange-600">
            {whyChooseUs.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.reasons.map((reason, idx) => {
              const IconComponent = getIcon(idx, "whyChooseUs");
              return (
                <Card
                  key={idx}
                  className="border-0 shadow-lg hover:shadow-xl transition-all group hover:border-b-2 hover:border-orange-500"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-justify max-w-7xl mx-auto mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              {howWeWork.title}
            </h2>
            <p className="text-lg text-gray-600">{howWeWork.description}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howWeWork.steps.map((step) => (
              <Card
                key={step.step}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
              Trusted by Industry Leaders
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {clients.logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="w-24 h-24 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                >
                  <img
                    src={logo}
                    alt={`Client ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-orange-500 fill-orange-500" />
              What Our Clients Say
              <Star className="h-6 w-6 text-orange-500 fill-orange-500" />
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.testimonials.map((testimonial, idx) => (
                <Card
                  key={idx}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.avatar && (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-orange-400 fill-orange-400"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">
                      "{testimonial.review}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support & SLA */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-orange-600">
            {support.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {support.items.map((item, idx) => {
              const IconComponent = getIcon(idx, "support");
              return (
                <Card
                  key={idx}
                  className="border-0 shadow-lg text-center hover:shadow-xl transition-all bg-white"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faq.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border rounded-lg px-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-gray-800">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Get a free consultation and see how our software can accelerate your
            growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Book Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-orange-600 transition-all shadow-lg hover:scale-105"
            >
              See a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}