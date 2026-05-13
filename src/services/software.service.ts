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

// // lib/api/software.ts
// export interface Software {
//   slug: string;
//   name: string;
//   heroImage: string;
//   hero: {
//     title: string;
//     description: string;
//     buttons: { text: string; link: string }[];
//     statistics: { value: string; label: string }[];
//   };
//   about: {
//     title: string;
//     description: string;
//     mission: string;
//     vision: string;
//   };
//   problem: { title: string; description: string };
//   whatWeBuild: {
//     title: string;
//     description: string;
//     components: { title: string; description: string }[];
//   };
//   keyFeatures: {
//     title: string;
//     subtitle: string;
//     features: { category: string; items: string[] }[];
//   };
//   techStack: {
//     title: string;
//     description: string;
//     categories: { name: string; technologies: string[] }[];
//   };
//   whyChooseUs: {
//     title: string;
//     reasons: { title: string; description: string }[];
//   };
//   howWeWork: {
//     title: string;
//     description: string;
//     steps: { step: string; title: string; description: string }[];
//   };
//   clients: {
//     logos: string[];
//     testimonials: {
//       name: string;
//       designation: string;
//       avatar?: string;
//       rating: number;
//       review: string;
//     }[];
//   };
//   support: {
//     title: string;
//     items: { title: string; description: string }[];
//   };
//   faq: { question: string; answer: string }[];
//   screenshots: { image: string; title: string; link?: string }[];
// }

// // Helper: prefix relative image paths with storage base URL
// function fullImageUrl(path: string | undefined | null): string {
//   if (!path) return '/placeholder.png';
//   if (path.startsWith('http')) return path;
//   const base = process.env.NEXT_PUBLIC_IMAGE_PATH || '';
//   return `${base}/${path.replace(/^\//, '')}`; // ensure no double slash
// }

// export async function getSoftwareProducts(): Promise<Software[]> {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!baseUrl) return [];

//   try {
//     const res = await fetch(`${baseUrl}/software-products`);
//     const json = await res.json();
//     const products = json?.data?.data || json?.softwareProducts?.data || [];

//     return products.map((item: any): Software => ({
//       slug: item.slug,
//       name: item.name,
//       heroImage: fullImageUrl(item.hero_image),
//       hero: {
//         title: item.hero?.title || '',
//         description: item.hero?.description || '',
//         buttons: item.hero?.buttons || [],
//         statistics: item.hero?.statistics || [],
//       },
//       about: {
//         title: item.about?.title || '',
//         description: item.about?.description || '',
//         mission: item.about?.mission || '',
//         vision: item.about?.vision || '',
//       },
//       problem: item.problem || { title: '', description: '' },
//       whatWeBuild: {
//         title: item.what_we_build?.title || '',
//         description: item.what_we_build?.description || '',
//         components: (item.what_we_build?.components || []).map((comp: any) => ({
//           title: comp.title,
//           description: comp.description,
//         })),
//       },
//       keyFeatures: {
//         title: item.key_features?.title || '',
//         subtitle: item.key_features?.subtitle || '',
//         features: (item.key_features?.features || []).map((f: any) => ({
//           category: f.category,
//           items: f.items || [],
//         })),
//       },
//       techStack: {
//         title: item.tech_stack?.title || '',
//         description: item.tech_stack?.description || '',
//         categories: (item.tech_stack?.categories || []).map((cat: any) => ({
//           name: cat.name,
//           technologies: cat.technologies || [],
//         })),
//       },
//       whyChooseUs: {
//         title: item.why_choose_us?.title || '',
//         reasons: (item.why_choose_us?.reasons || []).map((r: any) => ({
//           title: r.title,
//           description: r.description,
//         })),
//       },
//       howWeWork: {
//         title: item.how_we_work?.title || '',
//         description: item.how_we_work?.description || '',
//         steps: (item.how_we_work?.steps || []).map((step: any) => ({
//           step: step.step,
//           title: step.title,
//           description: step.description,
//         })),
//       },
//       clients: {
//         logos: (item.clients?.logos || []).map((logo: string) => fullImageUrl(logo)),
//         testimonials: (item.clients?.testimonials || []).map((t: any) => ({
//           name: t.name,
//           designation: t.designation,
//           avatar: t.avatar ? fullImageUrl(t.avatar) : undefined,
//           rating: t.rating,
//           review: t.review,
//         })),
//       },
//       support: {
//         title: item.support?.title || '',
//         items: (item.support?.items || []).map((i: any) => ({
//           title: i.title,
//           description: i.description,
//         })),
//       },
//       faq: item.faq || [],
//       screenshots: (item.screenshots || []).map((s: any) => ({
//         image: fullImageUrl(s.image),
//         title: s.title,
//         link: s.link,
//       })),
//     }));
//   } catch (error) {
//     console.error('Failed to fetch software products:', error);
//     return [];
//   }
// }