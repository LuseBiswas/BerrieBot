
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
      <div id="we-are-berribot">
        <MobileAboutHeroSection/>
      </div>
      <MobileCompanyCarousel/>
      <div id="our-mission">
        <MobileAboutSubHeroSection/>
      </div>
      <div id="what-we-do">
        <MobileAboutProductDisplay/>
      </div>
      <MobileAboutStatsSection/>
      <div id="our-leaders" className="-mb-44">
        <MobileAboutFounderCarousel/>
      </div>
      <CTASection/>
    </>
    
  );
} 