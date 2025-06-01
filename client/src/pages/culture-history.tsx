import { BookOpen, Church, Cross, Users, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Museum } from "@shared/schema";

const historicalPeriods = [
  {
    period: "Ancient Egypt",
    timeframe: "3100 BC - 30 BC",
    description: "The era of pharaohs, pyramids, and hieroglyphs that defined one of history's greatest civilizations.",
    highlights: ["Great Pyramids of Giza", "Valley of the Kings", "Egyptian Hieroglyphs", "Mummification Practices"],
    icon: "🏺",
    color: "gold-accent"
  },
  {
    period: "Greco-Roman Period",
    timeframe: "332 BC - 641 AD",
    description: "Alexandria became a center of learning while Egypt was ruled by Ptolemies and later Romans.",
    highlights: ["Library of Alexandria", "Lighthouse of Alexandria", "Roman Amphitheaters", "Coptic Christianity"],
    icon: "🏛️",
    color: "teal-oasis"
  },
  {
    period: "Islamic Era",
    timeframe: "641 AD - Present",
    description: "Islamic conquest brought new architectural styles, culture, and traditions to Egypt.",
    highlights: ["Islamic Cairo", "Al-Azhar University", "Mamluk Architecture", "Ottoman Influence"],
    icon: "🕌",
    color: "accent-coral"
  }
];

const culturalAspects = [
  {
    icon: BookOpen,
    title: "Ancient Egyptian Legacy",
    description: "Discover the civilization that gave the world pyramids, hieroglyphs, and timeless wisdom. From the mighty pharaohs to the ingenious engineers who built monuments that still stand today.",
    features: ["Hieroglyphic writing system", "Pyramid construction techniques", "Mummification and afterlife beliefs", "Mathematical and astronomical knowledge"],
    color: "gold-accent"
  },
  {
    icon: Church,
    title: "Islamic Heritage",
    description: "Explore magnificent mosques, madrasas, and Islamic art that flourished for over 1,000 years in Egypt.",
    features: ["Historic mosques and minarets", "Islamic calligraphy and art", "Traditional crafts and markets", "Religious festivals and traditions"],
    color: "teal-oasis"
  },
  {
    icon: Cross,
    title: "Coptic Christianity",
    description: "Visit ancient churches and monasteries that preserve early Christian traditions and art in Egypt.",
    features: ["Ancient monasteries", "Coptic art and manuscripts", "Religious ceremonies", "Historic churches"],
    color: "accent-coral"
  },
  {
    icon: Users,
    title: "Modern Egyptian Culture",
    description: "Experience contemporary Egyptian culture, arts, cuisine, and the warmth of its people.",
    features: ["Traditional music and dance", "Egyptian cuisine", "Modern arts and literature", "Social customs and hospitality"],
    color: "gold-accent"
  }
];

