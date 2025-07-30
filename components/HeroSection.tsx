'use client'
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 mb-32 bg-black">
      {/* Positioned Boxes with Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Box */}
        <motion.div 
          className="absolute top-90 left-30 w-[320px] h-[320px] border-2 border-teal-400 rounded-2xl"
          style={{
            boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)"
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        {/* Top Right Box */}
        <motion.div 
          className="absolute top-70 right-20 w-[320px] h-[320px] border-2 border-teal-400 rounded-2xl"
          style={{
            boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)"
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        ></motion.div>
        
        {/* Bottom Left Box */}
        <motion.div 
          className="absolute bottom-[-150] left-110 w-[320px] h-[320px] border-2 border-teal-400 rounded-2xl"
          style={{
            boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)"
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Bottom Right Box */}
        <motion.div 
          className="absolute bottom-[0] right-75 w-[320px] h-[320px] border-2 border-teal-400 rounded-2xl"
          style={{
            boxShadow: "0 0 40px rgba(45, 212, 191, 0.2)"
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        ></motion.div>
      </div>

      {/* Beta Badge */}
      <div className="mb-2 mt-10 relative z-10">
        <div className="inline-flex items-center text-white px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium">
          <span className="text-white font-bold text-3xl">Automate Interviews. Verify Talent. Hire Smarter.</span>
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10">
        <h1 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl  tracking-[-2px] sm:tracking-[-3.69px] mb-8 sm:mb-8">
          <span className="text-white">
            The future of
          </span>
          <br />
          <span className="bg-gradient-to-br from-gray-500 to-gray-800 text-transparent bg-clip-text">
            Recruiting{" "}
          </span>
          <span className="text-teal-400">
            is here.
          </span>
        </h1>

        <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
          Hire high-quality candidates at scale with AI that screens,
          <span className="hidden sm:inline">
            <br />verifies and interviews with a human touch.
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-4 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 relative z-10">
        <motion.button 
          className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book a Demo
          <ChevronRight className="inline-block ml-2 w-4 sm:w-5 h-4 sm:h-5" />
        </motion.button>
      </div>
    </section>
  );
}