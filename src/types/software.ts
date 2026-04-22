// types/software.ts
export interface SoftwareProduct {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: string;
  version: string;
  price: number;
  licenseType: "subscription" | "perpetual" | "freemium";
  status: "active" | "development" | "discontinued";
  releaseDate: string;
  lastUpdated: string;
  technologies: string[];
  features: string[];
  systemRequirements: string[];
  downloadUrl?: string;
  documentationUrl?: string;
  supportEmail: string;
  image: string;
  screenshots: string[];
  tags: string[];
  monthlyPrice?: number;
  annualPrice?: number;
  lifetimePrice?: number;
}

export interface SoftwareLicense {
  id: string;
  productId: string;
  licenseKey: string;
  type: "trial" | "personal" | "commercial" | "enterprise";
  status: "active" | "expired" | "suspended";
  customer: {
    name: string;
    email: string;
    company?: string;
  };
  issuedAt: string;
  expiresAt?: string;
  maxUsers: number;
  domains: string[];
  features: string[];
  supportLevel: "basic" | "priority" | "enterprise";
}

export interface SoftwareClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: "individual" | "startup" | "corporate" | "enterprise";
  industry: string;
  country: string;
  joinedDate: string;
  status: "active" | "inactive" | "suspended";
  totalSpent: number;
  activeLicenses: number;
  lastPurchase: string;
  contactPerson: string;
  notes?: string;
}

export interface SoftwareDeployment {
  id: string;
  productId: string;
  clientId: string;
  version: string;
  environment: "development" | "staging" | "production";
  status: "pending" | "in-progress" | "completed" | "failed";
  deployedAt: string;
  deployedBy: string;
  serverDetails: {
    url: string;
    ip: string;
    operatingSystem: string;
  };
  deploymentLogs: string[];
}
