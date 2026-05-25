import { Link } from 'react-router-dom';

const FOOTER_BG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/05594678f_generated_91aecaba.png';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={FOOTER_BG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0A0C 0%, transparent 30%, #0A0A0C 100%)' }} />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-playfair text-[12vw] font-black text-white/[0.03] select-none tracking-widest uppercase whitespace-nowrap">
          AmberVault
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="border-t border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="font-playfair text-lg font-semibold text-bone mb-4">AmberVault</p>
            <p className="text-xs text-bone/40 leading-relaxed">Museum-quality resin preservation.<br />Spartanburg, South Carolina.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-honey mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/order', 'Begin Order']].map(([to, label]) => (
                <Link key={to} to={to} className="text-xs text-bone/50 hover:text-bone transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-honey mb-4">Preserve</p>
            <div className="flex flex-col gap-2">
              {['Wedding Florals', 'Memorial Keepsakes', 'Legacy Pieces', 'Custom Commissions'].map(s => (
                <Link key={s} to="/order" className="text-xs text-bone/50 hover:text-bone transition-colors">{s}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-honey mb-4">Contact</p>
            <p className="text-xs text-bone/50">hello@ambervault.com</p>
            <p className="text-xs text-bone/50 mt-1">Spartanburg, SC</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bone/30">© 2026 AmberVault. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-bone/30 cursor-pointer hover:text-bone/50 transition-colors">Privacy Policy</span>
            <span className="text-xs text-bone/30 cursor-pointer hover:text-bone/50 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}