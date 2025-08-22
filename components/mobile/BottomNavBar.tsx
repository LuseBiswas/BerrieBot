"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, Lightbulb, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/product", icon: Package },
    { name: "Solutions", href: "/solutions", icon: Lightbulb },
    { name: "Resources", href: "/resources", icon: BookOpen },
    // { name: "About", href: "/about", icon: Info },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav when scrolled down more than 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          {/* Pill-shaped container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 flex items-center space-x-1 relative w-[315px] h-[68px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
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
              );
            })}
          </div>
          
          {/* Bottom indicator line */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 