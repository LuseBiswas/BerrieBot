"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { usePathname } from "next/navigation";
import NavBar from "@/components/desktop/home/NavBar";
import Footer from "@/components/desktop/Footer";
import DynamicBackground from "@/components/desktop/DynamicBackground";
import MobileNavBar from "@/components/mobile/NavBar";
import MobileFooter from "@/components/mobile/Footer";
import MobileDynamicBackground from "@/components/mobile/DynamicBackground";
import MobileHeroSection from "@/components/mobile/home/HeroSection";
import MobileLineSection from "@/components/mobile/home/LineSection";
import MobileBrandCarousel from "@/components/mobile/home/BrandCarousel";
import BottomNavBar from "@/components/mobile/BottomNavBar";
import MobileProductDisplay from "./mobile/home/ProductDisplay";
import MobileFeatureCard from "./mobile/home/FeatureCard";
import MobileComparisonSection from "./mobile/home/ComparisonSection";
import MobileProductFeature from "./mobile/home/ProductFeature";
import MobileStatsSection from "./mobile/home/StatsSection";
import MobileTestimonialCarousel from "./mobile/home/TestimonialCarousel";
import MobileCTASection from "./mobile/home/CTASection";

interface DeviceWrapperProps {
  children: React.ReactNode;
}

export default function DeviceWrapper({ children }: DeviceWrapperProps) {
  const { isMobile, isLoading } = useDeviceType();
  const pathname = usePathname();

  // Show loading state during device detection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Mobile experience - with mobile navbar
  if (isMobile) {
    // Check if we have mobile components for this page
    const hasMobileVersion = pathname === "/";
    
    return (
      <MobileDynamicBackground>
        <MobileNavBar />
        <BottomNavBar />
        <main className="flex-1 w-full">
          {hasMobileVersion ? (
            // Show mobile-specific components
            pathname === "/" ? (
              <>
                <MobileHeroSection />
                <MobileLineSection />
                <MobileBrandCarousel />
                <MobileProductDisplay />
                <MobileFeatureCard />
                <MobileComparisonSection/>
                <MobileProductFeature/>
                <MobileStatsSection/>
                <MobileTestimonialCarousel/>
                <MobileCTASection/>
              </>
            ) : children
          ) : (
            // Show coming soon for pages without mobile components
            <div className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Mobile Version</h1>
                <p className="text-gray-400 mb-6">
                  This page is being optimized for mobile. Please visit on desktop for the full experience.
                </p>
                <button 
                  onClick={() => window.history.back()} 
                  className="bg-[#04BBA6] text-white px-6 py-3 rounded-lg hover:bg-[#03a693] transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </main>
        <MobileFooter />
      </MobileDynamicBackground>
    );
  }

  // Desktop experience - existing components
  return (
    <DynamicBackground>
      <NavBar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </DynamicBackground>
  );
} 