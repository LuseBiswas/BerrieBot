import { Suspense } from "react";
import HeroSection from "@/components/desktop/product/HeroSection";
import CTASection from "@/components/desktop/product/CTASection";
import ProductFeature from "@/components/desktop/product/ProductFeature";
import ComparisonSection from "@/components/desktop/product/ComparisonSection";
import CompanyTestimonialSection from "@/components/desktop/product/CompanyTestimonialSection";
import LineSection from "@/components/desktop/product/LineSection";
import BottomBanner from "@/components/desktop/product/BottomBanner";
import CommentCarousel from "@/components/desktop/product/CommentCarousel";

export default function Product() {
  return (
    <>
      <HeroSection /> 
      <Suspense fallback={<div>Loading...</div>}>
        <CommentCarousel/>
      </Suspense>
      <ProductFeature/>
      
      <ComparisonSection/>
      <CompanyTestimonialSection/>
      <LineSection/>
      <div className="mb-[-180px]">
      <BottomBanner/>
      </div>
      <CTASection />
      
    </>
  );
} 