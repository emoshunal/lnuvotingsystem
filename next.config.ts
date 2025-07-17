import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ballot",         // alias path
        destination: "/voter/ballot", // real internal route
      },
      {
        source: "/admin",         // alias path
        destination: "/admin/dashboard", // real internal route
      },
      {
        source: "/candidates",         // alias path
        destination: "/admin/manage/candidates", // real internal route
      },
      {
        source: "/voters",         // alias path
        destination: "/admin/manage/voters", // real internal route
      }

    ]
  },
};

export default nextConfig;
