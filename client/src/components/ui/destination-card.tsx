import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const getPopularityBadge = () => {
    if (destination.reviewCount > 2000) return { label: "Most Popular", color: "bg-gold-accent" };
    if (destination.name.includes("UNESCO") || destination.name.includes("World")) return { label: "UNESCO Site", color: "bg-accent-coral" };
    if (destination.name.includes("Red Sea")) return { label: "Beach Paradise", color: "bg-teal-oasis" };
    if (destination.name.includes("Desert")) return { label: "Adventure", color: "bg-teal-oasis" };
    return { label: "Heritage Site", color: "bg-accent-coral" };
  };

  const badge = getPopularityBadge();

  return (
    <Card className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-cool-limestone">
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${destination.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {badge.label}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold font-serif">{destination.name}</h3>
          <p className="text-white/90">{destination.region}</p>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex text-gold-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < destination.rating ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {destination.rating} ({destination.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span>From ${destination.priceFrom}/day</span>
          </div>
          <Link href={`/destinations/${destination.slug}`}>
            <Button variant="ghost" className="text-teal-oasis font-semibold hover:text-accent-coral transition-colors">
              Explore {destination.name} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
