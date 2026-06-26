import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    number: '01',
    title: 'Ship Your Items',
    body: 'Carefully pack the flowers, ashes, keepsake, or object you want preserved and mail it to our studio. We accept fresh florals, dried botanicals, cremation ashes, jewelry, fabric, soil, sand, and almost any small sentimental item. We provide detailed packing guidelines with every order confirmation to ensure your items arrive safely.',
  },
  {
    number: '02',
    title: 'We Dry & Prepare',
    body: 'Upon arrival, your items are catalogued, photographed, and assigned to a dedicated artisan. Florals are freeze-dried or silica-dried over one to three weeks to remove all moisture without losing color or form. Ashes are carefully weighed and prepared for infusion. Every object is handled with archival-grade care from the moment it enters our studio.',
  },
  {
    number: '03',
    title: 'Casting & Curing',
    body: 'Your preserved items are hand-arranged inside custom molds and encapsulated in multiple layers of optical-clarity, UV-resistant resin. Each pour is allowed to cure fully before the next layer is added — a process that can take up to two weeks — to eliminate bubbles and ensure the piece remains clear and stable for generations.',
  },
  {
    number: '04',
    title: 'Finishing & Delivery',
    body: 'Once fully cured, every piece is wet-sanded through progressive grits and brought to a high-gloss polish by hand. Engraving, base mounting, or chain setting is completed in this final stage. Your finished piece is packed in a keepsake gift box with a certificate of authenticity and shipped back to you with full insurance.',
  },
];

const FAQS = [
  {
    q: 'What items can you preserve in resin?',
    a: 'We work with wedding and funeral florals, cremation ashes, pet fur or ashes, baby shoes and clothing, umbilical cords, soil or sand from meaningful places, military medals and patches, pressed botanicals, and more. If you are unsure whether your item qualifies, contact us before shipping.',
  },
  {
    q: 'How long does the process take?',
    a: 'Turnaround varies by tier and current studio volume. Jewelry and small keepsake pieces typically take 6–10 weeks. Orbs and mid-size displays take 8–12 weeks. Large custom sculptures take 10–16 weeks. Rush options are available on select tiers — inquire when placing your order.',
  },
  {
    q: 'Will my preserved piece last forever?',
    a: 'When kept out of direct sunlight and stored at normal room temperature, a properly cast resin piece will remain clear and stable for well over 100 years. We use only UV-stabilised, optical-grade resin formulations. Each piece also carries our lifetime guarantee against yellowing or structural failure under normal conditions.',
  },
  {
    q: 'Can I include more than one type of item?',
    a: 'Yes — many clients choose to combine ashes with flowers from a memorial service, or mix botanicals from a wedding bouquet with a pinch of soil from a meaningful location. We accommodate multi-material casts at no extra charge provided all items fit within the chosen format dimensions.',
  },
  {
    q: 'What happens if my items are damaged in transit?',
    a: 'We recommend insuring your outbound shipment. Once items are received by our studio we assume full responsibility. In the rare event of studio damage, we will work with you to find an alternative solution or issue a full refund.',
  },
];

export default function HowItWorks() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', padding: '140px 24px 60px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>
          The Unforgotten Pour Process
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', maxWidth: '820px', margin: '0 auto 24px' }}>
          How we turn your memories into permanent, handcrafted resin keepsakes
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.5)', maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.8 }}>
          Unforgotten Pour is a boutique preservation studio that encapsulates flowers, cremation ashes, personal objects, and botanicals into optical-clarity resin jewelry, orbs, paperweights, and custom art pieces. Every order is handled personally by our studio artisans — no factories, no shortcuts. Below is a detailed walkthrough of our four-stage process, from the moment you ship your items to the day your finished piece arrives back at your door.
        </p>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {STEPS.map((step) => (
            <div key={step.number} style={{ background: '#111113', padding: '44px 48px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 700, color: '#C8681E', lineHeight: 1, opacity: 0.7 }}>
                {step.number}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#F2F2F2', marginBottom: '14px' }}>
                  {step.title}
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.85 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Common Questions</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#F2F2F2' }}>
            Frequently asked questions
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {FAQS.map((faq) => (
            <div key={faq.q} style={{ background: '#111113', padding: '32px 40px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#F2F2F2', marginBottom: '12px' }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.8 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '60px 24px 100px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2F2F2', marginBottom: '20px' }}>
          Ready to begin?
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.45)', marginBottom: '36px', lineHeight: 1.7 }}>
          Start your order today — we'll guide you through every step.
        </p>
        <Link to="/order" style={{ display: 'inline-block', background: '#C8681E', color: '#fff', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
          Start My Order
        </Link>
      </section>
    </div>
  );
}