const allMuseumsAndSites = [
  {
    name: "Egyptian Museum, Cairo",
    description: "Home to the world's largest collection of ancient Egyptian artifacts, including Tutankhamun's treasures.",
    highlights: ["Tutankhamun's mask", "Royal mummies", "Ancient jewelry", "Papyrus collection"],
    location: "Tahrir Square, Cairo"
  },
  {
    name: "Islamic Art Museum",
    description: "Showcases one of the world's finest collections of Islamic art and artifacts.",
    highlights: ["Mamluk metalwork", "Islamic ceramics", "Textiles and carpets", "Calligraphy collection"],
    location: "Bab al-Khalq, Cairo"
  },
  {
    name: "Coptic Museum",
    description: "Preserves the history and culture of Egypt's Christian heritage.",
    highlights: ["Coptic textiles", "Religious manuscripts", "Ancient icons", "Wooden artifacts"],
    location: "Old Cairo"
  },
  {
    name: "Alexandria National Museum",
    description: "Chronicles the city's rich Greco-Roman and Islamic history.",
    highlights: ["Underwater artifacts", "Ptolemaic statues", "Roman mosaics", "Islamic collections"],
    location: "Alexandria"
  },
  {
    name: "Grand Egyptian Museum",
    description: "The world's largest archaeological museum dedicated to a single civilization, housing over 100,000 artifacts.",
    highlights: ["Complete Tutankhamun collection", "Solar boat exhibit", "Colossal statues", "Interactive displays"],
    location: "Giza Plateau"
  },
  {
    name: "Nubia Museum",
    description: "Dedicated to Nubian history and culture, showcasing the heritage of ancient Nubia.",
    highlights: ["Nubian artifacts", "Archaeological finds", "Traditional crafts", "Cultural exhibits"],
    location: "Aswan"
  },
  {
    name: "Luxor Museum",
    description: "Houses a remarkable collection of ancient Egyptian art from the Theban temples and necropolis.",
    highlights: ["Pharaonic sculptures", "Temple reliefs", "Mummy exhibits", "Royal artifacts"],
    location: "Luxor"
  },
  {
    name: "Imhotep Museum",
    description: "Located at Saqqara, dedicated to the architect of the first pyramid and ancient Egyptian medicine.",
    highlights: ["Pyramid artifacts", "Medical papyri", "Architectural models", "Saqqara finds"],
    location: "Saqqara"
  },
  {
    name: "Mummification Museum",
    description: "Unique museum dedicated to the ancient Egyptian art of mummification.",
    highlights: ["Mummification tools", "Animal mummies", "Canopic jars", "Preservation techniques"],
    location: "Luxor"
  },
  {
    name: "Mahmoud Khalil Museum",
    description: "Fine arts museum featuring one of the finest collections of 19th and 20th-century art in the Middle East.",
    highlights: ["Impressionist paintings", "Oriental art", "European sculptures", "Decorative arts"],
    location: "Giza"
  },
  {
    name: "Agricultural Museum",
    description: "Showcases Egypt's agricultural heritage and the Nile's role in civilization development.",
    highlights: ["Ancient farming tools", "Irrigation systems", "Crop specimens", "Rural life exhibits"],
    location: "Dokki, Cairo"
  },
  {
    name: "Textile Museum",
    description: "Preserves Egypt's rich tradition of textile production from ancient times to modern day.",
    highlights: ["Ancient fabrics", "Islamic textiles", "Coptic tapestries", "Modern Egyptian cotton"],
    location: "Cairo"
  }
];

