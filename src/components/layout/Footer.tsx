
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import ClubLogo from "../ui/image/ClubLogo";
import Container from "../ui/layout/Container";

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
    <footer className="bg-[#00105A] text-white">
      {/* Main Footer Content */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Branding Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <ClubLogo
                variant="square"
                background="light"
                className="w-14 h-14"
              />
              <div className="flex flex-col">
                <Heading level={4} color="white" className="mb-0">
                  Banks o' Dee FC
                </Heading>
                <Text size="xs" color="white" className="opacity-70">
                  Est. {foundingYear}
                </Text>
              </div>
            </div>
            
            <Text color="white" size="small" className="opacity-75 max-w-xs text-center md:text-left">
              Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
            </Text>
          </div>
          
          {/* Center: Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <Heading level={4} color="white" className="mb-6">
              Contact Us
            </Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#C5E7FF] h-5 w-5 mt-1 flex-shrink-0" />
                <Text size="small" color="white" className="opacity-75">
                  Spain Park Stadium, Aberdeen, AB12 5XY
                </Text>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-[#C5E7FF] h-5 w-5 flex-shrink-0" />
                <a 
                  href="tel:+441224869948" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  +44 1224 869 948
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-[#C5E7FF] h-5 w-5 flex-shrink-0" />
                <a 
                  href="mailto:info@banksofdeefc.com" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  info@banksofdeefc.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Right: Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <Heading level={4} color="white" className="mb-6">
              Connect With Us
            </Heading>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="bg-white/10 hover:bg-[#C5E7FF] hover:text-[#00105A] transition-colors duration-300 rounded-full p-3 flex items-center justify-center"
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <Text size="xs" color="white" className="opacity-70">
              © {currentYear} Banks o' Dee Football Club.
            </Text>
            <Text size="xs" color="white" className="opacity-70">
              All rights reserved.
            </Text>
          </div>
        </div>
      </Container>
      
      {/* Barcelona-style gradient bar */}
      <div className="h-2 md:h-[8px] bg-gradient-to-r from-primary to-secondary"></div>
    </footer>
  );
};

export default Footer;
