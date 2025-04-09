
import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Heading from "../../ui/typography/Heading";

const FooterSocial: React.FC = () => {
  return (
    <div className="mt-6">
      <Heading level={4} color="white" className="mb-3">
        Follow Us
      </Heading>
      <div className="flex gap-4">
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
  );
};

export default FooterSocial;
