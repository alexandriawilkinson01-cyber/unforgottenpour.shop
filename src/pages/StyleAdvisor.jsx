import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { base44 } from '@/api/base44Client';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import MessageBubble from '../components/agent/MessageBubble';

export default function StyleAdvisor() {
  useMetaDescription(
    'Chat with the Unforgotten Pour Style Advisor to get personalized resin product recommendations based on your keepsake, display style, and budget.'
  );
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Load or create conversation on mount
  useEffect(() => {
    (async () => {
      try {
        const existing = await base44.agents.listConversations({ agent_name: 'style_advisor' });
        if (existing && existing.length > 0) {
          setConversation(existing[0]);
          setMessages(existing[0].messages || []);
        } else {
          const conv = await base44.agents.createConversation({
            agent_name: 'style_advisor',
            metadata: { name: 'Style Advisor', description: 'Personalized resin product recommendations' },
          });
          setConversation(conv);
          setMessages(conv.messages || []);
        }
      } catch (err) {
        console.error('Failed to init conversation:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!conversation?.id) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages((prev) => {
        const server = data.messages || [];
        const pending = prev.filter(
          (m) => m.optimistic && !server.some((s) => s.role === m.role && s.content === m.content)
        );
        return [...server, ...pending];
      });
    });
    return () => unsubscribe();
  }, [conversation?.id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || !conversation) return;
    const optimisticId = `optimistic-${Date.now()}`;
    setInput('');
    setSending(true);
    setMessages(prev => [...prev, { id: optimisticId, role: 'user', content: text, optimistic: true }]);
    try {
      const updated = await base44.agents.addMessage(conversation, { role: 'user', content: text });
      setConversation(updated);
      if (updated?.messages) {
        setMessages((prev) => {
          const pending = prev.filter(
            (m) => m.optimistic && !updated.messages.some((s) => s.role === m.role && s.content === m.content)
          );
          return [...updated.messages, ...pending];
        });
      }
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== optimisticId));
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const SUGGESTIONS = [
    "I want to preserve my wedding bouquet",
    "I'm looking for a memorial piece for a loved one's ashes",
    "Something for my dog's collar and fur",
    "I have a $150 budget, what do you suggest?",
  ];

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '100px 24px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '10px' }}>Style Advisor</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#F2F2F2', marginBottom: '6px' }}>Find your perfect piece</h1>
        <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.68)', marginBottom: '32px' }}>
          Tell us what you'd like to preserve and how you'd like to keep it. We'll recommend the resin piece that fits your style and budget.
        </p>

        <div ref={scrollRef} data-scroll-container style={{ flex: 1, minHeight: '300px', maxHeight: '52vh', overflowY: 'auto', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch', paddingRight: '8px', marginBottom: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="w-7 h-7 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" style={{ margin: '0 auto' }} />
            </div>
          ) : messages.length === 0 ? (
            <div>
              <div style={{ background: '#1A1A1E', border: '1px solid rgba(242,242,242,0.06)', borderRadius: '16px 16px 16px 4px', padding: '14px 18px', fontSize: '14px', lineHeight: 1.7, color: 'rgba(242,242,242,0.85)' }}>
                Hi! I'm your Unforgotten Pour style advisor. I'd love to help you find the perfect way to preserve what matters most. What are you looking to preserve, and how would you like to keep it?
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => setInput(s)} style={{ background: '#111113', border: '1px solid rgba(242,242,242,0.12)', borderRadius: '999px', padding: '9px 16px', fontSize: '12px', color: 'rgba(242,242,242,0.75)', cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, idx) => <MessageBubble key={idx} message={m} />)
          )}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#111113', border: '1px solid rgba(242,242,242,0.1)', borderRadius: '999px', padding: '8px 8px 8px 20px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe what you'd like to preserve..."
            disabled={sending}
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#F2F2F2', fontSize: '14px', fontFamily: "'Inter Tight', sans-serif" }}
          />
          <button type="submit" disabled={sending || !input.trim()} style={{ background: sending ? 'rgba(200,104,30,0.5)' : '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', padding: '10px 22px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer' }}>
            {sending ? 'Sending' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}