"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column - Title */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-inter font-medium text-white">
              About Berribot
            </h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="lg:col-span-9 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Berribot was founded by serial entrepreneurs who saw how limited, 
              rigid, and inefficient legacy customer experience systems had 
              become. Their vision: empower every brand to deliver truly satisfying 
              customer experiences, instantly and at scale.
            </p>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              How? Just as a 10x engineer is ten times more productive than their 
              peers, Berribot&apos;s AI agents 10x the impact of CX teams by amplifying 
              their ability to support, onboard, and retain customers at scale.
            </p>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Today, global brands use Berribot to automate critical CX workflows
              — from resolving support tickets to guiding users through complex
              tasks— with fast, reliable AI agents that deliver always-on concierge
              service.
            </p>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              This isn&apos;t just better support— it&apos;s a smarter way to drive engagement,
              build loyalty, and fuel long-term growth.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
} 