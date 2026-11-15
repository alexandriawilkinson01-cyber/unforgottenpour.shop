import Navbar from '../components/Navbar';
import { useMetaDescription } from '../hooks/useMetaDescription';
import FadeIn from '../components/FadeIn';
import HeroSection from '../components/HeroSection';
import ProductCategoriesSection from '../components/ProductCategoriesSection';
import StorySection from '../components/StorySection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import NewStudioSection from '../components/NewStudioSection';

export default function Home() {
  useMetaDescription(
    'Unforgotten Pour preserves wedding flowers, ashes, and keepsakes in handcrafted resin art and jewelry — heirlooms that last a lifetime.'
  );
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <FadeIn><ProductCategoriesSection /></FadeIn>
      <FadeIn><StorySection /></FadeIn>
      <FadeIn><ServicesSection /></FadeIn>
      <FadeIn><ProcessSection /></FadeIn>
      <FadeIn><NewStudioSection /></FadeIn>
      <FadeIn><CTASection /></FadeIn>
    </div>
  );
}