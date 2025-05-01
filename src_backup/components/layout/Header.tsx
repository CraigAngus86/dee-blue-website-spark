
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 w-full bg-primary text-white z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Replace with actual logo when available */}
            <div className="font-montserrat font-bold text-2xl">
              Banks o&apos; Dee FC
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="font-medium hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/team" className="font-medium hover:text-accent transition-colors">
                Team
              </Link>
              <Link href="/fixtures" className="font-medium hover:text-accent transition-colors">
                Fixtures
              </Link>
              <Link href="/news" className="font-medium hover:text-accent transition-colors">
                News
              </Link>
              <Link href="/spain-park" className="font-medium hover:text-accent transition-colors">
                Spain Park
              </Link>
              <Link href="/commercial" className="font-medium hover:text-accent transition-colors">
                Commercial
              </Link>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button className="md:hidden text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
