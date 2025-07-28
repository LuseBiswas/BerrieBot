import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 sm:px-6">
      {/* Beta Badge */}
      <div className="mb-8 sm:mb-12 mt-10">
        <div className="inline-flex items-center bg-[#6FB5B27A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium">
          <span className="font-bold">BerriBot</span>
          <span className="ml-2 text-white/90">is currently in beta</span>
          <ChevronRight className="ml-2 w-4 h-4" />
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center w-full max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] sm:tracking-[-3.69px] mb-8 sm:mb-16">
          <span className="bg-gradient-to-br from-[#FFFFFF] to-[#037F79] bg-clip-text text-transparent">
            Meet the most
          </span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-br from-[#FFFFFF] to-[#037F79] bg-clip-text text-transparent">
            complete AI
          </span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-br from-[#FFFFFF] to-[#037F79] bg-clip-text text-transparent">
            recruiting platform
          </span>
        </h1>

        <p className="text-base sm:text-[20px] leading-[22px] sm:leading-[26px] font-normal text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
          Hire high-quality candidates at scale with AI that{" "}
          <span className="sm:hidden">
            screens, verifies and interviews with a human touch.
          </span>
          <span className="hidden sm:inline">
            <br /> screens, verifies and interviews with a human touch.
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-4 sm:mt-8 w-full sm:w-auto px-4 sm:px-0">
        <button className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-teal-500 transition-colors">
          Book a Demo
          <ChevronRight className="inline-block ml-2 w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>

      {/* Screenshot */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6">
        <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/image/screenshot_1.png"
            alt="BerriBot Dashboard Screenshot"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}