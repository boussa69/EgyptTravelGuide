import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { museumStorage } from "./museums-storage";
import { insertNewsletterSubscriptionSchema, insertDestinationSchema, insertTourSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:slug", async (req, res) => {
    try {
      const destination = await storage.getDestinationBySlug(req.params.slug);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Tours routes
  app.get("/api/tours", async (req, res) => {
    try {
      const { category, popular } = req.query;
      
      let tours;
      if (popular === "true") {
        tours = await storage.getPopularTours();
      } else if (category) {
        tours = await storage.getToursByCategory(category as string);
      } else {
        tours = await storage.getTours();
      }
      
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  app.get("/api/tours/:slug", async (req, res) => {
    try {
      const tour = await storage.getTourBySlug(req.params.slug);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour" });
    }
  });

  // Travel tips routes
  app.get("/api/travel-tips", async (req, res) => {
    try {
      const { category } = req.query;
      
      let tips;
      if (category) {
        tips = await storage.getTravelTipsByCategory(category as string);
      } else {
        tips = await storage.getTravelTips();
      }
      
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel tips" });
    }
  });

  // Planning resources routes
  app.get("/api/planning-resources", async (req, res) => {
    try {
      const { category } = req.query;
      
      let resources;
      if (category) {
        resources = await storage.getPlanningResourcesByCategory(category as string);
      } else {
        resources = await storage.getPlanningResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch planning resources" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ 
        message: "Successfully subscribed to newsletter",
        subscription: { email: subscription.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid email address",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Search endpoints
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }

      const query = q.toLowerCase();
      
      // Search destinations
      const destinations = await storage.getDestinations();
      const matchingDestinations = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query) ||
        dest.region.toLowerCase().includes(query)
      );

      // Search tours
      const tours = await storage.getTours();
      const matchingTours = tours.filter(tour => 
        tour.name.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query) ||
        tour.category.toLowerCase().includes(query)
      );

      res.json({
        destinations: matchingDestinations,
        tours: matchingTours,
        totalResults: matchingDestinations.length + matchingTours.length
      });
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Admin CRUD endpoints for destinations
  app.post("/api/destinations", async (req, res) => {
    try {
      console.log("Received destination data:", req.body);
      const destination = req.body;
      console.log("Creating destination:", destination);
      const newDestination = await storage.createDestination(destination);
      console.log("Created destination:", newDestination);
      res.status(201).json(newDestination);
    } catch (error) {
      console.error("Create destination error:", error);
      res.status(400).json({ error: "Failed to create destination" });
    }
  });

  app.put("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const destination = req.body;
      const updatedDestination = await storage.updateDestination(id, destination);
      if (!updatedDestination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(updatedDestination);
    } catch (error) {
      console.error("Update destination error:", error);
      res.status(400).json({ error: "Failed to update destination" });
    }
  });

  app.delete("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDestination(id);
      if (!success) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json({ message: "Destination deleted successfully" });
    } catch (error) {
      console.error("Delete destination error:", error);
      res.status(400).json({ error: "Failed to delete destination" });
    }
  });

  // Admin CRUD endpoints for tours
  app.post("/api/tours", async (req, res) => {
    try {
      const tour = insertTourSchema.parse(req.body);
      const newTour = await storage.createTour(tour);
      res.status(201).json(newTour);
    } catch (error) {
      console.error("Create tour error:", error);
      res.status(400).json({ error: "Failed to create tour" });
    }
  });

  app.put("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tour = req.body;
      const updatedTour = await storage.updateTour(id, tour);
      if (!updatedTour) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.json(updatedTour);
    } catch (error) {
      console.error("Update tour error:", error);
      res.status(400).json({ error: "Failed to update tour" });
    }
  });

  app.delete("/api/tours/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTour(id);
      if (!success) {
        return res.status(404).json({ error: "Tour not found" });
      }
      res.json({ message: "Tour deleted successfully" });
    } catch (error) {
      console.error("Delete tour error:", error);
      res.status(400).json({ error: "Failed to delete tour" });
    }
  });

  // Media endpoints
  app.get("/api/media", async (req, res) => {
    try {
      const mediaItems = await storage.getMediaItems();
      res.json(mediaItems);
    } catch (error) {
      console.error("Get media error:", error);
      res.status(500).json({ error: "Failed to get media items" });
    }
  });

  app.post("/api/media", async (req, res) => {
    try {
      const mediaItem = req.body;
      const result = await storage.createMediaItem(mediaItem);
      res.status(201).json(result);
    } catch (error) {
      console.error("Create media error:", error);
      res.status(400).json({ error: "Failed to create media item" });
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMediaItem(id);
      if (!success) {
        return res.status(404).json({ error: "Media item not found" });
      }
      res.json({ message: "Media item deleted successfully" });
    } catch (error) {
      console.error("Delete media error:", error);
      res.status(500).json({ error: "Failed to delete media item" });
    }
  });

  // Itinerary Builder Routes
  app.get("/api/tours/:tourId/itinerary", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      const days = await storage.getItineraryDays(tourId);
      res.json(days);
    } catch (error: any) {
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tours/:tourId/itinerary", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      const dayData = { ...req.body, tourId };
      const newDay = await storage.createItineraryDay(dayData);
      res.json(newDay);
    } catch (error: any) {
      console.error("Error creating itinerary day:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedDay = await storage.updateItineraryDay(id, req.body);
      if (updatedDay) {
        res.json(updatedDay);
      } else {
        res.status(404).json({ error: "Itinerary day not found" });
      }
    } catch (error: any) {
      console.error("Error updating itinerary day:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteItineraryDay(id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Itinerary day not found" });
      }
    } catch (error: any) {
      console.error("Error deleting itinerary day:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Accommodation Options Routes
  app.get("/api/tours/:tourId/accommodations", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      const options = await storage.getAccommodationOptions(tourId);
      res.json(options);
    } catch (error: any) {
      console.error("Error fetching accommodation options:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tours/:tourId/accommodations", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      const optionData = { ...req.body, tourId };
      const newOption = await storage.createAccommodationOption(optionData);
      res.json(newOption);
    } catch (error: any) {
      console.error("Error creating accommodation option:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // FAQ Routes
  app.get("/api/tours/:tourId/faqs", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      const faqs = await storage.getFaqItems(tourId);
      res.json(faqs);
    } catch (error: any) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqItems();
      res.json(faqs);
    } catch (error: any) {
      console.error("Error fetching general FAQs:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const newFaq = await storage.createFaqItem(req.body);
      res.json(newFaq);
    } catch (error: any) {
      console.error("Error creating FAQ:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // Itinerary Builder - Create sample data
  app.post("/api/tours/:tourId/create-sample-itinerary", async (req, res) => {
    try {
      const tourId = parseInt(req.params.tourId);
      
      // Sample itinerary days
      const sampleDays = [
        {
          tourId,
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
          tourId,
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
          tourId,
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

      // Create sample accommodation options
      const sampleAccommodations = [
        {
          tourId,
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
          tourId,
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
          tourId,
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

      // Create sample FAQs
      const sampleFAQs = [
        {
          tourId,
          category: "trip-specific",
          question: "What's included in this tour?",
          answer: "The tour includes all accommodation, daily breakfast, guided tours with expert Egyptologists, entrance fees to all mentioned sites, airport transfers, and transportation in air-conditioned vehicles. International flights are not included.",
          orderIndex: 1,
          isExpanded: true
        },
        {
          tourId,
          category: "trip-specific",
          question: "Is this tour suitable for families with children?",
          answer: "Yes! This tour is family-friendly and suitable for children aged 8 and above. We provide engaging explanations that captivate young minds, and the itinerary includes manageable walking distances with rest breaks.",
          orderIndex: 2,
          isExpanded: true
        },
        {
          tourId,
          category: "trip-specific",
          question: "What should I pack for this tour?",
          answer: "Pack light, breathable clothing, comfortable walking shoes, sun protection (hat, sunscreen, sunglasses), modest attire for religious sites, and a light jacket for evening Nile cruise. Don't forget your camera and power bank!",
          orderIndex: 3,
          isExpanded: false
        }
      ];

      // Create the data
      const createdDays = [];
      for (const day of sampleDays) {
        const newDay = await storage.createItineraryDay(day);
        createdDays.push(newDay);
      }

      const createdAccommodations = [];
      for (const accommodation of sampleAccommodations) {
        const newAccommodation = await storage.createAccommodationOption(accommodation);
        createdAccommodations.push(newAccommodation);
      }

      const createdFAQs = [];
      for (const faq of sampleFAQs) {
        const newFAQ = await storage.createFaqItem(faq);
        createdFAQs.push(newFAQ);
      }

      res.json({
        message: "Sample itinerary data created successfully",
        data: {
          days: createdDays,
          accommodations: createdAccommodations,
          faqs: createdFAQs
        }
      });
    } catch (error: any) {
      console.error("Error creating sample itinerary:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // Chatbot endpoint
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get current travel data for context
      const destinations = await storage.getDestinations();
      const tours = await storage.getTours();
      const travelTips = await storage.getTravelTips();
      const planningResources = await storage.getPlanningResources();

      const systemPrompt = `You are an expert Egypt travel companion with deep knowledge of Egyptian culture, history, and travel. You help travelers plan their perfect Egyptian adventure.

CONTEXT - Current available data:
Destinations: ${destinations.map(d => `${d.name} (${d.region}) - ${d.description.substring(0, 100)}...`).join('; ')}

Tours: ${tours.map(t => `${t.name} (${t.duration}) - ${t.price} - ${t.description.substring(0, 100)}...`).join('; ')}

Travel Tips: ${travelTips.map(t => `${t.title} - ${t.shortDescription}`).join('; ')}

Planning Resources: ${planningResources.map(p => `${p.title} - ${p.shortDescription}`).join('; ')}

INSTRUCTIONS:
- Provide authentic, helpful information about Egypt travel
- Use the available destination and tour data when relevant
- Give practical advice for travel planning
- Share cultural insights and etiquette tips
- Recommend specific destinations and tours from the available data
- Be conversational but informative
- Focus on Egypt-specific knowledge
- If asked about places not in the data, provide general Egypt travel advice
- Keep responses concise but comprehensive
- Use friendly, encouraging tone`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request right now. Please try again.";

      res.json({ response });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ error: "Failed to get response from travel assistant" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = {
        ...req.body,
        confirmationNumber: "EGY-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      };
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/bookings/:confirmationNumber", async (req, res) => {
    try {
      const booking = await storage.getBookingByConfirmation(req.params.confirmationNumber);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Museums API routes
  app.get("/api/museums", async (req, res) => {
    try {
      const museums = await museumStorage.getAll();
      res.json(museums);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch museums" });
    }
  });

  app.get("/api/museums/featured", async (req, res) => {
    try {
      const museums = await museumStorage.getFeatured();
      res.json(museums);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured museums" });
    }
  });

  app.get("/api/museums/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const museums = await museumStorage.getByCategory(category);
      res.json(museums);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch museums by category" });
    }
  });

  app.get("/api/museums/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const museum = await museumStorage.getById(id);
      if (!museum) {
        return res.status(404).json({ message: "Museum not found" });
      }
      res.json(museum);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch museum" });
    }
  });

  app.get("/api/museums/slug/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const museum = await museumStorage.getBySlug(slug);
      if (!museum) {
        return res.status(404).json({ message: "Museum not found" });
      }
      res.json(museum);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch museum" });
    }
  });

  app.post("/api/museums", async (req, res) => {
    try {
      const museum = await museumStorage.create(req.body);
      res.status(201).json(museum);
    } catch (error) {
      res.status(500).json({ message: "Failed to create museum" });
    }
  });

  app.put("/api/museums/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const museum = await museumStorage.update(id, req.body);
      if (!museum) {
        return res.status(404).json({ message: "Museum not found" });
      }
      res.json(museum);
    } catch (error) {
      res.status(500).json({ message: "Failed to update museum" });
    }
  });

  app.delete("/api/museums/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await museumStorage.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Museum not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete museum" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
