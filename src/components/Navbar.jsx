import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, User, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <nav className="select-none" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: 'calc(20px + env(safe-area-inset-top))', paddingBottom: '20px', paddingLeft: 'calc(20px + env(safe-area-inset-left))', paddingRight: 'calc(20px + env(safe-area-inset-right))', background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          {!isHome && (
            <button type="button" onClick={goBack} aria-label="Go back" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', flexShrink: 0, background: 'rgba(242,242,242,0.06)', border: '1px solid rgba(242,242,242,0.12)', borderRadius: '999px', color: '#F2F2F2', cursor: 'pointer', padding: 0 }}>
              <ArrowLeft size={16} />
            </button>
          )}
          <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 500, color: '#F2F2F2', textDecoration: 'none', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
            Unforgotten Pour
          </Link>
        </div>

        {/* Desktop nav */}
        <div style={{ alignItems: 'center', gap: '36px' }} className="hidden md:flex">
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
          <Link to="/style-advisor" style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#F2F2F2'} onMouseLeave={e => e.target.style.color='rgba(242,242,242,0.6)'}>
            Style Advisor
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

        {/* Account + mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Link to="/account" aria-label="Account settings" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(242,242,242,0.12)', color: 'rgba(242,242,242,0.75)', textDecoration: 'none' }}>
            <User size={16} />
          </Link>
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu" style={{ color: '#F2F2F2', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', padding: 0 }}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="select-none" style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0A0A0C', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflowY: 'auto', paddingTop: 'calc(88px + env(safe-area-inset-top))', paddingBottom: 'calc(40px + env(safe-area-inset-bottom))', paddingLeft: 'calc(40px + env(safe-area-inset-left))', paddingRight: 'calc(40px + env(safe-area-inset-right))' }}>
          <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: 'calc(20px + env(safe-area-inset-top))', right: '32px', color: '#F2F2F2', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', padding: 0 }}>
            <X size={24} />
          </button>
          {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/memorial', 'Memorial'], ['/notebooks', 'Notebooks'], ['/jewelry', 'Jewelry'], ['/style-advisor', 'Style Advisor'], ['/pricing', 'Pricing'], ['/how-it-works', 'How It Works'], ['/shipping-guide', 'Shipping Guide'], ['/about', 'About'], ['/contact', 'Contact'], ['/track-order', 'Track Order'], ['/account', 'Account'], ['/order', 'Start Order']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 600, color: '#F2F2F2', textDecoration: 'none', marginBottom: '18px', display: 'block', flexShrink: 0 }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}