// app/software-demo/page.tsx
"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitDemoRequest } from "@/services/demo-request.service";
import type { DemoRequestPayload } from "@/types/demo-request";

// ---------- Schema ----------
const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  businessName: z.string().min(2, "Company name is required"),
  businessType: z.string().min(2, "Business type is required"),
  address: z.string().optional(),
});

type FormData = z.infer<typeof demoRequestSchema>;

// ---------- Inner component that uses useSearchParams ----------
function DemoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(demoRequestSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: DemoRequestPayload = {
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      business_name: data.businessName,
      business_type: data.businessType,
      address: data.address || "",
      // product_slug: preselectedProduct || undefined, // uncomment if API accepts it
    };

    try {
      await submitDemoRequest(payload);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Demo request error:", error);
      setSubmitError(error.message || "Failed to submit demo request.");
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
              <h1 className="text-3xl font-bold mb-4">Demo Request Received!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest in our software solutions. Our team will
                contact you within 24 hours to schedule your personalized demo.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-red-700 via-orange-600 to-yellow-400">
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
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/logo.png" alt="SBIT" width={120} height={48} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
            Schedule a Live Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See our software solutions in action. Get a personalized demo tailored to
            your business needs.
          </p>
          {preselectedProduct && (
            <p className="text-sm text-muted-foreground mt-2">
              Requesting demo for: <span className="font-semibold">{preselectedProduct}</span>
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Benefits */}
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
                  <p className="text-sm">See the software in action with a live walkthrough</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Get answers to your specific questions</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Understand how it fits your business needs</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Receive a customized proposal after the demo</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-orange-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-white/90">✓ 30-45 minute personalized session</p>
                <p className="text-sm text-white/90">✓ Live Q&A with our product expert</p>
                <p className="text-sm text-white/90">✓ No obligation, just insights</p>
                <p className="text-sm text-white/90">✓ Follow-up with resources and pricing</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" placeholder="John Doe" {...register("fullName")} />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input id="businessName" placeholder="Your Business" {...register("businessName")} />
                      {errors.businessName && (
                        <p className="text-sm text-red-500 mt-1">{errors.businessName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Input id="businessType" placeholder="Your Business Type" {...register("businessType")} />
                      {errors.businessType && (
                        <p className="text-sm text-red-500 mt-1">{errors.businessType.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@company.com" {...register("email")} />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" placeholder="+880 1XXX XXXXXX" {...register("phone")} />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Your Address" {...register("address")} />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-600 hover:bg-orange-700"
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

// ---------- Page wrapper with Suspense ----------
export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <DemoForm />
    </Suspense>
  );
}