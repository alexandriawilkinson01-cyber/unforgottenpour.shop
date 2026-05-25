import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,12,0.95) 0%, transparent 100%)' }}>
        <Link to="/" className="font-playfair text-xl font-semibold tracking-widest text-bone uppercase">
          AmberVault
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link to="/portfolio" className="text-xs tracking-[0.2em] uppercase text-bone/60 hover:text-honey transition-colors duration-300">Portfolio</Link>
          <Link to="/order" className="text-xs tracking-[0.2em] uppercase text-bone/60 hover:text-honey transition-colors duration-300">Begin Order</Link>
          <Link to="/order" className="px-6 py-2.5 bg-honey text-obsidian text-xs tracking-[0.15em] uppercase font-semibold hover:bg-yellow-400 transition-all duration-300">
            Preserve Now
          </Link>
        </div>
        <button className="md:hidden text-bone" onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-start px-10"
            style={{ background: '#0A0A0C' }}
          >
            <button className="absolute top-5 right-8 text-bone" onClick={() => setMenuOpen(false)}>
              <X size={26} />
            </button>
            <div className="flex flex-col gap-8">
              {[['/', 'Home'], ['/portfolio', 'Portfolio'], ['/order', 'Begin Order']].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                  className="font-playfair text-5xl font-semibold text-bone hover:text-honey transition-colors duration-300">
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}