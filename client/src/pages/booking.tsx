import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, MapPin, CreditCard, CheckCircle, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function Booking() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get tour slug from URL or default to first tour
  const [tourSlug, setTourSlug] = useState<string>('7-day-egypt-highlights');
  const [currentStep, setCurrentStep] = useState(1);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tourParam = urlParams.get('tour');
    if (tourParam) {
      setTourSlug(tourParam);
    }
  }, []);

  // Booking form data
  const [bookingData, setBookingData] = useState({
    selectedDate: '',
    accommodation: '',
    travelers: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  // Fetch tour data
  const { data: tour, isLoading: tourLoading } = useQuery({
    queryKey: ['/api/tours', tourSlug],
    enabled: !!tourSlug,
  });

  // Fetch accommodations
  const { data: accommodations = [] } = useQuery({
    queryKey: ['/api/tours', tour?.id, 'accommodations'],
    enabled: !!tour?.id,
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/bookings', data);
      return response.json();
    },
    onSuccess: (data) => {
      navigate(`/booking-confirmation?confirmation=${data.confirmationNumber}`);
      toast({
        title: "Booking Confirmed!",
        description: `Your confirmation number is ${data.confirmationNumber}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleBookingSubmit = async () => {
    if (!tour) return;

    const selectedAccommodation = accommodations.find(acc => acc.type === bookingData.accommodation);
    const totalPrice = (tour.basePrice + (selectedAccommodation?.pricePerPerson || 0)) * bookingData.travelers;

    const bookingPayload = {
      tourId: tour.id,
      tourName: tour.name,
      departureDate: bookingData.selectedDate,
      accommodation: bookingData.accommodation,
      numberOfTravelers: bookingData.travelers,
      totalPrice,
      customerName: `${bookingData.firstName} ${bookingData.lastName}`,
      customerEmail: bookingData.email,
      customerPhone: bookingData.phone,
      specialRequests: bookingData.specialRequests,
      emergencyContact: bookingData.emergencyContact,
      emergencyPhone: bookingData.emergencyPhone,
      status: 'confirmed'
    };

    createBookingMutation.mutate(bookingPayload);
  };

  const updateBookingData = (field: string, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
        <Button onClick={() => navigate('/tours')}>Back to Tours</Button>
      </div>
    );
  }

  const selectedAccommodation = accommodations.find(acc => acc.type === bookingData.accommodation);
  const totalPrice = (tour.basePrice + (selectedAccommodation?.pricePerPerson || 0)) * bookingData.travelers;

  const steps = [
    { id: 1, title: 'Select Date', icon: Calendar },
    { id: 2, title: 'Choose Accommodation', icon: MapPin },
    { id: 3, title: 'Traveler Details', icon: Users },
    { id: 4, title: 'Confirm & Pay', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Egypt Adventure</h1>
          <p className="text-gray-600">{tour.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted ? 'bg-teal-600 text-white' :
                    isActive ? 'bg-teal-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-teal-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-px mx-4 ${
                      currentStep > step.id ? 'bg-teal-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Step 1: Select Date */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Your Departure Date</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Departure Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.selectedDate}
                        onChange={(e) => updateBookingData('selectedDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Select value={bookingData.travelers.toString()} onValueChange={(value) => updateBookingData('travelers', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!bookingData.selectedDate}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Choose Accommodation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Choose Your Accommodation</h3>
                  <div className="grid gap-4">
                    {accommodations.map((accommodation) => (
                      <div
                        key={accommodation.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          bookingData.accommodation === accommodation.type
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                        onClick={() => updateBookingData('accommodation', accommodation.type)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{accommodation.type}</h4>
                            <p className="text-sm text-gray-600 mt-1">{accommodation.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">+${accommodation.pricePerPerson}/person</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!bookingData.accommodation}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Traveler Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Traveler Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={bookingData.firstName}
                        onChange={(e) => updateBookingData('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={bookingData.lastName}
                        onChange={(e) => updateBookingData('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => updateBookingData('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => updateBookingData('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={bookingData.emergencyContact}
                        onChange={(e) => updateBookingData('emergencyContact', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={bookingData.emergencyPhone}
                        onChange={(e) => updateBookingData('emergencyPhone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={(e) => updateBookingData('specialRequests', e.target.value)}
                      placeholder="Dietary restrictions, accessibility needs, etc."
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(4)}
                    disabled={!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirm & Pay */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Tour:</span>
                      <span className="font-medium">{tour.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{bookingData.selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation:</span>
                      <span className="font-medium">{bookingData.accommodation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travelers:</span>
                      <span className="font-medium">{bookingData.travelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer:</span>
                      <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price:</span>
                        <span className="text-teal-600">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={handleBookingSubmit}
                    disabled={createBookingMutation.isPending}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {createBookingMutation.isPending ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}