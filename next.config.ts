import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
  generateEtags: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  skipTrailingSlashRedirect: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/10",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/11",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/12",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/13",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/14",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/15",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //     {
  //       source: "/16",
  //       destination: "/our_team/10",
  //       permanent: true, // 301 redirect (SEO friendly)
  //     },
  //   ];
  // },
};

export default nextConfig;
