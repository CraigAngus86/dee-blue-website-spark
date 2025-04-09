
import React, { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../ui/layout/Container";
import { ButtonNew } from "../ui/ButtonNew";
import ClubLogo from "../ui/image/ClubLogo";

interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ transparent = false, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Simple navigation items without dropdowns
  const navItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "Team & Management", href: "/team" },
    { label: "Fixtures", href: "/fixtures" },
    { label: "League Table", href: "/table" },
    { label: "Spain Park", href: "/stadium" },
    { label: "Tickets", href: "/tickets" },
  ];
  
  // Updated header classes based on scroll state and transparency setting
  // Always using primary (navy) color now, but with transparency when needed
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
    {
      "bg-primary/95 shadow-md": !transparent || isScrolled,
      "bg-primary/50": transparent && !isScrolled,
      "h-[72px]": !isScrolled,
      "h-[64px]": isScrolled,
    },
    className
  );
  
  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-full">
          {/* Logo with proper sizing - not exceeding navbar height */}
          <div className="flex items-center">
            <a href="/" className="flex items-center py-2">
              <ClubLogo 
                variant="rect"
                background="light" // Always use light (white) variant on navy background
                className={cn(
                  "transition-all duration-200 max-h-[72px]",
                  isScrolled ? "w-[120px]" : "w-[140px]"
                )}
              />
            </a>
          </div>
          
          {/* Desktop Navigation without dropdowns */}
          <div className="hidden lg:flex items-center">
            <nav className="flex space-x-7">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-montserrat font-bold text-sm tracking-wide text-white hover:text-secondary transition-colors duration-200 py-2"
                >
                  {item.label}
                </a>
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
              className="bg-accent text-primary border-accent hover:bg-accent-light"
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
                    className="font-montserrat font-semibold text-base text-white hover:text-secondary px-2 py-2 flex items-center justify-between"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <div className="pt-4 border-t border-white/20">
                <ButtonNew variant="accent" size="md" className="w-full">
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
