"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { buildSponsorLogoUrl } from "@/features/sponsors";

interface HeaderProps { sponsors: any[] }

const Header = ({ sponsors = [] }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "/";

  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  // Body scroll lock
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Focus trap
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const container = menuRef.current;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const previouslyFocused = document.activeElement as HTMLElement | null;

    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };

    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMenuOpen(false); };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onEscape);
      (triggerRef.current || previouslyFocused)?.focus?.();
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((m) => !m);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const navigation = [
    { name: "News", href: "/news" },
    { name: "Team & Management", href: "/team" },
    { name: "Match Centre", href: "/matches" },
    { name: "Club & Academy", href: "/academy" },
    { name: "Partnerships", href: "/commercial" },
  ];

  const sortedSponsors = useMemo(() => {
    return [...sponsors].sort((a, b) => {
      if (a?.primaryTier === "principal" && b?.primaryTier === "main") return -1;
      if (a?.primaryTier === "main" && b?.primaryTier === "principal") return 1;
      return (a?.name || "").localeCompare(b?.name || "");
    });
  }, [sponsors]);

  const principalSponsor = sortedSponsors.find((s) => s?.primaryTier === "principal");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
      role="banner"
    >
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] font-body px-3 py-2 rounded-md shadow md:text-sm"
      >
        Skip to content
      </a>

      <div className="relative">
        {/* === ABSOLUTE LEFT RAIL (spans both bars) === */}
        <div
          className="absolute inset-y-0 left-4 z-20 w-20 md:w-56 lg:w-72 xl:w-80 flex items-center"
          aria-label="Club identity"
        >
          <Link
            href="/"
            className="group flex items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]"
          >
            <Image
              src={buildSponsorLogoUrl("Baynounah_SC_Logo_idok3c", "mainLogo")}
              alt="Baynounah Sports Club"
              width={64}
              height={64}
              sizes="64px"
              className="h-12 w-12 md:h-14 md:w-14 object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            {/* Hide name on mobile; show short on md; full from lg */}
            <span className="ml-3 hidden md:inline lg:hidden text-2xl leading-none font-heading text-[rgb(var(--brand-gold))]">
              Baynounah SC
            </span>
            <span className="ml-3 hidden lg:inline text-3xl leading-none font-heading text-[rgb(var(--brand-gold))]">
              Baynounah Sports Club
            </span>
          </Link>
        </div>

        {/* === SPONSOR BAR === */}
        <div className="bg-gradient-to-r from-[rgb(var(--brand-black))] from-55% via-[rgb(var(--brand-gold))] via-70% to-[rgb(var(--brand-gold))] h-[30px]">
          <div className="container mx-auto px-4 lg:px-8 xl:px-16 h-full">
            {/* Reserve space for left rail so logos never collide */}
            <div className="flex items-center justify-end h-full pl-20 md:pl-56 lg:pl-72 xl:pl-80">
              <div className="hidden md:flex items-center gap-2">
                {sortedSponsors.map((s) => (
                  <Link
                    key={s?._id || s?.id || s?.name}
                    href={s?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] rounded-sm transition-transform duration-200 hover:opacity-90 hover:scale-105"
                    title={s?.name}
                    prefetch={false}
                  >
                    <Image
                      src={buildSponsorLogoUrl(s?.logo?.public_id, "header")}
                      alt={s?.name || "Sponsor"}
                      width={120}
                      height={28}
                      sizes="(max-width: 1024px) 96px, 120px"
                      className="object-contain h-5 w-auto"
                    />
                  </Link>
                ))}
              </div>

              <div className="flex md:hidden items-center">
                {principalSponsor && (
                  <Link
                    href={principalSponsor?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] rounded-sm transition-transform duration-200 hover:opacity-90 hover:scale-105"
                    title={principalSponsor?.name}
                    prefetch={false}
                  >
                    <Image
                      src={buildSponsorLogoUrl(principalSponsor?.logo?.public_id, "header")}
                      alt={principalSponsor?.name || "Principal Sponsor"}
                      width={100}
                      height={28}
                      sizes="100px"
                      className="object-contain h-5 w-auto"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === MAIN HEADER BAR === */}
        <div
          className={`bg-[rgb(var(--brand-black))] text-white transition-[padding,min-height] duration-300 ${
            isScrolled ? "py-0" : "py-1"
          }`}
        >
          <div className="container mx-auto px-4 lg:px-8 xl:px-16">
            {/* relative so the mobile burger can be absolutely pinned to the right */}
            <div className="relative flex items-center justify-between min-h-[44px] pl-20 md:pl-56 lg:pl-72 xl:pl-80">
              {/* Nav */}
              <nav
                role="navigation"
                aria-label="Main Navigation"
                className="hidden md:flex items-center gap-3 lg:gap-6"
              >
                {[
                  { name: "News", href: "/news" },
                  { name: "Team & Management", href: "/team" },
                  { name: "Match Centre", href: "/matches" },
                  { name: "Club & Academy", href: "/academy" },
                  { name: "Partnerships", href: "/commercial" },
                ].map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-body text-sm lg:text-base whitespace-nowrap px-1.5 py-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-all duration-200 ${
                        active
                          ? "text-white font-semibold border-b-2 border-[rgb(var(--brand-gold))]"
                          : "text-[rgb(var(--brand-gold))] hover:text-white hover:scale-105 font-medium"
                      }`}
                      prefetch
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop CTA (right edge aligns with sponsor logos via matched container padding) */}
              <div className="hidden lg:flex">
                <Link
                  href="#"
                  className="font-body text-sm whitespace-nowrap rounded-md flex items-center px-4 py-1.5 shadow transition-all duration-200
                             bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] border-2 border-[rgb(var(--brand-gold))]
                             hover:bg-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] hover:border-[rgb(var(--brand-black))]"
                >
                  <span>Buy Tickets</span>
                  <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile burger pinned to screen right */}
              <button
                ref={triggerRef}
                onClick={toggleMenu}
                className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] z-30"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (focus-trapped) */}
        {isMenuOpen && (
          <div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="absolute left-0 right-0 top-full bg-[rgb(var(--brand-black))] z-40 md:hidden shadow-md"
          >
            <nav className="flex flex-col p-4" role="navigation" aria-label="Mobile Navigation Links">
              {[
                { name: "News", href: "/news" },
                { name: "Team & Management", href: "/team" },
                { name: "Match Centre", href: "/matches" },
                { name: "Club & Academy", href: "/academy" },
                { name: "Partnerships", href: "/commercial" },
              ].map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-body text-lg py-3 border-b border-[#333333] rounded-sm px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] transition-colors ${
                      active
                        ? "font-semibold text-white border-b-2 border-[rgb(var(--brand-gold))]"
                        : "text-[rgb(var(--brand-gold))] hover:text-white"
                    }`}
                    prefetch
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                href="#"
                className="mt-4 font-body text-base rounded-md flex items-center justify-center px-4 py-3 shadow transition-all
                           bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))] border-2 border-[rgb(var(--brand-gold))]
                           hover:bg-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] hover:border-[rgb(var(--brand-black))]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Buy Tickets</span>
                <ArrowRight size={18} className="ml-2" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
