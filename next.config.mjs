/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["i.ibb.co.com", "clinica-admin.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
