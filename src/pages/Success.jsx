import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Success() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          <div className="relative mb-8 flex justify-center">
            <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-30" style={{ background: '#FFB800' }} />
            <CheckCircle size={64} className="relative text-honey" />
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-honey mb-4">Order Confirmed</p>
          <h1 className="font-playfair font-bold text-5xl text-bone mb-6">Your legacy<br />is secured.</h1>
          <p className="text-base text-bone/50 leading-relaxed mb-4">
            Your preservation order has been received. We'll be in touch within 24 hours with your branded shipping kit and next steps.
          </p>
          <p className="text-sm text-bone/30 mb-10">Handcrafted in Spartanburg, South Carolina.</p>
          <Link to="/"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold text-obsidian transition-all duration-300"
            style={{ background: '#FFB800' }}>
            Return Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}