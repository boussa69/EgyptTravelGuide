import { useQuery } from "@tanstack/react-query";
import { toursApi } from "@/lib/api";
import TourCard from "@/components/ui/tour-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, Flame, Crown } from "lucide-react";

const tourCategories = [
  { icon: Clock, name: "Cultural Tours", description: "Ancient history & heritage" },
  { icon: Users, name: "Adventure Tours", description: "Desert & diving expeditions" },
  { icon: Flame, name: "Luxury Tours", description: "Premium experiences" },
  { icon: Crown, name: "Family Tours", description: "Kid-friendly adventures" },
];

export default function FeaturedTours() {
  const { data: popularTours, isLoading, error } = useQuery({
    queryKey: ["/api/tours", { popular: true }],
    queryFn: () => toursApi.getAll({ popular: true }),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load tours. Please try again later.</p>
      </div>
    );
  }

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Curated <span className="text-teal-oasis">Tours</span> & Itineraries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expertly designed tours from ancient wonders to modern adventures, 
            tailored for every travel style and budget.
          </p>
        </div>
        
        {/* Featured Tours */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-80 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {popularTours?.slice(0, 2).map((tour) => (
              <TourCard key={tour.id} tour={tour} featured />
            ))}
          </div>
        )}

        {/* Tour Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tourCategories.map(({ icon: Icon, name, description }, index) => (
            <div key={name} className="text-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                index === 0 ? "bg-gold-accent/10" :
                index === 1 ? "bg-teal-oasis/10" :
                index === 2 ? "bg-accent-coral/10" :
                "bg-gold-accent/10"
              }`}>
                <Icon className={`w-10 h-10 ${
                  index === 0 ? "text-gold-accent" :
                  index === 1 ? "text-teal-oasis" :
                  index === 2 ? "text-accent-coral" :
                  "text-gold-accent"
                }`} />
              </div>
              <h4 className="font-bold text-gray-900 font-serif">{name}</h4>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gold-accent text-white px-8 py-4 text-lg font-semibold hover:bg-accent-coral transition-colors"
          >
            Browse All Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
