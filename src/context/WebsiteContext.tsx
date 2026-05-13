import { createContext, useContext } from "react";

export interface WebsiteContent {
  id: number;
  logo: string;
  banner: string;
  title: string;
  slogan: string;
  favicon: string;
  tax: number;
  metaTitle: string;
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
  sellerCenterLogo: string;
  email: string;
  phone: string;
  supportPhone: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  address: string;
  map: string;
}

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
