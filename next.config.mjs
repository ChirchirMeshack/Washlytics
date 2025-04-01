/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Warning: This allows production builds to successfully complete even if
      // your project has TypeScript errors.
      ignoreBuildErrors: true,
    },
    // Enable React strict mode for better development experience
    reactStrictMode: true,
    
    // Enable image optimization
    images: {
      domains: ['placeholder.svg', 'images.unsplash.com'],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    },
    
    // Enable experimental features
    experimental: {
      // Enable server components
      serverComponents: true,
      // Enable concurrent features
      concurrentFeatures: true,
      // Enable server actions
      serverActions: true,
      // Enable optimized bundle splitting
      optimizeCss: true,
      // Enable memory optimization
      optimizeServerReact: true,
    },
    
    // Configure webpack for performance
    webpack: (config, { dev, isServer }) => {
      // Add bundle analyzer in development
      if (dev && !isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: false,
          })
        );
      }
      
      // Optimize CSS
      if (!dev) {
        config.optimization.splitChunks.cacheGroups.styles = {
          name: 'styles',
          test: /\.(css|scss)$/,
          chunks: 'all',
          enforce: true,
        };
      }
      
      return config;
    },
    
    // Configure headers for security and performance
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
        {
          source: '/api/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate',
            },
          ],
        },
        {
          source: '/_next/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
  