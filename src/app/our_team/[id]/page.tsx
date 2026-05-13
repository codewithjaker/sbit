// app/our_team/[id]/page.tsx
import { TeamMemberDetailClient } from "./TeamMemberDetailClient";
import { fetchAllMemberIds } from "@/services/team.service";

export async function generateStaticParams() {
  const ids = await fetchAllMemberIds();
  return ids.map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamMemberDetailPage({ params }: PageProps) {
  const { id } = await params; // ✅ unwrap the Promise
  return <TeamMemberDetailClient id={id} />;
}

