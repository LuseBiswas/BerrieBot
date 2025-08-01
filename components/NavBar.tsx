"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Dropdown, { DropdownSection } from "./Dropdown";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Define dropdown data
  const productSections: DropdownSection[] = [
    {
      title: "PRODUCTS",
      items: [
        {
          name: "Berri Search & Match",
          href: "/products/search-match",
          description: "Text here."
        },
        {
          name: "Berri Connect",
          href: "/products/connect",
          description: "Our Conversational AI platform - BerriConnect, exemplifies the future of communication."
        }
      ]
    },
    {
      title: "",
      items: [
        {
          name: "Berri Mastermind",
          href: "/products/mastermind",
          description: "In realm of Generative AI, we proudly present Berri's Interview MasterMind."
        },
        {
          name: "Berri Proctor",
          href: "/products/proctor",
          description: "BerriProctor stands as a crucial asset, introducing an essential layer of cybersecurity."
        }
      ]
    }
  ];

  const solutionSections: DropdownSection[] = [
    {
      title: "SOLUTIONS",
      items: [
        {
          name: "Latest Updates",
          href: "/solutions/updates",
          description: "Explore latest updates in our products."
        },
        {
          name: "The Technology",
          href: "/solutions/technology",
          description: "Deep tech behind our product, fascinates us every single day."
        }
      ]
    }
  ];

  const resourceSections: DropdownSection[] = [
    {
      title: "RESOURCES",
      items: [
        {
          name: "Documentation",
          href: "/resources/docs",
          description: "Complete guides and API references."
        },
        {
          name: "Blog",
          href: "/resources/blog",
          description: "Latest insights and updates."
        },
        {
          name: "Support",
          href: "/resources/support",
          description: "Get help when you need it."
        }
      ]
    }
  ];

  const aboutSections: DropdownSection[] = [
    {
      title: "ABOUT",
      items: [
        {
          name: "Our Story",
          href: "/about/story",
          description: "Learn about our journey and mission."
        },
        {
          name: "Team",
          href: "/about/team",
          description: "Meet the people behind BerriBot."
        },
        {
          name: "Careers",
          href: "/about/careers",
          description: "Join our growing team."
        }
      ]
    }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-2 my-3 rounded-2xl bg-[#04BBA6]">
          <div className="mx-auto flex max-w-8xl items-center justify-between px-16 py-3">
            {/* Left side - Logo */}
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

            {/* Center - Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Dropdown
                trigger={
                  <div className="text-white font-medium hover:text-white/80 transition-colors flex items-center">
                    Product
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                }
                sections={productSections}
              />
              
              <Link href="/solution" className="text-white font-medium hover:text-white/80 transition-colors flex items-center">
                Solution
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <Link href="/resources" className="text-white font-medium hover:text-white/80 transition-colors flex items-center">
                Resource
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <Link href="/about" className="text-white font-medium hover:text-white/80 transition-colors flex items-center">
                About
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Mobile - Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white hover:text-white/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right side - Get Started Button */}
            <div className="hidden lg:flex items-center">
              <Link 
                href="/signup" 
                className="px-6 py-2 bg-white rounded-full font-medium text-black hover:bg-gray-50 transition-colors"
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