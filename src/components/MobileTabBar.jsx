import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Images, ShoppingBag, Sparkles } from 'lucide-react';

const TABS = [
  { to: '/', label: 'Home', icon: Home, match: (p) => p === '/' },
  { to: '/portfolio', label: 'Portfolio', icon: Images, match: (p) => p.startsWith('/portfolio') },
  { to: '/order', label: 'Order', icon: ShoppingBag, match: (p) => p.startsWith('/order') || p === '/success' },
  { to: '/style-advisor', label: 'Style Advisor', icon: Sparkles, match: (p) => p.startsWith('/style-advisor') },
];

const HIDDEN_PREFIXES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/oauth',
  '/admin',
  '/inquiries',
  '/account',
];

export default function MobileTabBar() {
  const { pathname } = useLocation();
  const isHidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Lets the mobile styles add bottom spacing only where the tab bar exists.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.tabbar = isHidden ? 'off' : 'on';
    return () => {
      delete root.dataset.tabbar;
    };
  }, [isHidden]);

  if (isHidden) {
    return null;
  }

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden select-none"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'stretch',
        background: 'rgba(10,10,12,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(242,242,242,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {TABS.map(({ to, label, icon: Icon, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 2px 11px',
              textDecoration: 'none',
              color: active ? '#C8681E' : 'rgba(242,242,242,0.69)',
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 1.7} />
            <span
              style={{
                fontSize: '9px',
                lineHeight: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                fontWeight: active ? 700 : 500,
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}