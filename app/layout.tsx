import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Optimized font loading to reduce critical path
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'arial']
});

const manrope = Manrope({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-manrope',
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "BerriBot - AI-Powered Recruitment Assistant",
  description: "Streamline your hiring process with BerriBot's AI-powered recruitment solutions. Find the best candidates faster and more efficiently.",
  keywords: "AI recruitment, hiring assistant, talent acquisition, automated screening",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* Critical resource hints - moved to head for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.lordicon.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        
        {/* Preload critical font to reduce critical path */}
        <link 
          rel="preload" 
          href="/fonts/dogicapixel.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
        
        {/* Critical CSS inlined to prevent render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            html, body { 
              margin: 0; 
              padding: 0; 
              font-family: var(--font-inter), system-ui, arial; 
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              text-rendering: optimizeSpeed;
            }
            .loading-skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            /* Prevent layout shift */
            img, video, iframe { max-width: 100%; height: auto; }
            /* GPU acceleration for animations */
            .gpu-accelerated { transform: translateZ(0); will-change: transform; }
          `
        }} />
      </head>
      <body className={`${inter.className} ${manrope.className}`}>
        {children}
        
        {/* Non-critical scripts loaded asynchronously after page load */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FN9N7N8SS"
          strategy="afterInteractive"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FN9N7N8SS', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `}
        </Script>
        
        {/* Defer non-critical lordicon script */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="lazyOnload"
          async
        />
      </body>
    </html>
  );
}
