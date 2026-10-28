import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { NOTEBOOK } from '@/data/products';
import { trackViewContent } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const EXAMPLES = [
  {
    label: 'Botanical Collection',
    desc: 'Pressed wildflowers, ferns, and gold leaf sealed under crystal-clear resin. Each cover is one of a kind.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/1df70194a_Firefly_GeminiFlash_customresin4notebooks522599.png',
  },
  {
    label: 'Custom Name Journals',
    desc: 'Your name, initials, or a loved one\'s — hand-lettered and preserved alongside dried florals and gold accents.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/179c733c7_Firefly_GeminiFlash_customresinnotebooks6682.png',
  },
  {
    label: 'Nature\'s Notes',
    desc: 'Eucalyptus, daisies, lavender, and rose petals embedded in resin — a garden you carry with you.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/f695e7c3e_Firefly_GeminiFlash_customresinnotebooks522599.png',
  },
];

export default function Notebooks() {
  useMetaDescription(
    'Handcrafted resin notebooks with pressed flowers, gold leaf, and botanicals sealed under crystal-clear covers. Each A5 journal is one of a kind.'
  );

  useEffect(() => {
    trackViewContent({
      contentId: NOTEBOOK.id,
      contentName: NOTEBOOK.name,
      contentCategory: 'Notebooks',
      price: NOTEBOOK.price,
    });
  }, []);

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Studio Collection</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          Handcrafted<br />Resin Notebooks
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.69)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
          Each notebook cover is hand-poured with preserved botanicals and premium resin. A journal you'll never want to put away.
        </p>
      </section>

      {/* Examples grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', marginBottom: '80px' }}>
          {EXAMPLES.map((ex, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', background: '#111113' }}>
              <img src={ex.img} alt={ex.label} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.2) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 28px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#F2F2F2' }}>{ex.label}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.7)', lineHeight: 1.65 }}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.68)', lineHeight: 1.75, marginBottom: '32px' }}>
            Each notebook is handmade to order with your choice of botanicals. Allow 4–6 weeks for delivery.
          </p>
          <Link to="/order?item=notebook" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '15px 40px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Start Order
          </Link>
          <Link to="/pricing" style={{ display: 'inline-block', marginLeft: '16px', color: 'rgba(242,242,242,0.69)', borderRadius: '999px', padding: '15px 28px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(242,242,242,0.15)' }}>
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}