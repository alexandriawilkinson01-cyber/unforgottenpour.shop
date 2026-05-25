import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const IMAGES = [
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/a624ea814_generated_debeb8e7.png', label: 'Wedding Bouquet' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/9d11288e6_generated_1d8e1e5c.png', label: 'Memorial Keepsake' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/fe500614f_generated_2b4a56ef.png', label: 'Baby Shoes' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/36fce8703_generated_3d4f2099.png', label: 'Legacy Pieces' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/35235b8c4_generated_98401acb.png', label: 'Gold in Resin' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/4d98f60a1_generated_b8cc65a1.png', label: 'Precision Craft' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/d40ae2606_generated_4eae1c8b.png', label: 'Amber Formation' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/a624ea814_generated_debeb8e7.png', label: 'Floral Sphere' },
  { url: 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/9d11288e6_generated_1d8e1e5c.png', label: 'Botanical Resin' },
];

export default function Portfolio() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-36 pb-24 px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-honey mb-4">Our Work</p>
          <h1 className="font-playfair font-bold" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#F2F2F2' }}>
            The Portfolio
          </h1>
          <p className="text-base text-bone/50 mt-4 max-w-md leading-relaxed">
            Every piece is unique. Every piece is permanent. A selection of our museum-quality preservation work.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
          {IMAGES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="group relative overflow-hidden break-inside-avoid mb-px"
            >
              <img src={item.url} alt={item.label} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(10,10,12,0.9) 0%, transparent 60%)' }}>
                <p className="font-playfair text-sm text-bone">{item.label}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500" style={{ background: '#FFB800' }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-bone/40 text-sm mb-8">Ready to preserve what matters most?</p>
          <Link to="/order"
            className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300 hover:scale-105"
            style={{ background: '#FFB800', boxShadow: '0 0 40px rgba(255,184,0,0.2)' }}>
            Begin My Order
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}