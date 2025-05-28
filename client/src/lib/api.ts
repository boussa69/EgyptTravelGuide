import { apiRequest } from "./queryClient";
import type { 
  Destination, 
  Tour, 
  TravelTip, 
  PlanningResource,
  SearchResults,
  InsertNewsletterSubscription 
} from "../types";

// Destinations API
export const destinationsApi = {
  getAll: (): Promise<Destination[]> => 
    apiRequest("GET", "/api/destinations").then(res => res.json()),
  
  getBySlug: (slug: string): Promise<Destination> => 
    apiRequest("GET", `/api/destinations/${slug}`).then(res => res.json()),
};

// Tours API
export const toursApi = {
  getAll: (params?: { category?: string; popular?: boolean }): Promise<Tour[]> => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    if (params?.popular) searchParams.set("popular", "true");
    
    const url = `/api/tours${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return apiRequest("GET", url).then(res => res.json());
  },
  
  getBySlug: (slug: string): Promise<Tour> => 
    apiRequest("GET", `/api/tours/${slug}`).then(res => res.json()),
};

// Travel Tips API
export const travelTipsApi = {
  getAll: (category?: string): Promise<TravelTip[]> => {
    const url = category ? `/api/travel-tips?category=${category}` : "/api/travel-tips";
    return apiRequest("GET", url).then(res => res.json());
  },
};

// Planning Resources API
export const planningResourcesApi = {
  getAll: (category?: string): Promise<PlanningResource[]> => {
    const url = category ? `/api/planning-resources?category=${category}` : "/api/planning-resources";
    return apiRequest("GET", url).then(res => res.json());
  },
};

// Search API
export const searchApi = {
  search: (query: string): Promise<SearchResults> => 
    apiRequest("GET", `/api/search?q=${encodeURIComponent(query)}`).then(res => res.json()),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (data: InsertNewsletterSubscription) => 
    apiRequest("POST", "/api/newsletter/subscribe", data).then(res => res.json()),
};
