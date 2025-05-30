import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Destinations table
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  region: text("region").notNull(), // Cairo, Luxor, Aswan, etc.
  imageUrl: text("image_url").notNull(),
  rating: integer("rating").notNull().default(5),
  reviewCount: integer("review_count").notNull().default(0),
  priceFrom: integer("price_from").notNull(), // price per day in USD
  highlights: text("highlights").array().notNull().default([]),
  attractions: text("attractions").array().notNull().default([]),
  bestTimeToVisit: text("best_time_to_visit"),
  transportInfo: text("transport_info"),
  accommodationInfo: text("accommodation_info"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tours table
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  duration: integer("duration").notNull(), // in days
  price: integer("price").notNull(), // in USD
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // Cultural, Adventure, Luxury, Family
  difficulty: text("difficulty").notNull().default("Easy"), // Easy, Medium, Hard
  included: text("included").array().notNull().default([]),
  excluded: text("excluded").array().notNull().default([]),
  itinerary: jsonb("itinerary").notNull().default([]), // Array of day-by-day activities
  highlights: text("highlights").array().notNull().default([]),
  destinationIds: integer("destination_ids").array().notNull().default([]),
  rating: integer("rating").notNull().default(5),
  reviewCount: integer("review_count").notNull().default(0),
  isPopular: boolean("is_popular").notNull().default(false),
  isLuxury: boolean("is_luxury").notNull().default(false),
  nextDeparture: text("next_departure"), // Next departure date
  spotsRemaining: integer("spots_remaining").default(0),
  cancellationPolicy: text("cancellation_policy").default("Free cancellation up to 30 days"),
  maxGroupSize: integer("max_group_size").default(16),
  minAge: integer("min_age").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Travel tips table
export const travelTips = pgTable("travel_tips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // Transportation, Money, Language, Safety, etc.
  content: text("content").notNull(),
  shortDescription: text("short_description").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
  tips: text("tips").array().notNull().default([]),
  isEssential: boolean("is_essential").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Planning resources table
export const planningResources = pgTable("planning_resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // Visa, Weather, Packing, Budget, etc.
  content: text("content").notNull(),
  shortDescription: text("short_description").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
  keyPoints: text("key_points").array().notNull().default([]),
  resources: jsonb("resources").notNull().default([]), // Links and additional resources
  isEssential: boolean("is_essential").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// Media items table
export const mediaItems = pgTable("media_items", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  size: integer("size").notNull(), // Size in bytes
  type: text("type").notNull(), // image/jpeg, image/png, etc.
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Itinerary Days table
export const itineraryDays = pgTable("itinerary_days", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id).notNull(),
  dayNumber: integer("day_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dailyProgram: text("daily_program").notNull(), // Detailed daily program description
  activities: text("activities").array().notNull().default([]),
  highlights: text("highlights").array().notNull().default([]),
  meals: text("meals").array().notNull().default([]), // breakfast, lunch, dinner
  accommodation: text("accommodation"),
  transport: text("transport"),
  location: text("location"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Accommodation Options table
export const accommodationOptions = pgTable("accommodation_options", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id).notNull(),
  type: text("type").notNull(), // standard, deluxe, luxury
  name: text("name").notNull(),
  description: text("description"),
  features: text("features").array().notNull().default([]),
  pricePerPerson: integer("price_per_person").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating").default(0),
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// FAQ Items table
export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id),
  category: text("category").notNull().default("general"), // trip-specific, general, egypt-travel
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  orderIndex: integer("order_index").default(0),
  isExpanded: boolean("is_expanded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  confirmationNumber: text("confirmation_number").notNull().unique(),
  tourId: integer("tour_id").references(() => tours.id).notNull(),
  departureDate: text("departure_date").notNull(),
  accommodationType: text("accommodation_type").notNull(),
  travelers: integer("travelers").notNull(),
  totalAmount: integer("total_amount").notNull(), // in cents
  status: text("status").notNull().default("confirmed"), // pending, confirmed, cancelled
  guestFirstName: text("guest_first_name").notNull(),
  guestLastName: text("guest_last_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone").notNull(),
  specialRequests: text("special_requests"),
  paymentId: text("payment_id"), // Stripe payment intent ID
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schemas
export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTravelTipSchema = createInsertSchema(travelTips).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPlanningResourceSchema = createInsertSchema(planningResources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribedAt: true,
});

export const insertMediaItemSchema = createInsertSchema(mediaItems).omit({
  id: true,
  uploadedAt: true,
});

export const insertItineraryDaySchema = createInsertSchema(itineraryDays).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAccommodationOptionSchema = createInsertSchema(accommodationOptions).omit({
  id: true,
  createdAt: true,
});

export const insertFaqItemSchema = createInsertSchema(faqItems).omit({
  id: true,
  createdAt: true,
});

// Types
export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;

export type TravelTip = typeof travelTips.$inferSelect;
export type InsertTravelTip = z.infer<typeof insertTravelTipSchema>;

export type PlanningResource = typeof planningResources.$inferSelect;
export type InsertPlanningResource = z.infer<typeof insertPlanningResourceSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;

export type MediaItem = typeof mediaItems.$inferSelect;
export type InsertMediaItem = z.infer<typeof insertMediaItemSchema>;

export type ItineraryDay = typeof itineraryDays.$inferSelect;
export type InsertItineraryDay = z.infer<typeof insertItineraryDaySchema>;

export type AccommodationOption = typeof accommodationOptions.$inferSelect;
export type InsertAccommodationOption = z.infer<typeof insertAccommodationOptionSchema>;

export type FaqItem = typeof faqItems.$inferSelect;
export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
