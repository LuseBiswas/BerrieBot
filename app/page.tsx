import HeroSection from "@/components/home/HeroSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import CarouselSection from "@/components/home/CarouselSection";
import FeatureCard from "@/components/home/FeatureCard";
import ComparisonSection from "@/components/home/ComparisonSection";
import Thought from "@/components/home/Thought";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import Message from "@/components/home/Message";
import DemoCarousel from "@/components/home/DemoCarousel";
import ProductFeature from "@/components/home/ProductFeature";
import StatsSection from "@/components/home/StatsSection";
import CompanyTestimonialSection from "@/components/home/CompanyTestimonialSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
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