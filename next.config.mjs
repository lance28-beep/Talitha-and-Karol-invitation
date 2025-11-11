import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Enable Next.js Image Optimization for better performance
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: [
      'date-fns',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
    ],
  },
  headers: async () => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Base security headers for all routes
    const securityHeaders = [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
    ];

    // In development, add no-cache header to prevent browser caching
    if (!isProduction) {
      securityHeaders.push({
        key: "Cache-Control",
        value: "no-store, max-age=0, must-revalidate",
      });
    }

    const headers = [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];

    // In production, add aggressive caching for static assets
    if (isProduction) {
      headers.push(
        {
          source: "/_next/static/:path*",
          headers: [
            { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
          ],
        },
        {
          source: "/:all*\.(js|css|svg|png|jpg|jpeg|gif|webp|ico|woff2?)",
          headers: [
            { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
          ],
        }
      );
    }

    return headers;
  },
};

export default withBundleAnalyzer(nextConfig);
