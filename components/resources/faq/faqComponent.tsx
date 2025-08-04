"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What exactly is Berribot?",
    answer: "Think of Berribot as your tireless, AI-powered sidekick. It handles the admin stuff—like scheduling, screening, chasing leads, and sorting tasks—so your team can get back to doing what they do best: being awesome."
  },
  {
    id: 2,
    question: "Is Berribot just for recruitment?",
    answer: "Not at all! While Berribot excels at recruitment tasks, it's designed to handle various administrative workflows across different business functions. From lead management to task automation, it's your versatile business companion."
  },
  {
    id: 3,
    question: "Do I need to be a tech genius to use it?",
    answer: "Absolutely not! Berribot is built with simplicity in mind. Our intuitive interface makes it easy for anyone to get started, regardless of their technical background. If you can use email, you can use Berribot."
  },
  {
    id: 4,
    question: "How much time can it actually save me?",
    answer: "Our users typically save 15-20 hours per week on administrative tasks. That's time you can reinvest in growing your business, developing strategies, or simply maintaining a better work-life balance."
  },
  {
    id: 5,
    question: "Is my data safe with Berribot?",
    answer: "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and other data protection standards, and regularly undergo security audits. Your data is as safe with us as it would be in a bank vault."
  },
  {
    id: 6,
    question: "What if I need help getting started?",
    answer: "We've got your back! Our dedicated support team provides onboarding assistance, comprehensive documentation, video tutorials, and ongoing support to ensure you get the most out of Berribot from day one."
  }
];

export default function FAQComponent() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

    return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto space-y-4 mt-10">
        {faqData.map((item) => (
          <div key={item.id} className="relative">
            {/* Question Container */}
            <motion.div
              className="bg-[#EAEFEF] rounded-2xl cursor-pointer relative z-10"
              initial={false}
              animate={{
                backgroundColor: expandedId === item.id ? "#EAEFEF" : "#EAEFEF"
              }}
              transition={{ duration: 0.3 }}
              onClick={() => toggleExpanded(item.id)}
              whileHover={{ 
                backgroundColor: expandedId === item.id ? "#EAEFEF" : "#d1d5db",
                scale: 1.01
              }}
            >
              <div className="p-6 flex justify-between items-center">
                <motion.h3
                  className="text-[24px] font-extralight font-inter"
                  animate={{
                    color: expandedId === item.id ? "#3D3D3D94" : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.question}
                </motion.h3>
                <motion.div
                  className="w-6 h-6 flex items-center justify-center"
                  animate={{ 
                    rotate: expandedId === item.id ? 180 : 0,
                    color: expandedId === item.id ? "#3D3D3D94" : "#6b7280"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Answer Container - Behind but in document flow */}
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                  className="overflow-hidden relative z-0 mt-[-25px]"
                >
                  <div className="flex justify-center pt-4">
                    <div className="w-4/5 bg-[#F4F4F4] rounded-2xl p-6 pt-8">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-[#3D3D3D94] text-[24px] leading-relaxed font-inter font-extralight"
                      >
                        {item.answer}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-20">
        <h3 className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-4">
          Still curious?
        </h3>
        <p className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-8">
          Drop a message to <span className="font-normal">support@berribot.com</span>
        </p>
        <p className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-4">
          Or
        </p>
        <p className="text-[#9CA3AF] text-[24px] font-extralight font-inter mb-8">
          Go straight to the good stuff
        </p>
        <motion.button
          className="bg-[#04BBA6] text-white text-[18px] font-normal font-inter px-12 py-4 rounded-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Book a Demo
        </motion.button>
      </div>
    </div>
  );
}
