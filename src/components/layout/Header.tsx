
import React, { useState, useEffect } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../ui/layout/Container";
import { ButtonNew } from "../ui/ButtonNew";
import Text from "../ui/typography/Text";
import ClubLogo from "../ui/image/ClubLogo";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "../ui/navigation-menu";

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
  
  // Navigation items with dropdown structure
  const navItems = [
    { 
      label: "Home", 
      href: "/",
      dropdown: false
    },
    { 
      label: "News", 
      href: "/news",
      dropdown: true,
      items: [
        { label: "Latest News", href: "/news/latest" },
        { label: "Club News", href: "/news/club" },
        { label: "Match Reports", href: "/news/match-reports" }
      ]
    },
    { 
      label: "Team", 
      href: "/team",
      dropdown: true,
      items: [
        { label: "First Team", href: "/team/first-team" },
        { label: "Youth", href: "/team/youth" },
        { label: "Staff", href: "/team/staff" }
      ]
    },
    { 
      label: "Fixtures", 
      href: "/fixtures",
      dropdown: true,
      items: [
        { label: "Upcoming Fixtures", href: "/fixtures/upcoming" },
        { label: "Results", href: "/fixtures/results" },
        { label: "League Table", href: "/fixtures/table" }
      ]
    },
    { 
      label: "Club", 
      href: "/club",
      dropdown: true,
      items: [
        { label: "History", href: "/club/history" },
        { label: "Stadium", href: "/club/stadium" },
        { label: "Board", href: "/club/board" }
      ]
    },
    { 
      label: "Tickets", 
      href: "/tickets",
      dropdown: false
    },
  ];
  
  // Updated header classes based on scroll state and transparency setting
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
    {
      "bg-white/95 shadow-md": !transparent || isScrolled,
      "bg-transparent": transparent && !isScrolled,
      "h-[72px]": !isScrolled,
      "h-[64px]": isScrolled,
    },
    className
  );
  
  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex items-center justify-between h-full">
          {/* Logo with proper sizing */}
          <div className="flex items-center">
            <a href="/" className="flex items-center py-2">
              <ClubLogo 
                variant="rect"
                background={transparent && !isScrolled ? "light" : "dark"}
                className={cn(
                  "transition-all duration-200",
                  isScrolled ? "w-[120px]" : "w-[140px]"
                )}
              />
            </a>
          </div>
          
          {/* Desktop Navigation with dropdowns */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-7">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.dropdown ? (
                    <>
                      <NavigationMenuTrigger 
                        className={cn(
                          "font-montserrat font-bold text-sm tracking-wide transition-colors duration-200 bg-transparent hover:bg-transparent focus:bg-transparent",
                          transparent && !isScrolled 
                            ? "text-white hover:text-secondary" 
                            : "text-primary hover:text-secondary"
                        )}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4 bg-white">
                          {item.items?.map((subItem) => (
                            <li key={subItem.label}>
                              <NavigationMenuLink 
                                asChild
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-light-gray hover:text-primary focus:bg-accent/10 focus:text-accent-foreground"
                              >
                                <a href={subItem.href} className="font-medium text-sm text-primary">
                                  {subItem.label}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "inline-flex items-center justify-center rounded-md font-montserrat font-bold text-sm tracking-wide hover:text-secondary px-4 py-2 transition-colors duration-200",
                        transparent && !isScrolled 
                          ? "text-white" 
                          : "text-primary"
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
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
                <div key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat font-semibold text-base text-primary hover:text-secondary px-2 py-2 flex items-center justify-between"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </a>
                  {item.dropdown && (
                    <div className="pl-4 mt-1 border-l-2 border-light-gray space-y-2">
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-2 px-2 text-sm text-gray hover:text-secondary"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
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
