import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import DeviceWrapper from "@/components/DeviceWrapper";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true,
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
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://cdn.lordicon.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        
        {/* LordIcon script with optimized loading */}
        <Script 
          src="https://cdn.lordicon.com/lordicon.js" 
          strategy="lazyOnload"
          async
        />
        
        {/* Google Analytics with optimized loading */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9FN9N7N8SS"
          strategy="lazyOnload"
          async
        />
        <Script id="google-analytics" strategy="lazyOnload">
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
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-manrope`}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
      </body>
    </html>
  );
}
