/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
            }
        ]
    }
};

export default nextConfig;

// module.exports = nextConfig