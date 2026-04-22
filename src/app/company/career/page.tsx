"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// Job listings data (same as before)
const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "We're looking for an experienced full-stack developer to lead our web development team. You'll work with React, Next.js, Node.js, and PostgreSQL.",
    requirements: [
      "Strong proficiency in React, Next.js, TypeScript",
      "Experience with Node.js and Express",
      "Knowledge of PostgreSQL or similar databases",
      "Understanding of RESTful APIs and modern authentication",
      "Good communication and teamwork skills",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Join our design team to create beautiful, user-friendly interfaces for web and mobile applications. You'll collaborate closely with developers to bring our products.",
    requirements: [
      "Proficiency in Figma, Adobe XD, or similar",
      "Strong portfolio demonstrating UI/UX work",
      "Understanding of user research and usability testing",
      "Experience with design systems and responsive design",
      "Ability to collaborate with developers",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2-3 years",
    description:
      "We need a creative digital marketer to manage our online presence, SEO, social media, and content strategy.",
    requirements: [
      "Experience with SEO, SEM, Google Analytics",
      "Social media management skills",
      "Content creation and copywriting ability",
      "Understanding of email marketing tools",
      "Data-driven mindset",
    ],
  },
  {
    id: 4,
    title: "Software Sales Executive",
    department: "Sales",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "1-3 years",
    description:
      "Drive growth by selling our software solutions to businesses in Bangladesh and internationally.",
    requirements: [
      "Proven sales experience in software/IT",
      "Excellent communication and negotiation skills",
      "Ability to build and maintain client relationships",
      "Self-motivated and target-driven",
      "Basic understanding of software products",
    ],
  },
];

// Form validation schema
const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(11, "Phone number is required"),
  position: z.string().min(1, "Please select a position"),
  coverLetter: z
    .string()
    .min(20, "Cover letter must be at least 20 characters"),
  resume: z.any().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

export default function CareerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
      agreeTerms: false,
    },
  });

  // const onSubmit = async (data: ApplicationForm) => {
  //   setIsSubmitting(true);
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   console.log("Application submitted:", data);
  //   setIsSubmitting(false);
  //   setIsSubmitted(true);
  // };

  // const onSubmit = async (data: ApplicationForm) => {
  //   try {
  //     setIsSubmitting(true);

  //     const response = await fetch(
  //       "https://admin.sbit.com.bd/api/applications",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           full_name: data.fullName,
  //           email: data.email,
  //           phone: data.phone,
  //           position: data.position,
  //           cover_letter: data.coverLetter,
  //           agree_terms: data.agreeTerms,
  //         }),
  //       },
  //     );

  //     const result = await response.json();

  //     if (response.ok && result.status_code === 100) {
  //       setIsSubmitted(true);
  //       form.reset(); // optional reset
  //     } else {
  //       console.error(result);
  //       alert(result.status_message || "Submission failed");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Network error. Try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data: ApplicationForm) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("full_name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("position", data.position);
      formData.append("cover_letter", data.coverLetter);
      formData.append("agree_terms", data.agreeTerms ? "1" : "0");

      // File (IMPORTANT)
      if (data.resume) {
        formData.append("resume", data.resume);
      }

      const res = await fetch("https://admin.sbit.com.bd/api/applications", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || result.status_code !== 100) {
        throw new Error(result?.status_message || "Something went wrong");
      }

      console.log("API Success:", result);

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Application Received!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest in joining our team. We'll review
                your application and get back to you within 5-7 business days.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/">Back to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Open Positions */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
            Open Positions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobOpenings.map((job) => (
              <Card
                key={job.id}
                className="border-0 shadow-lg hover:shadow-xl transition group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-orange-600">
                      {job.title}
                    </CardTitle>
                    <Badge variant="outline" className="bg-orange-100">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.experience}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">
                      Key Requirements:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-orange-500">
                          +{job.requirements.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    onClick={() => {
                      form.setValue("position", job.title);
                      setSelectedJob(job.id);
                      document
                        .getElementById("application-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form - using Shadcn Form */}
      <section id="application-form" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-orange-600">
              Apply Now
            </h2>
            <p className="text-gray-600">
              Fill out the form below to apply for your desired position. We'll
              get back to you soon.
            </p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+880 1XXX XXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position Applying For *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobOpenings.map((job) => (
                                <SelectItem key={job.id} value={job.title}>
                                  {job.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you're a great fit for this role..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume (PDF/DOC) *</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Max 5MB. PDF or Word document.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I confirm that the information provided is accurate
                            and I agree to the{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-orange-500 underline"
                            >
                              privacy policy
                            </Link>{" "}
                            *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
