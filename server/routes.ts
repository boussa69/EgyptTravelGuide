import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
