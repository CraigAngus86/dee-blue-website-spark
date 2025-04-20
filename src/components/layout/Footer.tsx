
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
    { icon: <Facebook size={24} />, href: "https://facebook.com/banksofdeefc", label: "Facebook" },
    { icon: <Twitter size={24} />, href: "https://twitter.com/banksofdeefc", label: "Twitter" },
    { icon: <Instagram size={24} />, href: "https://instagram.com/banksofdeefc", label: "Instagram" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com/company/banksofdeefc", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#00105A] text-white py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Club Info */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-center gap-4">
              <ClubLogo
                variant="square"
                background="light"
                size={80}
              />
              <div>
                <Heading level={3} color="white" className="mb-0">
                  Banks o' Dee FC
                </Heading>
              </div>
            </div>
            <Text color="white" size="medium" className="opacity-75 max-w-xs text-left">
              Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
            </Text>
            <Text size="xs" color="white" className="opacity-70 mt-auto">
              © {currentYear} Banks o' Dee Football Club. All rights reserved.
            </Text>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col items-center">
            <Heading level={3} color="white" className="mb-8">
              Quick Links
            </Heading>
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white hover:text-[#C5E7FF] transition-colors text-base font-medium tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Contact & Social */}
          <div className="flex flex-col items-end space-y-6">
            <Heading level={3} color="white" className="mb-8">
              Contact Us
            </Heading>
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-3 justify-end">
                <Text size="medium" color="white" className="opacity-75 text-right">
                  Spain Park Stadium, Aberdeen, AB12 5XY
                </Text>
                <MapPin className="text-[#C5E7FF] h-6 w-6" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <a 
                  href="tel:+441224869948" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-base"
                >
                  +44 1224 869 948
                </a>
                <Phone className="text-[#C5E7FF] h-6 w-6" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <a 
                  href="mailto:info@banksofdeefc.com" 
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors text-base"
                >
                  info@banksofdeefc.com
                </a>
                <Mail className="text-[#C5E7FF] h-6 w-6" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="bg-white/10 hover:bg-[#C5E7FF] hover:text-[#00105A] transition-colors duration-300 rounded-full p-2.5 flex items-center justify-center"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
