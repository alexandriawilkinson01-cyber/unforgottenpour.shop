import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/d40ae2606_generated_4eae1c8b.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0A0A0C' }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMG} alt="Amber stone" className="w-full h-full object-cover opacity-40" style={{ objectPosition: '60% center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,12,0.97) 0%, rgba(10,10,12,0.6) 50%, rgba(10,10,12,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A0A0C 0%, transparent 30%)' }} />
      </div>

      {/* Ticker strip */}
      <div className="absolute top-[72px] left-0 right-0 z-10 overflow-hidden border-y border-white/5 py-2.5">
        <div className="flex animate-pulse gap-12 px-8 text-xs tracking-[0.15em] text-bone/30">
          <span>PRESERVATION GRADE: AAA</span>
          <span>•</span>
          <span>UV-RESISTANT RESIN</span>
          <span>•</span>
          <span>SHIPPED NATIONWIDE</span>
          <span>•</span>
          <span>HANDCRAFTED IN SPARTANBURG, SC</span>
          <span>•</span>
          <span>MUSEUM QUALITY GUARANTEED</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-honey mb-8">Premium Resin Preservation Studio</p>
          <h1 className="font-playfair font-black leading-[0.95] mb-8" style={{ fontSize: 'clamp(56px, 8vw, 100px)', color: '#F2F2F2' }}>
            Some things<br />
            <span style={{ color: '#FFB800' }}>were never</span><br />
            meant to be<br />
            forgotten.
          </h1>
          <p className="text-base text-bone/60 leading-relaxed mb-10 max-w-md">
            AmberVault transforms your most meaningful objects into museum-quality resin art. Wedding bouquets, a parent's watch, baby shoes, military medals. Preserved forever, displayed beautifully.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/order"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300 hover:scale-105"
              style={{ background: '#FFB800', boxShadow: '0 0 40px rgba(255,184,0,0.3)' }}>
              Begin My Order
            </Link>
            <Link to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-bone border border-white/20 hover:border-honey/50 transition-all duration-300">
              See the Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Vault widget */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-16 right-8 md:right-16 z-10 border border-white/10 p-5 hidden md:block"
        style={{ background: 'rgba(26,26,30,0.9)', backdropFilter: 'blur(20px)', minWidth: '200px' }}
      >
        <p className="text-xs tracking-[0.15em] uppercase text-bone/40 mb-3">Preservation Grade</p>
        <p className="font-playfair text-3xl font-bold text-honey">AAA</p>
        <p className="text-xs text-bone/40 mt-1">Museum Standard</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-honey animate-pulse" />
          <span className="text-xs text-bone/50">Accepting Orders</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: 'linear-gradient(to top, #0A0A0C, transparent)' }} />
    </section>
  );
}