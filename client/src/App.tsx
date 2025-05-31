import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Destinations from "@/pages/destinations";
import DestinationDetail from "@/pages/destination-detail";
import TravelPlanning from "@/pages/travel-planning";
import PlanningResource from "@/pages/planning-resource";
import GettingAround from "@/pages/getting-around";
import Tours from "@/pages/tours";
import Itinerary from "@/pages/itinerary";
import Booking from "@/pages/booking";
import BookingConfirmation from "@/pages/booking-confirmation";
import CultureHistory from "@/pages/culture-history";
import TravelTips from "@/pages/travel-tips";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/destinations/:slug" component={DestinationDetail} />
          <Route path="/travel-planning" component={TravelPlanning} />
          <Route path="/planning/:slug" component={PlanningResource} />
          <Route path="/planning/getting-around" component={GettingAround} />
          <Route path="/tours" component={Tours} />
          <Route path="/tours/:slug" component={Itinerary} />
          <Route path="/booking" component={Booking} />
          <Route path="/booking-confirmation" component={BookingConfirmation} />
          <Route path="/culture-history" component={CultureHistory} />
          <Route path="/travel-tips" component={TravelTips} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
