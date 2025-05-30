import { CheckCircle, Calendar, Users, MapPin, Mail, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function BookingConfirmation() {
  const bookingData = {
    confirmationNumber: "EGY-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    tourName: "7-Day Egypt Highlights",
    departureDate: "March 15, 2025",
    travelers: 2,
    accommodation: "Deluxe",
    totalAmount: 2598,
    guestInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your Egyptian adventure awaits. We've sent confirmation details to your email.</p>
        </div>

        {/* Confirmation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{bookingData.tourName}</h3>
                <Badge variant="secondary" className="mt-1">Confirmed</Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmation Number:</span>
                  <span className="font-mono font-semibold">{bookingData.confirmationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure Date:</span>
                  <span>{bookingData.departureDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers:</span>
                  <span>{bookingData.travelers} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accommodation:</span>
                  <span>{bookingData.accommodation}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid:</span>
                  <span>${bookingData.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}</h3>
                <p className="text-gray-600">Lead Traveler</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{bookingData.guestInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{bookingData.guestInfo.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold mb-2">Check Your Email</h3>
                <p className="text-sm text-gray-600">Detailed itinerary and travel documents have been sent to your email.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Prepare for Travel</h3>
                <p className="text-sm text-gray-600">Review our packing list and travel tips to prepare for your Egyptian adventure.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Stay in Touch</h3>
                <p className="text-sm text-gray-600">Our travel specialists will contact you 30 days before departure.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Download Itinerary
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/tours'}>
            Browse More Tours
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/travel-planning'}>
            Travel Planning Resources
          </Button>
        </div>

        {/* Support Info */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our travel experts are here to assist you with any questions about your upcoming trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1-800-EGYPT (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>support@egypttravel.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}