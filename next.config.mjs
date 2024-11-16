/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "i.ibb.co","res.cloudinary.com","ui-avatars.com","assets.aceternity.com","nextui-docs-v2.vercel.app","images.pexels.com","jmp.sh","ochi.design","images.unsplash.com"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            port: "",
          },
        ],
      },};

export default nextConfig;
