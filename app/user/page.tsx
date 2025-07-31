import NavBar from "@/components/NavBar";
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
import StackByStack, { StackCard } from "@/components/StackByStack";

export default function Home() {
  const cards: StackCard[] = [
    {
      id: 'sec-speed',
      top:   <>Enterprise-Grade<br/><span className="text-teal-400">Security</span></>,
      ribbon: <>SOC 2&nbsp;•&nbsp;ISO&nbsp;27001</>,
      bottom: <>Startup-Grade<br/><span className="text-teal-400">Speed</span></>,
    },
    {
      id: 'ai-ready',
      top: 'AI-Ready APIs',
      ribbon: '99.99 % uptime',
      bottom: 'Scale without ops',
    },
    {
      id: 'obs-five',
      top: 'Observability',
      ribbon: 'Zero-config tracing',
      bottom: 'Data-driven fixes',
    },
  ];

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
        <ComparisonSection />
        <StackByStack cards={cards} />
        <Message />
        <DemoCarousel />
      </main>
    </div>
  );
} 