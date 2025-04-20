
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import ClubLogo from "../ui/image/ClubLogo";
import Container from "../ui/layout/Container";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Team', path: '/team' },
    { name: 'Fixtures', path: '/fixtures' },
    { name: 'Table', path: '/table' },
    { name: 'Stadium', path: '/stadium' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com/banksofdeefc", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/banksofdeefc", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/banksofdeefc", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/banksofdeefc", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#00105A] text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Club Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-4 mb-4">
              <ClubLogo
                variant="square"
                background="light"
                className="w-16 h-16"
              />
              <div>
                <Heading level={4} color="white" className="mb-0">
                  Banks o' Dee FC
                </Heading>
              </div>
            </div>
            <Text color="white" size="small" className="opacity-75 max-w-xs text-center lg:text-left">
              Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
            </Text>
          </div>

          {/* Middle Column - Navigation */}
          <div className="flex flex-col items-center">
            <Heading level={4} color="white" className="mb-6">
              Quick Links
            </Heading>
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Contact & Social */}
          <div className="flex flex-col items-center lg:items-end">
            <Heading level={4} color="white" className="mb-6">
              Contact Us
            </Heading>
            <div className="flex flex-col items-center lg:items-end gap-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#C5E7FF] h-5 w-5" />
                <Text size="small" color="white" className="opacity-75">
                  Spain Park Stadium, Aberdeen, AB12 5XY
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#C5E7FF] h-5 w-5" />
                <a 
                  href="tel:+441224869948" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  +44 1224 869 948
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-[#C5E7FF] h-5 w-5" />
                <a 
                  href="mailto:info@banksofdeefc.com" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-sm"
                >
                  info@banksofdeefc.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="bg-white/10 hover:bg-[#C5E7FF] hover:text-[#00105A] transition-colors duration-300 rounded-full p-2 flex items-center justify-center"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <Text size="xs" color="white" className="opacity-70 text-center lg:text-right">
              © {currentYear} Banks o' Dee Football Club. All rights reserved.
            </Text>
          </div>
        </div>
      </Container>
      
      {/* Barcelona-style gradient bar */}
      <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
    </footer>
  );
};

export default Footer;
