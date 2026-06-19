import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/Navbar';

const TIERS = [
  { id: 'keepsake', name: 'Keepsake', price: '$149', priceId: 'price_1Tk0cNLfTuG5tMiXdpbNNHIq', desc: 'Jewelry, small keepsakes & compact paperweights' },
  { id: 'heirloom', name: 'Heirloom', price: '$279', priceId: 'price_1Tk0cNLfTuG5tMiXmtvqhwHS', desc: 'Bouquets, orbs, shadow boxes & mid-size displays' },
  { id: 'legacy', name: 'Legacy', price: '$499', priceId: 'price_1Tk0cNLfTuG5tMiX9cXwvIxz', desc: 'Custom sculptures, large tabletop art & legacy pieces' },
];

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', padding: '12px 14px', color: '#F2F2F2', fontSize: '15px',
  outline: 'none', fontFamily: 'Inter Tight, sans-serif',
};

const labelStyle = { display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.5)', marginBottom: '8px' };

export default function Order() {
  const urlParams = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    category: urlParams.get('category') || '', format: '', description: '', instructions: '',
  });
  const [selectedTier, setSelectedTier] = useState('heirloom');
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      alert('Checkout is only available from the published app. Please open AmberVault in a new tab to complete your order.');
      return;
    }
    setLoading(true);
    const tier = TIERS.find(t => t.id === selectedTier);
    const origin = window.location.origin;
    try {
      const response = await base44.functions.invoke('createCheckout', {
        planId: tier.id,
        priceId: tier.priceId,
        successUrl: `${origin}/success`,
        cancelUrl: `${origin}/order`,
      });
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        alert('Something went wrong starting checkout. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      alert('Something went wrong starting checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '100px 24px 80px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '24px' }}>
            Preservation Intake
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '16px' }}>
            Tell us about your item.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.7 }}>
            We'll confirm your order and send a packing kit within 24 hours. No payment required until we've reviewed your item.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Your Details */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Your Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input style={inputStyle} placeholder="Jane" required value={form.firstName} onChange={e => set('firstName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input style={inputStyle} placeholder="Smith" required value={form.lastName} onChange={e => set('lastName', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" style={inputStyle} placeholder="jane@example.com" required value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input style={inputStyle} placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>
          </div>

          {/* About Your Item */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>About Your Item</p>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Item Category *</label>
              <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select a category</option>
                <option value="wedding">Wedding &amp; Event Florals</option>
                <option value="memorial">Memorial Keepsakes</option>
                <option value="milestone">Milestone Artifacts</option>
                <option value="legacy">Legacy Pieces</option>
                <option value="sports">Sports &amp; Achievement</option>
                <option value="custom">Custom Commission</option>
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Preferred Format *</label>
              <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.format} onChange={e => set('format', e.target.value)}>
                <option value="">Choose a format</option>
                <option value="jewelry">Jewelry (pendant, ring, earring)</option>
                <option value="paperweight">Paperweight / Display Block</option>
                <option value="shadowbox">Shadow Box</option>
                <option value="orb">Orb</option>
                <option value="tabletop">Tabletop Art / Custom Sculpture</option>
              </select>
              <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)', marginTop: '6px' }}>
                Not sure? <Link to="/portfolio" style={{ color: '#C8681E', textDecoration: 'none' }}>Browse the portfolio</Link> for format examples.
              </p>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Item Description *</label>
              <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Describe what you'd like preserved. Include details like size, condition, quantity (e.g. 'Wedding bouquet of 30 roses, partially dried, from June 2024')."
                value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Special Instructions</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Any specific requests, concerns, or context we should know about..."
                value={form.instructions} onChange={e => set('instructions', e.target.value)} />
            </div>
          </div>

          {/* Tier Selection */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Select Your Tier *</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2px' }}>
              {TIERS.map(tier => (
                <div key={tier.id} onClick={() => setSelectedTier(tier.id)} style={{ background: selectedTier === tier.id ? '#1A1A1E' : '#111113', border: `2px solid ${selectedTier === tier.id ? '#C8681E' : 'transparent'}`, borderRadius: '4px', padding: '24px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2', marginBottom: '4px' }}>{tier.name}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: selectedTier === tier.id ? '#C8681E' : '#F2F2F2', marginBottom: '8px' }}>{tier.price}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(242,242,242,0.4)', lineHeight: 1.5 }}>{tier.desc}</div>
                  {selectedTier === tier.id && (
                    <div style={{ marginTop: '12px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C8681E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)', marginTop: '10px' }}>
              Not sure? <Link to="/pricing" style={{ color: '#C8681E', textDecoration: 'none' }}>View full tier breakdown</Link>. You'll be directed to secure payment after submitting.
            </p>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '16px 24px', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter Tight, sans-serif' }}>
            {loading ? 'Processing...' : 'Continue to Payment →'}
          </button>

          <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.25)', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 }}>
            Your order details are saved immediately. You'll be directed to Stripe's secure checkout to complete payment. We'll email you a confirmation and packing kit instructions after payment.
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(242,242,242,0.2)', textAlign: 'center', marginTop: '8px' }}>
            Test mode: use card 4242 4242 4242 4242, any future date, any CVV
          </p>
        </form>
      </div>
    </div>
  );
}