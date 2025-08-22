"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, Lightbulb, BookOpen, Info, Shield, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const pathname = usePathname();
  const footerObserverRef = useRef<IntersectionObserver | null>(null);
  const prevPathnameRef = useRef<string>(pathname);

  // Base navigation items (always present)
  const baseNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/product", icon: Package },
    { name: "Solutions", href: "/solutions", icon: Lightbulb },
    { name: "Resources", href: "/resources", icon: BookOpen },
  ];

  // Dynamic navigation items (only appear when on specific pages)
  const dynamicNavItems = [
    { name: "About", href: "/about", icon: Info },
    { name: "Privacy", href: "/policy", icon: Shield },
    { name: "Cookies", href: "/cookies", icon: Cookie },
  ];

  // Create navigation items based on current pathname
  const navItems = (() => {
    const currentDynamicItem = dynamicNavItems.find(item => pathname === item.href);
    if (currentDynamicItem) {
      return [...baseNavItems, currentDynamicItem];
    }
    return baseNavItems;
  })();

  // Dynamic container width based on number of items
  const containerWidth = navItems.length === 5 ? "w-[390px]" : "w-[315px]";
  const itemSpacing = navItems.length === 5 ? "space-x-0.5" : "space-x-1";

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Scroll to top when pathname changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Update previous pathname
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav when scrolled down more than 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Footer visibility detection using Intersection Observer
  useEffect(() => {
    const observeFooter = () => {
      // Find the footer element by tag name or a specific selector
      const footer = document.querySelector('footer');
      
      if (footer && !footerObserverRef.current) {
        footerObserverRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Footer is visible when it intersects with viewport
              setIsFooterVisible(entry.isIntersecting);
            });
          },
          {
            // Trigger when footer starts entering the viewport
            threshold: 0.1, // 10% of footer is visible
            rootMargin: '0px 0px -10% 0px' // Trigger a bit earlier
          }
        );

        footerObserverRef.current.observe(footer);
      }
    };

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(observeFooter, 100);

    return () => {
      clearTimeout(timeoutId);
      if (footerObserverRef.current) {
        footerObserverRef.current.disconnect();
        footerObserverRef.current = null;
      }
    };
  }, [pathname]); // Re-run when pathname changes

  // Combined visibility logic: show when scrolled AND footer is not visible
  const shouldShowNavBar = isVisible && !isFooterVisible;

  return (
    <AnimatePresence>
      {shouldShowNavBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          {/* Pill-shaped container with dynamic width */}
          <motion.div 
            className={`bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 flex items-center ${itemSpacing} relative ${containerWidth} h-[68px]`}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <motion.div
                  key={item.href}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center transition-all duration-300 relative ${
                      active
                        ? "text-white w-[125px] h-[52px] px-3"
                        : "bg-white/20 backdrop-blur-sm w-[52px] h-[52px] text-white/80 hover:text-white hover:bg-white/30 rounded-full"
                    }`}
                  >
                    {/* Animated background for active state */}
                    {active && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-[#028374] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                    <Icon className="w-5 h-5 relative z-10" />
                    {active && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 text-sm font-medium whitespace-nowrap relative z-10"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Bottom indicator line */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 