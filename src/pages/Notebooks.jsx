import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { base44 } from '@/api/base44Client';

const NOTEBOOK_PRICE_ID = 'price_1Tmv6bLfTuG5tMiXY7CSGzxE';   // $52
const CUSTOM_PRICE_ID   = 'price_1Tmv6bLfTuG5tMiXamw6lm5g';   // $70

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
  const [custom, setCustom] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const price = custom ? 70 : 52;
  const total = price * qty;

  const handleOrder = async () => {
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not inside an iframe preview.');
      return;
    }
    setLoading(true);
    try {
      const res = await base44.functions.invoke('createCheckout', {
        priceId: custom ? CUSTOM_PRICE_ID : NOTEBOOK_PRICE_ID,
        quantity: qty,
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.href,
        metadata: { custom_note: customNote },
      });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (e) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', color: '#4A3B3F' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C47B6D', marginBottom: '20px' }}>Studio Collection</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          Handcrafted<br />Resin Notebooks
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(74,59,63,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
          Each notebook cover is hand-poured with preserved botanicals and premium resin. A journal you'll never want to put away.
        </p>
      </section>

      {/* Examples grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', marginBottom: '80px' }}>
          {EXAMPLES.map((ex, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.75)' }}>
              <img src={ex.img} alt={ex.label} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(251,247,244,0.92) 0%, rgba(251,247,244,0.2) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 28px 28px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#4A3B3F' }}>{ex.label}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(74,59,63,0.55)', lineHeight: 1.65 }}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order card */}
        <div style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(74,59,63,0.07)', padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Order a Notebook</h2>
          <p style={{ fontSize: '14px', color: 'rgba(74,59,63,0.4)', marginBottom: '36px' }}>Each piece is handmade to order. Allow 4–6 weeks for delivery.</p>

          {/* Qty */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.5)', display: 'block', marginBottom: '10px' }}>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '36px', height: '36px', background: 'rgba(74,59,63,0.05)', border: '1px solid rgba(74,59,63,0.1)', color: '#4A3B3F', fontSize: '18px', cursor: 'pointer', borderRadius: '4px' }}>−</button>
              <span style={{ fontSize: '20px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: '36px', height: '36px', background: 'rgba(74,59,63,0.05)', border: '1px solid rgba(74,59,63,0.1)', color: '#4A3B3F', fontSize: '18px', cursor: 'pointer', borderRadius: '4px' }}>+</button>
            </div>
          </div>

          {/* Custom add-on */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.5)', display: 'block', marginBottom: '12px' }}>Add-Ons</label>
            <div
              onClick={() => setCustom(c => !c)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '18px', border: `1px solid ${custom ? '#C47B6D' : 'rgba(74,59,63,0.1)'}`, background: custom ? 'rgba(196,123,109,0.07)' : 'transparent', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s' }}>
              <div style={{ width: '20px', height: '20px', border: `2px solid ${custom ? '#C47B6D' : 'rgba(74,59,63,0.3)'}`, borderRadius: '4px', background: custom ? '#C47B6D' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', transition: 'all 0.2s' }}>
                {custom && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#4A3B3F', marginBottom: '4px' }}>Custom Personalization <span style={{ color: '#C47B6D' }}>+$18</span></p>
                <p style={{ fontSize: '13px', color: 'rgba(74,59,63,0.4)', lineHeight: 1.6 }}>Add your own flowers, a name, date, or special request. We'll reach out after purchase to discuss your vision.</p>
              </div>
            </div>
          </div>

          {/* Custom note */}
          {custom && (
            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.5)', display: 'block', marginBottom: '10px' }}>Tell us about your custom request</label>
              <textarea value={customNote} onChange={e => setCustomNote(e.target.value)} rows={3} placeholder="E.g. pressed roses from our anniversary, engrave 'Emma & James 2024' on the spine…"
                style={{ width: '100%', background: 'rgba(74,59,63,0.04)', border: '1px solid rgba(74,59,63,0.1)', borderRadius: '4px', padding: '12px 14px', color: '#4A3B3F', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'Inter Tight, sans-serif', boxSizing: 'border-box' }} />
            </div>
          )}

          {/* Total & CTA */}
          <div style={{ borderTop: '1px solid rgba(74,59,63,0.07)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.35)', marginBottom: '4px' }}>Total</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>${total}</p>
              <p style={{ fontSize: '12px', color: 'rgba(74,59,63,0.3)', marginTop: '2px' }}>{qty} × ${price}{custom ? ' (incl. custom)' : ''}</p>
            </div>
            <button onClick={handleOrder} disabled={loading}
              style={{ background: loading ? 'rgba(196,123,109,0.5)' : '#C47B6D', color: '#fff', border: 'none', borderRadius: '999px', padding: '15px 36px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Redirecting…' : 'Order Now'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}