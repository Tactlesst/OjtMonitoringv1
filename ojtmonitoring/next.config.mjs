/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}
export default nextConfig;
