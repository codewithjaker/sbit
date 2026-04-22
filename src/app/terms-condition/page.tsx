// app/terms-and-conditions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageData {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  description: string; // HTML content
  status: number;
  created_at: string;
  updated_at: string;
}

async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/pages?slug=${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error("Failed to fetch page:", error);
    return null;
  }
}

export default function TermsPage() {
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const data = await fetchPageBySlug("terms_and_conditions");
      setPage(data);
      setLoading(false);
    };
    loadPage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-48 mx-auto mb-8" />
          <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600">
            The terms and conditions page could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  // Format the updated date
  const lastUpdated = new Date(page.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">{page.title}</h1>
        <p className="text-center text-muted-foreground mb-8">
          Last updated: {lastUpdated}
        </p>

        {/* Render HTML content safely */}
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: page.description }}
        />

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground">
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:info@sbit.com.bd"
              className="text-orange-600 hover:underline"
            >
              info@sbit.com.bd
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}