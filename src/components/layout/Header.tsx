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

  // Refs for focus management
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // Focus trap when mobile menu is open
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

    // Save previously focused element (likely the trigger)
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the menu
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) return;

      // Shift+Tab on first → wrap to last
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
      // Tab on last → wrap to first
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onEscape);
      // Restore focus to the trigger
      (triggerRef.current || previouslyFocused)?.focus?.();
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((m) => !m);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const navigation = [
    { name: "About the Club", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Team & Management", href: "/team" },
    { name: "Match Centre", href: "/matches" },
    { name: "The Academy", href: "/academy" },
    { name: "Commercial", href: "/commercial" },
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
      } bg-white/0`}
      role="banner"
    >
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] bg-[rgb(var(--brand-gold))] text-brand-black font-body px-3 py-2 rounded-md shadow md:text-sm"
      >
        Skip to content
      </a>

      <div className="relative">
        {/* Sponsor bar */}
        <div className="bg-gradient-to-r from-brand-black from-55% via-[rgb(var(--brand-gold))] via-70% to-[rgb(var(--brand-gold))] h-[30px]">
          <div className="container mx-auto px-2 h-full">
            <div className="flex items-center justify-end h-full">
              <div className="hidden md:flex items-center gap-2">
                {sortedSponsors.map((s) => (
                  <Link
                    key={s?._id || s?.id || s?.name}
                    href={s?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] rounded-sm motion-safe:transition-transform motion-safe:duration-200 hover:opacity-90 hover:scale-105"
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
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] rounded-sm motion-safe:transition-transform motion-safe:duration-200 hover:opacity-90 hover:scale-105"
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

        {/* Main header */}
        <div className={`bg-brand-black text-white ${isScrolled ? "h-[34px]" : "h-[38px]"} motion-safe:transition-[height] motion-safe:duration-300`}>
          <div className="container mx-auto h-full">
            <div className="hidden md:flex items-center h-full w-full">
              <div className="w-52 md:w-56 xl:w-64" aria-hidden="true" />

              <nav role="navigation" aria-label="Main Navigation" className="flex items-center justify-between flex-1 px-4 lg:px-8 xl:px-16">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-body font-semibold text-[rgb(var(--brand-gold))] text-[15px] lg:text-base whitespace-nowrap px-1 py-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] motion-safe:transition-all motion-safe:duration-200 ${
                        active ? "text-white font-bold border-b-2 border-[rgb(var(--brand-gold))]" : "hover:text-white hover:scale-105"
                      }`}
                      prefetch
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex">
                <Link
                  href="#"
                  className="bg-[rgb(var(--brand-gold))] text-brand-black hover:bg-brand-black hover:text-[rgb(var(--brand-gold))] hover:border-2 hover:border-[rgb(var(--brand-gold))] font-body font-bold py-1.5 px-4 rounded-md flex items-center text-sm whitespace-nowrap shadow hover:shadow-md motion-safe:transition-all motion-safe:duration-200"
                >
                  <span>Buy Tickets</span>
                  <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Mobile trigger */}
            <div className="flex md:hidden items-center justify-end h-full w-full px-4">
              <button
                ref={triggerRef}
                onClick={() => setIsMenuOpen((m) => !m)}
                className="text-white p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] z-30"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Logo block */}
        <div className="absolute top-0 left-4 z-20 h-full flex items-center">
          <Link href="/" className="group flex items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))]">
            <Image
              src={buildSponsorLogoUrl("Baynounah_SC_Logo_idok3c", "mainLogo")}
              alt="Baynounah Sports Club"
              width={64}
              height={64}
              sizes="64px"
              className="h-16 w-16 object-contain motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-105"
              priority
            />
            <span className="hidden sm:block ml-4 text-2xl md:text-3xl leading-none tracking-tight font-heading text-[rgb(var(--brand-gold))]">
              Baynounah Sports Club
            </span>
          </Link>
        </div>

        {/* Mobile menu (focus-trapped) */}
        {isMenuOpen && (
          <div
            id="mobile-nav"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="absolute left-0 right-0 top-full bg-brand-black z-40 md:hidden shadow-md"
          >
            <nav className="flex flex-col p-4" role="navigation" aria-label="Mobile Navigation Links">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-body text-[rgb(var(--brand-gold))] text-lg py-3 border-b border-[#333333] rounded-sm px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] motion-safe:transition-colors ${
                      active ? "font-bold text-white border-b-2 border-[rgb(var(--brand-gold))]" : "hover:text-white"
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
                className="bg-[rgb(var(--brand-gold))] text-brand-black hover:bg-brand-black hover:text-[rgb(var(--brand-gold))] hover:border-2 hover:border-[rgb(var(--brand-gold))] font-body font-bold py-3 px-4 mt-4 rounded-md flex items-center justify-center text-base shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] motion-safe:transition-all"
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
