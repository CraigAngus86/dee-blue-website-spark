// src/app/commercial/page.tsx
"use client";

import Link from "next/link";

export default function CommercialHoldingPage() {
  return (
    <main>
      {/* A — Page Header (white) */}
      <section className="section section--white">
        <div className="max-w-6xl mx-auto px-4">
          <header className="section-head">
            <h1
              className="font-heading text-4xl md:text-h1"
              style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
            >
              Partnerships
            </h1>
            <p className="tagline" style={{ color: "rgb(var(--dark-gray))" }}>
              Be Part of the Journey — a first‑of‑its‑kind commercial model for UAE football.
            </p>
          </header>

          <div
            className="rounded-2xl p-6 md:p-8 shadow-sm border"
            style={{
              background: "rgb(var(--white))",
              borderColor: "rgb(var(--medium-gray))",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p className="mb-4" style={{ color: "rgb(var(--brand-black))" }}>
              We’re preparing a new public overview of our partner program. This holding page introduces the
              approach while we finalize the full experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:craig.angus@baynounah.ae?subject=Partnership%20Enquiry"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 w-full sm:w-auto transition"
                style={{
                  background: "rgb(var(--brand-gold))",
                  color: "rgb(var(--brand-black))",
                  border: "2px solid rgb(var(--brand-gold))",
                }}
              >
                Talk to Us
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 w-full sm:w-auto border transition"
                style={{
                  background: "rgb(var(--white))",
                  color: "rgb(var(--brand-black))",
                  borderColor: "rgb(var(--medium-gray))",
                }}
              >
                See Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B — Why Partner (warm grey) */}
      <section className="section section--warm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2
              className="font-heading text-3xl md:text-h2"
              style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
            >
              Why Partner with Baynounah
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              Sporting credibility, digital-first thinking, and authentic community roots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3
                className="font-heading text-h4 mb-2"
                style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
              >
                Sporting Platform
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Abu Dhabi capital club; FIFA‑certified setup; ERTH Stadium home.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3
                className="font-heading text-h4 mb-2"
                style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
              >
                Digital First
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Integrated fan model, co‑brand content, and measurable exposure.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgb(var(--white))",
                border: "1px solid rgb(var(--medium-gray))",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3
                className="font-heading text-h4 mb-2"
                style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
              >
                Community & Heritage
              </h3>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                300+ academy families; authentic Emirati identity and values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C — Partnership Areas (white) */}
      <section className="section section--white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2
              className="font-heading text-3xl md:text-h2"
              style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
            >
              Ways to Work Together
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              Public‑safe view of our partner tiers — we tailor specifics to your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              ["Principal Partner", "Front‑of‑mind visibility across kits and content."],
              ["Main Partner", "High‑impact placements with co‑created storytelling."],
              ["Official Partner", "Category presence, activations, and community programs."],
              ["Event/Activation", "Matchday, academy, and community experiences."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-xl p-6"
                style={{
                  background: "rgb(var(--white))",
                  border: "1px solid rgb(var(--medium-gray))",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3
                  className="font-heading text-h4 mb-2"
                  style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D — Innovation in Action (warm grey) */}
      <section className="section section--warm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2
              className="font-heading text-3xl md:text-h2"
              style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
            >
              Innovation You Can See
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              Practical ideas that make partnerships useful and measurable.
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: "rgb(var(--brand-black))" }}>
            <li>Interactive Match Centre with sponsor utilities and brand moments.</li>
            <li>Co‑created content — academy to first‑team micro‑docs and features.</li>
            <li>Data‑informed campaigns with transparent reporting.</li>
          </ul>
        </div>
      </section>

      {/* E — Contact (white) */}
      <section className="section section--white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-head">
            <h2
              className="font-heading text-3xl md:text-h2"
              style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}
            >
              Let’s Build This Together
            </h2>
            <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
              We’ll learn your objectives, shape the right path, and move at your pace.
            </p>
          </div>

          <a
            href="mailto:craig.angus@baynounah.ae?subject=Partnership%20Enquiry"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 w-full sm:w-auto transition break-words"
            style={{
              background: "rgb(var(--brand-gold))",
              color: "rgb(var(--brand-black))",
              border: "2px solid rgb(var(--brand-gold))",
            }}
          >
            Get in touch!
          </a>
        </div>
      </section>
    </main>
  );
}
