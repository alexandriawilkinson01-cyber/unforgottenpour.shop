import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { base44 } from '@/api/base44Client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [days, setDays] = useState(30);

  const fetchData = async (rangeDays) => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('getAnalyticsData', { days: rangeDays });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(days);
  }, [days]);

  const fmtDate = (d) => {
    const y = d.substring(0, 4);
    const m = d.substring(4, 6);
    const day = d.substring(6, 8);
    return `${m}/${day}`;
  };

  const chartData = (data?.daily || []).map(d => ({
    date: fmtDate(d.date),
    Visitors: d.activeUsers,
    Sessions: d.sessions,
    PageViews: d.pageViews,
  }));

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '80px', padding: '140px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '16px' }}>Admin Dashboard</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '12px' }}>
          Daily Visitor Analytics
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(242,242,242,0.5)', marginBottom: '32px' }}>
          Track visitors across all parts of the website.
        </p>

        {/* Range selector */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setDays(d)}
              style={{
                padding: '8px 18px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                background: days === d ? '#C8681E' : 'rgba(255,255,255,0.05)',
                color: days === d ? '#fff' : 'rgba(242,242,242,0.6)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600,
              }}>
              {d} Days
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#C8681E', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.4)' }}>Loading analytics…</p>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(200,30,30,0.1)', border: '1px solid rgba(200,30,30,0.3)', borderRadius: '6px', padding: '20px 24px', marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', color: '#ff8888' }}>{error}</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2px', marginBottom: '48px' }}>
              {[
                { label: 'Total Visitors', value: data.totals.activeUsers, color: '#C8681E' },
                { label: 'Sessions', value: data.totals.sessions },
                { label: 'Page Views', value: data.totals.pageViews },
                { label: 'New Users', value: data.totals.newUsers },
              ].map(card => (
                <div key={card.label} style={{ background: '#111113', padding: '28px 24px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', marginBottom: '12px' }}>{card.label}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: card.color || '#F2F2F2' }}>{card.value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Daily visitors chart */}
            <div style={{ background: '#111113', padding: '32px 28px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Daily Visitors</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="date" stroke="rgba(242,242,242,0.4)" fontSize={11} />
                  <YAxis stroke="rgba(242,242,242,0.4)" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#1A1A1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px' }} />
                  <Line type="monotone" dataKey="Visitors" stroke="#C8681E" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Sessions" stroke="rgba(242,242,242,0.4)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Page views chart */}
            <div style={{ background: '#111113', padding: '32px 28px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Page Views by Day</h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="date" stroke="rgba(242,242,242,0.4)" fontSize={11} />
                  <YAxis stroke="rgba(242,242,242,0.4)" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#1A1A1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px' }} />
                  <Bar dataKey="PageViews" fill="#C8681E" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pages table */}
            <div style={{ background: '#111113', padding: '32px 28px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Visitors by Page</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', fontWeight: 600 }}>Page</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', fontWeight: 600 }}>Visitors</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', fontWeight: 600 }}>Sessions</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242,242,242,0.4)', fontWeight: 600 }}>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pages.slice(0, 50).map((p, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 16px', color: 'rgba(242,242,242,0.7)', fontFamily: 'monospace' }}>{p.path}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C8681E', fontWeight: 600 }}>{p.activeUsers.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: 'rgba(242,242,242,0.6)' }}>{p.sessions.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', color: 'rgba(242,242,242,0.6)' }}>{p.pageViews.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'rgba(242,242,242,0.3)', marginTop: '24px', textAlign: 'center' }}>
              Property: {data.property.displayName} ({data.property.id}) · {data.dateRange.startDate} → {data.dateRange.endDate}
            </p>
          </>
        )}
      </section>
    </div>
  );
}