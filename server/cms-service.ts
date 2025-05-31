import { Destination, Tour, TravelTip, PlanningResource, Booking, InsertBooking } from '../shared/schema';

export class CMSService {
  private baseUrl: string;
  private apiToken?: string;

  constructor() {
    this.baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    this.apiToken = process.env.STRAPI_API_TOKEN;
  }

  private async fetchFromCMS(endpoint: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(`${this.baseUrl}/api/${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getDestinations(): Promise<Destination[]> {
    try {
      const data = await this.fetchFromCMS('destinations?populate=*');
      return data.data.map(this.transformDestination);
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  async getTours(): Promise<Tour[]> {
    try {
      const data = await this.fetchFromCMS('tours?populate=*');
      return data.data.map(this.transformTour);
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  async getTravelTips(): Promise<TravelTip[]> {
    try {
      const data = await this.fetchFromCMS('travel-tips?populate=*');
      return data.data.map(this.transformTravelTip);
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  async getPlanningResources(): Promise<PlanningResource[]> {
    try {
      const data = await this.fetchFromCMS('planning-resources?populate=*');
      return data.data.map(this.transformPlanningResource);
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    try {
      const response = await fetch(`${this.baseUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiToken && { 'Authorization': `Bearer ${this.apiToken}` }),
        },
        body: JSON.stringify({
          data: {
            confirmationNumber: booking.confirmationNumber,
            tourId: booking.tourId,
            tourName: booking.tourName,
            startDate: booking.startDate,
            endDate: booking.endDate,
            accommodationType: booking.accommodationType,
            numberOfTravelers: booking.numberOfTravelers,
            travelerDetails: booking.travelerDetails,
            contactEmail: booking.contactEmail,
            contactPhone: booking.contactPhone,
            totalPrice: booking.totalPrice,
            paymentStatus: booking.paymentStatus || 'pending',
            paymentIntentId: booking.paymentIntentId,
            bookingStatus: booking.bookingStatus || 'pending',
            specialRequests: booking.specialRequests,
            emergencyContact: booking.emergencyContact,
            travelInsurance: booking.travelInsurance || false,
            dietaryRequirements: booking.dietaryRequirements,
            source: booking.source || 'website',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformBooking(data.data);
    } catch (error) {
      console.warn('CMS unavailable for booking creation, falling back to database');
      throw error;
    }
  }

  async getBookingByConfirmation(confirmationNumber: string): Promise<Booking | undefined> {
    try {
      const data = await this.fetchFromCMS(`bookings?filters[confirmationNumber][$eq]=${confirmationNumber}&populate=*`);
      return data.data.length > 0 ? this.transformBooking(data.data[0]) : undefined;
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  async getBookings(): Promise<Booking[]> {
    try {
      const data = await this.fetchFromCMS('bookings?populate=*&sort=createdAt:desc');
      return data.data.map(this.transformBooking);
    } catch (error) {
      console.warn('CMS unavailable, falling back to database');
      throw error;
    }
  }

  private transformDestination(strapiData: any): Destination {
    const attrs = strapiData.attributes;
    return {
      id: strapiData.id,
      name: attrs.name,
      slug: attrs.slug,
      description: attrs.description,
      shortDescription: attrs.shortDescription,
      region: attrs.region,
      imageUrl: attrs.imageUrl || attrs.featuredImage?.data?.attributes?.url || '',
      rating: attrs.rating,
      reviewCount: attrs.reviewCount,
      priceFrom: attrs.priceFrom,
      highlights: attrs.highlights || [],
      attractions: attrs.attractions || [],
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
    };
  }

  private transformTour(strapiData: any): Tour {
    const attrs = strapiData.attributes;
    return {
      id: strapiData.id,
      name: attrs.name,
      slug: attrs.slug,
      description: attrs.description,
      shortDescription: attrs.shortDescription,
      duration: attrs.duration,
      category: attrs.category,
      imageUrl: attrs.imageUrl || attrs.images?.data?.[0]?.attributes?.url || '',
      price: attrs.price,
      originalPrice: attrs.originalPrice,
      rating: attrs.rating,
      reviewCount: attrs.reviewCount,
      highlights: attrs.highlights || [],
      inclusions: attrs.inclusions || [],
      exclusions: attrs.exclusions || [],
      itinerary: attrs.itinerary || [],
      isPopular: attrs.isPopular || false,
      isFeatured: attrs.isFeatured || false,
      maxGroupSize: attrs.maxGroupSize || 12,
      difficulty: attrs.difficulty || 'easy',
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
    };
  }

  private transformTravelTip(strapiData: any): TravelTip {
    const attrs = strapiData.attributes;
    return {
      id: strapiData.id,
      title: attrs.title,
      slug: attrs.slug,
      content: attrs.content,
      excerpt: attrs.excerpt,
      category: attrs.category,
      readTime: attrs.readTime,
      tags: attrs.tags || [],
      isPopular: attrs.isPopular || false,
      priority: attrs.priority || 5,
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
    };
  }

  private transformPlanningResource(strapiData: any): PlanningResource {
    const attrs = strapiData.attributes;
    return {
      id: strapiData.id,
      title: attrs.title,
      slug: attrs.slug,
      content: attrs.content,
      shortDescription: attrs.excerpt || '',
      category: attrs.category,
      icon: attrs.icon || '',
      isEssential: attrs.isEssential || false,
      keyPoints: [],
      resources: {},
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
    };
  }

  private transformBooking(strapiData: any): Booking {
    const attrs = strapiData.attributes;
    return {
      id: strapiData.id,
      confirmationNumber: attrs.confirmationNumber,
      tourId: attrs.tourId,
      tourName: attrs.tourName,
      startDate: new Date(attrs.startDate),
      endDate: new Date(attrs.endDate),
      accommodationType: attrs.accommodationType,
      numberOfTravelers: attrs.numberOfTravelers,
      travelerDetails: attrs.travelerDetails,
      contactEmail: attrs.contactEmail,
      contactPhone: attrs.contactPhone,
      totalPrice: attrs.totalPrice,
      paymentStatus: attrs.paymentStatus,
      paymentIntentId: attrs.paymentIntentId,
      bookingStatus: attrs.bookingStatus,
      specialRequests: attrs.specialRequests,
      emergencyContact: attrs.emergencyContact,
      travelInsurance: attrs.travelInsurance || false,
      dietaryRequirements: attrs.dietaryRequirements,
      source: attrs.source || 'website',
      createdAt: new Date(attrs.createdAt),
      updatedAt: new Date(attrs.updatedAt),
    };
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/destinations?pagination[limit]=1`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const cmsService = new CMSService();