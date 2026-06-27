import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Success() {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #C47B6D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: '#C47B6D' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ display: 'inline-block', border: '1px solid rgba(74,59,63,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.55)', marginBottom: '28px' }}>
            Order Confirmed
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#4A3B3F', lineHeight: 1.15, marginBottom: '24px' }}>
            Your legacy<br />is secured.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(74,59,63,0.5)', lineHeight: 1.75, marginBottom: '12px' }}>
            Your preservation order has been received. We'll be in touch within 24 hours with your branded shipping kit and next steps.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(74,59,63,0.25)', marginBottom: '44px', letterSpacing: '0.03em' }}>Handcrafted in Blacksburg, South Carolina.</p>
          <Link to="/" style={{ display: 'inline-block', background: 'none', color: '#4A3B3F', border: '1px solid rgba(74,59,63,0.2)', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}