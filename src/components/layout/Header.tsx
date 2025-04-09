
import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../ui/layout/Container";
import { ButtonNew } from "../ui/ButtonNew";
import ClubLogo from "../ui/image/ClubLogo";
import HoverEffect from "../ui/animations/HoverEffect";

interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simple navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "Team & Management", href: "/team" },
    { label: "Fixtures", href: "/fixtures" },
    { label: "League Table", href: "/table" },
    { label: "Spain Park", href: "/stadium" },
    { label: "Tickets", href: "/tickets" },
  ];
  
  // Always using primary (navy) color with full opacity for sticky header
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 bg-primary shadow-md",
    "h-[72px]",
    className
  );
  
  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-full">
          {/* Logo positioned far left with more spacing */}
          <div className="flex items-center">
            <a href="/" className="flex items-center py-2 mr-10">
              <ClubLogo 
                variant="rect"
                background="light"
                className="w-[60px] h-auto max-h-[28px]"
              />
            </a>
          </div>
          
          {/* Desktop Navigation - with improved typography and hover effect */}
          <div className="hidden lg:flex items-center flex-grow justify-center">
            <nav className="flex space-x-10"> {/* Increased spacing between items */}
              {navItems.map((item) => (
                <div 
                  key={item.label} 
                  className="py-2 relative group"
                >
                  <a
                    href={item.href}
                    className="font-montserrat font-bold text-sm tracking-widest text-white hover:text-secondary transition-colors duration-200 whitespace-nowrap" 
                    // Added wider tracking and whitespace-nowrap to prevent wrapping
                  >
                    {item.label}
                  </a>
                  {/* Custom hover effect with light blue bottom border */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#33C3F0] scale-x-0 transition-transform duration-200 origin-bottom-left group-hover:scale-x-100"></div>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative p-2 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer">
              <Search size={20} />
            </div>
            <ButtonNew 
              variant="accent" 
              size="sm"
              className="bg-accent text-primary border-accent hover:bg-accent-light whitespace-nowrap filter hover:brightness-105 shadow-md" 
              // Added shadow and brightness hover effect
            >
              Buy Tickets
            </ButtonNew>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary shadow-lg animate-slide-in-right">
          <Container>
            <nav className="py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat font-bold text-base text-white hover:text-secondary px-2 py-2 flex items-center justify-between tracking-widest"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <div className="pt-4 border-t border-white/20">
                <ButtonNew 
                  variant="accent" 
                  size="md" 
                  className="w-full shadow-md filter hover:brightness-105"
                >
                  Buy Tickets
                </ButtonNew>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
