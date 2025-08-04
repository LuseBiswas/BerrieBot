"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  showConfirmationText?: boolean;
  onConfirmationChoice?: (choice: 'back' | 'readAgain') => void;
  onReadPrivacy?: () => void;
}

export default function HeroSection({ showConfirmationText = false, onConfirmationChoice, onReadPrivacy }: HeroSectionProps) {
  return (
    <section className="relative mt-60 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Our Privacy Policy
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium bg-gradient-to-b from-[#252527] to-[#ADADAEB0] text-transparent bg-clip-text">
          No Secrets, Just 
          <br />
          Privacy
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10 mb-28">
        <p className="font-inter text-[36px] sm:text-2xl md:text-[36px] leading-[1.4] sm:leading-[1.5] font-light text-white max-w-5xl mx-auto">
          {showConfirmationText ? (
            "Did you definitely read it?"
          ) : (
            <>
              We read the fine print so you don&apos;t have to and we <br /> definitely Guard your Data like it&apos;s Cake.
            </>
          )}
        </p>

        {/* Read Privacy Policy Button - only show when not in confirmation */}
        {!showConfirmationText && (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={onReadPrivacy}
              className="bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center text-gray-700 font-medium hover:cursor-pointer"
              style={{ width: '268px', height: '73px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Read Privacy Policy
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Confirmation Buttons */}
      {showConfirmationText && (
        <div className="flex flex-col space-y-4 mt-[-80px] relative z-10 mb-28 items-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onConfirmationChoice?.('back')}
            className="bg-white text-[#181818] px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter font-light hover:cursor-pointer w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Yes, take me back
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => onConfirmationChoice?.('readAgain')}
            className="bg-[#CFCFCF] text-[#181818] px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-200 font-inter font-light hover:cursor-pointer w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            NO, AGAINNNNN!!!
          </motion.button>
        </div>
      )}
    </section>
  );
}
