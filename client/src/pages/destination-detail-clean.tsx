import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { destinationsApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Users, DollarSign, Camera, Plane, Hotel, Utensils, Navigation, Thermometer, Shield, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import DestinationMap from "@/components/destination-map";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("overview");
  const [showStickyNav, setShowStickyNav] = useState(false);
  
  const { data: destination, isLoading, error } = useQuery({
    queryKey: ["/api/destinations", slug],
    queryFn: () => destinationsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  // Handle sticky navigation and page title
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set document title with cleanup to prevent duplicate text rendering
  useEffect(() => {
    if (destination) {
      document.title = `${destination.name} - Destinations | EgyptTravel`;
    }
  }, [destination]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-oasis border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-8">The destination you're looking for doesn't exist.</p>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cool-limestone">
      {/* CSS to prevent duplicate text rendering */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-container {
            position: relative;
            isolation: isolate;
            z-index: 1;
          }
          .hero-container::before,
          .hero-container::after {
            display: none !important;
          }
          body > *:not([data-radix-portal]):not(.min-h-screen) {
            position: relative;
          }
        `
      }} />
      
      {/* Hero Section - 75vh */}
      <div className="hero-container relative h-[75vh] overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Breadcrumbs */}
        <div className="absolute top-6 left-6 z-10 bg-black/20 rounded px-3 py-2">
          <nav className="flex items-center space-x-2 text-white/90 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{destination.name}</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <Badge variant="secondary" className="bg-teal-oasis text-white mb-4">
              {destination.region}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              {destination.name} — Gateway to History
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Ancient wonders meet timeless culture along the eternal Nile
            </p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">5</span>
                <span className="text-white/70">Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-semibold">2-3 days</span>
                <span className="text-white/70">Typical Stay</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg font-semibold">Oct-Apr</span>
                <span className="text-white/70">Best Season</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-teal-oasis hover:bg-teal-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Explore {destination.name}
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      {showStickyNav && (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center space-x-8 py-4">
              <h2 className="font-bold text-lg text-gray-900">{destination.name}</h2>
              <div className="flex items-center space-x-6">
                {["overview", "map", "culture", "planning", "tours"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section 
                        ? "bg-teal-oasis text-white" 
                        : "text-gray-600 hover:text-teal-oasis hover:bg-teal-50"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Navigation */}
        <div className="flex justify-center mb-12">
          <nav className="bg-white rounded-full shadow-lg p-2">
            <div className="flex items-center space-x-2">
              {[
                { id: "overview", label: "Overview", icon: Star },
                { id: "map", label: "Map", icon: MapPin },
                { id: "culture", label: "Culture", icon: Camera },
                { id: "planning", label: "Planning", icon: Calendar },
                { id: "tours", label: "Tours", icon: Users }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 ${
                    activeSection === id 
                      ? "bg-teal-oasis text-white shadow-lg" 
                      : "text-gray-600 hover:text-teal-oasis hover:bg-teal-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Overview Section */}
        <section id="overview" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                Discover the Wonders of {destination.name}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {destination.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-teal-oasis" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Region:</span> {destination.region}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-teal-oasis" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Attractions:</span> {destination.attractions?.length || 0}+
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-teal-oasis" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Rating:</span> 4.8/5
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal-oasis" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Best Duration:</span> 2-3 days
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={destination.imageUrl} 
                alt={destination.name}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 text-white">
                <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                  UNESCO World Heritage
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Explore {destination.name} on the Map
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover key attractions, dining spots, and accommodations in and around {destination.name}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <DestinationMap destination={destination} />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center bg-gradient-to-r from-teal-oasis to-warm-terracotta rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Ready to Experience {destination.name}?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let our expert travel planners create your perfect Egyptian adventure. 
            From ancient wonders to modern comforts, we'll handle every detail.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-teal-oasis hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold"
            >
              Get Custom Itinerary
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-oasis rounded-full px-8 py-4 text-lg font-semibold"
            >
              Browse All Tours
            </Button>
          </div>
        </section>
      </div>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-teal-oasis hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 px-6 py-3"
        >
          Plan Your Egypt Journey
        </Button>
      </div>
    </div>
  );
}