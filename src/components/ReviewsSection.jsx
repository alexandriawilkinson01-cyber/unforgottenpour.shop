import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'Charleston, SC',
    rating: 5,
    text: 'I sent in my wedding bouquet and received back something I can only describe as a work of art. The flowers look exactly as they did on our wedding day. I cry every time I look at it, in the best way.',
    item: 'Wedding Bouquet',
  },
  {
    name: 'James T.',
    location: 'Nashville, TN',
    rating: 5,
    text: "My father's military medals are now preserved in a beautiful resin block on my desk. The craftsmanship is extraordinary. Every detail is visible, protected forever. Worth every penny.",
    item: 'Military Medals',
  },
  {
    name: 'Diane R.',
    location: 'Atlanta, GA',
    rating: 5,
    text: "We preserved flowers from my mother's funeral. The finished piece sits on our mantle and brings us so much comfort. Unforgotten Pour handled everything with such care and sensitivity.",
    item: 'Memorial Florals',
  },
  {
    name: 'Marcus W.',
    location: 'Richmond, VA',
    rating: 5,
    text: "My son's first shoes are now in a paperweight on my office desk. I get asked about it constantly. The quality is museum-level, you'd never know it wasn't always meant to be displayed this way.",
    item: 'Baby Shoes',
  },
  {
    name: 'Elena V.',
    location: 'Charlotte, NC',
    rating: 5,
    text: 'The communication throughout the process was exceptional. They sent photos at every stage. The orb they created from my grandmother\'s rose garden clippings is absolutely breathtaking.',
    item: 'Garden Clippings',
  },
  {
    name: 'Tom B.',
    location: 'Greenville, SC',
    rating: 5,
    text: "Fast turnaround, beautiful packaging, and the finished piece exceeded my expectations. The resin is perfectly clear, no bubbles, no cloudiness. This is genuine craftsmanship.",
    item: 'Championship Trophy Fragment',
  },
];

const Stars = () => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8681E" stroke="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

export default function ReviewsSection() {
  return (
    <section style={{ background: '#0D0D10', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Customer Reviews</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '12px' }}>
            Trusted by families<br />
            <span style={{ color: 'rgba(242,242,242,0.35)' }}>across the country.</span>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C8681E" stroke="none">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '14px', color: 'rgba(242,242,242,0.5)' }}>5.0 · 200+ verified orders</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px' }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#111113', padding: '32px 28px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <Stars />
              <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.7)', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#F2F2F2', marginBottom: '2px' }}>{r.name}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(242,242,242,0.3)', letterSpacing: '0.04em' }}>{r.location}</p>
                </div>
                <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8681E', background: 'rgba(200,104,30,0.1)', padding: '4px 10px', borderRadius: '999px' }}>
                  {r.item}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}