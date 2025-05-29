import { useQuery } from "@tanstack/react-query";
import { travelTipsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, DollarSign, MessageCircle, Shield, Wifi, Heart, ShoppingBag, Users, UserCheck, Camera, Smartphone, Cross, CreditCard, MapPin } from "lucide-react";

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
    title: "Getting Around",
    tips: ["Uber and Careem available in major cities", "Domestic flights for long distances", "Train travel between major destinations"],
    color: "teal-oasis"
  },
  {
    icon: CreditCard,
    title: "Currency & Payments",
    tips: ["Egyptian Pound (EGP) is local currency", "Cash preferred for small purchases", "ATMs widely available in cities"],
    color: "gold-accent"
  },
  {
    icon: Smartphone,
    title: "Connectivity & SIM Cards",
    tips: ["WiFi available in hotels and cafes", "Local SIM cards for data access", "4G coverage in major areas"],
    color: "accent-coral"
  },
  {
    icon: Cross,
    title: "Health & Vaccinations",
    tips: ["No mandatory vaccines for most countries", "Hepatitis A & B recommended", "Travel insurance essential"],
    color: "teal-oasis"
  },
  {
    icon: ShoppingBag,
    title: "Shopping & Bargaining",
    tips: ["Bargaining expected in markets", "Start at 30-50% of asking price", "Fixed prices in malls and restaurants"],
    color: "gold-accent"
  },
  {
    icon: Users,
    title: "Family-Friendly Egypt",
    tips: ["Kid-friendly attractions available", "Family rooms in most hotels", "Child discounts at many sites"],
    color: "accent-coral"
  },
  {
    icon: UserCheck,
    title: "Women Travellers' Tips",
    tips: ["Dress modestly, especially at religious sites", "Solo female travel is generally safe", "Consider joining group tours"],
    color: "teal-oasis"
  },
  {
    icon: Camera,
    title: "Photography & Drone Rules",
    tips: ["Photography fees at some tourist sites", "Drone permits required", "Respect photography restrictions"],
    color: "gold-accent"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tipsData.map(({ icon: Icon, title, tips, color }, index) => {
              const colorClass = color === 'teal-oasis' ? 'text-teal-600' : 
                                color === 'gold-accent' ? 'text-yellow-600' : 'text-orange-600';
              const bgColorClass = color === 'teal-oasis' ? 'bg-teal-100' : 
                                  color === 'gold-accent' ? 'bg-yellow-100' : 'bg-orange-100';
              const dotColorClass = color === 'teal-oasis' ? 'bg-teal-600' : 
                                   color === 'gold-accent' ? 'bg-yellow-600' : 'bg-orange-600';
              
              return (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${bgColorClass} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 font-serif">{title}</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    {tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <span className={`w-1.5 h-1.5 ${dotColorClass} rounded-full mr-2 mt-2 flex-shrink-0`} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
