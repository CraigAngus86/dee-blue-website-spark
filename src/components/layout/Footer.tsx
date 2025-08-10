import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { buildSponsorLogoUrl } from "@/features/sponsors";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#000000] text-white pt-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3">
          
          {/* Left Column: Club Identity & Social */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            {/* Mobile: Just Logo Centered */}
            <div className="flex justify-center md:hidden mb-2">
              <Image
                src={buildSponsorLogoUrl('Baynounah_SC_Logo_Gold_he8ayr', 'mainLogo')}
                alt="Baynounah Sports Club"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            
            {/* Desktop: Logo + Text */}
            <div className="hidden md:flex items-center mb-1">
              <Image
                src={buildSponsorLogoUrl('Baynounah_SC_Logo_Gold_he8ayr', 'mainLogo')}
                alt="Baynounah Sports Club"
                width={43}
                height={43}
                className="h-11 w-11 object-contain"
              />
              <div className="ml-3">
                <h3 className="font-sans font-bold text-base mb-0">Baynounah Sports Club</h3>
                <p className="text-xs text-[#FCC743] mb-0 font-sans">Established 2019</p>
              </div>
            </div>
            
            {/* Tagline & Social Media */}
            <div className="mb-2">
              <p className="text-sm font-sans text-[#FCC743] font-normal mb-2">Be Part of the Journey</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3 justify-center md:justify-start">
                <a 
                  href="https://x.com/baynounahsc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/BaynounahSC/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/baynounahsc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCXiba2uCfhFI_PYJiiExavA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact */}
          <div className="flex flex-col space-y-2 text-center md:text-right md:ml-auto">
            <h4 className="font-semibold text-base mb-1 font-sans">Get in Touch</h4>
            
            <div className="space-y-1">
              <div className="flex items-start text-sm justify-center md:justify-end">
                <MapPin size={14} className="mr-2 text-[#FCC743] flex-shrink-0 mt-0.5 md:order-2 md:ml-2 md:mr-0" />
                <span className="text-white/80 font-sans">13 شارع الصَفِيح - Al Manhal - W15 02 - Abu Dhabi</span>
              </div>
              <div className="flex items-center text-sm justify-center md:justify-end">
                <Phone size={14} className="mr-2 text-[#FCC743] flex-shrink-0 md:order-2 md:ml-2 md:mr-0" />
                <a 
                  href="tel:+971566975370" 
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 font-sans"
                >
                  +971 566 975 370
                </a>
              </div>
              <div className="flex items-center text-sm justify-center md:justify-end">
                <Mail size={14} className="mr-2 text-[#FCC743] flex-shrink-0 md:order-2 md:ml-2 md:mr-0" />
                <a 
                  href="mailto:info@baynounahsc.com" 
                  className="text-white/80 hover:text-[#FCC743] transition-colors duration-200 font-sans"
                >
                  info@baynounahsc.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Section */}
        <div className="border-t border-white/20 pt-2 pb-1">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center text-xs text-white/60 space-y-1 md:space-y-0">
            <p className="mb-0 font-sans">&copy; {currentYear} Baynounah Sports Club. All rights reserved.</p>
            
            <div className="flex space-x-3">
              <Link 
                href="/privacy" 
                className="hover:text-[#FCC743] transition-colors duration-200 font-sans"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-[#FCC743] transition-colors duration-200 font-sans"
              >
                Terms of Use
              </Link>
              <Link 
                href="/cookies" 
                className="hover:text-[#FCC743] transition-colors duration-200 font-sans"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/admin" 
                className="hover:text-[#FCC743] transition-colors duration-200 font-sans"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
