const TRUST_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#C8681E" stroke="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
    title: 'New Studio, Personal Care',
    sub: 'Every piece made by hand',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8681E" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '4-6 Week Turnaround',
    sub: 'Packing kit shipped in 24 hrs',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8681E" strokeWidth="1.8">
        <path d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z" />
      </svg>
    ),
    title: 'Insured Shipping',
    sub: 'Both ways, fully tracked',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8681E" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    title: 'Photos Throughout',
    sub: 'See your item at every stage',
  },
];

export default function TrustStrip() {
  return (
    <div style={{ background: '#111113', border: '1px solid rgba(200,104,30,0.2)', borderRadius: '8px', padding: '24px 28px', marginBottom: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px' }}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(200,104,30,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#F2F2F2', lineHeight: 1.3 }}>{item.title}</p>
              <p style={{ fontSize: '11px', color: 'rgba(242,242,242,0.67)', marginTop: '2px' }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}