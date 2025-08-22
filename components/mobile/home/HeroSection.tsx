"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ArrowLeft, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileHeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

  const handleExpandClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive sizing based on mobile dimensions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          // Video container: mobile 343x187 -> large 480x262 (1.4x)
          videoWidth: '480px',
          videoHeight: '262px',
          // Top box: mobile 157x39 -> large 220x55 (1.4x)
          topBoxWidth: '220px',
          topBoxHeight: '55px',
          topBoxLeft: '3px', // proportional to 1.4x
          // Bottom box: mobile 255x68 -> large 357x95 (1.4x)
          bottomBoxWidth: '357px',
          bottomBoxHeight: '95px',
          bottomBoxRight: '25px', // proportional to 1.4x
          // Popup video: mobile 343x355 -> large 480x497 (1.4x)
          popupVideoWidth: '480px',
          popupVideoHeight: '497px',
          // Popup pill: mobile 163x26 -> large 228x36 (1.4x)
          popupPillWidth: '228px',
          popupPillHeight: '36px'
        };
      case 'tablet':
        return {
          // Video container: mobile 343x187 -> tablet 412x225 (1.2x)
          videoWidth: '412px',
          videoHeight: '225px',
          // Top box: mobile 157x39 -> tablet 188x47 (1.2x)
          topBoxWidth: '188px',
          topBoxHeight: '47px',
          topBoxLeft: '2px', // proportional to 1.2x
          // Bottom box: mobile 255x68 -> tablet 306x82 (1.2x)
          bottomBoxWidth: '306px',
          bottomBoxHeight: '82px',
          bottomBoxRight: '92px', // proportional to 1.2x
          // Popup video: mobile 343x355 -> tablet 412x426 (1.2x)
          popupVideoWidth: '412px',
          popupVideoHeight: '426px',
          // Popup pill: mobile 163x26 -> tablet 196x31 (1.2x)
          popupPillWidth: '196px',
          popupPillHeight: '31px'
        };
      default: // mobile
        return {
          videoWidth: '343px',
          videoHeight: '187px',
          topBoxWidth: '157px',
          topBoxHeight: '39px',
          topBoxLeft: '2px',
          bottomBoxWidth: '255px',
          bottomBoxHeight: '68px',
          bottomBoxRight: '78px',
          popupVideoWidth: '343px',
          popupVideoHeight: '355px',
          popupPillWidth: '163px',
          popupPillHeight: '26px'
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <motion.section 
      className="bg-transparent flex flex-col items-center justify-start px-4 pt-20 pb-8 relative overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-sm md:max-w-md lg:max-w-lg mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        
        {/* Top Teal Box with Hero Background */}
        <motion.div
          className="absolute -top-7 text-white rounded-lg px-2 py-3 text-[12px] md:text-[14px] lg:text-[15px] font-medium text-center z-10 shadow-2xl"
          style={{
            backgroundImage: 'url(/image/mobile/Hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: sizes.topBoxHeight,
            width: sizes.topBoxWidth,
            left: sizes.topBoxLeft,
            fontFamily: 'Manrope, sans-serif'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &quot;Berri is a Mastermind&quot;
        </motion.div>

        {/* YouTube Video Container */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-6"
          style={{
            width: sizes.videoWidth,
            height: sizes.videoHeight
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ww3flTt--Xw?autoplay=1&mute=1&loop=1&playlist=ww3flTt--Xw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
            style={{ border: 'none' }}
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
            onClick={handleExpandClick}
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </motion.button>

        {/* Bottom Teal Box */}
        <motion.div
          className="absolute -bottom-8 text-white rounded-lg text-[12px] md:text-[14px] lg:text-[15px] font-medium z-10 shadow-2xl flex items-center justify-center"
          style={{
            backgroundImage: 'url(/image/mobile/Hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: sizes.bottomBoxHeight,
            width: sizes.bottomBoxWidth,
            right: sizes.bottomBoxRight,
            fontFamily: 'Manrope, sans-serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          &quot;AI Assistant is a berribot&quot;
        </motion.div>

        {/* Main Content Below Video */}
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            style={{
              backgroundImage: 'url(/image/mobile/5.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Header with Back Arrow and Three Dots */}
            <motion.div 
              className="flex justify-between items-center p-4 pt-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              {/* Back Arrow */}
              <motion.button
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                onClick={handleClosePopup}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>

              {/* Three Dots */}
              <motion.button
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoreHorizontal className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center px-4 pt-8 relative">
              {/* Pill Shape */}
              <motion.div 
                className="absolute bg-[#04BBA6] text-white rounded-full flex items-center justify-center text-sm md:text-base lg:text-lg font-medium z-30"
                style={{
                  width: sizes.popupPillWidth,
                  height: sizes.popupPillHeight,
                  fontFamily: 'Manrope, sans-serif',
                  top: '15px',
                  left: '30%',
                  transform: 'translateX(-50%)'
                }}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                Berri is a MasterMind
              </motion.div>

              {/* YouTube Video - Larger */}
              <motion.div 
                className="rounded-2xl overflow-hidden mb-8 relative"
                style={{
                  width: sizes.popupVideoWidth,
                  height: sizes.popupVideoHeight
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/ww3flTt--Xw?autoplay=1&mute=1&loop=1&playlist=ww3flTt--Xw"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ 
                    border: 'none',
                    transform: 'scale(1.9)',
                    transformOrigin: 'center center'
                  }}
                />
              </motion.div>

              {/* Text Content */}
              <motion.div 
                className="text-center px-4 max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <p 
                  className="text-white leading-relaxed text-[24px] md:text-[28px] lg:text-[32px]"
                  style={{
                    fontFamily: 'Manrope, sans-serif'
                  }}
                >
                  Hi this is Berri, your complete agentic AI recruiter. Let&apos;s get started?!
                </p>
              </motion.div>
            </div>
          </motion.div>
                 )}
       </AnimatePresence>
     </motion.section>
  );
} 