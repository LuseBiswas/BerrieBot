
import MobileAboutProductDisplay from "@/components/desktop/about/AboutProductDisplay";
import MobileAboutStatsSection from "@/components/desktop/about/AboutStatsSection";
import MobileCompanyCarousel from "@/components/desktop/about/CompanyCarousel";
import MobileAboutFounderCarousel from "@/components/desktop/about/FounderCarousel";
import MobileAboutHeroSection from "@/components/desktop/about/HeroSection copy";
import MobileAboutSubHeroSection from "@/components/desktop/about/SubHeroSection";
import CTASection from "@/components/desktop/product/CTASection";

export default function AboutPage() {
  return (
    <>
    <MobileAboutHeroSection/>
    <MobileCompanyCarousel/>
    <MobileAboutSubHeroSection/>
    <MobileAboutProductDisplay/>
    <MobileAboutStatsSection/>
    <MobileAboutFounderCarousel/>
    <CTASection/>
    </>
    
  );
} 