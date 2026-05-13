// types/client.ts
export interface ClientAPI {
  id: number;
  name: string;
  image: string | null;
  category: string;
  url: string | null;
  location: string | null;
  order_by: number; // ✅ added
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  image: string;
  category: string;
  url?: string;
  location?: string;
}