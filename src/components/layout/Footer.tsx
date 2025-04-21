
import React from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import Container from "../ui/layout/Container";
import { Link } from "react-router-dom";
import ClubLogo from "../ui/image/ClubLogo";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'News', path: '/news' },
    { name: 'Team and Management', path: '/team' },
    { name: 'Match Centre', path: '/matches' },
    { name: 'Stadium', path: '/stadium' },
    { name: 'Commercial Opportunities', path: '/commercial' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com/banksofdeefc", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/banksofdeefc", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/banksofdeefc", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/banksofdeefc", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#00105A] text-white">
      <Container size="xl" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Column 1 - Club Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <ClubLogo 
                variant="rect"
                background="light"
                size={120}
                className="mb-6"
              />
            </div>
            <Text color="white" size="small" className="opacity-75 mb-6 leading-relaxed">
              Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
            </Text>
            
            <Text size="xs" color="white" className="opacity-50 mt-auto">
              © {currentYear} Banks o' Dee Football Club. All rights reserved.
            </Text>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col">
            <Heading level={3} color="white" className="mb-6">
              Quick Links
            </Heading>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white/75 hover:text-[#C5E7FF] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <nav className="flex flex-wrap gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white/50 hover:text-white/75 transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 3 - Contact & Social */}
          <div className="flex flex-col items-center text-center">
            <Heading level={3} color="white" className="mb-6">
              Contact Us
            </Heading>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center">
                <MapPin className="text-[#C5E7FF] h-5 w-5 mr-3 flex-shrink-0" />
                <Text color="white" size="small" className="opacity-75">
                  Spain Park Stadium, Aberdeen, AB12 5XY
                </Text>
              </div>
              
              <div className="flex items-center justify-center">
                <Phone className="text-[#C5E7FF] h-5 w-5 mr-3 flex-shrink-0" />
                <Text color="white" size="small" className="opacity-75">
                  +44 1224 869 948
                </Text>
              </div>
              
              <div className="flex items-center justify-center">
                <Mail className="text-[#C5E7FF] h-5 w-5 mr-3 flex-shrink-0" />
                <Text color="white" size="small" className="opacity-75">
                  info@banksofdeefc.com
                </Text>
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[#C5E7FF] hover:text-[#00105A] transition-colors duration-300 rounded-full p-2.5"
                  aria-label={link.label}
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
