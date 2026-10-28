export default function StorySection() {
  return (
    <section style={{ background: '#0A0A0C', padding: '100px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '28px' }}>The Problem</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '28px' }}>
          Memories fade.<br />Objects deteriorate.<br />Time doesn't wait.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.75 }}>
          That wedding bouquet dries and crumbles within weeks. The championship jersey yellows in a closet. Your grandmother's brooch tarnishes in a drawer nobody opens. The physical things that anchor our most important memories are quietly disappearing.
        </p>

        <div style={{ margin: '60px 0', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '28px' }}>The Solution</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '28px' }}>
          Resin stops time.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.75 }}>
          Crystal-clear, museum-grade resin encapsulation preserves organic and inorganic materials indefinitely. No fading, no deterioration, no decay. Your object suspended in perfect clarity, exactly as it was on the day it mattered most.
        </p>
      </div>
    </section>
  );
}