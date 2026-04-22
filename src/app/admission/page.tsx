

// app/admission/page.tsx
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ArrowRight,
  CheckCircle,
  Code,
  BookOpen,
  User,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

// API response types
interface CourseAPI {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: number;
}

interface CoursesResponse {
  status_code: number;
  data: {
    data: CourseAPI[];
    current_page: number;
    last_page: number;
  };
}

// Updated schema to match API expected fields
const admissionSchema = z.object({
  // Personal Information
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  dateOfBirth: z.date({ message: "Please select your date of birth" }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender",
  }),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Zip code is required"),

  // Educational Background
  educationLevel: z.string().min(1, "Please select your education level"),
  institution: z.string().min(2, "Institution name is required"),
  passingYear: z
    .string()
    .min(4, "Passing year is required")
    .max(4, "Passing year must be 4 digits"),
  grade: z.string().min(1, "Grade/CGPA is required"),

  // Course Selection
  courseId: z.string().min(1, "Please select a course"),
  preferredBatch: z.string().min(1, "Please select preferred batch timing"),
  previousExperience: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  experienceDetails: z.string().optional(),

  // Emergency Contact
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(11, "Emergency phone number is required"),
  emergencyRelation: z.string().min(2, "Relationship is required"),

  // Agreement
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  agreeToPayment: z.boolean().refine((val) => val === true, {
    message: "You must agree to the payment terms",
  }),
  receiveUpdates: z.boolean().default(true),
});

type AdmissionForm = z.infer<typeof admissionSchema>;

// Helper to format duration from minutes
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
}

