import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import ReviewsSection from '../components/ReviewsSection';
import StoriesSection from '../components/StoriesSection';

export default function Home() {
  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <ProcessSection />
      <StoriesSection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}