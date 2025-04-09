
import React from "react";
import Container from "../ui/layout/Container";
import { ArrowUp, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
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
      <div className="relative pt-16 pb-12 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Club info */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#00105A] font-bold text-xl">BD</span>
                </div>
                <span className="font-montserrat font-bold text-2xl text-white">
                  Banks o' Dee FC
                </span>
              </div>
              
              <Text color="white" size="small" className="max-w-md opacity-80">
                Scotland's premier football club based in Aberdeen, established for excellence in football and community involvement.
              </Text>
              
              {/* Newsletter signup */}
              <div className="pt-4">
                <Heading level={5} color="white" className="mb-3">
                  Stay Updated
                </Heading>
                <div className="flex gap-2 max-w-sm">
                  <Input 
                    placeholder="Your email" 
                    type="email"
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/50 focus:border-[#33C3F0]"
                  />
                  <ButtonNew variant="accent">
                    Subscribe
                  </ButtonNew>
                </div>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="md:col-span-4 space-y-4">
              <Heading level={4} color="white" className="mb-4">
                Contact Us
              </Heading>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#33C3F0] mt-0.5" />
                  <span className="text-white/80">
                    Spain Park Stadium<br />
                    Aberdeen, AB12 5XY<br />
                    Scotland
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#33C3F0]" />
                  <a href="tel:+441234567890" className="text-white/80 hover:text-[#33C3F0] transition-colors">
                    +44 1234 567890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#33C3F0]" />
                  <a href="mailto:info@banksofdeefc.com" className="text-white/80 hover:text-[#33C3F0] transition-colors">
                    info@banksofdeefc.com
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social media */}
            <div className="md:col-span-3">
              <Heading level={4} color="white" className="mb-4">
                Follow Us
              </Heading>
              <div className="grid grid-cols-4 gap-3 max-w-[200px]">
                <a href="#" className="p-3 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors flex items-center justify-center">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors flex items-center justify-center">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors flex items-center justify-center">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors flex items-center justify-center">
                  <Youtube size={20} />
                </a>
              </div>
              
              {/* Back to top button */}
              <div className="mt-8">
                <button 
                  onClick={handleScrollToTop}
                  className="flex items-center gap-2 py-2 px-4 bg-white/10 hover:bg-[#33C3F0]/80 hover:text-[#00105A] rounded-lg transition-colors"
                  aria-label="Back to top"
                >
                  <ArrowUp size={18} />
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Copyright section */}
      <Container>
        <div className="py-6 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <Text color="white" size="xs" className="opacity-70">
            © {currentYear} Banks o' Dee Football Club. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
