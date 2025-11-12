import StripLines from '../components/StripLines';
import Navbar from '../layouts/Navbar/Navbar';
import Hero from '../components/Hero';
import IllustrationSection from '../components/IllustrationSection';

const LandingPage: React.FC = () => {
  return (
    <div>
      <StripLines />
      <Navbar />
      <Hero />
      <IllustrationSection />
      {/* Add Features, Testimonials, Pricing later */}
    </div>
  );
};

export default LandingPage;
