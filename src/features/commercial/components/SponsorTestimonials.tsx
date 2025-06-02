"use client";
import React from 'react';

interface SponsorTestimonialsProps {
  onPartnershipClick: () => void;
}

export function SponsorTestimonials({ onPartnershipClick }: SponsorTestimonialsProps) {
  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6">
            Join Our Partners
          </h2>
          <p className="text-lg text-[#4b5563]">
            Partner showcase coming soon
          </p>
          <button 
            onClick={onPartnershipClick}
            className="bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] px-8 py-3 rounded-lg font-bold mt-6"
          >
            Discuss Partnership Options
          </button>
        </div>
      </div>
    </section>
  );
}
