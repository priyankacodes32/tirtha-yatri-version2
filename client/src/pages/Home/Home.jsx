import PageTransition from '../../components/layout/PageTransition.jsx';
import Hero from '../../components/home/Hero.jsx';
import SmartSearch from '../../components/home/SmartSearch.jsx';
import WhyTravelWithUs from '../../components/home/WhyTravelWithUs.jsx';
import PlacesShowcase from '../../components/home/PlacesShowcase.jsx';
import FeaturedPackages from '../../components/home/FeaturedPackages.jsx';
import TestimonialCarousel from '../../components/home/TestimonialCarousel.jsx';
import CtaBand from '../../components/home/CtaBand.jsx';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <SmartSearch />
      <WhyTravelWithUs />
      <PlacesShowcase />
      <FeaturedPackages />
      <TestimonialCarousel />
      <CtaBand />
    </PageTransition>
  );
}
