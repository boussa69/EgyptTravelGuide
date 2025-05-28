import { useQuery } from "@tanstack/react-query";
import { planningResourcesApi } from "@/lib/api";
import PlanningCard from "@/components/ui/planning-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, CheckCircle, Package, Heart, DollarSign, Shield } from "lucide-react";

const quickGuides = [
  { icon: Sun, title: "Best Time to Visit", description: "October to April offers perfect weather for sightseeing" },
  { icon: CheckCircle, title: "Visa & Entry", description: "Easy visa on arrival or e-visa options available for most nationalities." },
  { icon: Package, title: "Packing Guide", description: "Essential items for comfort and cultural respect during your Egyptian journey." },
  { icon: Heart, title: "Cultural Etiquette", description: "Understand local customs and traditions for meaningful cultural exchange." },
  { icon: DollarSign, title: "Budget Planning", description: "Get detailed cost breakdowns for accommodation, food, transportation, and activities." },
  { icon: Shield, title: "Safety & Insurance", description: "Important health tips, safety guidelines, and travel insurance recommendations." },
];

export default function TravelPlanning() {
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["/api/planning-resources"],
    queryFn: () => planningResourcesApi.getAll(),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Resources</h1>
          <p className="text-gray-600">Failed to load planning resources. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-cool-limestone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Plan Your <span className="text-teal-oasis">Perfect</span> Egyptian Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for an unforgettable Egyptian adventure. 
            From visa requirements to cultural etiquette, we've got you covered.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickGuides.map((guide) => (
              <PlanningCard key={guide.title} {...guide} />
            ))}
          </div>
        )}

        {/* Additional Planning Information */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-serif">
            Essential Planning Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-oasis/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Climate</h3>
              <p className="text-gray-600 text-sm">Desert climate with hot, dry summers and mild winters. Best visited October to April.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💱</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Currency</h3>
              <p className="text-gray-600 text-sm">Egyptian Pound (EGP). USD widely accepted. ATMs available in major cities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕐</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Time Zone</h3>
              <p className="text-gray-600 text-sm">Egypt Standard Time (EST), UTC+2. No daylight saving time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
