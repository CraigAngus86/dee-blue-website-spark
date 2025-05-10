
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Club Information */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Banks o&apos; Dee FC</h3>
            <p className="mb-2">Spain Park, Aberdeen</p>
            <p className="mb-2">Established 1902</p>
            <p className="mb-4">Highland Football League</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-accent transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="hover:text-accent transition-colors">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-accent transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Club Links */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Club</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/spain-park" className="hover:text-accent transition-colors">
                  Spain Park
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-accent transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-accent transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/banksodeejfc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/banksodeefootballclub/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/banksodeefc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Banks o&apos; Dee Football Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
