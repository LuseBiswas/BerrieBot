import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24">
      {/* Beta Badge */}
      <div className="mb-12">
        <div className="inline-flex items-center bg-[#6FB5B27A] text-white px-6 py-3 rounded-full text-sm font-medium">
          <span className="font-bold">BerriBot</span>
          <span className="ml-2 text-white/90">is currently in beta</span>
          <ChevronRight className="ml-2 w-4 h-4" />
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center max-w-5xl mx-auto px-6">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-16">
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
            Meet the most
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent">
            complete AI
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 bg-clip-text text-transparent">
            recruiting platform
          </span>
        </h1>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <button className="bg-teal-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-500 transition-colors">
          Book a Demo
          <ChevronRight className="inline-block ml-2 w-5 h-5" />
        </button>
      </div>
    </section>
  );
}