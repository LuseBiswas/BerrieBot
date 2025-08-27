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
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
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

        {/* Preload critical fonts to prevent render blocking */}
        <link
          rel="preload"
          href="/fonts/dogicapixel.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        {/* Preload critical Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZHBLPB04Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZHBLPB04Y');
          `}
        </Script>

      </head>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
      </body>
    </html>
  );
}
