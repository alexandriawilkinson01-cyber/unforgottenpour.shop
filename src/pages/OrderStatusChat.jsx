import { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const AGENT_NAME = 'order_status_assistant';

export default function OrderStatusChat() {
  useMetaDescription(
    'Track your Unforgotten Pour order status — chat with our assistant using your order reference number for real-time updates on your resin preservation piece.'
  );
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const conversations = await base44.agents.listConversations({ agent_name: AGENT_NAME });
        if (conversations && conversations.length > 0) {
          const conv = conversations[0];
          setConversationId(conv.id);
          setMessages(conv.messages || []);
        } else {
          const conv = await base44.agents.createConversation({
            agent_name: AGENT_NAME,
            metadata: { name: 'Order Status Chat', description: 'Check order status' },
          });
          setConversationId(conv.id);
          setMessages(conv.messages || []);
        }
      } catch (err) {
        console.error('Failed to init conversation:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversationId, (data) => {
      setMessages(data.messages || []);
      setSending(false);
    });
    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !conversationId || sending) return;
    const userMsg = input.trim();
    setInput('');
    setSending(true);
    try {
      const conv = await base44.agents.getConversation(conversationId);
      await base44.agents.addMessage(conv, { role: 'user', content: userMsg });
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0C', color: '#F2F2F2', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '720px', width: '100%', margin: '0 auto', padding: '120px 24px 40px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '12px' }}>Order Tracking</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, marginBottom: '8px' }}>Check Your Order Status</h1>
        <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.45)', marginBottom: '32px' }}>
          Ask about your order — provide your order reference number or the email you used at checkout.
        </p>

        {/* Chat area */}
        <div style={{ flex: 1, minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" style={{ margin: '0 auto' }} />
            </div>
          ) : (
            <>
              {messages.length === 0 && (
                <div style={{ background: '#111113', padding: '24px', borderRadius: '12px', border: '1px solid rgba(242,242,242,0.06)' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.6)', lineHeight: 1.6 }}>
                    Hi! I'm here to help you track your order. Just share your order reference number or the email you used when placing your order, and I'll look it up for you.
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '80%',
                      background: isUser ? '#C8681E' : '#111113',
                      color: isUser ? '#fff' : '#F2F2F2',
                      padding: '14px 20px',
                      borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      border: isUser ? 'none' : '1px solid rgba(242,242,242,0.06)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                    }}>
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <>
                          <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none">{msg.content || ''}</ReactMarkdown>
                          {msg.tool_calls?.map((tc, i) => (
                            <div key={i} style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(242,242,242,0.35)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {tc.status === 'running' || tc.status === 'pending' || tc.status === 'in_progress' ? '⏳' :
                               tc.status === 'failed' || tc.status === 'error' ? '⚠️' : '✓'}
                              {tc.display_projection?.label || tc.display_projection?.active_label || tc.name}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {sending && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: '#111113', padding: '14px 20px', borderRadius: '4px 16px 16px 16px', border: '1px solid rgba(242,242,242,0.06)' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', background: 'rgba(242,242,242,0.3)', borderRadius: '50%', animation: 'bounce 1s infinite' }} />
                      <span style={{ width: '6px', height: '6px', background: 'rgba(242,242,242,0.3)', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }} />
                      <span style={{ width: '6px', height: '6px', background: 'rgba(242,242,242,0.3)', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading || sending}
            style={{ flex: 1, background: '#111113', border: '1px solid rgba(242,242,242,0.1)', borderRadius: '999px', padding: '14px 20px', color: '#F2F2F2', fontSize: '14px', outline: 'none' }}
          />
          <button
            onClick={handleSend}
            disabled={loading || sending || !input.trim()}
            style={{ background: '#C8681E', color: '#fff', border: 'none', borderRadius: '999px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: loading || sending || !input.trim() ? 'not-allowed' : 'pointer', opacity: loading || sending || !input.trim() ? 0.5 : 1 }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
    </div>
  );
}