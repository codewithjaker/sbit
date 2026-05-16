// types/admission.ts
export interface AdmissionPayload {
  name: string;
  phone: string;
  date_of_birth: string; // ISO string
  gender: string;
  email: string;
  address: string;
  city: string;
  zip_code: string;
  education_level: string;
  institution: string;
  passing_year: number;
  grade: string;
  course_id: number;
  preferred_batch: string;
  previous_experience: string;
  experience_details: string;
  emergency_name: string;
  emergency_phone: string;
  emergency_relation: string;
  agree_to_terms: boolean;
  agree_to_payment: boolean;
  receive_updates: boolean;
}

export interface AdmissionResponse {
  status_code: number;
  status_message: string;
  data?: any;
  error_message?: string;
}