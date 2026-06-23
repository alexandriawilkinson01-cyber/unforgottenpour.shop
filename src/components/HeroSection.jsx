import { Link } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/e3b0d5720_optimized-c74e8c31-759e-4744-80ef-b6034f08f266.webp';

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#F5F0EA' }}>
      <img src={HERO_IMG} alt="Preserved floral orb"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(250,248,245,0.3)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #FAF8F5, transparent)' }} />

      {/* Decorative botanical line art */}
      <svg width="220" height="400" viewBox="0 0 220 400" style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)', opacity: 0.12 }} fill="none" stroke="#2A2A28" strokeWidth="1.2">
        <path d="M110 400 L110 20" />
        <path d="M110 350 C70 340, 50 310, 50 280 C50 270, 55 265, 60 265 C70 265, 80 280, 110 290" />
        <path d="M110 300 C150 290, 170 260, 170 230 C170 220, 165 215, 160 215 C150 215, 140 230, 110 240" />
        <path d="M110 250 C70 240, 50 210, 50 180 C50 170, 55 165, 60 165 C70 165, 80 180, 110 190" />
        <path d="M110 200 C150 190, 170 160, 170 130 C170 120, 165 115, 160 115 C150 115, 140 130, 110 140" />
        <path d="M110 150 C70 140, 50 110, 50 80 C50 70, 55 65, 60 65 C70 65, 80 80, 110 90" />
        <path d="M110 100 C150 90, 170 60, 170 30 C170 20, 165 15, 160 15 C150 15, 140 30, 110 40" />
        <circle cx="110" cy="20" r="8" />
      </svg>
      <svg width="220" height="400" viewBox="0 0 220 400" style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', opacity: 0.12 }} fill="none" stroke="#2A2A28" strokeWidth="1.2">
        <path d="M110 400 L110 20" />
        <path d="M110 350 C150 340, 170 310, 170 280 C170 270, 165 265, 160 265 C150 265, 140 280, 110 290" />
        <path d="M110 300 C70 290, 50 260, 50 230 C50 220, 55 215, 60 215 C70 215, 80 230, 110 240" />
        <path d="M110 250 C150 240, 170 210, 170 180 C170 170, 165 165, 160 165 C150 165, 140 180, 110 190" />
        <path d="M110 200 C70 190, 50 160, 50 130 C50 120, 55 115, 60 115 C70 115, 80 130, 110 140" />
        <path d="M110 150 C150 140, 170 110, 170 80 C170 70, 165 65, 160 65 C150 65, 140 80, 110 90" />
        <path d="M110 100 C70 90, 50 60, 50 30 C50 20, 55 15, 60 15 C70 15, 80 30, 110 40" />
        <circle cx="110" cy="20" r="8" />
      </svg>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(42,42,40,0.25)', borderRadius: '999px', padding: '8px 20px', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(42,42,40,0.7)', background: 'rgba(250,248,245,0.8)', marginBottom: '40px' }}>
          Premium Resin Preservation Studio
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.05, color: '#2A2A28', marginBottom: '28px', letterSpacing: '-0.01em' }}>
          Some things were never<br />meant to be forgotten.
        </h1>

        <p style={{ fontSize: '17px', color: 'rgba(42,42,40,0.7)', lineHeight: 1.7, marginBottom: '44px', maxWidth: '540px', margin: '0 auto 44px' }}>
          Unforgotten Pour encases cremation ashes, memorial flowers, and cherished keepsakes into handcrafted resin jewelry and art. Pendants, rings, and heirloom pieces — carry your loved ones with you, always.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='#b85d1a'} onMouseLeave={e => e.currentTarget.style.background='#C8681E'}>
            Begin My Order
          </Link>
          <Link to="/portfolio" style={{ display: 'inline-block', background: 'rgba(42,42,40,0.06)', color: '#2A2A28', borderRadius: '999px', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(42,42,40,0.15)', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(42,42,40,0.12)'} onMouseLeave={e => e.currentTarget.style.background='rgba(42,42,40,0.06)'}>
            See the Work
          </Link>
        </div>
      </div>
    </section>
  );
}