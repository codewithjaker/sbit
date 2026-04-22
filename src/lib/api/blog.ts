// lib/api/blog.ts
export async function fetchAllBlogSlugs(): Promise<string[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  const slugs: string[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/blogs?page=${currentPage}`);
      if (!res.ok) break;
      const json = await res.json();
      const pageData = json?.data;
      const blogs = pageData?.data || [];
      slugs.push(...blogs.map((b: any) => b.slug));
      hasMore = pageData?.current_page < pageData?.last_page;
      currentPage++;
    }
  } catch (error) {
    console.error("Failed to fetch blog slugs:", error);
  }

  return slugs;
}

export async function fetchAllBlogs(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];

  const allBlogs: any[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const res = await fetch(`${baseUrl}/blogs?page=${currentPage}`);
      if (!res.ok) break;
      const json = await res.json();
      const pageData = json?.data;
      allBlogs.push(...(pageData?.data || []));
      hasMore = pageData?.current_page < pageData?.last_page;
      currentPage++;
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
  return allBlogs;
}

export async function fetchBlogCategories(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return [];
  try {
    const res = await fetch(`${baseUrl}/blog-categories`);
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.data || [];
  } catch {
    return [];
  }
}