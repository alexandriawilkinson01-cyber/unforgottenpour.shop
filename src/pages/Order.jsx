import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/Navbar';
import TrustStrip from '../components/TrustStrip';
import { GLOBES, SHAPES, NOTEBOOK, KEYCHAIN, JEWELRY, PET_MEMORIAL, ALL_ITEMS } from '@/data/products';
import { trackAddToCart, trackAddPaymentInfo, trackInitiateCheckout, trackPlaceAnOrder, identifyUser } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import BottomSheetSelect from '@/components/ui/BottomSheetSelect';

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px', padding: '12px 14px', color: '#F2F2F2', fontSize: '15px',
  outline: 'none', fontFamily: 'Inter Tight, sans-serif',
};

// Selects need a solid (non-transparent) background so the closed control
// stays legible and native option rendering stays consistent with the theme.
const selectStyle = {
  ...inputStyle,
  background: '#111113',
};

const labelStyle = { display: 'block', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.5)', marginBottom: '8px' };

export default function Order() {
  useMetaDescription(
    'Start your custom resin preservation order, choose from resin globes, shaped blocks, memorial jewelry, and notebooks. Secure checkout with Stripe.'
  );
  const urlParams = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    category: urlParams.get('category') || '', format: '', description: '', instructions: '',
    item: urlParams.get('item') || '',
  });
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);

  const handleFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    base44.analytics.track({ eventName: 'order_form_started' });
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const selectedItem = ALL_ITEMS.find(i => i.id === form.item);

  const handleItemSelect = (itemId) => {
    set('item', itemId);
    const item = ALL_ITEMS.find(i => i.id === itemId);
    if (item) {
      trackAddToCart({ contentId: item.id, contentName: item.name, value: item.price });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.format) {
      alert('Please choose an item category and preferred format.');
      return;
    }
    if (!selectedItem) {
      alert('Please select an item to purchase.');
      return;
    }
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      alert('Checkout is only available from the published app. Please open Unforgotten Pour in a new tab to complete your order.');
      return;
    }
    setLoading(true);
    const origin = window.location.origin;
    identifyUser({ email: form.email, phone: form.phone });
    trackInitiateCheckout({ contentId: selectedItem.id, contentName: selectedItem.name, value: selectedItem.price });
    trackAddPaymentInfo({ contentId: selectedItem.id, contentName: selectedItem.name, value: selectedItem.price });
    trackPlaceAnOrder({ contentId: selectedItem.id, contentName: selectedItem.name, value: selectedItem.price });
    try {
      const response = await base44.functions.invoke('createCheckout', {
        planId: selectedItem.id,
        successUrl: `${origin}/success?value=${selectedItem.price}&content_id=${selectedItem.id}`,
        cancelUrl: `${origin}/order`,
        metadata: {
          item: selectedItem.name,
          description: form.description,
          customer_name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          category: form.category,
          format: form.format,
          instructions: form.instructions,
        },
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
            Select your piece, tell us what you'd like preserved, and complete secure checkout. We'll send a packing kit within 24 hours.
          </p>
        </div>

        <TrustStrip />

        <form onSubmit={handleSubmit} onFocus={handleFormStart}>
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
              <BottomSheetSelect
                value={form.category}
                onChange={(val) => set('category', val)}
                title="Select a category"
                placeholder="Select a category"
                triggerStyle={{ ...selectStyle, cursor: 'pointer' }}
                options={[
                  { value: 'wedding', label: 'Wedding & Event Florals' },
                  { value: 'memorial', label: 'Memorial Keepsakes' },
                  { value: 'milestone', label: 'Milestone Artifacts' },
                  { value: 'legacy', label: 'Legacy Pieces' },
                  { value: 'sports', label: 'Sports & Achievement' },
                  { value: 'custom', label: 'Custom Commission' },
                ]}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Preferred Format *</label>
              <BottomSheetSelect
                value={form.format}
                onChange={(val) => set('format', val)}
                title="Choose a format"
                placeholder="Choose a format"
                triggerStyle={{ ...selectStyle, cursor: 'pointer' }}
                options={[
                  { value: 'jewelry', label: 'Jewelry (pendant, ring, earring)' },
                  { value: 'paperweight', label: 'Paperweight / Display Block' },
                  { value: 'shadowbox', label: 'Shadow Box' },
                  { value: 'orb', label: 'Orb' },
                  { value: 'tabletop', label: 'Tabletop Art / Custom Sculpture' },
                ]}
              />
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

          {/* Item Selection */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Select Your Piece *</p>
            <BottomSheetSelect
              value={form.item}
              onChange={handleItemSelect}
              title="Select your piece"
              placeholder="Choose a piece"
              triggerStyle={{ ...selectStyle, cursor: 'pointer' }}
              groups={[
                { label: 'Resin Globes', options: GLOBES.map(g => ({ value: g.id, label: `${g.name}, $${g.price}` })) },
                { label: 'Shaped Pieces', options: SHAPES.map(s => ({ value: s.id, label: `${s.name}, $${s.price}` })) },
                { label: 'Notebooks', options: [{ value: NOTEBOOK.id, label: `${NOTEBOOK.name}, $${NOTEBOOK.price}` }] },
                { label: 'Keychains', options: [{ value: KEYCHAIN.id, label: `${KEYCHAIN.name}, $${KEYCHAIN.price}` }] },
                { label: 'Memorial Jewelry', options: JEWELRY.map(j => ({ value: j.id, label: `${j.name}, $${j.price}` })) },
                { label: 'Pet Memorials', options: PET_MEMORIAL.map(p => ({ value: p.id, label: `${p.name}, $${p.price}` })) },
              ]}
            />
            {selectedItem && (
              <div style={{ marginTop: '16px', background: '#1A1A1E', border: '2px solid #C8681E', borderRadius: '4px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#F2F2F2' }}>{selectedItem.name}</div>
                  {selectedItem.size && <div style={{ fontSize: '13px', color: 'rgba(242,242,242,0.4)', marginTop: '2px' }}>{selectedItem.size}</div>}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#C8681E' }}>${selectedItem.price}</div>
              </div>
            )}
            <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)', marginTop: '10px' }}>
              Not sure? <Link to="/pricing" style={{ color: '#C8681E', textDecoration: 'none' }}>View all pricing</Link>. You'll be directed to secure payment after submitting.
            </p>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '16px 24px', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter Tight, sans-serif' }}>
            {loading ? 'Processing...' : 'Continue to Payment →'}
          </button>

          <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.25)', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 }}>
            Your order details are saved immediately. You'll be directed to Stripe's secure checkout to complete payment. We'll email you a confirmation and packing kit instructions after payment.
          </p>
        </form>
      </div>
    </div>
  );
}