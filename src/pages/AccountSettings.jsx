import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import Navbar from '@/components/Navbar';
import { useMetaDescription } from '@/hooks/useMetaDescription';

const CARD = {
  background: '#111113',
  border: '1px solid rgba(242,242,242,0.08)',
  padding: '28px',
  marginBottom: '20px',
};

const LABEL = {
  display: 'block',
  fontSize: '10px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(242,242,242,0.68)',
  marginBottom: '8px',
};

const BUTTON = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '13px 26px',
  fontSize: '11px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
};

export default function AccountSettings() {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const [existing, setExisting] = useState(null);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useMetaDescription(
    'Manage your Unforgotten Pour profile and request deletion of your account data.',
    'Account Settings | Unforgotten Pour'
  );

  useEffect(() => {
    let active = true;

    const loadRequest = async () => {
      if (!isAuthenticated || !user?.email) {
        if (active) setLoadingRequest(false);
        return;
      }
      const page = await base44.entities.AccountDeletionRequest.filter(
        { user_email: user.email },
        { sort: '-created_date', limit: 1 }
      );
      if (active) {
        setExisting(page.items?.[0] || null);
        setLoadingRequest(false);
      }
    };

    loadRequest();
    return () => {
      active = false;
    };
  }, [isAuthenticated, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const record = await base44.entities.AccountDeletionRequest.create({
        user_email: user.email,
        user_name: user.full_name || '',
        reason: reason.trim(),
        status: 'pending',
      });
      setExisting(record);
      setReason('');
    } catch (err) {
      setError(err.message || 'We could not send your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const signInCard = (
    <div style={CARD}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, marginBottom: '10px' }}>
        Sign in to manage your account
      </h2>
      <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(242,242,242,0.7)', marginBottom: '22px' }}>
        Account settings are only available to signed-in customers. Sign in with the email you used when placing an order.
      </p>
      <Link to="/login" style={{ ...BUTTON, background: '#C8681E', color: '#0A0A0C' }}>
        Sign In
      </Link>
    </div>
  );

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh', color: '#F2F2F2' }}>
      <Navbar />

      <section style={{ padding: '140px 24px 50px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8681E', marginBottom: '14px' }}>
          Account
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px' }}>
          Account Settings
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(242,242,242,0.69)', maxWidth: '520px', margin: '0 auto' }}>
          Review your profile and control what we keep.
        </p>
      </section>

      <section style={{ maxWidth: '620px', margin: '0 auto', padding: '0 24px 120px' }}>
        {isLoadingAuth ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="w-7 h-7 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" style={{ margin: '0 auto' }} />
          </div>
        ) : !isAuthenticated ? (
          signInCard
        ) : (
          <>
            <div style={CARD}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
                Your profile
              </h2>
              <div style={{ marginBottom: '18px' }}>
                <span style={LABEL}>Name</span>
                <p style={{ fontSize: '14px' }}>{user?.full_name || 'Not provided'}</p>
              </div>
              <div style={{ marginBottom: '18px' }}>
                <span style={LABEL}>Email</span>
                <p style={{ fontSize: '14px' }}>{user?.email}</p>
              </div>
              <div>
                <span style={LABEL}>Account type</span>
                <p style={{ fontSize: '14px', textTransform: 'capitalize' }}>{user?.role || 'customer'}</p>
              </div>
            </div>

            <div style={{ ...CARD, borderColor: 'rgba(200,104,30,0.35)' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, marginBottom: '10px' }}>
                Delete my profile
              </h2>

              {loadingRequest ? (
                <p style={{ fontSize: '13px', color: 'rgba(242,242,242,0.69)' }}>Checking your request status...</p>
              ) : existing && existing.status === 'pending' ? (
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(242,242,242,0.71)' }}>
                  Your deletion request was received and is pending review. We will confirm by email once your profile data has been removed.
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(242,242,242,0.71)', marginBottom: '20px' }}>
                    Submitting a request asks us to permanently remove your profile and contact details. Order records required for tax and accounting purposes are retained. This action cannot be undone.
                  </p>
                  <label htmlFor="deletion-reason" style={LABEL}>
                    Reason (optional)
                  </label>
                  <textarea
                    id="deletion-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    placeholder="Tell us why you are leaving"
                    style={{
                      width: '100%',
                      background: '#0A0A0C',
                      border: '1px solid rgba(242,242,242,0.12)',
                      color: '#F2F2F2',
                      padding: '12px 14px',
                      fontSize: '14px',
                      fontFamily: "'Inter Tight', sans-serif",
                      marginBottom: '18px',
                      resize: 'vertical',
                    }}
                  />
                  {error && (
                    <p style={{ fontSize: '12px', color: '#f87171', marginBottom: '14px' }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...BUTTON,
                      background: 'transparent',
                      border: '1px solid rgba(248,113,113,0.6)',
                      color: '#f87171',
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting ? 'Sending request...' : 'Request profile deletion'}
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}