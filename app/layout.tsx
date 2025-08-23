import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import DeviceWrapper from "@/components/DeviceWrapper";
import Script from "next/script";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Keep reduced weights from shot-3
  variable: "--font-manrope",
  display: 'swap',
  preload: true, // Add preload from main
  fallback: ['system-ui', 'arial'], // Add fallback from main
});

export const metadata: Metadata = {
  title: "BerriBot - AI Recruiting Platform",
  description: "The most complete AI recruiting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FN9N7N8SS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9FN9N7N8SS');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-manrope`}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
        
        {/* Non-critical scripts loaded asynchronously after page load */}
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
