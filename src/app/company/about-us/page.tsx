// app/company/about/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Target,
  CheckCircle,
  Lightbulb,
  Shield,
} from "lucide-react";
import Image from "next/image";

// Type for milestone from API
interface MilestoneAPI {
  id: number;
  year: string;
  event: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function AboutPage() {
  const [milestones, setMilestones] = useState<MilestoneAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch milestones from API
  useEffect(() => {
    const fetchMilestones = async () => {
      if (!baseUrl) {
        console.error("Missing API URL");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/about-milestones`);
        if (!res.ok) throw new Error("Failed to fetch milestones");
        const json = await res.json();
        const data = json?.data?.data || [];
        // Sort by sort_order ascending
        const sorted = data.sort((a: MilestoneAPI, b: MilestoneAPI) => a.sort_order - b.sort_order);
        setMilestones(sorted);
      } catch (error) {
        console.error("Error fetching milestones:", error);
        // Keep milestones empty, timeline will show nothing
      } finally {
        setLoading(false);
      }
    };

    fetchMilestones();
  }, [baseUrl]);

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in every project and training program we deliver.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and knowledge sharing across all departments.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Constantly exploring new technologies and methodologies to stay ahead of the curve.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Honest, transparent practices in all our business and educational endeavors.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-200 to-primary-300 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Skill Based IT
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Pioneering software excellence through innovative training and
            cutting-edge development solutions since 2018.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Empowering Through Technology Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                SBIT Services is a promising firm in IT Business, offering web
                application development, web page design, software development,
                and IT training. It started in January 2011. Gradually, we are
                expanding through the inspiration of our valued clients and
                successful students.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                SBIT helps develop products by collecting and analyzing data. We
                craft technologies and specialize in implementing solutions. We
                expertly develop customized technological solutions with 0% room
                for errors. We are your trusted software partner, ready to
                develop and implement ERP solutions across different domains,
                providing customized software solutions for your organization.
                We have grown rapidly by delivering professional solutions that
                provide real business benefits.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Industry-Ready Curriculum
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Hands-On Projects
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Job Placement Support
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary/10 rounded-full"></div>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team Collaboration"
                width={600}
                height={400}
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do, from curriculum
              development to software engineering practices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="text-primary text-2xl" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to becoming a leading software training and
              development institute.
            </p>
          </div>

          {loading ? (
            // Skeleton loader for timeline
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <Card>
                      <CardHeader>
                        <Skeleton className="h-4 w-16 mb-2" />
                        <Skeleton className="h-6 w-32" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          ) : milestones.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit mb-2">
                          {milestone.year}
                        </Badge>
                        <CardTitle className="text-xl">
                          {milestone.event}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No milestones available.</p>
          )}
        </div>
      </section>
    </div>
  );
}