/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // spell-checker: disable-next-line
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