export default function AdmissionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [courses, setCourses] = useState<CourseAPI[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      if (!baseUrl) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/courses?page=1`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const json: CoursesResponse = await res.json();
        const coursesData = json?.data?.data || [];
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [baseUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues,
    reset,
  } = useForm<AdmissionForm>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      receiveUpdates: true,
      previousExperience: "no",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: BookOpen },
    { number: 3, title: "Course Selection", icon: Code },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
  ];

  const educationLevels = [
    "SSC / O-Levels",
    "HSC / A-Levels",
    "Diploma",
    "Bachelor",
    "Masters",
    "PhD",
  ];

  const batchTimings = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (2:00 PM - 5:00 PM)",
    "Evening (6:00 PM - 9:00 PM)",
    "Weekend (Friday & Saturday)",
  ];

  const onSubmit = async (data: AdmissionForm) => {
    if (!baseUrl) {
      setSubmitError("API URL not configured");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Map form data to API expected shape
    const payload = {
      name: data.name,
      phone: data.phone,
      date_of_birth: data.dateOfBirth.toISOString(),
      gender: data.gender,
      email: data.email,
      address: data.address,
      city: data.city,
      zip_code: data.zipCode,
      education_level: data.educationLevel,
      institution: data.institution,
      passing_year: parseInt(data.passingYear),
      grade: data.grade,
      course_id: parseInt(data.courseId),
      preferred_batch: data.preferredBatch,
      previous_experience: data.previousExperience,
      experience_details: data.experienceDetails || "",
      emergency_name: data.emergencyName,
      emergency_phone: data.emergencyPhone,
      emergency_relation: data.emergencyRelation,
      agree_to_terms: data.agreeToTerms,
      agree_to_payment: data.agreeToPayment,
      receive_updates: data.receiveUpdates,
    };

    try {
      const res = await fetch(`${baseUrl}/admissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.status_code !== 100) {
        throw new Error(result.status_message || "Submission failed");
      }

      setSubmitSuccess(true);
      // Optionally reset form or redirect
      reset();
      setTimeout(() => router.push("/"), 2000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof AdmissionForm)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "name",
          "email",
          "phone",
          "dateOfBirth",
          "gender",
          "address",
          "city",
          "zipCode",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "educationLevel",
          "institution",
          "passingYear",
          "grade",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "courseId",
          "preferredBatch",
          "previousExperience",
          "emergencyName",
          "emergencyPhone",
          "emergencyRelation",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const selectedCourseData = courses.find(
    (course) => course.id.toString() === watchedValues.courseId
  );

  // Show success state
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for applying. We will review your application and contact you soon.
              </p>
              <Button onClick={() => router.push("/")} size="lg">
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admission Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey in IT with Skill Based Information Technology.
            Fill out the form below to apply for your desired course.
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;

                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="flex items-center w-full">
                      {index > 0 && (
                        <div
                          className={cn(
                            "flex-1 h-1 transition-colors",
                            isCompleted ? "bg-primary" : "bg-gray-300"
                          )}
                        />
                      )}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          isCompleted
                            ? "bg-primary text-white"
                            : isCurrent
                              ? "bg-primary text-white ring-4 ring-primary/20"
                              : "bg-gray-300 text-gray-600"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-1 transition-colors",
                            isCompleted ? "bg-primary" : "bg-gray-300"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium mt-2 text-center",
                        isCurrent ? "text-primary" : "text-gray-500"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader className="border-b text-white">
            <CardTitle className="text-2xl flex items-center gap-2 text-gray-800">
              <User className="w-6 h-6" />
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Educational Background"}
              {currentStep === 3 && "Course Selection"}
              {currentStep === 4 && "Review & Submit"}
            </CardTitle>
            <CardDescription className="text-white/90">
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your full name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your.email@example.com"
                          className={cn(
                            "pl-10",
                            errors.email && "border-destructive"
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="01XXXXXXXXX"
                          className={cn(
                            "pl-10",
                            errors.phone && "border-destructive"
                          )}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !watchedValues.dateOfBirth &&
                              "text-muted-foreground",
                              errors.dateOfBirth && "border-destructive"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {watchedValues.dateOfBirth ? (
                              format(watchedValues.dateOfBirth, "PPP")
                            ) : (
                              <span>Pick your date of birth</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={watchedValues.dateOfBirth}
                            onSelect={(date) => setValue("dateOfBirth", date!)}
                            captionLayout="dropdown"
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dateOfBirth && (
                        <p className="text-sm text-destructive">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Gender *</Label>
                      <RadioGroup
                        value={watchedValues.gender}
                        onValueChange={(value) =>
                          setValue(
                            "gender",
                            value as "male" | "female" | "other"
                          )
                        }
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                      {errors.gender && (
                        <p className="text-sm text-destructive">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          {...register("address")}
                          placeholder="Enter your full address"
                          className={cn(
                            "pl-10",
                            errors.address && "border-destructive"
                          )}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-sm text-destructive">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        placeholder="Enter your city"
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code *</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        placeholder="Enter zip code"
                        className={errors.zipCode ? "border-destructive" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive">
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Educational Background */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">
                      Highest Education Level *
                    </Label>
                    <Select
                      value={watchedValues.educationLevel}
                      onValueChange={(value) =>
                        setValue("educationLevel", value)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.educationLevel ? "border-destructive" : ""
                        )}
                      >
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.educationLevel && (
                      <p className="text-sm text-destructive">
                        {errors.educationLevel.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution Name *</Label>
                    <Input
                      id="institution"
                      {...register("institution")}
                      placeholder="Enter your school/college/university name"
                      className={errors.institution ? "border-destructive" : ""}
                    />
                    {errors.institution && (
                      <p className="text-sm text-destructive">
                        {errors.institution.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passingYear">Year of Passing *</Label>
                      <Input
                        id="passingYear"
                        {...register("passingYear")}
                        placeholder="YYYY"
                        maxLength={4}
                        className={
                          errors.passingYear ? "border-destructive" : ""
                        }
                      />
                      {errors.passingYear && (
                        <p className="text-sm text-destructive">
                          {errors.passingYear.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade/CGPA *</Label>
                      <Input
                        id="grade"
                        {...register("grade")}
                        placeholder="e.g., 4.50, A+, 85%"
                        className={errors.grade ? "border-destructive" : ""}
                      />
                      {errors.grade && (
                        <p className="text-sm text-destructive">
                          {errors.grade.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Course Selection */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="courseId">Select Course *</Label>
                        <Select
                          value={watchedValues.courseId}
                          onValueChange={(value) => {
                            setValue("courseId", value);
                            setSelectedCourse(value);
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              "w-full",
                              errors.courseId ? "border-destructive" : ""
                            )}
                          >
                            <SelectValue placeholder="Choose your desired course" />
                          </SelectTrigger>
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
                        {errors.courseId && (
                          <p className="text-sm text-destructive">
                            {errors.courseId.message}
                          </p>
                        )}
                      </div>

                      {selectedCourseData && (
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">
                              {selectedCourseData.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {selectedCourseData.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {formatDuration(selectedCourseData.duration)}
                              </span>
                              <span>Level: {selectedCourseData.level}</span>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="preferredBatch">
                      Preferred Batch Timing *
                    </Label>
                    <Select
                      value={watchedValues.preferredBatch}
                      onValueChange={(value) =>
                        setValue("preferredBatch", value)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.preferredBatch ? "border-destructive" : ""
                        )}
                      >
                        <SelectValue placeholder="Select batch timing" />
                      </SelectTrigger>
                      <SelectContent>
                        {batchTimings.map((batch) => (
                          <SelectItem key={batch} value={batch}>
                            {batch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.preferredBatch && (
                      <p className="text-sm text-destructive">
                        {errors.preferredBatch.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>
                      Do you have previous experience in this field? *
                    </Label>
                    <RadioGroup
                      value={watchedValues.previousExperience}
                      onValueChange={(value) =>
                        setValue("previousExperience", value as "yes" | "no")
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="experience-yes" />
                        <Label htmlFor="experience-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="experience-no" />
                        <Label htmlFor="experience-no">No</Label>
                      </div>
                    </RadioGroup>
                    {errors.previousExperience && (
                      <p className="text-sm text-destructive">
                        {errors.previousExperience.message}
                      </p>
                    )}
                  </div>

                  {watchedValues.previousExperience === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="experienceDetails">
                        Experience Details
                      </Label>
                      <Textarea
                        id="experienceDetails"
                        {...register("experienceDetails")}
                        placeholder="Please describe your previous experience..."
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Contact Name *</Label>
                        <Input
                          id="emergencyName"
                          {...register("emergencyName")}
                          placeholder="Full name of emergency contact"
                          className={
                            errors.emergencyName ? "border-destructive" : ""
                          }
                        />
                        {errors.emergencyName && (
                          <p className="text-sm text-destructive">
                            {errors.emergencyName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                        <Input
                          id="emergencyPhone"
                          {...register("emergencyPhone")}
                          placeholder="01XXXXXXXXX"
                          className={
                            errors.emergencyPhone ? "border-destructive" : ""
                          }
                        />
                        {errors.emergencyPhone && (
                          <p className="text-sm text-destructive">
                            {errors.emergencyPhone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relationship *</Label>
                      <Input
                        id="emergencyRelation"
                        {...register("emergencyRelation")}
                        placeholder="e.g., Father, Mother, Spouse"
                        className={
                          errors.emergencyRelation ? "border-destructive" : ""
                        }
                      />
                      {errors.emergencyRelation && (
                        <p className="text-sm text-destructive">
                          {errors.emergencyRelation.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Ready to Submit!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Please review your information before submitting the
                      application.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b pb-2">
                      Application Summary
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-primary mb-2">
                          Personal Information
                        </h5>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Name:</strong> {watchedValues.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {watchedValues.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {watchedValues.phone}
                          </p>
                          <p>
                            <strong>DOB:</strong>{" "}
                            {watchedValues.dateOfBirth &&
                              format(watchedValues.dateOfBirth, "PPP")}
                          </p>
                          <p>
                            <strong>Gender:</strong> {watchedValues.gender}
                          </p>
                          <p>
                            <strong>Address:</strong> {watchedValues.address},{" "}
                            {watchedValues.city} - {watchedValues.zipCode}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-primary mb-2">
                          Education & Course
                        </h5>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Education:</strong>{" "}
                            {watchedValues.educationLevel}
                          </p>
                          <p>
                            <strong>Institution:</strong>{" "}
                            {watchedValues.institution}
                          </p>
                          <p>
                            <strong>Passing Year:</strong>{" "}
                            {watchedValues.passingYear}
                          </p>
                          <p>
                            <strong>Grade:</strong> {watchedValues.grade}
                          </p>
                          <p>
                            <strong>Selected Course:</strong>{" "}
                            {selectedCourseData?.title || "Not selected"}
                          </p>
                          <p>
                            <strong>Batch:</strong>{" "}
                            {watchedValues.preferredBatch}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h5 className="font-medium text-primary mb-2">
                        Emergency Contact
                      </h5>
                      <div className="text-sm">
                        <p>
                          <strong>Name:</strong> {watchedValues.emergencyName}
                        </p>
                        <p>
                          <strong>Phone:</strong> {watchedValues.emergencyPhone}
                        </p>
                        <p>
                          <strong>Relationship:</strong>{" "}
                          {watchedValues.emergencyRelation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={watchedValues.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setValue("agreeToTerms", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="agreeToTerms"
                          className="text-sm font-normal"
                        >
                          I agree to the{" "}

                          Terms and Conditions
                          {" "}
                          and{" "}
                          Privacy Policy
                          *
                        </Label>
                      </div>
                      
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToPayment"
                          checked={watchedValues.agreeToPayment}
                          onCheckedChange={(checked) =>
                            setValue("agreeToPayment", checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="agreeToPayment"
                          className="text-sm font-normal"
                        >
                          I understand that course fees are non-refundable once
                          paid and agree to the payment schedule *
                        </Label>
                      </div>
                     
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="receiveUpdates"
                        checked={watchedValues.receiveUpdates}
                        onCheckedChange={(checked) =>
                          setValue("receiveUpdates", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="receiveUpdates"
                        className="text-sm font-normal"
                      >
                        I would like to receive updates about courses and
                        promotions
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}