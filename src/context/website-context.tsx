// context/website-context.tsx
"use client";

import { createContext, useContext } from "react";
import type { WebsiteContent } from "@/types/website";

interface WebsiteContextType {
  content: WebsiteContent | null;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({
  children,
  content,
}: {
  children: React.ReactNode;
  content: WebsiteContent | null;
}) {
  return (
    <WebsiteContext.Provider value={{ content }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used inside WebsiteProvider");
  }
  return context;
}