
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Information */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/assets/images/logos/BOD_Logo_White_square.png"
                alt="Banks o' Dee FC"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <h3 className="text-xl font-montserrat font-bold ml-2">Banks o&apos; Dee FC</h3>
            </div>
            <p className="mb-2">Highland Football League Club</p>
            <p className="mb-2">Established 1902</p>
            <p className="mb-4">Spain Park, Aberdeen</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="hover:text-accent transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-accent transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="hover:text-accent transition-colors">
                  Fixtures & Results
                </Link>
              </li>
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
                <Link href="/tickets" className="hover:text-accent transition-colors">
                  Tickets
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">Contact & Follow</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={20} className="mr-2 text-accent" />
                <span>Spain Park, Aberdeen AB24 5RX</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-accent" />
                <a href="mailto:info@banksodeefc.co.uk" className="hover:text-accent transition-colors">
                  info@banksodeefc.co.uk
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-accent" />
                <a href="tel:+441224251395" className="hover:text-accent transition-colors">
                  01224 251395
                </a>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/banksodeejfc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/banksodeefootballclub/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/banksodeefc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Border */}
        <div className="my-6 h-px bg-gradient-to-r from-primary-light via-accent to-primary-light opacity-30"></div>
        
        {/* Copyright */}
        <div className="text-center text-sm">
          <p>&copy; {currentYear} Banks o&apos; Dee Football Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
