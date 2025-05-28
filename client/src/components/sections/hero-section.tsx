import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HeroSection() {
  const [searchForm, setSearchForm] = useState({
    destination: "",
    duration: "",
    travelStyle: "",
  });

  const handleSearch = () => {
    console.log("Search form:", searchForm);
    // TODO: Implement search functionality
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://pixabay.com/get/g03bca1809aceeaa0ae1cf05283563a804df6ab7caea87bff6dec75b1467d876e431f01e2309d7a3255edff89340761f7d295952cf7ecbc1873f2bd330cf0c64e_1280.jpg')"
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
          Discover the
          <span className="text-gold-accent"> Timeless</span>
          <br />
          Magic of Egypt
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Journey through 5,000 years of history, from the mystical pyramids to vibrant Red Sea reefs. 
          Your extraordinary Egyptian adventure awaits.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="bg-gold-accent text-white px-8 py-4 text-lg font-semibold hover:bg-accent-coral transition-all transform hover:scale-105 shadow-xl"
          >
            Explore Destinations
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-teal-oasis transition-all"
          >
            Plan Your Journey
          </Button>
        </div>
        
        {/* Quick Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={searchForm.destination} onValueChange={(value) => setSearchForm(prev => ({ ...prev, destination: value }))}>
              <SelectTrigger className="bg-white border-0 focus:ring-2 focus:ring-gold-accent">
                <SelectValue placeholder="Select Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cairo">Cairo</SelectItem>
                <SelectItem value="luxor">Luxor</SelectItem>
                <SelectItem value="aswan">Aswan</SelectItem>
                <SelectItem value="alexandria">Alexandria</SelectItem>
                <SelectItem value="red-sea">Red Sea</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={searchForm.duration} onValueChange={(value) => setSearchForm(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger className="bg-white border-0 focus:ring-2 focus:ring-gold-accent">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5">3-5 Days</SelectItem>
                <SelectItem value="7-10">7-10 Days</SelectItem>
                <SelectItem value="14+">2+ Weeks</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={searchForm.travelStyle} onValueChange={(value) => setSearchForm(prev => ({ ...prev, travelStyle: value }))}>
              <SelectTrigger className="bg-white border-0 focus:ring-2 focus:ring-gold-accent">
                <SelectValue placeholder="Travel Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleSearch}
              className="bg-accent-coral text-white px-6 py-3 font-semibold hover:bg-gold-accent transition-colors"
            >
              Find Tours
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
