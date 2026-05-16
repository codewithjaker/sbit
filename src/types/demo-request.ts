// types/demo-request.ts

export interface DemoRequestPayload {
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  address?: string;
  // Optional: add product slug if the API accepts it later
  // product_slug?: string;
}

export interface DemoRequestResponse {
  status_code: number;
  status_message: string;
  data?: any;
  error_message?: string;
}