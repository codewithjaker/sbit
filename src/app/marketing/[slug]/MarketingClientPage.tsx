// app/marketing/[slug]/MarketingClientPage.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Users, TrendingUp, Clock, Mail, Phone, MapPin } from 'lucide-react';
import type { MarketingServiceData } from '@/lib/marketing-data';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function MarketingClientPage({ service }: { service: MarketingServiceData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { agreeTerms: false },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form data:', data);
    reset();
    // Optional: add toast notification
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'CheckCircle': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Users': return <Users className="h-5 w-5 text-blue-500" />;
      case 'TrendingUp': return <TrendingUp className="h-5 w-5 text-purple-500" />;
      case 'Clock': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'Mail': return <Mail className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Orange Gradient */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">{service.tagline}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        {service.stats && service.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {service.stats.map((stat, idx) => (
              <Card key={idx}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {getIcon(stat.icon)}
                  <div className="text-2xl font-bold mt-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">{service.overview}</p>
          </CardContent>
        </Card>

        {/* Tabs with orange accent */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="process" className="mt-6">
            <div className="space-y-4">
              {service.process.map((step) => (
                <Card key={step.step}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">Step {step.step}</Badge>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pricing" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {service.pricing.map((plan, idx) => (
                <Card key={idx} className={plan.recommended ? 'border-orange-500 shadow-lg' : ''}>
                  {plan.recommended && (
                    <div className="bg-orange-500 text-white text-center py-1 rounded-t-lg text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.plan}</CardTitle>
                    <div className="text-2xl font-bold">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="hover:text-orange-600">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Testimonials */}
        {service.testimonials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.testimonials.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(testimonial.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form and Info with orange buttons */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Request a Free Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register('phone')} />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" rows={4} {...register('message')} />
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeTerms" {...register('agreeTerms')} />
                  <Label htmlFor="agreeTerms" className="text-sm font-normal">
                    I agree to the terms and privacy policy *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Send Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{service.contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{service.contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{service.contactInfo.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}