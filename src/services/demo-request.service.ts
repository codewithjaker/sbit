// services/demo-request.service.ts
import { DemoRequestPayload, DemoRequestResponse } from "@/types/demo-request";

export async function submitDemoRequest(
  payload: DemoRequestPayload
): Promise<DemoRequestResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("API URL not configured");

  const res = await fetch(`${baseUrl}/demo-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json: DemoRequestResponse = await res.json();

  if (!res.ok || json.status_code !== 100) {
    throw new Error(json.status_message || "Demo request failed");
  }
  return json;
}