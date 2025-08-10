"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { buildSponsorLogoUrl } from "@/features/sponsors";

interface HeaderProps {
  sponsors: any[];
}

const Header = ({ sponsors = [] }: HeaderProps) => {
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
    { name: "About the Club", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Team & Management", href: "/team" },
    { name: "Match Centre", href: "/matches" },
    { name: "The Academy", href: "/academy" },
    { name: "Commercial", href: "/commercial" },
  ];

  // Sort sponsors (same logic as before)
  const sortedSponsors = sponsors.sort((a, b) => {
    if (a.primaryTier === 'principal' && b.primaryTier === 'main') return -1;
    if (a.primaryTier === 'main' && b.primaryTier === 'principal') return 1;
    return a.name.localeCompare(b.name);
  });

  // Get principal sponsor for mobile
  const principalSponsor = sortedSponsors.find(sponsor => sponsor.primaryTier === 'principal');

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      {/* Container for overlapping design */}
      <div className="relative">
        {/* Sponsor Bar - Black to Gold gradient */}
        <div className="bg-gradient-to-r from-[#000000] from-55% via-[#FCC743] via-70% to-[#FCC743] h-[30px]">
          <div className="container mx-auto px-2 h-full">
            <div className="flex items-center justify-end h-full">
              
              {/* Desktop: All Sponsors */}
              <div className="hidden md:flex items-center space-x-1">
                {sortedSponsors.map((sponsor) => (
                  <Link
                    key={sponsor._id}
                    href={sponsor.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 hover:scale-105 transition-all duration-200 block"
                    title={sponsor.name}
                  >
                    <Image
                      src={buildSponsorLogoUrl(sponsor.logo?.public_id, 'header')}
                      alt={sponsor.name}
                      width={120}
                      height={28}
                      className="object-contain h-5"
                    />
                  </Link>
                ))}
              </div>

              {/* Mobile: Principal Sponsor Only */}
              <div className="flex md:hidden items-center">
                {principalSponsor && (
                  <Link
                    href={principalSponsor.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 hover:scale-105 transition-all duration-200 block"
                    title={principalSponsor.name}
                  >
                    <Image
                      src={buildSponsorLogoUrl(principalSponsor.logo?.public_id, 'header')}
                      alt={principalSponsor.name}
                      width={100}
                      height={28}
                      className="object-contain h-5"
                    />
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Main Header - Charcoal Black */}
        <div className="bg-[#000000] text-white h-[38px]">
          <div className="container mx-auto h-full">
            
            <div className="hidden md:flex items-center h-full w-full">
              <div className="w-52 md:w-56 xl:w-64"></div>

              <nav 
                role="navigation" 
                aria-label="Main Navigation"
                className="flex items-center justify-between flex-1 px-4 lg:px-8 xl:px-16"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-sans font-semibold text-[#FCC743] hover:text-white transition-all duration-200 text-sm lg:text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#FCC743] focus:ring-opacity-50 rounded-sm px-1 py-1 ${
                      pathname === item.href ? "text-white font-bold border-b-2 border-[#FCC743]" : "hover:scale-105"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex">
                <Link 
                  href="#" 
                  className="bg-[#FCC743] hover:bg-[#000000] hover:border-2 hover:border-[#FCC743] text-[#000000] hover:text-[#FCC743] font-sans font-bold py-1.5 px-4 rounded-md flex items-center transition-all duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FCC743] focus:ring-opacity-50"
                >
                  <span>Buy Tickets</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            <div className="flex md:hidden items-center justify-end h-full w-full px-4">
              <button
                onClick={toggleMenu}
                className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#FCC743] focus:ring-opacity-50 rounded z-30"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        <div className="absolute top-0 left-4 z-20 h-full flex items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src={buildSponsorLogoUrl('Baynounah_SC_Logo_idok3c', 'mainLogo')}
              alt="Baynounah Sports Club"
              width={64}
              height={64}
              className="h-16 w-16 object-contain drop-shadow-2xl transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-sans font-bold text-xl ml-4 text-[#FCC743] hidden sm:block drop-shadow-2xl tracking-wide" style={{fontFamily: 'Bebas Neue, sans-serif'}}>
              Baynounah Sports Club
            </span>
          </Link>
        </div>

        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-[#000000] z-40 md:hidden shadow-lg">
            <nav 
              className="flex flex-col p-4" 
              role="navigation" 
              aria-label="Mobile Navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-sans text-[#FCC743] hover:text-white text-lg py-3 border-b border-[#333333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCC743] focus:ring-opacity-50 rounded-sm px-2 ${
                    pathname === item.href ? "font-bold text-white border-b-2 border-[#FCC743]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="#" 
                className="bg-[#FCC743] hover:bg-[#000000] hover:border-2 hover:border-[#FCC743] text-[#000000] hover:text-[#FCC743] font-sans font-bold py-3 px-4 mt-4 rounded-md flex items-center justify-center transition-all duration-200 text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FCC743] focus:ring-opacity-50"
              >
                <span>Buy Tickets</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
