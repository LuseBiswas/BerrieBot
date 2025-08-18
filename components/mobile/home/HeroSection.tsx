"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

export default function MobileHeroSection() {
  return (
    <section className="bg-transparent flex flex-col items-center justify-start px-4 pt-20 pb-8 relative overflow-hidden">
      <div className="max-w-sm mx-auto relative">
        
        {/* Top Teal Box */}
        <motion.div
          className="absolute -top-10 left-2 bg-[#00AD96] backdrop-blur-lg border border-[#00AD96]/30 text-white rounded-lg px-4 py-3 text-sm font-medium z-10 shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &quot;Berri is a Mastermind&quot;
        </motion.div>

        {/* YouTube Video Container */}
        <motion.div
          className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#04BBA6] mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Vr330NM_-8U?si=mWfVII5ZO7Lylusz"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full object-cover"
          />
          
          
          
        </motion.div>
        {/* Expand Icon - Bottom Right */}
        <motion.button
            className="absolute bottom-2 right-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </motion.button>

        {/* Bottom Teal Box */}
        <motion.div
          className="absolute -bottom-1 right-23 bg-[#00AD96] backdrop-blur-lg border border-[#00AD96]/30 text-white rounded-lg px-4 py-3 text-sm font-medium z-10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          &quot;AI Assistant is a berribot&quot;
        </motion.div>

        {/* Main Content Below Video */}
      </div>
    </section>
  );
} 