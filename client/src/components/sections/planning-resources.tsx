import { useQuery } from "@tanstack/react-query";
import { planningResourcesApi } from "@/lib/api";
import PlanningCard from "@/components/ui/planning-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, CheckCircle, Package, Heart, Car } from "lucide-react";

const quickTips = [
  { icon: Sun, title: "Best Time to Visit", description: "October to April offers perfect weather for sightseeing" },
  { icon: CheckCircle, title: "Visa & Entry", description: "Easy visa on arrival or e-visa options available for most nationalities." },
  { icon: Package, title: "Packing Guide", description: "Essential items for comfort and cultural respect during your Egyptian journey." },
  { icon: Heart, title: "Cultural Etiquette", description: "Understand local customs and traditions for meaningful cultural exchange." },
  { icon: Car, title: "Getting Around", description: "Complete guide to transportation options from metros to Nile cruises." },
];

export default function PlanningResources() {
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["/api/planning-resources"],
    queryFn: () => planningResourcesApi.getAll(),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load planning resources. Please try again later.</p>
      </div>
    );
  }

  return (
    <section id="planning" className="py-20 bg-cool-limestone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Plan Your <span className="text-teal-oasis">Perfect</span> Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for an unforgettable Egyptian adventure, 
            from visa requirements to cultural etiquette.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickTips.map((tip, index) => (
              <PlanningCard key={tip.title} {...tip} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
