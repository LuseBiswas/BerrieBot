"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { trackFooterClick, trackSocialClick } from '@/utils/analytics';

export default function MobileFooter() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

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

  // Responsive text sizing - keeping left alignment
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          containerMaxWidth: 'max-w-none', // Full width, no centering
          containerAlignment: 'mx-0 ml-4', // Left aligned with left padding
          logoSize: 'w-10 h-10', // larger logo
          companyNameSize: 'text-2xl', // 24px vs mobile 20px
          descriptionSize: 'text-base', // 16px vs mobile 14px
          sectionTitleSize: 'text-xl', // 20px vs mobile 18px
          linkSize: 'text-base', // 16px vs mobile 14px
          contactTitleSize: 'text-xl', // 20px vs mobile 18px
          contactTextSize: 'text-base', // 16px vs mobile 14px
          copyrightSize: 'text-base', // 16px vs mobile 14px
          iconSize: 'w-6 h-6', // larger icons
          socialIconSize: 'w-9 h-9', // larger social icons
        };
      case 'tablet':
        return {
          containerMaxWidth: 'max-w-none', // Full width, no centering
          containerAlignment: 'mx-0 ml-4', // Left aligned with left padding
          logoSize: 'w-9 h-9', // slightly larger logo
          companyNameSize: 'text-xl', // 20px vs mobile 18px
          descriptionSize: 'text-base', // 16px vs mobile 14px
          sectionTitleSize: 'text-lg', // 18px (same as mobile but looks better with more space)
          linkSize: 'text-base', // 16px vs mobile 14px
          contactTitleSize: 'text-lg', // 18px (same as mobile)
          contactTextSize: 'text-base', // 16px vs mobile 14px
          copyrightSize: 'text-base', // 16px vs mobile 14px
          iconSize: 'w-5 h-5', // same as mobile
          socialIconSize: 'w-8 h-8', // same as mobile
        };
      default: // mobile
        return {
          containerMaxWidth: 'max-w-sm',
          containerAlignment: 'mx-auto', // Centered on mobile
          logoSize: 'w-8 h-8',
          companyNameSize: 'text-xl',
          descriptionSize: 'text-gray-400',
          sectionTitleSize: 'text-lg',
          linkSize: 'text-gray-400',
          contactTitleSize: 'text-lg',
          contactTextSize: 'text-gray-400',
          copyrightSize: 'text-gray-400',
          iconSize: 'w-5 h-5',
          socialIconSize: 'w-8 h-8',
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <footer className="relative bg-black text-white py-16 px-4">
      <div className={`${sizes.containerMaxWidth} ${sizes.containerAlignment}`}>
        {/* Company Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Image 
              src="/image/logo.png" 
              alt="BerriBot Logo" 
              width={32}
              height={32}
              className={sizes.logoSize}
            />
            <span className={`${sizes.companyNameSize} font-semibold`}>BerriBot</span>
          </div>
          <p className={`${sizes.descriptionSize} mb-8 leading-relaxed text-left`}>
            Berribot delivers amazing AI services that minimize costs and maximize business returns.
          </p>
          
          {/* Divider line */}
          <div className="w-16 h-px bg-gray-600 mb-8"></div>
          
          {/* Office */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className={`${sizes.iconSize} text-gray-400`} />
              <span className={`${sizes.contactTitleSize} font-medium`}>Office</span>
            </div>
            <div className={`${sizes.contactTextSize} leading-relaxed text-left`}>
              <p>High Street Centre, #18-03,</p>
              <p>1 North Bridge Road,</p>
              <p>Singapore - 179094</p>
            </div>
            <br />
              <div className="text-gray-400 leading-relaxed">
                <p>No.6/2, Sree Lakshmi Nagar, </p>
                <p> Thanner Pandal road, Peelamedu,</p>
                <p> Coimbatore, Tamil Nadu - 641004</p>
              </div>
          </div>
          
          {/* Contact */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail className={`${sizes.iconSize} text-gray-400`} />
              <span className={`${sizes.contactTitleSize} font-medium`}>Contact</span>
            </div>
            <p className={`${sizes.contactTextSize} text-left`}>info@berribot.com</p>
          </div>
        </div>
        
        {/* Products */}
        <div className="mb-8">
          <h3 className={`${sizes.sectionTitleSize} font-medium mb-6 text-left`}>Products</h3>
          <ul className={`space-y-4 ${sizes.linkSize} text-left`}>
              <li><Link href="/product" className="hover:text-white transition-colors" onClick={() => trackFooterClick('BerriConnect', 'products')}>Berri Connect</Link></li>
              <li><Link href="/product" className="hover:text-white transition-colors" onClick={() => trackFooterClick('BerriSearch', 'products')}>Berri Search & Match</Link></li>
              <li><Link href="/product" className="hover:text-white transition-colors" onClick={() => trackFooterClick('BerriMasterMind', 'products')}>Berri MasterMind</Link></li>
              <li><Link href="/product" className="hover:text-white transition-colors" onClick={() => trackFooterClick('BerriProctor', 'products')}>Berri Proctor</Link></li>
          </ul>
        </div>
        
        {/* Solutions */}
        <div className="mb-8">
          <h3 className={`${sizes.sectionTitleSize} font-medium mb-6 text-left`}>Solutions</h3>
          <ul className={`space-y-4 ${sizes.linkSize} text-left`}>
          <li><Link href="/solutions#recruitment-assistant" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Recruitment Assistant', 'solutions')}>Recruitment Assistant</Link></li>
              <li><Link href="/solutions#real-time-proctoring" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Real-time Proctoring', 'solutions')}>Real-time Proctoring</Link></li>
              <li><Link href="/solutions#live-texting" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Live Texting', 'solutions')}>Live Texting</Link></li>
          </ul>
        </div>
        
        {/* Resources */}
        <div className="mb-8">
          <h3 className={`${sizes.sectionTitleSize} font-medium mb-6 text-left`}>Resources</h3>
          <ul className={`space-y-4 ${sizes.linkSize} text-left`}>
          <li><Link href="/resources#faq" className="hover:text-white transition-colors" onClick={() => trackFooterClick('FAQ', 'resources')}>FAQ</Link></li>
          <li><Link href="/resources#blogs" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Blogs', 'resources')}>Blogs</Link></li>
          </ul>
        </div>
        
        {/* About */}
        <div className="mb-8">
          <h3 className={`${sizes.sectionTitleSize} font-medium mb-6 text-left`}>About</h3>
          <ul className={`space-y-4 ${sizes.linkSize} text-left`}>
            <li><Link href="/about" className="hover:text-white transition-colors" onClick={() => trackFooterClick('About us', 'about')}>About us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Our Journey', 'about')}>Our Journey</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Our Values', 'about')}>Our Values</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Our Teams', 'about')}>Our Teams</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Join us', 'about')}>Join us</Link></li>
          </ul>
        </div>
        
        {/* Legal */}
        <div className="mb-8">
          <h3 className={`${sizes.sectionTitleSize} font-medium mb-6 text-left`}>Legal</h3>
          <ul className={`space-y-4 ${sizes.linkSize} text-left`}>
          <li><Link href="/policy" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Privacy Policy', 'legal')}>Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors" onClick={() => trackFooterClick('Cookies', 'legal')}>Cookies</Link></li>

          </ul>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className={`${sizes.contactTextSize}`}>Connect</span>
              <div className="flex gap-3">
                <Link href="https://www.linkedin.com/company/berribot/?originalSubdomain=sg" className="rounded flex items-center justify-center hover:opacity-80 transition-opacity" onClick={() => trackSocialClick('linkedin')}>
                  <Image src="/image/footer/linkedin.png" alt="LinkedIn" width={16} height={16} className={sizes.socialIconSize} />
                </Link>
                <Link href="https://www.facebook.com/Berribot/?_rdr" className="rounded flex items-center justify-center hover:opacity-80 transition-opacity" onClick={() => trackSocialClick('facebook')}>
                  <Image src="/image/footer/facebook.png" alt="Facebook" width={16} height={16} className={sizes.socialIconSize} />
                </Link>
                <Link href="#" className="rounded flex items-center justify-center hover:opacity-80 transition-opacity" onClick={() => trackSocialClick('instagram')}>
                  <Image src="/image/footer/instagram.png" alt="Instagram" width={16} height={16} className={sizes.socialIconSize} />
                </Link>
                <Link href="https://x.com/Berribot1" className="rounded flex items-center justify-center hover:opacity-80 transition-opacity" onClick={() => trackSocialClick('twitter')}>
                  <Image src="/image/footer/twitter.png" alt="Twitter" width={16} height={16} className={sizes.socialIconSize} />
                </Link>
              </div>
            </div>
            
            <div className={`${sizes.copyrightSize} text-left`}>
              © 2025 BerriBot.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 