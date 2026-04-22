// // export async function getSoftwareProducts() {
// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_API_URL}/software-products`,
// //     {
// //       cache: "force-cache", // SSG (default, but explicit)
// //     }
// //   );

// //   if (!res.ok) {
// //     throw new Error("Failed to fetch software products");
// //   }

// //   const json = await res.json();

// //   return json.data || [];
// // }

// // export async function getSoftwareProducts() {
// //   const res = await fetch(
// //     "https://admin.sbit.com.bd/api/software-products",
// //     {
// //       cache: "force-cache", // SSG (default, but explicit)
// //     }
// //   );

// //   if (!res.ok) {
// //     throw new Error("Failed to fetch software products");
// //   }

// //   const json = await res.json();

// //   return json.data || [];
// // }

// export async function getSoftwareProducts() {
//   try {
//     const res = await fetch(
//       "https://admin.sbit.com.bd/api/software-products"
//     );

//     const json = await res.json();

//     // ✅ CORRECT PATH
//     return json?.data?.data || [];
//   } catch (error) {
//     console.error("API Error:", error);
//     return [];
//   }
// }


// lib/api/software.ts
export interface Software {
  slug: string;
  name: string;
  heroImage: string;
  hero: {
    title: string;
    description: string;
    buttons: { text: string; link: string }[];
    statistics: { value: string; label: string }[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  problem: { title: string; description: string };
  whatWeBuild: {
    title: string;
    description: string;
    components: { title: string; description: string }[];
  };
  keyFeatures: {
    title: string;
    subtitle: string;
    features: { category: string; items: string[] }[];
  };
  techStack: {
    title: string;
    description: string;
    categories: { name: string; technologies: string[] }[];
  };
  whyChooseUs: {
    title: string;
    reasons: { title: string; description: string }[];
  };
  howWeWork: {
    title: string;
    description: string;
    steps: { step: string; title: string; description: string }[];
  };
  clients: {
    logos: string[];
    testimonials: {
      name: string;
      designation: string;
      avatar?: string;
      rating: number;
      review: string;
    }[];
  };
  support: {
    title: string;
    items: { title: string; description: string }[];
  };
  faq: { question: string; answer: string }[];
  screenshots: { image: string; title: string; link?: string }[];
}

export async function getSoftwareProducts(): Promise<Software[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  try {
    const res = await fetch(`${baseUrl}/software-products`);
    const json = await res.json();
    const products = json?.data?.data || json?.softwareProducts?.data || [];

    return products.map((item: any) => ({
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
  } catch (error) {
    console.error("Failed to fetch software products:", error);
    return [];
  }
}