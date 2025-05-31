import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, Train, Plane, Ship, MapPin, Clock, DollarSign, Users, Shield, AlertTriangle, CheckCircle2, Navigation, Fuel, CreditCard, Phone, Globe, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function GettingAround() {
  const transportationData = {
    title: "Getting Around Egypt",
    description: "Complete guide to transportation options throughout Egypt",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers diverse transportation options from modern metros to traditional feluccas. Understanding your choices helps you navigate efficiently while experiencing authentic Egyptian travel culture.",
      transportTypes: [
        {
          type: "Domestic Flights",
          icon: "✈️",
          cost: "$50-150",
          speed: "1-2 hours",
          comfort: "High",
          description: "Fast and convenient for long distances between major cities like Cairo, Luxor, Aswan, and Hurghada.",
          routes: ["Cairo to Luxor (1.5h)", "Cairo to Aswan (1.5h)", "Cairo to Hurghada (1h)", "Cairo to Sharm El Sheikh (1h)"],
          pros: ["Time-saving", "Comfortable", "Reliable schedules", "Air conditioning"],
          cons: ["More expensive", "Airport transfers needed", "Baggage restrictions", "Weather dependent"],
          bestFor: "Long distances and tight schedules",
          tips: ["Book early for better prices", "EgyptAir is the main carrier", "Check baggage allowances", "Arrive 2 hours early"]
        },
        {
          type: "Trains",
          icon: "🚂",
          cost: "$5-25",
          speed: "3-12 hours",
          comfort: "Medium-High",
          description: "Comfortable overnight sleeper trains and day services connecting major destinations along the Nile Valley.",
          routes: ["Cairo to Luxor (10-12h)", "Cairo to Aswan (12-14h)", "Cairo to Alexandria (2.5h)", "Luxor to Aswan (3h)"],
          pros: ["Scenic routes", "Overnight sleepers available", "City center to city center", "Affordable"],
          cons: ["Slower than flights", "Limited routes", "Book early for sleepers", "Varying quality"],
          bestFor: "Scenic travel and overnight journeys",
          tips: ["Book sleeper trains in advance", "First class recommended", "Bring snacks and water", "Check current schedules"]
        },
        {
          type: "Private Cars & Drivers",
          icon: "🚗",
          cost: "$30-80/day",
          speed: "Variable",
          comfort: "High",
          description: "Flexible option with local driver knowledge. Perfect for custom itineraries and reaching remote destinations.",
          routes: ["Any destination", "Custom itineraries", "Multiple stops possible", "Desert excursions"],
          pros: ["Complete flexibility", "Local expertise", "Door-to-door service", "Air conditioning"],
          cons: ["More expensive", "Driver dependency", "Language barriers possible", "Traffic delays"],
          bestFor: "Custom tours and group travel",
          tips: ["Use reputable tour companies", "Agree on price beforehand", "Ensure AC works", "Carry emergency contacts"]
        },
        {
          type: "Tourist Buses",
          icon: "🚌",
          cost: "$10-30",
          speed: "3-8 hours",
          comfort: "Medium",
          description: "Air-conditioned coaches connecting tourist destinations with regular schedules and tourist police escorts.",
          routes: ["Cairo to Hurghada (6h)", "Cairo to Sharm El Sheikh (7h)", "Luxor to Hurghada (4h)", "Inter-city routes"],
          pros: ["Affordable", "Air conditioned", "Regular schedules", "Tourist police escort"],
          cons: ["Fixed schedules", "Limited flexibility", "Can be crowded", "Longer journey times"],
          bestFor: "Budget travelers and standard routes",
          tips: ["Book through hotels", "Bring entertainment", "Pack snacks", "Confirm pickup times"]
        },
        {
          type: "Nile Cruises",
          icon: "🚢",
          cost: "$100-500/night",
          speed: "Leisurely",
          comfort: "Very High",
          description: "Luxury floating hotels offering scenic Nile River travel between Luxor and Aswan with all meals included.",
          routes: ["Luxor to Aswan (3-7 days)", "Aswan to Luxor (3-7 days)", "Round trip options", "Temple stops included"],
          pros: ["All-inclusive", "Scenic river views", "Luxury amenities", "Temple visits included"],
          cons: ["Expensive", "Fixed itinerary", "Limited to Nile route", "Seasonal availability"],
          bestFor: "Luxury travelers and romantic trips",
          tips: ["Book during peak season", "Check inclusion details", "Verify temple visits", "Pack formal wear"]
        },
        {
          type: "Local Transportation",
          icon: "🚕",
          cost: "$1-10",
          speed: "Variable",
          comfort: "Low-Medium",
          description: "Taxis, Uber, microbuses, and metro for city transportation and short distances.",
          routes: ["Within cities", "Airport transfers", "Short distances", "Local sightseeing"],
          pros: ["Very affordable", "Readily available", "Local experience", "Flexible timing"],
          cons: ["Language barriers", "Negotiation required", "Variable quality", "Traffic congestion"],
          bestFor: "City exploration and short trips",
          tips: ["Use Uber for transparency", "Agree on taxi fares first", "Keep small bills", "Learn basic Arabic numbers"]
        }
      ],
      cityTransport: [
        {
          city: "Cairo",
          population: "20+ million",
          mainOptions: ["Metro (3 lines)", "Uber/Careem", "Taxis", "Microbuses", "River bus"],
          metroInfo: {
            lines: 3,
            cost: "$0.30-0.50",
            hours: "5:30 AM - 12:00 AM",
            tips: ["Women-only cars available", "Avoid rush hours", "Keep ticket until exit", "Watch for pickpockets"]
          },
          traffic: "Very heavy, especially 7-10 AM and 4-8 PM",
          recommendations: ["Use metro for long distances", "Walk for nearby attractions", "Uber for convenience", "Allow extra time"]
        },
        {
          city: "Alexandria",
          population: "5+ million",
          mainOptions: ["Trams", "Microbuses", "Taxis", "Uber", "Walking"],
          tramInfo: {
            lines: 2,
            cost: "$0.20",
            coverage: "City center and waterfront",
            tips: ["Vintage tram experience", "Slow but scenic", "Check current routes", "Cash only"]
          },
          traffic: "Moderate, coastal road congestion",
          recommendations: ["Tram for waterfront", "Walk in city center", "Taxi for longer distances", "Enjoy sea breeze"]
        },
        {
          city: "Luxor",
          population: "500,000",
          mainOptions: ["Taxis", "Horse carriages", "Bicycles", "Walking", "Feluccas"],
          specialFeatures: {
            horseCarriages: "Traditional but check animal welfare",
            bicycles: "Popular for temple visits",
            feluccas: "Nile River crossings and sunset trips",
            walking: "Many attractions within walking distance"
          },
          traffic: "Light, tourist-friendly",
          recommendations: ["Walk between nearby temples", "Bicycle for flexibility", "Felucca for river crossing", "Taxi for distant sites"]
        },
        {
          city: "Aswan",
          population: "300,000",
          mainOptions: ["Taxis", "Feluccas", "Walking", "Motorboats"],
          specialFeatures: {
            feluccas: "Essential for Nile navigation",
            motorboats: "Faster Nile transportation",
            walking: "Compact city center",
            camels: "Tourist novelty only"
          },
          traffic: "Minimal, relaxed pace",
          recommendations: ["Felucca for authentic experience", "Walk in town center", "Motorboat for temple visits", "Enjoy the slow pace"]
        }
      ],
      safetyTips: [
        {
          category: "General Safety",
          tips: [
            "Always wear seatbelts when available",
            "Keep vehicle doors locked in cities",
            "Avoid travel during sandstorms",
            "Carry emergency contact numbers",
            "Keep passport copy accessible"
          ]
        },
        {
          category: "Road Travel",
          tips: [
            "Don't drive yourself - hire local drivers",
            "Check vehicle condition before long trips",
            "Ensure adequate insurance coverage",
            "Plan for fuel stops in remote areas",
            "Travel in daylight hours when possible"
          ]
        },
        {
          category: "Public Transport",
          tips: [
            "Watch belongings on crowded transport",
            "Keep valuables in front pockets or bags",
            "Be aware of common scams",
            "Have exact change ready",
            "Know your destination in Arabic"
          ]
        }
      ],
      budgetGuide: [
        {
          level: "Budget Traveler",
          dailyTransport: "$5-15",
          options: ["Metro", "Microbuses", "Local trains", "Shared taxis", "Walking"],
          tips: ["Use public transport", "Walk when possible", "Negotiate taxi fares", "Buy transport cards"]
        },
        {
          level: "Mid-Range Traveler",
          dailyTransport: "$15-40",
          options: ["Uber/Careem", "Tourist buses", "First-class trains", "Private taxis"],
          tips: ["Mix public and private transport", "Book train tickets in advance", "Use apps for transparency"]
        },
        {
          level: "Luxury Traveler",
          dailyTransport: "$40-100+",
          options: ["Private drivers", "Domestic flights", "Luxury transfers", "Premium services"],
          tips: ["Book through hotels", "Consider helicopter tours", "Private guides with transport"]
        }
      ],
      essentialPhrases: [
        { english: "Where is...?", arabic: "Feen...?" },
        { english: "How much?", arabic: "Bi kam?" },
        { english: "Stop here", arabic: "Howwa hena" },
        { english: "Go straight", arabic: "Ala tool" },
        { english: "Turn right", arabic: "Shmal" },
        { english: "Turn left", arabic: "Yameen" },
        { english: "Airport", arabic: "Matar" },
        { english: "Hotel", arabic: "Funduk" },
        { english: "Train station", arabic: "Mahattat al-qitar" },
        { english: "Thank you", arabic: "Shukran" }
      ]
    }
  };

  const data = transportationData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne-sand/30 via-white to-teal-oasis/10">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/travel-planning">
            <Button variant="ghost" className="mb-4 text-teal-oasis hover:text-accent-coral">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Travel Planning
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="bg-teal-oasis/10 text-teal-oasis border-teal-oasis/20 mb-4">
            {data.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {data.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{data.lastUpdated}</span>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {data.content.overview}
            </p>
          </CardContent>
        </Card>

        {/* Transportation Types */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Transportation Options</h2>
            <div className="grid gap-6">
              {data.content.transportTypes.map((transport, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{transport.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{transport.type}</h3>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">{transport.cost}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">{transport.speed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">{transport.comfort} Comfort</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{transport.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {transport.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">Considerations</h4>
                      <ul className="space-y-1">
                        {transport.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Best for: </span>
                        <span className="text-sm text-gray-900">{transport.bestFor}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Popular routes: </span>
                      <span className="text-sm text-gray-900">{transport.routes.join(" • ")}</span>
                    </div>
                  </div>

                  <div className="mt-4 bg-teal-50 rounded-lg p-3">
                    <h5 className="text-sm font-semibold text-teal-900 mb-2">Expert Tips</h5>
                    <ul className="text-sm text-teal-800 space-y-1">
                      {transport.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* City Transportation */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">City Transportation</h2>
            <div className="grid gap-6">
              {data.content.cityTransport.map((city, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <h3 className="text-xl font-bold text-gray-900">{city.city}</h3>
                    <Badge variant="outline" className="text-xs">{city.population}</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Main options: </span>
                    {city.mainOptions.join(", ")}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Traffic: </span>
                    {city.traffic}
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {city.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" />
              Safety Guidelines
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.content.safetyTips.map((category, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Guide */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-600" />
              Budget Planning
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {data.content.budgetGuide.map((budget, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{budget.level}</h3>
                  <div className="text-2xl font-bold text-teal-600 mb-4">{budget.dailyTransport}</div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Best Options:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {budget.options.map((option, i) => (
                        <li key={i}>• {option}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-700 mb-2">Money-Saving Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {budget.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Essential Phrases */}
        <Card className="mb-8 border-teal-oasis/20 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-600" />
              Essential Arabic Phrases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.content.essentialPhrases.map((phrase, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{phrase.english}</span>
                  <span className="text-teal-600 font-medium">{phrase.arabic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link href="/travel-planning">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Travel Planning
            </Button>
          </Link>
          <Link href="/planning/cultural-etiquette">
            <Button className="bg-teal-oasis text-white hover:bg-accent-coral flex items-center gap-2">
              Cultural Etiquette
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}