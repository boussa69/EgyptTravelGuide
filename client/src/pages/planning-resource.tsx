import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Thermometer, Users, Camera, AlertTriangle } from "lucide-react";
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
    description: "Everything you need to know about entering Egypt",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers multiple visa options for tourists, making entry relatively straightforward for most nationalities.",
      visaTypes: [
        {
          type: "Visa on Arrival",
          price: "$25 USD",
          duration: "30 days",
          requirements: ["Valid passport (6 months validity)", "Return ticket", "Proof of accommodation"],
          countries: "Most European countries, USA, Canada, Australia, and many others"
        },
        {
          type: "e-Visa",
          price: "$25 USD + processing fee",
          duration: "30 days (single entry) / 90 days (multiple entry)",
          requirements: ["Valid passport", "Digital passport photo", "Payment by credit card"],
          processing: "7 days"
        }
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