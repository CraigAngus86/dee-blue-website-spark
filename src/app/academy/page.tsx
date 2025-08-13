// app/academy/page.tsx
"use client";

import Link from "next/link";

export default function AcademyPage() {
  return (
    <main>
      {/* Page Header (white) */}
      <section className="section section--white">
        <div className="max-w-6xl mx-auto px-4">
          <header className="section-head">
            <h1 className="font-heading text-h1" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Academy
            </h1>
            <p className="tagline" style={{ color: "rgb(var(--dark-gray))" }}>
              Be part of the journey — developing young talent in Baynounah
            </p>
          </header>

          {/* Intro Card */}
          <div
            className="rounded-2xl p-6 md:p-8 shadow-sm border"
            style={{
              background: "rgb(var(--white))",
              borderColor: "rgb(var(--medium-gray))",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p className="mb-4" style={{ color: "rgb(var(--brand-black))" }}>
              We’re rebuilding the full Academy experience. This page is a temporary home while we finalize
              programs, schedules, and registration.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 transition"
                style={{
                  background: "rgb(var(--brand-gold))",
                  color: "rgb(var(--brand-black))",
                  border: "2px solid rgb(var(--brand-gold))",
                }}
              >
                Register Interest
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 border transition"
                style={{
                  background: "rgb(var(--white))",
                  color: "rgb(var(--brand-black))",
                  borderColor: "rgb(var(--medium-gray))",
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats / Promise (warm grey) */}
      <section className="section section--warm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Developing Our Future
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              Community-first football, delivered with care and consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stat Card */}
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="font-heading text-5xl md:text-6xl mb-2"
                style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}
              >
                300+
              </div>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Young players in the pathway
              </p>
            </div>

            {/* Pillars */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 className="font-heading text-h4 mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                Player Pathway
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Clear stages from fundamentals to competition, with age‑appropriate coaching.
              </p>
            </div>

            <div
              className="rounded-xl p-6"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3 className="font-heading text-h4 mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                Values & Community
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Emirati identity, Islamic values, and community development at the core.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer CTA (white) */}
      <section className="section section--white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Questions?
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              Email us and we’ll get back to you with program details and start dates.
            </p>
          </div>

          <a
            href="mailto:info@baynounahsc.ae?subject=Academy%20Registration%20Enquiry"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 transition"
            style={{
              background: "rgb(var(--brand-gold))",
              color: "rgb(var(--brand-black))",
              border: "2px solid rgb(var(--brand-gold))",
            }}
          >
            info@baynounahsc.ae
          </a>
        </div>
      </section>
    </main>
  );
}
