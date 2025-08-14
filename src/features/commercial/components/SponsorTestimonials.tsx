"use client";
import React from 'react';

interface SponsorTestimonialsProps {
  onPartnershipClick: () => void;
}

export function SponsorTestimonials({ onPartnershipClick }: SponsorTestimonialsProps) {
  return (
    <section className="section section--warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-h2 tracking-[0.02em] text-brand-black mb-6">
            Build The Future With Us
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="font-body text-lg text-text-muted leading-relaxed mb-4">
              We're looking for visionary partners who want to be part of building something special 
              from the ground up. While other clubs offer established partnerships, we offer something 
              more valuable—the opportunity to grow together.
            </p>
            <p className="font-body text-text-muted">
              Our partner showcase is coming soon, but the first chapter of this story 
              could include your brand. Be Part of the Journey from the very beginning.
            </p>
          </div>

          {/* Partnership Journey Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg text-brand-black">1</span>
              </div>
              <h3 className="font-body font-semibold text-brand-black mb-2">Join Early</h3>
              <p className="font-body text-sm text-text-muted">
                Partner with us now while we're building our foundation
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg text-brand-black">2</span>
              </div>
              <h3 className="font-body font-semibold text-brand-black mb-2">Grow Together</h3>
              <p className="font-body text-sm text-text-muted">
                Shape our success while building your brand presence
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg text-brand-black">3</span>
              </div>
              <h3 className="font-body font-semibold text-brand-black mb-2">Lead The Way</h3>
              <p className="font-body text-sm text-text-muted">
                Become a founding partner in our success story
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-brand-gold/10 to-accent-light/10 rounded-lg p-8 inline-block">
            <h3 className="font-heading text-xl tracking-[0.02em] text-brand-black mb-4">
              Ready to Be Part of the Journey?
            </h3>
            <p className="font-body text-text-muted mb-6 max-w-lg">
              The best partnerships are built from the beginning, not added later. 
              Let's discuss how we can grow together.
            </p>
            <button
              onClick={onPartnershipClick}
              className="bg-brand-gold text-brand-black hover:bg-accent-dark px-8 py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Our Partnership Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}