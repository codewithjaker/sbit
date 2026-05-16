// app/contact/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Navigation,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

// Validation schema – note courseId is a string (but will be sent as number)
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  courseId: z.string().min(1, "Please select a course or service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Type for course options
interface CourseOption {
  id: number;
  title: string;
}

export default function ContactPage() {
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  // Fetch courses for the dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      if (!baseUrl) return;
      try {
        const res = await fetch(`${baseUrl}/courses?page=1`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const json = await res.json();
        const data = json?.data?.data || [];
        setCourses(data.map((c: any) => ({ id: c.id, title: c.title })));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, [baseUrl]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      courseId: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!baseUrl) {
      setSubmissionError("API URL is not configured");
      return;
    }

    setSubmissionError(null);

    // Prepare payload matching API expected fields
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      course_id: Number(data.courseId), // convert to number as API expects integer
      message: data.message,
    };

    try {
      // Note: The example was a GET request but it's clearly a creation endpoint;
      // we'll use POST as it's standard for creating resources.
      const res = await fetch(`${baseUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.status === "error") {
        throw new Error(result.message || "Failed to send message");
      }

      // Success
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Contact form error:", error);
      setSubmissionError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: "Grand Hoque Tower (3rd Floor), Lift Key - 3, Mizan Road, Feni",
      description: "Visit our campus for a free consultation",
    },
    {
      icon: Phone,
      title: "Contact Number",
      details: "+880 1840-241895",
      description: "Mon to Sat, 9:00 AM - 7:00 PM",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: "info@sbit.com.bd",
      description: "Send us your queries anytime",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Saturday - Thursday",
      description: "9:00 AM - 7:00 PM | Friday: Closed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-200 to-primary-300 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Ready to start your journey in tech? Contact us for course details,
            software solutions, or career guidance.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <p className="text-muted-foreground font-medium">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submissionError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{submissionError}</AlertDescription>
                    </Alert>
                  )}

                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting Skill Based IT. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your full name" {...field} />
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
                                    placeholder="Enter your email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="+880 1XXX-XXXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="What is this regarding?"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="courseId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interested In *</FormLabel>
                              {coursesLoading ? (
                                <Skeleton className="h-10 w-full" />
                              ) : (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select a course or service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {courses.map((course) => (
                                      <SelectItem
                                        key={course.id}
                                        value={course.id.toString()}
                                      >
                                        {course.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your requirements..."
                                  rows={5}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90"
                          disabled={
                            form.formState.isSubmitting || !form.formState.isValid
                          }
                        >
                          {form.formState.isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Maps */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feni Campus */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Feni Branch
              </CardTitle>
              <CardDescription>
                Located in the heart of Feni with easy access to public transportation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.869036442005!2d91.39531447517394!3d22.286919739384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acf8a2a7e1c85d%3A0x4a3e267dfddc6b3d!2sFeni%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1698765432100!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Skill Based IT Feni Campus Location"
                  className="w-full h-full min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dhaka Campus */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Dhaka Branch
              </CardTitle>
              <CardDescription>
                Prime location in Mirpur DOHS with modern facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.041240233085!2d90.34908367516766!3d23.778850087198447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78c2a8d1a15%3A0x4b01c8da5d1e3b5f!2sMirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1698765432100!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Skill Based IT Dhaka Campus Location"
                  className="w-full h-full min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Action Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Connect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can't visit in person? We offer multiple ways to get the information you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="text-primary text-2xl" />
                </div>
                <CardTitle>Call Us Directly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Speak with our admission counselors for immediate assistance
                </CardDescription>
                <Button variant="outline" className="w-full">
                  +880 1840-241895
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary text-2xl" />
                </div>
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Send us an email and we'll respond within 24 hours
                </CardDescription>
                <Button variant="outline" className="w-full">
                  info@sbit.com.bd
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="text-primary text-2xl" />
                </div>
                <CardTitle>Free Seminar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Attend our weekly free seminar to learn more about our courses
                </CardDescription>
                <Button onClick={()=> router.push("/company/seminar")} className="w-full bg-primary hover:bg-primary/90">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}