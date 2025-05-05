
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

/**
 * Header component with responsive mobile menu
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: "News", href: "/news" },
    { name: "Team & Management", href: "/team" },
    { name: "Match Centre", href: "/fixtures" },
    { name: "Spain Park", href: "/spain-park" },
    { name: "Commercial", href: "/commercial" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full bg-primary text-white z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logos/BOD_Logo_White_square.png"
              alt="Banks o' Dee FC"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-montserrat font-bold text-lg ml-2 hidden sm:block">
              Banks o&apos; Dee FC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium hover:text-blue-200 transition-colors ${
                  pathname === item.href ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Buy Tickets Button - Desktop */}
          <div className="hidden md:block">
            <Link 
              href="/tickets" 
              className="bg-accent hover:bg-accent-dark text-primary font-bold py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <span>Buy Tickets</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white p-2 md:hidden focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-primary z-40 md:hidden">
            <nav className="flex flex-col p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg py-3 border-b border-primary-700 ${
                    pathname === item.href ? "font-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/tickets" 
                className="bg-accent hover:bg-accent-dark text-primary font-bold py-3 px-4 mt-4 rounded-md flex items-center justify-center transition-colors"
              >
                <span>Buy Tickets</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
