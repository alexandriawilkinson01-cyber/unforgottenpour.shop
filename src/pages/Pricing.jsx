import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TIERS = [
  {
    name: 'Keepsake',
    price: '$156',
    desc: 'Jewelry, small keepsakes & compact paperweights',
    features: ['Pendant, ring, or earring', 'Compact paperweight block', 'Standard UV-resistant resin', 'Documentation photos', '4–6 week turnaround'],
  },
  {
    name: 'Heirloom',
    price: '$293',
    desc: 'Bouquets, orbs, shadow boxes & mid-size displays',
    featured: true,
    features: ['Full bouquet preservation', 'Orb or shadow box format', 'Multi-layer premium resin', 'High-gloss polish finish', 'Engraved date plate', '4–6 week turnaround'],
  },
  {
    name: 'Legacy',
    price: '$524',
    desc: 'Custom sculptures, large tabletop art & legacy pieces',
    features: ['Custom sculptural form', 'Dedicated artisan', 'Archival documentation', 'White-glove handling', 'Custom display pedestal', 'Lifetime guarantee', '4–6 week turnaround'],
  },
];

const NOTEBOOKS = [
  {
    name: 'Standard Notebook',
    price: '$78',
    desc: 'Hand-poured resin cover with preserved botanicals',
    features: ['Botanical & floral resin cover', 'Crystal-clear UV resin', 'A5 lined journal', 'One-of-a-kind design', '4–6 week turnaround'],
    link: '/notebooks',
    linkLabel: 'Order a Notebook',
  },
  {
    name: 'Custom Notebook',
    price: '$105',
    desc: 'Personalized with your own flowers, name, or date',
    features: ['Everything in Standard', 'Your supplied botanicals or name', 'Custom design consultation', 'Engraved spine option', '4–6 week turnaround'],
    link: '/notebooks',
    linkLabel: 'Order Custom',
  },
];

const JEWELRY = [
  {
    name: 'Memorial Pendant',
    price: '$209',
    desc: 'Cremation ashes encased in a wearable resin pendant',
    features: ['Ashes or flower petal infusion', 'Sterling silver bail', 'Choice of shape & color tint', 'Gift box included', '4–6 week turnaround'],
    link: '/jewelry',
    linkLabel: 'Order Pendant',
  },
  {
    name: 'Memorial Ring',
    price: '$261',
    desc: 'Ashes set in a hand-cast resin band',
    features: ['Ashes or botanical infusion', 'Hypoallergenic resin band', 'Custom sizing', 'Polished finish', '4–6 week turnaround'],
    link: '/jewelry',
    linkLabel: 'Order Ring',
  },
  {
    name: 'Memorial Jewelry Set',
    price: '$419',
    desc: 'Matching pendant and ring from the same memorial',
    features: ['Pendant + ring from same ashes', 'Coordinated design', 'Custom sizing & color tint', 'Keepsake gift box', '4–6 week turnaround'],
    link: '/jewelry',
    linkLabel: 'Order Set',
    featured: true,
  },
];

function PriceCard({ item, accent = false }) {
  return (
    <div style={{ background: item.featured ? '#161618' : '#111113', padding: '40px 32px', textAlign: 'left', position: 'relative', borderTop: item.featured ? '2px solid #C8681E' : '2px solid transparent' }}>
      {item.featured && (
        <div style={{ position: 'absolute', top: '-1px', right: '24px', background: '#C8681E', color: '#fff', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', fontWeight: 600 }}>
          Best Value
        </div>
      )}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2', marginBottom: '6px' }}>{item.name}</h3>
      <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.4)', marginBottom: '24px', lineHeight: 1.5 }}>{item.desc}</p>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '44px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px', lineHeight: 1 }}>{item.price}</div>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
        {item.features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '13px', color: 'rgba(242,242,242,0.6)' }}>
            <span style={{ color: '#C8681E', marginTop: '1px', flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link to={item.link || '/order'} style={{ display: 'block', textAlign: 'center', background: item.featured ? '#C8681E' : 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
        {item.linkLabel || `Select ${item.name}`}
      </Link>
    </div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '48px', textAlign: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>{label}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.15, marginBottom: '12px' }}>{title}</h2>
      <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.4)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>{subtitle}</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      {/* Page Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center', padding: '120px 24px 60px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '32px' }}>
          All Products & Services
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '20px' }}>
          Simple, honest pricing.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.45)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
          Every piece is handcrafted to order. No hidden fees, no surprises.
        </p>
        <Link to="/download-catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8681E', textDecoration: 'none', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '999px', padding: '10px 22px', fontWeight: 600, transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.target.style.borderColor='rgba(200,104,30,0.8)'} onMouseLeave={e => e.target.style.borderColor='rgba(200,104,30,0.4)'}>
          ↓ Download Product Catalog (Excel)
        </Link>
      </section>

      {/* Preservation Tiers */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
        <SectionHeader label="Preservation Services" title="Resin preservation tiers." subtitle="Choose the tier that fits your item and budget." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
          {TIERS.map(tier => (
            <PriceCard key={tier.name} item={{ ...tier, link: '/order', linkLabel: `Select ${tier.name}` }} />
          ))}
        </div>
      </section>

      {/* Notebooks */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Studio Collection" title="Handcrafted resin notebooks." subtitle="Botanical covers hand-poured with preserved flowers and premium resin." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px', maxWidth: '700px', margin: '0 auto' }}>
          {NOTEBOOKS.map(item => (
            <PriceCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* Jewelry */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Memorial Jewelry" title="Wearable memorial pieces." subtitle="Cremation ashes or botanicals encased in hand-cast resin jewelry." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
          {JEWELRY.map(item => (
            <PriceCard key={item.name} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}