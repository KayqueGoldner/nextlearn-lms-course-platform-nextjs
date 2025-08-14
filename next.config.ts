import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lms-course.t3.storageapi.dev",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
