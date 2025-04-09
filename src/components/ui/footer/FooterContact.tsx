
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Heading from "../../ui/typography/Heading";

const FooterContact: React.FC = () => {
  return (
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
    </div>
  );
};

export default FooterContact;
