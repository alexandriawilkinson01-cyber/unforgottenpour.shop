import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MEMORIAL_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/9d11288e6_generated_1d8e1e5c.png';
const BABY_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/fe500614f_generated_2b4a56ef.png';
const LEGACY_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/36fce8703_generated_3d4f2099.png';
const GOLD_IMG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/35235b8c4_generated_98401acb.png';

const CATEGORIES = [
  { icon: '✿', title: 'Wedding & Event Florals', desc: 'Bridal bouquets, boutonnieres, corsages, and ceremonial arrangements cast in crystal-clear resin blocks, orbs, or jewelry.', img: GOLD_IMG },
  { icon: '♥', title: 'Memorial Keepsakes', desc: 'Funeral flowers, cremation ashes from loved ones and pets, dried botanicals from gravesites. A permanent, tangible way to hold someone close.', img: MEMORIAL_IMG },
  { icon: '★', title: 'Milestone Artifacts', desc: "Baby's first shoes, hospital wristbands, locks of hair, pet fur, teeth, first toys. The small objects that mark enormous moments.", img: BABY_IMG },
  { icon: '♦', title: 'Legacy Pieces', desc: 'Military medals, vintage jewelry, watches, coins, letters, fabric swatches. Family history you can see and touch for generations.', img: LEGACY_IMG },
  { icon: '♣', title: 'Sports & Achievement', desc: 'Championship game tickets, jersey patches, race bibs, trophy fragments. The physical proof of your proudest moments.', img: GOLD_IMG },
  { icon: '⋆', title: 'Custom Commissions', desc: "If it fits in resin and it means something to you, we'll find a way. Tabletop art, shadow boxes, wearable pieces, and beyond.", img: MEMORIAL_IMG },
];

export default function CategoriesSection() {
  return (
    <section className="py-32 px-8" style={{ background: '#F8F4EF' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-honey mb-4">What We Preserve</p>
          <h2 className="font-playfair font-bold" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: '#F2F2F2' }}>
            Not just flowers.<br />
            <span style={{ color: 'rgba(242,242,242,0.35)' }}>Everything that matters.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ background: '#F8F4EF' }}
            >
              <div className="absolute inset-0 z-0">
                <img src={cat.img} alt="" className="w-full h-full object-cover opacity-10 group-hover:opacity-25 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(248,244,239,1) 0%, rgba(248,244,239,0.5) 100%)' }} />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[280px]">
                <span className="text-2xl mb-4 block">{cat.icon}</span>
                <h3 className="font-playfair text-lg font-semibold text-bone mb-3 group-hover:text-honey transition-colors duration-300">{cat.title}</h3>
                <p className="text-sm text-bone/50 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px transition-all duration-500" style={{ background: '#C48D4A' }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/order"
            className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300 hover:scale-105"
            style={{ background: '#C48D4A', boxShadow: '0 0 40px rgba(255,184,0,0.2)' }}>
            Begin My Preservation
          </Link>
        </div>
      </div>
    </section>
  );
}