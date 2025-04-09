
import React from "react";
import Container from "../ui/layout/Container";
import FooterInfo from "../ui/footer/FooterInfo";
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
      {/* Main footer content - more compact */}
      <div className="relative pt-12 pb-8 border-b border-white/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Club info and brand */}
            <FooterInfo />
            
            {/* Column 2: Contact and social - Consolidated */}
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
