import { useState } from 'react';
import Navbar from '../components/Navbar';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.integrations.Core.SendEmail({
      to: 'hello@ambervault.com',
      subject: `New message from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    });
    setSent(true);
    setLoading(false);
  };

  const input = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    padding: '12px 14px',
    color: '#F2F2F2',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter Tight, sans-serif',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 60px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Get In Touch</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>
          We'd love to hear from you.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.45)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
          Questions about an order, a custom commission, or just want to say hello — reach out any time.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>

        {/* Contact info */}
        <div style={{ background: '#111113', padding: '48px 40px', borderTop: '2px solid #C8681E' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>Contact details</h2>

          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '8px' }}>Email</p>
            <a href="mailto:hello@ambervault.com" style={{ fontSize: '15px', color: 'rgba(242,242,242,0.7)', textDecoration: 'none' }}>hello@ambervault.com</a>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '8px' }}>Studio Hours</p>
            <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.5)', lineHeight: 1.7 }}>Monday – Friday<br />9:00 AM – 5:00 PM EST</p>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '8px' }}>Location</p>
            <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.5)', lineHeight: 1.7 }}>American South<br />Shipping worldwide</p>
          </div>

          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '12px' }}>Follow Us</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com/ambervault' },
                { label: 'Pinterest', href: 'https://pinterest.com/ambervault' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '7px 16px', color: 'rgba(242,242,242,0.6)', textDecoration: 'none' }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: '#111113', padding: '48px 40px' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '16px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '999px', background: 'rgba(200,104,30,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✓</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700 }}>Message sent</h3>
              <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.7 }}>We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Send a message</h2>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', display: 'block', marginBottom: '8px' }}>Your Name</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={input} placeholder="Jane Smith" />
              </div>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={input} placeholder="jane@example.com" />
              </div>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...input, resize: 'vertical' }} placeholder="Tell us about your item or ask us anything…" />
              </div>
              <button type="submit" disabled={loading}
                style={{ background: loading ? 'rgba(200,104,30,0.5)' : '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}