import { Link } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/e3b0d5720_optimized-c74e8c31-759e-4744-80ef-b6034f08f266.webp';

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'transparent' }}>
      <img src={HERO_IMG} alt="Preserved floral orb"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(251,247,244,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, transparent, transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(74,59,63,0.25)', borderRadius: '999px', padding: '8px 20px', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(74,59,63,0.7)', marginBottom: '40px' }}>
          Premium Resin Preservation Studio
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, color: '#4A3B3F', marginBottom: '28px', letterSpacing: '-0.01em' }}>
          Some things were never<br />meant to be forgotten.
        </h1>

        <p style={{ fontSize: '17px', color: 'rgba(74,59,63,0.65)', lineHeight: 1.7, marginBottom: '44px', maxWidth: '540px', margin: '0 auto 44px' }}>
          Unforgotten Pour encases cremation ashes, memorial flowers, and cherished keepsakes into handcrafted resin jewelry and art. Pendants, rings, and heirloom pieces. Carry your loved ones with you, always.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/order" style={{ display: 'inline-block', background: '#C47B6D', color: '#fff', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='#A86A5E'} onMouseLeave={e => e.currentTarget.style.background='#C47B6D'}>
            Begin My Order
          </Link>
          <Link to="/portfolio" style={{ display: 'inline-block', background: 'rgba(74,59,63,0.08)', color: '#4A3B3F', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(74,59,63,0.15)', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(74,59,63,0.14)'} onMouseLeave={e => e.currentTarget.style.background='rgba(74,59,63,0.08)'}>
            See the Work
          </Link>
        </div>
      </div>
    </section>
  );
}