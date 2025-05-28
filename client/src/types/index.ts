export type {
  Destination,
  Tour,
  TravelTip,
  PlanningResource,
  NewsletterSubscription
} from "@shared/schema";

export interface SearchResults {
  destinations: Destination[];
  tours: Tour[];
  totalResults: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

export interface HeroSearchForm {
  destination: string;
  duration: string;
  travelStyle: string;
}
