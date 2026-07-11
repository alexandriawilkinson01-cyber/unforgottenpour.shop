import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useMetaDescription } from '@/hooks/useMetaDescription';

// === FOUNDER SECTION — replace these placeholders with your real content ===
const FOUNDER_IMG = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop'; // Replace with your photo
const FOUNDER_NAME = 'Alexandria Wilkinson';
const FOUNDER_BIO = [
  // Replace these paragraphs with your actual bio text
  'Hi, I\'m Alexandria — the hands and heart behind Unforgotten Pour. What started as a personal project to preserve my own grandmother\'s funeral flowers grew into a calling I never expected.',
  'Every piece that comes through our studio is treated as if it were my own family\'s memory. I personally oversee intake, casting, and finishing because I believe something this important deserves that level of care.',
  'When I\'m not in the studio pouring resin, you\'ll find me tending my garden, sourcing new botanicals, or connecting with families who trust us with their most precious keepsakes. Thank you for being here.',
];
// === END FOUNDER SECTION ===

export default function About() {
  useMetaDescription(
    'Unforgotten Pour is a boutique resin preservation studio turning life\'s most meaningful flowers, ashes, and keepsakes into permanent, handcrafted heirlooms.'
  );
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Our Story</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          We preserve what matters most.
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
          Unforgotten Pour is a boutique resin preservation studio dedicated to turning life's most meaningful objects into permanent, handcrafted heirlooms.
        </p>
      </section>

      {/* Body */}
      <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ background: '#111113', padding: '56px 52px', borderTop: '2px solid #C8681E' }}>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#F2F2F2', marginBottom: '20px' }}>What we do</h2>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85, marginBottom: '36px' }}>
            At Unforgotten Pour, we encapsulate the things you can't afford to lose — wedding bouquets, cremation ashes, baby shoes, military medals, pet collars, pressed botanicals — into crystal-clear, museum-grade resin. Each piece is hand-poured, polished, and finished by our in-house artisans, resulting in an object that will remain unchanged for generations. We also craft custom resin-covered notebooks and wearable memorial jewelry: pendants, rings, and sets that let you carry a piece of someone you love wherever you go.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#F2F2F2', marginBottom: '20px' }}>Who we serve</h2>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85, marginBottom: '36px' }}>
            We work with anyone who has something irreplaceable they want to protect. Newlyweds preserving their wedding-day florals. Families honoring a loved one who has passed. Parents capturing a fleeting milestone — a first pair of shoes, a hospital bracelet, a lock of hair. Veterans honoring decades of service. Pet owners holding on to a collar or a tuft of fur. If it matters to you, it matters to us.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#F2F2F2', marginBottom: '20px' }}>Who builds it</h2>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85, marginBottom: '48px' }}>
            Unforgotten Pour was founded by a small team of artisans and designers who believe that physical objects carry emotional weight no photograph can replicate. Every order is handled personally — from intake to casting to final polish — by our studio team. We take on a limited number of commissions each month to ensure every piece receives the time and care it deserves. Our studio is based in Blacksburg, South Carolina, and we ship worldwide.
          </p>

          <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Start Your Order
          </Link>
        </div>
      </section>

      {/* Meet the Founder */}
      <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ background: '#111113', borderTop: '2px solid #C8681E', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 340px) 1fr', gap: '0' }} className="flex-col-mobile">
            {/* Founder photo */}
            <div style={{ position: 'relative', minHeight: '360px', background: '#161618' }}>
              <img src={FOUNDER_IMG} alt="Founder of Unforgotten Pour"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
            </div>

            {/* Founder bio */}
            <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Meet the Founder</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: '#F2F2F2', marginBottom: '24px', lineHeight: 1.2 }}>
                {FOUNDER_NAME}
              </h2>
              <div style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85 }}>
                {FOUNDER_BIO.map((p, i) => <p key={i} style={{ marginBottom: i < FOUNDER_BIO.length - 1 ? '16px' : '0' }}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}