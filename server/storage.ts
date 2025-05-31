import { 
  destinations, 
  tours, 
  travelTips, 
  planningResources, 
  newsletterSubscriptions,
  mediaItems,
  itineraryDays,
  accommodationOptions,
  faqItems,
  bookings,
  type Destination, 
  type InsertDestination,
  type Tour,
  type InsertTour,
  type TravelTip,
  type InsertTravelTip,
  type PlanningResource,
  type InsertPlanningResource,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type MediaItem,
  type InsertMediaItem,
  type ItineraryDay,
  type InsertItineraryDay,
  type AccommodationOption,
  type InsertAccommodationOption,
  type FaqItem,
  type InsertFaqItem
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: number, destination: InsertDestination): Promise<Destination | undefined>;
  deleteDestination(id: number): Promise<boolean>;
  
  // Tours
  getTours(): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  getTourBySlug(slug: string): Promise<Tour | undefined>;
  getPopularTours(): Promise<Tour[]>;
  getToursByCategory(category: string): Promise<Tour[]>;
  createTour(tour: InsertTour): Promise<Tour>;
  updateTour(id: number, tour: InsertTour): Promise<Tour | undefined>;
  deleteTour(id: number): Promise<boolean>;
  
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
  
  // Media
  getMediaItems(): Promise<MediaItem[]>;
  getMediaItem(id: number): Promise<MediaItem | undefined>;
  createMediaItem(mediaItem: InsertMediaItem): Promise<MediaItem>;
  deleteMediaItem(id: number): Promise<boolean>;
  
  // Itinerary Builder
  getItineraryDays(tourId: number): Promise<ItineraryDay[]>;
  createItineraryDay(day: InsertItineraryDay): Promise<ItineraryDay>;
  updateItineraryDay(id: number, day: InsertItineraryDay): Promise<ItineraryDay | undefined>;
  deleteItineraryDay(id: number): Promise<boolean>;
  
  // Accommodation Options
  getAccommodationOptions(tourId: number): Promise<AccommodationOption[]>;
  createAccommodationOption(option: InsertAccommodationOption): Promise<AccommodationOption>;
  updateAccommodationOption(id: number, option: InsertAccommodationOption): Promise<AccommodationOption | undefined>;
  deleteAccommodationOption(id: number): Promise<boolean>;
  
  // FAQ Items
  getFaqItems(tourId?: number): Promise<FaqItem[]>;
  createFaqItem(faq: InsertFaqItem): Promise<FaqItem>;
  updateFaqItem(id: number, faq: InsertFaqItem): Promise<FaqItem | undefined>;
  deleteFaqItem(id: number): Promise<boolean>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingByConfirmation(confirmationNumber: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DbStorage implements IStorage {
  constructor() {
    // Initialize database tables and sample data
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Create tables if they don't exist
      await this.createTables();
      // Initialize with sample data
      await this.initializeSampleData();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createTables() {
    try {
      // Create destinations table
      await sql`
        CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          name text NOT NULL,
          slug text NOT NULL UNIQUE,
          description text NOT NULL,
          short_description text NOT NULL,
          region text NOT NULL,
          image_url text NOT NULL,
          rating integer DEFAULT 5 NOT NULL,
          review_count integer DEFAULT 0 NOT NULL,
          price_from integer NOT NULL,
          highlights text[] DEFAULT '{}' NOT NULL,
          attractions text[] DEFAULT '{}' NOT NULL,
          best_time_to_visit text,
          transport_info text,
          accommodation_info text,
          created_at timestamp DEFAULT now(),
          updated_at timestamp DEFAULT now()
        )
      `;

      // Create tours table
      await sql`
        CREATE TABLE IF NOT EXISTS tours (
          id serial PRIMARY KEY,
          name text NOT NULL,
          slug text NOT NULL UNIQUE,
          description text NOT NULL,
          short_description text NOT NULL,
          duration integer NOT NULL,
          price integer NOT NULL,
          image_url text NOT NULL,
          category text NOT NULL,
          difficulty text DEFAULT 'Easy' NOT NULL,
          included text[] DEFAULT '{}' NOT NULL,
          excluded text[] DEFAULT '{}' NOT NULL,
          itinerary jsonb DEFAULT '[]' NOT NULL,
          highlights text[] DEFAULT '{}' NOT NULL,
          destination_ids integer[] DEFAULT '{}' NOT NULL,
          rating integer DEFAULT 5 NOT NULL,
          review_count integer DEFAULT 0 NOT NULL,
          is_popular boolean DEFAULT false NOT NULL,
          is_luxury boolean DEFAULT false NOT NULL,
          created_at timestamp DEFAULT now(),
          updated_at timestamp DEFAULT now()
        )
      `;

      // Create travel_tips table
      await sql`
        CREATE TABLE IF NOT EXISTS travel_tips (
          id serial PRIMARY KEY,
          title text NOT NULL,
          slug text NOT NULL UNIQUE,
          category text NOT NULL,
          content text NOT NULL,
          short_description text NOT NULL,
          icon text NOT NULL,
          tips text[] DEFAULT '{}' NOT NULL,
          is_essential boolean DEFAULT false NOT NULL,
          created_at timestamp DEFAULT now(),
          updated_at timestamp DEFAULT now()
        )
      `;

      // Create planning_resources table
      await sql`
        CREATE TABLE IF NOT EXISTS planning_resources (
          id serial PRIMARY KEY,
          title text NOT NULL,
          slug text NOT NULL UNIQUE,
          category text NOT NULL,
          content text NOT NULL,
          short_description text NOT NULL,
          icon text NOT NULL,
          key_points text[] DEFAULT '{}' NOT NULL,
          resources jsonb DEFAULT '[]' NOT NULL,
          is_essential boolean DEFAULT false NOT NULL,
          created_at timestamp DEFAULT now(),
          updated_at timestamp DEFAULT now()
        )
      `;

      // Create newsletter_subscriptions table
      await sql`
        CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
          id serial PRIMARY KEY,
          email text NOT NULL UNIQUE,
          is_active boolean DEFAULT true NOT NULL,
          subscribed_at timestamp DEFAULT now()
        )
      `;

      console.log('Database tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  private async initializeSampleData() {
    try {
      // Check if data already exists
      const existingDestinations = await db.select().from(destinations).limit(1);
      if (existingDestinations.length > 0) {
        return; // Data already initialized
      }

      // Sample destinations
      const sampleDestinations: InsertDestination[] = [
        {
          name: "Cairo",
          slug: "cairo",
          description: "The bustling capital filled with Islamic art, Coptic heritage, and modern Egyptian culture. Explore the Pyramids of Giza, Islamic Cairo, and the Egyptian Museum.",
          shortDescription: "The bustling capital filled with Islamic art, Coptic heritage, and modern Egyptian culture.",
          region: "Greater Cairo",
          imageUrl: "/attached_assets/saladin-citadel.jpg",
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

      for (const dest of sampleDestinations) {
        await db.insert(destinations).values(dest);
      }

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

      for (const tour of sampleTours) {
        await db.insert(tours).values(tour);
      }

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

      for (const tip of sampleTips) {
        await db.insert(travelTips).values(tip);
      }

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

      for (const resource of sampleResources) {
        await db.insert(planningResources).values(resource);
      }

      // Create sample itinerary data
      await this.createSampleItineraryData();
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }

  private async createSampleItineraryData() {
    try {
      // Sample itinerary for 7-Day Egypt Highlights (tourId: 1)
      const egyptHighlightsItinerary = [
        {
          tourId: 1,
          dayNumber: 1,
          title: "Arrival in Cairo",
          description: "Welcome to Egypt! Airport transfer and hotel check-in.",
          dailyProgram: "Upon arrival at Cairo International Airport, you'll be met by our representative and transferred to your hotel. After check-in and some time to freshen up, enjoy a welcome dinner featuring authentic Egyptian cuisine while getting acquainted with your fellow travelers.",
          activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Tour briefing"],
          highlights: ["Meet your tour group", "First taste of Egyptian cuisine", "Cairo city overview"],
          meals: ["Dinner"],
          accommodation: "5-star Cairo Hotel",
          transport: "Private air-conditioned vehicle",
          location: "Cairo",
          imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d09d8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          tourId: 1,
          dayNumber: 2,
          title: "Pyramids of Giza & Sphinx",
          description: "Explore the legendary Pyramids and the mysterious Sphinx.",
          dailyProgram: "Start early with a hearty breakfast before heading to the Giza plateau. Marvel at the Great Pyramid of Khufu, explore the Pyramid of Khafre, and visit the smaller Pyramid of Menkaure. Stand before the enigmatic Sphinx and learn about its fascinating history. Optional camel ride around the pyramids. Visit the Solar Boat Museum before lunch at a local restaurant with pyramid views.",
          activities: ["Pyramid exploration", "Sphinx visit", "Solar Boat Museum", "Camel ride (optional)", "Panoramic photo stop"],
          highlights: ["Great Pyramid interior visit", "Sphinx up close", "Panoramic pyramid views", "Solar Boat Museum"],
          meals: ["Breakfast", "Lunch"],
          accommodation: "5-star Cairo Hotel",
          transport: "Private air-conditioned vehicle",
          location: "Giza",
          imageUrl: "https://images.unsplash.com/photo-1572252821143-035a024857ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          tourId: 1,
          dayNumber: 3,
          title: "Egyptian Museum & Old Cairo",
          description: "Discover ancient treasures and explore historic Cairo.",
          dailyProgram: "Begin at the world-renowned Egyptian Museum, home to the largest collection of ancient Egyptian artifacts. See Tutankhamun's treasures, royal mummies, and countless fascinating relics. After lunch, explore Old Cairo visiting the Hanging Church, Ben Ezra Synagogue, and the historic Coptic Quarter. End the day wandering through the vibrant Khan el-Khalili bazaar, perfect for shopping and experiencing local culture.",
          activities: ["Egyptian Museum tour", "Tutankhamun gallery", "Coptic Cairo exploration", "Khan el-Khalili bazaar", "Local shopping"],
          highlights: ["Tutankhamun's golden mask", "Royal mummies", "Hanging Church", "Coptic Quarter", "Traditional bazaar"],
          meals: ["Breakfast", "Lunch"],
          accommodation: "5-star Cairo Hotel",
          transport: "Private air-conditioned vehicle",
          location: "Cairo",
          imageUrl: "https://images.unsplash.com/photo-1569161414119-56d6ee7a2b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ];

      for (const day of egyptHighlightsItinerary) {
        await db.insert(itineraryDays).values(day);
      }

      // Sample accommodation options for 7-Day Egypt Highlights
      const sampleAccommodationOptions = [
        {
          tourId: 1,
          type: "Standard",
          name: "4-Star Hotels & Nile Cruise",
          description: "Comfortable accommodations with essential amenities",
          features: ["Private bathrooms", "Air conditioning", "Daily breakfast", "City center locations", "Standard Nile cruise cabin"],
          pricePerPerson: 1299,
          imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          rating: 4,
          isPopular: false
        },
        {
          tourId: 1,
          type: "Deluxe",
          name: "5-Star Hotels & Deluxe Cruise",
          description: "Superior comfort with enhanced amenities",
          features: ["Luxury amenities", "Pool & spa access", "Premium locations", "Concierge service", "Deluxe Nile cruise suite", "Balcony with Nile views"],
          pricePerPerson: 1899,
          imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          rating: 5,
          isPopular: true
        },
        {
          tourId: 1,
          type: "Luxury",
          name: "Ultra-Luxury Collection",
          description: "The finest accommodations Egypt has to offer",
          features: ["Ultra-luxury hotels", "Butler service", "Private transfers", "Exclusive experiences", "Presidential Nile suite", "Private dining options"],
          pricePerPerson: 2799,
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          rating: 5,
          isPopular: false
        }
      ];

      for (const option of sampleAccommodationOptions) {
        await db.insert(accommodationOptions).values(option);
      }

      // Sample FAQ items
      const sampleFaqItems = [
        {
          tourId: 1,
          category: "trip-specific",
          question: "What's included in the 7-Day Egypt Highlights tour?",
          answer: "The tour includes all accommodation, daily breakfast, guided tours with expert Egyptologists, entrance fees to all mentioned sites, airport transfers, and transportation in air-conditioned vehicles. International flights are not included.",
          orderIndex: 1,
          isExpanded: true
        },
        {
          tourId: 1,
          category: "trip-specific",
          question: "Is this tour suitable for families with children?",
          answer: "Yes! This tour is family-friendly and suitable for children aged 8 and above. We provide engaging explanations that captivate young minds, and the itinerary includes manageable walking distances with rest breaks.",
          orderIndex: 2,
          isExpanded: true
        },
        {
          tourId: 1,
          category: "trip-specific",
          question: "What should I pack for this tour?",
          answer: "Pack light, breathable clothing, comfortable walking shoes, sun protection (hat, sunscreen, sunglasses), modest attire for religious sites, and a light jacket for evening Nile cruise. Don't forget your camera and power bank!",
          orderIndex: 3,
          isExpanded: false
        },
        {
          tourId: null,
          category: "general",
          question: "Do I need a visa to visit Egypt?",
          answer: "Most nationalities can obtain a tourist visa on arrival at Egyptian airports for $25 USD, or apply for an e-visa online before travel. Your passport must be valid for at least 6 months from your entry date.",
          orderIndex: 1,
          isExpanded: false
        },
        {
          tourId: null,
          category: "general",
          question: "Is Egypt safe for tourists?",
          answer: "Yes, Egypt is generally very safe for tourists. Tourist areas are well-protected, and we work with trusted local partners who follow strict safety protocols. Our guides are trained in safety procedures and emergency response.",
          orderIndex: 2,
          isExpanded: false
        }
      ];

      for (const faq of sampleFaqItems) {
        await db.insert(faqItems).values(faq);
      }

      console.log('Sample itinerary data created successfully');
    } catch (error) {
      console.error('Error creating sample itinerary data:', error);
    }
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    const result = await db.select().from(destinations).where(eq(destinations.id, id));
    return result[0];
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    const result = await db.select().from(destinations).where(eq(destinations.slug, slug));
    return result[0];
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const result = await db.insert(destinations).values(destination).returning();
    return result[0];
  }

  async updateDestination(id: number, destination: InsertDestination): Promise<Destination | undefined> {
    const result = await db.update(destinations)
      .set(destination)
      .where(eq(destinations.id, id))
      .returning();
    return result[0];
  }

  async deleteDestination(id: number): Promise<boolean> {
    const result = await db.delete(destinations).where(eq(destinations.id, id));
    return result.rowCount > 0;
  }

  // Tours
  async getTours(): Promise<Tour[]> {
    return await db.select().from(tours);
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const result = await db.select().from(tours).where(eq(tours.id, id));
    return result[0];
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    const result = await db.select().from(tours).where(eq(tours.slug, slug));
    return result[0];
  }

  async getPopularTours(): Promise<Tour[]> {
    return await db.select().from(tours).where(eq(tours.isPopular, true));
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return await db.select().from(tours).where(eq(tours.category, category));
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const result = await db.insert(tours).values(tour).returning();
    return result[0];
  }

  async updateTour(id: number, tour: InsertTour): Promise<Tour | undefined> {
    const result = await db.update(tours)
      .set(tour)
      .where(eq(tours.id, id))
      .returning();
    return result[0];
  }

  async deleteTour(id: number): Promise<boolean> {
    const result = await db.delete(tours).where(eq(tours.id, id));
    return result.rowCount > 0;
  }

  // Travel Tips
  async getTravelTips(): Promise<TravelTip[]> {
    return await db.select().from(travelTips);
  }

  async getTravelTip(id: number): Promise<TravelTip | undefined> {
    const result = await db.select().from(travelTips).where(eq(travelTips.id, id));
    return result[0];
  }

  async getTravelTipsByCategory(category: string): Promise<TravelTip[]> {
    return await db.select().from(travelTips).where(eq(travelTips.category, category));
  }

  async createTravelTip(tip: InsertTravelTip): Promise<TravelTip> {
    const result = await db.insert(travelTips).values(tip).returning();
    return result[0];
  }

  // Planning Resources
  async getPlanningResources(): Promise<PlanningResource[]> {
    return await db.select().from(planningResources);
  }

  async getPlanningResource(id: number): Promise<PlanningResource | undefined> {
    const result = await db.select().from(planningResources).where(eq(planningResources.id, id));
    return result[0];
  }

  async getPlanningResourcesByCategory(category: string): Promise<PlanningResource[]> {
    return await db.select().from(planningResources).where(eq(planningResources.category, category));
  }

  async createPlanningResource(resource: InsertPlanningResource): Promise<PlanningResource> {
    const result = await db.insert(planningResources).values(resource).returning();
    return result[0];
  }

  // Newsletter
  async subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const result = await db.insert(newsletterSubscriptions).values(subscription).returning();
    return result[0];
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions);
  }

  async getMediaItems(): Promise<MediaItem[]> {
    return await db.select().from(mediaItems);
  }

  async getMediaItem(id: number): Promise<MediaItem | undefined> {
    const result = await db.select().from(mediaItems).where(eq(mediaItems.id, id));
    return result[0];
  }

  async createMediaItem(mediaItem: InsertMediaItem): Promise<MediaItem> {
    const result = await db.insert(mediaItems).values(mediaItem).returning();
    return result[0];
  }

  async deleteMediaItem(id: number): Promise<boolean> {
    const result = await db.delete(mediaItems).where(eq(mediaItems.id, id));
    return result.rowCount > 0;
  }

  // Itinerary Builder Methods
  async getItineraryDays(tourId: number): Promise<ItineraryDay[]> {
    try {
      return await db
        .select()
        .from(itineraryDays)
        .where(eq(itineraryDays.tourId, tourId))
        .orderBy(itineraryDays.dayNumber);
    } catch (error) {
      console.error("Error fetching itinerary days:", error);
      return [];
    }
  }

  async createItineraryDay(day: InsertItineraryDay): Promise<ItineraryDay> {
    const [newDay] = await db.insert(itineraryDays).values(day).returning();
    return newDay;
  }

  async updateItineraryDay(id: number, day: InsertItineraryDay): Promise<ItineraryDay | undefined> {
    try {
      const [updatedDay] = await db
        .update(itineraryDays)
        .set({ ...day, updatedAt: new Date() })
        .where(eq(itineraryDays.id, id))
        .returning();
      return updatedDay;
    } catch (error) {
      console.error("Error updating itinerary day:", error);
      return undefined;
    }
  }

  async deleteItineraryDay(id: number): Promise<boolean> {
    try {
      const result = await db.delete(itineraryDays).where(eq(itineraryDays.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting itinerary day:", error);
      return false;
    }
  }

  // Accommodation Options Methods
  async getAccommodationOptions(tourId: number): Promise<AccommodationOption[]> {
    try {
      return await db
        .select()
        .from(accommodationOptions)
        .where(eq(accommodationOptions.tourId, tourId));
    } catch (error) {
      console.error("Error fetching accommodation options:", error);
      return [];
    }
  }

  async createAccommodationOption(option: InsertAccommodationOption): Promise<AccommodationOption> {
    const [newOption] = await db.insert(accommodationOptions).values(option).returning();
    return newOption;
  }

  async updateAccommodationOption(id: number, option: InsertAccommodationOption): Promise<AccommodationOption | undefined> {
    try {
      const [updatedOption] = await db
        .update(accommodationOptions)
        .set(option)
        .where(eq(accommodationOptions.id, id))
        .returning();
      return updatedOption;
    } catch (error) {
      console.error("Error updating accommodation option:", error);
      return undefined;
    }
  }

  async deleteAccommodationOption(id: number): Promise<boolean> {
    try {
      const result = await db.delete(accommodationOptions).where(eq(accommodationOptions.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting accommodation option:", error);
      return false;
    }
  }

  // FAQ Items Methods
  async getFaqItems(tourId?: number): Promise<FaqItem[]> {
    try {
      if (tourId) {
        return await db
          .select()
          .from(faqItems)
          .where(eq(faqItems.tourId, tourId))
          .orderBy(faqItems.orderIndex);
      } else {
        return await db
          .select()
          .from(faqItems)
          .orderBy(faqItems.orderIndex);
      }
    } catch (error) {
      console.error("Error fetching FAQ items:", error);
      return [];
    }
  }

  async createFaqItem(faq: InsertFaqItem): Promise<FaqItem> {
    const [newFaq] = await db.insert(faqItems).values(faq).returning();
    return newFaq;
  }

  async updateFaqItem(id: number, faq: InsertFaqItem): Promise<FaqItem | undefined> {
    try {
      const [updatedFaq] = await db
        .update(faqItems)
        .set(faq)
        .where(eq(faqItems.id, id))
        .returning();
      return updatedFaq;
    } catch (error) {
      console.error("Error updating FAQ item:", error);
      return undefined;
    }
  }

  async deleteFaqItem(id: number): Promise<boolean> {
    try {
      const result = await db.delete(faqItems).where(eq(faqItems.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting FAQ item:", error);
      return false;
    }
  }

  async getBookings(): Promise<Booking[]> {
    try {
      return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  }

  async getBookingByConfirmation(confirmationNumber: string): Promise<Booking | undefined> {
    try {
      const result = await db.select().from(bookings)
        .where(eq(bookings.confirmationNumber, confirmationNumber))
        .limit(1);
      return result[0];
    } catch (error) {
      console.error("Error fetching booking by confirmation:", error);
      return undefined;
    }
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    try {
      const result = await db.insert(bookings).values(booking).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }
}

export const storage = new DbStorage();
