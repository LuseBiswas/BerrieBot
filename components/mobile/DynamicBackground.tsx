"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface MobileDynamicBackgroundProps {
  children: React.ReactNode;
}

export default function MobileDynamicBackground({ children }: MobileDynamicBackgroundProps) {
  const pathname = usePathname();
  
  // Define routes that should use white background
  const whiteBackgroundRoutes = ["/resources", "/explore/details", "/resources/faq", "/product", "/solutions"];
  
  // Check if current path starts with any of the white background routes
  const shouldUseWhiteBackground = whiteBackgroundRoutes.some(route => 
    pathname?.startsWith(route)
  );
  
  const backgroundClass = shouldUseWhiteBackground 
    ? "bg-white" 
    : "bg-black";
    
  const textColor = shouldUseWhiteBackground 
    ? "text-black" 
    : "text-white";

  return (
    <div className={`min-h-screen w-full flex flex-col ${backgroundClass} ${textColor} overflow-x-hidden relative`}>
      {/* Background Images - Only show on black background routes */}
      {!shouldUseWhiteBackground && (
        <>
          {/* Background Image - Top Left */}
          <motion.div 
            className="absolute top-[-100] left-[-50] z-0 pointer-events-none"
            animate={{ 
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            <Image
              src="/image/mobile/1.png"
              alt="Background"
              width={294.21}
              height={262}
              className="object-cover"
              loading="lazy" // Decorative background - lazy load
              sizes="(max-width: 768px) 300px, 294px"
            />
          </motion.div>

          <motion.div 
            className="absolute top-0 right-0 z-0 pointer-events-none"
            animate={{ 
              y: [0, 8, 0],
              x: [0, -3, 0],
              rotate: [0, -0.5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse",
              delay: 2
            }}
          >
            <Image
              src="/image/mobile/2.png"
              alt="Background"
              width={294.21}
              height={262}
              className="object-cover"
              loading="lazy" // Decorative background - lazy load
              sizes="(max-width: 768px) 300px, 294px"
            />
          </motion.div>
        </>
      )}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
} 