export default function CultureHistory() {
  const [visibleMuseums, setVisibleMuseums] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch museums from API
  const { data: allMuseums = [], isLoading: isLoadingMuseums } = useQuery({
    queryKey: ["/api/museums"],
    queryFn: async () => {
      const response = await fetch("/api/museums");
      if (!response.ok) {
        throw new Error("Failed to fetch museums");
      }
      return response.json();
    },
  });

  const loadMoreMuseums = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleMuseums(prev => Math.min(prev + 4, allMuseums.length));
      setIsLoadingMore(false);
    }, 500);
  };

  const museumsToShow = allMuseums.slice(0, visibleMuseums);
  const hasMoreMuseums = visibleMuseums < allMuseums.length;

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="bg-champagne-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Egyptian <span className="text-teal-oasis">Culture</span> & History
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through 5,000 years of civilization, from ancient pharaohs to modern Egypt. 
              Discover the rich tapestry of cultures that shaped one of humanity's greatest civilizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">
                A Living Museum of <span className="text-teal-oasis">Human Heritage</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Egypt stands as a crossroads of civilizations, where African, Mediterranean, and Middle Eastern 
                cultures have merged to create a unique and enduring legacy. From the monumental achievements 
                of the pharaohs to the spiritual depth of Islamic and Coptic traditions, Egypt offers an 
                unparalleled journey through human history.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-teal-oasis text-white px-8 py-4 text-lg font-semibold hover:bg-accent-coral transition-colors"
                >
                  Explore Historical Sites
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-teal-oasis text-teal-oasis px-8 py-4 text-lg font-semibold hover:bg-teal-oasis hover:text-white transition-colors"
                >
                  Cultural Tours
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553913861-c0fddf2619ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Ancient Egyptian hieroglyphs and artwork" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-cool-limestone">
                <div className="text-3xl font-bold text-teal-oasis">5,000+</div>
                <div className="text-sm text-gray-600">Years of History</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-cool-limestone">
                <div className="text-3xl font-bold text-gold-accent">100+</div>
                <div className="text-sm text-gray-600">UNESCO Sites</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Periods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Eras of <span className="text-teal-oasis">Egyptian</span> Civilization
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the major periods that shaped Egypt's rich cultural heritage and continue to influence the world today.
            </p>
          </div>

          <div className="space-y-8">
            {historicalPeriods.map((period, index) => (
              <Card key={period.period} className={`border border-cool-limestone ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:flex lg:items-center`}>
                <CardContent className="p-8 lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 bg-${period.color}/10 rounded-2xl flex items-center justify-center mr-4`}>
                      <span className="text-3xl">{period.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 font-serif">{period.period}</h3>
                      <p className={`text-${period.color} font-semibold`}>{period.timeframe}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{period.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {period.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className={`w-2 h-2 bg-${period.color} rounded-full mr-3`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <div className="lg:w-1/2 h-64 lg:h-80">
                  <div className={`w-full h-full bg-${period.color}/5 flex items-center justify-center text-6xl`}>
                    {period.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Aspects */}
      <section className="py-20 bg-cool-limestone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Cultural <span className="text-teal-oasis">Heritage</span> & Traditions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the diverse cultural influences that make Egypt a unique crossroads of civilizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalAspects.map(({ icon: Icon, title, description, features, color }) => (
              <Card key={title} className="bg-white border border-white shadow-lg">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-${color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-${color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">{title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                  
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className={`w-2 h-2 bg-${color} rounded-full mr-3`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Museums and Cultural Sites */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
              Must-Visit <span className="text-teal-oasis">Museums</span> & Cultural Sites
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in Egypt's cultural treasures at these world-renowned institutions and historical sites.
            </p>
          </div>

          {isLoadingMuseums ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="border border-cool-limestone">
                  <CardContent className="p-8">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-6"></div>
                      <div className="space-y-2 mb-6">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {museumsToShow.map((museum: Museum, index: number) => (
                <Link key={museum.id} href={`/museums/${museum.slug}`}>
                  <Card className="border border-cool-limestone card-hover cursor-pointer">
                    <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 font-serif">{museum.name}</h3>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{museum.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{museum.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-gray-900">Featured Collections:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {museum.highlights.map((highlight: string, idx: number) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-teal-oasis rounded-full mr-2" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      {museum.openingHours && (
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{museum.openingHours}</span>
                        </div>
                      )}
                      {museum.entryFee && (
                        <div className="text-teal-oasis font-semibold">{museum.entryFee}</div>
                      )}
                    </div>
                    
                    <Button className="w-full bg-teal-oasis text-white hover:bg-accent-coral transition-colors">
                      Plan Your Visit
                    </Button>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!isLoadingMuseums && hasMoreMuseums && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMoreMuseums}
                disabled={isLoadingMore}
                variant="outline"
                size="lg"
                className="px-8 py-3 border-2 border-teal-oasis text-teal-oasis hover:bg-teal-oasis hover:text-white transition-colors"
              >
                {isLoadingMore ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Discover More Museums</span>
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </div>
                )}
              </Button>
              <p className="text-gray-500 text-sm mt-3">
                Showing {visibleMuseums} of {allMuseums.length} museums and cultural sites
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cultural Etiquette */}
      <section className="py-20 bg-teal-oasis">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
            Respectful Cultural Engagement
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Understanding Egyptian customs and traditions enhances your travel experience and shows respect for local culture.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-3 font-serif">Religious Sites</h3>
              <p className="text-white/90 text-sm">Dress modestly and remove shoes when entering mosques. Respect prayer times and photography restrictions.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-3 font-serif">Social Interactions</h3>
              <p className="text-white/90 text-sm">Egyptians are known for their hospitality. A warm greeting and genuine interest in their culture goes a long way.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-3 font-serif">Photography</h3>
              <p className="text-white/90 text-sm">Ask permission before photographing people. Some historical sites require special permits for photography.</p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-teal-oasis px-8 py-4 text-lg font-semibold hover:bg-champagne-sand transition-colors"
          >
            Learn More About Egyptian Culture
          </Button>
        </div>
      </section>
    </div>
  );
}
