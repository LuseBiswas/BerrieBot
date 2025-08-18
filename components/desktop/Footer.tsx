'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-16 px-4 sm:px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/image/logo.png" 
                alt="BerriBot Logo" 
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold">BerriBot</span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Berribot delivers amazing AI services that minimize costs and maximize business returns.
            </p>
            
            {/* Divider line */}
            <div className="w-16 h-px bg-gray-600 mb-8"></div>
            
            {/* Office */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-medium">Office</span>
              </div>
              <div className="text-gray-400 leading-relaxed">
                <p>High Street Centre, #18-03,</p>
                <p>1 North Bridge Road,</p>
                <p>Singapore - 179094</p>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-medium">Contact</span>
              </div>
              <p className="text-gray-400">info@berribot.com</p>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-lg font-medium mb-6">Products</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/product?product=berriconnect" className="hover:text-white transition-colors">BerriConnect</Link></li>
              <li><Link href="/product?product=berriproctor" className="hover:text-white transition-colors">BerriProctor</Link></li>
              <li><Link href="/product?product=berrimastermind" className="hover:text-white transition-colors">BerriMasterMind</Link></li>
              <li><Link href="/product?product=berri360" className="hover:text-white transition-colors">Berri360</Link></li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-medium mb-6">Solutions</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/solutions#recruitment-assistant" className="hover:text-white transition-colors">Recruitment Assistant</Link></li>
              <li><Link href="/solutions#real-time-proctoring" className="hover:text-white transition-colors">Real-time Proctoring</Link></li>
              <li><Link href="/solutions#live-texting" className="hover:text-white transition-colors">Live Texting</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/resources/faq" className="hover:text-white transition-colors">Learn</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-medium mb-6">About</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Journey</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Values</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Teams</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Join us</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-6">Legal</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link href="/policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with divider above */}
        <div className="border-t border-gray-800 pt-6 -mt-35 w-[735px] ml-auto">
          <div className="flex justify-end items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Connect</span>
            <div className="flex gap-3">
              <Link href="https://www.linkedin.com/company/berribot/?originalSubdomain=sg" className=" rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/image/footer/linkedin.png" alt="LinkedIn" width={16} height={16} className="w-8 h-8" />
              </Link>
              <Link href="https://www.facebook.com/Berribot/?_rdr" className=" rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/image/footer/facebook.png" alt="Facebook" width={16} height={16} className="w-8 h-8" />
              </Link>
              <Link href="#" className=" rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/image/footer/instagram.png" alt="Instagram" width={16} height={16} className="w-8 h-8" />
              </Link>
              <Link href="https://x.com/Berribot1" className=" rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image src="/image/footer/twitter.png" alt="Twitter" width={16} height={16} className="w-8 h-8" />
              </Link>
            </div>
          </div>
          
          <div className="text-gray-400">
            © 2025 BerriBot.com
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
} 