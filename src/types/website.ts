// types/website.ts

export interface WebSettingsAPI {
  id: number;
  logo: string | null;
  banner: string | null;
  title: string;
  slogan: string | null;
  favicon: string | null;
  tax: number;
  meta_title: string;
  meta_description: string;
  seller_center_logo: string | null;
  email: string;
  phone: string;
  support_phone: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  address: string;
  map: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebsiteContent {
  id: number;
  logo: string;
  favicon: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  map: string | null;
  slogan: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  support_phone: string;
  meta_title: string;
  meta_description: string;
  tax: number;
  seller_center_logo: string | null;
}