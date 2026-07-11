import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 500, color: '#F2F2F2', textDecoration: 'none', letterSpacing: '0.02em' }}>
          Unforgotten Pour
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden md:flex">
          <Link to="/portfolio" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Portfolio
          </Link>
          <Link to="/memorial" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Memorial
          </Link>
          <Link to="/notebooks" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Notebooks
          </Link>
          <Link to="/jewelry" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Jewelry
          </Link>
          <Link to="/pricing" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Pricing
          </Link>
          <Link to="/how-it-works" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            How It Works
          </Link>
          <Link to="/shipping-guide" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Shipping Guide
          </Link>
          <Link to="/about" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            About
          </Link>
          <Link to="/contact" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Contact
          </Link>
          <Link to="/track-order" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Track Order
          </Link>
          <Link to="/order" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F2F2F2', textDecoration: 'none', border: '1px solid rgba(242,242,242,0.3)', padding: '8px 18px', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.target.style.borderColor='rgba(242,242,242,0.8)'} onMouseLeave={e => e.target.style.borderColor='rgba(242,242,242,0.3)'}>
            Start Order
          </Link>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(true)} style={{ color: '#F2F2F2', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>☰</button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0A0A0C', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '20px', right: '32px', color: '#F2F2F2', background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>✕</button>
          {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/memorial', 'Memorial'], ['/notebooks', 'Notebooks'], ['/jewelry', 'Jewelry'], ['/pricing', 'Pricing'], ['/how-it-works', 'How It Works'], ['/shipping-guide', 'Shipping Guide'], ['/about', 'About'], ['/contact', 'Contact'], ['/track-order', 'Track Order'], ['/order', 'Start Order']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 600, color: '#F2F2F2', textDecoration: 'none', marginBottom: '24px', display: 'block' }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}