import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/lib/api";
import DestinationCard from "@/components/ui/destination-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Destinations() {
  const { data: destinations, isLoading, error } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: () => destinationsApi.getAll(),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Destinations</h1>
          <p className="text-gray-600">Failed to load destinations. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Explore Egypt's <span className="text-teal-oasis">Legendary</span> Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient wonders to modern marvels, discover the destinations that make Egypt 
            one of the world's most captivating travel experiences.
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
        ) : destinations?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Destinations Found</h2>
            <p className="text-gray-600">Please check back later for available destinations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations?.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
