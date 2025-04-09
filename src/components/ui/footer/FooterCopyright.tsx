
import React from "react";
import { ArrowUp } from "lucide-react";
import Text from "../../ui/typography/Text";

interface FooterCopyrightProps {
  onScrollToTop: () => void;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ onScrollToTop }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="py-4 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center relative">
      <Text color="white" size="xs">
        © {currentYear} Banks o' Dee Football Club. All rights reserved.
      </Text>
      <div className="flex gap-4 mt-3 lg:mt-0">
        <a href="/privacy" className="text-white/60 hover:text-white text-xs">
          Privacy Policy
        </a>
        <a href="/terms" className="text-white/60 hover:text-white text-xs">
          Terms of Service
        </a>
        <a href="/cookies" className="text-white/60 hover:text-white text-xs">
          Cookie Policy
        </a>
        <a href="/admin" className="text-white/60 hover:text-white text-xs">
          Admin
        </a>
      </div>
      <button 
        onClick={onScrollToTop}
        className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 mt-3 lg:mt-0 p-2 bg-white/10 hover:bg-[#C5E7FF]/80 hover:text-[#00105A] rounded-full transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default FooterCopyright;
