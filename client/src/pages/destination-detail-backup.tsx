import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { destinationsApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Users, DollarSign, Camera, Plane, Hotel, Utensils, Navigation, Thermometer, Shield, ChevronRight, Play, Pause } from "lucide-react";
import { Link } from "wouter";
import DestinationMap from "@/components/destination-map";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState("overview");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
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

  // Set document title
  useEffect(() => {
    if (destination) {
      document.title = `${destination.name} - Destinations | EgyptTravel`;
      // Clear any potential duplicate content
      const existingDuplicates = document.querySelectorAll('[data-duplicate-city]');
      existingDuplicates.forEach(el => el.remove());
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

  // Sample data for features - in real app this would come from API
  const popularTours = [
    {
      id: 1,
      name: "Grand Cairo Explorer",
      duration: "3 days",
      rating: 4.8,
      priceFrom: "€320",
      image: destination.imageUrl, 
      tags: ["Historical", "Cultural"]
    },
    {
      id: 2,
      name: "Nile River Cruise",
      duration: "5 days", 
      rating: 4.9,
      priceFrom: "€650",
      image: destination.imageUrl, 
      tags: ["Cultural", "Authentic"]
    }
  ];

  return (
    <div className="min-h-screen bg-cool-limestone">
      {/* Hero Section - 75vh */}
      <div className="relative h-[75vh] overflow-hidden">
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

        {/* Culture & History Section */}
        <section id="culture" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Rich Culture & Ancient History
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in millennia of fascinating Egyptian heritage and living traditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ancient Wonders",
                description: "Explore pyramids, temples, and tombs that have stood for thousands of years",
                icon: "🏛️",
                highlights: ["Pyramids of Giza", "Sphinx", "Ancient Temples"]
              },
              {
                title: "Living Culture", 
                description: "Experience vibrant markets, traditional crafts, and authentic Egyptian hospitality",
                icon: "🎭",
                highlights: ["Local Markets", "Traditional Crafts", "Cultural Events"]
              },
              {
                title: "Culinary Heritage",
                description: "Savor authentic Egyptian cuisine and traditional dishes passed down through generations",
                icon: "🍽️", 
                highlights: ["Traditional Dishes", "Street Food", "Local Restaurants"]
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <div className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-teal-oasis rounded-full" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Planning Section */}
        <section id="planning" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Plan Your Perfect Visit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential information to help you make the most of your {destination.name} experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Travel Tips */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plane className="h-6 w-6 text-teal-oasis mr-3" />
                Travel Tips
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Calendar, title: "Best Time to Visit", desc: "October to April for ideal weather" },
                  { icon: Thermometer, title: "Weather", desc: "Hot summers, mild winters" },
                  { icon: DollarSign, title: "Budget", desc: "€50-150 per day depending on style" },
                  { icon: Shield, title: "Safety", desc: "Generally safe with standard precautions" }
                ].map(({ icon: Icon, title, desc }, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-teal-oasis mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{title}</h4>
                      <p className="text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Getting Around */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Navigation className="h-6 w-6 text-teal-oasis mr-3" />
                Getting Around
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Hotel, title: "Accommodation", desc: "Luxury hotels to budget hostels available" },
                  { icon: Utensils, title: "Dining", desc: "Street food, local restaurants, international cuisine" },
                  { icon: MapPin, title: "Transportation", desc: "Taxis, metro, buses, and walking tours" },
                  { icon: Camera, title: "Must-See", desc: "Book major attractions in advance" }
                ].map(({ icon: Icon, title, desc }, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-teal-oasis mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{title}</h4>
                      <p className="text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Tours Section */}
        <section id="tours" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Popular Tours & Experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully curated experiences to help you discover the best of {destination.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {popularTours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={tour.image} 
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      {tour.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{tour.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-teal-oasis">
                      from {tour.priceFrom}
                    </div>
                  </div>
                  <Button className="w-full bg-teal-oasis hover:bg-teal-700 text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
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
          
          {/* Testimonial */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <blockquote className="text-lg italic mb-4">
                "The trip to {destination.name} exceeded all expectations. Every detail was perfectly planned, 
                and our guide's knowledge brought the ancient history to life."
              </blockquote>
              <p className="text-white/70">— Recent Traveler</p>
            </div>
          </div>
        </div>
      </section>

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