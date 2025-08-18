import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DeviceWrapper from "@/components/DeviceWrapper";
import Script from "next/script";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} font-manrope`}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
      </body>
    </html>
  );
}
