"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Coffee,
  Wifi,
  Users,
  Info,
  Navigation,
} from "lucide-react";

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  course: z.string().min(1, "Please select a course or service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      course: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form data:", data);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 5000);
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

  const courses = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Mobile App Development",
    "Data Science",
    "UI/UX Design",
    "DevOps & Cloud",
    "Software Project Management",
    "Career Consultation",
    "Other",
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
                  <CardTitle className="text-2xl">
                    Contact Information
                  </CardTitle>
                  {/* <CardDescription>
                    Get in touch with us through any of the following channels
                  </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-primary text-lg" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{info.title}</h3>
                        <p className="text-muted-foreground font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">
                      Why Choose Skill Based IT?
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Government Approved Courses
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Industry Expert Mentors</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Job Placement Assistance
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Free Career Counseling</span>
                      </div>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form & Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  {/* <CardDescription>
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting Skill Based IT. We'll get back
                        to you soon.
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
                                  <Input
                                    placeholder="Enter your full name"
                                    {...field}
                                  />
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
                                  <Input
                                    placeholder="+880 1840-241895"
                                    {...field}
                                  />
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
                          name="course"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interested In *</FormLabel>
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
                                    <SelectItem key={course} value={course}>
                                      {course}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                              {/* <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Minimum 10 characters</span>
                                <span>{field.value.length}/500</span>
                              </div> */}
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90"
                          disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid
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

                        {/* <p className="text-sm text-muted-foreground text-center">
                          By submitting this form, you agree to our privacy
                          policy and terms of service.
                        </p> */}
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>

              {/* Map Section */}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feni Campus */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Feni Branch
              </CardTitle>
              <CardDescription>
                Located in the heart of Feni with easy access to public
                transportation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">
                    Campus Address
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Grand Hoque Tower (3rd Floor)
                    <br />
                    Lift Key - 3, Mizan Road
                    <br />
                    Feni, Bangladesh
                    <br />
                    Postal Code: 4500
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">
                    Transportation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Bus
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        5 min walk from main station
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        CNG
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Available at campus gate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Parking
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Free for students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Open Hours:</span>
                    <span className="text-muted-foreground">
                      9:00 AM - 8:00 PM
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div> */}
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
            <CardContent className="space-y-4">
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
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">
                    Campus Address
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    House #535, Road #8, Avenue #6
                    <br />
                    Mirpur DOHS, Dhaka
                    <br />
                    Bangladesh
                    <br />
                    Postal Code: 1216
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">
                    Transportation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Metro
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        10 min from Mirpur-10 station
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Bus
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Multiple routes available
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        Parking
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Secure parking facility
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Open Hours:</span>
                    <span className="text-muted-foreground">
                      8:00 AM - 9:00 PM
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div> */}
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
              Can't visit in person? We offer multiple ways to get the
              information you need.
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
                <Button className="w-full bg-primary hover:bg-primary/90">
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
