import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-40 px-8 text-center relative overflow-hidden" style={{ background: '#0A0A0C' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full blur-[120px] opacity-10" style={{ background: '#FFB800' }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-honey mb-6">Begin Today</p>
        <h2 className="font-playfair font-bold leading-tight mb-8" style={{ fontSize: 'clamp(36px, 5vw, 72px)', color: '#F2F2F2' }}>
          Some things deserve to last<br />
          <span style={{ color: 'rgba(242,242,242,0.35)' }}>as long as the memory does.</span>
        </h2>
        <p className="text-base text-bone/50 leading-relaxed mb-12 max-w-lg mx-auto">
          AmberVault exists because the most meaningful objects in our lives are also the most fragile. We believe if something matters enough to keep, it matters enough to preserve forever.
        </p>
        <Link to="/order"
          className="inline-flex items-center gap-3 px-12 py-5 text-sm tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300 hover:scale-105"
          style={{ background: '#FFB800', boxShadow: '0 0 60px rgba(255,184,0,0.3)' }}>
          Begin My Order
        </Link>
      </motion.div>
    </section>
  );
}