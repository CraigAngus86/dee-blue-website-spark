"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

interface SponsorTestimonialsProps {
  onPartnershipClick: () => void;
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

            {/* Next step */}
            <div className="mt-8 text-center">
              <span className="inline-block uppercase tracking-wide text-xs md:text-sm font-semibold text-brand-gold/90">
                Next step
              </span>
            </div>

            {/* Primary CTA */}
            <div className="mt-3 flex items-center justify-center">
              <button
                onClick={onPartnershipClick}
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 bg-brand-gold text-brand-black font-body font-semibold text-base md:text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                aria-label="Book a 20-minute intro"
              >
                Book a 20-minute Call
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Contacts */}
            <p className="mt-4 font-body text-sm md:text-base text-text-muted text-center">
              Or contact us now:{" "}
              <a
                href="mailto:craig.angus@baynounahsc.ae"
                className="text-brand-black underline decoration-brand-gold/60 underline-offset-4 hover:text-brand-gold transition-colors"
              >
                craig.angus@baynounahsc.ae
              </a>{" "}
              <span className="mx-2 text-brand-gold/60">·</span>
              <a
                href="https://wa.me/971566975370"
                className="text-brand-black underline decoration-brand-gold/60 underline-offset-4 hover:text-brand-gold transition-colors"
                aria-label="WhatsApp +971 56 697 5370"
              >
                WhatsApp +971 56 697 5370
              </a>
            </p>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </div>
    </section>
  );
}
