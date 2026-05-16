// services/admission.service.ts
import { AdmissionPayload, AdmissionResponse } from "@/types/admission";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function submitAdmission(
  payload: AdmissionPayload
): Promise<AdmissionResponse> {
  if (!baseUrl) {
    throw new Error("API URL not configured");
  }

  const res = await fetch(`${baseUrl}/admissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: AdmissionResponse = await res.json();

  if (!res.ok || result.status_code !== 100) {
    throw new Error(result.status_message || "Submission failed");
  }

  return result;
}