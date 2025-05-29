import { useQuery } from "@tanstack/react-query";
import { planningResourcesApi } from "@/lib/api";
import PlanningCard from "@/components/ui/planning-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, CheckCircle, Package, Heart, DollarSign, Shield, ArrowDown, MessageCircle, Filter, Car, CreditCard, Smartphone, Cross, ShoppingBag, Users, UserCheck, Camera, CalendarDays } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const quickGuides = [
  { 
    icon: Sun, 
    title: "Best Time to Visit", 
    description: "October to April offers perfect weather for sightseeing",
    category: "Practical",
    slug: "best-time-to-visit",
    badge: "Updated 2025"
  },
  { 
    icon: CheckCircle, 
    title: "Visa & Entry", 
    description: "Easy visa on arrival or e-visa options available for most nationalities.",
    category: "Practical",
    slug: "visa-entry"
  },
  { 
    icon: Package, 
    title: "Packing Guide", 
    description: "Essential items for comfort and cultural respect during your Egyptian journey.",
    category: "Practical",
    slug: "packing-guide"
  },
  { 
    icon: Heart, 
    title: "Cultural Etiquette", 
    description: "Understand local customs and traditions for meaningful cultural exchange.",
    category: "Culture",
    slug: "cultural-etiquette"
  },
  { 
    icon: DollarSign, 
    title: "Budget Planning", 
    description: "Get detailed cost breakdowns for accommodation, food, transportation, and activities.",
    category: "Practical",
    slug: "budget-planning"
  },
  { 
    icon: Shield, 
    title: "Safety & Insurance", 
    description: "Important health tips, safety guidelines, and travel insurance recommendations.",
    category: "Practical",
    slug: "safety-insurance"
  },
  {
    icon: Car,
    title: "Getting Around",
    description: "Transportation options including Uber, trains, and domestic flights.",
    category: "Practical",
    slug: "getting-around"
  },
  {
    icon: CreditCard,
    title: "Currency & Payments",
    description: "Egyptian Pound, ATMs, payment methods, and money exchange tips.",
    category: "Practical",
    slug: "currency-payments"
  },
  {
    icon: Smartphone,
    title: "Connectivity & SIM Cards",
    description: "Internet access, local SIM cards, and staying connected while traveling.",
    category: "Practical",
    slug: "connectivity-sim"
  },
  {
    icon: Cross,
    title: "Health & Vaccinations",
    description: "Medical preparation, recommended vaccines, and health precautions.",
    category: "Practical",
    slug: "health-vaccinations"
  },
  {
    icon: ShoppingBag,
    title: "Shopping & Bargaining",
    description: "Market navigation, bargaining tips, and shopping etiquette.",
    category: "Culture",
    slug: "shopping-bargaining"
  },
  {
    icon: Users,
    title: "Family-Friendly Egypt",
    description: "Travel advice for families with children and kid-friendly attractions.",
    category: "Family",
    slug: "family-friendly"
  },
  {
    icon: UserCheck,
    title: "Women Travellers' Tips",
    description: "Safety advice and cultural guidance for female travelers.",
    category: "Practical",
    slug: "women-travelers"
  },
  {
    icon: Camera,
    title: "Photography & Drone Rules",
    description: "Camera regulations, photography fees, and drone permit requirements.",
    category: "Adventure",
    slug: "photography-drones"
  },
  {
    icon: CalendarDays,
    title: "Festivals & Public Holidays",
    description: "Egyptian celebrations, religious holidays, and festival calendar planning.",
    category: "Culture",
    slug: "festivals-holidays"
  },
];

const filterCategories = ["All", "Practical", "Culture", "Adventure", "Family"];

export default function TravelPlanning() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["/api/planning-resources"],
    queryFn: () => planningResourcesApi.getAll(),
  });

  const filteredGuides = quickGuides.filter(guide => 
    activeFilter === "All" || guide.category === activeFilter
  );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingLeft: 'min(6vw, 4rem)', paddingRight: 'min(6vw, 4rem)' }}>
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Plan Your <span className="text-teal-oasis">Perfect</span> Egyptian Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Hand-picked advice from Egypt-based experts. Everything you need to know for an unforgettable Egyptian adventure.
          </p>
          <Button 
            variant="outline" 
            className="border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white transition-all duration-300"
          >
            Browse tips by theme <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Filter className="h-5 w-5 text-gray-400 mr-2 mt-1" />
          {filterCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full transition-all duration-300 ${
                activeFilter === category 
                  ? "bg-teal-oasis hover:bg-teal-700" 
                  : "border-gray-300 hover:border-teal-oasis hover:text-teal-oasis"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 mb-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {filteredGuides.map((guide, index) => (
              <Card 
                key={guide.title} 
                className="group relative bg-white rounded-xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                style={{ 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon Area */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border-2 border-teal-oasis/20 flex items-center justify-center group-hover:border-teal-oasis group-hover:bg-teal-oasis/10 transition-all duration-300">
                        <guide.icon className="h-6 w-6 text-teal-oasis group-hover:text-gold-accent transition-colors duration-300" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-oasis transition-colors duration-300">
                          {guide.title}
                        </h3>
                        {guide.badge && (
                          <Badge variant="secondary" className="bg-accent-coral text-white text-xs px-2 py-1">
                            {guide.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ maxWidth: '32ch' }}>
                        {guide.description}
                      </p>
                      
                      <Link href={`/planning/${guide.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-gray-900 hover:text-gold-accent font-semibold group-hover:text-gold-accent transition-colors duration-300"
                        >
                          Learn More →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Conversion Banner */}
        <div className="bg-gradient-to-r from-teal-oasis to-teal-700 rounded-2xl p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Start Planning?</h2>
          <p className="text-lg text-teal-100 mb-6 max-w-2xl mx-auto">
            Get personalized advice from our Egypt travel experts. We'll help you create the perfect itinerary for your journey.
          </p>
          <Button 
            size="lg" 
            className="bg-gold-accent hover:bg-gold-accent/90 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Plan my itinerary with an expert
          </Button>
        </div>

        {/* Additional Planning Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
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

      {/* Sticky Help Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-accent-coral hover:bg-accent-coral/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 px-6 py-3"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat with an Egypt expert
        </Button>
      </div>
    </div>
  );
}
