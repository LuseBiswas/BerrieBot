import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Enable ETags for better caching
  
  // Modern JavaScript configuration using SWC (faster than Babel)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Transpilation and polyfill optimization
  transpilePackages: [], // Only transpile packages that absolutely need it
  
  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,
  
  // SWC is enabled by default in Next.js 15.4+
  
  // Enhanced image optimization settings for 262 KiB savings
  images: {
    formats: ['image/avif', 'image/webp'], // Prioritize AVIF (better compression)
    deviceSizes: [96, 128, 256, 384, 412, 640, 750, 828, 1080, 1200, 1920], // Added specific mobile sizes
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 200, 256, 384, 412], // Added specific display sizes
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Aggressive optimization settings
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false, // Ensure all images are optimized
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'], // Tree shake large packages
    scrollRestoration: true,
    // Modern bundling
    esmExternals: true,
    // Image optimization improvements
    optimizeServerReact: true,
    // Optimize CSS loading
    optimizeCss: false, // Let Tailwind handle optimization
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300', // 5 minutes
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year for optimized images
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year for fonts
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ],
      },
      {
        source: '/image/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year for static images
          },
        ],
      },
    ];
  },

  // Webpack optimizations for modern browsers
  webpack: (config, { dev, isServer, webpack }) => {
    // Modern JavaScript target for client-side
    if (!isServer) {
      config.target = ['web', 'es2020'];
    }

    // Only apply optimizations in production and avoid server-side issues
    if (!dev && !isServer) {
      // Modern build optimizations
      config.optimization = {
        ...config.optimization,
        // Use modern module format
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Separate CSS chunks to reduce blocking
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              minChunks: 1,
              priority: 20,
              enforce: true,
            },
          },
        },
      };
      
      // Modern ES features - don't transpile for modern browsers
      config.module.rules.push({
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      });

      // Optimize font loading
      config.module.rules.push({
        test: /\.(woff|woff2|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'static/fonts/',
            publicPath: '/_next/static/fonts/',
          },
        },
      });

      // Define environment for dead code elimination
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      );
    }

    return config;
  },
};

export default nextConfig;
