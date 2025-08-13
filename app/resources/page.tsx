import BlogResource from "@/components/resources/blogResource";
import CTASection from "@/components/resources/CTASection";
import FAQComponent from "@/components/resources/faq/faqComponent";
import HeroSection from "@/components/resources/HeroSection";


export default function ResourcePage() {
  return (
    <>
    <HeroSection />
    <FAQComponent/>
    <BlogResource/>
    
    <CTASection/>
    </>
    
  );
} 