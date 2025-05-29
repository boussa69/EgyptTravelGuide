import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { toursApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Bed, 
  Car, 
  Utensils, 
  Camera,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Itinerary() {
  const { slug } = useParams();
  const [activeDay, setActiveDay] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number[]>([0, 1]);

  const { data: tour, isLoading, error } = useQuery({
    queryKey: ["/api/tours", slug],
    queryFn: () => toursApi.getBySlug(slug!),
    enabled: !!slug,
  });

  // Scroll spy effect for active day
  useEffect(() => {
    const handleScroll = () => {
      const dayElements = document.querySelectorAll('[data-day]');
      let currentDay = 1;
      
      dayElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentDay = parseInt(element.getAttribute('data-day') || '1');
        }
      });
      
      setActiveDay(currentDay);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Tour Not Found</h1>
          <p className="text-gray-600">The requested tour could not be found.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !tour) {
    return (
      <div className="min-h-screen bg-white">
        <Skeleton className="h-96 w-full" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  const days = tour.duration || 7;
  const dayArray = Array.from({ length: days }, (_, i) => i + 1);

  const scrollToDay = (day: number) => {
    const element = document.querySelector(`[data-day="${day}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const mockItinerary = [
    {
      day: 1,
      title: "Arrival in Cairo",
      highlights: ["Airport transfer", "Hotel check-in", "Welcome dinner"],
      meals: ["Dinner"],
      accommodation: "5-star Cairo Hotel",
      activities: "Airport pickup, welcome briefing"
    },
    {
      day: 2,
      title: "Pyramids of Giza & Sphinx",
      highlights: ["Great Pyramid tour", "Sphinx visit", "Camel ride option"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "5-star Cairo Hotel",
      activities: "Full day Giza complex exploration"
    },
    {
      day: 3,
      title: "Egyptian Museum & Old Cairo",
      highlights: ["Tutankhamun treasures", "Coptic Cairo", "Khan el-Khalili Bazaar"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "5-star Cairo Hotel",
      activities: "Cultural immersion day"
    }
  ];

  const accommodationOptions = [
    {
      type: "Standard",
      name: "4-Star Hotels",
      price: 1299,
      features: ["Private bathrooms", "Air conditioning", "Daily breakfast", "City center locations"]
    },
    {
      type: "Deluxe",
      name: "5-Star Hotels",
      price: 1899,
      features: ["Luxury amenities", "Pool & spa access", "Premium locations", "Concierge service"]
    },
    {
      type: "Luxury",
      name: "Premium Collection",
      price: 2799,
      features: ["Ultra-luxury hotels", "Butler service", "Private transfers", "Exclusive experiences"]
    }
  ];

  const faqs = [
    {
      question: "What's included in the tour price?",
      answer: "All accommodation, daily breakfast, guided tours, entrance fees, and airport transfers are included."
    },
    {
      question: "What should I pack for Egypt?",
      answer: "Light, breathable clothing, comfortable walking shoes, sun protection, and modest attire for religious sites."
    },
    {
      question: "Is Egypt safe for tourists?",
      answer: "Yes, Egypt is generally very safe for tourists. We work with trusted local partners and follow all safety protocols."
    },
    {
      question: "Can the itinerary be customized?",
      answer: "Absolutely! We can modify the itinerary to match your interests, budget, and travel style."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Progress Navigation - Desktop */}
      <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
          <div className="space-y-1">
            {dayArray.map((day) => (
              <button
                key={day}
                onClick={() => scrollToDay(day)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeDay === day
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-teal-900 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <Badge className="bg-gold-accent text-white mb-4">
              Most Popular
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              {tour.name}
            </h1>
            <p className="text-xl mb-6 opacity-90">
              {tour.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Small Group • Max 12</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-gold-accent text-gold-accent" />
                <span>4.9 (847 reviews)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gold-accent hover:bg-gold-accent/90 text-white">
                Reserve Spot
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-700">
                Customize Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trip Snapshot */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Trip Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights && Array.isArray(tour.highlights) && tour.highlights.length > 0 
                  ? tour.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))
                  : (
                  <>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Pyramids of Giza & Sphinx</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Valley of the Kings & Karnak Temple</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Abu Simbel & Nile Felucca Ride</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      <span>Egyptian Museum & Khan el-Khalili</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-champagne-sand rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">From ${tour.price}</h3>
              <p className="text-gray-600 mb-6">per person</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Next departure: March 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>Free cancellation up to 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Only 3 spots remaining</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700">
                Check Availability
              </Button>
            </div>
          </div>
        </section>

        {/* Day-by-Day Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Day-by-Day Itinerary</h2>
          <div className="space-y-6">
            {mockItinerary.map((day, index) => (
              <Card key={day.day} data-day={day.day} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 bg-gray-200 h-48 lg:h-auto">
                      <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="lg:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-teal-600 text-white">Day {day.day}</Badge>
                        <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-gold-accent" />
                          <span className="text-sm text-gray-600">{day.meals.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-gold-accent" />
                          <span className="text-sm text-gray-600">{day.accommodation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gold-accent" />
                          <span className="text-sm text-gray-600">Private transfer</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{day.activities}</p>
                      <div className="flex flex-wrap gap-2">
                        {day.highlights.map((highlight, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Accommodation & Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Accommodation & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accommodationOptions.map((option, index) => (
              <Card key={option.type} className={`relative ${index === 1 ? 'ring-2 ring-gold-accent' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gold-accent text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.type}</h3>
                  <p className="text-gray-600 mb-4">{option.name}</p>
                  <div className="text-3xl font-bold text-teal-600 mb-4">
                    ${option.price}
                    <span className="text-sm font-normal text-gray-600">/person</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      index === 1 
                        ? 'bg-gold-accent hover:bg-gold-accent/90' 
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    Select {option.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    {expandedFAQ.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ.includes(index) && (
                    <div className="px-6 pb-6">
                      <Separator className="mb-4" />
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-champagne-sand rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
            Ready to Explore Ancient Egypt?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have experienced the magic of Egypt with our expert guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-accent hover:bg-gold-accent/90 text-white">
              Book This Tour
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +1-800-EGYPT
            </Button>
          </div>
        </section>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <Button className="w-full bg-gold-accent hover:bg-gold-accent/90 text-white py-4 text-lg font-semibold">
          Book Now - From ${tour.price}
        </Button>
      </div>
    </div>
  );
}