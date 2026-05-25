import { motion } from 'framer-motion';

const SECURITY_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/4d98f60a1_generated_b8cc65a1.png';

const STEPS = [
  { num: '01', title: 'Ship It Safely', desc: 'We send you a branded preservation kit with archival-grade packing materials. Your irreplaceable item, protected in transit.' },
  { num: '02', title: 'Preparation', desc: 'Every item is carefully cleaned, dried (if organic), and arranged by hand. We photograph and document the process for you.' },
  { num: '03', title: 'Encapsulation', desc: 'Premium UV-resistant resin is poured in multiple layers, cured slowly for maximum clarity. No bubbles, no cloudiness, no shortcuts.' },
  { num: '04', title: 'Finishing', desc: 'Each piece is sanded, polished, and inspected to museum standards. The final result looks like your object frozen in glass.' },
];

export default function ProcessSection() {
  return (
    <section className="py-32 px-8" style={{ background: '#0D0D10' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs tracking-[0.3em] uppercase text-honey mb-4">The Process</p>
              <h2 className="font-playfair font-bold mb-16" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#F2F2F2' }}>
                From treasured object<br />
                <span style={{ color: 'rgba(242,242,242,0.35)' }}>to timeless art.</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #FFB800, transparent)' }} />
              <div className="flex flex-col gap-12">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 pl-2"
                  >
                    <div className="flex-shrink-0 w-10 h-10 border border-honey/30 flex items-center justify-center"
                      style={{ background: 'rgba(255,184,0,0.05)' }}>
                      <span className="text-xs font-mono text-honey">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-bone mb-2">{step.title}</h3>
                      <p className="text-sm text-bone/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative sticky top-32"
          >
            <div className="absolute -inset-4 blur-3xl opacity-10 rounded-full" style={{ background: '#FFB800' }} />
            <img src={SECURITY_IMG} alt="Precision craftsmanship" className="relative w-full rounded-sm object-cover" style={{ aspectRatio: '4/3' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
              style={{ background: 'rgba(10,10,12,0.85)', backdropFilter: 'blur(20px)' }}>
              <p className="text-xs tracking-[0.15em] uppercase text-honey mb-1">Handcrafted In</p>
              <p className="font-playfair text-lg text-bone">Spartanburg, South Carolina</p>
              <p className="text-xs text-bone/40 mt-1">Shipped Nationwide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}