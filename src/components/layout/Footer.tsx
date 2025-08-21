import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { buildSponsorLogoUrl } from "@/features/sponsors";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(var(--brand-black))] text-white pt-2" role="contentinfo">
      <div className="container mx-auto px-4">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          {/* Left: identity + social */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            {/* Mobile logo */}
            <div className="flex justify-center md:hidden">
              <Image
                src={buildSponsorLogoUrl("Baynounah_SC_Logo_Gold_he8ayr", "mainLogo")}
                alt="Baynounah Sports Club"
                width={40}
                height={40}
                sizes="40px"
                className="h-10 w-10 object-contain"
              />
            </div>

            {/* Desktop: logo + name */}
            <div className="hidden md:flex items-center">
              <Image
                src={buildSponsorLogoUrl("Baynounah_SC_Logo_Gold_he8ayr", "mainLogo")}
                alt="Baynounah Sports Club"
                width={40}
                height={40}
                sizes="40px"
                className="h-10 w-10 object-contain"
              />
              <div className="ml-2">
                <h3 className="font-heading font-normal tracking-[0.02em] text-xl md:text-2xl leading-none m-0">
                  Baynounah Sports Club
                </h3>
                <p className="text-[10px] text-[rgb(var(--brand-gold))] m-0 font-body">
                  Established 2019
                </p>
              </div>
            </div>

            {/* Tagline + social */}
            <div>
              <p className="font-body text-xs text-[rgb(var(--brand-gold))] mb-1">
                Be Part of the Journey
              </p>

              <div className="flex space-x-3 justify-center md:justify-start">
                {/* X (Twitter) */}
                <a
                  href="https://x.com/baynounahsc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-transform duration-200 hover:opacity-90 hover:scale-110"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/BaynounahSC/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-transform duration-200 hover:opacity-90 hover:scale-110"
                >
                  <Facebook size={16} aria-hidden="true" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/baynounahsc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-transform duration-200 hover:opacity-90 hover:scale-110"
                >
                  <Instagram size={16} aria-hidden="true" />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UCXiba2uCfhFI_PYJiiExavA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-transform duration-200 hover:opacity-90 hover:scale-110"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: contact */}
          <div className="flex flex-col space-y-2 text-center md:text-right md:ml-auto">
            <h3 className="font-heading font-normal tracking-[0.02em] text-lg md:text-xl mb-1">
              Get in Touch
            </h3>

            <address className="not-italic space-y-1.5">
              {/* Address → Google Maps (Arabic removed) */}
              <div className="flex items-start text-xs justify-center md:justify-end">
                <MapPin
                  size={14}
                  className="mr-2 text-[rgb(var(--brand-gold))] flex-shrink-0 mt-0.5 md:order-2 md:ml-2 md:mr-0"
                  aria-hidden="true"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Baynounah+Sports+Club+Al+Manhal+Abu+Dhabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] font-body rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]"
                >
                  Al Manhal – W15 02 – Abu Dhabi
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center text-xs justify-center md:justify-end">
                <Phone
                  size={14}
                  className="mr-2 text-[rgb(var(--brand-gold))] flex-shrink-0 md:order-2 md:ml-2 md:mr-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+971523420010"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] font-body rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]"
                >
                  +971 523 420 010
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center text-xs justify-center md:justify-end">
                <span
                  className="mr-2 text-[rgb(var(--brand-gold))] flex-shrink-0 md:order-2 md:ml-2 md:mr-0"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2a10 10 0 0 0-8.68 14.96L2 22l5.2-1.36A10 10 0 1 0 12.04 2Zm5.86 14.65c-.25.7-1.48 1.33-2.05 1.36-.53.02-1.2.03-1.94-.12-.44-.09-1-.32-1.73-.62-3.04-1.32-5.02-4.43-5.17-4.64-.15-.21-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.55.28-.3.61-.38.81-.38.2 0 .4 0 .58.01.18.01.44-.07.68.52.25.6.86 2.07.94 2.22.08.15.13.33.02.53-.11.2-.17.32-.33.49-.16.17-.35.39-.5.52-.17.16-.35.33-.15.66.2.33.9 1.49 1.93 2.42 1.33 1.19 2.46 1.56 2.79 1.72.33.16.53.13.73-.08.2-.2.84-.98 1.06-1.32.22-.34.45-.28.73-.17.28.1 1.79.84 2.1.99.31.15.52.22.59.34.07.12.07.73-.18 1.43Z" />
                  </svg>
                </span>
                <a
                  href="https://wa.me/971523420010"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] font-body rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]"
                >
                  WhatsApp
                </a>
              </div>

              {/* Email (updated) */}
              <div className="flex items-center text-xs justify-center md:justify-end">
                <Mail
                  size={14}
                  className="mr-2 text-[rgb(var(--brand-gold))] flex-shrink-0 md:order-2 md:ml-2 md:mr-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:website@baynounahsc.ae"
                  className="text-white/80 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] font-body rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]"
                >
                  website@baynounahsc.ae
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Legal */}
        <div className="border-top border-t border-[rgb(var(--neutral-silver))]/20 pt-1 pb-1">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center gap-1.5">
            <p className="m-0 font-body text-[10px] text-white/60">
              &copy; {currentYear} Baynounah Sports Club. All rights reserved.
            </p>

            <nav aria-label="Footer">
              <ul className="flex gap-2">
                <li>
                  <Link
                    href="/privacy"
                    className="font-body text-[11px] text-white/70 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-body text-[11px] text-white/70 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="font-body text-[11px] text-white/70 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="font-body text-[11px] text-white/70 hover:text-[rgb(var(--brand-gold))] focus-visible:text-[rgb(var(--brand-gold))] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
