import { Button } from "@/components/ui/button";
import { BookOpen, Wifi, Users } from "lucide-react";

const culturalHighlights = [
  {
    icon: BookOpen,
    title: "Ancient Egyptian Civilization",
    description: "Explore the mysteries of pharaohs, hieroglyphs, and monumental architecture that defined an empire.",
    color: "gold-accent"
  },
  {
    icon: Wifi,
    title: "Islamic & Coptic Heritage",
    description: "Discover beautiful mosques, ancient churches, and the rich religious tapestry of modern Egypt.",
    color: "teal-oasis"
  },
  {
    icon: Users,
    title: "Living Culture Today",
    description: "Experience vibrant markets, traditional crafts, and the warm hospitality of modern Egyptian society.",
    color: "accent-coral"
  }
];

export default function CultureSection() {
  return (
    <section id="culture" className="py-20 bg-champagne-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Immerse in <span className="text-teal-oasis">5,000 Years</span> of History
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From pharaohs and pyramids to Islamic architecture and modern culture, Egypt offers 
              an unparalleled journey through time. Discover the stories, myths, and traditions 
              that shaped one of the world's greatest civilizations.
            </p>
            
            <div className="space-y-6">
              {culturalHighlights.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className="flex items-start">
                  <div className={`w-12 h-12 bg-${color}/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button 
                size="lg"
                className="bg-teal-oasis text-white px-8 py-4 text-lg font-semibold hover:bg-accent-coral transition-colors"
              >
                Explore Cultural Guides
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1553913861-c0fddf2619ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
                alt="Ancient Egyptian hieroglyphs and artwork" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating Info Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-cool-limestone">
              <div className="text-3xl font-bold text-teal-oasis">3,000+</div>
              <div className="text-sm text-gray-600">Historical Sites</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-cool-limestone">
              <div className="text-3xl font-bold text-gold-accent">5,000</div>
              <div className="text-sm text-gray-600">Years of History</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
