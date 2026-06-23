import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      {/* Closing CTA */}
      <section style={{ background: '#0A0A0C', padding: '100px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '28px' }}>
            Some things deserve to last<br />as long as the memory does.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', lineHeight: 1.75, marginBottom: '16px' }}>
            AmberVault exists because the most meaningful objects in our lives are also the most fragile. We believe if something matters enough to keep, it matters enough to preserve forever.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.3)', marginBottom: '44px', letterSpacing: '0.03em' }}>
            Handcrafted in Spartanburg, South Carolina. Shipped nationwide.
          </p>
          <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '15px 36px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Begin My Order
          </Link>
        </div>
      </section>

      {/* Email capture */}
      <section style={{ background: '#0D0D10', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#C8681E' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#F2F2F2', marginBottom: '12px' }}>
            Get preservation tips &amp; $25 off your first order
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.4)', lineHeight: 1.7, marginBottom: '32px' }}>
            Join families who've turned memorial flowers into heirlooms. One email a month, unsubscribe anytime.
          </p>

          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#C8681E', fontSize: '14px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              You're on the list! Check your inbox for your $25 code.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '12px 16px', color: '#F2F2F2', fontSize: '14px', outline: 'none' }} />
                <button type="submit" style={{ background: '#C8681E', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 20px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Get $25 Off
                </button>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(242,242,242,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                We'll never share your email.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}