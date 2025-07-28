import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-pinstripes bg-fixed text-white">
      <NavBar />
      <main className="flex-1 w-full">
        <HeroSection />
      </main>
    </div>
  );
} 