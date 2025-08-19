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
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-manrope`}>
        <DeviceWrapper>
          {children}
        </DeviceWrapper>
      </body>
    </html>
  );
}
