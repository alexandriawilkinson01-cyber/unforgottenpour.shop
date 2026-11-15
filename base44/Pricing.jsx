import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { GLOBES, GLOBE, SHAPES, NOTEBOOK, KEYCHAIN, JEWELRY } from '@/data/products';
import { trackViewContent } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import BottomSheetSelect from '@/components/ui/BottomSheetSelect';

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '48px', textAlign: 'center' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>{label}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.15, marginBottom: '12px' }}>{title}</h2>
      <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.67)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>{subtitle}</p>
    </div>
  );
}

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export default function Pricing() {
  useMetaDescription(
    'Transparent pricing for custom resin preservation — resin globes from $25, shaped blocks, notebooks, and memorial jewelry. View our full price list.'
  );
  useEffect(() => {
    trackViewContent({
      contentId: 'pricing',
      contentName: 'Product Pricing',
      contentCategory: 'Pricing',
      price: 50,
    });
  }, []);

  const [globeSizeId, setGlobeSizeId] = useState(GLOBES[0].id);
  const selectedGlobe = GLOBES.find(g => g.id === globeSizeId) || GLOBES[0];

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center', padding: '120px 24px 60px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.7)', marginBottom: '32px' }}>
          Individual Pricing
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '20px' }}>
          Every piece, priced individually.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.68)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
          Choose the exact size and shape you want. No tiers, no bundles — just honest per-piece pricing.
        </p>
        <Link to="/download-catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8681E', textDecoration: 'none', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '999px', padding: '10px 22px', fontWeight: 600, transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.target.style.borderColor='rgba(200,104,30,0.8)'} onMouseLeave={e => e.target.style.borderColor='rgba(200,104,30,0.4)'}>
          ↓ Download Product Catalog (Excel)
        </Link>
      </section>

      {/* Resin Globe — single listing with size dropdown */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 24px' }}>
        <SectionHeader label="Resin Globes" title="Preservation globe." subtitle="One handcrafted crystal-clear resin globe, available in seven sizes — choose the size that fits your keepsake." />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#111113', maxWidth: '420px', width: '100%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
            <img src={GLOBE.img} alt={GLOBE.name} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', background: '#0A0A0C' }} />
            <div style={{ padding: '32px 28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#F2F2F2', marginBottom: '8px' }}>{GLOBE.name}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.67)', marginBottom: '24px', lineHeight: 1.6 }}>{GLOBE.description}</p>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.69)', marginBottom: '8px' }}>Size</label>
              <BottomSheetSelect
                value={globeSizeId}
                onChange={setGlobeSizeId}
                title="Choose a globe size"
                placeholder="Select a size"
                options={GLOBES.map(g => ({ value: g.id, label: `${g.size} — $${fmt(g.price)}` }))}
                triggerStyle={{ width: '100%', boxSizing: 'border-box', background: '#0A0A0C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '12px 14px', color: '#F2F2F2', fontSize: '15px', fontFamily: 'Inter Tight, sans-serif', outline: 'none', marginBottom: '24px', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#F2F2F2' }}>${fmt(selectedGlobe.price)}</span>
                <Link to={`/order?item=${selectedGlobe.id}`} style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8681E', textDecoration: 'none', fontWeight: 600 }}>Select →</Link>
              </div>
            </div>
          </div>
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
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.66)', marginBottom: '24px' }}>{s.size}</p>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#F2F2F2', marginBottom: '24px' }}>${fmt(s.price)}</div>
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
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.67)', marginBottom: '24px', lineHeight: 1.5 }}>Hand-poured resin cover with preserved botanicals. A5 lined journal. 4–6 week turnaround.</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px' }}>${fmt(NOTEBOOK.price)}</div>
              <Link to="/notebooks" style={{ display: 'block', textAlign: 'center', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Order Notebook
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Keychains */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <SectionHeader label="Keychains" title="Carry your memory anywhere." subtitle="A small, pocket-size resin keychain with your preserved flowers or keepsakes." />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#111113', maxWidth: '360px', width: '100%', overflow: 'hidden' }}>
            <img src={KEYCHAIN.img} alt={KEYCHAIN.name} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '32px 28px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2', marginBottom: '6px' }}>{KEYCHAIN.name}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.67)', marginBottom: '24px', lineHeight: 1.5 }}>{KEYCHAIN.size} resin keychain with your preserved flowers, ashes, or small keepsakes.</p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px' }}>${fmt(KEYCHAIN.price)}</div>
              <Link to="/order?item=keychain" style={{ display: 'block', textAlign: 'center', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                Order Keychain
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
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#F2F2F2', marginBottom: '28px' }}>${fmt(j.price)}</div>
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