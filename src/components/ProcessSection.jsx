const STEPS = [
  { num: '01', title: 'Ship It Safely', desc: 'We send you a branded preservation kit with archival-grade packing materials. Your irreplaceable item, protected in transit.' },
  { num: '02', title: 'Preparation', desc: 'Every item is carefully cleaned, dried (if organic), and arranged by hand. We photograph and document the process for you.' },
  { num: '03', title: 'Encapsulation', desc: 'Premium UV-resistant resin is poured in multiple layers, cured slowly for maximum clarity. No bubbles, no cloudiness, no shortcuts.' },
  { num: '04', title: 'Finishing', desc: 'Each piece is sanded, polished, and inspected to museum standards. The final result looks like your object frozen in glass.' },
];

export default function ProcessSection() {
  return (
    <section style={{ background: '#0A0A0C', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>The Process</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '64px' }}>
          From treasured object<br />to timeless art.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '40px' }}>
          {STEPS.map(step => (
            <div key={step.num}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', fontWeight: 700, color: 'rgba(242,242,242,0.08)', marginBottom: '16px', lineHeight: 1 }}>{step.num}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#F2F2F2', marginBottom: '12px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.75 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}