import CompaniesSection from "@/components/desktop/home/CompaniesSection";
import CarouselSection from "@/components/desktop/home/CarouselSection";
import FeatureCard from "@/components/desktop/home/FeatureCard";
import ComparisonSection from "@/components/desktop/home/ComparisonSection";
import TestimonialSection from "@/components/desktop/home/TestimonialSection";
import ProductFeature from "@/components/desktop/home/ProductFeature";
import StatsSection from "@/components/desktop/home/StatsSection";
import CompanyTestimonialSection from "@/components/desktop/home/CompanyTestimonialSection";
import CTASection from "@/components/desktop/home/CTASection";
import CarouselSection_2 from "@/components/desktop/product/CarouselSection";
import YtTestimonial from "@/components/desktop/product/ytTestimonial";
import AgeticSpcae from "@/components/desktop/home/AgeticSpcae";

export default function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      <YtTestimonial />
      {/* <StarCardBG className="min-h-screen p-8">
        <Card
          heading="Your Heading Here"
          description="Your description text here..."
          className="max-w-md mx-auto"
        />
      </StarCardBG> */}
      <AgeticSpcae />
      <CarouselSection_2 />
      <CompaniesSection />
      <TestimonialSection />
      
      <FeatureCard />
     
      
      <ComparisonSection />
      <ProductFeature />
      <StatsSection />
      <CompanyTestimonialSection />
      <CTASection />
    </>
  );
}
