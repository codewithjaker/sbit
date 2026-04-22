"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";


const seminarFormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
    institution: z.string().min(2, {
        message: "Institution name must be at least 2 characters.",
    }),
    department: z.string().min(2, {
        message: "Department/Group must be at least 2 characters.",
    }),
    academicQualifications: z.string().min(2, {
        message: "Please enter your academic qualifications.",
    }),
    interestedSubject: z.string().min(2, {
        message: "Please select or enter an interested subject.",
    }),
});

type SeminarFormValues = z.infer<typeof seminarFormSchema>;

// Subject options for the dropdown
const subjectOptions = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Data Science",
    "Blockchain",
    "Internet of Things (IoT)",
    "Other",
];

export default function SeminarRegistrationPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<SeminarFormValues>({
        resolver: zodResolver(seminarFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            institution: "",
            department: "",
            academicQualifications: "",
            interestedSubject: "",
        },
    });

    // async function onSubmit(data: SeminarFormValues) {
    //     setIsSubmitting(true);

    //     try {
    //         // Simulate API call
    //         console.log("Form submitted:", data);

    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // }

    async function onSubmit(data: SeminarFormValues) {
        setIsSubmitting(true);

        try {
            const res = await fetch(
                "https://admin.sbit.com.bd/api/seminar-registrations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        full_name: data.fullName,
                        email: data.email,
                        phone_number: data.phoneNumber,
                        institution: data.institution,
                        department: data.department,
                        academic_qualifications: data.academicQualifications,
                        interested_subject: data.interestedSubject,
                    }),
                }
            );

            const result = await res.json();

            if (!res.ok || result.status_code !== 100) {
                throw new Error(result?.status_message || "Something went wrong");
            }

            console.log("Success:", result);

            // ✅ Reset form
            form.reset();

            // ✅ Optional success UI
            alert("Registration successful!");

        } catch (error: any) {
            console.error("Error:", error.message);

            // Better than alert (optional)
            form.setError("root", {
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <Card className="w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center">
                        Seminar Registration
                    </CardTitle>
                    <CardDescription className="text-center">
                        Please fill out the form below to register for our upcoming seminar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john.doe@example.com"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="+1 234 567 8900"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Institution */}
                            <FormField
                                control={form.control}
                                name="institution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Institution</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="University Name / Company"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Department / Group */}
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department / Group</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Computer Science / Engineering"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Academic Qualifications */}
                            <FormField
                                control={form.control}
                                name="academicQualifications"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Academic Qualifications</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="B.Sc. Computer Science, M.Sc. AI"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Interested Subject */}
                            <FormField
                                control={form.control}
                                name="interestedSubject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interested Subject</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isSubmitting}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {subjectOptions.map((subject) => (
                                                    <SelectItem key={subject} value={subject}>
                                                        {subject}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Register for Seminar"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    <p>By submitting this form, you agree to our terms and conditions.</p>
                </CardFooter>
            </Card>
        </div>
    );
}