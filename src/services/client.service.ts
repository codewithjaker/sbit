// services/client.service.ts
import { ClientAPI, Client } from "@/types/client";

export async function fetchAllClients(): Promise<Client[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageBasePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "";

  if (!baseUrl) {
    console.error("Missing API URL");
    return [];
  }

  try {
    const firstRes = await fetch(`${baseUrl}/our-happy-clients?page=1`, {
      cache: "no-store",
    });
    if (!firstRes.ok) throw new Error("Failed to fetch");

    const firstJson = await firstRes.json();
    const firstPageData = firstJson.data;

    let allClientsData: ClientAPI[] = firstPageData.data || [];

    const lastPage = firstPageData.last_page;
    if (lastPage > 1) {
      const pagePromises = [];
      for (let page = 2; page <= lastPage; page++) {
        pagePromises.push(
          fetch(`${baseUrl}/our-happy-clients?page=${page}`, {
            cache: "no-store",
          }).then((res) => res.json())
        );
      }
      const additionalPages = await Promise.all(pagePromises);
      additionalPages.forEach((json: any) => {
        if (json.data?.data) {
          allClientsData = allClientsData.concat(json.data.data);
        }
      });
    }

    // ✅ Sort by order_by ascending
    allClientsData.sort((a, b) => a.order_by - b.order_by);

    return allClientsData.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image
        ? `${imageBasePath}${item.image}`
        : "/placeholder-client.png",
      category: item.category,
      url: item.url || undefined,
      location: item.location || undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}