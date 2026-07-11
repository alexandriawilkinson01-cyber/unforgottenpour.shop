import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    title: 'Memorial Keepsakes',
    desc: 'Preserve ashes, funeral flowers, and keepsakes in resin orbs and display blocks.',
    link: '/memorial',
    cta: 'Explore Memorial',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/0ca7489d4_optimized-53e2d4d9-1b21-47bb-ad2d-34ed75b18430.webp',
    from: 50,
  },
  {
    title: 'Memorial Jewelry',
    desc: 'Sterling silver pendants, rings, and earrings holding ashes or fingerprints.',
    link: '/jewelry',
    cta: 'Shop Jewelry',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/6e00c1bce_f238f981-0091-4479-88cf-4a815244664c.png',
    from: 209,
  },
  {
    title: 'Resin Notebooks',
    desc: 'Handcrafted A5 journals with pressed botanicals and gold leaf under crystal-clear resin.',
    link: '/notebooks',
    cta: 'View Notebooks',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/1df70194a_Firefly_GeminiFlash_customresin4notebooks522599.png',
    from: 100,
  },
  {
    title: 'Globes & Display Blocks',
    desc: 'Crystal-clear resin globes, hearts, hexagons, and ornaments in every size.',
    link: '/pricing',
    cta: 'See All Pricing',
    img: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/90808d596_generated_image.png',
    from: 50,
  },
];

export default function ProductCategoriesSection() {
  return (
    <section style={{ background: '#0A0A0C', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Find Your Format</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '16px' }}>
            What would you like<br />to preserve?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Choose a format below to get started — or browse the full portfolio for inspiration.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={cat.link} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', overflow: 'hidden', background: '#111113', minHeight: '380px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#161618'} onMouseLeave={e => e.currentTarget.style.background='#111113'}>
                  <img src={cat.img} alt={cat.title}
                    style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, top: '200px', background: 'linear-gradient(to top, #111113 40%, transparent 100%)' }} />
                  <div style={{ position: 'relative', marginTop: '-60px', zIndex: 2, padding: '0 28px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#F2F2F2' }}>{cat.title}</h3>
                      <span style={{ fontSize: '11px', color: 'rgba(242,242,242,0.35)' }}>from ${cat.from}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.65, marginBottom: '20px' }}>{cat.desc}</p>
                    <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8681E', fontWeight: 600 }}>
                      {cat.cta} →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}