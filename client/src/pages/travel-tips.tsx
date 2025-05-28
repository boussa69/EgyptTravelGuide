import { useQuery } from "@tanstack/react-query";
import { travelTipsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  DollarSign, 
  MessageCircle, 
  Shield, 
  Wifi, 
  Heart,
  Plane,
  Utensils,
  Camera,
  Clock,
  Thermometer,
  MapPin
} from "lucide-react";

const travelTipsData = [
  {
    icon: Car,
    title: "Transportation",
    category: "Getting Around",
    description: "Navigate Egypt with confidence using our comprehensive transport guide.",
    tips: [
      "Uber and Careem available in major cities like Cairo and Alexandria",
      "Domestic flights recommended for long distances (Cairo to Aswan)",
      "Train travel between Cairo-Luxor-Aswan on comfortable sleeper trains",
      "Private drivers available for day trips and desert excursions",
      "Metro system in Cairo connects major tourist areas",
      "Felucca boats for traditional Nile river transport"
    ],
    color: "teal-oasis",
    essentialInfo: "Book transportation in advance during peak season (December-February)"
  },
  {
    icon: DollarSign,
    title: "Money & Payments",
    category: "Financial Tips",
    description: "Master Egyptian currency and payment methods for smooth transactions.",
    tips: [
      "Egyptian Pound (EGP) is the local currency",
      "US Dollars and Euros widely accepted at hotels and tourist sites",
      "ATMs available in cities, but may be limited in remote areas",
      "Credit cards accepted at upscale establishments",
      "Carry cash for markets, local restaurants, and tips",
      "Negotiate prices at markets and for taxi rides"
    ],
    color: "gold-accent",
    essentialInfo: "Always carry small bills for tips - tipping is customary and expected"
  },
  {
    icon: MessageCircle,
    title: "Language & Communication",
    category: "Communication",
    description: "Bridge language barriers and connect with locals effectively.",
    tips: [
      "Arabic is the official language, Egyptian dialect is unique",
      "English widely spoken in tourist areas and hotels",
      "French and German understood by many in tourism industry",
      "Download translation apps for backup communication",
      "Learn basic Arabic greetings for better local interaction",
      "Tourist police often speak multiple languages"
    ],
    color: "accent-coral",
    essentialInfo: "\"Shukran\" (thank you) and \"Marhaba\" (hello) will be appreciated by locals"
  },
  {
    icon: Shield,
    title: "Safety & Health",
    category: "Staying Safe",
    description: "Important health tips and safety guidelines for worry-free travel.",
    tips: [
      "Egypt is generally safe for tourists with basic precautions",
      "Drink bottled water and avoid tap water",
      "Use sunscreen (SPF 30+) and stay hydrated in desert climate",
      "Travel insurance with medical coverage highly recommended",
      "Avoid street food if you have a sensitive stomach",
      "Keep copies of important documents in separate locations"
    ],
    color: "teal-oasis",
    essentialInfo: "Tourist police are present at major attractions and are very helpful"
  },
  {
    icon: Wifi,
    title: "Internet & Connectivity",
    category: "Staying Connected",
    description: "Stay connected during your Egyptian adventure with reliable internet options.",
    tips: [
      "WiFi available in most hotels, restaurants, and cafes",
      "Purchase local SIM card for better data coverage",
      "Major providers: Orange, Vodafone, and Etisalat",
      "4G coverage excellent in cities, limited in remote desert areas",
      "International roaming can be expensive",
      "Download offline maps before visiting remote areas"
    ],
    color: "gold-accent",
    essentialInfo: "Buy SIM cards at the airport or official provider stores for best rates"
  },
  {
    icon: Heart,
    title: "Cultural Etiquette",
    category: "Cultural Respect",
    description: "Respect local customs and traditions for meaningful cultural exchange.",
    tips: [
      "Dress modestly, especially when visiting religious sites",
      "Remove shoes when entering mosques",
      "Avoid public displays of affection",
      "Use your right hand for greetings and eating",
      "Respect photography restrictions at religious sites",
      "Learn about Islamic customs, especially during Ramadan"
    ],
    color: "accent-coral",
    essentialInfo: "Friday is the holy day - many shops close for midday prayers"
  }
];

