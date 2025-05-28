import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { newsletterApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: (email: string) => newsletterApi.subscribe({ email, isActive: true }),
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our comprehensive Egypt travel guide and exclusive tips.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section className="py-20 bg-teal-oasis">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
          Ready for Your Egyptian Adventure?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Get exclusive travel insights, expert tips, and early access to our latest tour packages.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 border-0 focus:ring-2 focus:ring-gold-accent text-gray-900"
              required
            />
            <Button 
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-gold-accent text-white px-8 py-4 font-semibold hover:bg-accent-coral transition-colors whitespace-nowrap"
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Get Travel Guide"}
            </Button>
          </form>
          <p className="text-white/70 text-sm mt-4">
            Free comprehensive Egypt travel guide + exclusive tips from our local experts
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-teal-oasis px-8 py-4 text-lg font-semibold hover:bg-champagne-sand transition-colors"
          >
            Start Planning Your Trip
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-teal-oasis transition-colors"
          >
            Speak with Expert
          </Button>
        </div>
      </div>
    </section>
  );
}
