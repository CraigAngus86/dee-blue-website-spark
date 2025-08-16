"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageCircle } from "lucide-react";

interface SponsorTestimonialsProps {
  onPartnershipClick?: () => void; // now optional, not used
}

export function SponsorTestimonials({ onPartnershipClick }: SponsorTestimonialsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section--warm relative overflow-hidden">
      {/* Background: full-height stripe texture */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.03) 24px,
              rgba(0,0,0,0.03) 24px
            )`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        {/* Card */}
        <div
          className={`mx-auto max-w-3xl lg:max-w-4xl bg-white rounded-2xl shadow-xl border border-black/5 backdrop-blur-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="p-7 md:p-10">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black">
                Build the <span className="text-brand-gold">Future</span> with Us
              </h2>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-gold" />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <Sparkles className="w-5 h-5 text-brand-gold" />
              </div>
            </div>

            {/* Body copy */}
            <p className="font-body text-base md:text-lg text-text-muted text-center leading-relaxed max-w-3xl mx-auto">
              We co-build partnerships from day one — not bolt-ons later. If the tiers and digital workstreams fit, send your
              objectives and budget and we’ll come back with a concise, per-season SOW.
            </p>

            {/* CTAs (match Academy page pattern) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:craig.angus@baynounahsc.ae"
                className="group inline-flex items-center justify-center bg-brand-gold text-brand-black hover:bg-accent-dark px-6 md:px-8 py-3 md:py-4 rounded-lg font-body font-semibold text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Get in touch</span>
              </a>

              <a
                href="https://wa.me/971566975370"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-brand-black border-2 border-brand-gold hover:bg-brand-gold px-6 md:px-8 py-3 md:py-4 rounded-lg font-body font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </div>
    </section>
  );
}
