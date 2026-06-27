import Navbar from '../components/Navbar';
import FadeIn from '../components/FadeIn';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import ReviewsSection from '../components/ReviewsSection';
import StoriesSection from '../components/StoriesSection';
import MemoriesSection from '../components/MemoriesSection';

const SILHOUETTE_BG = 'https://media.base44.com/images/public/6a1409421a03fb2ce09225b7/675f3c371_generated_image.png';

export default function Home() {
  return (
    <div style={{ background: '#F8F4EF', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: `url(${SILHOUETTE_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar light />
        <HeroSection />
        <FadeIn><StorySection /></FadeIn>
        <FadeIn><ServicesSection /></FadeIn>
        <FadeIn><ProcessSection /></FadeIn>
        <FadeIn><StoriesSection /></FadeIn>
        <FadeIn><MemoriesSection /></FadeIn>
        <FadeIn><ReviewsSection /></FadeIn>
        <FadeIn><CTASection /></FadeIn>
      </div>
    </div>
  );
}