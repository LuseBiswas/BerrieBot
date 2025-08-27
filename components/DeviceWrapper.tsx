"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Desktop components - only load on desktop
const NavBar = dynamic(() => import("@/components/desktop/home/NavBar"), {
  ssr: true,
  loading: () => <div className="h-16 bg-black" />
});
const Footer = dynamic(() => import("@/components/desktop/Footer"), {
  ssr: true,
  loading: () => <div className="h-32 bg-black" />
});
const DynamicBackground = dynamic(() => import("@/components/desktop/DynamicBackground"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />
});

// Mobile components - only load on mobile
const MobileNavBar = dynamic(() => import("@/components/mobile/NavBar"), {
  ssr: false,
  loading: () => <div className="h-16 bg-black" />
});
const MobileFooter = dynamic(() => import("@/components/mobile/Footer"), {
  ssr: false,
  loading: () => <div className="h-32 bg-black" />
});
const MobileDynamicBackground = dynamic(() => import("@/components/mobile/DynamicBackground"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />
});
const BottomNavBar = dynamic(() => import("@/components/mobile/BottomNavBar"), {
  ssr: false,
  loading: () => <div className="h-16 bg-black" />
});

// Mobile page components - conditionally load based on route and device
const MobileHeroSection = dynamic(() => import("@/components/mobile/home/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileLineSection = dynamic(() => import("@/components/mobile/home/LineSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileBrandCarousel = dynamic(() => import("@/components/mobile/home/BrandCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileProductDisplay = dynamic(() => import("@/components/mobile/home/ProductDisplay"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileFeatureCard = dynamic(() => import("@/components/mobile/home/FeatureCard"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileComparisonSection = dynamic(() => import("@/components/mobile/home/ComparisonSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileProductFeature = dynamic(() => import("@/components/mobile/home/ProductFeature"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileStatsSection = dynamic(() => import("@/components/mobile/home/StatsSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileTestimonialCarousel = dynamic(() => import("@/components/mobile/home/TestimonialCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileCTASection = dynamic(() => import("@/components/mobile/home/CTASection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

// Mobile resource components
const MobileResourcesHeroSection = dynamic(() => import("@/components/mobile/resources/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileFAQComponent = dynamic(() => import("@/components/mobile/resources/faq/faqComponent"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileBlogResource = dynamic(() => import("@/components/mobile/resources/blogResource"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileResourceCTASection = dynamic(() => import("@/components/mobile/resources/CTASection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

// Other mobile page components - only loaded when needed
const MobileSolutionsHeroSection = dynamic(() => import("@/components/mobile/solutions/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileSolutionsCarousel = dynamic(() => import("@/components/mobile/solutions/SolutionsCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileSolutionsCarousel_2 = dynamic(() => import("@/components/mobile/solutions/SolutionsCarousel_2"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileSolutionsCarousel_3 = dynamic(() => import("@/components/mobile/solutions/SolutionsCarousel_3"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MobileDemoHeroSection = dynamic(() => import("@/components/mobile/demo/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileContactForm = dynamic(() => import("@/components/mobile/demo/ContactForm"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MobileAboutHeroSection = dynamic(() => import("@/components/mobile/about/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileCompanyCarousel = dynamic(() => import("@/components/mobile/about/CompanyCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileAboutSubHeroSection = dynamic(() => import("@/components/mobile/about/SubHeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileAboutProductDisplay = dynamic(() => import("@/components/mobile/about/AboutProductDisplay"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileAboutStatsSection = dynamic(() => import("@/components/mobile/about/AboutStatsSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileAboutFounderCarousel = dynamic(() => import("@/components/mobile/about/FounderCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MobileProductHeroSection = dynamic(() => import("@/components/mobile/product/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileProductCarousel = dynamic(() => import("@/components/mobile/product/ProductCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileProductXFeature = dynamic(() => import("@/components/mobile/product/Product2Feature"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileComparisonXSection = dynamic(() => import("@/components/mobile/product/ComparisonXSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileProductTestimonialCarousel = dynamic(() => import("@/components/mobile/product/TestimonialCarousel"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileBottomBanner = dynamic(() => import("@/components/mobile/product/BottomBanner"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MobileCookiesHeroSection = dynamic(() => import("@/components/mobile/cookies/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobileCookiesComponent = dynamic(() => import("@/components/mobile/cookies/cookies"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MobilePolicyHeroSection = dynamic(() => import("@/components/mobile/policy/HeroSection"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});
const MobilePrivacyPolicyComponent = dynamic(() => import("@/components/mobile/policy/privacy"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

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
              priority
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

  // Mobile experience - only load mobile components when needed
  if (isMobile) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <MobileDynamicBackground>
          <MobileNavBar />
          <BottomNavBar />
          <main className="flex-1 w-full">
            {pathname === "/" ? (
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
                <MobileBlogResource/>
                <MobileResourcesHeroSection />
                <MobileFAQComponent/>
                <div className="-mt-12">
                <MobileResourceCTASection/>
                </div>
                
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
            ) : (
              // Fallback for unknown routes
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

  // Desktop experience - only load desktop components
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DynamicBackground>
        <NavBar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </DynamicBackground>
    </Suspense>
  );
} 