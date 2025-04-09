
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
            <FooterInfo />
            <FooterNavigation />
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
