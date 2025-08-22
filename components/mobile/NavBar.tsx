"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Define routes that should use white background (same as DynamicBackground)
  const whiteBackgroundRoutes = ["/resources", "/explore/details", "/resources/faq", "/product", "/solutions"];
  
  // Check if current path starts with any of the white background routes
  const shouldUseWhiteBackground = whiteBackgroundRoutes.some(route => 
    pathname?.startsWith(route)
  );
  
  const logoTextColor = shouldUseWhiteBackground ? "text-black" : "text-white";
  const hamburgerColor = shouldUseWhiteBackground ? "text-black" : "text-white";
  const logoSrc = shouldUseWhiteBackground ? "/image/logo_black_2.png" : "/image/logo.png";
  const menuImageSrc = shouldUseWhiteBackground ? "/image/mobile/Menu_2.png" : "/image/mobile/Menu.png";
  const circleColor = shouldUseWhiteBackground ? "#02645F" : "white";

  // Responsive values based on screen size
  const getResponsiveValues = () => {
    switch (screenSize) {
      case 'large':
        return {
          backgroundSize: '480px 750px',
          rightPosition: 'clamp(2rem, calc(100vw - 400px), 4rem)',
          circle1Bottom: '380px',
          circle1Left: '80px',
          circle2Bottom: '290px',
          circle2Left: '170px'
        };
      case 'tablet':
        return {
          backgroundSize: '420px 700px',
          rightPosition: 'clamp(1.5rem, calc(100vw - 360px), 3.5rem)',
          circle1Bottom: '360px',
          circle1Left: '70px',
          circle2Bottom: '280px',
          circle2Left: '155px'
        };
      default:
        return {
          backgroundSize: '359px 632px',
          rightPosition: 'clamp(1rem, calc(100vw - 340px), 3rem)',
          circle1Bottom: '332px',
          circle1Left: '60px',
          circle2Bottom: '252px',
          circle2Left: '140px'
        };
    }
  };

  const responsiveValues = getResponsiveValues();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/product" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // lock background scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  // focus & ESC
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
             {/* Top bar */}
       <nav className="relative bg-transparent px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo left */}
          <Link href="/" className="flex items-center gap-2" onClick={close}>
            <div className="w-8 h-8 relative">
              <Image
                src={logoSrc}
                alt="BerriBot Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-xl font-bold ${logoTextColor}`}>BerriBot</span>
          </Link>

          {/* Hamburger right */}
          <button
            ref={closeBtnRef}
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-2 rounded-lg hover:bg-[#00AD96]/20 focus:outline-none focus:ring-2 focus:ring-[#00AD96]/60"
          >
            {open ? (
              <X className="w-6 h-6 text-[#00AD96]" />
            ) : (
              <Menu className={`w-6 h-6 ${hamburgerColor}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Overlay + Drawer matching your screenshot */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Dim background */}
            <div className="absolute inset-0 bg-black/40" />

                         {/* Menu drawer with background image */}
             <motion.aside
               id="mobile-menu"
               role="dialog"
               aria-modal="true"
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", stiffness: 280, damping: 30, mass: 0.8 }}
               className="absolute top-0 right-0 bottom-44 overflow-hidden w-[359px] md:w-[420px] lg:w-[480px] h-[632px] md:h-[700px] lg:h-[750px]"
               style={{
                 backgroundImage: `url(${menuImageSrc})`,
                 backgroundSize: responsiveValues.backgroundSize,
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}
               onClick={(e) => e.stopPropagation()}
             >
                             {/* Close button inside menu */}
               <button
                 onClick={close}
                 className="absolute top-4 right-6 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00AD96]/60"
               >
                 <Menu className="w-6 h-6 text-[#00AD96]" />
               </button>

               {/* Links block */}
               <div className="absolute top-16 md:top-20 lg:top-24" style={{ 
                 fontFamily: 'Manrope, sans-serif', 
                 right: responsiveValues.rightPosition
               }}>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                            className={`block font-normal leading-tight tracking-tight text-[30px] md:text-[34px] lg:text-[36px] ${
                          isActive(item.href) 
                            ? (shouldUseWhiteBackground ? "text-[#00F5D8]" : "text-[#00AD96]")
                            : (shouldUseWhiteBackground ? "text-white" : "text-black")
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* "Get Started Free" big text like the shot */}
                <div className="mt-8">
                  <Link
                    href="/schedule"
                    onClick={close}
                    className={`block text-[30px] md:text-[34px] lg:text-[36px] font-normal leading-tight tracking-tight ${
                      shouldUseWhiteBackground ? "text-white" : "text-black"
                    }`}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </motion.aside>

                         {/* Two circles positioned at rounded corner for "eye" effect - Mobile only */}
             <motion.div 
               className="pointer-events-none absolute w-19 h-19 rounded-full hidden min-[380px]:block md:hidden"
               style={{ 
                 bottom: responsiveValues.circle1Bottom,
                 left: responsiveValues.circle1Left,
                 backgroundColor: circleColor
               }}
               initial={{ scale: 0, x: 50, y: -50 }}
               animate={{ scale: 1, x: 0, y: 0 }}
               exit={{ scale: 0, x: 50, y: -50 }}
               transition={{ 
                 delay: open ? 0.3 : 0, 
                 duration: 0.6, 
                 type: "spring", 
                 stiffness: 200, 
                 damping: 20 
               }}
             />
             <motion.div 
               className="pointer-events-none absolute w-19 h-19 rounded-full hidden min-[380px]:block md:hidden"
               style={{ 
                 bottom: responsiveValues.circle2Bottom,
                 left: responsiveValues.circle2Left,
                 backgroundColor: circleColor
               }}
               initial={{ scale: 0, x: 30, y: -30 }}
               animate={{ scale: 1, x: 0, y: 0 }}
               exit={{ scale: 0, x: 30, y: -30 }}
               transition={{ 
                 delay: open ? 0.5 : 0.2, 
                 duration: 0.6, 
                 type: "spring", 
                 stiffness: 200, 
                 damping: 20 
               }}
             />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
