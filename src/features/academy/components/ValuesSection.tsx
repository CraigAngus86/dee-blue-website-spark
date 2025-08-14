import React from 'react';

export function ValuesSection() {
  const values = [
    { icon: "🤝", title: "Islamic Values", description: "Respect, discipline, and moral character development through Islamic teachings and principles." },
    { icon: "🇦🇪", title: "Emirati Identity", description: "Celebrating UAE heritage, culture, and the vision of our founding fathers for youth development." },
    { icon: "👥", title: "Community First", description: "Building strong connections between families, players, and the broader Abu Dhabi community." },
    { icon: "⭐", title: "Excellence", description: "Striving for the highest standards in football, education, and personal development." },
    { icon: "🌱", title: "Player Development", description: "Holistic growth focusing on technical skills, physical fitness, and mental strength." },
    { icon: "🎯", title: "Fair Play", description: "Promoting sportsmanship, integrity, and respect for opponents, officials, and teammates." }
  ];

  return (
    <section className="section section--white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-head">
          <h2 className="font-heading text-h2" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
            Our Values
          </h2>
          <p className="text-base" style={{ color: "rgb(var(--dark-gray))" }}>
            The foundation of everything we do at Baynounah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="rounded-xl p-6 text-center hover:scale-[1.02] transition-transform duration-200"
              style={{ background: "rgb(var(--warm-gray))", border: "1px solid rgb(var(--medium-gray))", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-heading text-base mb-3" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-black))" }}>
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--dark-gray))" }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgb(var(--brand-black))", color: "rgb(var(--white))", boxShadow: "var(--shadow-lg)" }}>
            <h3 className="font-heading text-h3 mb-4" style={{ letterSpacing: "0.02em", color: "rgb(var(--brand-gold))" }}>
              Our Philosophy
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              "We believe in developing complete individuals, not just football players. Through Islamic values, 
              Emirati culture, and professional football excellence, we shape young people who will become 
              leaders in their communities and ambassadors for the UAE."
            </p>
            <div className="inline-block px-6 py-2 rounded-full text-sm font-medium" style={{ background: "rgb(var(--brand-gold))", color: "rgb(var(--brand-black))" }}>
              Més que un club — More than a club
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
