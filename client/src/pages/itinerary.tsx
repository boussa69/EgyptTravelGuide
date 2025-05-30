import { useParams, useLocation } from "wouter";
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
  const [location, navigate] = useLocation();
  const [expandedFAQ, setExpandedFAQ] = useState<number[]>([0, 1]);

  const { data: tour, isLoading, error } = useQuery({
    queryKey: ["/api/tours", slug],
    queryFn: () => toursApi.getBySlug(slug!),
    enabled: !!slug,
  });

  // Fetch itinerary data
  const { data: itineraryDays, isLoading: itineraryLoading } = useQuery({
    queryKey: ["/api/tours", tour?.id, "itinerary"],
    queryFn: () => fetch(`/api/tours/${tour?.id}/itinerary`).then(res => res.json()),
    enabled: !!tour?.id,
  });

  // Fetch accommodation options
  const { data: accommodationOptions, isLoading: accommodationsLoading } = useQuery({
    queryKey: ["/api/tours", tour?.id, "accommodations"],
    queryFn: () => fetch(`/api/tours/${tour?.id}/accommodations`).then(res => res.json()),
    enabled: !!tour?.id,
  });

  // Fetch FAQ items
  const { data: faqs, isLoading: faqsLoading } = useQuery({
    queryKey: ["/api/tours", tour?.id, "faqs"],
    queryFn: () => fetch(`/api/tours/${tour?.id}/faqs`).then(res => res.json()),
    enabled: !!tour?.id,
  });

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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

  if (isLoading) {
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

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Tour Not Found</h1>
          <p className="text-gray-600">The requested tour could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

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
                {itineraryDays && itineraryDays.length > 0 ? (
                  itineraryDays.flatMap((day: any) => 
                    day.highlights && Array.isArray(day.highlights) ? day.highlights : []
                  ).map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 col-span-2">Loading highlights...</div>
                )}
              </div>
            </div>
            <div className="bg-champagne-sand rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">From ${tour.price}</h3>
              <p className="text-gray-600 mb-6">per person</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Next departure: {tour.nextDeparture || 'Contact for dates'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>{tour.cancellationPolicy || 'Free cancellation up to 30 days'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Only {tour.spotsRemaining || 0} spots remaining</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  console.log('Navigating to booking with slug:', slug);
                  navigate(`/booking?tour=${slug}`);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </section>

        {/* Day-by-Day Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Day-by-Day Itinerary</h2>
          {itineraryLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {itineraryDays?.map((day: any) => (
                <Card key={day.id} data-day={day.dayNumber} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/3 bg-gray-200 h-48 lg:h-auto">
                        {day.imageUrl ? (
                          <img 
                            src={day.imageUrl} 
                            alt={day.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="lg:w-2/3 p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-teal-600 text-white">Day {day.dayNumber}</Badge>
                          <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-gold-accent" />
                            <span className="text-sm text-gray-600">{day.meals?.join(', ') || 'See itinerary'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-gold-accent" />
                            <span className="text-sm text-gray-600">{day.accommodation || 'Hotel accommodation'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-gold-accent" />
                            <span className="text-sm text-gray-600">{day.transport || 'Private transfer'}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{day.dailyProgram || day.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.highlights?.map((highlight: string, i: number) => (
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
          )}
        </section>

        {/* Accommodation & Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Accommodation & Pricing</h2>
          {accommodationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-8 w-20 mb-4" />
                    <div className="space-y-2 mb-6">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accommodationOptions?.map((option: any, index: number) => (
                <Card key={option.id} className={`relative ${option.isPopular ? 'ring-2 ring-gold-accent' : ''}`}>
                  {option.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gold-accent text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.type}</h3>
                    <p className="text-gray-600 mb-4">{option.name}</p>
                    <div className="text-3xl font-bold text-teal-600 mb-4">
                      ${option.pricePerPerson}
                      <span className="text-sm font-normal text-gray-600">/person</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {option.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-teal-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        option.isPopular
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
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Frequently Asked Questions</h2>
          {faqsLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs?.map((faq: any, index: number) => (
                <Card key={faq.id || index}>
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
          )}
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