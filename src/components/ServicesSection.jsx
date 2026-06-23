import { Link } from 'react-router-dom';

const SERVICES = [
  { icon: '✿', title: 'Wedding & Event Florals', desc: 'Bridal bouquets, boutonnieres, corsages, and ceremonial arrangements cast in crystal-clear resin blocks, orbs, or jewelry.' },
  { icon: '♥', title: 'Memorial Keepsakes', desc: 'Funeral flowers, ashes, dried botanicals from gravesites. A permanent, tangible way to hold someone close.' },
  { icon: '★', title: 'Milestone Artifacts', desc: "Baby's first shoes, hospital wristbands, locks of hair, pet fur, teeth, first toys. The small objects that mark enormous moments." },
  { icon: '♦', title: 'Legacy Pieces', desc: 'Military medals, vintage jewelry, watches, coins, letters, fabric swatches. Family history you can see and touch for generations.' },
  { icon: '♣', title: 'Sports & Achievement', desc: 'Championship game tickets, jersey patches, race bibs, trophy fragments. The physical proof of your proudest moments.' },
  { icon: '⋆', title: 'Custom Commissions', desc: "If it fits in resin and it means something to you, we'll find a way. Tabletop art, shadow boxes, wearable pieces, and beyond." },
];

export default function ServicesSection() {
  return (
    <section style={{ background: '#F5F0EA', padding: '100px 24px', borderTop: '1px solid rgba(42,42,40,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>What We Preserve</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#2A2A28', lineHeight: 1.2, marginBottom: '16px' }}>
            Not just flowers.<br />Everything that matters.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(42,42,40,0.5)', maxWidth: '480px', lineHeight: 1.7 }}>
            Most preservation studios only handle bouquets. Unforgotten Pour was built for the full spectrum of what people treasure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
          {SERVICES.map(s => (
            <div key={s.title} style={{ background: '#FFFFFF', padding: '36px 32px', borderTop: '1px solid rgba(42,42,40,0.06)', transition: 'background 0.2s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.background='#FAF8F5'} onMouseLeave={e => e.currentTarget.style.background='#FFFFFF'}>
              <div style={{ fontSize: '24px', marginBottom: '20px', opacity: 0.6 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#2A2A28', marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(42,42,40,0.55)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}