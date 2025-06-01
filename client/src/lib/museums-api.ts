import { apiRequest } from "./queryClient";

export interface Museum {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  highlights: string[];
  imageUrl?: string;
  category: string;
  openingHours?: string;
  entryFee?: string;
  website?: string;
  phone?: string;
  featured: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface InsertMuseum {
  name: string;
  slug: string;
  description: string;
  location: string;
  highlights: string[];
  imageUrl?: string;
  category: string;
  openingHours?: string;
  entryFee?: string;
  website?: string;
  phone?: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

export const museumsApi = {
  getAll: (): Promise<Museum[]> => 
    apiRequest("GET", "/api/museums"),
  
  getById: (id: number): Promise<Museum> =>
    apiRequest("GET", `/api/museums/${id}`),
    
  getBySlug: (slug: string): Promise<Museum> =>
    apiRequest("GET", `/api/museums/slug/${slug}`),
    
  getFeatured: (): Promise<Museum[]> =>
    apiRequest("GET", "/api/museums/featured"),
    
  getByCategory: (category: string): Promise<Museum[]> =>
    apiRequest("GET", `/api/museums/category/${category}`),
    
  create: (museum: InsertMuseum): Promise<Museum> =>
    apiRequest("POST", "/api/museums", museum),
    
  update: (id: number, museum: Partial<InsertMuseum>): Promise<Museum> =>
    apiRequest("PUT", `/api/museums/${id}`, museum),
    
  delete: (id: number): Promise<void> =>
    apiRequest("DELETE", `/api/museums/${id}`)
};