
import React from "react";
import Container from "../ui/layout/Container";
import FooterInfo from "../ui/footer/FooterInfo";
import FooterNavigation from "../ui/footer/FooterNavigation";
import FooterContactSocial from "../ui/footer/FooterContactSocial";
import FooterCopyright from "../ui/footer/FooterCopyright";

const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="bg-[#00105A] text-white relative">
      {/* Main footer content */}
      <div className="relative pt-16 pb-12 border-b border-white/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Club info and brand */}
            <FooterInfo />
            
            {/* Column 2: Navigation links - Simplified */}
            <FooterNavigation />
            
            {/* Column 3: Contact and social - Consolidated */}
            <FooterContactSocial />
          </div>
        </Container>
      </div>
      
      {/* Copyright section with back to top button */}
      <Container>
        <FooterCopyright onScrollToTop={handleScrollToTop} />
      </Container>
    </footer>
  );
};

export default Footer;
