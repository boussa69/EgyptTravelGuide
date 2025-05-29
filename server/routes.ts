import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  const httpServer = createServer(app);
  return httpServer;
}
