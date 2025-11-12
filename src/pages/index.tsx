import StripLines from '../components/StripLines';
import Navbar from '../layouts/Navbar/Navbar';
import Hero from '../components/Hero';

const LandingPage: React.FC = () => {
  return (
    <div>
      <StripLines />
      <Navbar />
      <Hero />
      {/* Add Features, Testimonials, Pricing later */}
    </div>
  );
};

export default LandingPage;
