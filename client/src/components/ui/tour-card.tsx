import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Tour } from "@/types";

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export default function TourCard({ tour, featured = false }: TourCardProps) {
  const getBadgeInfo = () => {
    if (tour.isPopular) return { label: "Most Popular", color: "bg-gold-accent" };
    if (tour.isLuxury) return { label: "Luxury", color: "bg-accent-coral" };
    if (tour.category === "Adventure") return { label: "Adventure", color: "bg-teal-oasis" };
    return { label: tour.category, color: "bg-teal-oasis" };
  };

  const badge = getBadgeInfo();

  return (
    <Card className={`card-hover bg-white rounded-2xl overflow-hidden shadow-xl border border-cool-limestone ${featured ? 'lg:col-span-1' : ''}`}>
      <div className={`relative ${featured ? 'h-80' : 'h-48'} bg-cover bg-center`} style={{ backgroundImage: `url(${tour.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-6 left-6">
          <span className={`${badge.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
            {badge.label}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-bold text-white mb-2 font-serif`}>
            {tour.name}
          </h3>
          <p className="text-white/90 text-lg">{tour.shortDescription}</p>
        </div>
      </div>
      
      <CardContent className={`${featured ? 'p-8' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-gold-accent mr-1 fill-current" />
              <span className="text-sm font-semibold">{tour.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{tour.reviewCount} reviews</span>
          </div>
          <div className="text-right">
            <div className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-teal-oasis`}>
              ${tour.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          {tour.included.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 text-green-500 mr-3">✓</div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{tour.duration} days</span>
          <span className="text-gray-400">•</span>
          <Users className="w-4 h-4" />
          <span>{tour.difficulty}</span>
        </div>
        
        <div className="flex space-x-4">
          <Link href={`/tours/${tour.slug}`} className="flex-1">
            <Button className="w-full bg-teal-oasis text-white hover:bg-accent-coral transition-colors">
              View Itinerary
            </Button>
          </Link>
          <Button variant="outline" className="border-2 border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white transition-colors">
            Customize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
