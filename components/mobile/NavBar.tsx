"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);
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
  const logoSrc = shouldUseWhiteBackground ? "/image/logo_black.png" : "/image/logo.png";

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
               className="absolute top-0 right-0 bottom-44 overflow-hidden"
               style={{
                 backgroundImage: 'url(/image/mobile/Menu.png)',
                 backgroundSize: '359px 632px',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 width: '359px',
                 height: '632px'
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
               <div className="absolute top-16" style={{ 
                 fontFamily: 'Manrope, sans-serif', 
                 right: 'clamp(1rem, calc(100vw - 340px), 3rem)' 
               }}>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                            className={`block font-normal leading-tight tracking-tight
                           ${isActive(item.href) ? "text-[#00AD96]" : "text-black"}
                           text-[30px]`}
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
                    className="block text-[30px] font-normal leading-tight tracking-tight text-black" 
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </motion.aside>

                         {/* Two white circles positioned at rounded corner for "eye" effect */}
             <motion.div 
               className="pointer-events-none absolute w-19 h-19 bg-white rounded-full hidden min-[380px]:block"
               style={{ 
                 bottom: '332px', // Position relative to menu bottom-left curve (632px - 200px)
                 left: '60px'     // Position at the curve center from left edge
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
               className="pointer-events-none absolute w-19 h-19 bg-white rounded-full hidden min-[380px]:block"
               style={{ 
                 bottom: '252px', // Slightly offset from first circle (632px - 240px)
                 left: '140px'     // Positioned to create eye effect
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
