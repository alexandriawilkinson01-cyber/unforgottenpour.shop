import { useState } from 'react';
import Navbar from '../components/Navbar';
import { base44 } from '@/api/base44Client';

const SILHOUETTE_BG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/675f3c371_generated_image.png';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await base44.functions.invoke('sendContactEmail', {
        name: form.name,
        email: form.email,
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      setError('Something went wrong sending your message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const input = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #1A1A1A',
    borderRadius: '0',
    padding: '12px 14px',
    color: '#1A1A1A',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter Tight, sans-serif',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#F8F4EF', minHeight: '100vh', color: '#1A1A1A', position: 'relative' }}>
      {/* Silhouette background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: `url(${SILHOUETTE_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar light />

        {/* Hero */}
        <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', padding: '140px 24px 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '20px' }}>Get In Touch</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', color: '#1A1A1A' }}>
            We'd love to hear from you.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(26,26,26,0.5)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            Questions about an order, a custom commission, or just want to say hello — reach out any time.
          </p>
        </section>

        {/* Stacked boxes */}
        <section style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Contact details box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #1A1A1A', padding: '48px 44px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#1A1A1A' }}>Contact details</h2>

            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '8px' }}>Email</p>
              <a href="mailto:AlexandriaWilkinson01@gmail.com" style={{ fontSize: '15px', color: 'rgba(26,26,26,0.7)', textDecoration: 'none' }}>AlexandriaWilkinson01@gmail.com</a>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '8px' }}>Studio Hours</p>
              <p style={{ fontSize: '14px', color: 'rgba(26,26,26,0.5)', lineHeight: 1.7 }}>Monday – Friday<br />9:00 AM – 5:00 PM EST</p>
            </div>

            <div style={{ marginBottom: '0' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '8px' }}>Location</p>
              <p style={{ fontSize: '14px', color: 'rgba(26,26,26,0.5)', lineHeight: 1.7 }}>Blacksburg, South Carolina<br />Shipping worldwide</p>
            </div>
          </div>

          {/* Form box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #1A1A1A', padding: '48px 44px' }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', gap: '16px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '999px', background: 'rgba(196,141,74,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#C48D4A' }}>✓</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>Message sent</h3>
                <p style={{ fontSize: '14px', color: 'rgba(26,26,26,0.45)', lineHeight: 1.7 }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#1A1A1A' }}>Send a message</h2>
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', display: 'block', marginBottom: '8px' }}>Your Name</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={input} placeholder="Jane Smith" />
                </div>
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', display: 'block', marginBottom: '8px' }}>Email Address</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={input} placeholder="jane@example.com" />
                </div>
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', display: 'block', marginBottom: '8px' }}>Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...input, resize: 'vertical' }} placeholder="Tell us about your item or ask us anything…" />
                </div>
                {error && (
                  <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '4px' }}>{error}</p>
                )}
                <button type="submit" disabled={loading}
                  style={{ background: loading ? 'rgba(196,141,74,0.5)' : '#C48D4A', color: '#fff', border: 'none', borderRadius: '0', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}>
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}