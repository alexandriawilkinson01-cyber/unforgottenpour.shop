import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import { Send, RefreshCw, ExternalLink, Loader2, Check } from 'lucide-react';

export default function InstagramComments() {
  const [authed, setAuthed] = useState(null);
  const [comments, setComments] = useState([]);
  const [igUsername, setIgUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(null);
  const [edits, setEdits] = useState({});

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (ok) => {
      if (!ok) { setAuthed(false); setLoading(false); return; }
      const me = await base44.auth.me();
      setAuthed(me);
      if (me.role !== 'admin') { setLoading(false); return; }
      fetchComments();
    });
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke('instagramComments', { action: 'list' });
      setComments(res.data?.comments || []);
      setIgUsername(res.data?.ig_username || '');
      setEdits({});
    } catch (e) {
      console.error('Fetch failed', e);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId) => {
    const message = edits[commentId];
    if (!message?.trim()) return;
    setReplying(commentId);
    try {
      await base44.functions.invoke('instagramComments', { action: 'reply', commentId, message: message.trim() });
      setComments(prev => prev.filter(c => c.id !== commentId));
      setEdits(prev => { const n = { ...prev }; delete n[commentId]; return n; });
    } catch (e) {
      alert('Failed to post reply. Please try again.');
    } finally {
      setReplying(null);
    }
  };

  if (!authed) {
    return (
      <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#F2F2F2', marginBottom: '16px' }}>Admin Access Required</h1>
          <p style={{ color: 'rgba(242,242,242,0.5)', marginBottom: '24px' }}>You need to be logged in as an admin to manage Instagram comments.</p>
          <Link to="/login" style={{ color: '#C8681E', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sign In →</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '8px' }}>Social Engagement</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700 }}>Instagram Comments</h1>
            {igUsername && <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.4)', marginTop: '4px' }}>@{igUsername}</p>}
          </div>
          <button onClick={fetchComments} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(242,242,242,0.2)', color: '#F2F2F2', padding: '10px 20px', borderRadius: '999px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#C8681E', margin: '0 auto' }} />
            <p style={{ marginTop: '16px', color: 'rgba(242,242,242,0.4)', fontSize: '14px' }}>Fetching comments and generating AI suggestions…</p>
          </div>
        )}

        {/* Empty */}
        {!loading && comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'rgba(242,242,242,0.4)', fontSize: '16px' }}>No comments found on your recent posts.</p>
          </div>
        )}

        {/* Comments list */}
        {!loading && comments.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {comments.map((c) => (
              <div key={c.id} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Post context */}
                <div style={{ display: 'flex', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                  {c.post.media_url && (
                    <img src={c.post.media_url} alt="Post" style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
                  )}
                  <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.45)', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {c.post.caption || 'No caption'}
                  </p>
                  {c.post.permalink && (
                    <a href={c.post.permalink} target="_blank" rel="noopener noreferrer" style={{ color: '#C8681E', flexShrink: 0 }}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {/* Comment */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#F2F2F2' }}>@{c.username}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)' }}>
                      {new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.8)', lineHeight: 1.6, marginBottom: '20px' }}>{c.text}</p>

                  {/* AI suggestion */}
                  {c.suggested_reply && (
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '8px' }}>✦ AI-Suggested Reply</p>
                      <textarea
                        rows={3}
                        value={edits[c.id] ?? c.suggested_reply}
                        onChange={(e) => setEdits(prev => ({ ...prev, [c.id]: e.target.value }))}
                        style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(200,104,30,0.06)', border: '1px solid rgba(200,104,30,0.25)', borderRadius: '6px', padding: '12px 14px', color: '#F2F2F2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'Inter Tight, sans-serif', lineHeight: 1.6 }}
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleReply(c.id)}
                      disabled={replying === c.id || !edits[c.id]?.trim()}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: replying === c.id ? 'rgba(200,104,30,0.5)' : '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '10px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: replying === c.id ? 'not-allowed' : 'pointer', opacity: !edits[c.id]?.trim() ? 0.6 : 1 }}
                    >
                      {replying === c.id ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      {replying === c.id ? 'Posting…' : 'Approve & Reply'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}