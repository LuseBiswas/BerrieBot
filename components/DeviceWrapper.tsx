"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
import MobileResourcesHeroSection from "./mobile/resources/HeroSection";
import MobileFAQComponent from "./mobile/resources/faq/faqComponent";
import MobileBlogResource from "./mobile/resources/blogResource";
import MobileSolutionsHeroSection from "./mobile/solutions/HeroSection";
import MobileSolutionsCarousel from "./mobile/solutions/SolutionsCarousel";
import MobileSolutionsCarousel_2 from "./mobile/solutions/SolutionsCarousel_2";
import MobileSolutionsCarousel_3 from "./mobile/solutions/SolutionsCarousel_3";
import MobileDemoHeroSection from "./mobile/demo/HeroSection";
import MobileContactForm from "./mobile/demo/ContactForm";
import MobileAboutHeroSection from "./mobile/about/HeroSection";
import MobileCompanyCarousel from "./mobile/about/CompanyCarousel";
import MobileAboutSubHeroSection from "./mobile/about/SubHeroSection";
import MobileAboutProductDisplay from "./mobile/about/AboutProductDisplay";
import MobileAboutStatsSection from "./mobile/about/AboutStatsSection";
import MobileAboutFounderCarousel from "./mobile/about/FounderCarousel";
import MobileResourceCTASection from "./mobile/resources/CTASection";
import MobileProductHeroSection from "./mobile/product/HeroSection";
import MobileProductCarousel from "./mobile/product/ProductCarousel";
import MobileProductXFeature from "./mobile/product/Product2Feature";
import MobileComparisonXSection from "./mobile/product/ComparisonXSection";
import MobileProductTestimonialCarousel from "./mobile/product/TestimonialCarousel";
import MobileCookiesHeroSection from "./mobile/cookies/HeroSection";
import MobileCookiesComponent from "./mobile/cookies/cookies";
import MobilePolicyHeroSection from "./mobile/policy/HeroSection";
import MobilePrivacyPolicyComponent from "./mobile/policy/privacy";
import MobileBottomBanner from "./mobile/product/BottomBanner";

interface DeviceWrapperProps {
  children: React.ReactNode;
}

export default function DeviceWrapper({ children }: DeviceWrapperProps) {
  const { isMobile, isLoading } = useDeviceType();
  const pathname = usePathname();
  
  // State management for mobile cookies page
  const [mobilePrivacyState, setMobilePrivacyState] = useState<'initial' | 'expanded' | 'confirmation'>('initial');

  const handleMobileConfirmationChoice = (choice: 'back' | 'readAgain') => {
    if (choice === 'back') {
      setMobilePrivacyState('initial');
    } else {
      setMobilePrivacyState('expanded');
    }
  };

  const handleMobileReadPrivacy = () => {
    setMobilePrivacyState('expanded');
  };

  // State management for mobile policy page
  const [mobilePolicyState, setMobilePolicyState] = useState<'initial' | 'expanded' | 'confirmation'>('initial');

  const handleMobilePolicyConfirmationChoice = (choice: 'back' | 'readAgain') => {
    if (choice === 'back') {
      setMobilePolicyState('initial');
    } else {
      setMobilePolicyState('expanded');
    }
  };

  const handleMobilePolicyReadPrivacy = () => {
    setMobilePolicyState('expanded');
  };

  // Show loading state during device detection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-12 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>

        {/* Large Logo with Expansive Radial Animation */}
        <div className="relative w-32 h-32 flex items-center justify-center z-10">
          {/* Large Ripple circles - filling screen */}
          <motion.div
            className="absolute w-32 h-32 border-2 border-[#00AD96]/60 rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 4, 8], 
              opacity: [0.8, 0.4, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeOut",
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-[#00AD96]/50 rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 4, 8], 
              opacity: [0.7, 0.3, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeOut", 
              delay: 1.2,
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-[#00AD96]/40 rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 4, 8], 
              opacity: [0.6, 0.2, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeOut", 
              delay: 2.4,
              repeatDelay: 0.5
            }}
          />

          {/* Logo with pulse animation */}
          <motion.div
            className="relative w-24 h-24 rounded-full overflow-hidden z-20 bg-black/20 backdrop-blur-sm flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(0, 173, 150, 0.3)",
                "0 0 40px rgba(0, 173, 150, 0.6)", 
                "0 0 20px rgba(0, 173, 150, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              src="/image/logo.png" 
              alt="BerriBot Logo" 
              width={80} 
              height={80} 
              className="object-contain" 
            />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.p 
            className="text-white text-lg font-light tracking-wide"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading BerriBot...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Mobile experience - with mobile navbar
  if (isMobile) {
    // Check if we have mobile components for this page
    const hasMobileVersion = pathname === "/" || pathname === "/resources" || pathname === "/solutions" || pathname === "/schedule" || pathname === "/about" || pathname === "/product" || pathname === "/cookies" || pathname === "/policy";
    
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
            ) : pathname === "/resources" ? (
              <>
                <MobileResourcesHeroSection />
                <MobileFAQComponent/>
                <MobileBlogResource/>
                <MobileResourceCTASection/>
              </>
            ) : pathname === "/solutions" ? (
              <>
                <MobileSolutionsHeroSection />
                <MobileSolutionsCarousel />
                <MobileSolutionsCarousel_2/>
                <MobileSolutionsCarousel_3/>
                <MobileCTASection/>
              </>
            ) : pathname === "/schedule" ? (
              <>
                
                <MobileDemoHeroSection/>
                <MobileContactForm/>
              </>
            ) : pathname === "/about" ? (
              <>
                <MobileAboutHeroSection/>
                <MobileCompanyCarousel/>
                <MobileAboutSubHeroSection/>
                <MobileAboutProductDisplay/>
                <MobileAboutStatsSection/>
                <MobileAboutFounderCarousel/>
                <MobileCTASection/>
              </>
            ) : pathname === "/product" ? (
              <>
                <MobileProductHeroSection/>
                <MobileProductCarousel/>
                <MobileProductXFeature/>
                <MobileComparisonXSection/>
                <MobileProductTestimonialCarousel/>
                <MobileBottomBanner/>
                <MobileCTASection/>
              </>
            ) : pathname === "/cookies" ? (
              <>
                <MobileCookiesHeroSection 
                  showConfirmationText={mobilePrivacyState === 'confirmation'} 
                  onConfirmationChoice={handleMobileConfirmationChoice}
                  onReadPrivacy={handleMobileReadPrivacy}
                />
                <MobileCookiesComponent 
                  state={mobilePrivacyState} 
                  onStateChange={setMobilePrivacyState} 
                />
                
              </>
            ) : pathname === "/policy" ? (
              <>
                <MobilePolicyHeroSection 
                  showConfirmationText={mobilePolicyState === 'confirmation'} 
                  onConfirmationChoice={handleMobilePolicyConfirmationChoice}
                  onReadPrivacy={handleMobilePolicyReadPrivacy}
                />
                <MobilePrivacyPolicyComponent 
                  state={mobilePolicyState} 
                  onStateChange={setMobilePolicyState} 
                />
                
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