'use client';
import React from 'react';
import { MapPin, Mail, Linkedin, Facebook, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/image/logo.png" 
                alt="BerriBot Logo" 
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
              <li><a href="#" className="hover:text-white transition-colors">BerriConnect</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BerriProctor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BerriMasterMind</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Berri360</a></li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-medium mb-6">Solutions</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Recruitment Assistant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Real-time Proctoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Texting</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Learn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Explore</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-medium mb-6">About</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Journey</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Values</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Teams</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Join us</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-6">Legal</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with divider above */}
        <div className="border-t border-gray-800 pt-6 -mt-35 w-[735px] ml-auto">
          <div className="flex justify-end items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Connect</span>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-[#04BBA6] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Linkedin className="w-4 h-4 text-[#181818]" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#04BBA6] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Facebook className="w-4 h-4 text-[#181818]" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#04BBA6] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Github className="w-4 h-4 text-[#181818]" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#04BBA6] rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <Twitter className="w-4 h-4 text-[#181818]" />
              </a>
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