import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ClubLogo from "../ui/image/ClubLogo";

const Header: React.FC<{ className?: string; transparent?: boolean }> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#00105A] shadow-md h-20 flex items-center">
      <div className="w-full px-8 md:px-12 lg:px-16 flex items-center">
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <ClubLogo 
              variant="rect"
              background="light"
              size={60}
            />
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center mx-auto">
          <ul className="flex items-center h-full">
            {[
              { name: 'Home', path: '/' },
              { name: 'News', path: '/news' },
              { name: 'Team & Management', path: '/team' },
              { name: 'Fixtures', path: '/fixtures' },
              { name: 'League Table', path: '/table' },
              { name: 'Spain Park', path: '/stadium' },
            ].map((item) => (
              <li key={item.name} className="h-full group relative">
                <Link
                  to={item.path}
                  className="flex items-center h-full px-5 text-white font-montserrat font-bold text-sm tracking-widest hover:text-secondary transition-colors"
                >
                  {item.name}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#33C3F0] scale-x-0 transition-transform duration-200 origin-bottom-left group-hover:scale-x-100"></div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="hidden lg:flex items-center ml-auto">
          <Link
            to="/tickets"
            className="flex items-center justify-center h-10 bg-accent hover:brightness-105 text-primary font-montserrat font-bold py-2 px-5 rounded transition-colors whitespace-nowrap shadow-md"
          >
            Buy Tickets
          </Link>
        </div>
        
        <div className="lg:hidden flex items-center ml-auto">
          <button 
            className="text-white hover:bg-white/20 transition-colors p-2 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-primary shadow-lg animate-slide-in-right">
          <div className="w-full px-8">
            <nav className="py-6 flex flex-col space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'News', path: '/news' },
                { name: 'Team & Management', path: '/team' },
                { name: 'Fixtures', path: '/fixtures' },
                { name: 'League Table', path: '/table' },
                { name: 'Spain Park', path: '/stadium' },
              ].map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className="font-montserrat font-bold text-base text-white hover:text-secondary px-2 py-2 flex items-center justify-between tracking-widest"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-white/20">
                <Link
                  to="/tickets"
                  className="flex items-center justify-center h-10 bg-accent hover:brightness-105 text-primary font-montserrat font-bold py-2 px-4 rounded transition-colors w-full shadow-md"
                >
                  Buy Tickets
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
