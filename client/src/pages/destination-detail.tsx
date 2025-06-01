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
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Destination Not Found</h1>
          <p className="text-gray-600">The destination you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const sampleJourneys = [
    {
      title: `Classic Nile Cruise from ${destination.name}`,
      duration: "4 days",
      priceFrom: "€1,250",
      image: destination.imageUrl,
      tags: ["Family-friendly", "Cultural"]
    },
    {
      title: `Luxury ${destination.name} Experience`,
      duration: "2 days", 
      priceFrom: "€850",
      image: destination.imageUrl,
      tags: ["Luxury", "Archaeological"]
    },
    {
      title: `${destination.name} Culture Immersion`,
      duration: "3 days",
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
        <div className="absolute top-6 left-6 z-10">
          <div className="flex items-center space-x-2 text-white/90 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{destination.name}</span>
          </div>
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
            
            {/* Quick Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-bold">{destination.rating}</span>
                </div>
                <div className="text-sm text-white/80">Rating</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-1">2-3 days</div>
                <div className="text-sm text-white/80">Typical Stay</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-1">Oct-Apr</div>
                <div className="text-sm text-white/80">Best Season</div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-1">GMT+2</div>
                <div className="text-sm text-white/80">Time Zone</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      {showStickyNav && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => scrollToSection('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'overview' ? 'bg-teal-oasis text-white' : 'text-gray-600 hover:text-teal-oasis'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => scrollToSection('highlights')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'highlights' ? 'bg-teal-oasis text-white' : 'text-gray-600 hover:text-teal-oasis'
                  }`}
                >
                  Top Sights
                </button>
                <button 
                  onClick={() => scrollToSection('map')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'map' ? 'bg-teal-oasis text-white' : 'text-gray-600 hover:text-teal-oasis'
                  }`}
                >
                  Map
                </button>
                <button 
                  onClick={() => scrollToSection('practical')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'practical' ? 'bg-teal-oasis text-white' : 'text-gray-600 hover:text-teal-oasis'
                  }`}
                >
                  Practical Info
                </button>
                <button 
                  onClick={() => scrollToSection('tours')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === 'tours' ? 'bg-teal-oasis text-white' : 'text-gray-600 hover:text-teal-oasis'
                  }`}
                >
                  Tours & Cruises
                </button>
              </div>
              <Button className="bg-teal-oasis hover:bg-teal-700">
                Plan Your Journey
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{marginTop: showStickyNav ? '80px' : '0'}}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Section */}
            <section id="overview">
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Overview</h2>
                  
                  <div className="prose prose-lg max-w-none text-gray-600 mb-6">
                    <p className="mb-4 leading-relaxed">
                      {destination.description}
                    </p>
                    <p className="mb-4 leading-relaxed">
                      This remarkable destination offers visitors an extraordinary journey through time, where ancient monuments stand as silent witnesses to Egypt's glorious past. From magnificent temples to vibrant local culture, every corner tells a story waiting to be discovered.
                    </p>
                  </div>

                  {/* Embedded Video Reel */}
                  <div className="relative rounded-xl overflow-hidden mb-6">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">30-second {destination.name} highlights reel</p>
                        <p className="text-sm text-gray-400">Auto-pause feature</p>
                      </div>
                    </div>
                  </div>

                  {/* Micro Reviews */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">Recent traveler review</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "Absolutely breathtaking experience. {destination.name} exceeded all our expectations with its incredible history and warm hospitality."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Top Highlights */}
            <section id="highlights">
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Top Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.highlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-teal-oasis rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{highlight}</h3>
                          <p className="text-gray-600 text-sm">Experience the wonder of this incredible historical site</p>
                        </div>
                      </div>
                    )) || destination.attractions?.map((attraction, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-teal-oasis rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{attraction}</h3>
                          <p className="text-gray-600 text-sm">Discover the magnificence of this ancient wonder</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Interactive Map */}
            <section id="map">
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Interactive Map</h2>
                  <DestinationMap destination={destination} />
                </CardContent>
              </Card>
            </section>

            {/* Practical Info */}
            <section id="practical">
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Practical Information</h2>
                  
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <Calendar className="h-5 w-5 text-teal-oasis mr-2" />
                        When to Go
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <strong>Best time:</strong> October to April (20-25°C) - perfect for sightseeing and outdoor activities.
                      </p>
                      <p className="text-gray-600">
                        <strong>Summer (May-Sep):</strong> Very hot (35-45°C) but fewer crowds and lower prices.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <Plane className="h-5 w-5 text-teal-oasis mr-2" />
                        Getting There
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>By air:</strong> Direct flights from Cairo (1.5 hours)</p>
                        <p><strong>By train:</strong> Comfortable train service from Cairo and other major cities</p>
                        <p><strong>By road:</strong> Well-maintained highways connect to other destinations</p>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <Hotel className="h-5 w-5 text-teal-oasis mr-2" />
                        Where to Stay
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-semibold text-gray-900">Luxury</h4>
                          <p className="text-sm text-gray-600">5-star Nile view resorts</p>
                          <p className="text-sm text-teal-oasis">From $200/night</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-semibold text-gray-900">Mid-range</h4>
                          <p className="text-sm text-gray-600">Boutique hotels</p>
                          <p className="text-sm text-teal-oasis">From $80/night</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-semibold text-gray-900">Budget</h4>
                          <p className="text-sm text-gray-600">Local guesthouses</p>
                          <p className="text-sm text-teal-oasis">From $25/night</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <Users className="h-5 w-5 text-teal-oasis mr-2" />
                        Local Etiquette
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Dress modestly when visiting temples and religious sites</li>
                        <li>• Always ask permission before photographing locals</li>
                        <li>• Bargaining is expected in markets and souks</li>
                        <li>• Learn basic Arabic greetings - locals appreciate the effort</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Insider Tips */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Insider Tips</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {[
                    { tip: "Visit major sites early morning for the best photos and fewer crowds", icon: "🌅" },
                    { tip: "Try local cuisine at authentic restaurants recommended by your guide", icon: "🍽️" },
                    { tip: "Bring sun protection and stay hydrated during your explorations", icon: "☀️" },
                    { tip: "Respect local customs and dress codes when visiting religious sites", icon: "🕌" }
                  ].map((item, index) => (
                    <div key={index} className="flex-shrink-0 w-72 p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-sm text-gray-700">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Need to Know Card */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Need to Know</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reviews</span>
                    <span className="font-semibold">{destination.reviewCount?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Typical Stay</span>
                    <span className="font-semibold">2-3 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Best Season</span>
                    <span className="font-semibold">Oct-Apr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Time Zone</span>
                    <span className="font-semibold">GMT+2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold">Arabic, English</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-semibold">Egyptian Pound</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Current Weather</h3>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Thermometer className="h-6 w-6 text-orange-500 mr-2" />
                    <span className="text-3xl font-bold text-teal-oasis">28°C</span>
                  </div>
                  <div className="text-gray-600 mb-2">Sunny & Clear</div>
                  <div className="text-sm text-gray-500 mb-4">Perfect for sightseeing</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">Humidity</div>
                      <div className="font-semibold">35%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Wind</div>
                      <div className="font-semibold">8 km/h</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Badge */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Safety Status</h3>
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-700 font-semibold">Safe to visit</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Tourist areas are well-protected with dedicated security presence.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Check Latest Advisories
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sample Journeys Section */}
      <section id="tours" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Sample Journeys & Tours Starting in {destination.name}
            </h2>
            <p className="text-xl text-gray-600">
              Curated experiences showcasing the best of this magnificent destination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sampleJourneys.map((journey, index) => (
              <Card key={index} className="shadow-lg border-0 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img 
                    src={journey.image} 
                    alt={journey.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex space-x-2">
                      {journey.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-white/90 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{journey.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">{journey.duration}</span>
                    <span className="text-lg font-bold text-teal-oasis">from {journey.priceFrom} pp</span>
                  </div>
                  <Button className="w-full bg-teal-oasis hover:bg-teal-700">
                    View Itinerary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-gray-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8 font-serif">
              What Our Travelers Say
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <span className="text-white text-lg">{destination.rating}/5 from {destination.reviewCount?.toLocaleString()} reviews</span>
              </div>
              <blockquote className="text-xl text-white/90 italic mb-4">
                "{destination.name} exceeded all our expectations. The combination of ancient wonders and authentic culture made for an unforgettable experience. Our guide's knowledge brought the history to life."
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