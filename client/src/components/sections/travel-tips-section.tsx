import { useQuery } from "@tanstack/react-query";
import { travelTipsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, DollarSign, MessageCircle, Shield, Wifi, Heart } from "lucide-react";

const iconMap = {
  "Car": Car,
  "DollarSign": DollarSign,
  "MessageCircle": MessageCircle,
  "Shield": Shield,
  "Wifi": Wifi,
  "Heart": Heart,
};

const tipsData = [
  {
    icon: Car,
    title: "Transportation",
    tips: ["Uber and Careem available in major cities", "Domestic flights for long distances", "Train travel between major destinations"],
    color: "teal-oasis"
  },
  {
    icon: DollarSign,
    title: "Money & Payments",
    tips: ["Egyptian Pound (EGP) is local currency", "Cash preferred for small purchases", "ATMs widely available in cities"],
    color: "gold-accent"
  },
  {
    icon: MessageCircle,
    title: "Language & Communication",
    tips: ["Arabic is official, English widely spoken", "Tourist areas have multilingual staff", "Translation apps are helpful"],
    color: "accent-coral"
  },
  {
    icon: Shield,
    title: "Safety & Health",
    tips: ["Egypt is generally safe for tourists", "Stay hydrated and use sunscreen", "Travel insurance recommended"],
    color: "teal-oasis"
  },
  {
    icon: Wifi,
    title: "Internet & Connectivity",
    tips: ["WiFi available in hotels and cafes", "Local SIM cards for data access", "4G coverage in major areas"],
    color: "gold-accent"
  },
  {
    icon: Heart,
    title: "Cultural Etiquette",
    tips: ["Dress modestly at religious sites", "Remove shoes when entering mosques", "Respect local customs and traditions"],
    color: "accent-coral"
  }
];

export default function TravelTipsSection() {
  const { data: tips, isLoading, error } = useQuery({
    queryKey: ["/api/travel-tips"],
    queryFn: () => travelTipsApi.getAll(),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load travel tips. Please try again later.</p>
      </div>
    );
  }

  return (
    <section id="tips" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Essential <span className="text-teal-oasis">Travel</span> Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insider knowledge and practical advice to make your Egyptian journey smooth, safe, and unforgettable.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tipsData.map(({ icon: Icon, title, tips, color }) => (
              <div key={title} className="bg-champagne-sand rounded-2xl p-8 border border-cool-limestone">
                <div className={`w-16 h-16 bg-${color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>
                <ul className="space-y-3 text-gray-600">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-center">
                      <span className={`w-2 h-2 bg-${color} rounded-full mr-3`} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
