import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { trackViewContent } from '@/lib/tiktokPixel';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const MEMORIAL_IMG = 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/53e2d4d9-1b21-47bb-ad2d-34ed75b18430.png';

const ITEMS = [
  { title: 'Funeral Florals', desc: 'The flowers from a service, preserved exactly as they were arranged. A lasting tribute you can hold.' },
  { title: 'Cremation Ashes', desc: 'Ashes incorporated into resin orbs, pendants, or paperweights. A beautiful, tangible way to keep loved ones near.' },
  { title: 'Pet Memorials', desc: 'Fur, paw prints, collar tags. Your companion preserved forever.' },
  { title: 'Graveside Botanicals', desc: 'Flowers or greenery gathered from a gravesite, pressed and preserved with care.' },
];

export default function Memorial() {
  useMetaDescription(
    'Custom resin keepsakes preserving ashes, flowers, and fingerprints, a lasting tribute to someone you love. Memorial orbs, pendants, and paperweights.'
  );
  useEffect(() => {
    trackViewContent({
      contentId: 'memorial',
      contentName: 'Memorial Keepsakes',
      contentCategory: 'Memorial',
      price: 150,
    });
  }, []);

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />

      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', overflow: 'hidden' }}>
        <img src={MEMORIAL_IMG} alt="Memorial orb" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,12,0.7)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '620px' }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(242,242,242,0.2)', borderRadius: '999px', padding: '7px 18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.55)', marginBottom: '32px' }}>
            Memorial Keepsakes
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.1, marginBottom: '24px' }}>
            A permanent way<br />to hold someone close.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.75, marginBottom: '44px' }}>
            Funeral flowers, cremation ashes, dried botanicals from gravesites, pet fur and paw prints, handwritten letters. Whatever connects you to the person or companion you have lost, preserved forever in museum-quality resin.
          </p>
          <Link to="/order?category=memorial" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Begin Memorial Order
          </Link>
        </div>
      </section>

      {/* Featured Pet Memorial */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', background: '#111113', overflow: 'hidden' }}>
          <img src="https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/7dabab3d5_UnforgottenPour_DogTagMemorialwithAngels.png" alt="Man's Best Friend Memorial Dog Tag with Angels" style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '40px 40px 40px 0' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Featured Pet Memorial</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '16px' }}>"Man's Best Friend"<br />Memorial Dog Tag</h2>
            <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.5)', lineHeight: 1.7, marginBottom: '24px' }}>
              A bone-shaped name plaque set in crystal-clear resin, surrounded by four guardian angels. A touching tribute to the companion who gave you their whole life. Personalized with your pet's name.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#F2F2F2' }}>$150</span>
            </div>
            <Link to="/order?item=dog-tag-angels" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '13px 32px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
              Order This Piece →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
        {ITEMS.map((item, i) => (
          <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '32px', padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'start' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 600, color: '#C8681E', paddingTop: '4px' }}>0{i + 1}</div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#F2F2F2', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}