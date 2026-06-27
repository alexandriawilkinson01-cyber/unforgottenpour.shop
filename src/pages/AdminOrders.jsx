import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContactSubmissions from '../components/ContactSubmissions';
import { base44 } from '@/api/base44Client';

const STATUS_STYLES = {
  new: { bg: 'rgba(255,184,0,0.12)', color: '#FFB800', label: 'New' },
  processing: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', label: 'Processing' },
  in_production: { bg: 'rgba(168,85,247,0.12)', color: '#c084fc', label: 'In Production' },
  shipped: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', label: 'Shipped' },
  delivered: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80', label: 'Delivered' },
};

const STATUS_OPTIONS = ['new', 'processing', 'in_production', 'shipped', 'delivered'];

export default function AdminOrders() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await base44.entities.Order.list('-created_date', 200);
      setOrders(res);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (!authed) {
        setAuthChecked(true);
        return;
      }
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me.role === 'admin') {
          await loadOrders();
        }
      } catch (err) {
        console.error('Auth error:', err);
      }
      setAuthChecked(true);
    });
  }, [loadOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await base44.entities.Order.update(orderId, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F4EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F4EF', color: '#1A1A1A' }}>
        <Navbar light />
        <div style={{ paddingTop: '140px', textAlign: 'center', padding: '140px 24px 80px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '16px' }}>Admin Access Required</h1>
          <p style={{ fontSize: '15px', color: 'rgba(26,26,26,0.5)', marginBottom: '32px' }}>Please log in with an admin account to view orders.</p>
          <button onClick={() => base44.auth.redirectToLogin('/admin/orders')}
            style={{ background: '#C48D4A', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F4EF', color: '#1A1A1A' }}>
        <Navbar light />
        <div style={{ paddingTop: '140px', textAlign: 'center', padding: '140px 24px 80px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '16px' }}>Access Denied</h1>
          <p style={{ fontSize: '15px', color: 'rgba(26,26,26,0.5)' }}>Your account doesn't have admin permissions.</p>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch = !search ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      o.product?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const newCount = orders.filter(o => o.status === 'new').length;
  const inProgressCount = orders.filter(o => ['processing', 'in_production'].includes(o.status)).length;
  const completedCount = orders.filter(o => o.status === 'delivered').length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F4EF', color: '#1A1A1A' }}>
      <Navbar light />

      <div style={{ paddingTop: '120px', padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C48D4A', marginBottom: '12px' }}>Admin Dashboard</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: '40px' }}>Orders</h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ background: '#FFFFFF', padding: '24px', borderTop: '2px solid #C8681E' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', marginBottom: '8px' }}>Total Orders</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>{orders.length}</p>
          </div>
          <div style={{ background: '#FFFFFF', padding: '24px', borderTop: '2px solid #FFB800' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', marginBottom: '8px' }}>Total Revenue</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>${totalRevenue.toFixed(2)}</p>
          </div>
          <div style={{ background: '#FFFFFF', padding: '24px', borderTop: '2px solid #818cf8' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', marginBottom: '8px' }}>New</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>{newCount}</p>
          </div>
          <div style={{ background: '#FFFFFF', padding: '24px', borderTop: '2px solid #4ade80' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', marginBottom: '8px' }}>Delivered</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700 }}>{completedCount}</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name, email, or product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1', minWidth: '240px', background: '#FFFFFF', border: '1px solid rgba(26,26,26,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#1A1A1A', fontSize: '14px', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                style={{
                  background: filter === s ? '#C48D4A' : '#FFFFFF',
                  color: filter === s ? '#fff' : 'rgba(26,26,26,0.6)',
                  border: '1px solid rgba(26,26,26,0.1)',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                {s === 'all' ? 'All' : STATUS_STYLES[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" style={{ margin: '0 auto' }} />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#FFFFFF' }}>
            <p style={{ color: 'rgba(26,26,26,0.4)', fontSize: '15px' }}>No orders found.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: '#FFFFFF' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Product</th>
                  <th style={{ textAlign: 'right', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const style = STATUS_STYLES[order.status] || STATUS_STYLES.new;
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid rgba(26,26,26,0.04)' }}>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: 'rgba(26,26,26,0.5)', whiteSpace: 'nowrap' }}>{formatDate(order.created_date)}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ fontSize: '14px', color: '#1A1A1A', marginBottom: '2px' }}>{order.customer_name}</p>
                        <p style={{ fontSize: '12px', color: 'rgba(26,26,26,0.4)' }}>{order.customer_email}</p>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '14px', color: 'rgba(26,26,26,0.7)' }}>{order.product}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'right', fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>${(order.amount || 0).toFixed(2)}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ display: 'inline-block', background: style.bg, color: style.color, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 12px', borderRadius: '999px' }}>
                          {style.label}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          style={{ background: '#F8F4EF', border: '1px solid rgba(26,26,26,0.1)', borderRadius: '6px', padding: '8px 12px', color: '#1A1A1A', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{STATUS_STYLES[s].label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Contact Submissions */}
        <ContactSubmissions />
      </div>
    </div>
  );
}