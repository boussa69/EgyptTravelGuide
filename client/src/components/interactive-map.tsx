import { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/lib/api";
import { Destination } from "@shared/schema";
import { MapPin, Star, DollarSign } from "lucide-react";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="flex items-center justify-center h-96">Loading map...</div>;
    case Status.FAILURE:
      return <div className="flex items-center justify-center h-96 text-red-600">Error loading map</div>;
    case Status.SUCCESS:
      return <MyMapComponent />;
  }
};

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  destinations: Destination[];
  onMarkerClick?: (destination: Destination) => void;
}

function MyMapComponent() {
  const { data: destinations = [] } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: () => destinationsApi.getAll(),
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
      <Map
        center={{ lat: 26.8206, lng: 33.7963 }} // Center on Egypt
        zoom={6}
        destinations={destinations}
        onMarkerClick={setSelectedDestination}
      />
      
      {selectedDestination && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">{selectedDestination.name}</h3>
            <button 
              onClick={() => setSelectedDestination(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-3">{selectedDestination.shortDescription}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{selectedDestination.rating}</span>
              <span className="ml-1">({selectedDestination.reviewCount})</span>
            </div>
            <div className="flex items-center text-sm font-semibold text-teal-oasis">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>From ${selectedDestination.priceFrom}</span>
            </div>
          </div>
          <div className="mt-3">
            <a 
              href={`/destinations/${selectedDestination.slug}`}
              className="inline-block bg-teal-oasis text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition-colors"
            >
              Explore Destination
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Map({ center, zoom, destinations, onMarkerClick }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#14b8a6" }] // Teal water
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f4" }] // Light background
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map && destinations.length > 0) {
      // Clear existing markers
      destinations.forEach((destination) => {
        if (destination.latitude && destination.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: destination.latitude, lng: destination.longitude },
            map,
            title: destination.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#14b8a6",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });

          marker.addListener("click", () => {
            onMarkerClick?.(destination);
          });

          // Custom info window on hover
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h4 class="font-semibold text-gray-900">${destination.name}</h4>
                <p class="text-sm text-gray-600">${destination.region}</p>
                <div class="flex items-center mt-1">
                  <span class="text-yellow-400">★</span>
                  <span class="text-sm ml-1">${destination.rating} (${destination.reviewCount})</span>
                </div>
              </div>
            `,
          });

          marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
          });

          marker.addListener("mouseout", () => {
            infoWindow.close();
          });
        }
      });

      // Fit map to show all destinations
      const bounds = new window.google.maps.LatLngBounds();
      destinations.forEach((destination) => {
        if (destination.latitude && destination.longitude) {
          bounds.extend({ lat: destination.latitude, lng: destination.longitude });
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, destinations, onMarkerClick]);

  return <div ref={ref} className="w-full h-full" />;
}

export default function InteractiveMap() {
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

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={["maps"]} />
  );
}