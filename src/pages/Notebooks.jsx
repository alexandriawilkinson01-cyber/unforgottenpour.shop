import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { base44 } from '@/api/base44Client';
import { NOTEBOOK } from '@/data/products';

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
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const total = NOTEBOOK.price * qty;

  const handleOrder = async () => {
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not inside an iframe preview.');
      return;
    }
    setLoading(true);
    try {
      const res = await base44.functions.invoke('createCheckout', {
        priceId: NOTEBOOK.priceId,
        quantity: qty,
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.href,
      });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (e) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Studio Collection</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          Handcrafted<br />Resin Notebooks
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
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
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.65 }}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order card */}
        <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Order a Notebook</h2>
          <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.4)', marginBottom: '36px' }}>Each piece is handmade to order. Allow 4–6 weeks for delivery.</p>

          {/* Qty */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.5)', display: 'block', marginBottom: '10px' }}>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2F2F2', fontSize: '18px', cursor: 'pointer', borderRadius: '4px' }}>−</button>
              <span style={{ fontSize: '20px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2F2F2', fontSize: '18px', cursor: 'pointer', borderRadius: '4px' }}>+</button>
            </div>
          </div>

          {/* Total & CTA */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.35)', marginBottom: '4px' }}>Total</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>${total}</p>
              <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)', marginTop: '2px' }}>{qty} × ${NOTEBOOK.price}</p>
            </div>
            <button onClick={handleOrder} disabled={loading}
              style={{ background: loading ? 'rgba(200,104,30,0.5)' : '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '15px 36px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Redirecting…' : 'Order Now'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}