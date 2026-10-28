import { useState } from 'react';
import { Drawer } from 'vaul';
import { Check, ChevronDown } from 'lucide-react';

export default function BottomSheetSelect({
  value,
  onChange,
  options = [],
  groups,
  placeholder = 'Select',
  title = 'Select an option',
  triggerStyle,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);

  const flatOptions = groups ? groups.flatMap((group) => group.options || []) : options;
  const selected = flatOptions.find((option) => option.value === value);

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
  };

  const renderOption = (option) => {
    const isActive = option.value === value;
    return (
      <button
        key={option.value}
        type="button"
        onClick={() => handleSelect(option.value)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          width: '100%',
          textAlign: 'left',
          background: isActive ? 'rgba(200,104,30,0.12)' : 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(242,242,242,0.06)',
          padding: '16px 20px',
          color: isActive ? '#F2F2F2' : 'rgba(242,242,242,0.75)',
          fontSize: '15px',
          fontFamily: "'Inter Tight', sans-serif",
          cursor: 'pointer',
        }}
      >
        <span>{option.label}</span>
        {isActive && <Check size={16} color="#C8681E" />}
      </button>
    );
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          style={{
            ...triggerStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            textAlign: 'left',
          }}
        >
          <span style={{ color: selected ? '#F2F2F2' : 'rgba(242,242,242,0.68)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown size={16} style={{ flexShrink: 0, opacity: 0.6 }} />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.65)' }} />
        <Drawer.Content
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 191,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            background: '#111113',
            borderTop: '1px solid rgba(242,242,242,0.1)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            outline: 'none',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div style={{ width: '40px', height: '4px', borderRadius: '999px', background: 'rgba(242,242,242,0.2)', margin: '12px auto 0' }} />
          <Drawer.Title style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#F2F2F2', padding: '14px 20px' }}>
            {title}
          </Drawer.Title>
          <Drawer.Description style={{ display: 'none' }}>{title}</Drawer.Description>
          <div style={{ overflowY: 'auto', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch', paddingBottom: '16px' }}>
            {groups
              ? groups.map((group) => (
                  <div key={group.label}>
                    <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8681E', fontWeight: 700, padding: '14px 20px 8px' }}>
                      {group.label}
                    </p>
                    {(group.options || []).map(renderOption)}
                  </div>
                ))
              : options.map(renderOption)}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}