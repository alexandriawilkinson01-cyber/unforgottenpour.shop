import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactSubmissions from '../components/ContactSubmissions';
import { base44 } from '@/api/base44Client';

export default function Inquiries() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (!authed) {
        setAuthChecked(true);
        return;
      }
      try {
        const me = await base44.auth.me();
        setUser(me);
      } catch (err) {
        console.error('Auth error:', err);
      }
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0C', color: '#F2F2F2' }}>
        <Navbar />
        <div style={{ paddingTop: '140px', textAlign: 'center', padding: '140px 24px 80px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '16px' }}>Admin Access Required</h1>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.5)', marginBottom: '32px' }}>Please log in with an admin account to view inquiries.</p>
          <button onClick={() => base44.auth.redirectToLogin('/inquiries')}
            style={{ background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0C', color: '#F2F2F2' }}>
        <Navbar />
        <div style={{ paddingTop: '140px', textAlign: 'center', padding: '140px 24px 80px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '16px' }}>Access Denied</h1>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.5)' }}>Your account doesn't have admin permissions.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0C', color: '#F2F2F2' }}>
      <Navbar />
      <div style={{ paddingTop: '120px', padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '12px' }}>Admin Dashboard</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '40px' }}>Inquiries</h1>
        <ContactSubmissions />
      </div>
    </div>
  );
}