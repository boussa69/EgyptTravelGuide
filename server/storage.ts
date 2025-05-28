import { 
  destinations, 
  tours, 
  travelTips, 
  planningResources, 
  newsletterSubscriptions,
  type Destination, 
  type InsertDestination,
  type Tour,
  type InsertTour,
  type TravelTip,
  type InsertTravelTip,
  type PlanningResource,
  type InsertPlanningResource,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Tours
  getTours(): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  getTourBySlug(slug: string): Promise<Tour | undefined>;
  getPopularTours(): Promise<Tour[]>;
  getToursByCategory(category: string): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;
  
  // Travel Tips
  getTravelTips(): Promise<TravelTip[]>;
  getTravelTip(id: number): Promise<TravelTip | undefined>;
  getTravelTipsByCategory(category: string): Promise<TravelTip[]>;
  createTravelTip(tip: InsertTravelTip): Promise<TravelTip>;
  
  // Planning Resources
  getPlanningResources(): Promise<PlanningResource[]>;
  getPlanningResource(id: number): Promise<PlanningResource | undefined>;
  getPlanningResourcesByCategory(category: string): Promise<PlanningResource[]>;
  createPlanningResource(resource: InsertPlanningResource): Promise<PlanningResource>;
  
  // Newsletter
  subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private destinations: Map<number, Destination>;
  private tours: Map<number, Tour>;
  private travelTips: Map<number, TravelTip>;
  private planningResources: Map<number, PlanningResource>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private currentId: number;

  constructor() {
    this.destinations = new Map();
    this.tours = new Map();
    this.travelTips = new Map();
    this.planningResources = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Cairo",
        slug: "cairo",
        description: "The bustling capital filled with Islamic art, Coptic heritage, and modern Egyptian culture. Explore the Pyramids of Giza, Islamic Cairo, and the Egyptian Museum.",
        shortDescription: "The bustling capital filled with Islamic art, Coptic heritage, and modern Egyptian culture.",
        region: "Greater Cairo",
        imageUrl: "https://images.unsplash.com/photo-1510759591315-6425cba413fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: 5,
        reviewCount: 2847,
        priceFrom: 89,
        highlights: ["Pyramids of Giza", "Egyptian Museum", "Islamic Cairo", "Khan El Khalili Bazaar"],
        attractions: ["Great Pyramid", "Sphinx", "Citadel of Saladin", "Al-Azhar Mosque", "Coptic Quarter"]
      },
      {
        name: "Luxor",
        slug: "luxor",
        description: "The world's greatest open-air museum with spectacular temples and royal tombs. Visit Karnak Temple, Valley of the Kings, and take a magical hot air balloon ride.",
        shortDescription: "The world's greatest open-air museum with spectacular temples and royal tombs.",
        region: "Upper Egypt",
        imageUrl: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: 5,
        reviewCount: 1943,
        priceFrom: 125,
        highlights: ["Karnak Temple", "Valley of the Kings", "Hot Air Balloon", "Luxor Temple"],
        attractions: ["Karnak Temple Complex", "Valley of the Kings", "Hatshepsut Temple", "Colossi of Memnon"]
      },
      {
        name: "Red Sea Coast",
        slug: "red-sea",
        description: "World-class diving, pristine beaches, and luxury resorts along the spectacular coastline. Perfect for underwater adventures and beach relaxation.",
        shortDescription: "World-class diving, pristine beaches, and luxury resorts along the spectacular coastline.",
        region: "Red Sea",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: 5,
        reviewCount: 2156,
        priceFrom: 75,
        highlights: ["World-class diving", "Coral reefs", "Beach resorts", "Water sports"],
        attractions: ["Hurghada", "Sharm El Sheikh", "Marsa Alam", "Dahab"]
      },
      {
        name: "Aswan",
        slug: "aswan",
        description: "The gateway to Africa with Nubian culture, beautiful islands, and the majestic Nile. Discover Abu Simbel, Philae Temple, and traditional felucca sailing.",
        shortDescription: "The gateway to Africa with Nubian culture, beautiful islands, and the majestic Nile.",
        region: "Upper Egypt",
        imageUrl: "https://pixabay.com/get/gb5968a70d2c97a0a0e641916195d07a057c8631e4a78d6ee0247dc728c700058404874b5e3125488150dc28fe96b54a4f524ffbeed9cba48e6e59e9403cee938_1280.jpg",
        rating: 5,
        reviewCount: 1524,
        priceFrom: 95,
        highlights: ["Abu Simbel", "Philae Temple", "Nubian villages", "Felucca sailing"],
        attractions: ["Abu Simbel Temples", "Philae Temple", "Unfinished Obelisk", "Elephantine Island"]
      },
      {
        name: "Alexandria",
        slug: "alexandria",
        description: "The Mediterranean pearl with Greco-Roman heritage and legendary ancient landmarks. Explore the modern Library of Alexandria and coastal attractions.",
        shortDescription: "The Mediterranean pearl with Greco-Roman heritage and legendary ancient landmarks.",
        region: "Mediterranean Coast",
        imageUrl: "https://pixabay.com/get/gcf6c3c1d5a0e44962c6de6d5b0b5a7cd6637dfa3a6716eba0222e29977d1a8c6c34e8aa8e5c57225b70f908a959c8f74d8a56c69319d5f8da2ad69ec61cf1be9_1280.jpg",
        rating: 4,
        reviewCount: 987,
        priceFrom: 65,
        highlights: ["Library of Alexandria", "Qaitbay Citadel", "Roman amphitheater", "Mediterranean coast"],
        attractions: ["Bibliotheca Alexandrina", "Pompey's Pillar", "Catacombs of Kom el Shoqafa", "Montaza Palace"]
      },
      {
        name: "Desert Oases",
        slug: "desert-oases",
        description: "Siwa Oasis, White Desert formations, and authentic Bedouin experiences under starlit skies. Adventure into Egypt's spectacular desert landscapes.",
        shortDescription: "Siwa Oasis, White Desert formations, and authentic Bedouin experiences under starlit skies.",
        region: "Western Desert",
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: 5,
        reviewCount: 756,
        priceFrom: 145,
        highlights: ["Siwa Oasis", "White Desert", "Desert camping", "Bedouin culture"],
        attractions: ["White Desert National Park", "Siwa Oasis", "Bahariya Oasis", "Crystal Mountain"]
      }
    ];

    sampleDestinations.forEach(dest => {
      this.createDestination(dest);
    });

    // Sample tours
    const sampleTours: InsertTour[] = [
      {
        name: "7-Day Egypt Highlights",
        slug: "7-day-egypt-highlights",
        description: "Perfect introduction to Egypt's greatest hits including Cairo, Luxor, and Aswan with a Nile cruise experience.",
        shortDescription: "Cairo • Luxor • Aswan",
        duration: 7,
        price: 1299,
        imageUrl: "https://pixabay.com/get/g557ef02b64cf6f8dec217715fa2054af75e2682c7a8deedd24d31cad320f0457adba24d54f04e98529d6f3567d201c16859898a02c55fe3ccddf5441cf2d741b_1280.jpg",
        category: "Cultural",
        difficulty: "Easy",
        included: ["Pyramids of Giza & Sphinx", "Valley of the Kings & Karnak Temple", "Abu Simbel & Nile Felucca Ride"],
        excluded: ["International flights", "Personal expenses", "Optional activities"],
        itinerary: [
          { day: 1, title: "Arrival in Cairo", activities: ["Airport transfer", "Hotel check-in", "Welcome dinner"] },
          { day: 2, title: "Pyramids & Museum", activities: ["Giza Pyramids", "Sphinx", "Egyptian Museum"] },
          { day: 3, title: "Islamic Cairo", activities: ["Citadel", "Mosques", "Khan El Khalili"] }
        ],
        highlights: ["Expert Egyptologist guide", "3-star hotels", "All transfers included"],
        destinationIds: [1, 2, 4],
        rating: 5,
        reviewCount: 847,
        isPopular: true,
        isLuxury: false
      },
      {
        name: "10-Day Luxury Nile",
        slug: "10-day-luxury-nile",
        description: "Premium river cruise experience with 5-star accommodations, private guide, and exclusive access to monuments.",
        shortDescription: "Premium River Cruise Experience",
        duration: 10,
        price: 2899,
        imageUrl: "https://pixabay.com/get/g8afae230c0b9cf9ec49c71269d7d670d0112066e7e0812d937dafd8b6c4022774f90fd7621cdac5dcde27de1b84546749f5e8fcda80bce4fb17df175de66e3f2_1280.jpg",
        category: "Luxury",
        difficulty: "Easy",
        included: ["5-Star Deluxe Nile Cruise Ship", "Private Egyptologist Guide", "Hot Air Balloon & Fine Dining"],
        excluded: ["International flights", "Gratuities", "Spa treatments"],
        itinerary: [
          { day: 1, title: "Cairo Arrival", activities: ["VIP airport transfer", "5-star hotel", "Gourmet dinner"] },
          { day: 2, title: "Pyramids & Museum", activities: ["Private Giza tour", "Egyptian Museum", "Fine dining"] }
        ],
        highlights: ["5-star luxury accommodations", "Private expert guide", "All meals included"],
        destinationIds: [1, 2, 4],
        rating: 5,
        reviewCount: 234,
        isPopular: false,
        isLuxury: true
      }
    ];

    sampleTours.forEach(tour => {
      this.createTour(tour);
    });

    // Sample travel tips
    const sampleTips: InsertTravelTip[] = [
      {
        title: "Transportation",
        slug: "transportation",
        category: "Transportation",
        content: "Getting around Egypt is easier than you think with various transport options available.",
        shortDescription: "Navigate Egypt with confidence using our comprehensive transport guide.",
        icon: "Car",
        tips: ["Uber and Careem available in major cities", "Domestic flights for long distances", "Train travel between major destinations"],
        isEssential: true
      },
      {
        title: "Money & Payments",
        slug: "money-payments",
        category: "Money",
        content: "Understanding Egyptian currency and payment methods for smooth transactions.",
        shortDescription: "Essential money tips and payment options for travelers.",
        icon: "DollarSign",
        tips: ["Egyptian Pound (EGP) is local currency", "Cash preferred for small purchases", "ATMs widely available in cities"],
        isEssential: true
      }
    ];

    sampleTips.forEach(tip => {
      this.createTravelTip(tip);
    });

    // Sample planning resources
    const sampleResources: InsertPlanningResource[] = [
      {
        title: "Best Time to Visit",
        slug: "best-time-to-visit",
        category: "Weather",
        content: "October to April offers ideal weather for sightseeing and outdoor activities.",
        shortDescription: "October to April offers perfect weather for sightseeing",
        icon: "Sun",
        keyPoints: ["October-April: Peak season", "May-September: Hot summer", "December-February: Cool weather"],
        resources: [],
        isEssential: true
      },
      {
        title: "Visa & Entry",
        slug: "visa-entry",
        category: "Visa",
        content: "Tourist visa required, available on arrival or online for most nationalities.",
        shortDescription: "Easy visa on arrival or e-visa options available for most nationalities.",
        icon: "CheckCircle",
        keyPoints: ["Visa on arrival available", "E-visa option online", "Passport valid 6+ months"],
        resources: [],
        isEssential: true
      }
    ];

    sampleResources.forEach(resource => {
      this.createPlanningResource(resource);
    });
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    return Array.from(this.destinations.values()).find(dest => dest.slug === slug);
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const id = this.currentId++;
    const newDestination: Destination = {
      ...destination,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.destinations.set(id, newDestination);
    return newDestination;
  }

  // Tours
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getTour(id: number): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    return Array.from(this.tours.values()).find(tour => tour.slug === slug);
  }

  async getPopularTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isPopular);
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.category === category);
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const id = this.currentId++;
    const newTour: Tour = {
      ...tour,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tours.set(id, newTour);
    return newTour;
  }

  // Travel Tips
  async getTravelTips(): Promise<TravelTip[]> {
    return Array.from(this.travelTips.values());
  }

  async getTravelTip(id: number): Promise<TravelTip | undefined> {
    return this.travelTips.get(id);
  }

  async getTravelTipsByCategory(category: string): Promise<TravelTip[]> {
    return Array.from(this.travelTips.values()).filter(tip => tip.category === category);
  }

  async createTravelTip(tip: InsertTravelTip): Promise<TravelTip> {
    const id = this.currentId++;
    const newTip: TravelTip = {
      ...tip,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.travelTips.set(id, newTip);
    return newTip;
  }

  // Planning Resources
  async getPlanningResources(): Promise<PlanningResource[]> {
    return Array.from(this.planningResources.values());
  }

  async getPlanningResource(id: number): Promise<PlanningResource | undefined> {
    return this.planningResources.get(id);
  }

  async getPlanningResourcesByCategory(category: string): Promise<PlanningResource[]> {
    return Array.from(this.planningResources.values()).filter(resource => resource.category === category);
  }

  async createPlanningResource(resource: InsertPlanningResource): Promise<PlanningResource> {
    const id = this.currentId++;
    const newResource: PlanningResource = {
      ...resource,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.planningResources.set(id, newResource);
    return newResource;
  }

  // Newsletter
  async subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentId++;
    const newSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

export const storage = new MemStorage();
