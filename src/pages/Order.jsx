import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PLANS = [
  {
    id: 'memorial',
    priceId: 'price_1Tau1YBlmDr5Ka7mwfMRYPad',
    name: 'Memorial Keepsake',
    price: '$199',
    purity: 'Standard',
    inclusion: '12–16 weeks',
    desc: 'Funeral flowers, ashes, dried botanicals, or small personal mementos.',
    features: ['UV-resistant resin', 'Documentation photos', 'Protective display box', 'Certificate of preservation'],
  },
  {
    id: 'bloom',
    priceId: 'price_1Tau1YBlmDr5Ka7m7g8C8Rj4',
    name: 'Bloom Preservation',
    price: '$299',
    purity: 'Premium',
    inclusion: '8–12 weeks',
    desc: 'Bridal bouquets, boutonnieres, corsages, and ceremonial arrangements.',
    features: ['Multi-layer pour', 'High-gloss finish', 'Choice of form factor', 'Engraved date plate', 'Documentation photos'],
    featured: true,
  },
  {
    id: 'legacy',
    priceId: 'price_1Tau1YBlmDr5Ka7mTRT5EvqP',
    name: 'Legacy Encapsulation',
    price: '$449',
    purity: 'Museum',
    inclusion: '6–8 weeks',
    desc: 'Military medals, vintage jewelry, watches, coins, letters, fabric swatches.',
    features: ['Museum-grade resin', 'White-glove handling', 'Archival documentation', 'Custom display pedestal', 'Lifetime guarantee'],
  },
  {
    id: 'custom',
    priceId: 'price_1Tau1YBlmDr5Ka7m389hG6Rw',
    name: 'Custom Commission',
    price: '$599',
    purity: 'Bespoke',
    inclusion: '4–6 weeks',
    desc: 'Tabletop art, shadow boxes, wearable pieces, or anything truly unique.',
    features: ['Dedicated artisan', 'Consultation call', 'Unlimited revisions', 'Priority shipping', 'All Legacy features'],
  },
];

export default function Order() {
  const [selected, setSelected] = useState(PLANS[1]);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      alert('Checkout is only available from the published app. Please open AmberVault in a new tab to complete your order.');
      return;
    }

    setLoading(true);
    const origin = window.location.origin;
    const response = await base44.functions.invoke('createCheckout', {
      planId: selected.id,
      priceId: selected.priceId,
      successUrl: `${origin}/success`,
      cancelUrl: `${origin}/order`,
    });
    setLoading(false);
    if (response.data?.url) {
      window.location.href = response.data.url;
    }
  };

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-36 pb-24 px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-honey mb-4">Choose Your Plan</p>
          <h1 className="font-playfair font-bold" style={{ fontSize: 'clamp(36px, 5vw, 72px)', color: '#F2F2F2' }}>
            Select a Preservation<br />
            <span style={{ color: 'rgba(242,242,242,0.35)' }}>Plan</span>
          </h1>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-12">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(plan)}
              className="relative cursor-pointer p-8 flex flex-col transition-all duration-300"
              style={{
                background: selected.id === plan.id ? '#1A1A1E' : '#0D0D10',
                borderTop: selected.id === plan.id ? '2px solid #FFB800' : '2px solid transparent',
              }}
            >
              {plan.featured && (
                <div className="absolute top-4 right-4 px-2 py-0.5 text-xs tracking-[0.1em] uppercase font-semibold text-obsidian" style={{ background: '#FFB800' }}>
                  Popular
                </div>
              )}
              <div className="mb-6">
                <p className="text-xs tracking-[0.2em] uppercase text-bone/40 mb-1">Purity Grade</p>
                <p className="font-playfair text-sm font-semibold text-honey">{plan.purity}</p>
              </div>
              <h3 className="font-playfair text-xl font-bold text-bone mb-2">{plan.name}</h3>
              <p className="text-xs text-bone/40 leading-relaxed mb-6">{plan.desc}</p>
              <div className="mt-auto">
                <p className="font-playfair text-3xl font-bold text-bone mb-1">{plan.price}</p>
                <p className="text-xs text-bone/30">Delivery: {plan.inclusion}</p>
                <div className="mt-6 flex flex-col gap-2">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={12} className="text-honey flex-shrink-0" />
                      <span className="text-xs text-bone/50">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selected.id === plan.id && (
                <div className="mt-6 text-center">
                  <div className="w-full h-px" style={{ background: '#FFB800', opacity: 0.3 }} />
                  <p className="text-xs tracking-[0.1em] uppercase text-honey mt-3">Selected</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Order summary + checkout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-px bg-white/5 max-w-3xl mx-auto"
        >
          {/* Summary */}
          <div className="p-8" style={{ background: '#0D0D10' }}>
            <p className="text-xs tracking-[0.2em] uppercase text-honey mb-6">Order Summary</p>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-playfair text-lg font-semibold text-bone">{selected.name}</p>
                <p className="text-xs text-bone/40 mt-1">{selected.purity} Grade</p>
              </div>
              <p className="font-playfair text-2xl font-bold text-honey">{selected.price}</p>
            </div>
            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-xs text-bone/30 leading-relaxed">Estimated delivery in {selected.inclusion}. Free return shipping for objects under 5 lbs.</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Lock size={12} className="text-bone/30" />
              <p className="text-xs text-bone/30 tracking-wide">Secured by Stripe</p>
            </div>
          </div>

          {/* Checkout action */}
          <div className="p-8 flex flex-col justify-between" style={{ background: '#1A1A1E' }}>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-honey mb-6">Secure Checkout</p>
              <p className="text-sm text-bone/50 leading-relaxed mb-6">
                After checkout, we'll ship your preservation kit within 2 business days. Your item will be handcrafted in Spartanburg, SC and shipped back to you.
              </p>
              <div className="flex flex-col gap-2 mb-8">
                {['Branded preservation shipping kit', 'Full documentation & photos', 'Museum-grade materials', '30-day satisfaction guarantee'].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={11} className="text-honey flex-shrink-0" />
                    <span className="text-xs text-bone/50">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 text-sm tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3"
              style={{ background: '#FFB800', boxShadow: loading ? 'none' : '0 0 40px rgba(255,184,0,0.25)' }}
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" /> Processing...</>
              ) : (
                <><Lock size={14} /> Secure My Assets</>
              )}
            </button>
            <p className="text-xs text-bone/25 text-center mt-3">Test mode: use card 4242 4242 4242 4242</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}