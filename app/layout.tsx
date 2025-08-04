import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/home/NavBar";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";


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
      <body className={`${inter.variable} font-sans`}>
        <DynamicBackground>
          <NavBar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </DynamicBackground>
      </body>
    </html>
  );
}
