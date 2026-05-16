// // services/software.ts

// import { Software } from "@/types/software";

// export async function getSoftwareProducts(): Promise<Software[]> {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!baseUrl) return [];

//   try {
//     const res = await fetch(`${baseUrl}/software-products`);
//     const json = await res.json();
//     const products = json?.data?.data || json?.softwareProducts?.data || [];

//     return products.map((item: any) => ({
//       slug: item.slug,
//       name: item.name,
//       heroImage: item.hero_image || "",
//       hero: item.hero || { title: "", description: "", buttons: [], statistics: [] },
//       about: item.about || { title: "", description: "", mission: "", vision: "" },
//       problem: item.problem || { title: "", description: "" },
//       whatWeBuild: item.what_we_build || { title: "", description: "", components: [] },
//       keyFeatures: item.key_features || { title: "", subtitle: "", features: [] },
//       techStack: item.tech_stack || { title: "", description: "", categories: [] },
//       whyChooseUs: item.why_choose_us || { title: "", reasons: [] },
//       howWeWork: {
//         title: item.how_we_work?.title || "",
//         description: item.how_we_work?.description || "",
//         steps: item.how_we_work?.steps || [],
//       },
//       clients: {
//         logos: item.clients?.logos || [],
//         testimonials: item.clients?.testimonials || [],
//       },
//       support: item.support || { title: "", items: [] },
//       faq: item.faq || [],
//       screenshots: item.screenshots || [],
//     }));
//   } catch (error) {
//     console.error("Failed to fetch software products:", error);
//     return [];
//   }
// }


// services/software.service.ts
import { Software } from "@/types/software";

export async function getSoftwareProducts(): Promise<Software[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  const allProducts: any[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/software-products?page=${currentPage}`, {
        cache: "no-store", // fresh data for client
      });
      if (!res.ok) break;
      const json = await res.json();
      const pageData = json?.data || json?.softwareProducts; // API wraps in `data`
      const products = pageData?.data || [];

      allProducts.push(...products);
      hasMore = currentPage < (pageData?.last_page || 1);
      currentPage++;
    }
  } catch (error) {
    console.error("Failed to fetch software products:", error);
    return [];
  }

  return allProducts.map((item: any) => ({
    slug: item.slug,
    name: item.name,
    heroImage: item.hero_image || "",
    hero: item.hero || { title: "", description: "", buttons: [], statistics: [] },
    about: item.about || { title: "", description: "", mission: "", vision: "" },
    problem: item.problem || { title: "", description: "" },
    whatWeBuild: item.what_we_build || { title: "", description: "", components: [] },
    keyFeatures: item.key_features || { title: "", subtitle: "", features: [] },
    techStack: item.tech_stack || { title: "", description: "", categories: [] },
    whyChooseUs: item.why_choose_us || { title: "", reasons: [] },
    howWeWork: {
      title: item.how_we_work?.title || "",
      description: item.how_we_work?.description || "",
      steps: item.how_we_work?.steps || [],
    },
    clients: {
      logos: item.clients?.logos || [],
      testimonials: item.clients?.testimonials || [],
    },
    support: item.support || { title: "", items: [] },
    faq: item.faq || [],
    screenshots: item.screenshots || [],
  }));
}