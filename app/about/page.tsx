import HeroSection from "@/components/about/HeroSection";
import ValuesSection from "@/components/about/ValuesSection";
import BottomBanner from "@/components/about/BottomBanner";
import AboutSection from "@/components/about/AboutSection";
import FoundersSection from "@/components/about/FoundersSection";
import InvestorsSection from "@/components/about/Investor";
import AccoladesCarousel from "@/components/home/AccoladesCarousel";
import CTASection from "@/components/product/CTASection";

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