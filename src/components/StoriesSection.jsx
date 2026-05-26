const STORIES = [
  {
    name: 'The Calloway Wedding',
    location: 'Savannah, GA · June 2023',
    category: 'Wedding Florals',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/c74e8c31-759e-4744-80ef-b6034f08f266.png',
    memory: 'Emily carried 47 garden roses and eucalyptus — gathered the morning of her wedding from her late grandmother\'s garden. The bouquet had been in the family for three generations of weddings.',
    preserved: 'We pressed and dried each stem individually over six weeks, then cast them in a large oval orb. The finished piece sits on their mantle, exactly as it looked when Emily walked down the aisle.',
    format: 'Resin Orb',
    time: '10 weeks',
  },
  {
    name: 'Sergeant David Reyes',
    location: 'Richmond, VA · March 2024',
    category: 'Legacy Pieces',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/df404ac9-7888-46cb-b538-26cc32f7d3cd.png',
    memory: 'After his father passed, Marcus inherited a Purple Heart, two service ribbons, and a folded flag — stored in a shoebox for 40 years. He wanted his children to see them, not just hear about them.',
    preserved: 'Each medal was individually cleaned and mounted in a custom shadow box inlay. The flag was folded and set behind UV-protective resin. The piece is now the centerpiece of their living room.',
    format: 'Shadow Box',
    time: '6 weeks',
  },
  {
    name: 'Baby Nora\'s First Year',
    location: 'Charlotte, NC · January 2024',
    category: 'Milestone Artifacts',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/b72be2d5-7e0a-422a-9fdb-dafda1a53c4a.png',
    memory: 'Nora\'s parents sent us her hospital wristband, her first pair of shoes (worn exactly twice), and a lock of hair from her first haircut. Three tiny objects. Three enormous firsts.',
    preserved: 'We arranged all three items in a single clear block with an engraved nameplate: "Nora · Born February 4, 2023." Every item is visible from all sides. It will be hers when she turns 18.',
    format: 'Engraved Block',
    time: '8 weeks',
  },
  {
    name: 'In Memory of Rose',
    location: 'Atlanta, GA · August 2023',
    category: 'Memorial Keepsake',
    image: 'https://pub-629428d185ca4960a0a73c850d32294b.r2.dev/company_126549/images/53e2d4d9-1b21-47bb-ad2d-34ed75b18430.png',
    memory: 'The Hendersons brought us flowers from their mother\'s funeral service — white lilies and baby\'s breath. They also included a small handwritten note she had left them years before.',
    preserved: 'The flowers were dried and encapsulated in a soft orb. The note was photographed, printed on archival paper, and sealed beneath a separate resin layer. Both pieces sit together on a walnut stand.',
    format: 'Orb + Keepsake Set',
    time: '12 weeks',
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