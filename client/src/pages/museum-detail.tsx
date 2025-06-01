import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Globe, Phone, DollarSign, Camera, Users, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function MuseumDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: museum, isLoading, error } = useQuery({
    queryKey: ["/api/museums/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/museums/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch museum");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !museum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Museum Not Found</h1>
          <p className="text-gray-600">The museum you're looking for doesn't exist.</p>
          <Link href="/culture-history">
            <Button className="mt-4">Back to Culture & History</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "collections", label: "Collections" },
    { id: "visit", label: "Plan Your Visit" }
  ];

  return (
    <div className="min-h-screen bg-cool-limestone">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={museum.imageUrl || "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200"}
          alt={museum.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Breadcrumbs */}
        <div className="absolute top-6 left-6 z-10">
          <div className="flex items-center space-x-2 text-white/90 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/culture-history" className="hover:text-white">Culture & History</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{museum.name}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <Badge variant="secondary" className="bg-teal-oasis text-white mb-4">
              {museum.category.charAt(0).toUpperCase() + museum.category.slice(1)} Museum
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
              {museum.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {museum.location}
            </p>
            
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="h-5 w-5 mr-1" />
                  <span className="font-bold text-sm">Open Today</span>
                </div>
                <div className="text-xs text-white/80">{museum.openingHours || "9AM-5PM"}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span className="font-bold text-sm">{museum.entryFee || "Free"}</span>
                </div>
                <div className="text-xs text-white/80">Entry Fee</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-5 w-5 mr-1" />
                  <span className="font-bold text-sm">2-3 hours</span>
                </div>
                <div className="text-xs text-white/80">Visit Duration</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-bold text-sm">4.8</span>
                </div>
                <div className="text-xs text-white/80">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-oasis text-teal-oasis'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">About the Museum</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {museum.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This remarkable institution stands as a testament to Egypt's rich cultural heritage, 
                      offering visitors an extraordinary journey through time and preserving invaluable 
                      artifacts for future generations.
                    </p>
                  </CardContent>
                </Card>

                {/* History & Significance */}
                <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">History & Significance</h2>
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <p className="mb-4">
                        Established as a cornerstone of Egypt's cultural preservation efforts, this museum 
                        has played a vital role in showcasing the country's magnificent heritage to both 
                        scholars and the public.
                      </p>
                      <p>
                        The museum's collection represents decades of careful curation and archaeological 
                        discoveries, making it an essential destination for anyone seeking to understand 
                        Egypt's profound impact on world civilization.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "collections" && (
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Featured Collections</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {museum.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-teal-oasis rounded-full flex items-center justify-center flex-shrink-0">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">{highlight}</h3>
                          <p className="text-gray-600 text-sm">
                            Discover the fascinating stories and historical significance behind this remarkable collection.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "visit" && (
              <div className="space-y-8">
                {/* Practical Information */}
                <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Visitor Information</h2>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <Clock className="h-5 w-5 text-teal-oasis mr-2" />
                            Opening Hours
                          </h3>
                          <p className="text-gray-600">
                            {museum.openingHours || "Daily: 9:00 AM - 5:00 PM"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Last entry 30 minutes before closing
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <DollarSign className="h-5 w-5 text-teal-oasis mr-2" />
                            Admission Fees
                          </h3>
                          <p className="text-gray-600">
                            {museum.entryFee || "Contact museum for current pricing"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Discounts available for students and groups
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <MapPin className="h-5 w-5 text-teal-oasis mr-2" />
                          Getting There
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Located in {museum.location}
                        </p>
                        <ul className="text-gray-600 space-y-1 text-sm">
                          <li>• Accessible by taxi, public transport, and private vehicle</li>
                          <li>• Limited parking available on-site</li>
                          <li>• Metro stations and bus stops nearby</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          Visitor Guidelines
                        </h3>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Photography may be restricted in certain areas</li>
                          <li>• Large bags and backpacks must be checked at entrance</li>
                          <li>• Guided tours available in multiple languages</li>
                          <li>• Audio guides can be rented at the information desk</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Contact Information</h2>
                    <div className="space-y-4">
                      {museum.phone && (
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-teal-oasis mr-3" />
                          <span className="text-gray-700">{museum.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-teal-oasis mr-3" />
                        <span className="text-gray-700">{museum.location}</span>
                      </div>
                      {museum.website && (
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-teal-oasis mr-3" />
                          <a href={museum.website} target="_blank" rel="noopener noreferrer" 
                             className="text-teal-oasis hover:underline flex items-center">
                            Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Plan Your Visit</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-teal-oasis hover:bg-teal-700 text-white">
                    Book Guided Tour
                  </Button>
                  <Button variant="outline" className="w-full border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white">
                    Download Map
                  </Button>
                  <Button variant="outline" className="w-full border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white">
                    Share with Friends
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold capitalize">{museum.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Featured</span>
                    <span className="font-semibold">{museum.featured ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Collections</span>
                    <span className="font-semibold">{museum.highlights.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Recommended Duration</span>
                    <span className="font-semibold">2-3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Museums */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">You Might Also Like</h3>
                <div className="space-y-3">
                  <Link href="/culture-history">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <p className="font-semibold text-gray-900">Explore More Museums</p>
                      <p className="text-sm text-gray-600">Discover other cultural sites</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}