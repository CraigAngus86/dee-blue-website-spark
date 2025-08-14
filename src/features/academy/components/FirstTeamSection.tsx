import React from 'react';

export function FirstTeamSection() {
  return (
    <section className="section section--warm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            First Team
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            Professional football excellence since 2019
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            className="rounded-xl p-6"
            style={{
              background: "rgb(var(--white))",
              border: "1px solid rgb(var(--medium-gray))",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <h3 className="font-heading text-h4 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Club Facts
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Founded:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">2019</span></div>
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>League:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">UAE Second Division</span></div>
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Home Stadium:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">ERTH Stadium</span></div>
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Capacity:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">3,000</span></div>
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Squad Size:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">30 Players</span></div>
              <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Colors:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">Black & Gold</span></div>
            </div>
          </div>

          <div 
            className="rounded-xl p-6"
            style={{
              background: "rgb(var(--white))",
              border: "2px solid rgb(var(--brand-gold))",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <h3 className="font-heading text-h4 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Recent Success
            </h3>
            <div className="text-center">
              <div className="font-heading text-4xl mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>🏆</div>
              <h4 className="font-heading text-lg mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>Cup Winners</h4>
              <p className="text-sm mb-3" style={{ color: "rgb(var(--dark-gray))" }}>Last Season Champions</p>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgb(var(--brand-gold) / 0.15)", color: "rgb(var(--brand-black))" }}>
                AED 100,000 Prize
              </div>
            </div>
          </div>

          <div 
            className="rounded-xl p-6"
            style={{
              background: "rgb(var(--white))",
              border: "1px solid rgb(var(--medium-gray))",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <h3 className="font-heading text-h4 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
              Current Season
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="font-heading text-3xl mb-1" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>11th</div>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>of 15 teams</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>League:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">UAE Second Division</span></div>
                <div className="flex justify-between"><span style={{ color: "rgb(var(--dark-gray))" }}>Promotion:</span><span style={{ color: "rgb(var(--brand-black))" }} className="font-medium">Top 2 to First Division</span></div>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: "rgb(var(--medium-gray))" }}>
                <p className="text-xs text-center" style={{ color: "rgb(var(--dark-gray))" }}>
                  Building for promotion next season
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div 
            className="rounded-2xl p-8 border"
            style={{
              background: "rgb(var(--white))",
              borderColor: "rgb(var(--medium-gray))",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-h3 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  ERTH Stadium
                </h3>
                <p className="text-base mb-4 leading-relaxed" style={{ color: "rgb(var(--brand-black))" }}>
                  Our home ground features modern facilities with a 3,000-seat capacity, providing an 
                  excellent matchday experience for players and supporters alike.
                </p>
                <ul className="space-y-2 text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                  <li className="flex items-center"><span className="text-brand-gold mr-2">✓</span>Professional playing surface</li>
                  <li className="flex items-center"><span className="text-brand-gold mr-2">✓</span>Modern changing facilities</li>
                  <li className="flex items-center"><span className="text-brand-gold mr-2">✓</span>Hospitality areas available</li>
                  <li className="flex items-center"><span className="text-brand-gold mr-2">✓</span>Accessible for all supporters</li>
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
                <img
                  src="https://res.cloudinary.com/dlkpaw2a0/image/upload/c_fill,g_center,ar_16:9,q_auto,f_auto/v1747398181/erth-stadium_placeholder.jpg"
                  alt="ERTH Stadium"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
