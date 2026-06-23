export default function StorySection() {
  return (
    <section style={{ background: '#FAF8F5', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <img src="https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/cb7f3eb6a_optimized-df404ac9-7888-46cb-b538-26cc32f7d3cd.webp" alt=""
        style={{ position: 'absolute', right: '-120px', top: '50%', transform: 'translateY(-50%)', width: '520px', height: '520px', objectFit: 'cover', opacity: 0.06, borderRadius: '50%', filter: 'blur(2px)' }} />
      <svg width="180" height="320" viewBox="0 0 180 320" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.05 }} fill="none" stroke="#C8681E" strokeWidth="1">
        <path d="M90 320 L90 10" /><path d="M90 280 C50 270, 30 240, 30 210 C30 200, 35 195, 40 195 C55 195, 65 215, 90 225" />
        <path d="M90 220 C130 210, 150 180, 150 150 C150 140, 145 135, 140 135 C125 135, 115 155, 90 165" />
        <path d="M90 160 C50 150, 30 120, 30 90 C30 80, 35 75, 40 75 C55 75, 65 95, 90 105" />
        <path d="M90 100 C130 90, 150 60, 150 30 C150 20, 145 15, 140 15 C125 15, 115 35, 90 45" />
      </svg>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: '10%', bottom: '5%', opacity: 0.04 }} fill="none" stroke="#2A2A28" strokeWidth="1">
        <circle cx="60" cy="60" r="55" /><circle cx="60" cy="60" r="40" /><circle cx="60" cy="60" r="25" /><circle cx="60" cy="60" r="10" />
      </svg>
      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '28px' }}>The Problem</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#2A2A28', lineHeight: 1.2, marginBottom: '28px' }}>
          Memories fade.<br />Objects deteriorate.<br />Time doesn't wait.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(42,42,40,0.6)', lineHeight: 1.75 }}>
          That wedding bouquet dries and crumbles within weeks. The championship jersey yellows in a closet. Your grandmother's brooch tarnishes in a drawer nobody opens. The physical things that anchor our most important memories are quietly disappearing.
        </p>

        <div style={{ margin: '60px 0', height: '1px', background: 'rgba(42,42,40,0.1)' }} />

        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '28px' }}>The Solution</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#2A2A28', lineHeight: 1.2, marginBottom: '28px' }}>
          Resin stops time.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(42,42,40,0.6)', lineHeight: 1.75 }}>
          Crystal-clear, museum-grade resin encapsulation preserves organic and inorganic materials indefinitely. No fading, no deterioration, no decay. Your object suspended in perfect clarity, exactly as it was on the day it mattered most.
        </p>
      </div>
    </section>
  );
}