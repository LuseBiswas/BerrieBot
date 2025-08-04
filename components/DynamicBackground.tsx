"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DynamicBackgroundProps {
  children: ReactNode;
}

export default function DynamicBackground({ children }: DynamicBackgroundProps) {
  const pathname = usePathname();
  
  // Define routes that should use white background with teal stripes
  const whiteBackgroundRoutes = ["/resources/explore/details", "/resources/faq"];
  
  // Check if current path starts with any of the white background routes
  const shouldUseWhiteBackground = whiteBackgroundRoutes.some(route => 
    pathname?.startsWith(route)
  );
  
  const backgroundClass = shouldUseWhiteBackground 
    ? "bg-pinstripes-white" 
    : "bg-pinstripes";
    
  const textColor = shouldUseWhiteBackground 
    ? "text-black" 
    : "text-white";

  return (
    <div className={`min-h-screen w-full flex flex-col ${backgroundClass} bg-fixed ${textColor} overflow-x-hidden`}>
      {children}
    </div>
  );
} 