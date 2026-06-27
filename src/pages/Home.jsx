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

export default function Home() {
  return (
    <div style={{ background: '#FBF7F4', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <FadeIn><StorySection /></FadeIn>
      <FadeIn><ServicesSection /></FadeIn>
      <FadeIn><ProcessSection /></FadeIn>
      <FadeIn><StoriesSection /></FadeIn>
      <FadeIn><MemoriesSection /></FadeIn>
      <FadeIn><ReviewsSection /></FadeIn>
      <FadeIn><CTASection /></FadeIn>
    </div>
  );
}