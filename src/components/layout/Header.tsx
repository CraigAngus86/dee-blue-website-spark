"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { buildSponsorLogoUrl } from "@/features/sponsors";
import { getHeaderSponsors } from "@/features/sponsors/utils/sanityQueries";

/**
 * Unified Header component - FIXED: Logo colors + restored our better gradient
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerSponsors, setHeaderSponsors] = useState([]);
  const [sponsorError, setSponsorError] = useState(null);
  const pathname = usePathname();

  // Fetch header sponsors dynamically
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        console.log('🔍 Attempting to fetch header sponsors...');
        const sponsors = await getHeaderSponsors();
        console.log('✅ Sponsors fetched successfully:', sponsors);
        // Sort to ensure principal sponsors appear first
        const sortedSponsors = sponsors.sort((a, b) => {
          if (a.primaryTier === 'principal' && b.primaryTier === 'main') return -1;
          if (a.primaryTier === 'main' && b.primaryTier === 'principal') return 1;
          return a.name.localeCompare(b.name);
        });
        setHeaderSponsors(sortedSponsors);
        setSponsorError(null);
      } catch (error) {
        console.error('❌ Error loading header sponsors:', error);
        setSponsorError(error.message);
        // Show sponsor bar anyway with empty space to maintain layout
        setHeaderSponsors([]);
      }
    };
    
    fetchSponsors();
  }, []);

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
    { name: "Match Centre", href: "/matches" },
    { name: "Spain Park", href: "/stadium" },
    { name: "Commercial", href: "/commercial" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      {/* Container for overlapping design */}
      <div className="relative">
        {/* Sponsor Bar - ALWAYS SHOW (to maintain layout even if sponsors fail to load) */}
        <div className="bg-gradient-to-r from-[#00105A] from-55% via-[#C5E7FF] via-70% to-[#C5E7FF] h-[30px]">
          <div className="container mx-auto px-2 h-full">
            <div className="flex items-center justify-end h-full">
              <div className="flex items-center space-x-1">
                {headerSponsors.length > 0 ? (
                  headerSponsors.map((sponsor) => (
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
                  ))
                ) : sponsorError ? (
                  <span className="text-xs text-white/60">Sponsors loading...</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header - 38px height for better proportion */}
        <div className="bg-[#00105A] text-white h-[38px]">
          <div className="container mx-auto h-full">
            <div className="flex items-center h-full w-full">
              {/* Responsive logo spacer */}
              <div className="w-52 md:w-56 xl:w-64 hidden sm:block"></div>

              {/* Center - Enhanced navigation */}
              <nav 
                role="navigation" 
                aria-label="Main Navigation"
                className="hidden md:flex items-center justify-between flex-1 px-10 lg:px-20 xl:px-[140px]"
              >
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold hover:text-[#C5E7FF] transition-all duration-200 text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:ring-opacity-50 rounded-sm px-1 py-1 ${
                      pathname === item.href ? "text-[#C5E7FF] font-bold border-b-2 border-[#C5E7FF]" : "hover:scale-105"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Right - Enhanced CTA button with reduced height */}
              <div className="hidden md:flex">
                <Link 
                  href="/tickets" 
                  className="bg-[#FFD700] hover:bg-[#00105A] hover:border-2 hover:border-[#FFD700] text-[#00105A] hover:text-[#FFD700] font-bold py-1.5 px-4 rounded-md flex items-center transition-all duration-200 text-sm whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
                >
                  <span>Buy Tickets</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-white p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:ring-opacity-50 rounded"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAPPING LOGO - Enhanced */}
        <div className="absolute top-0 left-4 z-20 h-full flex items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src={buildSponsorLogoUrl('BOD_Logo_White_square_joicd1', 'mainLogo')}
              alt="Banks o' Dee FC"
              width={64}
              height={64}
              className="h-16 w-16 object-contain drop-shadow-2xl transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-montserrat font-bold text-xl ml-4 text-white hidden sm:block drop-shadow-2xl tracking-wide">
              Banks o&apos; Dee FC
            </span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-[#00105A] z-40 md:hidden shadow-lg">
            <nav 
              className="flex flex-col p-4" 
              role="navigation" 
              aria-label="Mobile Navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg py-3 border-b border-[#1a237e] hover:text-[#C5E7FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:ring-opacity-50 rounded-sm px-2 ${
                    pathname === item.href ? "font-bold text-[#C5E7FF]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/tickets" 
                className="bg-[#FFD700] hover:bg-[#00105A] hover:border-2 hover:border-[#FFD700] text-[#00105A] hover:text-[#FFD700] font-bold py-3 px-4 mt-4 rounded-md flex items-center justify-center transition-all duration-200 text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
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
