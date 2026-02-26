import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
=======
    domains: ["randomuser.me", "images.unsplash.com"],
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
  },
};

export default nextConfig;