import { useRef, useState } from 'react';

const THRESHOLD = 72;
const MAX_PULL = 110;

export default function PullToRefresh({ onRefresh, children, style }) {
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const active = useRef(false);

  const atTop = () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return scrolled <= 0;
  };

  const handleTouchStart = (e) => {
    if (refreshing || !atTop()) return;
    startY.current = e.touches[0].clientY;
    active.current = true;
  };

  const handleTouchMove = (e) => {
    if (!active.current || startY.current === null) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta <= 0) {
      if (pull !== 0) setPull(0);
      return;
    }
    setDragging(true);
    setPull(Math.min(delta * 0.55, MAX_PULL));
  };

  const handleTouchEnd = async () => {
    if (!active.current) return;
    active.current = false;
    startY.current = null;
    setDragging(false);

    if (pull >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPull(THRESHOLD);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPull(0);
      }
    } else {
      setPull(0);
    }
  };

  const progress = Math.min(pull / THRESHOLD, 1);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ position: 'relative', ...style }}
    >
      <div
        aria-hidden="true"
        style={{
          height: pull,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: dragging ? 'none' : 'height 0.25s ease',
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '2px solid rgba(200,104,30,0.25)',
            borderTopColor: '#C8681E',
            opacity: refreshing ? 1 : progress,
            transform: refreshing ? 'none' : `rotate(${progress * 270}deg)`,
            animation: refreshing ? 'ptr-spin 0.75s linear infinite' : 'none',
          }}
        />
      </div>
      {children}
      <style>{`@keyframes ptr-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}