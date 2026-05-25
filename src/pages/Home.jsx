import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import CategoriesSection from '../components/CategoriesSection';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <CategoriesSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </div>
  );
}