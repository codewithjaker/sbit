"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Code,
  Users,
  Target,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  BookOpen,
  Briefcase,
  Lightbulb,
  Shield,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { TeamSection } from "@/components/about/TeamSection";

export default function AboutPage() {
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

  const milestones = [
    {
      year: "2011",
      event: "Company Founded",
      description: "Started with 5 team members and 2 training courses",
    },
    {
      year: "2012",
      event: "First Enterprise Client",
      description: "Secured major government software project",
    },
    {
      year: "2017",
      event: "Digital Transformation",
      description: "Launched online learning platform during pandemic",
    },
    {
      year: "2020",
      event: "International Recognition",
      description: "Awarded Best IT Training Institute in Bangladesh",
    },
    {
      year: "2021",
      event: "Expansion",
      description: "Opened 3 new branches across the country",
    },
    {
      year: "2025",
      event: "AI Integration",
      description: "Implemented AI-powered learning systems",
    },
  ];

  const stats = [
    { number: "5000+", label: "Students Trained", icon: Users },
    { number: "150+", label: "Software Projects", icon: Code },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "450+", label: "Satisfied Clients", icon: UserCheck },
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Our Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              // className="border-white text-white hover:bg-white hover:text-primary font-semibold"
              className="border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            >
              Meet Our Team
            </Button>
          </div>
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

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="text-primary text-2xl" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">
                    {stat.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg font-semibold">
                    {stat.label}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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

      {/* Team Section */}
      {/* <TeamSection /> */}

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
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                  }`}
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
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Whether you're looking to enhance your skills or develop custom software solutions, 
            we're here to help you succeed in the digital world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Explore Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
