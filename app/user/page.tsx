import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import CompaniesSection from "@/components/CompaniesSection";
import CarouselSection from "@/components/CarouselSection";
import FeatureCard from "@/components/FeatureCard";
import Thought from "@/components/Thought";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialSection from "@/components/TestimonialSection";
import Message from "@/components/Message";
import DemoCarousel from "@/components/DemoCarousel";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-pinstripes bg-fixed text-white overflow-x-hidden">
      <NavBar />
      <main className="flex-1 w-full">
        <HeroSection />
        <CompaniesSection />
        {/* <Thought />
        <FeaturesSection /> */}
        <TestimonialSection />
        <CarouselSection />
        <FeatureCard />
        <Message />
        <DemoCarousel />
      </main>
    </div>
  );
} 