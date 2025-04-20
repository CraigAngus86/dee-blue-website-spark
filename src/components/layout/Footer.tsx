
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import ClubLogo from "../ui/image/ClubLogo";
import Container from "../ui/layout/Container";
import HoverEffect from "../ui/animations/HoverEffect";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const foundingYear = 1946; // Banks o' Dee FC founding year
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com/banksofdeefc", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/banksofdeefc", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/banksofdeefc", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/banksofdeefc", label: "LinkedIn" },
  ];
  
  return (
    <footer className="bg-[#00105A] text-white relative">
      {/* Main footer content */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Branding Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <ClubLogo
                variant="square"
                background="light"
                className="w-14 h-14"
              />
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-xl text-white">
                  Banks o' Dee FC
                </span>
                <Text size="xs" color="white" className="opacity-60">
                  Est. {foundingYear}
                </Text>
              </div>
            </div>
            
            <Text color="white" size="small" className="opacity-80 max-w-md">
              Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
            </Text>
          </div>
          
          {/* Center: Contact Information */}
          <div className="space-y-6 text-center">
            <Heading level={5} color="white" className="mb-4">
              Contact Us
            </Heading>
            <ul className="space-y-5">
              <li className="flex items-start justify-center gap-3">
                <MapPin size={20} className="text-[#C5E7FF] mt-1 flex-shrink-0" />
                <Text size="small" color="white" className="opacity-80 text-left">
                  Spain Park Stadium, Aberdeen, AB12 5XY
                </Text>
              </li>
              <li className="flex items-center justify-center gap-3">
                <Phone size={20} className="text-[#C5E7FF] flex-shrink-0" />
                <a 
                  href="tel:+441224869948" 
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  +44 1224 869 948
                </a>
              </li>
              <li className="flex items-center justify-center gap-3">
                <Mail size={20} className="text-[#C5E7FF] flex-shrink-0" />
                <a 
                  href="mailto:info@banksofdeefc.com" 
                  className="text-white/80 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  info@banksofdeefc.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Right: Social Media & Copyright */}
          <div className="space-y-6 md:text-right">
            <Heading level={5} color="white" className="mb-4 md:text-right text-center">
              Connect With Us
            </Heading>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((link) => (
                <HoverEffect key={link.label} effect="lift" duration="fast">
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5E7FF] hover:text-[#00105A] transition-colors duration-200"
                  >
                    {link.icon}
                  </a>
                </HoverEffect>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="mt-8 text-center md:text-right">
              <Text size="xs" color="white" className="opacity-60">
                © {currentYear} Banks o' Dee Football Club.
              </Text>
              <Text size="xs" color="white" className="opacity-60">
                All rights reserved.
              </Text>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Barcelona-style gradient bar */}
      <div className="h-2 md:h-[8px] bg-gradient-to-r from-primary to-secondary"></div>
    </footer>
  );
};

export default Footer;
