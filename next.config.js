/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"],
        domains: [
            "127.0.0.1",
            process.env.NEXT_PUBLIC_BACKEND_URL,
            "localhost",
            "my-store-ynov.s3.eu-north-1.amazonaws.com",
        ],
    },
};

module.exports = nextConfig;
