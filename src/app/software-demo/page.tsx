"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Form validation schema
const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  businessName: z.string().min(2, "Company name is required"),
  businessType: z.string().min(2, "Business type is required"),
  address: z.string().optional(),
});

type FormData = z.infer<typeof demoRequestSchema>;
export default function DemoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(demoRequestSchema),
  });

  // const onSubmit = async (data: FormData) => {
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   console.log("Demo request data:", data);
  //   setIsSubmitting(false);
  //   setIsSubmitted(true);

  //   // In production, send to your API
  //   // await fetch('/api/demo-request', { method: 'POST', body: JSON.stringify(data) })
  // };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://admin.sbit.com.bd/api/demo-requests",
        {
          method: "POST", // better than GET for form submission
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            business_name: data.businessName,
            business_type: data.businessType,
            address: data.address || "",
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result.status_code === 100) {
        setIsSubmitted(true);
      } else {
        console.error("API Error:", result);
        alert(result.status_message || "Something went wrong");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Demo Request Received!
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest in our software solutions. Our team
                will contact you within 24 hours to schedule your personalized
                demo.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400"
                >
                  <Link href="/software">Explore Software</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.png" alt="SBIT" width={120} height={48} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-orange-600 hover:bg-orange-600 bg-clip-text text-transparent">
            Schedule a Live Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See our software solutions in action. Get a personalized demo
            tailored to your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  Why Request a Demo?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    See the software in action with a live walkthrough
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Get answers to your specific questions
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Understand how it fits your business needs
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Receive a customized proposal after the demo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r bg-orange-600 hover:bg-orange-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-white/90">
                  ✓ 30-45 minute personalized session
                </p>
                <p className="text-sm text-white/90">
                  ✓ Live Q&A with our product expert
                </p>
                <p className="text-sm text-white/90">
                  ✓ No obligation, just insights
                </p>
                <p className="text-sm text-white/90">
                  ✓ Follow-up with resources and pricing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Business Name */}
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Business"
                        {...register("businessName")}
                      />
                      {errors.businessName && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    {/* Bussiness Type */}
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Input
                        id="businessType"
                        placeholder="Your Business Type"
                        {...register("businessType")}
                      />
                      {errors.businessType && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.businessType.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+880 1XXX XXXXXX"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Your Address"
                        {...register("address")}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r bg-orange-600 hover:bg-orange-600"
                    >
                      {isSubmitting ? "Submitting..." : "Request Demo"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
