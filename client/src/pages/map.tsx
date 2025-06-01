import InteractiveMap from "@/components/interactive-map";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function MapPage() {
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: () => destinationsApi.getAll(),
  });

  const destinationsWithCoordinates = destinations.filter(dest => dest.latitude && dest.longitude);
  const regionStats = destinations.reduce((acc, dest) => {
    acc[dest.region] = (acc[dest.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-cool-limestone">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Explore Egypt's <span className="text-teal-oasis">Interactive</span> Map
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover all {destinationsWithCoordinates.length} Egyptian destinations on our interactive map. 
              Click any marker to explore detailed information about each location.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-oasis">{destinationsWithCoordinates.length}</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-oasis">{Object.keys(regionStats).length}</div>
                <div className="text-sm text-gray-600">Regions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-oasis">
                  {Math.round(destinations.reduce((sum, dest) => sum + dest.rating, 0) / destinations.length * 10) / 10}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-oasis">
                  ${Math.min(...destinations.map(dest => dest.priceFrom))}+
                </div>
                <div className="text-sm text-gray-600">From Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Interactive Destination Map</h2>
            <p className="text-gray-600">
              Hover over markers to see quick information, or click to view detailed destination cards. 
              Use map controls to zoom and navigate across Egypt.
            </p>
          </div>
          
          <InteractiveMap />
        </div>
      </div>

      {/* Regions Overview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-serif">
            Destinations by Region
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(regionStats).map(([region, count]) => {
              const regionDestinations = destinations.filter(dest => dest.region === region);
              const avgRating = regionDestinations.reduce((sum, dest) => sum + dest.rating, 0) / regionDestinations.length;
              const minPrice = Math.min(...regionDestinations.map(dest => dest.priceFrom));
              
              return (
                <Card key={region} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 font-serif">{region}</h3>
                        <p className="text-gray-600">{count} destinations</p>
                      </div>
                      <Badge variant="secondary" className="bg-teal-oasis text-white">
                        {count}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-sm">{avgRating.toFixed(1)} rating</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-teal-oasis mr-2" />
                        <span className="text-sm">From ${minPrice}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Featured Destinations:</p>
                      {regionDestinations.slice(0, 3).map((dest) => (
                        <Link key={dest.id} href={`/destinations/${dest.slug}`}>
                          <div className="flex items-center text-sm text-gray-600 hover:text-teal-oasis cursor-pointer">
                            <MapPin className="h-3 w-3 mr-2" />
                            <span>{dest.name}</span>
                          </div>
                        </Link>
                      ))}
                      {regionDestinations.length > 3 && (
                        <div className="text-xs text-gray-500 mt-2">
                          +{regionDestinations.length - 3} more destinations
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Features */}
      <div className="py-16 bg-cool-limestone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-serif">
            Map Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-oasis rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Markers</h3>
              <p className="text-gray-600">
                Click on any destination marker to view detailed information including ratings, prices, and highlights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-oasis rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Data</h3>
              <p className="text-gray-600">
                All destinations feature real GPS coordinates, genuine reviews, and authentic pricing information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-oasis rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Navigation</h3>
              <p className="text-gray-600">
                Zoom, pan, and explore Egypt's diverse regions from the Mediterranean coast to the Red Sea.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}