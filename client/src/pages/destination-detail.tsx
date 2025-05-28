import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/lib/api";
import { Star, MapPin, Clock, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: destination, isLoading, error } = useQuery({
    queryKey: ["/api/destinations", slug],
    queryFn: () => destinationsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Destination Not Found</h1>
          <p className="text-gray-600">The destination you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) return null;

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
              {destination.name}
            </h1>
            <div className="flex items-center text-white/90">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{destination.region}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="flex text-gold-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < destination.rating ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="ml-3 text-lg text-gray-600">
                {destination.rating} ({destination.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">{destination.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Top Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-4 bg-champagne-sand rounded-lg">
                    <Camera className="w-5 h-5 text-teal-oasis mr-3" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attractions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Must-Visit Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.attractions.map((attraction, index) => (
                  <Card key={index} className="border border-cool-limestone">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900">{attraction}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="border border-cool-limestone">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Starting From</h3>
                <div className="text-3xl font-bold text-teal-oasis mb-2">
                  ${destination.priceFrom}
                  <span className="text-lg font-normal text-gray-500">/day</span>
                </div>
                <p className="text-gray-600 mb-4">Per person, based on double occupancy</p>
                <Button className="w-full bg-teal-oasis text-white hover:bg-accent-coral transition-colors">
                  Plan Your Visit
                </Button>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="border border-cool-limestone">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-teal-oasis mr-3" />
                    <span className="text-gray-700">Region: {destination.region}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-gold-accent mr-3" />
                    <span className="text-gray-700">Rating: {destination.rating}/5</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-accent-coral mr-3" />
                    <span className="text-gray-700">Recommended: 2-3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            {destination.bestTimeToVisit && (
              <Card className="border border-cool-limestone">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Best Time to Visit</h3>
                  <p className="text-gray-700">{destination.bestTimeToVisit}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
