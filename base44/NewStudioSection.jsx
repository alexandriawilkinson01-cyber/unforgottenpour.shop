export default function NewStudioSection() {
  return (
    <section style={{ background: '#0D0D10', padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '20px' }}>New Studio</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#F2F2F2', lineHeight: 1.2, marginBottom: '20px' }}>
          Small studio. Personal care.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(242,242,242,0.69)', lineHeight: 1.8 }}>
          Unforgotten Pour is a new, independent studio in South Carolina. Every piece is made by hand, and you will see photos of your keepsake at each stage.
          Not sure where to start? Send a message before you order and we will answer your questions.
        </p>
      </div>
    </section>
  );
}
