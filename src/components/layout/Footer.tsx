
import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Container from "../ui/layout/Container";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import { ButtonNew } from "../ui/ButtonNew";
import { Input } from "../ui/input";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation columns
  const footerNavigation = [
    {
      title: "Club",
      links: [
        { label: "About Us", href: "/about" },
        { label: "History", href: "/history" },
        { label: "Stadium", href: "/stadium" },
        { label: "Partners", href: "/partners" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Team",
      links: [
        { label: "First Team", href: "/team" },
        { label: "Youth Academy", href: "/academy" },
        { label: "Coaching Staff", href: "/staff" },
        { label: "Join Our Team", href: "/careers" },
      ],
    },
    {
      title: "Fans",
      links: [
        { label: "Tickets", href: "/tickets" },
        { label: "Membership", href: "/membership" },
        { label: "Online Store", href: "/store" },
        { label: "Community", href: "/community" },
      ],
    },
  ];
  
  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-white relative">
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
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">BD</span>
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
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-accent"
                  />
                  <ButtonNew variant="accent">
                    Subscribe
                  </ButtonNew>
                </div>
              </div>
            </div>
            
            {/* Navigation sections */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                          className="text-white/80 hover:text-accent transition-colors text-sm"
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
                    <span>+44 1234 567890</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                    <Mail size={16} />
                    <span>info@banksofdeefc.com</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <Heading level={4} color="white">
                  Follow Us
                </Heading>
                <div className="mt-4 flex gap-4">
                  <a href="#" className="p-2 bg-white/10 hover:bg-accent/80 rounded-full transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white/10 hover:bg-accent/80 rounded-full transition-colors">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white/10 hover:bg-accent/80 rounded-full transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white/10 hover:bg-accent/80 rounded-full transition-colors">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Copyright section */}
      <Container>
        <div className="py-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center">
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
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
