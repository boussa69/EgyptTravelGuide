import HeroSection from "@/components/sections/hero-section";
import DestinationsGrid from "@/components/sections/destinations-grid";
import PlanningResources from "@/components/sections/planning-resources";
import FeaturedTours from "@/components/sections/featured-tours";
import CultureSection from "@/components/sections/culture-section";
import TravelTipsSection from "@/components/sections/travel-tips-section";
import NewsletterCTA from "@/components/sections/newsletter-cta";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DestinationsGrid />
      <PlanningResources />
      <FeaturedTours />
      <CultureSection />
      <TravelTipsSection />
      <NewsletterCTA />
    </div>
  );
}
