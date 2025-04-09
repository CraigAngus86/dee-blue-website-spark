
import React from "react";
import Container from "../ui/layout/Container";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Text from "../ui/typography/Text";
import Heading from "../ui/typography/Heading";
import { ButtonNew } from "../ui/ButtonNew";
import { Input } from "../ui/input";
import ClubLogo from "../ui/image/ClubLogo";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="bg-[#00105A] text-white relative">
      {/* Main footer content */}
      <div className="relative pt-12 pb-10 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Club info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <ClubLogo
                  variant="square"
                  background="light"
                  className="w-12 h-12"
                />
                <span className="font-montserrat font-bold text-xl text-white">
                  Banks o' Dee FC
                </span>
              </div>
              
              <Text color="white" size="small" className="opacity-80 max-w-md">
                Scotland's premier football club based in Aberdeen, focused on excellence and community engagement.
              </Text>
            </div>
            
            {/* Column 2: Quick links */}
            <div className="space-y-4">
              <Heading level={5} color="white" className="mb-4 font-montserrat">
                Quick Links
              </Heading>
              <ul className="space-y-2">
                {['Home', 'News', 'Fixtures', 'League Table', 'Tickets'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/80 hover:text-[#33C3F0] transition-colors text-sm block py-1">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Contact info */}
            <div className="space-y-4">
              <Heading level={5} color="white" className="mb-4 font-montserrat">
                Contact Us
              </Heading>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-[#33C3F0] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">
                    Spain Park Stadium, Aberdeen, AB12 5XY
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={18} className="text-[#33C3F0] flex-shrink-0" />
                  <a href="tel:+441234567890" className="text-white/80 hover:text-[#33C3F0] transition-colors text-sm">
                    +44 1234 567890
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} className="text-[#33C3F0] flex-shrink-0" />
                  <a href="mailto:info@banksofdeefc.com" className="text-white/80 hover:text-[#33C3F0] transition-colors text-sm">
                    info@banksofdeefc.com
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <Heading level={5} color="white" className="mb-4 font-montserrat">
                Newsletter
              </Heading>
              <Text color="white" size="small" className="opacity-80">
                Subscribe to receive the latest news and updates.
              </Text>
              <div className="flex flex-col gap-3 mt-4">
                <Input 
                  placeholder="Your email" 
                  type="email"
                  className="bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-[#33C3F0] h-10"
                />
                <ButtonNew variant="accent" size="sm" className="w-full">
                  Subscribe
                </ButtonNew>
              </div>
              
              {/* Back to top button */}
              <button 
                onClick={handleScrollToTop}
                className="flex items-center gap-2 py-2 px-4 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors mt-4 text-sm"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Copyright section */}
      <Container>
        <div className="py-4 flex justify-center md:justify-between items-center text-center md:text-left">
          <Text color="white" size="xs" className="opacity-70">
            © {currentYear} Banks o' Dee Football Club. All rights reserved.
          </Text>
          <div className="hidden md:flex gap-4">
            <a href="#" className="text-white/60 hover:text-white text-xs">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-xs">Terms & Conditions</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
