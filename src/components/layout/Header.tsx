
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

/**
 * Header component with responsive mobile menu
 * Client component because it uses useState, usePathname, and browser APIs
 */
const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Team", href: "/team" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Commercial", href: "/commercial" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-primary text-white z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/images/logos/BOD_Logo_White_square.png"
              alt="Banks o' Dee FC"
              className="h-10 w-auto mr-2"
            />
            <span className="font-bold text-lg hidden sm:block">Banks o&apos; Dee FC</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu} 
              className="text-white p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-primary z-40 p-4">
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`text-lg py-2 border-b border-primary-700 ${
                        pathname === item.href ? "font-bold" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex space-x-6">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`text-white hover:text-blue-200 transition-colors ${
                  pathname === item.href ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
