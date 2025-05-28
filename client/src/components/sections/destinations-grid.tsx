import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/lib/api";
import DestinationCard from "@/components/ui/destination-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsGrid() {
  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: () => destinationsApi.getAll(),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load destinations. Please try again later.</p>
      </div>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Legendary <span className="text-teal-oasis">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient wonders to modern marvels, explore Egypt's most captivating destinations 
            with expert guides and insider access.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-teal-oasis text-white px-8 py-4 text-lg font-semibold hover:bg-accent-coral transition-colors"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
