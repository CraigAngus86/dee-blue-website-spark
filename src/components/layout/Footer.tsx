import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { buildSponsorLogoUrl } from "@/features/sponsors";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#00105A] text-white pt-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3">
          
          {/* Left Column: Club Identity & Social */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            {/* Mobile: Just Logo Centered */}
            <div className="flex justify-center md:hidden mb-2">
              <Image
                src={buildSponsorLogoUrl('BOD_Logo_White_square_joicd1', 'mainLogo')}
                alt="Banks o' Dee FC"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            
            {/* Desktop: Logo + Text */}
            <div className="hidden md:flex items-center mb-1">
              <Image
                src={buildSponsorLogoUrl('BOD_Logo_White_square_joicd1', 'mainLogo')}
                alt="Banks o' Dee FC"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div className="ml-3">
                <h3 className="font-montserrat font-bold text-base mb-0">Banks o&apos; Dee FC</h3>
                <p className="text-xs text-[#C5E7FF] mb-0">Established 1902</p>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <p className="text-sm font-medium mb-2">Follow the Dee</p>
              <div className="flex space-x-3 justify-center md:justify-start">
                <a 
                  href="https://x.com/banksodee_fc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/banksodeejfc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/banksodeefc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://uk.linkedin.com/company/banks-o-deefc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200 hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact */}
          <div className="flex flex-col space-y-2 text-center md:text-right md:ml-auto">
            <h4 className="font-semibold text-base mb-1">Get in Touch</h4>
            
            <div className="space-y-1">
              <div className="flex items-start text-sm justify-center md:justify-end">
                <MapPin size={14} className="mr-2 text-[#C5E7FF] flex-shrink-0 mt-0.5 md:order-2 md:ml-2 md:mr-0" />
                <span className="text-white/80">Spain Park, Abbotswell Road, Aberdeen AB12 3AB</span>
              </div>
              <div className="flex items-center text-sm justify-center md:justify-end">
                <Phone size={14} className="mr-2 text-[#C5E7FF] flex-shrink-0 md:order-2 md:ml-2 md:mr-0" />
                <a 
                  href="tel:+441224893333" 
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200"
                >
                  01224 893333
                </a>
              </div>
              <div className="flex items-center text-sm justify-center md:justify-end">
                <Mail size={14} className="mr-2 text-[#C5E7FF] flex-shrink-0 md:order-2 md:ml-2 md:mr-0" />
                <a 
                  href="mailto:info@banksodeefc.co.uk" 
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors duration-200"
                >
                  info@banksodeefc.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Section */}
        <div className="border-t border-white/20 pt-2 pb-1">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center text-xs text-white/60 space-y-1 md:space-y-0">
            <p className="mb-0">&copy; {currentYear} Banks o&apos; Dee Football Club. All rights reserved.</p>
            
            <div className="flex space-x-3">
              <Link 
                href="/privacy" 
                className="hover:text-[#C5E7FF] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-[#C5E7FF] transition-colors duration-200"
              >
                Terms of Use
              </Link>
              <Link 
                href="/cookies" 
                className="hover:text-[#C5E7FF] transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/admin" 
                className="hover:text-[#C5E7FF] transition-colors duration-200"
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
