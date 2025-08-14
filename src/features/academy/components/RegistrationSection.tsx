import React from 'react';

export function RegistrationSection() {
  return (
    <section className="section section--warm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Join Our Journey
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            Be part of the Baynounah family and help shape the future of UAE football
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8" style={{ background: "rgb(var(--white))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-md)" }}>
            <h3 className="font-heading text-h3 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Academy Registration
            </h3>
            <p className="text-base mb-6 leading-relaxed" style={{ color: "rgb(var(--dark-gray))" }}>
              Join our academy program and start your child's football journey with professional coaching, 
              Islamic values, and community support.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm"><span className="text-brand-gold mr-3">✓</span><span style={{ color: "rgb(var(--brand-black))" }}>Ages 4-18 welcome</span></div>
              <div className="flex items-center text-sm"><span className="text-brand-gold mr-3">✓</span><span style={{ color: "rgb(var(--brand-black))" }}>Professional coaching staff</span></div>
              <div className="flex items-center text-sm"><span className="text-brand-gold mr-3">✓</span><span style={{ color: "rgb(var(--brand-black))" }}>Multiple training locations</span></div>
              <div className="flex items-center text-sm"><span className="text-brand-gold mr-3">✓</span><span style={{ color: "rgb(var(--brand-black))" }}>Family-friendly environment</span></div>
            </div>

            <a
              href="mailto:academy@baynounahsc.ae?subject=Academy%20Registration%20Enquiry"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 w-full transition font-medium"
              style={{ background: "rgb(var(--brand-gold))", color: "rgb(var(--brand-black))", border: "2px solid rgb(var(--brand-gold))" }}
            >
              Register for Academy
            </a>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "rgb(var(--white))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-md)" }}>
            <h3 className="font-heading text-h3 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Get in Touch
            </h3>
            <p className="text-base mb-6 leading-relaxed" style={{ color: "rgb(var(--dark-gray))" }}>
              Have questions about our club, academy programs, or want to get involved? 
              We'd love to hear from you.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-body text-sm font-semibold mb-1" style={{ color: "rgb(var(--brand-black))" }}>Academy Manager</h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>academy@baynounahsc.ae</p>
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold mb-1" style={{ color: "rgb(var(--brand-black))" }}>General Enquiries</h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>info@baynounahsc.ae</p>
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold mb-1" style={{ color: "rgb(var(--brand-black))" }}>Training Locations</h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>Sultan bin Zayed Stadium & Al Maryah Island</p>
              </div>
            </div>

            <a
              href="mailto:info@baynounahsc.ae?subject=General%20Enquiry"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 w-full transition font-medium"
              style={{ background: "rgb(var(--white))", color: "rgb(var(--brand-black))", border: "2px solid rgb(var(--medium-gray))" }}
            >
              Send Enquiry
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="rounded-2xl p-8" style={{ background: "rgb(var(--brand-black))", color: "rgb(var(--white))", boxShadow: "var(--shadow-lg)" }}>
            <h3 className="font-heading text-h3 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>
              Ready to Begin?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join the Baynounah family and be part of something special. Whether you're 4 or 18, 
              your football journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:academy@baynounahsc.ae?subject=Academy%20Trial%20Request"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition font-medium"
                style={{ background: "rgb(var(--brand-gold))", color: "rgb(var(--brand-black))", border: "2px solid rgb(var(--brand-gold))" }}
              >
                Book a Trial
              </a>
              <a
                href="/matches"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition font-medium"
                style={{ background: "transparent", color: "rgb(var(--white))", border: "2px solid rgb(var(--medium-gray))" }}
              >
                Watch Us Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
