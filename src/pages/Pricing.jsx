import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TIERS = [
  {
    name: 'Keepsake',
    price: '$149',
    desc: 'Jewelry, small keepsakes & compact paperweights',
    features: ['Pendant, ring, or earring', 'Compact paperweight block', 'Standard UV-resistant resin', 'Documentation photos', '12–16 week turnaround'],
  },
  {
    name: 'Heirloom',
    price: '$279',
    desc: 'Bouquets, orbs, shadow boxes & mid-size displays',
    featured: true,
    features: ['Full bouquet preservation', 'Orb or shadow box format', 'Multi-layer premium resin', 'High-gloss polish finish', 'Engraved date plate', '8–12 week turnaround'],
  },
  {
    name: 'Legacy',
    price: '$499',
    desc: 'Custom sculptures, large tabletop art & legacy pieces',
    features: ['Custom sculptural form', 'Dedicated artisan', 'Archival documentation', 'White-glove handling', 'Custom display pedestal', 'Lifetime guarantee', '4–6 week turnaround'],
  },
];

export default function Pricing() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', padding: '120px 24px 80px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '32px' }}>
          Preservation Tiers
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '20px' }}>
          Simple, honest pricing.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.45)', maxWidth: '440px', margin: '0 auto 64px', lineHeight: 1.7 }}>
          Choose the tier that fits your item. No hidden fees, no surprises.
        </p>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{ background: tier.featured ? '#161618' : '#111113', padding: '44px 36px', textAlign: 'left', position: 'relative', borderTop: tier.featured ? '2px solid #C8681E' : '2px solid transparent' }}>
              {tier.featured && (
                <div style={{ position: 'absolute', top: '-1px', right: '24px', background: '#C8681E', color: '#fff', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', fontWeight: 600 }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#F2F2F2', marginBottom: '8px' }}>{tier.name}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.4)', marginBottom: '28px', lineHeight: 1.5 }}>{tier.desc}</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 700, color: '#F2F2F2', marginBottom: '32px', lineHeight: 1 }}>{tier.price}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '36px' }}>
                {tier.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '14px', color: 'rgba(242,242,242,0.6)' }}>
                    <span style={{ color: '#C8681E', marginTop: '1px', flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/order" style={{ display: 'block', textAlign: 'center', background: tier.featured ? '#C8681E' : 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Select {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}