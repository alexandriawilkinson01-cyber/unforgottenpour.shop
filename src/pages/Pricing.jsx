import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { GLOBES, SHAPES, NOTEBOOK, JEWELRY } from '@/data/products';

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '48px', textAlign: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>{label}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.15, marginBottom: '12px' }}>{title}</h2>
      <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.4)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>{subtitle}</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center', padding: '120px 24px 60px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '32px' }}>
          Individual Pricing
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '20px' }}>
          Every piece, priced individually.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.45)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
          Choose the exact size and shape you want. No tiers, no bundles — just honest per-piece pricing.
        </p>
        <Link to="/download-catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8681E', textDecoration: 'none', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '999px', padding: '10px 22px', fontWeight: 600, transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.target.style.borderColor='rgba(200,104,30,0.8)'} onMouseLeave={e => e.target.style.borderColor='rgba(200,104,30,0.4)'}>
          ↓ Download Product Catalog (Excel)
        </Link>
      </section>

      {/* Resin Globes */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 24px' }}>
        <SectionHeader label="Resin Globes" title="Preservation globes by size." subtitle="Crystal-clear resin globes in seven sizes — pick the one that fits your keepsake." />
        <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.05)' }}>
          {GLOBES.map((g, i) => (
            <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 28px', borderBottom: i < GLOBES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <img src={g.img} alt={g.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, background: '#0A0A0C' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#F2F2F2' }}>{g.name}</span>
                <span style={{ fontSize: '13px', color: 'rgba(242,242,242,0.35)', marginLeft: '12px' }}>{g.size}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2' }}>${g.price}</span>
                <Link to={`/order?item=${g.id}`} style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8681E', textDecoration: 'none', fontWeight: 600 }}>Select →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shaped Pieces */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Shaped Pieces" title="Beyond the globe." subtitle="Square, hexagon, heart, and ornament formats for a unique presentation." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2px' }}>
          {SHAPES.map(s => (
            <div key={s.id} style={{ background: '#111113', overflow: 'hidden' }}>
              <img src={s.img} alt={s.name} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '28px 24px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#F2F2F2', marginBottom: '6px' }}>{s.name}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.35)', marginBottom: '24px' }}>{s.size}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#F2F2F2', marginBottom: '24px' }}>${s.price}</div>
                <Link to={`/order?item=${s.id}`} style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: '999px', padding: '12px 24px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                  Select {s.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notebooks */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Studio Collection" title="Handcrafted resin notebooks." subtitle="Botanical covers hand-poured with preserved flowers and premium resin." />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#111113', maxWidth: '360px', width: '100%', overflow: 'hidden' }}>
            <img src={NOTEBOOK.img} alt={NOTEBOOK.name} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '32px 28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2', marginBottom: '6px' }}>{NOTEBOOK.name}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.4)', marginBottom: '24px', lineHeight: 1.5 }}>Hand-poured resin cover with preserved botanicals. A5 lined journal. 4–6 week turnaround.</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px' }}>${NOTEBOOK.price}</div>
              <Link to="/notebooks" style={{ display: 'block', textAlign: 'center', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Order Notebook
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Memorial Jewelry */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Memorial Jewelry" title="Wearable memorial pieces." subtitle="Cremation ashes or botanicals encased in hand-cast resin jewelry." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
          {JEWELRY.map(j => (
            <div key={j.id} style={{ background: j.featured ? '#161618' : '#111113', borderTop: j.featured ? '2px solid #C8681E' : '2px solid transparent', position: 'relative', overflow: 'hidden' }}>
              <img src={j.img} alt={j.name} style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
              {j.featured && (
                <div style={{ position: 'absolute', top: '0', right: '24px', background: '#C8681E', color: '#fff', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', fontWeight: 600 }}>Best Value</div>
              )}
              <div style={{ padding: '32px 28px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2', marginBottom: '6px' }}>{j.name}</h3>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px' }}>${j.price}</div>
                <Link to={j.link} style={{ display: 'block', textAlign: 'center', background: j.featured ? '#C8681E' : 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                  Order {j.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}