// components/providers/website-provider.tsx
"use client";

import { useEffect, useState } from "react";
import { WebsiteProvider } from "@/context/website-context";
import { fetchWebsiteSettings } from "@/services/website.service";
import type { WebsiteContent } from "@/types/website";

export function WebsiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<WebsiteContent | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchWebsiteSettings();
      setContent(data);
    };
    loadSettings();
  }, []);

  return <WebsiteProvider content={content}>{children}</WebsiteProvider>;
}