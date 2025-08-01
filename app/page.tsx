import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import CarouselSection from "@/components/CarouselSection";
import FeatureCard from "@/components/FeatureCard";
import ComparisonSection from "@/components/ComparisonSection";
import Thought from "@/components/Thought";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import Message from "@/components/Message";
import DemoCarousel from "@/components/DemoCarousel";
import ProductFeature from "@/components/ProductFeature";
import StatsSection from "@/components/StatsSection";
import CompanyTestimonialSection from "@/components/CompanyTestimonialSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      {/* <Thought />
      <FeaturesSection /> */}
      <TestimonialSection />
      <CarouselSection />
      <FeatureCard />
      <ComparisonSection />
      <ProductFeature />
      <StatsSection />
      <CompanyTestimonialSection />
      <CTASection />
    </>
  );
} 