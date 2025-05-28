import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-3xl font-bold text-gold-accent font-serif">
                EgyptTravel
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for authentic Egyptian experiences. We've been 
              crafting unforgettable journeys through Egypt's timeless wonders since 2010.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-teal-oasis rounded-lg flex items-center justify-center hover:bg-gold-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-serif">
              Top Destinations
            </h3>
            <ul className="space-y-4">
              {[
                "Cairo & Pyramids",
                "Luxor & Valley of Kings",
                "Aswan & Abu Simbel",
                "Red Sea Resorts",
                "Alexandria",
                "Desert Oases",
              ].map((destination) => (
                <li key={destination}>
                  <Link
                    href="/destinations"
                    className="text-gray-300 hover:text-gold-accent transition-colors"
                  >
                    {destination}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-serif">
              Travel Resources
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Travel Planning Guide", href: "/travel-planning" },
                { name: "Visa Information", href: "/travel-planning" },
                { name: "Best Time to Visit", href: "/travel-planning" },
                { name: "Cultural Etiquette", href: "/culture-history" },
                { name: "Packing Lists", href: "/travel-tips" },
                { name: "Travel Insurance", href: "/travel-tips" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-gold-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-serif">
              Contact & Support
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-gold-accent mr-3">📞</span>
                <span className="text-gray-300">+20 2 1234 5678</span>
              </li>
              <li className="flex items-center">
                <span className="text-gold-accent mr-3">✉️</span>
                <span className="text-gray-300">info@egypttravel.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-accent mr-3 mt-1">📍</span>
                <span className="text-gray-300">
                  123 Tahrir Square<br />
                  Cairo, Egypt
                </span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">24/7 Support</h4>
              <p className="text-gray-300 text-sm">
                Emergency assistance available during your trip
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
            © 2024 EgyptTravel. All rights reserved. Crafted with love for Egyptian adventures.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-gold-accent text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
