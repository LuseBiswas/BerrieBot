"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic imports for desktop components - only load on desktop
const NavBar = dynamic(() => import("@/components/desktop/home/NavBar"));
const Footer = dynamic(() => import("@/components/desktop/Footer"));
const DynamicBackground = dynamic(() => import("@/components/desktop/DynamicBackground"));

// Dynamic imports for mobile components - only load on mobile
const MobileNavBar = dynamic(() => import("@/components/mobile/NavBar"));
const MobileFooter = dynamic(() => import("@/components/mobile/Footer"));
const MobileDynamicBackground = dynamic(() => import("@/components/mobile/DynamicBackground"));
const MobileHeroSection = dynamic(() => import("@/components/mobile/home/HeroSection"));
const MobileLineSection = dynamic(() => import("@/components/mobile/home/LineSection"));
const MobileBrandCarousel = dynamic(() => import("@/components/mobile/home/BrandCarousel"));
const BottomNavBar = dynamic(() => import("@/components/mobile/BottomNavBar"));
const MobileProductDisplay = dynamic(() => import("./mobile/home/ProductDisplay"));
const MobileFeatureCard = dynamic(() => import("./mobile/home/FeatureCard"));
const MobileComparisonSection = dynamic(() => import("./mobile/home/ComparisonSection"));
const MobileProductFeature = dynamic(() => import("./mobile/home/ProductFeature"));
const MobileStatsSection = dynamic(() => import("./mobile/home/StatsSection"));
const MobileTestimonialCarousel = dynamic(() => import("./mobile/home/TestimonialCarousel"));
const MobileCTASection = dynamic(() => import("./mobile/home/CTASection"));
const MobileResourcesHeroSection = dynamic(() => import("./mobile/resources/HeroSection"));
const MobileFAQComponent = dynamic(() => import("./mobile/resources/faq/faqComponent"));
const MobileBlogResource = dynamic(() => import("./mobile/resources/blogResource"));
const MobileSolutionsHeroSection = dynamic(() => import("./mobile/solutions/HeroSection"));
const MobileSolutionsCarousel = dynamic(() => import("./mobile/solutions/SolutionsCarousel"));
const MobileSolutionsCarousel_2 = dynamic(() => import("./mobile/solutions/SolutionsCarousel_2"));
const MobileSolutionsCarousel_3 = dynamic(() => import("./mobile/solutions/SolutionsCarousel_3"));
const MobileDemoHeroSection = dynamic(() => import("./mobile/demo/HeroSection"));
const MobileContactForm = dynamic(() => import("./mobile/demo/ContactForm"));
const MobileAboutHeroSection = dynamic(() => import("./mobile/about/HeroSection"));
const MobileCompanyCarousel = dynamic(() => import("./mobile/about/CompanyCarousel"));
const MobileAboutSubHeroSection = dynamic(() => import("./mobile/about/SubHeroSection"));
const MobileAboutProductDisplay = dynamic(() => import("./mobile/about/AboutProductDisplay"));
const MobileAboutStatsSection = dynamic(() => import("./mobile/about/AboutStatsSection"));
const MobileAboutFounderCarousel = dynamic(() => import("./mobile/about/FounderCarousel"));
const MobileResourceCTASection = dynamic(() => import("./mobile/resources/CTASection"));
const MobileProductHeroSection = dynamic(() => import("./mobile/product/HeroSection"));
const MobileProductCarousel = dynamic(() => import("./mobile/product/ProductCarousel"));
const MobileProductXFeature = dynamic(() => import("./mobile/product/Product2Feature"));
const MobileComparisonXSection = dynamic(() => import("./mobile/product/ComparisonXSection"));
const MobileProductTestimonialCarousel = dynamic(() => import("./mobile/product/TestimonialCarousel"));
const MobileCookiesHeroSection = dynamic(() => import("./mobile/cookies/HeroSection"));
const MobileCookiesComponent = dynamic(() => import("./mobile/cookies/cookies"));
const MobilePolicyHeroSection = dynamic(() => import("./mobile/policy/HeroSection"));
const MobilePrivacyPolicyComponent = dynamic(() => import("./mobile/policy/privacy"));
const MobileBottomBanner = dynamic(() => import("./mobile/product/BottomBanner"));

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
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <MobileDynamicBackground>
          <Suspense fallback={<div className="h-16 bg-black" />}>
            <MobileNavBar />
          </Suspense>
          <Suspense fallback={<div className="h-16 bg-black" />}>
            <BottomNavBar />
          </Suspense>
          <main className="flex-1 w-full">
            {hasMobileVersion ? (
              // Show mobile-specific components with progressive loading
              pathname === "/" ? (
                <>
                  <Suspense fallback={<div className="min-h-screen bg-black" />}>
                    <MobileHeroSection />
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[400px] bg-black" />}>
                    <MobileLineSection />
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[300px] bg-black" />}>
                    <MobileBrandCarousel />
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[500px] bg-black" />}>
                    <MobileProductDisplay />
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
                    <MobileFeatureCard />
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[500px] bg-black" />}>
                    <MobileComparisonSection/>
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[400px] bg-black" />}>
                    <MobileProductFeature/>
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[500px] bg-black" />}>
                    <MobileStatsSection/>
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[400px] bg-black" />}>
                    <MobileTestimonialCarousel/>
                  </Suspense>
                  <Suspense fallback={<div className="min-h-[300px] bg-black" />}>
                    <MobileCTASection/>
                  </Suspense>
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
      </Suspense>
    );
  }

  // Desktop experience - existing components
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DynamicBackground>
        <Suspense fallback={<div className="h-16 bg-black" />}>
          <NavBar />
        </Suspense>
        <main className="flex-1 w-full">
          {children}
        </main>
        <Suspense fallback={<div className="h-16 bg-black" />}>
          <Footer />
        </Suspense>
      </DynamicBackground>
    </Suspense>
  );
} 