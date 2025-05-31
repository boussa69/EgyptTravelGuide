import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Thermometer, Users, Camera, AlertTriangle, Plane, CreditCard, FileText, MapPin, CheckCircle2, Clock, Globe, Package, Shirt, Sun, Shield, Heart, MessageCircle, Eye, HandHeart, DollarSign, Calculator, TrendingDown, AlertCircle, Phone, Cross, FileSearch } from "lucide-react";
import { Link } from "wouter";

const planningData = {
  "best-time-to-visit": {
    title: "Best Time to Visit Egypt",
    description: "Discover the optimal seasons for your Egyptian adventure",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt's desert climate offers year-round sunshine, but timing your visit can make the difference between a comfortable journey and an exhausting one. Here's everything you need to know about Egypt's seasons.",
      seasons: [
        {
          season: "Peak Season (October - April)",
          temperature: "15°C - 25°C (59°F - 77°F)",
          description: "Perfect weather with comfortable temperatures and minimal rainfall. Ideal for sightseeing, outdoor activities, and temple exploration.",
          pros: ["Comfortable temperatures", "Clear skies", "Perfect for photography", "Ideal for outdoor activities"],
          cons: ["Higher prices", "Crowded attractions", "Book accommodations early"],
          activities: ["Temple visits", "Desert safaris", "Nile cruises", "Pyramid exploration"]
        },
        {
          season: "Hot Season (May - September)",
          temperature: "25°C - 40°C (77°F - 104°F)",
          description: "Extremely hot and dry conditions, especially in southern Egypt. Budget-friendly but challenging for extended outdoor activities.",
          pros: ["Lower prices", "Fewer crowds", "Great deals on tours", "Empty attractions"],
          cons: ["Extreme heat", "Limited outdoor time", "Uncomfortable midday", "Higher dehydration risk"],
          activities: ["Early morning visits", "Indoor museums", "Air-conditioned tours", "Red Sea activities"]
        }
      ],
      monthlyGuide: [
        { month: "January", temp: "15-22°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "February", temp: "16-24°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "March", temp: "18-26°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "April", temp: "22-30°C", rainfall: "Very Low", crowd: "Medium", rating: "Very Good" },
        { month: "May", temp: "25-35°C", rainfall: "Very Low", crowd: "Low", rating: "Good" },
        { month: "June", temp: "28-38°C", rainfall: "None", crowd: "Very Low", rating: "Fair" },
        { month: "July", temp: "30-40°C", rainfall: "None", crowd: "Very Low", rating: "Poor" },
        { month: "August", temp: "30-40°C", rainfall: "None", crowd: "Very Low", rating: "Poor" },
        { month: "September", temp: "28-36°C", rainfall: "Very Low", crowd: "Low", rating: "Fair" },
        { month: "October", temp: "25-32°C", rainfall: "Low", crowd: "Medium", rating: "Very Good" },
        { month: "November", temp: "20-28°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "December", temp: "16-24°C", rainfall: "Low", crowd: "High", rating: "Excellent" }
      ],
      specialEvents: [
        { event: "Abu Simbel Sun Festival", dates: "Feb 22 & Oct 22", description: "Sunlight illuminates the inner sanctuary of Abu Simbel temple" },
        { event: "Ramadan", dates: "Varies yearly", description: "Islamic holy month - reduced hours for some attractions" },
        { event: "Coptic Christmas", dates: "January 7", description: "Major Christian celebration in Egypt" }
      ]
    }
  },
  "visa-entry": {
    title: "Visa & Entry Requirements",
    description: "Complete guide to entering Egypt - visa options, requirements, and entry procedures",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers multiple visa options for tourists, making entry relatively straightforward for most nationalities. Choose the option that best suits your travel plans and nationality.",
      visaTypes: [
        {
          type: "Visa on Arrival",
          price: "$25 USD",
          duration: "30 days (single entry)",
          processing: "Immediate at airport",
          description: "The most convenient option for eligible nationalities. Available at Cairo, Hurghada, Luxor, Aswan, and Sharm El Sheikh airports.",
          requirements: ["Valid passport (minimum 6 months validity)", "Return or onward ticket", "Proof of accommodation", "Cash payment in USD"],
          countries: ["USA", "Canada", "Australia", "EU countries", "UK", "Japan", "South Korea", "and 40+ other countries"],
          pros: ["No advance planning needed", "Immediate processing", "Available at major airports"],
          cons: ["Cash payment only", "Limited to certain airports", "Longer queues possible"],
          bestFor: "Last-minute travelers and short visits"
        },
        {
          type: "e-Visa (Online)",
          price: "$25 USD + $3 service fee",
          duration: "30 days (single entry) or 90 days (multiple entry)",
          processing: "3-7 business days",
          description: "Apply online before travel. Recommended for smoother entry process and advance planning.",
          requirements: ["Valid passport scan", "Digital passport photo", "Credit/debit card payment", "Email address"],
          countries: ["Available for 70+ nationalities"],
          pros: ["Apply from home", "Faster airport processing", "Multiple entry options", "Digital receipt"],
          cons: ["Advance planning required", "Processing time needed", "Service fees"],
          bestFor: "Planned trips and multiple entries"
        },
        {
          type: "Embassy Visa",
          price: "Varies by country ($25-60)",
          duration: "30-90 days (single/multiple entry)",
          processing: "5-15 business days",
          description: "Traditional visa application through Egyptian consulates. Required for some nationalities.",
          requirements: ["Passport with 6+ months validity", "Completed application form", "Passport photos", "Proof of funds", "Travel insurance"],
          countries: ["Required for some African and Asian countries"],
          pros: ["Guaranteed approval if eligible", "Longer validity options", "Official documentation"],
          cons: ["Longest processing time", "In-person visit required", "Higher cost"],
          bestFor: "Long-term stays and restricted nationalities"
        }
      ],
      entryProcedure: [
        {
          step: "Arrival at Airport",
          tasks: ["Present passport and visa", "Complete arrival card", "Immigration checkpoint", "Collect luggage"]
        },
        {
          step: "Customs Declaration",
          tasks: ["Declare valuable items", "Red/Green channel selection", "Baggage inspection if required", "Exit airport"]
        }
      ],
      importantNotes: [
        { note: "Passport Validity", details: "Must be valid for at least 6 months from entry date" },
        { note: "Return Ticket", details: "Proof of onward travel may be required" },
        { note: "Hotel Booking", details: "Accommodation confirmation recommended" },
        { note: "Cash Requirements", details: "USD cash needed for visa on arrival" }
      ],
      tips: [
        "Check your nationality's specific requirements before travel",
        "Apply for e-visa if you want to avoid airport queues",
        "Keep all travel documents easily accessible",
        "Have backup payment method for visa fees",
        "Register with your embassy after arrival for long stays"
      ]
    }
  },
  "cultural-etiquette": {
    title: "Cultural Etiquette & Customs",
    description: "Navigate Egyptian culture with respect and understanding",
    category: "Cultural",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Understanding Egyptian culture enhances your travel experience and shows respect for local traditions. Egypt blends ancient heritage with Islamic customs and modern influences.",
      religiousEtiquette: [
        {
          context: "Mosque Visits",
          guidelines: [
            "Remove shoes before entering",
            "Dress modestly - long pants/skirts, covered shoulders",
            "Women should cover hair with scarf",
            "Respect prayer times and worshippers",
            "No photography during prayers",
            "Speak quietly and move respectfully"
          ]
        },
        {
          context: "Ramadan Considerations",
          guidelines: [
            "Respect fasting hours (sunrise to sunset)",
            "Avoid eating/drinking in public during daylight",
            "Reduced business hours during Ramadan",
            "Be patient with altered schedules",
            "Join iftar celebrations if invited",
            "Show understanding for cultural observances"
          ]
        }
      ],
      socialCustoms: [
        {
          situation: "Greetings",
          appropriate: ["Handshakes for same gender", "Saying 'As-salamu alaykum' (peace be upon you)", "Asking about family and health"],
          avoid: ["Physical contact with opposite gender unless offered", "Using left hand for greetings", "Rushing social interactions"]
        },
        {
          situation: "Hospitality",
          appropriate: ["Accept tea/coffee when offered", "Compliment the host's home/family", "Bring small gifts if visiting homes", "Show appreciation for local food"],
          avoid: ["Refusing hospitality outright", "Pointing feet toward others", "Showing soles of shoes", "Eating with left hand"]
        },
        {
          situation: "Conversation",
          appropriate: ["Ask about family and work", "Show interest in Egyptian history", "Discuss travel experiences", "Praise Egyptian cuisine"],
          avoid: ["Political discussions", "Criticism of government", "Religious debates", "Personal relationships"]
        }
      ],
      dressingGuidelines: [
        {
          context: "General Guidelines",
          men: ["Long pants preferred", "Shirts with sleeves", "Closed shoes for religious sites", "Conservative swimwear at beaches"],
          women: ["Cover shoulders and knees", "Loose-fitting clothing", "Scarf for mosque visits", "Modest swimwear recommended"],
          universal: ["Remove shoes when entering homes", "Dress up for nice restaurants", "Comfortable walking shoes", "Sun protection essential"]
        },
        {
          context: "Religious Sites",
          men: ["Long pants required", "Covered shoulders", "Remove hats inside", "Quiet, respectful behavior"],
          women: ["Full coverage required", "Head covering with scarf", "No tight-fitting clothes", "Modest colors preferred"],
          universal: ["No revealing clothing", "Remove shoes where required", "No inappropriate displays of affection", "Photography restrictions apply"]
        }
      ],
      culturalSensitivities: [
        {
          topic: "Political Topics",
          guidance: "Avoid discussing politics, especially criticism of the government",
          reason: "Political discussions can be sensitive and potentially dangerous"
        },
        {
          topic: "Religious Discussions",
          guidance: "Respect Islamic beliefs even if you don't share them",
          reason: "Religion is central to daily life for most Egyptians"
        },
        {
          topic: "Historical Perspectives",
          guidance: "Be respectful when discussing ancient Egyptian heritage",
          reason: "Egyptians are proud of their pharaonic heritage alongside their Islamic identity"
        },
        {
          topic: "Economic Differences",
          guidance: "Be discrete about wealth and expensive items",
          reason: "Egypt has significant economic disparities"
        }
      ],
      practicalTips: [
        "Tip generously - service workers rely on tips",
        "Friday is the holy day - many businesses close",
        "Ramadan affects daily rhythms - be flexible with schedules",
        "Tea culture is important - accept when offered",
        "Haggling is expected in markets but not in fixed-price stores",
        "Punctuality is less strict than Western standards",
        "Family is central to Egyptian culture - ask about family",
        "Hospitality is legendary - you may be invited to homes"
      ]
    }
  },
  "packing-guide": {
    title: "Essential Packing Guide for Egypt",
    description: "Pack smart for your Egyptian adventure - complete checklist for all seasons",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Packing for Egypt requires balancing comfort, cultural respect, and practical needs. The desert climate, ancient sites, and local customs all influence what you should bring. This comprehensive guide ensures you're prepared for any situation.",
      essentialCategories: [
        {
          category: "Clothing Essentials",
          icon: "Shirt",
          items: [
            { item: "Lightweight, breathable fabrics", description: "Cotton and linen work best in hot climate", essential: true },
            { item: "Long-sleeved shirts", description: "Sun protection and mosque visits", essential: true },
            { item: "Modest pants/long skirts", description: "Cultural respect and comfort", essential: true },
            { item: "Light sweater/jacket", description: "Air conditioning and cooler evenings", essential: true },
            { item: "Comfortable walking shoes", description: "Essential for temple exploration", essential: true },
            { item: "Sandals", description: "Easy to remove for mosque visits", essential: false },
            { item: "Sun hat with wide brim", description: "Crucial sun protection", essential: true },
            { item: "Scarf/shawl", description: "Versatile for sun/modesty/warmth", essential: true }
          ]
        },
        {
          category: "Health & Protection",
          icon: "Shield",
          items: [
            { item: "High SPF sunscreen (50+)", description: "Desert sun is intense year-round", essential: true },
            { item: "Sunglasses (UV protection)", description: "Eye protection from bright sun/sand", essential: true },
            { item: "Insect repellent", description: "Especially near the Nile", essential: true },
            { item: "Personal medications", description: "Bring extra in original containers", essential: true },
            { item: "Hand sanitizer", description: "Hygiene in crowded tourist areas", essential: true },
            { item: "First aid kit", description: "Basic supplies for minor issues", essential: false },
            { item: "Electrolyte packets", description: "Prevent dehydration", essential: true },
            { item: "Lip balm with SPF", description: "Lips burn easily in desert climate", essential: true }
          ]
        },
        {
          category: "Electronics & Gadgets",
          icon: "Smartphone",
          items: [
            { item: "Universal power adapter", description: "Egypt uses Type C and F plugs", essential: true },
            { item: "Portable charger/power bank", description: "Long sightseeing days drain batteries", essential: true },
            { item: "Camera with extra batteries", description: "Capture memories of ancient wonders", essential: false },
            { item: "Headlamp/flashlight", description: "Useful in tombs and temples", essential: false },
            { item: "Waterproof phone case", description: "Protection from sand and water", essential: false },
            { item: "Travel router (optional)", description: "Improve WiFi connectivity", essential: false }
          ]
        },
        {
          category: "Documents & Money",
          icon: "CreditCard",
          items: [
            { item: "Passport (6+ months validity)", description: "Required for entry", essential: true },
            { item: "Visa documentation", description: "Print confirmation if applicable", essential: true },
            { item: "Travel insurance papers", description: "Always recommended", essential: true },
            { item: "Cash (USD for tips)", description: "Small bills for tipping culture", essential: true },
            { item: "Credit/debit cards", description: "Backup payment method", essential: true },
            { item: "Emergency contact info", description: "Embassy and family contacts", essential: true },
            { item: "Copies of important documents", description: "Store separately from originals", essential: true }
          ]
        }
      ],
      seasonalAdvice: [
        {
          season: "Peak Season (Oct-Apr)",
          recommendations: [
            "Layers for temperature changes",
            "Light jacket for air-conditioned spaces",
            "Comfortable walking shoes for long days",
            "Extra camera batteries (cold affects battery life)"
          ]
        },
        {
          season: "Hot Season (May-Sep)",
          recommendations: [
            "Maximum sun protection gear",
            "Cooling towels or bandanas",
            "Extra electrolyte supplements",
            "Minimal dark clothing (absorbs heat)"
          ]
        }
      ],
      packingTips: [
        "Pack light - you can buy basics in Egypt",
        "Leave valuable jewelry at home",
        "Bring more cash than usual for tipping",
        "Pack essentials in carry-on",
        "Consider packing cubes for organization",
        "Bring a small day bag for sightseeing",
        "Pack a reusable water bottle",
        "Include a small Egyptian phrasebook"
      ]
    }
  },
  "budget-planning": {
    title: "Budget Planning for Egypt",
    description: "Plan your Egyptian adventure finances - costs, tips, and money-saving strategies",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers excellent value for money, but understanding local costs and customs helps you budget effectively. From luxury to budget travel, here's everything you need to know about managing money in Egypt.",
      dailyBudgets: [
        {
          category: "Budget Traveler",
          dailyRange: "$25-40 USD",
          accommodation: "$8-15 (hostels, budget hotels)",
          food: "$5-10 (street food, local restaurants)",
          transport: "$3-8 (public transport, shared taxis)",
          attractions: "$5-12 (entrance fees)",
          tips: ["Stay in hostels", "Eat at local restaurants", "Use public transport", "Book attractions directly"]
        },
        {
          category: "Mid-Range Traveler",
          dailyRange: "$50-80 USD",
          accommodation: "$20-40 (3-star hotels, good B&Bs)",
          food: "$15-25 (mix of local and tourist restaurants)",
          transport: "$10-20 (private taxis, some tours)",
          attractions: "$15-25 (guided tours, better access)",
          tips: ["Mix of hotel types", "Try tourist and local restaurants", "Combine transport methods", "Book some guided experiences"]
        },
        {
          category: "Luxury Traveler",
          dailyRange: "$100+ USD",
          accommodation: "$60+ (4-5 star hotels, resorts)",
          food: "$30+ (fine dining, hotel restaurants)",
          transport: "$25+ (private drivers, flight connections)",
          attractions: "$35+ (private guides, exclusive access)",
          tips: ["Stay in top hotels", "Fine dining experiences", "Private transportation", "Exclusive tours and guides"]
        }
      ],
      majorExpenses: [
        { item: "International flights", cost: "$400-1200", notes: "Varies greatly by origin and season" },
        { item: "Nile cruise (3-4 days)", cost: "$200-800", notes: "Luxury vs standard options" },
        { item: "Internal flights", cost: "$50-150", notes: "Cairo-Aswan saves travel time" },
        { item: "Multi-day desert safari", cost: "$100-300", notes: "White Desert, Western Desert tours" },
        { item: "Private guide (full day)", cost: "$40-80", notes: "Essential for major sites" }
      ],
      moneySavingTips: [
        "Visit during shoulder season for lower prices",
        "Book Nile cruises locally for better deals",
        "Eat where locals eat for authentic, cheap meals",
        "Use public transport when possible",
        "Negotiate prices in bazaars and with taxi drivers",
        "Buy a tourist SIM card for data instead of roaming",
        "Group together for shared tour costs",
        "Carry small bills for tipping"
      ],
      tippingGuide: [
        { service: "Restaurant waiters", amount: "10-15% of bill", notes: "Check if service charge included" },
        { service: "Hotel staff", amount: "$1-2 per service", notes: "Bellhops, housekeeping" },
        { service: "Tour guides", amount: "$5-10 per day", notes: "More for exceptional service" },
        { service: "Taxi drivers", amount: "Round up fare", notes: "Or 10% for longer journeys" },
        { service: "Toilet attendants", amount: "1-2 Egyptian pounds", notes: "Small change is fine" },
        { service: "Felucca sailors", amount: "$2-5 per hour", notes: "Traditional Nile sailing" }
      ],
      paymentMethods: [
        "Cash (Egyptian pounds) - most widely accepted",
        "USD cash - useful for tips and some services",
        "Credit cards - accepted in hotels and tourist areas",
        "ATMs - widely available in cities",
        "Mobile payments - growing but not universal"
      ]
    }
  },
  "health-safety": {
    title: "Health & Safety in Egypt",
    description: "Stay healthy and safe during your Egyptian journey - medical tips, safety advice, and emergency information",
    category: "Safety",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt is generally safe for tourists, but being prepared for health and safety considerations ensures a worry-free trip. From staying hydrated in the desert to navigating busy cities, here's your comprehensive safety guide.",
      healthPrecautions: [
        {
          category: "Vaccinations",
          items: [
            { item: "Routine vaccines", description: "Ensure MMR, flu, tetanus are current", required: true },
            { item: "Hepatitis A", description: "Recommended for all travelers", required: true },
            { item: "Hepatitis B", description: "If you might have intimate contact", required: false },
            { item: "Typhoid", description: "Especially if eating street food", required: false },
            { item: "Yellow Fever", description: "Only if coming from infected area", required: false }
          ]
        },
        {
          category: "Common Health Issues",
          items: [
            { item: "Traveler's diarrhea", description: "Drink bottled water, avoid raw foods", prevention: "Bottled water, cooked foods only" },
            { item: "Dehydration", description: "Desert climate requires constant hydration", prevention: "Drink water regularly, electrolytes" },
            { item: "Heat exhaustion", description: "Especially during summer months", prevention: "Shade, light clothing, frequent breaks" },
            { item: "Sunburn", description: "Desert sun is extremely strong", prevention: "High SPF sunscreen, protective clothing" }
          ]
        }
      ],
      safetyGuidelines: [
        {
          category: "Personal Safety",
          tips: [
            "Stay aware of surroundings in crowded areas",
            "Don't display expensive jewelry or electronics",
            "Use hotel safes for valuables",
            "Avoid walking alone at night",
            "Be cautious with street vendors and touts",
            "Keep copies of important documents",
            "Register with your embassy if staying long-term"
          ]
        },
        {
          category: "Transportation Safety",
          tips: [
            "Use reputable taxi companies or ride-sharing apps",
            "Agree on taxi fares before starting journey",
            "Wear seatbelts when available",
            "Avoid overcrowded public transport",
            "Be extra careful crossing busy streets",
            "Use licensed tour operators for excursions"
          ]
        },
        {
          category: "Scam Awareness",
          tips: [
            "Be wary of overly friendly strangers offering help",
            "Don't accept unsolicited invitations to shops",
            "Verify tour operator credentials",
            "Count change carefully",
            "Be cautious of distraction techniques",
            "Don't give money to children begging"
          ]
        }
      ],
      emergencyContacts: [
        { service: "Police", number: "122", notes: "Tourist police available at major sites" },
        { service: "Medical Emergency", number: "123", notes: "Ambulance service" },
        { service: "Fire Department", number: "180", notes: "Fire and rescue" },
        { service: "Tourist Hotline", number: "126", notes: "24/7 tourist assistance" }
      ],
      medicalFacilities: [
        "Private hospitals in Cairo and Alexandria have international standards",
        "Tourist areas have clinics with English-speaking staff",
        "Pharmacies are widely available in cities",
        "Travel insurance is highly recommended",
        "Serious cases may require evacuation to Europe"
      ],
      womenTravelers: [
        "Dress modestly, especially at religious sites",
        "Consider head covering for mosque visits",
        "Solo female travel is possible but requires extra caution",
        "Join group tours for added security",
        "Trust your instincts and avoid uncomfortable situations",
        "Consider staying in hotels with female-only floors"
      ]
    }
  }
};

