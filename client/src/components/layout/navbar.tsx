import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/lib/api";
import type { SearchResults } from "@/types";

const navigation = [
  { name: "Destinations", href: "/destinations" },
  { name: "Travel Guide & Planning", href: "/travel-planning" },
  { name: "Tours", href: "/tours" },
  { name: "Culture", href: "/culture-history" },
  { name: "Map", href: "/map" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search API query with debouncing
  const { data: searchResults, isLoading: isSearching } = useQuery<SearchResults>({
    queryKey: ["/api/search", searchQuery],
    queryFn: () => searchApi.search(searchQuery),
    enabled: searchQuery.trim().length > 2,
    staleTime: 300000, // 5 minutes
  });

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show search results when we have query and results
  useEffect(() => {
    if (searchQuery.trim().length > 2 && (searchResults || isSearching)) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, searchResults, isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults && searchResults.totalResults > 0) {
      // Navigate to search results or first result
      const firstDestination = searchResults.destinations[0];
      const firstTour = searchResults.tours[0];
      
      if (firstDestination) {
        window.location.href = `/destinations/${firstDestination.slug}`;
      } else if (firstTour) {
        window.location.href = `/tours`;
      }
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (type: 'destination' | 'tour', slug: string) => {
    setShowSearchResults(false);
    setSearchQuery("");
    if (type === 'destination') {
      window.location.href = `/destinations/${slug}`;
    } else {
      window.location.href = `/tours`;
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-teal-oasis font-serif">
                EgyptTravel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    location === item.href
                      ? "text-teal-oasis"
                      : "text-gray-700 hover:text-teal-oasis"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search destinations, tours..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="pl-10 pr-4 py-2 w-64 border-cool-limestone focus:ring-2 focus:ring-teal-oasis focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto min-w-80">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto"></div>
                      <p className="mt-2">Searching...</p>
                    </div>
                  ) : searchResults && searchResults.totalResults > 0 ? (
                    <div className="py-2">
                      {/* Destinations */}
                      {searchResults.destinations.length > 0 && (
                        <div className="px-4 py-2">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                            Destinations
                          </h4>
                          {searchResults.destinations.slice(0, 3).map((destination) => (
                            <button
                              key={destination.id}
                              onClick={() => handleResultClick('destination', destination.slug)}
                              className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-start space-x-3 transition-colors"
                            >
                              <img
                                src={destination.imageUrl}
                                alt={destination.name}
                                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{destination.name}</p>
                                <p className="text-sm text-gray-500 truncate">{destination.shortDescription}</p>
                                <p className="text-xs text-teal-600 font-medium">From ${destination.priceFrom}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Tours */}
                      {searchResults.tours.length > 0 && (
                        <div className="px-4 py-2 border-t border-gray-100">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                            Tours
                          </h4>
                          {searchResults.tours.slice(0, 3).map((tour) => (
                            <button
                              key={tour.id}
                              onClick={() => handleResultClick('tour', tour.slug)}
                              className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-start space-x-3 transition-colors"
                            >
                              <img
                                src={tour.imageUrl}
                                alt={tour.name}
                                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{tour.name}</p>
                                <p className="text-sm text-gray-500 truncate">{tour.shortDescription}</p>
                                <p className="text-xs text-teal-600 font-medium">{tour.duration} days • ${tour.price}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* View All Results */}
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery("");
                            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                          }}
                          className="w-full text-center text-sm text-teal-600 hover:text-teal-700 py-2 font-medium transition-colors"
                        >
                          View all {searchResults.totalResults} results →
                        </button>
                      </div>
                    </div>
                  ) : searchQuery.trim().length > 2 ? (
                    <div className="p-4 text-center text-gray-500">
                      <p className="font-medium">No results found for "{searchQuery}"</p>
                      <p className="text-xs mt-1">Try searching for destinations like "Cairo" or "Luxor"</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <Button className="bg-teal-oasis text-white hover:bg-accent-coral">
              Plan Trip
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-teal-oasis"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-cool-limestone">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location === item.href
                      ? "text-teal-oasis bg-cool-limestone"
                      : "text-gray-700 hover:text-teal-oasis hover:bg-cool-limestone"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </form>
              </div>
              <div className="px-3 py-2">
                <Button className="w-full bg-teal-oasis text-white hover:bg-accent-coral">
                  Plan Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
