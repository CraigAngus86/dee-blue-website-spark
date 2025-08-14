import React from 'react';

export function AcademyPathwaySection() {
  const ageGroups = [
    { age: "4-6", title: "Foundation", description: "Basic skills, fun, and football introduction" },
    { age: "7-9", title: "Development", description: "Technical skills and game understanding" },
    { age: "10-12", title: "Skills", description: "Advanced techniques and tactical awareness" },
    { age: "13-15", title: "Youth", description: "Competitive football and physical development" },
    { age: "16-18", title: "Elite", description: "Professional pathway preparation" }
  ];

  return (
    <section className="section section--white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Academy Pathway
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            Developing the next generation of UAE football talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl p-6 text-center" style={{ background: "rgb(var(--warm-gray))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}>
            <div className="font-heading text-5xl md:text-6xl mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>300+</div>
            <p className="text-sm font-medium" style={{ color: "rgb(var(--brand-black))" }}>Young Players</p>
            <p className="text-xs" style={{ color: "rgb(var(--dark-gray))" }}>Across all age groups</p>
          </div>
          <div className="rounded-xl p-6 text-center" style={{ background: "rgb(var(--warm-gray))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}>
            <div className="font-heading text-5xl md:text-6xl mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>2</div>
            <p className="text-sm font-medium" style={{ color: "rgb(var(--brand-black))" }}>Training Locations</p>
            <p className="text-xs" style={{ color: "rgb(var(--dark-gray))" }}>Sultan bin Zayed & Al Maryah Island</p>
          </div>
          <div className="rounded-xl p-6 text-center" style={{ background: "rgb(var(--warm-gray))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}>
            <div className="font-heading text-5xl md:text-6xl mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>5</div>
            <p className="text-sm font-medium" style={{ color: "rgb(var(--brand-black))" }}>Age Categories</p>
            <p className="text-xs" style={{ color: "rgb(var(--dark-gray))" }}>From 4 years to professional</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-h3 mb-6" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Development Pathway
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {ageGroups.map((group, index) => (
              <div 
                key={index}
                className="rounded-xl p-4 text-center"
                style={{ background: "rgb(var(--white))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}
              >
                <div className="font-heading text-2xl mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>
                  {group.age}
                </div>
                <h4 className="font-heading text-base mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  {group.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgb(var(--dark-gray))" }}>
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="rounded-2xl p-8 border-2" style={{ background: "rgb(var(--warm-gray))", borderColor: "rgb(var(--brand-gold))", boxShadow: "var(--shadow-lg)" }}>
            <div className="text-center mb-6">
              <h3 className="font-heading text-h3 mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                Professional Pathway
              </h3>
              <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
                Clear progression from academy to first team
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgb(var(--brand-gold))" }}>
                  <span className="text-2xl">⚽</span>
                </div>
                <h4 className="font-heading text-base mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  Academy Excellence
                </h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                  Master fundamental skills and game understanding
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgb(var(--brand-gold))" }}>
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-heading text-base mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  Youth Development
                </h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                  Competitive experience and tactical development
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgb(var(--brand-gold))" }}>
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="font-heading text-base mb-2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                  First Team
                </h4>
                <p className="text-sm" style={{ color: "rgb(var(--dark-gray))" }}>
                  Professional football career launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
