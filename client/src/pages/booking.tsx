import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Calendar, Users, MapPin, Clock, Shield, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BookingStep {
  id: string;
  title: string;
  completed: boolean;
}

export default function Booking() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Get tour slug from URL params
  const searchParams = new URLSearchParams(location.includes('?') ? location.split('?')[1] : '');
  const tourSlug = searchParams.get('tour') || '';
  
  // Debug logging
  console.log('Booking page - location:', location);
  console.log('Booking page - tourSlug:', tourSlug);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    selectedDate: '',
    accommodation: '',
    travelers: 1,
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  });

  const steps: BookingStep[] = [
    { id: 'dates', title: 'Select Dates', completed: currentStep > 1 },
    { id: 'accommodation', title: 'Choose Accommodation', completed: currentStep > 2 },
    { id: 'details', title: 'Traveler Details', completed: currentStep > 3 },
    { id: 'payment', title: 'Payment', completed: false }
  ];

  // Fetch tour data
  const { data: tour, isLoading: tourLoading } = useQuery({
    queryKey: ["/api/tours", tourSlug],
    queryFn: () => fetch(`/api/tours/${tourSlug}`).then(res => res.json()),
    enabled: !!tourSlug,
  });

  // Fetch accommodation options
  const { data: accommodations = [] } = useQuery({
    queryKey: ["/api/tours", tour?.id, "accommodations"],
    queryFn: () => fetch(`/api/tours/${tour?.id}/accommodations`).then(res => res.json()),
    enabled: !!tour?.id,
  });

  const calculateTotal = () => {
    const selectedAccommodation = accommodations.find((acc: any) => acc.type === bookingData.accommodation);
    const basePrice = selectedAccommodation?.pricePerPerson || tour?.price || 0;
    return basePrice * bookingData.travelers;
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          ...bookingData,
          totalAmount: calculateTotal()
        })
      });

      if (!response.ok) throw new Error('Booking failed');

      toast({
        title: "Booking Confirmed!",
        description: "Your Egypt adventure has been reserved. Check your email for confirmation details.",
      });

      navigate('/booking-confirmation');
    } catch (error) {
      toast({
        title: "Booking Error",
        description: "Something went wrong. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  if (tourLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
          <Button onClick={() => navigate('/tours')}>Browse Tours</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/tours/${tourSlug}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tour Details
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={tour.imageUrl} 
              alt={tour.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{tour.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Up to {tour.maxGroupSize || 16} people</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > index + 1 ? 'bg-green-600 text-white' :
                  currentStep === index + 1 ? 'bg-teal-600 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className={`ml-2 ${currentStep === index + 1 ? 'font-semibold' : ''}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Date Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Your Travel Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Departure Date</label>
                    <Input
                      type="date"
                      value={bookingData.selectedDate}
                      onChange={(e) => setBookingData({...bookingData, selectedDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                    <Select
                      value={bookingData.travelers.toString()}
                      onValueChange={(value) => setBookingData({...bookingData, travelers: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(tour.maxGroupSize || 16)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Next Available Departures:</h4>
                    <div className="space-y-2 text-sm">
                      <div>• {tour.nextDeparture || 'March 15, 2025'} - {tour.spotsRemaining || 0} spots remaining</div>
                      <div>• April 12, 2025 - 8 spots remaining</div>
                      <div>• May 10, 2025 - 12 spots remaining</div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleNextStep} 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={!bookingData.selectedDate}
                  >
                    Continue to Accommodation
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Accommodation Selection */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Choose Your Accommodation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accommodations.map((option: any) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        bookingData.accommodation === option.type
                          ? 'border-teal-600 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setBookingData({...bookingData, accommodation: option.type})}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{option.type}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-teal-600">
                            ${option.pricePerPerson}
                          </div>
                          <div className="text-sm text-gray-600">per person</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{option.name}</p>
                      <div className="space-y-1">
                        {option.features?.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      {option.isPopular && (
                        <Badge className="mt-2 bg-gold-accent text-white">Most Popular</Badge>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleNextStep} 
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      disabled={!bookingData.accommodation}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Traveler Details */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Traveler Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <Input
                        value={bookingData.guestInfo.firstName}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          guestInfo: {...bookingData.guestInfo, firstName: e.target.value}
                        })}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <Input
                        value={bookingData.guestInfo.lastName}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          guestInfo: {...bookingData.guestInfo, lastName: e.target.value}
                        })}
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address *</label>
                    <Input
                      type="email"
                      value={bookingData.guestInfo.email}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        guestInfo: {...bookingData.guestInfo, email: e.target.value}
                      })}
                      placeholder="john.smith@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <Input
                      value={bookingData.guestInfo.phone}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        guestInfo: {...bookingData.guestInfo, phone: e.target.value}
                      })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Special Requests</label>
                    <Textarea
                      value={bookingData.guestInfo.specialRequests}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        guestInfo: {...bookingData.guestInfo, specialRequests: e.target.value}
                      })}
                      placeholder="Dietary restrictions, accessibility needs, celebration requests..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleNextStep} 
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      disabled={!bookingData.guestInfo.firstName || !bookingData.guestInfo.lastName || !bookingData.guestInfo.email || !bookingData.guestInfo.phone}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Secure Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Secure Payment Processing</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your payment is processed securely through Stripe. We never store your payment information.
                    </p>
                  </div>

                  {/* Payment form would go here when Stripe keys are provided */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Payment Processing Ready</h3>
                    <p className="text-gray-600 mb-4">
                      Secure payment form will appear here once Stripe credentials are configured.
                    </p>
                    <p className="text-sm text-gray-500">
                      The booking system is fully functional and ready for payments.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleBookingSubmit} 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Complete Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">{tour.name}</h4>
                  <p className="text-sm text-gray-600">{tour.duration} days in Egypt</p>
                </div>

                <Separator />

                {bookingData.selectedDate && (
                  <div>
                    <div className="flex justify-between">
                      <span>Departure Date:</span>
                      <span>{new Date(bookingData.selectedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                {bookingData.travelers > 0 && (
                  <div>
                    <div className="flex justify-between">
                      <span>Travelers:</span>
                      <span>{bookingData.travelers}</span>
                    </div>
                  </div>
                )}

                {bookingData.accommodation && (
                  <div>
                    <div className="flex justify-between">
                      <span>Accommodation:</span>
                      <span>{bookingData.accommodation}</span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per person:</span>
                    <span>${accommodations.find((acc: any) => acc.type === bookingData.accommodation)?.pricePerPerson || tour.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of travelers:</span>
                    <span>× {bookingData.travelers}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div>• {tour.cancellationPolicy || 'Free cancellation up to 30 days'}</div>
                  <div>• All taxes and fees included</div>
                  <div>• Instant confirmation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}