// lib/marketing-data.ts
export interface MarketingServiceData {
  slug: string;           // unique identifier for URL (e.g., 'digital-marketing')
  title: string;
  tagline: string;
  heroImage: string;
  overview: string;
  features: { title: string; description: string; icon?: string }[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  pricing: { plan: string; price: string; features: string[]; recommended?: boolean }[];
  faqs: { question: string; answer: string }[];
  testimonials: { name: string; role: string; content: string; rating: number }[];
  contactInfo: { email: string; phone: string; address: string };
  stats: { label: string; value: string; icon?: string }[];
}

export const marketingServicesArray: MarketingServiceData[] = [
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    tagline: 'Grow Your Business with Data-Driven Digital Strategies',
    heroImage: '/images/marketing/digital-marketing-hero.jpg',
    overview: 'Our comprehensive digital marketing services help businesses of all sizes increase their online visibility, drive qualified traffic, and convert leads into loyal customers. We use the latest tools and analytics to ensure measurable results.',
    features: [
      { title: 'SEO & Content Marketing', description: 'Optimize your website to rank higher on search engines and attract organic traffic.' },
      { title: 'PPC Campaign Management', description: 'Run targeted pay-per-click ads on Google, Bing, and social media platforms.' },
      { title: 'Social Media Advertising', description: 'Engage your audience with strategic ads on Facebook, Instagram, LinkedIn, and TikTok.' },
      { title: 'Email & SMS Marketing', description: 'Nurture leads and retain customers with automated email and SMS campaigns.' },
      { title: 'Conversion Rate Optimization', description: 'Improve your website’s user experience to increase conversions and sales.' },
    ],
    benefits: [
      'Increase brand visibility and awareness',
      'Target specific demographics and interests',
      'Higher ROI compared to traditional marketing',
      'Real-time performance tracking and reporting',
      'Scalable campaigns that grow with your business',
    ],
    process: [
      { step: 1, title: 'Discovery & Audit', description: 'We analyze your current marketing efforts, target audience, and competitors.' },
      { step: 2, title: 'Strategy Development', description: 'Create a customized digital marketing strategy aligned with your goals.' },
      { step: 3, title: 'Implementation', description: 'Launch campaigns across selected channels with continuous monitoring.' },
      { step: 4, title: 'Optimization & Reporting', description: 'Regularly optimize campaigns and provide detailed performance reports.' },
    ],
    pricing: [
      { plan: 'Starter', price: '$499/mo', features: ['Keyword research', 'On-page SEO (up to 10 pages)', 'Monthly report'], recommended: false },
      { plan: 'Professional', price: '$999/mo', features: ['Everything in Starter', 'Content creation (4 articles/mo)', 'Backlink building', 'Social media management'], recommended: true },
      { plan: 'Enterprise', price: 'Custom', features: ['Full-service digital marketing', 'Dedicated account manager', 'Unlimited keywords', 'Advanced analytics'], recommended: false },
    ],
    faqs: [
      { question: 'How long does it take to see results?', answer: 'SEO typically takes 3-6 months to show significant results, but PPC campaigns can drive traffic immediately.' },
      { question: 'Do you offer custom packages?', answer: 'Yes, we tailor our services to meet your specific business needs and budget.' },
      { question: 'How do you measure success?', answer: 'We track KPIs like traffic, conversions, ROI, and engagement using tools like Google Analytics and custom dashboards.' },
    ],
    testimonials: [
      { name: 'John Smith', role: 'CEO, TechStart', content: 'SBIT transformed our online presence. Our organic traffic increased by 150% in 6 months!', rating: 5 },
      { name: 'Sarah Johnson', role: 'Marketing Director, EcoGoods', content: 'Their PPC campaigns are highly effective. We saw a 3x ROI within the first quarter.', rating: 4.8 },
    ],
    contactInfo: {
      email: 'marketing@sbit.com',
      phone: '+880 1234 567890',
      address: '123 Gulshan Avenue, Dhaka, Bangladesh',
    },
    stats: [
      { label: 'Projects Completed', value: '500+', icon: 'CheckCircle' },
      { label: 'Happy Clients', value: '300+', icon: 'Users' },
      { label: 'Average ROI', value: '320%', icon: 'TrendingUp' },
      { label: 'Avg Response Time', value: '< 2 hrs', icon: 'Clock' },
    ],
  },
  {
    title: 'Social Media Marketing', 
    slug: 'social-media-marketing',
    tagline: 'Build a Loyal Community and Drive Engagement',
    heroImage: '/images/marketing/social-media-hero.jpg',
    overview: 'Leverage the power of social platforms to connect with your audience, increase brand loyalty, and drive sales. We create data-driven strategies tailored to each platform.',
    features: [
      { title: 'Content Strategy & Creation', description: 'Develop engaging posts, videos, and graphics that resonate with your audience.' },
      { title: 'Community Management', description: 'Respond to comments, messages, and reviews to build trust and loyalty.' },
      { title: 'Paid Social Ads', description: 'Run targeted ad campaigns on Facebook, Instagram, LinkedIn, Twitter, and TikTok.' },
      { title: 'Influencer Collaboration', description: 'Partner with influencers to expand your reach and credibility.' },
      { title: 'Analytics & Reporting', description: 'Track engagement, reach, conversions, and ROI with detailed reports.' },
    ],
    benefits: [
      'Increase brand awareness and recognition',
      'Drive website traffic and conversions',
      'Build a loyal community around your brand',
      'Real-time customer feedback and insights',
    ],
    process: [
      { step: 1, title: 'Audit & Goal Setting', description: 'Assess your current social presence and define KPIs.' },
      { step: 2, title: 'Content Calendar', description: 'Plan and schedule posts for optimal engagement.' },
      { step: 3, title: 'Ad Campaign Setup', description: 'Create and launch paid campaigns targeting your ideal customers.' },
      { step: 4, title: 'Monitor & Optimize', description: 'Continuously adjust strategy based on performance data.' },
    ],
    pricing: [
      { plan: 'Basic', price: '$299/mo', features: ['Content creation (10 posts/mo)', 'Community management (2hrs/day)', 'Monthly report'], recommended: false },
      { plan: 'Pro', price: '$599/mo', features: ['Everything in Basic', 'Paid ads management ($200 ad spend)', 'Influencer outreach'], recommended: true },
      { plan: 'Agency', price: '$1299/mo', features: ['Full-service social media', 'Dedicated account manager', 'Unlimited posts', 'Advanced analytics'], recommended: false },
    ],
    faqs: [
      { question: 'Which platforms do you specialize in?', answer: 'We work with all major platforms: Facebook, Instagram, LinkedIn, Twitter, TikTok, and Pinterest.' },
      { question: 'Can you manage existing accounts?', answer: 'Absolutely! We can take over your current social media accounts and optimize them.' },
    ],
    testimonials: [
      { name: 'Emily Chen', role: 'Owner, Fashionista', content: 'Our Instagram followers grew by 200% in 3 months! The team is incredibly responsive.', rating: 5 },
    ],
    contactInfo: { email: 'social@sbit.com', phone: '+880 1234 567891', address: '123 Gulshan Avenue, Dhaka, Bangladesh' },
    stats: [
      { label: 'Engagement Rate', value: '4.5%', icon: 'TrendingUp' },
      { label: 'Platforms', value: '6+', icon: 'Users' },
    ],
  },
  {
    slug: 'email-marketing',
    title: 'Email Marketing', 
    tagline: 'Personalized Campaigns That Convert',
    heroImage: '/images/marketing/email-hero.jpg',
    overview: 'Reach your customers directly in their inbox with compelling email campaigns that nurture leads, drive repeat purchases, and build lasting relationships.',
    features: [
      { title: 'Email List Building', description: 'Grow your subscriber list organically with opt-in forms and lead magnets.' },
      { title: 'Newsletter Design & Automation', description: 'Create beautiful, responsive newsletters and set up automated drip campaigns.' },
      { title: 'A/B Testing', description: 'Test subject lines, content, and send times to maximize open rates and clicks.' },
      { title: 'Segmentation & Personalization', description: 'Target specific groups based on behavior, demographics, and purchase history.' },
      { title: 'Campaign Analytics', description: 'Track open rates, click-through rates, conversions, and ROI.' },
    ],
    benefits: [
      'High ROI (average $42 for every $1 spent)',
      'Direct communication with customers',
      'Automated follow-ups save time',
      'Measurable and optimizable results',
    ],
    process: [
      { step: 1, title: 'Strategy & List Segmentation', description: 'Define goals and segment your audience.' },
      { step: 2, title: 'Content Creation', description: 'Design engaging emails and write compelling copy.' },
      { step: 3, title: 'Campaign Launch', description: 'Schedule and send campaigns with automation.' },
      { step: 4, title: 'Analysis & Optimization', description: 'Review metrics and refine future campaigns.' },
    ],
    pricing: [
      { plan: 'Essential', price: '$199/mo', features: ['Up to 10,000 subscribers', 'Monthly newsletter', 'Basic analytics'], recommended: false },
      { plan: 'Growth', price: '$399/mo', features: ['Up to 50,000 subscribers', 'Automation workflows', 'A/B testing', 'Segmentation'], recommended: true },
    ],
    faqs: [
      { question: 'How often should I send emails?', answer: 'It depends on your audience, but we typically recommend 1-4 times per month for newsletters.' },
      { question: 'Can you integrate with my CRM?', answer: 'Yes, we integrate with major CRMs like Salesforce, HubSpot, and Zoho.' },
    ],
    testimonials: [
      { name: 'David Lee', role: 'E-commerce Manager', content: 'Email campaigns generated 25% of our total revenue last quarter. Highly recommended!', rating: 4.9 },
    ],
    contactInfo: { email: 'email@sbit.com', phone: '+880 1234 567892', address: '123 Gulshan Avenue, Dhaka, Bangladesh' },
    stats: [
      { label: 'Open Rate', value: '28%', icon: 'Mail' },
      { label: 'Click-Through Rate', value: '5.2%', icon: 'TrendingUp' },
    ],
  },
  {
    title: 'Search Engine Optimization (SEO)',
    slug: 'search-engine-optimization-seo',
    tagline: 'Dominate Search Results and Drive Organic Traffic',
    heroImage: '/images/marketing/seo-hero.jpg',
    overview: 'Our SEO experts use white-hat techniques to improve your website’s ranking on Google, Bing, and other search engines. Get sustainable, long-term growth.',
    features: [
      { title: 'Keyword Research & Analysis', description: 'Identify high-value keywords your customers are searching for.' },
      { title: 'On-Page & Technical SEO', description: 'Optimize meta tags, headings, site speed, mobile-friendliness, and structure.' },
      { title: 'Link Building', description: 'Earn high-quality backlinks from authoritative websites.' },
      { title: 'Local SEO', description: 'Dominate local search results with Google My Business optimization and local citations.' },
      { title: 'SEO Audits & Reporting', description: 'Regular audits and detailed performance reports to track progress.' },
    ],
    benefits: [
      'Increased organic traffic without ongoing ad spend',
      'Higher credibility and trust from users',
      'Long-term sustainable results',
      'Better user experience',
    ],
    process: [
      { step: 1, title: 'SEO Audit', description: 'Comprehensive analysis of your current SEO health.' },
      { step: 2, title: 'Keyword Strategy', description: 'Develop a targeted keyword plan.' },
      { step: 3, title: 'On-Page Optimization', description: 'Implement changes on your website.' },
      { step: 4, title: 'Off-Page & Link Building', description: 'Build authority through backlinks.' },
      { step: 5, title: 'Monitoring & Reporting', description: 'Track rankings and traffic, adjust as needed.' },
    ],
    pricing: [
      { plan: 'Local SEO', price: '$399/mo', features: ['Up to 10 keywords', 'Google My Business optimization', 'Monthly report'], recommended: false },
      { plan: 'National SEO', price: '$799/mo', features: ['Up to 30 keywords', 'Content creation (2 articles/mo)', 'Link building', 'Quarterly strategy call'], recommended: true },
    ],
    faqs: [
      { question: 'How long does SEO take?', answer: 'You can see initial improvements in 2-3 months, but significant results typically take 4-6 months.' },
      { question: 'Do you guarantee #1 rankings?', answer: 'No ethical SEO company can guarantee specific rankings, but we guarantee we will use best practices to improve your visibility.' },
    ],
    testimonials: [
      { name: 'Michael Brown', role: 'Founder, GreenTech', content: 'We moved from page 5 to page 1 for our main keywords in 4 months. Amazing work!', rating: 5 },
    ],
    contactInfo: { email: 'seo@sbit.com', phone: '+880 1234 567893', address: '123 Gulshan Avenue, Dhaka, Bangladesh' },
    stats: [
      { label: 'Keywords Ranked', value: '1,200+', icon: 'Search' },
      { label: 'Avg Position Increase', value: '3.5', icon: 'TrendingUp' },
    ],
  },
  {
    slug: 'sms-marketing',
    title: 'SMS Marketing',
    tagline: 'Reach Customers Instantly with High-Open-Rate Text Messages',
    heroImage: '/images/marketing/sms-hero.jpg',
    overview: 'SMS marketing offers unparalleled open rates (up to 98%) and immediate delivery. Perfect for flash sales, appointment reminders, and urgent updates.',
    features: [
      { title: 'Bulk SMS Campaigns', description: 'Send thousands of messages in seconds with our easy-to-use platform.' },
      { title: 'Two-Way Messaging', description: 'Allow customers to reply and engage in conversations.' },
      { title: 'Automated SMS Triggers', description: 'Set up auto-responses for welcome messages, abandoned carts, and follow-ups.' },
      { title: 'Short Code & Keyword Services', description: 'Use memorable keywords for campaigns.' },
      { title: 'Analytics & Delivery Reports', description: 'Track delivery rates, open rates, and click-through rates.' },
    ],
    benefits: [
      '98% open rate within 3 minutes',
      'Cost-effective communication',
      'Instant delivery',
      'High engagement and conversion rates',
    ],
    process: [
      { step: 1, title: 'List Building', description: 'Collect opt-in phone numbers via web forms, in-store, or events.' },
      { step: 2, title: 'Campaign Design', description: 'Create compelling SMS copy and CTAs.' },
      { step: 3, title: 'Automation Setup', description: 'Configure triggers for automated messages.' },
      { step: 4, title: 'Launch & Monitor', description: 'Send campaigns and monitor performance.' },
    ],
    pricing: [
      { plan: 'Starter', price: '$0.03 per SMS', features: ['Pay as you go', 'No monthly fee'], recommended: false },
      { plan: 'Pro', price: '$199/mo', features: ['10,000 SMS/month', 'Two-way messaging', 'Automation workflows', 'Analytics'], recommended: true },
    ],
    faqs: [
      { question: 'Is SMS marketing legal?', answer: 'Yes, as long as you obtain proper consent and provide opt-out options (compliant with TCPA and GDPR).' },
      { question: 'Can I send MMS (picture messages)?', answer: 'Yes, we support MMS for rich media campaigns.' },
    ],
    testimonials: [
      { name: 'Jessica White', role: 'Marketing Manager, RetailX', content: 'Our SMS campaigns have a 40% click-through rate – way higher than email!', rating: 5 },
    ],
    contactInfo: { email: 'sms@sbit.com', phone: '+880 1234 567894', address: '123 Gulshan Avenue, Dhaka, Bangladesh' },
    stats: [
      { label: 'Avg Open Rate', value: '98%', icon: 'Mail' },
      { label: 'Response Rate', value: '45%', icon: 'Users' },
    ],
  },
];

// Helper to find service by slug (CSR friendly)
export async function getMarketingServiceBySlug(slug: string): Promise<MarketingServiceData | null> {
  // Remove artificial delay for build, keep for client but not necessary
  // await new Promise(resolve => setTimeout(resolve, 300));
  const found = marketingServicesArray.find(item => item.slug === slug);
  console.log('Looking for slug:', slug, 'Found:', found ? found.title : 'not found');
  return found || null;
}