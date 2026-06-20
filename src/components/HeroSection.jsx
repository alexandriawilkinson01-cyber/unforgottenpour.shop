import { Link } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/e3b0d5720_optimized-c74e8c31-759e-4744-80ef-b6034f08f266.webp';

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#0A0A0C' }}>
      <img src={HERO_IMG} alt="Preserved floral orb"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,12,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #0A0A0C, transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.25)', borderRadius: '999px', padding: '8px 20px', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.7)', marginBottom: '40px' }}>
          Premium Resin Preservation Studio
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, color: '#F2F2F2', marginBottom: '28px', letterSpacing: '-0.01em' }}>
          Some things were never<br />meant to be forgotten.
        </h1>

        <p style={{ fontSize: '17px', color: 'rgba(242,242,242,0.65)', lineHeight: 1.7, marginBottom: '44px', maxWidth: '540px', margin: '0 auto 44px' }}>
          AmberVault encases cremation ashes, memorial flowers, and cherished keepsakes into handcrafted resin jewelry and art. Pendants, rings, and heirloom pieces — carry your loved ones with you, always.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='#b85d1a'} onMouseLeave={e => e.currentTarget.style.background='#C8681E'}>
            Begin My Order
          </Link>
          <Link to="/portfolio" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', color: '#F2F2F2', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.14)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
            See the Work
          </Link>
        </div>
      </div>
    </section>
  );
}