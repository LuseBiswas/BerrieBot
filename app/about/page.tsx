import HeroSection from "@/components/desktop/about/HeroSection";
import ValuesSection from "@/components/desktop/about/ValuesSection";
import BottomBanner from "@/components/desktop/about/BottomBanner";
import AboutSection from "@/components/desktop/about/AboutSection";
import FoundersSection from "@/components/desktop/about/FoundersSection";
import InvestorsSection from "@/components/desktop/about/Investor";
import AccoladesCarousel from "@/components/desktop/home/AccoladesCarousel";
import CTASection from "@/components/desktop/product/CTASection";

export default function AboutPage() {
  return (
    <>
    <HeroSection />
    <div className="mt-[00px]">
    <BottomBanner/>
    </div>
    
    <ValuesSection />
    <AboutSection/>
    <FoundersSection/>
    <InvestorsSection/>
    <AccoladesCarousel/>
    <CTASection/>
    </>
    
  );
} 