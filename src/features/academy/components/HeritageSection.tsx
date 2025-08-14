import React from 'react';

export function HeritageSection() {
  return (
    <section className="section section--white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Our Heritage
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            Rooted in Sheikh Zayed's beloved Baynounah region
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-heading text-h3" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                "Més que un club"
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgb(var(--brand-black))" }}>
                More than a club — we represent the heritage and values of the UAE. Named after Sheikh Zayed's 
                beloved Baynounah region, our club embodies the vision of community development, excellence, 
                and authentic Emirati identity.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-body text-h4 font-semibold" style={{ color: "rgb(var(--brand-black))" }}>
                Our Foundation
              </h4>
              <ul className="space-y-2 text-base" style={{ color: "rgb(var(--dark-gray))" }}>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Islamic values and Emirati identity at our core
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Community development through football excellence
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Heritage connection to Sheikh Zayed's legacy
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2">•</span>
                  Professional pathway for UAE football development
                </li>
              </ul>
            </div>

            <div 
              className="rounded-xl p-6 border-l-4"
              style={{
                background: "rgb(var(--warm-gray))",
                borderLeftColor: "rgb(var(--heritage-red))",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <h4 className="font-heading text-h4 mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                2020 Hamdan bin Zayed Champions
              </h4>
              <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                A historic achievement representing our commitment to excellence and royal heritage connection.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div 
              className="rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <img
                src="https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fill,g_center,ar_4:3,q_auto,f_auto/v1747398181/heritage-image_placeholder.jpg"
                alt="Baynounah Heritage"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center p-4">
              <p 
                className="font-body text-lg italic mb-2"
                style={{ color: "rgb(var(--brand-gold))" }}
              >
                "نادي بينونة الرياضي"
              </p>
              <p className="font-body text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                Building champions, developing character, serving community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
