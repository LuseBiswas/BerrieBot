"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  showConfirmationText?: boolean;
  onConfirmationChoice?: (choice: 'back' | 'readAgain') => void;
  onReadPrivacy?: () => void;
}

export default function MobilePolicyHeroSection({ showConfirmationText = false, onConfirmationChoice, onReadPrivacy }: HeroSectionProps) {
  return (
    <section className="relative mt-20 flex flex-col items-center justify-center px-4 bg-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* ---- "Our Privacy Policy" pill ---- */}
      <div className="mb-8 relative z-10">
        <div 
          className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-medium flex items-center justify-center"
          style={{
            width: '180px',
            height: '25px',
            fontSize: '14px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Our Privacy Policy
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10 mb-8">
        <h1 
          className="tracking-tight mb-6 font-medium bg-white text-transparent bg-clip-text"
          style={{
            fontSize: '48px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          No Secrets, Just
          <br />
          Privacy
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10 mb-12">
        <p 
          className="font-light text-white leading-relaxed"
          style={{
            fontSize: '18px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.4'
          }}
        >
          {showConfirmationText ? (
            "Did you definitely read it?"
          ) : (
            <>
              We read the fine print so you don&apos;t have to and we definitely Guard your Data like it&apos;s Cake.
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
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={onReadPrivacy}
              className="bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center text-gray-700 font-medium hover:cursor-pointer"
              style={{ 
                width: '220px', 
                height: '50px',
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif'
              }}
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
       <div className="flex flex-col space-y-4 mt-[-40px] relative z-10 mb-16 items-center w-full max-w-xs">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onConfirmationChoice?.('back')}
            className="bg-white text-[#181818] px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-light hover:cursor-pointer w-full"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif'
            }}
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
            className="bg-[#CFCFCF] text-[#181818] px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-200 font-light hover:cursor-pointer w-full"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif'
            }}
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