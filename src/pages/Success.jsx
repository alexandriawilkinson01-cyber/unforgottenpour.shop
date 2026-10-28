import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import confetti from 'canvas-confetti';
import { trackPurchase } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const NEXT_STEPS = [
  { num: '01', title: 'Watch for our email', body: 'Within 24 hours, we\'ll send your shipping instructions and a prepaid label. Check your inbox and spam folder.' },
  { num: '02', title: 'Pack your keepsake safely', body: 'Use a sturdy corrugated box with bubble wrap. Seal ashes or fur in zip-top bags and double-bag them. Wrap jewelry and keepsakes individually in tissue paper.' },
  { num: '03', title: 'Ship it to our studio', body: 'Drop off your package with the prepaid label. Email the tracking number to AlexandriaWilkinson01@gmail.com so we can watch for its arrival.' },
  { num: '04', title: 'We begin crafting', body: 'Once your items arrive, we\'ll send confirmation photos and begin the preservation process. Your handcrafted piece will be shipped back within the estimated turnaround.' },
];

export default function Success() {
  useMetaDescription(
    'Order confirmed — thank you for your purchase. We\'ll send a packing kit within 24 hours and begin crafting your custom resin preservation piece.'
  );
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const value = params.get('value');
    const contentId = params.get('content_id');
    trackPurchase({
      contentId: contentId || sessionId || 'checkout-success',
      contentName: 'Order',
      value: value ? parseFloat(value) : undefined,
    });
    // Confetti celebration
    const fire = (opts) => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#C8681E', '#FFB800', '#F2F2F2', '#FF8C42'], ...opts });
    fire();
    setTimeout(() => fire({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } }), 200);
    setTimeout(() => fire({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } }), 400);
    // Show thank-you popup
    setTimeout(() => setShowPopup(true), 600);
  }, []);

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      {/* Thank You + Shipping Instructions Popup */}
      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setShowPopup(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#111113', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '12px', maxWidth: '560px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '48px 40px', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setShowPopup(false)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'rgba(242,242,242,0.67)', fontSize: '20px', cursor: 'pointer', zIndex: 2 }}>✕</button>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #C8681E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#C8681E' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#F2F2F2', marginBottom: '10px' }}>Thank you for your order!</h2>
            <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.7, marginBottom: '28px' }}>
              We're honored you've trusted us to preserve what matters most. Here's how to get your keepsake to our studio safely.
            </p>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {NEXT_STEPS.map(step => (
                <div key={step.num} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#C8681E', lineHeight: 1.2 }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: '#F2F2F2', marginBottom: '3px' }}>{step.title}</h3>
                    <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.6 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/shipping-guide" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', marginRight: '8px', marginBottom: '8px' }}>
              Full Shipping Guide
            </Link>
            <button onClick={() => setShowPopup(false)} style={{ display: 'inline-block', background: 'none', color: 'rgba(242,242,242,0.7)', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.7)', marginBottom: '28px' }}>
            Order Confirmed
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.15, marginBottom: '24px' }}>
            Your legacy<br />is secured.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.75, marginBottom: '12px' }}>
            Your preservation order has been received. We'll be in touch within 24 hours with your shipping kit and next steps.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.65)', marginBottom: '44px', letterSpacing: '0.03em' }}>Handcrafted in Blacksburg, South Carolina.</p>
          <Link to="/shipping-guide" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', marginRight: '12px', marginBottom: '12px' }}>
            Shipping Guide
          </Link>
          <Link to="/" style={{ display: 'inline-block', background: 'none', color: '#F2F2F2', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}>
            Return Home
          </Link>
        </div>
      </div>

      {/* Shipping Instructions */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>What Happens Next</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#F2F2F2' }}>Shipping your keepsake to us</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NEXT_STEPS.map(step => (
            <div key={step.num} style={{ background: '#111113', padding: '32px 40px', display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: '#C8681E', lineHeight: 1, opacity: 0.7 }}>{step.num}</div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F2F2F2', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.7)', lineHeight: 1.8 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111113', border: '1px solid rgba(200,104,30,0.3)', padding: '32px', textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.71)', marginBottom: '16px' }}>Need the full step-by-step packing guide with material lists and special handling instructions?</p>
          <Link to="/shipping-guide" style={{ display: 'inline-block', background: 'none', color: '#C8681E', border: '1px solid rgba(200,104,30,0.4)', borderRadius: '999px', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            View Full Shipping Guide
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}