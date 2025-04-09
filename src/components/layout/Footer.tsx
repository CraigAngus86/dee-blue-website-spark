
import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUp } from "lucide-react";
import Container from "../ui/layout/Container";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import { ButtonNew } from "../ui/ButtonNew";
import { Input } from "../ui/input";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Simplified footer navigation to 3 columns
  const footerNavigation = [
    {
      title: "Club Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "History", href: "/history" },
        { label: "Stadium", href: "/stadium" },
        { label: "First Team", href: "/team" },
        { label: "Youth Academy", href: "/academy" },
      ],
    },
    {
      title: "Fans & Tickets",
      links: [
        { label: "Tickets", href: "/tickets" },
        { label: "Membership", href: "/membership" },
        { label: "Online Store", href: "/store" },
        { label: "Community", href: "/community" },
        { label: "Photo Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Contact & Social",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Partners", href: "/partners" },
        { label: "Media Enquiries", href: "/media" },
        { label: "Join Our Team", href: "/careers" },
        { label: "Directions", href: "/visit" },
      ],
    },
  ];
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="bg-[#00105A] text-white relative">
      {/* Upper wave decoration */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120H1440V0C1440 0 1252.94 120 720 120C187.06 120 0 0 0 0V120Z" 
            fill="#00105A" 
          />
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="relative pt-16 pb-12 border-b border-white/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Club info and newsletter */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#00105A] font-bold text-xl">BD</span>
                </div>
                <span className="font-montserrat font-bold text-2xl text-white">
                  Banks o' Dee FC
                </span>
              </div>
              
              <Text color="white" size="small" className="max-w-md">
                Scotland's premier football club based in Aberdeen. Established for excellence in football and community involvement since our foundation.
              </Text>
              
              <div className="space-y-4">
                <Heading level={4} color="white">
                  Newsletter
                </Heading>
                <Text color="white" size="small">
                  Subscribe to get the latest news and updates
                </Text>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Your email" 
                    type="email"
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-[#FFD700]"
                  />
                  <ButtonNew variant="accent">
                    Subscribe
                  </ButtonNew>
                </div>
              </div>
            </div>
            
            {/* Navigation sections - reduced to 3 columns */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerNavigation.map((section) => (
                <div key={section.title} className="space-y-4">
                  <Heading level={4} color="white">
                    {section.title}
                  </Heading>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href}
                          className="text-white/80 hover:text-[#C5E7FF] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Contact and social */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <Heading level={4} color="white">
                  Contact Us
                </Heading>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <MapPin size={16} />
                    <span>Spain Park, Aberdeen, Scotland</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <Phone size={16} />
                    <a href="tel:+441234567890" className="hover:text-[#C5E7FF] transition-colors">
                      +44 1234 567890
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <Mail size={16} />
                    <a href="mailto:info@banksofdeefc.com" className="hover:text-[#C5E7FF] transition-colors">
                      info@banksofdeefc.com
                    </a>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Heading level={4} color="white" className="mb-3">
                    Follow Us
                  </Heading>
                  <div className="flex gap-4">
                    <a href="#" className="p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors">
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href="#" className="p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors">
                      <Youtube size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Copyright section with back to top button */}
      <Container>
        <div className="py-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center relative">
          <Text color="white" size="xs">
            © {currentYear} Banks o' Dee Football Club. All rights reserved.
          </Text>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <a href="/privacy" className="text-white/60 hover:text-white text-xs">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white/60 hover:text-white text-xs">
              Terms of Service
            </a>
            <a href="/cookies" className="text-white/60 hover:text-white text-xs">
              Cookie Policy
            </a>
          </div>
          <button 
            onClick={handleScrollToTop}
            className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-4 lg:mt-0 p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
