import dynamic from 'next/dynamic';
import CompaniesSection from "@/components/desktop/home/CompaniesSection";
import YtTestimonial from "@/components/desktop/product/ytTestimonial";
import AgeticSpcae from "@/components/desktop/home/AgeticSpcae";

// Dynamic imports for non-critical components to improve initial load
const FeatureCard = dynamic(() => import("@/components/desktop/home/FeatureCard"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />
});

const ComparisonSection = dynamic(() => import("@/components/desktop/home/ComparisonSection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-100" />
});

const TestimonialSection = dynamic(() => import("@/components/desktop/home/TestimonialSection"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />
});

const ProductFeature = dynamic(() => import("@/components/desktop/home/ProductFeature"), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100" />
});

const StatsSection = dynamic(() => import("@/components/desktop/home/StatsSection"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />
});

const CompanyTestimonialSection = dynamic(() => import("@/components/desktop/home/CompanyTestimonialSection"), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />
});

const CTASection = dynamic(() => import("@/components/desktop/home/CTASection"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100" />
});

const CarouselSection_2 = dynamic(() => import("@/components/desktop/product/CarouselSection"), {
  loading: () => <div className="min-h-[500px] animate-pulse bg-gray-100" />
});

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content loads immediately */}
      <YtTestimonial />
      <AgeticSpcae />
      
      {/* Non-critical content loads dynamically */}
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
