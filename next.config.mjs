/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "edtrm.region9.dilg.gov.ph",
        "127.0.0.1:3000",
        "172.20.82.83",
      ],
    },
  },
};

export default nextConfig;
