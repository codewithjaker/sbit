// app/software/[slug]/page.tsx
import { getSoftwareProducts } from "@/services/software.service";
import { SoftwareDetailClient } from "./SoftwareDetailClient";

export async function generateStaticParams() {
  const softwares = await getSoftwareProducts();

  if (!Array.isArray(softwares) || softwares.length === 0) {
    return [];
  }

  return softwares.map((soft: any) => ({
    slug: soft.slug,
  }));
}

export default function SoftwareDetailPage() {
  return <SoftwareDetailClient />;
}