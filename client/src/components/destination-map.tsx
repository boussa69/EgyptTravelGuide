import { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Destination } from "@shared/schema";
import { MapPin, Navigation, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationMapProps {
  destination: Destination;
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  destination: Destination;
  mapType: string;
  showSights: boolean;
  showDining: boolean;
  showHotels: boolean;
}

function MapComponent({ center, zoom, destination, mapType, showSights, showDining, showHotels }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (ref.current && !map && window.google) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeId: mapType,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#14b8a6" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f4" }]
          }
        ],
        mapTypeControl: true,
        zoomControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom, mapType]);

  useEffect(() => {
    if (map && destination.latitude && destination.longitude && window.google) {
      // Main destination marker
      const mainMarker = new window.google.maps.Marker({
        position: { lat: destination.latitude, lng: destination.longitude },
        map,
        title: destination.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#dc2626",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3,
        },
      });

      const mainInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <h3 class="font-bold text-lg text-gray-900">${destination.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${destination.shortDescription}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="text-sm ml-1">${destination.rating} (${destination.reviewCount} reviews)</span>
              </div>
              <span class="text-sm font-semibold text-teal-600">From $${destination.priceFrom}</span>
            </div>
          </div>
        `,
      });

      mainMarker.addListener("click", () => {
        mainInfoWindow.open(map, mainMarker);
      });

      // Places service for nearby attractions
      if (window.google.maps.places) {
        const service = new window.google.maps.places.PlacesService(map);
        
        if (showSights) {
          service.nearbySearch({
            location: { lat: destination.latitude, lng: destination.longitude },
            radius: 5000,
            type: 'tourist_attraction'
          }, (results: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              results.slice(0, 5).forEach((place: any) => {
                if (place.geometry?.location) {
                  const marker = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map,
                    title: place.name,
                    icon: {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: "#3b82f6",
                      fillOpacity: 1,
                      strokeColor: "#ffffff",
                      strokeWeight: 2,
                    },
                  });
                }
              });
            }
          });
        }
      }
    }
  }, [map, destination, showSights, showDining, showHotels]);

  return <div ref={ref} className="w-full h-full" />;
}

const render = (status: Status, destination: Destination, mapType: string, showSights: boolean, showDining: boolean, showHotels: boolean) => {
  switch (status) {
    case Status.LOADING:
      return <div className="flex items-center justify-center h-96">Loading map...</div>;
    case Status.FAILURE:
      return <div className="flex items-center justify-center h-96 text-red-600">Error loading map</div>;
    case Status.SUCCESS:
      return (
        <MapComponent
          center={{ lat: destination.latitude!, lng: destination.longitude! }}
          zoom={13}
          destination={destination}
          mapType={mapType}
          showSights={showSights}
          showDining={showDining}
          showHotels={showHotels}
        />
      );
  }
};

export default function DestinationMap({ destination }: DestinationMapProps) {
  const [mapType, setMapType] = useState("roadmap");
  const [showSights, setShowSights] = useState(true);
  const [showDining, setShowDining] = useState(false);
  const [showHotels, setShowHotels] = useState(false);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Map configuration required</p>
        </div>
      </div>
    );
  }

  if (!destination.latitude || !destination.longitude) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Location coordinates not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md p-3">
        <div className="text-center mb-3">
          <Layers className="h-5 w-5 mx-auto text-gray-600 mb-1" />
          <p className="text-xs text-gray-600 font-medium">Interactive map with layered toggles</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showSights ? "default" : "outline"}
              onClick={() => setShowSights(!showSights)}
              className="text-xs"
            >
              Sights
            </Button>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showDining ? "default" : "outline"}
              onClick={() => setShowDining(!showDining)}
              className="text-xs"
            >
              Dining
            </Button>
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showHotels ? "default" : "outline"}
              onClick={() => setShowHotels(!showHotels)}
              className="text-xs"
            >
              Hotels
            </Button>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      <Wrapper 
        apiKey={apiKey} 
        render={(status) => render(status, destination, mapType, showSights, showDining, showHotels)} 
        libraries={["maps", "places"]}
      />
    </div>
  );
}