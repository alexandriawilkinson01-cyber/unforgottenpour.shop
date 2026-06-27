import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await base44.entities.ContactSubmission.list('-created_date', 200);
      setSubmissions(res);
    } catch (err) {
      console.error('Failed to load contact submissions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this submission? This cannot be undone.')) return;
    try {
      await base44.entities.ContactSubmission.delete(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C47B6D', marginBottom: '8px' }}>Inquiries</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700 }}>Contact Form Submissions</h2>
        </div>
        <span style={{ background: '#FFFFFF', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', color: 'rgba(74,59,63,0.6)' }}>
          {submissions.length} total
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#FFFFFF' }}>
          <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" style={{ margin: '0 auto' }} />
        </div>
      ) : submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#FFFFFF' }}>
          <p style={{ color: 'rgba(74,59,63,0.4)', fontSize: '15px' }}>No contact submissions yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {submissions.map(s => (
            <div key={s.id} style={{ background: '#FFFFFF', border: '1px solid rgba(74,59,63,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
              <div
                onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.email_sent ? '#4ade80' : '#ef4444', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '14px', color: '#4A3B3F', marginBottom: '2px' }}>{s.name}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(74,59,63,0.4)' }}>{s.email} · {formatDate(s.created_date)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {!s.email_sent && (
                    <span style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(239,68,68,0.12)', color: '#ef4444', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
                      Email Failed
                    </span>
                  )}
                  <span style={{ fontSize: '18px', color: 'rgba(74,59,63,0.3)' }}>
                    {expandedId === s.id ? '−' : '+'}
                  </span>
                </div>
              </div>
              {expandedId === s.id && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(74,59,63,0.06)' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(74,59,63,0.7)', lineHeight: 1.75, marginTop: '20px' }}>{s.message}</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <a href={`mailto:${s.email}`} style={{ display: 'inline-block', background: '#C47B6D', color: '#fff', borderRadius: '999px', padding: '10px 24px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
                      Reply via Email
                    </a>
                    <button onClick={() => handleDelete(s.id)} style={{ background: 'transparent', color: 'rgba(239,68,68,0.7)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '999px', padding: '10px 24px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}