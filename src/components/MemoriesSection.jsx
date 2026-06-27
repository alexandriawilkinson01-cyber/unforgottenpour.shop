const MEMORIES = [
  {
    quote: "I gave my mother's funeral bouquet to Unforgotten Pour two days after her service. I couldn't explain why — I just couldn't let it go. What came back was something I'll keep forever. It's the first thing I see when I wake up.",
    name: 'Diane M.',
    location: 'Nashville, TN',
    item: 'Funeral florals preserved in a resin orb',
    initial: 'D',
  },
  {
    quote: "My wedding bouquet sat in a box for three years because I didn't know what to do with it. Now it lives in our hallway, exactly as it looked on the best day of my life. People stop and ask about it every single time.",
    name: 'Lauren H.',
    location: 'Savannah, GA',
    item: 'Bridal bouquet in crystal resin block',
    initial: 'L',
  },
  {
    quote: "We sent in my grandfather's Purple Heart and his dog tags. I was nervous the whole time. When the piece arrived, I sat with it for a long time. He's been gone 12 years and this is the closest I've felt to him since.",
    name: 'James R.',
    location: 'Richmond, VA',
    item: 'Military medals in shadow display',
    initial: 'J',
  },
  {
    quote: "My daughter's first shoes — the tiny ones she wore home from the hospital — are now encased in a beautiful resin block on her shelf. She's seven now and she already knows they're special. That's everything.",
    name: 'Priya S.',
    location: 'Charlotte, NC',
    item: 'Baby shoes in engraved keepsake block',
    initial: 'P',
  },
  {
    quote: "After our dog passed, we sent in her collar and a few tufts of fur. I didn't know if it would help. It helped. I can hold it. I can look at it. It doesn't make the loss smaller, but it makes it feel less gone.",
    name: 'Marcus T.',
    location: 'Atlanta, GA',
    item: 'Pet memorial resin orb',
    initial: 'M',
  },
  {
    quote: "My grandmother wore the same corsage to every family reunion for 30 years. When she passed, we pressed the last ones and sent them in. She would have laughed and loved it in equal measure.",
    name: 'Celeste W.',
    location: 'New Orleans, LA',
    item: 'Pressed corsage florals in resin pendant',
    initial: 'C',
  },
];

export default function MemoriesSection() {
  return (
    <section style={{ background: '#F0EBE3', padding: '100px 24px', borderTop: '1px solid rgba(26,26,26,0.05)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '72px', maxWidth: '560px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '20px' }}>Customer Memories</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
            In their own words.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(26,26,26,0.4)', lineHeight: 1.7 }}>
            The pieces we make are only half the story. Here's what our customers said when they arrived home.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px' }}>
          {MEMORIES.map((m, i) => (
            <div key={i} style={{ background: '#FFFFFF', padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '28px', borderTop: i < 3 ? '2px solid rgba(196,141,74,0.25)' : '2px solid transparent' }}>
              {/* Quote mark */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M0 20V12.5C0 5.6 4.2 1.4 12.6 0L13.4 1.8C9.4 2.6 7 5 6.4 8.4H11.2V20H0ZM16.8 20V12.5C16.8 5.6 21 1.4 29.4 0L30.2 1.8C26.2 2.6 23.8 5 23.2 8.4H28V20H16.8Z" fill="#C8681E" fillOpacity="0.4"/>
              </svg>

              {/* Quote */}
              <p style={{ fontSize: '15px', color: 'rgba(26,26,26,0.7)', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
                "{m.quote}"
              </p>

              {/* Footer */}
              <div style={{ borderTop: '1px solid rgba(26,26,26,0.06)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '999px', background: 'rgba(196,141,74,0.15)', border: '1px solid rgba(196,141,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#C48D4A', fontWeight: 600 }}>{m.initial}</span>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px' }}>{m.name}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(26,26,26,0.3)', marginBottom: '4px' }}>{m.location}</p>
                  <p style={{ fontSize: '11px', color: '#C48D4A', letterSpacing: '0.05em' }}>{m.item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}