export default function PlanningResource() {
  const [, params] = useRoute("/planning/:slug");
  const slug = params?.slug;
  
  const resource = slug ? planningData[slug as keyof typeof planningData] : null;

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cool-limestone">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
          <p className="text-gray-600 mb-6">The planning resource you're looking for doesn't exist.</p>
          <Link href="/travel-planning">
            <Button className="bg-teal-oasis hover:bg-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Planning
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (slug === "best-time-to-visit") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Best Time to Visit</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Seasons Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {resource.content.seasons.map((season, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Thermometer className="h-6 w-6 text-teal-oasis mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{season.season}</h3>
                  </div>
                  
                  <div className="bg-teal-oasis/10 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-teal-oasis">{season.temperature}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{season.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {season.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Cons</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {season.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {season.activities.map((activity, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Monthly Timeline */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-teal-oasis mr-3" />
                Monthly Weather Guide
              </h3>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-12 gap-2 min-w-[800px]">
                  {resource.content.monthlyGuide.map((month, index) => (
                    <div key={index} className="text-center">
                      <div className={`p-3 rounded-lg mb-2 ${
                        month.rating === 'Excellent' ? 'bg-green-100 border-2 border-green-500' :
                        month.rating === 'Very Good' ? 'bg-green-50 border border-green-300' :
                        month.rating === 'Good' ? 'bg-yellow-50 border border-yellow-300' :
                        month.rating === 'Fair' ? 'bg-orange-50 border border-orange-300' :
                        'bg-red-50 border border-red-300'
                      }`}>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{month.month}</h4>
                        <p className="text-xs text-gray-600 mb-1">{month.temp}</p>
                        <p className="text-xs font-medium">{month.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Events */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Special Events & Considerations</h3>
              <div className="space-y-4">
                {resource.content.specialEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.event}</h4>
                      <p className="text-sm text-teal-oasis font-medium">{event.dates}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "visa-entry") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Visa & Entry</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Visa Types */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Plane className="h-8 w-8 text-teal-oasis mr-3" />
              Visa Options
            </h2>
            
            {resource.content.visaTypes.map((visa, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-teal-oasis">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{visa.type}</h3>
                      <p className="text-gray-600 mb-4">{visa.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-gold-accent/20 rounded-lg p-3 mb-2">
                        <p className="font-bold text-gold-accent text-lg">{visa.price}</p>
                      </div>
                      <p className="text-sm text-gray-600">{visa.duration}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Clock className="h-4 w-4 text-teal-oasis mr-2" />
                        Processing Time
                      </h4>
                      <p className="text-gray-600">{visa.processing}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Globe className="h-4 w-4 text-teal-oasis mr-2" />
                        Available for
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {visa.countries.map((country, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FileText className="h-4 w-4 text-teal-oasis mr-2" />
                        Requirements
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.requirements.map((req, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Considerations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-teal-oasis/10 rounded-lg p-4">
                    <p className="text-sm font-medium text-teal-oasis">
                      Best for: {visa.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "cultural-etiquette") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Cultural Etiquette</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Practical Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HandHeart className="h-6 w-6 text-teal-oasis mr-3" />
                Practical Cultural Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.practicalTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "packing-guide") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Packing Guide</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Essential Categories */}
          <div className="space-y-8 mb-12">
            {resource.content.essentialCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Package className="h-6 w-6 text-teal-oasis mr-3" />
                    {category.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.essential ? 'border-teal-oasis bg-teal-oasis/5' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.item}</h4>
                          {item.essential && (
                            <Badge variant="secondary" className="text-xs bg-teal-oasis text-white">
                              Essential
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Seasonal Advice */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sun className="h-6 w-6 text-teal-oasis mr-3" />
                Seasonal Packing Advice
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.seasonalAdvice.map((season, index) => (
                  <div key={index} className="bg-gradient-to-br from-teal-oasis/10 to-champagne-sand/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{season.season}</h4>
                    <ul className="space-y-2">
                      {season.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-teal-oasis mr-3 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Packing Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Packing Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.packingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gold-accent/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-gold-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "budget-planning") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Budget Planning</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Daily Budgets */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {resource.content.dailyBudgets.map((budget, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-gold-accent">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{budget.category}</h3>
                    <div className="bg-gold-accent/20 rounded-lg p-3 mb-4">
                      <p className="text-2xl font-bold text-gold-accent">{budget.dailyRange}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Accommodation</p>
                      <p className="text-sm text-gray-600">{budget.accommodation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Food</p>
                      <p className="text-sm text-gray-600">{budget.food}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Transport</p>
                      <p className="text-sm text-gray-600">{budget.transport}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Attractions</p>
                      <p className="text-sm text-gray-600">{budget.attractions}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {budget.tips.map((tip, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1 h-1 bg-gold-accent rounded-full mr-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Major Expenses */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-teal-oasis mr-3" />
                Major Expenses to Consider
              </h3>
              
              <div className="space-y-4">
                {resource.content.majorExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{expense.item}</h4>
                      <p className="text-sm text-gray-600">{expense.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gold-accent">{expense.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Money Saving Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="h-6 w-6 text-green-600 mr-3" />
                Money-Saving Tips
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.moneySavingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tipping Guide */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tipping Guide</h3>
              
              <div className="space-y-4">
                {resource.content.tippingGuide.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{tip.service}</h4>
                      <p className="text-sm text-gray-600">{tip.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-oasis">{tip.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "health-safety") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Health & Safety</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Health Precautions */}
          <div className="space-y-8 mb-12">
            {resource.content.healthPrecautions.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Cross className="h-6 w-6 text-red-500 mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.required ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.item}</h4>
                          <Badge variant={item.required ? "destructive" : "secondary"} className="text-xs">
                            {item.required ? "Required" : "Optional"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.prevention && (
                          <p className="text-sm text-green-700 mt-2">
                            <strong>Prevention:</strong> {item.prevention}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Safety Guidelines */}
          <div className="space-y-8 mb-12">
            {resource.content.safetyGuidelines.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Shield className="h-6 w-6 text-teal-oasis mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contacts */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Phone className="h-6 w-6 text-red-500 mr-3" />
                Emergency Contacts
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{contact.service}</h4>
                      <p className="text-xl font-bold text-red-600">{contact.number}</p>
                    </div>
                    <p className="text-sm text-gray-600">{contact.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default layout for other resources
  return (
    <div className="min-h-screen bg-cool-limestone py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{resource.title}</h1>
          <p className="text-xl text-gray-600">{resource.description}</p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6">Content for this resource is coming soon.</p>
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}