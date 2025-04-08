
import React, { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../ui/layout/Container";
import { ButtonNew } from "../ui/ButtonNew";
import Text from "../ui/typography/Text";

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
  
  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "Team", href: "/team" },
    { label: "Fixtures", href: "/fixtures" },
    { label: "Club", href: "/club" },
    { label: "Tickets", href: "/tickets" },
  ];
  
  // Updated header classes based on scroll state and transparency setting
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    {
      "bg-white shadow-md": !transparent || isScrolled,
      "bg-transparent": transparent && !isScrolled,
      "h-24": !isScrolled,
      "h-20": isScrolled,
    },
    className
  );
  
  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">BD</span>
              </div>
              <span 
                className={cn(
                  "font-montserrat font-bold text-xl transition-colors",
                  transparent && !isScrolled ? "text-white" : "text-primary"
                )}
              >
                Banks o' Dee FC
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "font-montserrat font-semibold text-sm tracking-wide hover:text-secondary transition-colors duration-200",
                  transparent && !isScrolled 
                    ? "text-white" 
                    : "text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div 
              className={cn(
                "relative p-2 rounded-full transition-colors cursor-pointer",
                transparent && !isScrolled 
                  ? "text-white hover:bg-white/20" 
                  : "text-primary hover:bg-light-gray"
              )}
            >
              <Search size={20} />
            </div>
            <ButtonNew 
              variant="accent" 
              size="sm"
              className={transparent && !isScrolled ? "bg-white text-primary border-accent hover:bg-accent hover:text-primary" : ""}
            >
              Buy Tickets
            </ButtonNew>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-full transition-colors",
                transparent && !isScrolled 
                  ? "text-white hover:bg-white/20" 
                  : "text-primary hover:bg-light-gray"
              )}
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-in-right">
          <Container>
            <nav className="py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-montserrat font-semibold text-base text-primary hover:text-secondary px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-medium-gray">
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
