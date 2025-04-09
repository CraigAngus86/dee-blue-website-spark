
import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Heading from "../typography/Heading";

const FooterContactSocial: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={4} color="white" className="mb-4">
          Contact Us
        </Heading>
        <ul className="space-y-3">
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
      </div>
      
      <div>
        <Heading level={4} color="white" className="mb-3">
          Follow Us
        </Heading>
        <div className="flex gap-3">
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
  );
};

export default FooterContactSocial;
