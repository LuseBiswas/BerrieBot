import HeroSection from "@/components/resources/HeroSection";
import ResourceCard from "@/components/resources/resourceCard";


export default function AboutPage() {
  return (
    <>
    <HeroSection />
    <div className="bg-white p-14">
    <ResourceCard
  image="/image/screenshot_2.png"
  title="Resource Title"
  description="Brief description of the resource"
  hoverButtonName="Learn More"
/>
    </div>

    </>
    
  );
} 