import { motion } from 'framer-motion';

const BOUQUET_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/a624ea814_generated_debeb8e7.png';

export default function ProblemSolutionSection() {
  return (
    <>
      {/* Problem */}
      <section className="py-32 px-8" style={{ background: '#0A0A0C' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-honey mb-6">The Problem</p>
            <h2 className="font-playfair font-bold leading-tight mb-8" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#F2F2F2' }}>
              Memories fade.<br />
              Objects deteriorate.<br />
              <span style={{ color: 'rgba(242,242,242,0.67)' }}>Time doesn't wait.</span>
            </h2>
            <p className="text-base text-bone/50 leading-relaxed max-w-xl">
              That wedding bouquet dries and crumbles within weeks. The championship jersey yellows in a closet. Your grandmother's brooch tarnishes in a drawer nobody opens. The physical things that anchor our most important memories are quietly disappearing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-32 px-8" style={{ background: '#0D0D10' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-honey mb-6">The Solution</p>
            <h2 className="font-playfair font-bold leading-tight mb-8" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: '#F2F2F2' }}>
              Resin stops time.
            </h2>
            <p className="text-base text-bone/50 leading-relaxed mb-6">
              Crystal-clear, museum-grade resin encapsulation preserves organic and inorganic materials indefinitely. No fading, no deterioration, no decay.
            </p>
            <p className="text-base text-bone/50 leading-relaxed">
              Your object suspended in perfect clarity, exactly as it was on the day it mattered most.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[['0%', 'UV Degradation'], ['100%', 'Clarity Preserved'], ['∞', 'Lifespan']].map(([val, label]) => (
                <div key={label}>
                  <p className="font-playfair text-3xl font-bold text-honey">{val}</p>
                  <p className="text-xs text-bone/40 mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute inset-0 blur-3xl opacity-20 rounded-full" style={{ background: '#FFB800' }} />
            <img src={BOUQUET_IMG} alt="Preserved bouquet" className="relative w-full rounded-sm object-cover" style={{ aspectRatio: '4/3' }} />
          </motion.div>
        </div>
      </section>
    </>
  );
}