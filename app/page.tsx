import CompaniesSection from "@/components/home/CompaniesSection";
import CarouselSection from "@/components/home/CarouselSection";
import FeatureCard from "@/components/home/FeatureCard";
import ComparisonSection from "@/components/home/ComparisonSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ProductFeature from "@/components/home/ProductFeature";
import StatsSection from "@/components/home/StatsSection";
import CompanyTestimonialSection from "@/components/home/CompanyTestimonialSection";
import CTASection from "@/components/home/CTASection";
import CarouselSection_2 from "@/components/product/CarouselSection";
import YtTestimonial from "@/components/product/ytTestimonial";

export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
        <YtTestimonial/>
      <CarouselSection_2/> 
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