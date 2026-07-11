import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { trackViewContent } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const PIECES = [
  {
    label: 'Resin Pendants',
    desc: 'Ashes of a loved one delicately suspended in crystal-clear resin, set in sterling silver bezels. Choose teardrop, circle, or hexagon.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/d1c4908c2_140ad2f2-bbd0-4b5b-bf29-d132bbfa7f99.png',
  },
  {
    label: 'Memorial Rings',
    desc: 'A band you never take off. Cremation ashes set into a channel of hand-poured resin — available in silver or gold finish.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/e5ddbd8a1_042b7cf9-ed66-44e9-9cd7-5255d02c6c72.png',
  },
  {
    label: 'Botanical Pendants',
    desc: 'Pressed flowers and botanicals encased alongside ashes — a living garden frozen in time, worn close to the heart.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/ac2afcdc1_040e85c6-0c42-4ee6-a3f7-b90f9c9e21fd.jpg',
  },
  {
    label: 'Heirloom Sets',
    desc: 'A matching ring and pendant set — perfect for sharing between family members or keeping a coordinated collection.',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/6e00c1bce_f238f981-0091-4479-88cf-4a815244664c.png',
  },
];

export default function Jewelry() {
  useMetaDescription(
    'Memorial jewelry in sterling silver — resin pendants, rings, and earrings holding ashes or fingerprints of loved ones. Wearable remembrance.'
  );

  useEffect(() => {
    trackViewContent({
      contentId: 'jewelry-collection',
      contentName: 'Memorial Jewelry',
      contentCategory: 'Jewelry',
      price: 209,
    });
  }, []);

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 80px', overflow: 'hidden' }}>
        <img src="https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/6e00c1bce_f238f981-0091-4479-88cf-4a815244664c.png" alt="Memorial jewelry" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,12,0.6) 0%, rgba(10,10,12,0.95) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '620px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Memorial Collection</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
            Carry Them<br />With You
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
            Cremation ashes set into handcrafted resin jewelry — pendants, rings, and heirloom sets that keep your loved one close, always.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px', marginBottom: '80px' }}>
          {PIECES.map((p, i) => (
            <Link key={i} to="/order?category=memorial&format=jewelry" style={{ position: 'relative', overflow: 'hidden', background: '#111113', display: 'block', textDecoration: 'none' }}>
              <img src={p.img} alt={p.label} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.2) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#F2F2F2' }}>{p.label}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.65 }}>{p.desc}</p>
                <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8681E', marginTop: '12px' }}>Start Order →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* How it works */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>The Process</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>How It Works</h2>
          <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.4)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            A simple, reverent process from start to finish.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {[
            { step: '01', title: 'Choose Your Piece', desc: 'Select a pendant, ring, or set and complete your order.' },
            { step: '02', title: 'Send Your Ashes', desc: 'We provide a prepaid mailing kit with secure packaging and instructions.' },
            { step: '03', title: 'Handcrafted', desc: 'Each piece is carefully hand-poured and cured over several days.' },
            { step: '04', title: 'Delivered to You', desc: 'Your finished piece arrives in a keepsake gift box, ready to wear.' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 24px', background: '#111113', borderTop: '2px solid rgba(200,104,30,0.3)' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#C8681E', marginBottom: '12px' }}>{s.step}</p>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h4>
              <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '20px 0 0' }}>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.75 }}>
            Pendants, rings, and heirloom sets — each handmade to order with your loved one's ashes or botanicals.
          </p>
          <Link to="/order?category=memorial&format=jewelry" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '15px 40px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Start Order
          </Link>
          <Link to="/pricing" style={{ display: 'inline-block', marginLeft: '16px', color: 'rgba(242,242,242,0.5)', borderRadius: '999px', padding: '15px 28px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(242,242,242,0.15)' }}>
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}