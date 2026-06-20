const STORIES = [
  {
    name: 'The Hartley Garden Wedding',
    location: 'Savannah, GA · June 2023',
    category: 'Wedding Florals',
    image: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/e3b0d5720_optimized-c74e8c31-759e-4744-80ef-b6034f08f266.webp',
    memory: 'Claire\'s ceremony bouquet was a riot of color — garden roses, lavender sprigs, wild purple larkspur, yellow buttercups, and delicate white buds. She wanted every stem preserved exactly as it was on the morning of her wedding.',
    preserved: 'Each flower was individually dried and arranged to mirror the original bouquet. We cast the full collection into a large round orb, now displayed on their marble mantle — a permanent bloom that will never fade.',
    format: 'Resin Orb',
    time: '10 weeks',
  },
  {
    name: 'The Calloway Bridal Bouquet',
    location: 'Charleston, SC · October 2023',
    category: 'Wedding Florals',
    image: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/cb7f3eb6a_optimized-df404ac9-7888-46cb-b538-26cc32f7d3cd.webp',
    memory: 'Anna carried a soft, romantic bouquet of blush roses, white ranunculus, wax flowers, and eucalyptus. The day after her wedding she reached out to us — she couldn\'t bear the thought of watching it wither.',
    preserved: 'We dried and arranged every stem in their original groupings, then cast them into a round orb. Anna now keeps it on her kitchen table as a daily reminder of that morning — the same hand that holds it still wears the ring.',
    format: 'Resin Orb',
    time: '9 weeks',
  },
  {
    name: 'Mia Rose\'s First Shoes',
    location: 'Charlotte, NC · October 2021',
    category: 'Milestone Keepsake',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/b72be2d5-7e0a-422a-9fdb-dafda1a53c4a.png',
    memory: 'Mia\'s grandmother hand-knitted these booties before she was born. They were worn twice — once home from the hospital, once for a first family photo. Her parents wanted them kept exactly as they were, forever.',
    preserved: 'The booties were gently cleaned and positioned inside a clear resin block, with an engraved brass nameplate reading "MIA ROSE · Born Oct 12, 2021 ♥". Every stitch is visible. It will be hers one day.',
    format: 'Engraved Block',
    time: '7 weeks',
  },
  {
    name: 'In Memory of Thomas',
    location: 'Atlanta, GA · March 2024',
    category: 'Memorial Keepsake',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/53e2d4d9-1b21-47bb-ad2d-34ed75b18430.png',
    memory: 'After losing her husband of 41 years, Margaret wanted something she could hold. Not a photo, not an urn — something quiet and beautiful that carried a part of him into every room.',
    preserved: 'A portion of Thomas\'s ashes were gently folded into crystal-clear resin and cast into a smooth orb, set on a turned walnut base. The piece sits on their shared bedside table — present, peaceful, permanent.',
    format: 'Ash Orb on Walnut Stand',
    time: '6 weeks',
  },
];

export default function StoriesSection() {
  return (
    <section style={{ background: '#0A0A0C', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>Real Memories, Preserved Forever</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2 }}>
            Stories from our studio.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.4)', marginTop: '16px', maxWidth: '480px', lineHeight: 1.7 }}>
            Every piece begins as a story. Here are a few of the memories we have been trusted to preserve for a lifetime.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {STORIES.map((story, i) => (
            <div key={story.name} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '420px 1fr' : '1fr 420px', background: '#111113', overflow: 'hidden' }}
              className="flex-col-mobile">
              {/* Image */}
              <div style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative', minHeight: '320px' }}>
                <img src={story.image} alt={story.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '320px' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #111113)' }} />
                <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(200,104,30,0.85)', color: '#fff', padding: '5px 12px', borderRadius: '999px' }}>
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.3)', marginBottom: '12px' }}>{story.location}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#F2F2F2', marginBottom: '24px', lineHeight: 1.25 }}>
                  {story.name}
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '10px' }}>The Memory</p>
                  <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.75 }}>{story.memory}</p>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '10px' }}>How We Preserved It</p>
                  <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.55)', lineHeight: 1.75 }}>{story.preserved}</p>
                </div>

                <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.3)', marginBottom: '4px' }}>Format</p>
                    <p style={{ fontSize: '13px', color: '#F2F2F2', fontWeight: 500 }}>{story.format}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.3)', marginBottom: '4px' }}>Turnaround</p>
                    <p style={{ fontSize: '13px', color: '#F2F2F2', fontWeight: 500 }}>{story.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}