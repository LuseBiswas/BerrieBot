import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-pinstripes text-white">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  );
} 