"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 my-4 rounded-2xl bg-[#00C7BEE0]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
            {/* Desktop - Left side - Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/product" className="text-black/80 font-medium hover:text-black transition-colors">
                Product
              </Link>
              <Link href="/solution" className="text-black/80 font-medium hover:text-black transition-colors">
                Solution
              </Link>
              <Link href="/resources" className="text-black/80 font-medium hover:text-black transition-colors">
                Resources
              </Link>
              <Link href="/pricing" className="text-black/80 font-medium hover:text-black transition-colors">
                Pricing
              </Link>
            </div>

            {/* Mobile - Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-black hover:text-black/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Center - Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/image/logo.png"
                  alt="BerriBot Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">BerriBot</span>
            </Link>

            {/* Desktop - Right side - Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                href="/login" 
                className="px-8 py-2 text-black border-2 border-black/80 rounded-full font-medium hover:bg-black/5 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-8 py-2 bg-white rounded-full font-medium text-lg hover:bg-gray-50 transition-colors text-black"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile - Empty div to maintain center alignment */}
            <div className="lg:hidden w-6"></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Mobile Menu */}
          <div className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 pb-4 border-b border-gray-200">
                <Link 
                  href="/product" 
                  className="text-gray-800 font-medium hover:text-teal-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Product
                </Link>
                <Link 
                  href="/solution" 
                  className="text-gray-800 font-medium hover:text-teal-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Solution
                </Link>
                <Link 
                  href="/resources" 
                  className="text-gray-800 font-medium hover:text-teal-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Resources
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-gray-800 font-medium hover:text-teal-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </Link>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-2">
                <Link 
                  href="/login" 
                  className="px-6 py-3 text-center text-teal-500 border-2 border-teal-500 rounded-full font-medium hover:bg-teal-50 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-3 text-center bg-teal-400 text-white rounded-full font-medium hover:bg-teal-500 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}