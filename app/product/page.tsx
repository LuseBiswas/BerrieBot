import { Suspense } from "react";
import HeroSection from "@/components/product/HeroSection";
import CTASection from "@/components/product/CTASection";
import ProductFeature from "@/components/product/ProductFeature";
import ComparisonSection from "@/components/product/ComparisonSection";
import CompanyTestimonialSection from "@/components/product/CompanyTestimonialSection";
import LineSection from "@/components/product/LineSection";
import BottomBanner from "@/components/product/BottomBanner";
import CommentCarousel from "@/components/product/CommentCarousel";

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