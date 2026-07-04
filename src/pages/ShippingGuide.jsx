import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CHECKLIST = [
  'Sturdy corrugated shipping box (new if possible)',
  'Bubble wrap or foam padding',
  'Acid-free tissue paper or parchment',
  'Zip-top bags for ashes, fur, or soil',
  'Packing tape and scissors',
  'Shipping label with tracking + insurance',
];

const STEPS = [
  {
    num: '01',
    title: 'Gather Your Materials',
    body: 'Use a new, sturdy corrugated box sized to your item with room for padding. Have bubble wrap, acid-free tissue paper, zip-top bags, and packing tape ready before you begin.',
  },
  {
    num: '02',
    title: 'Prep Fresh & Dried Florals',
    body: 'If your flowers are fresh, place them between sheets of acid-free tissue, gently cushion with bubble wrap, and ship within 48 hours of your event — or freeze and ship overnight on dry ice for best color retention. Dried botanicals can be layered in tissue and packed loosely so they are not crushed.',
  },
  {
    num: '03',
    title: 'Seal Ashes, Fur & Loose Material',
    body: 'Place cremation ashes, pet fur, soil, or sand in a sealed zip-top bag, then double-bag it. Label each bag clearly with your name and order number. For cremation ashes, use a sift-proof inner container inside the outer package.',
  },
  {
    num: '04',
    title: 'Wrap Keepsakes & Jewelry',
    body: 'Wrap small keepsakes — rings, baby shoes, medals, fabric — individually in tissue paper and then bubble wrap. Fragile items should be immobilized so they cannot shift inside the box during transit.',
  },
  {
    num: '05',
    title: 'Pack & Cushion',
    body: 'Line the bottom of your box with 2 inches of padding. Place your items in the center, fill all empty space with bubble wrap or foam so nothing moves, and add another 2 inches of padding on top. The box should be full enough that items stay put when shaken gently.',
  },
  {
    num: '06',
    title: 'Include Your Order Info',
    body: 'Place a note inside the box with your full name, order number, email, phone, and a brief description of what is enclosed. This helps us match your shipment to your order the moment it arrives.',
  },
  {
    num: '07',
    title: 'Seal, Label & Insure',
    body: 'Tape all seams securely with packing tape. Attach your shipping label and request tracking and insurance for the declared value of your items. Cremation ashes must ship via USPS Priority Mail Express only, clearly labeled "Human Remains" with Label 139 affixed.',
  },
  {
    num: '08',
    title: 'Ship & Notify Us',
    body: 'Drop off your package and email the tracking number to AlexandriaWilkinson01@gmail.com so we can watch for its arrival. We will confirm receipt and begin the preservation process right away.',
  },
];

const SPECIAL = [
  {
    title: 'Cremation Ashes',
    icon: '✦',
    rules: [
      'Must be shipped via USPS Priority Mail Express only — no other carrier is permitted.',
      'Seal ashes in a sift-proof inner container, then place inside a sturdy outer box.',
      'Affix USPS Label 139 (Cremated Remains) securely over the box seam.',
      'Clearly mark "Human Remains" on the exterior of the package.',
      'Visit your local Post Office or usps.com to obtain the proper shipping kit.',
    ],
  },
  {
    title: 'Fresh Wedding & Funeral Florals',
    icon: '❀',
    rules: [
      'Ship within 48 hours of your event for best results, or refrigerate (do not freeze) until shipping.',
      'Layer stems between acid-free tissue, wrap loosely in damp paper towels at the base, and cushion with bubble wrap.',
      'Ship overnight with a cold pack — never loose ice or dry ice in direct contact with petals.',
      'Call or email us before shipping so we can prepare to receive and process them immediately.',
    ],
  },
  {
    title: 'Pet Memorials',
    icon: '♥',
    rules: [
      'Fur clippings: place in a sealed zip-top bag, then double-bag and pad inside the box.',
      'Paw print impressions: allow to fully dry, then wrap in tissue and bubble wrap.',
      'Collar tags or small toys: wrap individually to prevent scratching.',
      'Include your pet\'s name on the order info note so we can personalize the piece.',
    ],
  },
];

export default function ShippingGuide() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', padding: '140px 24px 60px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Shipping Guide</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', maxWidth: '760px', margin: '0 auto 24px' }}>
          How to safely ship your sentimental items
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8 }}>
          Your keepsakes are irreplaceable. This guide walks you through packing and mailing flowers, ashes, and small mementos so they arrive at our studio in perfect condition.
        </p>
      </section>

      {/* Checklist */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.05)', padding: '40px 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '24px' }}>What You'll Need</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {CHECKLIST.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C8681E', fontSize: '14px' }}>✓</span>
                <span style={{ fontSize: '14px', color: 'rgba(242,242,242,0.7)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Step-by-Step</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700 }}>Packaging your items</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {STEPS.map(step => (
            <div key={step.num} style={{ background: '#111113', padding: '36px 44px', display: 'grid', gridTemplateColumns: '64px 1fr', gap: '28px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: '#C8681E', lineHeight: 1, opacity: 0.7 }}>{step.num}</div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#F2F2F2', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special handling */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Special Handling</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700 }}>Item-specific instructions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {SPECIAL.map(s => (
            <div key={s.title} style={{ background: '#111113', padding: '36px 44px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#F2F2F2', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C8681E', fontSize: '18px' }}>{s.icon}</span>{s.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {s.rules.map((r, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', fontSize: '14px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.8, borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#C8681E', flexShrink: 0, marginTop: '2px' }}>▪</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Address + CTA */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 100px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ background: '#111113', border: '1px solid rgba(200,104,30,0.3)', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Ship To</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#F2F2F2', marginBottom: '8px' }}>Unforgotten Pour Studio</h3>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.5)', marginBottom: '4px' }}>Blacksburg, South Carolina</p>
          <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.35)', marginBottom: '32px' }}>The exact shipping address is included in your order confirmation email.</p>
          <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Start My Order
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}