const additionalTips = [
  {
    icon: Plane,
    title: "Airport & Arrival",
    tips: [
      "Visa on arrival available for most nationalities ($25 USD)",
      "E-visa can be obtained online before travel",
      "Airport transfers can be arranged through hotels",
      "Duty-free shopping available after customs"
    ]
  },
  {
    icon: Utensils,
    title: "Food & Dining",
    tips: [
      "Try traditional dishes: koshari, ful medames, and mezze",
      "Restaurants typically open late (8-9 PM for dinner)",
      "Halal food is standard throughout Egypt",
      "Vegetarian options widely available"
    ]
  },
  {
    icon: Camera,
    title: "Photography",
    tips: [
      "Photography fees required at some historical sites",
      "No flash photography inside tombs",
      "Ask permission before photographing people",
      "Sunrise and sunset offer the best lighting for monuments"
    ]
  },
  {
    icon: Clock,
    title: "Time & Schedules",
    tips: [
      "Egypt Standard Time (UTC+2) year-round",
      "Business hours: Saturday-Thursday, Friday is weekend",
      "Tourist sites usually open 8 AM - 5 PM",
      "Prayer times affect some business hours"
    ]
  },
  {
    icon: Thermometer,
    title: "Weather & Climate",
    tips: [
      "Desert climate: hot days, cool nights",
      "October-April: ideal weather (20-25°C)",
      "Summer (May-September): very hot (35-40°C)",
      "Sandstorms possible in spring months"
    ]
  },
  {
    icon: MapPin,
    title: "Navigation & Maps",
    tips: [
      "Download offline maps for remote areas",
      "GPS coordinates helpful for desert locations",
      "Street signs often in Arabic and English",
      "Landmarks easier than street addresses"
    ]
  }
];

export default function TravelTips() {
  const { data: tips, isLoading, error } = useQuery({
    queryKey: ["/api/travel-tips"],
    queryFn: () => travelTipsApi.getAll(),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Travel Tips</h1>
          <p className="text-gray-600">Failed to load travel tips. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="bg-champagne-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Essential <span className="text-teal-oasis">Travel</span> Tips for Egypt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insider knowledge and practical advice to make your Egyptian journey smooth, safe, and unforgettable. 
              Navigate like a local with our comprehensive travel guide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-cool-limestone text-center">
              <div className="w-16 h-16 bg-teal-oasis/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-oasis" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Safe Travel</h3>
              <p className="text-gray-600 text-sm">Egypt is tourist-friendly with excellent safety measures at all major attractions.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-cool-limestone text-center">
              <div className="w-16 h-16 bg-gold-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gold-accent" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Warm Hospitality</h3>
              <p className="text-gray-600 text-sm">Experience the legendary Egyptian hospitality and friendliness of local people.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-cool-limestone text-center">
              <div className="w-16 h-16 bg-accent-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent-coral" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Easy Communication</h3>
              <p className="text-gray-600 text-sm">English is widely spoken in tourist areas, making navigation easy for visitors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Travel Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Comprehensive <span className="text-teal-oasis">Travel</span> Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know for a seamless Egyptian adventure, organized by category for easy reference.
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {travelTipsData.map(({ icon: Icon, title, category, description, tips, color, essentialInfo }) => (
                <Card key={title} className="border border-cool-limestone card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-${color}/10 rounded-2xl flex items-center justify-center mr-4`}>
                        <Icon className={`w-8 h-8 text-${color}`} />
                      </div>
                      <div>
                        <span className={`text-${color} text-sm font-semibold uppercase tracking-wide`}>{category}</span>
                        <h3 className="text-xl font-bold text-gray-900 font-serif">{title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {tips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <span className={`w-2 h-2 bg-${color} rounded-full mr-3 mt-2 flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`bg-${color}/5 rounded-lg p-4 border-l-4 border-${color}`}>
                      <p className="text-sm font-semibold text-gray-900 mb-1">💡 Pro Tip:</p>
                      <p className="text-sm text-gray-700">{essentialInfo}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Quick Tips */}
      <section className="py-20 bg-cool-limestone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Quick <span className="text-teal-oasis">Reference</span> Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast facts and additional tips for common travel situations and questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalTips.map(({ icon: Icon, title, tips }) => (
              <Card key={title} className="bg-white border border-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-oasis/10 rounded-xl flex items-center justify-center mr-3">
                      <Icon className="w-6 h-6 text-teal-oasis" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 font-serif">{title}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="py-20 bg-teal-oasis">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
            Emergency & Important Contacts
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Keep these important numbers handy during your Egyptian adventure for peace of mind.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Emergency</h3>
              <p className="text-white/90 text-2xl font-bold">122</p>
              <p className="text-white/70 text-sm">Police Emergency</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Medical</h3>
              <p className="text-white/90 text-2xl font-bold">123</p>
              <p className="text-white/70 text-sm">Ambulance</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Tourist Police</h3>
              <p className="text-white/90 text-2xl font-bold">126</p>
              <p className="text-white/70 text-sm">Tourist Assistance</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Fire</h3>
              <p className="text-white/90 text-2xl font-bold">180</p>
              <p className="text-white/70 text-sm">Fire Department</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-teal-oasis px-8 py-4 text-lg font-semibold hover:bg-champagne-sand transition-colors"
            >
              Download Travel Guide PDF
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-teal-oasis transition-colors"
            >
              Contact Travel Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
