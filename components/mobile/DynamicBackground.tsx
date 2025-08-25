"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

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
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          <div className="absolute inset-0">
            {/* First background image - CSS animation for better mobile performance */}
            <div 
              className="absolute top-0 left-0 z-0 pointer-events-none"
              style={{
                animation: "float 12s ease-in-out infinite",
                animationDelay: "0s"
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
            </div>

            {/* Second background image - CSS animation */}
            <div 
              className="absolute top-0 right-0 z-0 pointer-events-none"
              style={{
                animation: "float 15s ease-in-out infinite reverse",
                animationDelay: "2s"
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
            </div>
          </div>

          {/* Add CSS keyframes for mobile-optimized animation */}
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(2px, -4px) rotate(-0.2deg); }
              50% { transform: translate(-1px, -6px) rotate(0.1deg); }
              75% { transform: translate(1px, -3px) rotate(-0.1deg); }
            }
          `}</style>
        </div>
      )}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
} 