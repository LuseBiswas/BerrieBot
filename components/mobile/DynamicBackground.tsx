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
      {/* Background Image - Top Left */}
      <div className="absolute top-[-100] left-[-50] z-0 pointer-events-none">
        <Image
          src="/image/mobile/1.png"
          alt="Background"
          width={294.21}
          height={262}
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 right-0 z-0 pointer-events-none">
        <Image
          src="/image/mobile/2.png"
          alt="Background"
          width={294.21}
          height={262}
          className="object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {children}
      </div>
    </div>
  );
} 