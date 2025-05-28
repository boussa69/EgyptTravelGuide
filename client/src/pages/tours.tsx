import { useQuery } from "@tanstack/react-query";
import { toursApi } from "@/lib/api";
import TourCard from "@/components/ui/tour-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = ["All", "Cultural", "Adventure", "Luxury", "Family"];

export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: tours, isLoading, error } = useQuery({
    queryKey: ["/api/tours", { category: selectedCategory === "All" ? undefined : selectedCategory }],
    queryFn: () => toursApi.getAll({ category: selectedCategory === "All" ? undefined : selectedCategory }),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Tours</h1>
          <p className="text-gray-600">Failed to load tours. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Egypt <span className="text-teal-oasis">Tours</span> & Itineraries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expertly crafted tours from ancient wonders to modern adventures, 
            tailored for every travel style and budget.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-teal-oasis text-white hover:bg-accent-coral" 
                : "border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : tours?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Tours Found</h2>
            <p className="text-gray-600">
              {selectedCategory === "All" 
                ? "Please check back later for available tours." 
                : `No ${selectedCategory.toLowerCase()} tours available. Try a different category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {tours?.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
