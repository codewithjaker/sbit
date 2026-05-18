// app/marketing/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { marketingServicesArray } from '@/lib/marketing-data';
import MarketingClientPage from './MarketingClientPage';

// Generate static paths at build time
export async function generateStaticParams() {
  return marketingServicesArray.map((service) => ({
    slug: service.slug,
  }));
}

// Server Component
// 📌 FIX: Make the component async and await the params object
export default async function MarketingPage({
  params,
}: {
  params: Promise<{ slug: string }>; // 📌 Update the type to Promise
}) {
  const { slug } = await params; // 📌 Await the params Promise
  const service = marketingServicesArray.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return <MarketingClientPage service={service} />;
}