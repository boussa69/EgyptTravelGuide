import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Thermometer, Users, Camera, AlertTriangle, Plane, CreditCard, FileText, MapPin, CheckCircle2, Clock, Globe, Package, Shirt, Sun, Shield, Heart, MessageCircle, Eye, HandHeart, DollarSign, Calculator, TrendingDown, AlertCircle, Phone, Cross, FileSearch, Smartphone, Wifi, MessageSquare, Settings, Star, Syringe, Activity, Pill, Plus, ShoppingBag, Store, Gem, Coins, TrendingUp, Tag, Baby, GraduationCap, Home, Utensils, Car, Zap, UserCheck, Lock, Navigation, Lightbulb } from "lucide-react";
import { Link } from "wouter";

const planningData = {
  "best-time-to-visit": {
    title: "Best Time to Visit Egypt",
    description: "Discover the optimal seasons for your Egyptian adventure",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt's desert climate offers year-round sunshine, but timing your visit can make the difference between a comfortable journey and an exhausting one. Here's everything you need to know about Egypt's seasons.",
      seasons: [
        {
          season: "Peak Season (October - April)",
          temperature: "15°C - 25°C (59°F - 77°F)",
          description: "Perfect weather with comfortable temperatures and minimal rainfall. Ideal for sightseeing, outdoor activities, and temple exploration.",
          pros: ["Comfortable temperatures", "Clear skies", "Perfect for photography", "Ideal for outdoor activities"],
          cons: ["Higher prices", "Crowded attractions", "Book accommodations early"],
          activities: ["Temple visits", "Desert safaris", "Nile cruises", "Pyramid exploration"]
        },
        {
          season: "Hot Season (May - September)",
          temperature: "25°C - 40°C (77°F - 104°F)",
          description: "Extremely hot and dry conditions, especially in southern Egypt. Budget-friendly but challenging for extended outdoor activities.",
          pros: ["Lower prices", "Fewer crowds", "Great deals on tours", "Empty attractions"],
          cons: ["Extreme heat", "Limited outdoor time", "Uncomfortable midday", "Higher dehydration risk"],
          activities: ["Early morning visits", "Indoor museums", "Air-conditioned tours", "Red Sea activities"]
        }
      ],
      monthlyGuide: [
        { month: "January", temp: "15-22°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "February", temp: "16-24°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "March", temp: "18-26°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "April", temp: "22-30°C", rainfall: "Very Low", crowd: "Medium", rating: "Very Good" },
        { month: "May", temp: "25-35°C", rainfall: "Very Low", crowd: "Low", rating: "Good" },
        { month: "June", temp: "28-38°C", rainfall: "None", crowd: "Very Low", rating: "Fair" },
        { month: "July", temp: "30-40°C", rainfall: "None", crowd: "Very Low", rating: "Poor" },
        { month: "August", temp: "30-40°C", rainfall: "None", crowd: "Very Low", rating: "Poor" },
        { month: "September", temp: "28-36°C", rainfall: "Very Low", crowd: "Low", rating: "Fair" },
        { month: "October", temp: "25-32°C", rainfall: "Low", crowd: "Medium", rating: "Very Good" },
        { month: "November", temp: "20-28°C", rainfall: "Low", crowd: "High", rating: "Excellent" },
        { month: "December", temp: "16-24°C", rainfall: "Low", crowd: "High", rating: "Excellent" }
      ],
      specialEvents: [
        { event: "Abu Simbel Sun Festival", dates: "Feb 22 & Oct 22", description: "Sunlight illuminates the inner sanctuary of Abu Simbel temple" },
        { event: "Ramadan", dates: "Varies yearly", description: "Islamic holy month - reduced hours for some attractions" },
        { event: "Coptic Christmas", dates: "January 7", description: "Major Christian celebration in Egypt" }
      ]
    }
  },
  "visa-entry": {
    title: "Visa & Entry Requirements",
    description: "Complete guide to entering Egypt - visa options, requirements, and entry procedures",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers multiple visa options for tourists, making entry relatively straightforward for most nationalities. Choose the option that best suits your travel plans and nationality.",
      visaTypes: [
        {
          type: "Visa on Arrival",
          price: "$25 USD",
          duration: "30 days (single entry)",
          processing: "Immediate at airport",
          description: "The most convenient option for eligible nationalities. Available at Cairo, Hurghada, Luxor, Aswan, and Sharm El Sheikh airports.",
          requirements: ["Valid passport (minimum 6 months validity)", "Return or onward ticket", "Proof of accommodation", "Cash payment in USD"],
          countries: ["USA", "Canada", "Australia", "EU countries", "UK", "Japan", "South Korea", "and 40+ other countries"],
          pros: ["No advance planning needed", "Immediate processing", "Available at major airports"],
          cons: ["Cash payment only", "Limited to certain airports", "Longer queues possible"],
          bestFor: "Last-minute travelers and short visits"
        },
        {
          type: "e-Visa (Online)",
          price: "$25 USD + $3 service fee",
          duration: "30 days (single entry) or 90 days (multiple entry)",
          processing: "3-7 business days",
          description: "Apply online before travel. Recommended for smoother entry process and advance planning.",
          requirements: ["Valid passport scan", "Digital passport photo", "Credit/debit card payment", "Email address"],
          countries: ["Available for 70+ nationalities"],
          pros: ["Apply from home", "Faster airport processing", "Multiple entry options", "Digital receipt"],
          cons: ["Advance planning required", "Processing time needed", "Service fees"],
          bestFor: "Planned trips and multiple entries"
        },
        {
          type: "Embassy Visa",
          price: "Varies by country ($25-60)",
          duration: "30-90 days (single/multiple entry)",
          processing: "5-15 business days",
          description: "Traditional visa application through Egyptian consulates. Required for some nationalities.",
          requirements: ["Passport with 6+ months validity", "Completed application form", "Passport photos", "Proof of funds", "Travel insurance"],
          countries: ["Required for some African and Asian countries"],
          pros: ["Guaranteed approval if eligible", "Longer validity options", "Official documentation"],
          cons: ["Longest processing time", "In-person visit required", "Higher cost"],
          bestFor: "Long-term stays and restricted nationalities"
        }
      ],
      entryProcedure: [
        {
          step: "Arrival at Airport",
          tasks: ["Present passport and visa", "Complete arrival card", "Immigration checkpoint", "Collect luggage"]
        },
        {
          step: "Customs Declaration",
          tasks: ["Declare valuable items", "Red/Green channel selection", "Baggage inspection if required", "Exit airport"]
        }
      ],
      importantNotes: [
        { note: "Passport Validity", details: "Must be valid for at least 6 months from entry date" },
        { note: "Return Ticket", details: "Proof of onward travel may be required" },
        { note: "Hotel Booking", details: "Accommodation confirmation recommended" },
        { note: "Cash Requirements", details: "USD cash needed for visa on arrival" }
      ],
      tips: [
        "Check your nationality's specific requirements before travel",
        "Apply for e-visa if you want to avoid airport queues",
        "Keep all travel documents easily accessible",
        "Have backup payment method for visa fees",
        "Register with your embassy after arrival for long stays"
      ]
    }
  },
  "cultural-etiquette": {
    title: "Cultural Etiquette & Customs",
    description: "Navigate Egyptian culture with respect and understanding",
    category: "Cultural",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Understanding Egyptian culture enhances your travel experience and shows respect for local traditions. Egypt blends ancient heritage with Islamic customs and modern influences.",
      religiousEtiquette: [
        {
          context: "Mosque Visits",
          guidelines: [
            "Remove shoes before entering",
            "Dress modestly - long pants/skirts, covered shoulders",
            "Women should cover hair with scarf",
            "Respect prayer times and worshippers",
            "No photography during prayers",
            "Speak quietly and move respectfully"
          ]
        },
        {
          context: "Ramadan Considerations",
          guidelines: [
            "Respect fasting hours (sunrise to sunset)",
            "Avoid eating/drinking in public during daylight",
            "Reduced business hours during Ramadan",
            "Be patient with altered schedules",
            "Join iftar celebrations if invited",
            "Show understanding for cultural observances"
          ]
        }
      ],
      socialCustoms: [
        {
          situation: "Greetings",
          appropriate: ["Handshakes for same gender", "Saying 'As-salamu alaykum' (peace be upon you)", "Asking about family and health"],
          avoid: ["Physical contact with opposite gender unless offered", "Using left hand for greetings", "Rushing social interactions"]
        },
        {
          situation: "Hospitality",
          appropriate: ["Accept tea/coffee when offered", "Compliment the host's home/family", "Bring small gifts if visiting homes", "Show appreciation for local food"],
          avoid: ["Refusing hospitality outright", "Pointing feet toward others", "Showing soles of shoes", "Eating with left hand"]
        },
        {
          situation: "Conversation",
          appropriate: ["Ask about family and work", "Show interest in Egyptian history", "Discuss travel experiences", "Praise Egyptian cuisine"],
          avoid: ["Political discussions", "Criticism of government", "Religious debates", "Personal relationships"]
        }
      ],
      dressingGuidelines: [
        {
          context: "General Guidelines",
          men: ["Long pants preferred", "Shirts with sleeves", "Closed shoes for religious sites", "Conservative swimwear at beaches"],
          women: ["Cover shoulders and knees", "Loose-fitting clothing", "Scarf for mosque visits", "Modest swimwear recommended"],
          universal: ["Remove shoes when entering homes", "Dress up for nice restaurants", "Comfortable walking shoes", "Sun protection essential"]
        },
        {
          context: "Religious Sites",
          men: ["Long pants required", "Covered shoulders", "Remove hats inside", "Quiet, respectful behavior"],
          women: ["Full coverage required", "Head covering with scarf", "No tight-fitting clothes", "Modest colors preferred"],
          universal: ["No revealing clothing", "Remove shoes where required", "No inappropriate displays of affection", "Photography restrictions apply"]
        }
      ],
      culturalSensitivities: [
        {
          topic: "Political Topics",
          guidance: "Avoid discussing politics, especially criticism of the government",
          reason: "Political discussions can be sensitive and potentially dangerous"
        },
        {
          topic: "Religious Discussions",
          guidance: "Respect Islamic beliefs even if you don't share them",
          reason: "Religion is central to daily life for most Egyptians"
        },
        {
          topic: "Historical Perspectives",
          guidance: "Be respectful when discussing ancient Egyptian heritage",
          reason: "Egyptians are proud of their pharaonic heritage alongside their Islamic identity"
        },
        {
          topic: "Economic Differences",
          guidance: "Be discrete about wealth and expensive items",
          reason: "Egypt has significant economic disparities"
        }
      ],
      practicalTips: [
        "Tip generously - service workers rely on tips",
        "Friday is the holy day - many businesses close",
        "Ramadan affects daily rhythms - be flexible with schedules",
        "Tea culture is important - accept when offered",
        "Haggling is expected in markets but not in fixed-price stores",
        "Punctuality is less strict than Western standards",
        "Family is central to Egyptian culture - ask about family",
        "Hospitality is legendary - you may be invited to homes"
      ]
    }
  },
  "packing-guide": {
    title: "Essential Packing Guide for Egypt",
    description: "Pack smart for your Egyptian adventure - complete checklist for all seasons",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Packing for Egypt requires balancing comfort, cultural respect, and practical needs. The desert climate, ancient sites, and local customs all influence what you should bring. This comprehensive guide ensures you're prepared for any situation.",
      essentialCategories: [
        {
          category: "Clothing Essentials",
          icon: "Shirt",
          items: [
            { item: "Lightweight, breathable fabrics", description: "Cotton and linen work best in hot climate", essential: true },
            { item: "Long-sleeved shirts", description: "Sun protection and mosque visits", essential: true },
            { item: "Modest pants/long skirts", description: "Cultural respect and comfort", essential: true },
            { item: "Light sweater/jacket", description: "Air conditioning and cooler evenings", essential: true },
            { item: "Comfortable walking shoes", description: "Essential for temple exploration", essential: true },
            { item: "Sandals", description: "Easy to remove for mosque visits", essential: false },
            { item: "Sun hat with wide brim", description: "Crucial sun protection", essential: true },
            { item: "Scarf/shawl", description: "Versatile for sun/modesty/warmth", essential: true }
          ]
        },
        {
          category: "Health & Protection",
          icon: "Shield",
          items: [
            { item: "High SPF sunscreen (50+)", description: "Desert sun is intense year-round", essential: true },
            { item: "Sunglasses (UV protection)", description: "Eye protection from bright sun/sand", essential: true },
            { item: "Insect repellent", description: "Especially near the Nile", essential: true },
            { item: "Personal medications", description: "Bring extra in original containers", essential: true },
            { item: "Hand sanitizer", description: "Hygiene in crowded tourist areas", essential: true },
            { item: "First aid kit", description: "Basic supplies for minor issues", essential: false },
            { item: "Electrolyte packets", description: "Prevent dehydration", essential: true },
            { item: "Lip balm with SPF", description: "Lips burn easily in desert climate", essential: true }
          ]
        },
        {
          category: "Electronics & Gadgets",
          icon: "Smartphone",
          items: [
            { item: "Universal power adapter", description: "Egypt uses Type C and F plugs", essential: true },
            { item: "Portable charger/power bank", description: "Long sightseeing days drain batteries", essential: true },
            { item: "Camera with extra batteries", description: "Capture memories of ancient wonders", essential: false },
            { item: "Headlamp/flashlight", description: "Useful in tombs and temples", essential: false },
            { item: "Waterproof phone case", description: "Protection from sand and water", essential: false },
            { item: "Travel router (optional)", description: "Improve WiFi connectivity", essential: false }
          ]
        },
        {
          category: "Documents & Money",
          icon: "CreditCard",
          items: [
            { item: "Passport (6+ months validity)", description: "Required for entry", essential: true },
            { item: "Visa documentation", description: "Print confirmation if applicable", essential: true },
            { item: "Travel insurance papers", description: "Always recommended", essential: true },
            { item: "Cash (USD for tips)", description: "Small bills for tipping culture", essential: true },
            { item: "Credit/debit cards", description: "Backup payment method", essential: true },
            { item: "Emergency contact info", description: "Embassy and family contacts", essential: true },
            { item: "Copies of important documents", description: "Store separately from originals", essential: true }
          ]
        }
      ],
      seasonalAdvice: [
        {
          season: "Peak Season (Oct-Apr)",
          recommendations: [
            "Layers for temperature changes",
            "Light jacket for air-conditioned spaces",
            "Comfortable walking shoes for long days",
            "Extra camera batteries (cold affects battery life)"
          ]
        },
        {
          season: "Hot Season (May-Sep)",
          recommendations: [
            "Maximum sun protection gear",
            "Cooling towels or bandanas",
            "Extra electrolyte supplements",
            "Minimal dark clothing (absorbs heat)"
          ]
        }
      ],
      packingTips: [
        "Pack light - you can buy basics in Egypt",
        "Leave valuable jewelry at home",
        "Bring more cash than usual for tipping",
        "Pack essentials in carry-on",
        "Consider packing cubes for organization",
        "Bring a small day bag for sightseeing",
        "Pack a reusable water bottle",
        "Include a small Egyptian phrasebook"
      ]
    }
  },
  "budget-planning": {
    title: "Budget Planning for Egypt",
    description: "Plan your Egyptian adventure finances - costs, tips, and money-saving strategies",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers excellent value for money, but understanding local costs and customs helps you budget effectively. From luxury to budget travel, here's everything you need to know about managing money in Egypt.",
      dailyBudgets: [
        {
          category: "Budget Traveler",
          dailyRange: "$25-40 USD",
          accommodation: "$8-15 (hostels, budget hotels)",
          food: "$5-10 (street food, local restaurants)",
          transport: "$3-8 (public transport, shared taxis)",
          attractions: "$5-12 (entrance fees)",
          tips: ["Stay in hostels", "Eat at local restaurants", "Use public transport", "Book attractions directly"]
        },
        {
          category: "Mid-Range Traveler",
          dailyRange: "$50-80 USD",
          accommodation: "$20-40 (3-star hotels, good B&Bs)",
          food: "$15-25 (mix of local and tourist restaurants)",
          transport: "$10-20 (private taxis, some tours)",
          attractions: "$15-25 (guided tours, better access)",
          tips: ["Mix of hotel types", "Try tourist and local restaurants", "Combine transport methods", "Book some guided experiences"]
        },
        {
          category: "Luxury Traveler",
          dailyRange: "$100+ USD",
          accommodation: "$60+ (4-5 star hotels, resorts)",
          food: "$30+ (fine dining, hotel restaurants)",
          transport: "$25+ (private drivers, flight connections)",
          attractions: "$35+ (private guides, exclusive access)",
          tips: ["Stay in top hotels", "Fine dining experiences", "Private transportation", "Exclusive tours and guides"]
        }
      ],
      majorExpenses: [
        { item: "International flights", cost: "$400-1200", notes: "Varies greatly by origin and season" },
        { item: "Nile cruise (3-4 days)", cost: "$200-800", notes: "Luxury vs standard options" },
        { item: "Internal flights", cost: "$50-150", notes: "Cairo-Aswan saves travel time" },
        { item: "Multi-day desert safari", cost: "$100-300", notes: "White Desert, Western Desert tours" },
        { item: "Private guide (full day)", cost: "$40-80", notes: "Essential for major sites" }
      ],
      moneySavingTips: [
        "Visit during shoulder season for lower prices",
        "Book Nile cruises locally for better deals",
        "Eat where locals eat for authentic, cheap meals",
        "Use public transport when possible",
        "Negotiate prices in bazaars and with taxi drivers",
        "Buy a tourist SIM card for data instead of roaming",
        "Group together for shared tour costs",
        "Carry small bills for tipping"
      ],
      tippingGuide: [
        { service: "Restaurant waiters", amount: "10-15% of bill", notes: "Check if service charge included" },
        { service: "Hotel staff", amount: "$1-2 per service", notes: "Bellhops, housekeeping" },
        { service: "Tour guides", amount: "$5-10 per day", notes: "More for exceptional service" },
        { service: "Taxi drivers", amount: "Round up fare", notes: "Or 10% for longer journeys" },
        { service: "Toilet attendants", amount: "1-2 Egyptian pounds", notes: "Small change is fine" },
        { service: "Felucca sailors", amount: "$2-5 per hour", notes: "Traditional Nile sailing" }
      ],
      paymentMethods: [
        "Cash (Egyptian pounds) - most widely accepted",
        "USD cash - useful for tips and some services",
        "Credit cards - accepted in hotels and tourist areas",
        "ATMs - widely available in cities",
        "Mobile payments - growing but not universal"
      ]
    }
  },
  "health-safety": {
    title: "Health & Safety in Egypt",
    description: "Stay healthy and safe during your Egyptian journey - medical tips, safety advice, and emergency information",
    category: "Safety",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt is generally safe for tourists, but being prepared for health and safety considerations ensures a worry-free trip. From staying hydrated in the desert to navigating busy cities, here's your comprehensive safety guide.",
      healthPrecautions: [
        {
          category: "Vaccinations",
          items: [
            { item: "Routine vaccines", description: "Ensure MMR, flu, tetanus are current", required: true },
            { item: "Hepatitis A", description: "Recommended for all travelers", required: true },
            { item: "Hepatitis B", description: "If you might have intimate contact", required: false },
            { item: "Typhoid", description: "Especially if eating street food", required: false },
            { item: "Yellow Fever", description: "Only if coming from infected area", required: false }
          ]
        },
        {
          category: "Common Health Issues",
          items: [
            { item: "Traveler's diarrhea", description: "Drink bottled water, avoid raw foods", prevention: "Bottled water, cooked foods only" },
            { item: "Dehydration", description: "Desert climate requires constant hydration", prevention: "Drink water regularly, electrolytes" },
            { item: "Heat exhaustion", description: "Especially during summer months", prevention: "Shade, light clothing, frequent breaks" },
            { item: "Sunburn", description: "Desert sun is extremely strong", prevention: "High SPF sunscreen, protective clothing" }
          ]
        }
      ],
      safetyGuidelines: [
        {
          category: "Personal Safety",
          tips: [
            "Stay aware of surroundings in crowded areas",
            "Don't display expensive jewelry or electronics",
            "Use hotel safes for valuables",
            "Avoid walking alone at night",
            "Be cautious with street vendors and touts",
            "Keep copies of important documents",
            "Register with your embassy if staying long-term"
          ]
        },
        {
          category: "Transportation Safety",
          tips: [
            "Use reputable taxi companies or ride-sharing apps",
            "Agree on taxi fares before starting journey",
            "Wear seatbelts when available",
            "Avoid overcrowded public transport",
            "Be extra careful crossing busy streets",
            "Use licensed tour operators for excursions"
          ]
        },
        {
          category: "Scam Awareness",
          tips: [
            "Be wary of overly friendly strangers offering help",
            "Don't accept unsolicited invitations to shops",
            "Verify tour operator credentials",
            "Count change carefully",
            "Be cautious of distraction techniques",
            "Don't give money to children begging"
          ]
        }
      ],
      emergencyContacts: [
        { service: "Police", number: "122", notes: "Tourist police available at major sites" },
        { service: "Medical Emergency", number: "123", notes: "Ambulance service" },
        { service: "Fire Department", number: "180", notes: "Fire and rescue" },
        { service: "Tourist Hotline", number: "126", notes: "24/7 tourist assistance" }
      ],
      medicalFacilities: [
        "Private hospitals in Cairo and Alexandria have international standards",
        "Tourist areas have clinics with English-speaking staff",
        "Pharmacies are widely available in cities",
        "Travel insurance is highly recommended",
        "Serious cases may require evacuation to Europe"
      ],
      womenTravelers: [
        "Dress modestly, especially at religious sites",
        "Consider head covering for mosque visits",
        "Solo female travel is possible but requires extra caution",
        "Join group tours for added security",
        "Trust your instincts and avoid uncomfortable situations",
        "Consider staying in hotels with female-only floors"
      ]
    }
  },
  "safety-insurance": {
    title: "Safety & Travel Insurance for Egypt",
    description: "Essential safety guidelines and comprehensive travel insurance coverage for your Egyptian adventure",
    category: "Safety",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Travel insurance is essential for Egypt travel, providing peace of mind and financial protection. Combined with proper safety awareness, you can enjoy Egypt's wonders worry-free. This guide covers everything from choosing the right insurance to staying safe throughout your journey.",
      insuranceTypes: [
        {
          type: "Comprehensive Travel Insurance",
          coverage: "Medical, trip cancellation, baggage, and more",
          recommendedAmount: "$100,000+ medical coverage",
          essential: true,
          details: [
            "Emergency medical treatment and hospitalization",
            "Medical evacuation to home country if needed",
            "Trip cancellation due to illness or emergencies",
            "Lost or stolen baggage compensation",
            "Flight delays and missed connections",
            "Personal liability protection"
          ],
          considerations: [
            "Check if adventure activities are covered",
            "Verify coverage for pre-existing conditions",
            "Ensure 24/7 emergency assistance",
            "Read policy exclusions carefully"
          ]
        },
        {
          type: "Medical-Only Insurance",
          coverage: "Basic medical emergencies and evacuation",
          recommendedAmount: "$50,000+ medical coverage",
          essential: true,
          details: [
            "Emergency medical treatment",
            "Prescription medication replacement",
            "Emergency dental care",
            "Medical evacuation if required"
          ],
          considerations: [
            "Lower cost but limited coverage",
            "No trip cancellation protection",
            "Good for healthy travelers with minimal risk",
            "Consider upgrading for adventure activities"
          ]
        },
        {
          type: "Adventure Sports Coverage",
          coverage: "High-risk activities and sports",
          recommendedAmount: "Add-on to comprehensive policy",
          essential: false,
          details: [
            "Desert safari and camel trekking",
            "Scuba diving in Red Sea",
            "Hot air balloon rides over Luxor",
            "Rock climbing and hiking",
            "Kitesurfing and windsurfing"
          ],
          considerations: [
            "Standard policies often exclude these activities",
            "Essential if planning adventure experiences",
            "Check activity-specific requirements",
            "May require additional premium"
          ]
        }
      ],
      safetyGuidelines: [
        {
          category: "Personal Security",
          riskLevel: "Low-Medium",
          guidelines: [
            "Stay aware of surroundings in crowded tourist areas",
            "Use hotel safes for passports and valuables",
            "Avoid displaying expensive jewelry or electronics",
            "Keep emergency contacts and embassy information handy",
            "Trust your instincts about people and situations",
            "Avoid walking alone in unfamiliar areas after dark"
          ],
          commonRisks: [
            "Pickpocketing in busy markets and tourist sites",
            "Overcharging by taxi drivers and vendors",
            "Persistent vendors and tour touts",
            "Minor scams targeting tourists"
          ]
        },
        {
          category: "Health & Medical Safety",
          riskLevel: "Medium",
          guidelines: [
            "Drink only bottled or purified water",
            "Eat at reputable restaurants and avoid street food initially",
            "Use hand sanitizer frequently",
            "Protect against sun exposure with high SPF sunscreen",
            "Stay hydrated, especially in desert climate",
            "Carry basic first aid supplies"
          ],
          commonRisks: [
            "Traveler's diarrhea from contaminated food/water",
            "Dehydration and heat exhaustion",
            "Sunburn and heat-related illness",
            "Minor cuts and bruises from uneven surfaces"
          ]
        },
        {
          category: "Transportation Safety",
          riskLevel: "Medium",
          guidelines: [
            "Use reputable taxi companies or ride-sharing apps",
            "Wear seatbelts when available",
            "Avoid overcrowded public transportation",
            "Be extra cautious when crossing busy streets",
            "Use licensed tour operators for excursions",
            "Avoid driving yourself unless absolutely necessary"
          ],
          commonRisks: [
            "Traffic accidents due to chaotic driving conditions",
            "Unlicensed taxi drivers and overcharging",
            "Poor vehicle maintenance and safety standards",
            "Aggressive driving and lack of traffic enforcement"
          ]
        }
      ],
      emergencyPreparation: [
        {
          category: "Essential Documents",
          items: [
            { item: "Travel insurance policy documents", importance: "Critical", notes: "Keep digital and physical copies" },
            { item: "Emergency contact card", importance: "Critical", notes: "Include family, doctor, and embassy contacts" },
            { item: "Medical information card", importance: "Important", notes: "List allergies, medications, and conditions" },
            { item: "Copy of passport and visa", importance: "Critical", notes: "Store separately from originals" },
            { item: "Credit card emergency numbers", importance: "Important", notes: "For reporting lost/stolen cards" }
          ]
        },
        {
          category: "Emergency Kit",
          items: [
            { item: "First aid supplies", importance: "Important", notes: "Band-aids, antiseptic, pain relievers" },
            { item: "Prescription medications", importance: "Critical", notes: "Bring extra in original containers" },
            { item: "Emergency cash reserve", importance: "Important", notes: "USD and Egyptian pounds for emergencies" },
            { item: "Portable phone charger", importance: "Important", notes: "Keep communication devices charged" },
            { item: "Emergency whistle", importance: "Optional", notes: "For attracting attention in emergencies" }
          ]
        }
      ],
      insuranceProviders: [
        {
          provider: "World Nomads",
          strengths: ["Adventure sports coverage", "Online claims", "24/7 support"],
          coverage: "Comprehensive with adventure options",
          notes: "Popular with backpackers and adventure travelers"
        },
        {
          provider: "Allianz Travel",
          strengths: ["Global network", "Medical evacuation", "Trip cancellation"],
          coverage: "Comprehensive traditional coverage",
          notes: "Reliable for standard travel with medical focus"
        },
        {
          provider: "IMG Global",
          strengths: ["International specialists", "High medical limits", "Evacuation"],
          coverage: "Medical-focused with high coverage limits",
          notes: "Good for travelers with health concerns"
        },
        {
          provider: "SafetyWing",
          strengths: ["Monthly coverage", "Digital nomad friendly", "Affordable"],
          coverage: "Basic medical with some travel benefits",
          notes: "Good for long-term or flexible travel"
        }
      ],
      claimsProcess: [
        {
          step: "Immediate Response",
          actions: [
            "Seek immediate medical attention if needed",
            "Contact insurance provider's 24/7 hotline",
            "Document everything with photos and receipts",
            "Keep all original receipts and medical reports",
            "Get police reports for theft or accidents"
          ]
        },
        {
          step: "Documentation",
          actions: [
            "Complete claim forms accurately and completely",
            "Provide all requested supporting documents",
            "Submit claims within specified timeframes",
            "Keep copies of all submitted documents",
            "Follow up on claim status regularly"
          ]
        },
        {
          step: "Follow-up",
          actions: [
            "Respond promptly to insurer requests",
            "Provide additional documentation if needed",
            "Understand reimbursement timelines",
            "Appeal decisions if claims are denied unfairly",
            "Learn from experience for future travel"
          ]
        }
      ],
      safetyTips: [
        "Register with your embassy upon arrival for long stays",
        "Share your itinerary with family or friends at home",
        "Keep emergency numbers saved in your phone",
        "Learn basic Arabic phrases for emergencies",
        "Download offline maps and translation apps",
        "Carry a whistle or personal alarm device",
        "Know the location of nearest hospitals",
        "Keep insurance documents easily accessible",
        "Understand local emergency procedures",
        "Stay informed about current safety conditions"
      ]
    }
  },
  "getting-around": {
    title: "Getting Around Egypt",
    description: "Complete guide to transportation, navigation, and moving around Egypt like a local",
    category: "Transportation",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers diverse transportation options from modern metros to traditional feluccas. Understanding your choices helps you navigate efficiently while experiencing authentic Egyptian culture. This guide covers everything from city transport to inter-city travel.",
      cityTransportation: [
        {
          city: "Cairo",
          population: "20+ million",
          mainOptions: [
            {
              type: "Cairo Metro",
              cost: "$0.30-0.50 per ride",
              pros: ["Fast", "Air-conditioned", "Predictable timing", "Connects major areas"],
              cons: ["Crowded during rush hour", "Limited coverage", "Arabic signage"],
              tips: ["Line 1 connects Old Cairo to New Cairo", "Women-only cars available", "Buy tokens at stations", "Avoid rush hours (7-9 AM, 5-7 PM)"],
              routes: ["Line 1: Helwan to New Marg", "Line 2: Shubra to Monib", "Line 3: Airport to Kit Kat"]
            },
            {
              type: "Taxi (Yellow & White)",
              cost: "$2-8 per ride",
              pros: ["Door-to-door service", "Available 24/7", "Good for luggage", "Local drivers"],
              cons: ["No fixed pricing", "Traffic delays", "Language barriers", "Negotiate required"],
              tips: ["Agree on price before starting", "Short rides: 20-40 EGP", "Airport trips: 100-200 EGP", "Have destination written in Arabic"]
            },
            {
              type: "Uber/Careem",
              cost: "$3-12 per ride",
              pros: ["Fixed pricing", "GPS tracking", "Cashless payment", "English app"],
              cons: ["Surge pricing", "Driver cancellations", "Limited availability", "Requires internet"],
              tips: ["Download both apps", "Keep cash backup", "Check driver rating", "Share trip details"]
            },
            {
              type: "Microbus",
              cost: "$0.20-0.40 per ride",
              pros: ["Very cheap", "Extensive routes", "Local experience", "Frequent service"],
              cons: ["Crowded", "No AC", "Confusing routes", "Arabic only"],
              tips: ["Learn key route numbers", "Have exact change", "Ask locals for help", "Avoid with luggage"]
            }
          ]
        },
        {
          city: "Alexandria",
          population: "5+ million",
          mainOptions: [
            {
              type: "Alexandria Tram",
              cost: "$0.20-0.30 per ride",
              pros: ["Historic charm", "Cheap", "Covers main areas", "Cultural experience"],
              cons: ["Slow", "Old infrastructure", "Limited routes", "Crowding"],
              tips: ["Blue line covers corniche", "Yellow line to city center", "Buy tickets on board", "Mind the gap"]
            },
            {
              type: "Taxi & Ride Apps",
              cost: "$2-6 per ride",
              pros: ["Convenient", "Air-conditioned", "Direct routes", "Good for tourists"],
              cons: ["More expensive", "Traffic issues", "Negotiate prices", "Limited Uber coverage"],
              tips: ["White taxis more reliable", "Agree on corniche route pricing", "Use for longer distances", "Have Arabic address ready"]
            },
            {
              type: "Walking & Corniche",
              cost: "Free",
              pros: ["Scenic views", "Exercise", "Free", "Discover hidden gems"],
              cons: ["Distance limitations", "Weather dependent", "Busy sidewalks", "Air quality"],
              tips: ["Best in morning/evening", "Corniche perfect for walking", "Wear comfortable shoes", "Stay hydrated"]
            }
          ]
        },
        {
          city: "Luxor",
          population: "500,000",
          mainOptions: [
            {
              type: "Bicycle Rental",
              cost: "$3-5 per day",
              pros: ["Eco-friendly", "Flexible timing", "Good exercise", "See more areas"],
              cons: ["Hot weather", "Traffic safety", "Limited night use", "Theft risk"],
              tips: ["Rent from hotels", "Early morning cycling", "Lock securely", "Avoid main roads"]
            },
            {
              type: "Horse Carriage (Caleche)",
              cost: "$5-15 per hour",
              pros: ["Traditional experience", "Tourist-friendly", "Shade provided", "Good for photos"],
              cons: ["Animal welfare concerns", "Negotiate prices", "Slow transport", "Weather dependent"],
              tips: ["Check horse condition", "Agree on route first", "Typical rate: 100-200 EGP/hour", "Best for short distances"]
            },
            {
              type: "Taxi & Tuk-tuk",
              cost: "$1-5 per ride",
              pros: ["Quick transport", "Local drivers", "Cheap", "Good for luggage"],
              cons: ["No meters", "Negotiate required", "Quality varies", "Language barriers"],
              tips: ["Tuk-tuks for short trips", "Taxis for longer journeys", "Have hotel card", "Learn basic Arabic numbers"]
            }
          ]
        }
      ],
      intercityTravel: [
        {
          method: "Domestic Flights",
          routes: ["Cairo-Luxor", "Cairo-Aswan", "Cairo-Hurghada", "Cairo-Sharm El Sheikh"],
          duration: "1-1.5 hours",
          cost: "$80-200",
          companies: ["EgyptAir", "Air Cairo", "Nile Air"],
          pros: ["Fast", "Comfortable", "Skip long drives", "Scenic views"],
          cons: ["More expensive", "Weather delays", "Airport transfers", "Baggage limits"],
          tips: [
            "Book domestic flights in advance for better prices",
            "EgyptAir most reliable but expensive",
            "Budget airlines offer good deals",
            "Check baggage allowances",
            "Arrive 2 hours early for domestic flights"
          ]
        },
        {
          method: "First Class Train",
          routes: ["Cairo-Luxor", "Cairo-Aswan", "Alexandria-Cairo"],
          duration: "8-14 hours",
          cost: "$15-40",
          companies: ["Egyptian National Railways"],
          pros: ["Comfortable seats", "Air conditioning", "Sleeper options", "Scenic route"],
          cons: ["Long journey", "Limited routes", "Booking required", "Delays possible"],
          tips: [
            "Book first class for comfort",
            "Sleeper trains available Cairo-Luxor-Aswan",
            "Bring snacks and water",
            "Day trains offer better views",
            "Reserve seats online or at stations"
          ]
        },
        {
          method: "Tourist Bus",
          routes: ["Cairo-Luxor", "Cairo-Hurghada", "Luxor-Aswan"],
          duration: "4-8 hours",
          cost: "$8-20",
          companies: ["Go Bus", "East Delta", "Upper Egypt Bus"],
          pros: ["Affordable", "Air conditioning", "Direct routes", "Comfortable"],
          cons: ["Fixed schedules", "Road conditions", "Rest stop delays", "Limited legroom"],
          tips: [
            "Go Bus most comfortable for tourists",
            "Book online for guaranteed seats",
            "VIP buses worth extra cost",
            "Bring entertainment for long trips",
            "Check departure terminals in advance"
          ]
        },
        {
          method: "Private Car/Driver",
          routes: ["Any destination", "Custom itineraries"],
          duration: "Varies",
          cost: "$50-150 per day",
          companies: ["Local tour operators", "Hotel arrangements"],
          pros: ["Flexible schedule", "Door-to-door", "Stop anywhere", "Personal guide"],
          cons: ["Most expensive", "Driver quality varies", "Language barriers", "Negotiation required"],
          tips: [
            "Arrange through reputable hotels",
            "Agree on all costs upfront",
            "Check driver credentials",
            "Include fuel and tolls in price",
            "Get driver contact information"
          ]
        }
      ],
      navigationTips: [
        {
          category: "Digital Navigation",
          tools: [
            {
              app: "Google Maps",
              pros: ["Offline maps", "Real-time traffic", "Walking directions", "Public transport"],
              cons: ["Data usage", "GPS accuracy issues", "Limited local business info"],
              tips: ["Download offline maps before travel", "Use landmarks for reference", "Check transit options"]
            },
            {
              app: "Maps.me",
              pros: ["Fully offline", "Detailed maps", "Points of interest", "No data required"],
              cons: ["No real-time traffic", "Limited public transport", "Requires downloads"],
              tips: ["Download Egypt maps at hotel WiFi", "Mark important locations", "Use for walking navigation"]
            },
            {
              app: "Uber/Careem",
              pros: ["Built-in navigation", "Driver communication", "Trip tracking", "Price estimates"],
              cons: ["Requires internet", "Driver dependent", "Not all areas covered"],
              tips: ["Share trip details", "Have backup transport", "Learn pickup spot names"]
            }
          ]
        },
        {
          category: "Traditional Navigation",
          methods: [
            {
              method: "Landmarks",
              description: "Use major monuments, hotels, and recognizable buildings",
              examples: ["Cairo Tower", "Egyptian Museum", "Pyramids", "Major hotels"],
              tips: ["Learn Arabic names of landmarks", "Take photos of important locations", "Use mosque minarets as reference points"]
            },
            {
              method: "Address Cards",
              description: "Hotel business cards and written addresses in Arabic",
              examples: ["Hotel business card", "Restaurant addresses", "Tourist site names"],
              tips: ["Always carry hotel card", "Have destinations written in Arabic", "Take photos of important addresses"]
            },
            {
              method: "Local Help",
              description: "Ask locals, shop owners, and tourist police for directions",
              examples: ["Hotel staff", "Tourist police", "Shop owners", "Other tourists"],
              tips: ["Learn basic Arabic direction words", "Use translation apps", "Ask multiple people for confirmation"]
            }
          ]
        }
      ],
      transportationEtiquette: [
        {
          situation: "Public Transport",
          guidelines: [
            "Offer seats to elderly and women with children",
            "Keep bags small and close to body",
            "Have exact change ready",
            "Respect women-only metro cars",
            "Avoid eating on public transport",
            "Keep conversations quiet"
          ]
        },
        {
          situation: "Taxis & Ride Shares",
          guidelines: [
            "Greet driver politely in Arabic ('As-salamu alaykum')",
            "Confirm destination before starting",
            "Sit in back seat unless invited to front",
            "Tip 10-15% for good service",
            "Keep cash for taxi payments",
            "Thank driver when exiting"
          ]
        },
        {
          situation: "Walking & Street Navigation",
          guidelines: [
            "Dress modestly, especially in local neighborhoods",
            "Be aware of traffic - cars don't always stop",
            "Step aside for prayer times near mosques",
            "Avoid blocking shop entrances",
            "Be patient with slower pedestrian pace",
            "Respect local customs in different areas"
          ]
        }
      ],
      budgetBreakdown: [
        {
          category: "Daily Transportation (Cairo)",
          budget: "$3-8",
          breakdown: [
            { item: "Metro rides (2-3)", cost: "$1-1.50" },
            { item: "Short taxi/Uber", cost: "$2-4" },
            { item: "Walking", cost: "$0" },
            { item: "Microbus rides", cost: "$0.50-1" }
          ]
        },
        {
          category: "Daily Transportation (Luxor/Aswan)",
          budget: "$5-15",
          breakdown: [
            { item: "Bicycle rental", cost: "$3-5" },
            { item: "Taxi rides (2-3)", cost: "$2-6" },
            { item: "Caleche ride", cost: "$5-10" },
            { item: "Walking tours", cost: "$0" }
          ]
        },
        {
          category: "Inter-city Travel",
          budget: "$15-150",
          breakdown: [
            { item: "Bus tickets", cost: "$8-20" },
            { item: "Train tickets", cost: "$15-40" },
            { item: "Domestic flights", cost: "$80-200" },
            { item: "Private car/day", cost: "$50-150" }
          ]
        }
      ],
      safetyTips: [
        "Always agree on taxi fares before starting the journey",
        "Keep important phone numbers saved offline",
        "Carry small bills for public transport and tips",
        "Be extra cautious crossing busy streets",
        "Use reputable transport apps when possible",
        "Keep copies of transport tickets and receipts",
        "Learn basic Arabic numbers for price negotiations",
        "Stay alert in crowded public transport",
        "Have backup transportation options planned",
        "Know your hotel's exact address in Arabic"
      ]
    }
  },
  "currency-payments": {
    title: "Currency & Payments in Egypt",
    description: "Complete guide to Egyptian currency, payment methods, banking, and financial tips for travelers",
    category: "Financial",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Understanding Egypt's currency and payment systems ensures smooth financial transactions during your trip. From cash culture to digital payments, this guide covers everything you need to know about money in Egypt.",
      currency: {
        name: "Egyptian Pound (EGP)",
        symbol: "ج.م or £E",
        code: "EGP",
        subdivisions: "1 Pound = 100 Piastres (PT)",
        exchangeRate: "Check current rates before travel",
        denominations: {
          banknotes: ["5", "10", "20", "50", "100", "200"],
          coins: ["25 PT", "50 PT", "1 EGP"]
        },
        recognitionTips: [
          "Banknotes feature ancient Egyptian monuments and figures",
          "Arabic numerals used alongside English on newer notes", 
          "Look for security features like watermarks",
          "Older notes may be worn but still valid"
        ]
      },
      paymentMethods: [
        {
          method: "Cash (Egyptian Pounds)",
          acceptance: "Universal",
          recommended: "Essential",
          details: [
            "Required for street vendors, local restaurants, and tips",
            "Small denominations (5, 10, 20 EGP) most useful",
            "Keep cash secure in multiple locations",
            "Always have small bills for tipping"
          ],
          tips: [
            "Withdraw from ATMs for best exchange rates",
            "Check bills for tears - damaged notes may be rejected",
            "Keep receipts for major cash exchanges",
            "Bargaining often requires cash payment"
          ]
        },
        {
          method: "US Dollars",
          acceptance: "Tourist areas",
          recommended: "Backup currency",
          details: [
            "Accepted at hotels, tour operators, and some shops",
            "Used for visa fees and major purchases",
            "Bring clean, newer bills (post-2006)",
            "Some places prefer USD over credit cards"
          ],
          tips: [
            "Bring small denominations ($1, $5, $10, $20)",
            "Avoid torn or heavily marked bills",
            "Keep USD for emergencies and tips",
            "Exchange rates vary - compare before paying"
          ]
        },
        {
          method: "Credit Cards",
          acceptance: "Hotels & tourist establishments",
          recommended: "Convenient for major purchases",
          details: [
            "Visa and Mastercard widely accepted",
            "Hotels, restaurants, and shops in tourist areas",
            "May incur foreign transaction fees",
            "PIN required for most transactions"
          ],
          tips: [
            "Notify bank of travel plans",
            "Carry backup cards from different banks",
            "Check foreign transaction fees",
            "Keep receipts for expense tracking"
          ]
        },
        {
          method: "Debit Cards",
          acceptance: "ATMs and some merchants",
          recommended: "Primary cash source",
          details: [
            "Best exchange rates through ATM withdrawals",
            "Available at banks, hotels, and shopping centers",
            "Daily withdrawal limits apply",
            "May charge international fees"
          ],
          tips: [
            "Use bank ATMs when possible",
            "Withdraw larger amounts to minimize fees",
            "Cover PIN when entering",
            "Keep ATM receipts for records"
          ]
        }
      ],
      exchangeOptions: [
        {
          option: "Airport Exchange",
          rate: "Fair to Poor",
          convenience: "High",
          fees: "Higher rates",
          bestFor: "Small amounts for immediate needs",
          details: [
            "Available 24/7 at Cairo Airport",
            "Convenient but poor exchange rates",
            "Good for taxi fare and tips",
            "Keep receipts for departure"
          ]
        },
        {
          option: "Bank Exchange",
          rate: "Good",
          convenience: "Medium",
          fees: "Low",
          bestFor: "Large amounts, official rates",
          details: [
            "Best official exchange rates",
            "Requires passport and paperwork",
            "Banking hours: Sunday-Thursday 9AM-2PM",
            "Keep all exchange receipts"
          ]
        },
        {
          option: "ATM Withdrawals",
          rate: "Best",
          convenience: "High",
          fees: "Bank fees apply",
          bestFor: "Regular cash needs",
          details: [
            "Most favorable exchange rates",
            "Available 24/7 at many locations",
            "Check daily withdrawal limits",
            "Use reputable bank ATMs"
          ]
        },
        {
          option: "Hotel Exchange",
          rate: "Poor",
          convenience: "High",
          fees: "High markup",
          bestFor: "Emergencies only",
          details: [
            "Convenient but expensive",
            "Available for hotel guests",
            "Higher rates than banks",
            "Good for small emergency amounts"
          ]
        },
        {
          option: "Street Exchangers",
          rate: "Variable",
          convenience: "High",
          fees: "Negotiable",
          bestFor: "Not recommended",
          details: [
            "Unofficial and potentially risky",
            "Rates may seem better but often fraudulent",
            "Risk of counterfeit currency",
            "Illegal in many areas"
          ]
        }
      ],
      bankingServices: [
        {
          service: "ATM Networks",
          availability: "Widespread",
          details: [
            "Major banks: National Bank of Egypt, CIB, HSBC",
            "Available in cities, tourist areas, and hotels",
            "Most accept international cards",
            "English language options available"
          ],
          locations: [
            "Banks and branch offices",
            "Hotels and resorts",
            "Shopping malls and centers", 
            "Tourist attractions",
            "Airports and train stations"
          ]
        },
        {
          service: "Money Transfer",
          availability: "Good in cities",
          details: [
            "Western Union widely available",
            "MoneyGram at select locations",
            "Bank wire transfers possible",
            "Requires proper identification"
          ],
          requirements: [
            "Valid passport or ID",
            "Reference number for pickup",
            "Sender's information",
            "Purpose of transfer documentation"
          ]
        },
        {
          service: "Banking Hours",
          availability: "Standard schedule",
          details: [
            "Sunday-Thursday: 9:00 AM - 2:00 PM",
            "Some branches: 5:00 PM - 8:00 PM",
            "Friday-Saturday: Closed",
            "Ramadan hours may vary"
          ],
          exceptions: [
            "Airport branches may have extended hours",
            "Hotel exchange services available longer",
            "ATMs operate 24/7",
            "Tourist area branches may stay open later"
          ]
        }
      ],
      tippingGuide: [
        {
          service: "Restaurants",
          amount: "10-15% of bill",
          notes: "Check if service charge already included",
          customary: true,
          details: [
            "Higher end restaurants: 15-20%",
            "Local restaurants: 10%",
            "Café/coffee shops: Round up",
            "Fast food: Not expected"
          ]
        },
        {
          service: "Hotels",
          amount: "20-50 EGP per service",
          notes: "Daily for housekeeping, per bag for porters",
          customary: true,
          details: [
            "Housekeeping: 20-30 EGP daily",
            "Porters: 10-20 EGP per bag",
            "Concierge: 50-100 EGP for special help",
            "Room service: 10-20 EGP"
          ]
        },
        {
          service: "Taxis & Drivers",
          amount: "10% or round up",
          notes: "For good service, optional for short rides",
          customary: false,
          details: [
            "Private drivers: 50-100 EGP per day",
            "Taxi drivers: Round up to nearest 5 EGP",
            "Uber/Careem: Tip through app",
            "Tour bus drivers: 20-50 EGP"
          ]
        },
        {
          service: "Tour Guides",
          amount: "100-200 EGP per day",
          notes: "Based on group size and service quality",
          customary: true,
          details: [
            "Private guides: 150-300 EGP per day",
            "Group guides: 50-100 EGP per person",
            "Site-specific guides: 50-100 EGP",
            "Multi-day tours: 100-200 EGP daily"
          ]
        },
        {
          service: "General Services",
          amount: "5-20 EGP",
          notes: "Toilet attendants, bag assistance, etc.",
          customary: true,
          details: [
            "Toilet attendants: 2-5 EGP",
            "Parking attendants: 5-10 EGP",
            "Photography help: 10-20 EGP",
            "Temple guards: 10-20 EGP"
          ]
        }
      ],
      budgetingTips: [
        "Always carry a mix of cash and cards",
        "Keep small bills for tips and small purchases",
        "Budget extra for tipping - it's essential in Egypt",
        "Notify your bank of travel plans to avoid card blocks",
        "Take photos of important receipts and documents",
        "Keep emergency cash in different locations",
        "Learn basic Arabic numbers for price negotiations",
        "Check daily ATM withdrawal limits with your bank",
        "Consider travel-friendly bank accounts with low fees",
        "Keep some USD cash as backup for emergencies"
      ],
      securityTips: [
        {
          category: "Cash Security",
          tips: [
            "Split cash between wallet, bag, and hotel safe",
            "Use a money belt for large amounts",
            "Only carry what you need for the day",
            "Keep emergency cash hidden separately",
            "Count change carefully in busy areas",
            "Avoid displaying large amounts of cash"
          ]
        },
        {
          category: "Card Security", 
          tips: [
            "Cover PIN when entering at ATMs",
            "Use ATMs inside banks when possible",
            "Check for card skimming devices",
            "Monitor account activity regularly",
            "Report lost cards immediately",
            "Keep emergency card numbers accessible"
          ]
        },
        {
          category: "General Precautions",
          tips: [
            "Be cautious of overly helpful strangers",
            "Verify prices before agreeing to purchases",
            "Keep receipts for major transactions",
            "Understand the local tipping culture",
            "Be aware of common tourist scams",
            "Trust your instincts in financial situations"
          ]
        }
      ],
      commonScams: [
        {
          scam: "Fake Police Checkpoints",
          description: "Unofficial 'police' demanding to see money or papers",
          prevention: "Ask for proper identification, go to official police station"
        },
        {
          scam: "Overcharging Tourists",
          description: "Inflated prices for goods, services, or taxi rides",
          prevention: "Research normal prices, negotiate beforehand, use meters when available"
        },
        {
          scam: "Currency Exchange Fraud",
          description: "Street changers offering great rates but providing counterfeit money",
          prevention: "Use only official exchanges, banks, or ATMs"
        },
        {
          scam: "ATM Assistance Scam",
          description: "Strangers offering help at ATMs to steal PIN or cards",
          prevention: "Politely decline help, use ATMs in secure locations"
        },
        {
          scam: "Distraction Theft",
          description: "Working in groups to distract while accomplice steals wallet",
          prevention: "Stay alert in crowded areas, keep valuables secure"
        }
      ]
    }
  },
  "connectivity-sim-cards": {
    title: "Connectivity & SIM Cards in Egypt",
    description: "Complete guide to staying connected in Egypt - mobile networks, internet access, and communication options",
    category: "Technology",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Staying connected in Egypt is essential for navigation, communication, and sharing your travel experiences. From local SIM cards to WiFi hotspots, this guide covers all your connectivity options with practical tips for seamless communication throughout your Egyptian journey.",
      mobileNetworks: [
        {
          provider: "Vodafone Egypt",
          marketShare: "40%+",
          coverage: "Excellent nationwide",
          strengths: ["Best overall coverage", "Strong 4G network", "Tourist-friendly plans", "English customer service"],
          weaknesses: ["Premium pricing", "Busy stores in tourist areas"],
          bestFor: "Travelers prioritizing reliability and coverage",
          plans: [
            { name: "Tourist SIM", data: "20GB", validity: "30 days", price: "$10-15", features: ["Local calls", "International SMS", "Social media packages"] },
            { name: "Prepaid Plus", data: "50GB", validity: "30 days", price: "$20-25", features: ["Unlimited local calls", "International minutes", "High-speed data"] }
          ]
        },
        {
          provider: "Orange Egypt",
          marketShare: "30%+",
          coverage: "Good nationwide",
          strengths: ["Competitive pricing", "Good data packages", "Wide store network", "Reliable in cities"],
          weaknesses: ["Weaker rural coverage", "Limited English support"],
          bestFor: "Budget-conscious travelers in urban areas",
          plans: [
            { name: "Orange Tourist", data: "15GB", validity: "30 days", price: "$8-12", features: ["Local calls", "Social media apps", "Tourist hotline"] },
            { name: "Orange Max", data: "40GB", validity: "30 days", price: "$18-22", features: ["Unlimited calls", "International roaming", "Entertainment packages"] }
          ]
        },
        {
          provider: "Etisalat Egypt",
          marketShare: "25%+",
          coverage: "Good in major cities",
          strengths: ["Fastest 4G speeds", "Modern network", "Good customer service", "International roaming deals"],
          weaknesses: ["Limited rural coverage", "Fewer store locations"],
          bestFor: "Digital nomads and heavy data users",
          plans: [
            { name: "We Tourist", data: "25GB", validity: "28 days", price: "$12-16", features: ["High-speed 4G", "International calling", "Mobile hotspot"] },
            { name: "We Unlimited", data: "Unlimited", validity: "30 days", price: "$25-30", features: ["No throttling", "Premium support", "5G access in Cairo"] }
          ]
        }
      ],
      simCardPurchase: {
        requirements: [
          "Valid passport (original required)",
          "Tourist visa or entry stamp",
          "Local address (hotel address acceptable)",
          "Cash payment (Egyptian pounds or USD)"
        ],
        locations: [
          {
            type: "Airport Counters",
            availability: "24/7 at Cairo Airport",
            pros: ["Immediate activation", "Tourist-specific plans", "English assistance"],
            cons: ["Higher prices", "Limited plan options", "Long queues"],
            tips: ["Available in arrival halls", "Expect 20-30% markup", "Ask for tourist packages"]
          },
          {
            type: "Official Stores",
            availability: "Daily 9AM-9PM",
            pros: ["Best prices", "Full plan selection", "Official warranty"],
            cons: ["Language barriers", "Longer activation time", "Documentation required"],
            tips: ["Bring hotel address", "Use translation apps", "Visit larger stores for English speakers"]
          },
          {
            type: "Authorized Dealers",
            availability: "Varies by location",
            pros: ["Convenient locations", "Quick service", "Local knowledge"],
            cons: ["Unofficial pricing", "Limited support", "Activation issues possible"],
            tips: ["Verify dealer authenticity", "Compare prices", "Test service before leaving"]
          }
        ],
        activationProcess: [
          "Purchase SIM card and select plan",
          "Provide passport and visa documentation",
          "Complete registration form (Arabic/English)",
          "Wait for network activation (5-30 minutes)",
          "Test calls, SMS, and data connectivity",
          "Save customer service numbers"
        ]
      },
      internetAccess: [
        {
          type: "Hotel WiFi",
          quality: "Good to Excellent",
          cost: "Usually free",
          speed: "10-100 Mbps",
          reliability: "High in 4-5 star hotels",
          coverage: "Lobby and rooms",
          tips: [
            "Ask for WiFi password at check-in",
            "Test speed in your room before settling",
            "Lobby often has stronger signal",
            "Some hotels charge for premium speed"
          ]
        },
        {
          type: "Café & Restaurant WiFi",
          quality: "Variable",
          cost: "Free with purchase",
          speed: "5-50 Mbps",
          reliability: "Moderate",
          coverage: "Dining areas only",
          tips: [
            "Ask staff for WiFi credentials",
            "International chains usually reliable",
            "Upload photos during meal breaks",
            "Avoid sensitive browsing on public networks"
          ]
        },
        {
          type: "Public WiFi Hotspots",
          quality: "Poor to Fair",
          cost: "Free",
          speed: "1-20 Mbps",
          reliability: "Low",
          coverage: "Limited areas",
          tips: [
            "Available at malls and airports",
            "Use VPN for security",
            "Don't access banking or sensitive sites",
            "Backup option only"
          ]
        },
        {
          type: "Mobile Hotspot",
          quality: "Good",
          cost: "Uses data plan",
          speed: "20-100 Mbps",
          reliability: "Depends on network coverage",
          coverage: "Wherever you have mobile signal",
          tips: [
            "Most reliable option for consistent access",
            "Share with travel companions",
            "Monitor data usage carefully",
            "Useful for navigation and translation apps"
          ]
        }
      ],
      communicationApps: [
        {
          category: "Messaging & Voice",
          apps: [
            {
              name: "WhatsApp",
              popularity: "Universal in Egypt",
              features: ["Free messaging", "Voice/video calls", "Works on WiFi"],
              dataUsage: "Low",
              tips: ["Most Egyptians use WhatsApp", "Works well with local SIM", "Save important contacts"]
            },
            {
              name: "Telegram",
              popularity: "Growing",
              features: ["Secure messaging", "File sharing", "Group chats"],
              dataUsage: "Low",
              tips: ["Good backup to WhatsApp", "Works in poor connectivity", "Useful for travel groups"]
            },
            {
              name: "Skype",
              popularity: "International calls",
              features: ["Video calling", "International rates", "Screen sharing"],
              dataUsage: "Medium-High",
              tips: ["Good for long family calls", "Buy credit for phone calls", "Use on WiFi for video"]
            }
          ]
        },
        {
          category: "Navigation & Maps",
          apps: [
            {
              name: "Google Maps",
              popularity: "Essential",
              features: ["Offline maps", "Navigation", "Business info", "Public transport"],
              dataUsage: "Medium",
              tips: ["Download offline maps", "Works with Arabic addresses", "Save important locations"]
            },
            {
              name: "Maps.me",
              popularity: "Travel favorite",
              features: ["Fully offline", "Detailed maps", "Points of interest"],
              dataUsage: "None (offline)",
              tips: ["Download before travel", "Mark hotels and attractions", "Works without data"]
            },
            {
              name: "Uber/Careem",
              popularity: "Urban areas",
              features: ["Ride booking", "GPS tracking", "Cashless payment"],
              dataUsage: "Low",
              tips: ["Both apps work in Egypt", "Careem more popular locally", "Save pickup locations"]
            }
          ]
        },
        {
          category: "Translation & Language",
          apps: [
            {
              name: "Google Translate",
              popularity: "Essential for travelers",
              features: ["Text translation", "Camera translation", "Offline mode", "Voice translation"],
              dataUsage: "Low (offline mode available)",
              tips: ["Download Arabic language pack", "Use camera for menu translation", "Voice mode for conversations"]
            },
            {
              name: "Microsoft Translator",
              popularity: "Professional alternative",
              features: ["Real-time conversation", "Offline translation", "Phrasebook"],
              dataUsage: "Low",
              tips: ["Good for business meetings", "Conversation mode useful", "Download offline packs"]
            }
          ]
        }
      ],
      internetSpeeds: {
        average4G: "20-50 Mbps download, 5-15 Mbps upload",
        average3G: "2-10 Mbps download, 1-3 Mbps upload",
        averageWiFi: "10-100 Mbps (varies by provider)",
        coverage: {
          urban: "95%+ 4G coverage in Cairo, Alexandria, major cities",
          rural: "70-80% 3G/4G coverage, improving rapidly",
          touristAreas: "90%+ coverage at all major attractions",
          desert: "Limited coverage, satellite options available"
        }
      },
      costs: {
        dailyEstimates: [
          { usage: "Light (1GB)", cost: "$1-2", activities: ["Basic messaging", "Navigation", "Social media"] },
          { usage: "Medium (3-5GB)", cost: "$3-5", activities: ["Video calls", "Photo uploads", "Streaming music"] },
          { usage: "Heavy (10GB+)", cost: "$8-12", activities: ["Video streaming", "Large file uploads", "Constant hotspot use"] }
        ],
        comparisonWithRoaming: [
          { carrier: "US Carriers", roamingCost: "$10-15/day", localSIMCost: "$8-15/month", savings: "80-90%" },
          { carrier: "EU Carriers", roamingCost: "$5-10/day", localSIMCost: "$8-15/month", savings: "70-80%" },
          { carrier: "Other International", roamingCost: "$15-25/day", localSIMCost: "$8-15/month", savings: "85-95%" }
        ]
      },
      practicalTips: [
        "Buy SIM card within 24 hours of arrival for best activation",
        "Always carry passport when purchasing SIM cards",
        "Download offline maps and translation apps before traveling",
        "Test your SIM card immediately after purchase",
        "Keep your home country SIM card safe for return",
        "Consider unlocking your phone before travel",
        "Use WiFi for large downloads and video calls",
        "Monitor data usage to avoid unexpected charges",
        "Save emergency numbers in both Arabic and English",
        "Purchase data packages rather than pay-per-use rates"
      ],
      troubleshooting: [
        {
          issue: "SIM Card Not Working",
          solutions: [
            "Restart phone after inserting SIM",
            "Check if phone is unlocked for international use",
            "Verify network settings (APN configuration)",
            "Contact customer service with purchase receipt",
            "Try SIM in another unlocked device"
          ]
        },
        {
          issue: "Slow Internet Speeds",
          solutions: [
            "Check data allowance - may be throttled",
            "Move to area with better signal strength",
            "Switch between 3G/4G networks manually",
            "Clear cache and restart apps",
            "Use WiFi for data-heavy activities"
          ]
        },
        {
          issue: "High Data Usage",
          solutions: [
            "Turn off automatic app updates",
            "Disable background app refresh",
            "Use WiFi whenever available",
            "Download content for offline use",
            "Monitor usage in phone settings"
          ]
        },
        {
          issue: "Cannot Make International Calls",
          solutions: [
            "Add international calling package",
            "Use +20 prefix for Egypt, +country code for others",
            "Try WhatsApp or Skype calling instead",
            "Check credit balance on prepaid plans",
            "Contact customer service for assistance"
          ]
        }
      ],
      emergencyConnectivity: [
        "Keep emergency numbers saved in phone contacts",
        "Write down important numbers on paper backup",
        "Know nearest embassy/consulate contact information",
        "Save hotel address and phone number in Arabic",
        "Keep some credit on home country SIM for emergencies",
        "Download offline maps of your accommodation area",
        "Consider satellite messenger for remote areas",
        "Inform family/friends of your communication plan"
      ]
    }
  },
  "health-vaccinations": {
    title: "Health & Vaccinations for Egypt",
    description: "Essential health information, vaccination requirements, and medical guidance for safe travel to Egypt",
    category: "Health & Safety",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Proper health preparation is crucial for a safe and enjoyable trip to Egypt. This comprehensive guide covers vaccination requirements, health precautions, medical facilities, and practical health tips to keep you healthy throughout your Egyptian adventure.",
      vaccinations: {
        required: [
          {
            vaccine: "Yellow Fever",
            requirement: "Required if arriving from yellow fever endemic areas",
            description: "Mandatory for travelers coming from countries with risk of yellow fever transmission",
            validityPeriod: "10 years",
            timing: "At least 10 days before travel",
            notes: "Certificate required at border. Check current list of endemic countries."
          }
        ],
        recommended: [
          {
            vaccine: "Hepatitis A",
            priority: "Highly Recommended",
            description: "Protection against hepatitis A virus from contaminated food and water",
            dosing: "2 doses, 6-12 months apart",
            timing: "First dose at least 2 weeks before travel",
            duration: "Lifelong protection after complete series"
          },
          {
            vaccine: "Hepatitis B",
            priority: "Recommended",
            description: "Protection against hepatitis B virus transmitted through blood and bodily fluids",
            dosing: "3 doses over 6 months",
            timing: "Start series at least 6 months before travel",
            duration: "Lifelong protection"
          },
          {
            vaccine: "Typhoid",
            priority: "Recommended",
            description: "Protection against typhoid fever from contaminated food and water",
            dosing: "Single injection or oral capsules",
            timing: "At least 2 weeks before travel",
            duration: "2-3 years"
          },
          {
            vaccine: "Meningococcal ACWY",
            priority: "Consider for High-Risk",
            description: "Protection against meningococcal disease, especially during hajj season",
            dosing: "Single dose",
            timing: "At least 2 weeks before travel",
            duration: "5 years"
          },
          {
            vaccine: "Rabies (Pre-exposure)",
            priority: "Consider for Extended Travel",
            description: "Pre-exposure prophylaxis for travelers with animal contact risk",
            dosing: "3 doses over 3-4 weeks",
            timing: "Complete series before travel",
            duration: "2+ years"
          }
        ],
        routine: [
          {
            vaccine: "COVID-19",
            status: "Up to date recommended",
            notes: "Check current entry requirements and booster recommendations"
          },
          {
            vaccine: "Influenza",
            status: "Annual vaccination recommended",
            notes: "Especially important for travel during flu season"
          },
          {
            vaccine: "MMR (Measles, Mumps, Rubella)",
            status: "Ensure up to date",
            notes: "Particularly important due to global measles outbreaks"
          },
          {
            vaccine: "Tdap (Tetanus, Diphtheria, Pertussis)",
            status: "Every 10 years",
            notes: "Consider booster if more than 5 years since last dose"
          }
        ]
      },
      healthRisks: [
        {
          risk: "Traveler's Diarrhea",
          likelihood: "Common (20-40% of travelers)",
          severity: "Mild to Moderate",
          description: "Most common travel-related illness caused by bacteria, viruses, or parasites",
          prevention: [
            "Drink only bottled or properly treated water",
            "Avoid tap water, ice cubes, and fountain drinks",
            "Eat hot, freshly cooked food",
            "Avoid raw or undercooked foods",
            "Peel fruits yourself",
            "Avoid street vendor food unless clearly safe"
          ],
          treatment: [
            "Stay hydrated with oral rehydration solution",
            "Continue eating bland foods when possible",
            "Consider anti-diarrheal medication for comfort",
            "Seek medical care if severe or persistent",
            "Antibiotics may be needed for bacterial causes"
          ]
        },
        {
          risk: "Heat-Related Illness",
          likelihood: "Moderate (varies by season)",
          severity: "Mild to Severe",
          description: "Heat exhaustion and heat stroke from high temperatures and sun exposure",
          prevention: [
            "Stay hydrated with plenty of water",
            "Avoid alcohol and caffeine in heat",
            "Wear light-colored, loose-fitting clothing",
            "Use broad-spectrum sunscreen SPF 30+",
            "Seek shade during peak hours (10 AM - 4 PM)",
            "Take frequent breaks in air conditioning"
          ],
          treatment: [
            "Move to cool, shaded area immediately",
            "Remove excess clothing",
            "Apply cool water to skin",
            "Drink cool fluids if conscious",
            "Seek immediate medical care for heat stroke",
            "Monitor for confusion or altered mental state"
          ]
        },
        {
          risk: "Respiratory Infections",
          likelihood: "Low to Moderate",
          severity: "Mild to Moderate",
          description: "Common cold, flu, or other respiratory infections in crowded areas",
          prevention: [
            "Practice good hand hygiene",
            "Avoid close contact with sick individuals",
            "Consider wearing masks in crowded areas",
            "Stay up to date with vaccinations",
            "Maintain good general health",
            "Get adequate sleep and nutrition"
          ],
          treatment: [
            "Rest and increase fluid intake",
            "Use over-the-counter medications for symptoms",
            "Seek medical care if symptoms worsen",
            "Isolate if contagious",
            "Monitor for complications",
            "Consider prescription antivirals if indicated"
          ]
        },
        {
          risk: "Insect-Borne Diseases",
          likelihood: "Low (seasonal variation)",
          severity: "Mild to Severe",
          description: "Mosquito-borne illnesses including dengue, chikungunya, and Zika (rare in Egypt)",
          prevention: [
            "Use EPA-approved insect repellent",
            "Wear long sleeves and pants at dawn/dusk",
            "Stay in air-conditioned or screened areas",
            "Use bed nets if needed",
            "Remove standing water around accommodation",
            "Consider permethrin-treated clothing"
          ],
          treatment: [
            "Seek medical evaluation for fever",
            "Supportive care with rest and fluids",
            "Avoid aspirin for fever (dengue risk)",
            "Monitor for warning signs",
            "Follow up with healthcare provider",
            "Report illness to health authorities if needed"
          ]
        }
      ],
      medicalFacilities: [
        {
          type: "Private International Hospitals",
          quality: "Excellent",
          locations: "Cairo, Alexandria, major cities",
          services: ["Emergency care", "Specialist consultations", "Surgery", "Diagnostics"],
          languages: "English, Arabic, some French/German",
          insurance: "Most international insurance accepted",
          examples: [
            "Cairo Medical Center",
            "Nile Badrawi Hospital",
            "Dar Al Fouad Hospital",
            "Alexandria Medical Center"
          ],
          notes: "Highest quality care but most expensive option"
        },
        {
          type: "Public Hospitals",
          quality: "Variable",
          locations: "All cities and towns",
          services: ["Emergency care", "Basic medical services", "Surgery"],
          languages: "Primarily Arabic",
          insurance: "Limited international acceptance",
          examples: [
            "Qasr Al Aini Hospital",
            "Ain Shams University Hospital",
            "Alexandria Main University Hospital"
          ],
          notes: "More affordable but may have language barriers and longer waits"
        },
        {
          type: "Tourist Police Medical Units",
          quality: "Basic",
          locations: "Major tourist areas",
          services: ["First aid", "Basic treatment", "Medical referrals"],
          languages: "English, Arabic",
          insurance: "Varies",
          examples: [
            "Giza Tourist Police",
            "Luxor Tourist Medical Center",
            "Sharm El Sheikh Medical Unit"
          ],
          notes: "Convenient for minor issues in tourist areas"
        },
        {
          type: "Pharmacies",
          quality: "Good",
          locations: "Widespread in cities",
          services: ["Prescription medications", "Over-the-counter drugs", "Basic consultation"],
          languages: "Some English in tourist areas",
          insurance: "Cash payment typically required",
          examples: [
            "Seif Pharmacies",
            "El Ezaby Pharmacies",
            "Care Pharmacies"
          ],
          notes: "Many medications available without prescription"
        }
      ],
      healthInsurance: {
        importance: "Essential for all travelers",
        coverage: [
          "Emergency medical treatment",
          "Hospitalization",
          "Medical evacuation",
          "Prescription medications",
          "Emergency dental care",
          "Repatriation of remains"
        ],
        considerations: [
          "Verify coverage includes Egypt",
          "Check policy limits and deductibles",
          "Understand pre-authorization requirements",
          "Ensure adventure activities are covered",
          "Keep insurance documents accessible",
          "Know how to contact assistance services"
        ],
        recommendations: [
          "Choose comprehensive travel medical insurance",
          "Consider policies with medical evacuation",
          "Verify coverage for pre-existing conditions",
          "Check if regular health insurance covers travel",
          "Consider longer-term policies for extended stays",
          "Review exclusions carefully"
        ]
      },
      medications: {
        prescriptions: [
          "Bring adequate supply for entire trip plus extra",
          "Keep medications in original containers with labels",
          "Carry prescription letter from doctor",
          "Research import restrictions for controlled substances",
          "Pack medications in carry-on luggage",
          "Bring copies of prescriptions"
        ],
        travelKit: [
          {
            category: "Gastrointestinal",
            items: [
              "Anti-diarrheal medication (loperamide)",
              "Oral rehydration salts",
              "Probiotics",
              "Antacid tablets",
              "Anti-nausea medication"
            ]
          },
          {
            category: "Pain and Fever",
            items: [
              "Acetaminophen/paracetamol",
              "Ibuprofen",
              "Aspirin (if not contraindicated)",
              "Topical pain relief cream"
            ]
          },
          {
            category: "Respiratory",
            items: [
              "Cough suppressant",
              "Throat lozenges",
              "Decongestant",
              "Antihistamine for allergies"
            ]
          },
          {
            category: "Topical Care",
            items: [
              "Broad-spectrum sunscreen SPF 30+",
              "Insect repellent with DEET",
              "Antiseptic cream",
              "Hydrocortisone cream",
              "Lip balm with SPF"
            ]
          },
          {
            category: "First Aid",
            items: [
              "Adhesive bandages",
              "Gauze pads and tape",
              "Antiseptic wipes",
              "Thermometer",
              "Tweezers",
              "Disposable gloves"
            ]
          }
        ]
      },
      foodWaterSafety: {
        waterGuidelines: [
          "Drink only bottled water from sealed containers",
          "Avoid tap water, even for brushing teeth",
          "Use bottled water for ice cubes",
          "Be cautious with fountain drinks and fresh juices",
          "Consider water purification tablets as backup",
          "Check bottle seals are intact before purchasing"
        ],
        foodSafety: [
          "Choose hot, freshly cooked meals",
          "Avoid buffets that have been sitting out",
          "Eat fruits you can peel yourself",
          "Avoid raw vegetables unless you can peel them",
          "Be cautious with dairy products",
          "Avoid street food unless clearly safe and popular"
        ],
        restaurantTips: [
          "Choose busy restaurants with high turnover",
          "Observe food handling practices",
          "Ensure meat is thoroughly cooked",
          "Avoid rare or undercooked dishes",
          "Be cautious with seafood, especially shellfish",
          "Trust your instincts about food safety"
        ]
      },
      emergencyContacts: [
        {
          service: "Emergency Services",
          number: "122 (Police), 123 (Ambulance), 180 (Fire)",
          availability: "24/7",
          notes: "Arabic language, limited English"
        },
        {
          service: "Tourist Police",
          number: "126",
          availability: "24/7",
          notes: "English speaking, specifically for tourists"
        },
        {
          service: "US Embassy Cairo",
          number: "+20 2 2797-3300",
          availability: "Business hours, emergency after hours",
          notes: "American Citizen Services"
        },
        {
          service: "British Embassy Cairo",
          number: "+20 2 2791-6000",
          availability: "Business hours, emergency after hours",
          notes: "British Consular Services"
        },
        {
          service: "International SOS",
          number: "Check your insurance card",
          availability: "24/7",
          notes: "Medical assistance and evacuation services"
        }
      ],
      specialConsiderations: [
        {
          category: "Pregnant Travelers",
          advice: [
            "Consult healthcare provider before travel",
            "Ensure vaccinations are pregnancy-safe",
            "Consider malaria risk in some border areas",
            "Stay extra vigilant about food and water safety",
            "Have comprehensive travel insurance",
            "Know location of quality medical facilities"
          ]
        },
        {
          category: "Travelers with Chronic Conditions",
          advice: [
            "Bring detailed medical summary and contact information",
            "Ensure adequate medication supply plus extra",
            "Research medical facilities that treat your condition",
            "Consider medical alert bracelet",
            "Verify insurance coverage for existing conditions",
            "Plan for medication storage (refrigeration, etc.)"
          ]
        },
        {
          category: "Elderly Travelers",
          advice: [
            "Schedule pre-travel medical consultation",
            "Consider pneumonia and shingles vaccinations",
            "Plan for mobility and accessibility needs",
            "Ensure medications are clearly labeled",
            "Consider travel with medical companion",
            "Research geriatric-friendly medical facilities"
          ]
        },
        {
          category: "Adventure Travelers",
          advice: [
            "Consider rabies pre-exposure prophylaxis",
            "Ensure insurance covers adventure activities",
            "Bring enhanced first aid supplies",
            "Know evacuation procedures for remote areas",
            "Consider satellite communication device",
            "Research rescue services availability"
          ]
        }
      ]
    }
  },
  "shopping-bargaining": {
    title: "Shopping & Bargaining in Egypt",
    description: "Complete guide to Egyptian markets, shopping destinations, bargaining techniques, and authentic souvenirs",
    category: "Cultural",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Shopping in Egypt is an adventure that combines ancient traditions with modern commerce. From bustling bazaars to contemporary malls, Egypt offers unique treasures and memorable experiences. Master the art of bargaining and discover authentic Egyptian crafts, spices, and souvenirs.",
      shoppingDestinations: [
        {
          location: "Khan El Khalili Bazaar, Cairo",
          type: "Traditional Market",
          atmosphere: "Historic and bustling",
          specialty: "Traditional crafts, jewelry, textiles",
          description: "Cairo's most famous bazaar dating back to the 14th century",
          highlights: [
            "Traditional Egyptian crafts and artifacts",
            "Gold and silver jewelry",
            "Handwoven textiles and carpets", 
            "Spices and traditional perfumes",
            "Papyrus artwork and souvenirs"
          ],
          bargainingLevel: "High - Start at 30-40% of asking price",
          tips: [
            "Visit early morning or late afternoon for better prices",
            "Compare prices across multiple shops",
            "Don't show excessive interest initially",
            "Be prepared to walk away",
            "Bring cash for better deals"
          ],
          location_details: {
            hours: "9:00 AM - 10:00 PM daily",
            access: "Metro to Ataba station + short walk",
            nearby: "Al-Azhar Mosque, Islamic Cairo"
          }
        },
        {
          location: "Aswan Souk",
          type: "Traditional Market",
          atmosphere: "Relaxed Nubian culture",
          specialty: "Nubian crafts, spices, textiles",
          description: "Colorful market reflecting Nubian heritage and culture",
          highlights: [
            "Authentic Nubian handicrafts",
            "Colorful textiles and scarves",
            "Traditional Nubian jewelry",
            "Henna and natural beauty products",
            "Local spices and herbs"
          ],
          bargainingLevel: "Moderate - Start at 40-50% of asking price",
          tips: [
            "Learn basic Nubian greetings",
            "Appreciate the cultural significance of items",
            "Support local Nubian artisans",
            "Ask about the story behind crafts",
            "Respect cultural traditions"
          ],
          location_details: {
            hours: "8:00 AM - 9:00 PM daily",
            access: "Walking distance from Nile Corniche",
            nearby: "Nubian villages, Elephantine Island"
          }
        },
        {
          location: "Luxor Market",
          type: "Tourist-focused Market",
          atmosphere: "Vibrant and tourist-friendly",
          specialty: "Souvenirs, alabaster, replicas",
          description: "Convenient market near major tourist attractions",
          highlights: [
            "Alabaster statues and artifacts",
            "Papyrus paintings and scrolls",
            "Egyptian cotton products",
            "Replica ancient artifacts",
            "Traditional Egyptian clothing"
          ],
          bargainingLevel: "High - Start at 25-35% of asking price",
          tips: [
            "Higher prices due to tourist location",
            "Quality varies significantly",
            "Check authenticity certificates",
            "Compare with other vendors",
            "Negotiate package deals for multiple items"
          ],
          location_details: {
            hours: "8:00 AM - 11:00 PM daily",
            access: "Near Valley of the Kings entrance",
            nearby: "Karnak Temple, Luxor Temple"
          }
        },
        {
          location: "City Stars Mall, Cairo",
          type: "Modern Shopping Mall",
          atmosphere: "Contemporary and air-conditioned",
          specialty: "International brands, electronics, fashion",
          description: "Middle East's largest shopping mall with fixed prices",
          highlights: [
            "International fashion brands",
            "Electronics and gadgets",
            "Food courts and restaurants",
            "Entertainment facilities",
            "Local Egyptian brands"
          ],
          bargainingLevel: "None - Fixed prices",
          tips: [
            "No bargaining in modern malls",
            "Credit cards widely accepted",
            "Sales during Ramadan and holidays",
            "Tax-free shopping for tourists",
            "Good for air-conditioned shopping"
          ],
          location_details: {
            hours: "10:00 AM - 12:00 AM daily",
            access: "Metro to Heliopolis + taxi",
            nearby: "Cairo Airport, New Cairo"
          }
        }
      ],
      bargainingTechniques: {
        basicPrinciples: [
          "Always bargain with a smile and respect",
          "Start at 25-40% of the initial asking price",
          "Be prepared to walk away - it's part of the process",
          "Show genuine interest but not desperation",
          "Bargain for quality, not just price",
          "Cash payments often secure better deals"
        ],
        stepByStep: [
          {
            step: 1,
            action: "Initial Interest",
            description: "Browse casually without showing excessive enthusiasm",
            tips: ["Don't pick up items immediately", "Ask general questions", "Compare multiple items"]
          },
          {
            step: 2,
            action: "Price Inquiry",
            description: "Ask for the price while examining the item carefully",
            tips: ["Check quality and authenticity", "Point out any flaws", "Ask about the material/origin"]
          },
          {
            step: 3,
            action: "Counter Offer",
            description: "Make your initial offer at 25-40% of asking price",
            tips: ["Justify your price with quality concerns", "Mention prices at other shops", "Stay friendly but firm"]
          },
          {
            step: 4,
            action: "Negotiation",
            description: "Engage in back-and-forth discussion",
            tips: ["Increase offer gradually", "Bundle multiple items", "Use cultural compliments appropriately"]
          },
          {
            step: 5,
            action: "Walking Away",
            description: "Politely prepare to leave if price isn't acceptable",
            tips: ["Thank the seller genuinely", "Leave your final offer", "Often they'll call you back"]
          },
          {
            step: 6,
            action: "Final Agreement",
            description: "Reach a mutually acceptable price",
            tips: ["Confirm all details", "Check the item again", "Pay the agreed amount promptly"]
          }
        ],
        culturalTips: [
          "Learn basic Arabic greetings and numbers",
          "Show respect for craftsmanship and tradition",
          "Accept tea or coffee if offered - it's hospitality",
          "Don't bargain aggressively or rudely",
          "Understand that bargaining is a social interaction",
          "Tip: 'Shukran' (thank you) goes a long way"
        ]
      },
      authenticSouvenirs: [
        {
          item: "Egyptian Cotton Products",
          authenticity: "High",
          priceRange: "50-500 EGP",
          quality_indicators: [
            "Long staple cotton feel",
            "Smooth, lustrous appearance",
            "Lightweight yet durable",
            "Egyptian Cotton Authority certification"
          ],
          best_places: ["Khan El Khalili", "Cotton specialty shops", "Textile districts"],
          bargaining_potential: "Moderate",
          tips: [
            "Check thread count and weave quality",
            "Feel the fabric texture",
            "Look for Egyptian Cotton trademark",
            "Compare prices across multiple vendors"
          ]
        },
        {
          item: "Papyrus Artwork",
          authenticity: "Variable - many fakes",
          priceRange: "20-300 EGP",
          quality_indicators: [
            "Made from genuine papyrus plant",
            "Rough, fibrous texture",
            "Natural color variations",
            "Hand-painted details"
          ],
          best_places: ["Papyrus Institute", "Khan El Khalili", "Giza workshops"],
          bargaining_potential: "High",
          tips: [
            "Genuine papyrus can be torn in straight lines",
            "Avoid banana leaf imitations",
            "Ask for demonstration of authenticity",
            "Support certified papyrus makers"
          ]
        },
        {
          item: "Spices and Herbs",
          authenticity: "Generally high",
          priceRange: "10-100 EGP per package",
          quality_indicators: [
            "Strong, fresh aroma",
            "Vibrant natural colors",
            "Proper packaging and labeling",
            "No artificial additives"
          ],
          best_places: ["Spice markets", "Khan El Khalili", "Local souks"],
          bargaining_potential: "Moderate",
          tips: [
            "Smell before buying",
            "Check expiration dates",
            "Buy whole spices when possible",
            "Ask about grinding services"
          ]
        },
        {
          item: "Jewelry (Gold/Silver)",
          authenticity: "Requires expertise",
          priceRange: "100-5000+ EGP",
          quality_indicators: [
            "Proper hallmarking",
            "Weight corresponds to quoted karat",
            "Professional craftsmanship",
            "Government certification"
          ],
          best_places: ["Gold Quarter Khan El Khalili", "Licensed jewelry shops", "Hotel jewelry stores"],
          bargaining_potential: "High for craftsmanship, low for gold weight",
          tips: [
            "Verify gold/silver content",
            "Get written certificates",
            "Compare market prices for metals",
            "Negotiate craftsmanship fees separately"
          ]
        },
        {
          item: "Traditional Textiles",
          authenticity: "Generally good",
          priceRange: "30-800 EGP",
          quality_indicators: [
            "Hand-woven patterns",
            "Natural fiber content",
            "Traditional Egyptian designs",
            "Quality of dyes and colors"
          ],
          best_places: ["Traditional markets", "Weaving cooperatives", "Nubian villages"],
          bargaining_potential: "High",
          tips: [
            "Check for hand-woven vs machine-made",
            "Feel fabric quality and thickness",
            "Ask about washing instructions",
            "Support local artisan cooperatives"
          ]
        }
      ],
      shoppingSafety: [
        {
          concern: "Overcharging",
          prevention: [
            "Research typical prices beforehand",
            "Shop with local guides when possible",
            "Compare prices across multiple vendors",
            "Ask fellow travelers for price references",
            "Use Egyptian pounds to avoid exchange rate manipulation"
          ],
          red_flags: [
            "Prices quoted only in USD/EUR",
            "Refusal to negotiate at all",
            "Pressure tactics or time limits",
            "Claims of 'special friend price'",
            "Prices significantly higher than elsewhere"
          ]
        },
        {
          concern: "Counterfeit Goods",
          prevention: [
            "Buy from reputable, established shops",
            "Ask for authenticity certificates",
            "Learn to identify quality indicators",
            "Avoid deals that seem too good to be true",
            "Purchase expensive items from licensed dealers"
          ],
          red_flags: [
            "Extremely low prices for luxury items",
            "Poor quality materials or construction",
            "Misspelled brand names or logos",
            "Vendor reluctance to provide documentation",
            "Items sold from street corners or alleys"
          ]
        },
        {
          concern: "Tourist Scams",
          prevention: [
            "Shop independently when possible",
            "Ignore touts and pushy guides",
            "Don't follow strangers to 'special' shops",
            "Set clear budget limits beforehand",
            "Learn basic Arabic numbers and phrases"
          ],
          red_flags: [
            "Unsolicited shopping guides",
            "Claims of closing sales or final days",
            "Requests for advance payments",
            "Pressure to buy immediately",
            "Stories designed to create urgency"
          ]
        }
      ],
      paymentMethods: [
        {
          method: "Cash (Egyptian Pounds)",
          acceptance: "Universal",
          advantages: ["Better bargaining power", "No transaction fees", "Immediate transactions"],
          disadvantages: ["Theft risk", "Need for exact change", "Currency exchange needed"],
          tips: [
            "Always carry small denominations",
            "Keep cash in multiple locations",
            "Count change carefully",
            "Negotiate better rates with cash"
          ]
        },
        {
          method: "US Dollars",
          acceptance: "Tourist areas and major purchases",
          advantages: ["Widely recognized", "Good for expensive items", "No exchange needed initially"],
          disadvantages: ["Poor exchange rates", "Limited acceptance", "Change given in EGP"],
          tips: [
            "Bring clean, newer bills",
            "Use for major purchases only",
            "Confirm exchange rate beforehand",
            "Keep receipts for records"
          ]
        },
        {
          method: "Credit Cards",
          acceptance: "Modern shops and malls only",
          advantages: ["Security", "No cash needed", "Purchase protection"],
          disadvantages: ["Limited acceptance", "Transaction fees", "No bargaining advantage"],
          tips: [
            "Verify card acceptance first",
            "Check foreign transaction fees",
            "Keep receipts for verification",
            "Have cash backup available"
          ]
        }
      ],
      marketEtiquette: [
        "Greet vendors politely with 'Ahlan wa sahlan' (welcome)",
        "Accept hospitality like tea, but don't feel obligated to buy",
        "Dress modestly, especially in traditional markets",
        "Don't touch items unless seriously interested",
        "Be patient - shopping is a social experience",
        "Show respect for local customs and traditions",
        "Don't photograph people without permission",
        "Keep negotiations friendly and respectful",
        "Thank vendors even if you don't purchase",
        "Support local artisans and cooperatives when possible"
      ],
      seasonalShopping: [
        {
          season: "Peak Tourist Season (Oct-Apr)",
          characteristics: [
            "Higher prices due to tourist demand",
            "Better selection and fresher inventory",
            "More competitive vendor atmosphere",
            "Extended shopping hours"
          ],
          strategies: [
            "Shop early morning for better service",
            "Compare prices more carefully",
            "Consider shopping in less touristy areas",
            "Book cultural shopping tours in advance"
          ]
        },
        {
          season: "Low Season (May-Sep)",
          characteristics: [
            "Lower prices and better bargaining",
            "Reduced inventory in some shops",
            "More personalized attention from vendors",
            "Shorter operating hours due to heat"
          ],
          strategies: [
            "Take advantage of lower competition",
            "Shop during cooler morning/evening hours",
            "Negotiate more aggressively",
            "Focus on indoor air-conditioned markets"
          ]
        },
        {
          season: "Ramadan Period",
          characteristics: [
            "Modified shopping hours",
            "Special Ramadan sales and promotions",
            "Different market atmosphere",
            "Unique seasonal items available"
          ],
          strategies: [
            "Shop during non-fasting hours",
            "Respect religious observances",
            "Look for special Ramadan discounts",
            "Be patient with adjusted schedules"
          ]
        }
      ]
    }
  },
  "family-friendly-egypt": {
    title: "Family-Friendly Egypt Travel Guide",
    description: "Complete guide for traveling to Egypt with children - attractions, safety, accommodations, and practical tips for memorable family adventures",
    category: "Family Travel",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers incredible family adventures combining education, entertainment, and cultural immersion. From exploring ancient pyramids to sailing the Nile, Egypt provides unique experiences that captivate children and adults alike. This guide covers everything needed for safe, enjoyable family travel in Egypt.",
      kidFriendlyAttractions: [
        {
          attraction: "Giza Pyramid Complex",
          location: "Cairo",
          ageRange: "5+ years",
          duration: "3-4 hours",
          highlights: [
            "Great Pyramid exploration (limited climbing)",
            "Sphinx photo opportunities",
            "Camel rides around pyramids",
            "Solar boat museum",
            "Interactive visitor center"
          ],
          familyTips: [
            "Visit early morning to avoid heat and crowds",
            "Bring water and snacks for children",
            "Camel rides are exciting but supervise young children",
            "Pyramid interior may be claustrophobic for some kids",
            "Allow time for rest breaks"
          ],
          educational_value: "Ancient engineering, Egyptian history, mathematical concepts",
          accessibility: "Moderate - uneven terrain, stairs in pyramids",
          cost: "Moderate to high with camel rides and special entry tickets"
        },
        {
          attraction: "Egyptian Museum",
          location: "Cairo",
          ageRange: "6+ years",
          duration: "2-3 hours",
          highlights: [
            "Tutankhamun's treasure collection",
            "Mummy rooms (additional ticket)",
            "Interactive displays",
            "Ancient toys and games exhibit",
            "Family-friendly guided tours available"
          ],
          familyTips: [
            "Book family-specific guided tours",
            "Focus on highlights rather than entire museum",
            "Mummy rooms may frighten young children",
            "Bring stroller for tired feet",
            "Museum shop has educational souvenirs"
          ],
          educational_value: "Ancient Egyptian civilization, archaeology, art history",
          accessibility: "Good - elevators available, stroller-friendly",
          cost: "Low to moderate (mummy rooms extra)"
        },
        {
          attraction: "Luxor's Karnak Temple",
          location: "Luxor",
          ageRange: "4+ years",
          duration: "2-3 hours",
          highlights: [
            "Massive stone columns",
            "Sound and light show (evening)",
            "Sacred lake",
            "Hieroglyphic walls",
            "Open courtyards for children to explore"
          ],
          familyTips: [
            "Sound and light show is magical for kids",
            "Wear comfortable walking shoes",
            "Bring flashlight for darker areas",
            "Create treasure hunt with hieroglyphs",
            "Evening visits are cooler"
          ],
          educational_value: "Ancient religious practices, architecture, storytelling",
          accessibility: "Moderate - uneven ancient stones",
          cost: "Low (sound and light show additional)"
        },
        {
          attraction: "Nile River Cruise",
          location: "Luxor to Aswan",
          ageRange: "All ages",
          duration: "3-7 days",
          highlights: [
            "Family-friendly cruise ships",
            "Pool and entertainment areas",
            "Shore excursions to temples",
            "Traditional felucca sailing",
            "Onboard cultural activities"
          ],
          familyTips: [
            "Choose family-oriented cruise lines",
            "Book connecting rooms or family suites",
            "Pack motion sickness remedies",
            "Kids' clubs available on larger ships",
            "Flexible dining options important"
          ],
          educational_value: "Geography, river ecosystems, ancient trade routes",
          accessibility: "Excellent - elevators, family facilities",
          cost: "High but all-inclusive"
        },
        {
          attraction: "Red Sea Beaches",
          location: "Hurghada/Sharm El Sheikh",
          ageRange: "All ages",
          duration: "1-7 days",
          highlights: [
            "Family resorts with kids' clubs",
            "Snorkeling in shallow waters",
            "Glass-bottom boat trips",
            "Beach activities and water sports",
            "Marine life observation"
          ],
          familyTips: [
            "Choose family-friendly all-inclusive resorts",
            "High SPF sunscreen essential",
            "Life jackets for non-swimmers",
            "Avoid deep water snorkeling with young kids",
            "Resort entertainment programs available"
          ],
          educational_value: "Marine biology, conservation, geography",
          accessibility: "Excellent - resort facilities designed for families",
          cost: "Moderate to high depending on resort"
        },
        {
          attraction: "Aswan High Dam & Philae Temple",
          location: "Aswan",
          ageRange: "8+ years",
          duration: "Half day",
          highlights: [
            "Modern engineering marvel",
            "Boat ride to Philae Temple",
            "UNESCO World Heritage site",
            "Lake Nasser views",
            "Engineering education opportunities"
          ],
          familyTips: [
            "Boat ride is exciting for children",
            "Combine with Nubian village visit",
            "Wear sun protection",
            "Good introduction to modern vs ancient Egypt",
            "Photo opportunities with family"
          ],
          educational_value: "Modern engineering, ancient preservation, geography",
          accessibility: "Good - boat transport available",
          cost: "Low to moderate"
        }
      ],
      familyAccommodations: [
        {
          type: "Family-Friendly Hotels",
          features: [
            "Connecting rooms or family suites",
            "Kids' clubs and supervised activities",
            "Children's pools and play areas",
            "Babysitting services",
            "Family dining options with kids' menus"
          ],
          recommendations: [
            "Major international hotel chains in Cairo and tourist areas",
            "All-inclusive Red Sea resorts with family programs",
            "Nile view hotels with family amenities",
            "Boutique hotels with family-oriented services"
          ],
          tips: [
            "Book family rooms in advance",
            "Verify kids' club age requirements",
            "Check pool safety measures",
            "Ask about cribs and high chairs",
            "Confirm family-friendly dining hours"
          ]
        },
        {
          type: "Nile Cruise Ships",
          features: [
            "Family cabins with additional beds",
            "Children's entertainment programs",
            "Pool areas suitable for kids",
            "Flexible meal times",
            "Educational activities onboard"
          ],
          recommendations: [
            "5-star cruise lines with family programs",
            "Ships with dedicated kids' areas",
            "Shorter 3-4 day cruises for families with young children",
            "Cruise lines offering shore excursion modifications for families"
          ],
          tips: [
            "Choose lower deck cabins for easier access",
            "Pack motion sickness remedies",
            "Bring familiar snacks for picky eaters",
            "Book shore excursions suitable for children",
            "Consider private balcony rooms for family space"
          ]
        },
        {
          type: "Beach Resorts",
          features: [
            "All-inclusive family packages",
            "Kids' clubs with age-appropriate programs",
            "Shallow swimming areas",
            "Water sports suitable for children",
            "Entertainment shows and activities"
          ],
          recommendations: [
            "Red Sea resorts in Hurghada and Sharm El Sheikh",
            "Resorts with family-oriented entertainment",
            "Properties with multiple restaurant options",
            "Resorts offering snorkeling lessons for children"
          ],
          tips: [
            "Verify kids' club operating hours",
            "Check beach safety flags and lifeguard presence",
            "Book resorts with medical facilities",
            "Consider resorts with lazy rivers or water slides",
            "Ensure room refrigerators for storing medications"
          ]
        }
      ],
      travelSafety: {
        health_precautions: [
          {
            concern: "Food and Water Safety",
            precautions: [
              "Stick to bottled water for drinking and teeth brushing",
              "Avoid ice in drinks unless from reputable hotels",
              "Choose well-cooked foods from established restaurants",
              "Pack familiar snacks for picky eaters",
              "Avoid street food for young children"
            ],
            emergency_tips: [
              "Pack oral rehydration salts for stomach upsets",
              "Bring familiar medications from home",
              "Know location of nearest hospital",
              "Have pediatrician contact information available",
              "Pack thermometer and basic first aid supplies"
            ]
          },
          {
            concern: "Sun and Heat Protection",
            precautions: [
              "High SPF sunscreen (30+ minimum)",
              "Protective clothing and wide-brimmed hats",
              "Sunglasses for children",
              "Frequent water breaks and shade seeking",
              "Avoid outdoor activities during peak heat (11am-3pm)"
            ],
            emergency_tips: [
              "Recognize signs of heat exhaustion",
              "Immediate cooling measures available",
              "Seek air-conditioned environments during heat",
              "Electrolyte replacement drinks for active children",
              "Plan indoor activities during hottest hours"
            ]
          },
          {
            concern: "Crowd and Site Safety",
            precautions: [
              "Keep children close in crowded tourist areas",
              "Use family meeting points if separated",
              "Dress children in bright colors for visibility",
              "Consider child harnesses for very young children",
              "Teach children basic Arabic phrases for help"
            ],
            emergency_tips: [
              "Have current photos of children available",
              "Write hotel information in Arabic and English",
              "Program important numbers into children's phones",
              "Know location of tourist police in major sites",
              "Establish clear rules about staying together"
            ]
          }
        ],
        vaccination_requirements: [
          "Ensure routine vaccinations are up to date",
          "Hepatitis A recommended for all travelers",
          "Typhoid vaccination for longer stays",
          "Yellow fever only if coming from endemic areas",
          "Consult pediatrician 4-6 weeks before travel"
        ],
        medical_preparation: [
          "Pack prescription medications with extra supply",
          "Bring pediatric dosage charts for common medications",
          "Include motion sickness remedies",
          "Pack thermometer and basic first aid kit",
          "Research pediatric medical facilities at destination"
        ]
      },
      practicalTips: {
        packing_essentials: [
          {
            category: "Clothing and Gear",
            items: [
              "Lightweight, long-sleeved shirts for sun protection",
              "Comfortable walking shoes with good support",
              "Sandals suitable for sand and water",
              "Wide-brimmed hats and sunglasses",
              "Light jacket for air-conditioned spaces"
            ]
          },
          {
            category: "Health and Safety",
            items: [
              "High SPF sunscreen and lip balm",
              "Insect repellent suitable for children",
              "First aid kit with pediatric medications",
              "Thermometer and hand sanitizer",
              "Oral rehydration salts"
            ]
          },
          {
            category: "Entertainment and Comfort",
            items: [
              "Travel games and activity books",
              "Tablet with downloaded movies and educational content",
              "Familiar snacks and comfort foods",
              "Favorite toy or blanket for comfort",
              "Portable phone chargers and adapters"
            ]
          },
          {
            category: "Documentation",
            items: [
              "Passports with at least 6 months validity",
              "Visa documents (if required)",
              "Travel insurance with family coverage",
              "Medical records and prescription information",
              "Emergency contact information in Arabic and English"
            ]
          }
        ],
        transportation_tips: [
          "Private transfers more comfortable than public transport",
          "Car seats may not be standard - consider bringing own",
          "Domestic flights can save time with children",
          "Train travel offers scenic routes but longer journey times",
          "Organized tours can handle logistics while families enjoy experiences"
        ],
        cultural_preparation: [
          "Learn basic Arabic phrases together as a family",
          "Research Egyptian history and mythology before visiting",
          "Discuss cultural differences and respectful behavior",
          "Read age-appropriate books about ancient Egypt",
          "Prepare children for different sights, sounds, and smells"
        ]
      },
      budgetingTips: {
        cost_breakdown: [
          {
            category: "Accommodation",
            family_considerations: [
              "Family rooms typically 25-40% more than double rooms",
              "All-inclusive resorts can provide better value for families",
              "Connecting rooms offer privacy while keeping family close",
              "Apartments with kitchenettes help with familiar foods",
              "Kids under 12 often stay free with parents"
            ],
            average_costs: "Family rooms: $80-300/night depending on location and season"
          },
          {
            category: "Transportation",
            family_considerations: [
              "Private transfers more expensive but convenient with luggage and kids",
              "Domestic flights save time but add to budget",
              "Car rentals with proper car seats challenging",
              "Tour group transport often family-friendly",
              "Taxi rides should be negotiated for longer distances"
            ],
            average_costs: "Private airport transfers: $20-50, Domestic flights: $100-200 per person"
          },
          {
            category: "Activities and Attractions",
            family_considerations: [
              "Children under 6 often free at most attractions",
              "Student discounts available for older children",
              "Private guides cost more but provide family-focused experiences",
              "Sound and light shows popular with children but additional cost",
              "Beach activities and water sports add up quickly"
            ],
            average_costs: "Major site entry: $10-25 per adult, $5-10 per child"
          },
          {
            category: "Food and Dining",
            family_considerations: [
              "Hotel restaurants safer but more expensive",
              "Familiar food chains available in major cities",
              "All-inclusive packages eliminate meal planning stress",
              "Room service helpful for early children's bedtimes",
              "Local markets good for familiar snacks and fruits"
            ],
            average_costs: "Family meal at mid-range restaurant: $20-40"
          }
        ],
        money_saving_tips: [
          "Travel during shoulder seasons for better rates",
          "Book family packages that include meals and activities",
          "Stay in apartments with kitchenettes for some meal preparation",
          "Take advantage of free kids' promotions",
          "Use hotel pools and facilities rather than paid water parks",
          "Pack familiar snacks to avoid expensive tourist area food",
          "Choose all-inclusive resorts for predictable budgeting"
        ]
      },
      ageSpecificGuidance: [
        {
          age_group: "Toddlers (2-4 years)",
          recommendations: [
            "Short site visits (1-2 hours maximum)",
            "Stroller essential for tired legs",
            "Nap schedule accommodation crucial",
            "Familiar foods and snacks important",
            "Pool time and play areas priority"
          ],
          attractions: [
            "Pyramid exterior and camel rides",
            "Nile felucca boat rides",
            "Beach and pool activities",
            "Hotel entertainment shows",
            "Simple temple courtyards"
          ],
          challenges: [
            "Heat intolerance higher",
            "Frequent bathroom needs",
            "Irregular eating patterns",
            "Potential meltdowns in crowds",
            "Safety concerns with ancient sites"
          ]
        },
        {
          age_group: "Elementary Age (5-10 years)",
          recommendations: [
            "Educational preparation enhances experience",
            "Treasure hunts and games make sites engaging",
            "Mix of cultural sites and fun activities",
            "Hands-on experiences preferred",
            "Shorter attention spans require variety"
          ],
          attractions: [
            "Pyramid interiors (if not claustrophobic)",
            "Egyptian Museum highlights",
            "Interactive temple explorations",
            "Nile cruise with kids' programs",
            "Snorkeling in shallow waters"
          ],
          challenges: [
            "May find some sites boring without context",
            "Need frequent breaks and snacks",
            "Safety awareness still developing",
            "Peer influence on interest levels",
            "Physical stamina varies widely"
          ]
        },
        {
          age_group: "Tweens/Teens (11+ years)",
          recommendations: [
            "Involve in trip planning process",
            "Photography opportunities important",
            "Historical context more appreciated",
            "Adventure activities possible",
            "Social media sharing considerations"
          ],
          attractions: [
            "All major historical sites",
            "Adventure activities like desert safaris",
            "Diving and advanced water sports",
            "Cultural immersion experiences",
            "Independent exploration with supervision"
          ],
          challenges: [
            "May prefer peer activities over family time",
            "Technology expectations in remote areas",
            "Cultural sensitivity awareness needed",
            "Body image concerns in conservative culture",
            "Romantic interest complications"
          ]
        }
      ],
      emergencyProcedures: [
        {
          situation: "Medical Emergency",
          immediate_actions: [
            "Contact hotel concierge or tour guide for assistance",
            "Call tourist police: 126 (available in multiple languages)",
            "Major hospitals in Cairo: 57357 (Children's Cancer Hospital), Ain Shams University Hospital",
            "Private hospitals generally better equipped",
            "Contact travel insurance provider immediately"
          ],
          preparation: [
            "Research pediatric facilities before arrival",
            "Have insurance policy numbers readily available",
            "Know location of nearest embassy/consulate",
            "Keep emergency contacts in Arabic and English",
            "Pack copies of important medical records"
          ]
        },
        {
          situation: "Lost Child",
          immediate_actions: [
            "Alert tourist police and site security immediately",
            "Return to last known location",
            "Use hotel/ship staff for assistance",
            "Check kids' clubs and entertainment areas",
            "Contact embassy if situation escalates"
          ],
          preparation: [
            "Dress children in bright, identifiable clothing",
            "Take daily photos of children's outfits",
            "Teach children hotel name and room number",
            "Establish meeting points at major sites",
            "Consider GPS tracking devices for young children"
          ]
        },
        {
          situation: "Natural Disaster/Political Unrest",
          immediate_actions: [
            "Follow embassy guidelines and travel advisories",
            "Stay in hotel unless explicitly directed otherwise",
            "Register with embassy upon arrival",
            "Monitor reliable news sources",
            "Prepare for potential evacuation"
          ],
          preparation: [
            "Purchase comprehensive travel insurance",
            "Register with government travel programs",
            "Have evacuation plans and funds available",
            "Keep important documents in hotel safe",
            "Maintain communication with family at home"
          ]
        }
      ]
    }
  },
  "women-travellers-tips": {
    title: "Women Travellers' Guide to Egypt",
    description: "Essential safety tips, cultural guidance, and practical advice for women exploring Egypt confidently and respectfully",
    category: "Safety & Culture",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt is an incredible destination for women travelers, offering rich history, stunning landscapes, and warm hospitality. While the experience can be rewarding, understanding local customs, safety considerations, and practical tips will help ensure a confident and enjoyable journey. This guide provides comprehensive advice for solo female travelers and women traveling in groups.",
      culturalConsiderations: {
        dressingAppropriately: [
          {
            setting: "Religious Sites (Mosques, Churches)",
            requirements: [
              "Cover shoulders, arms, and legs completely",
              "Long pants or maxi skirts (no shorts or mini skirts)",
              "Loose-fitting clothing that doesn't cling to body",
              "Head covering required for mosques (scarf provided at entrance)",
              "Remove shoes before entering mosque prayer areas"
            ],
            tips: [
              "Carry a lightweight scarf for unexpected mosque visits",
              "Maxi dresses with cardigan work well",
              "Avoid see-through fabrics",
              "Respect photography restrictions"
            ]
          },
          {
            setting: "General Tourism (Markets, Streets, Restaurants)",
            requirements: [
              "Cover shoulders and avoid low necklines",
              "Pants, capris, or knee-length skirts acceptable",
              "Avoid tight-fitting or revealing clothing",
              "Comfortable closed-toe shoes recommended",
              "Light layers for air-conditioned spaces"
            ],
            tips: [
              "Loose, flowy clothing is both appropriate and comfortable",
              "Linen and cotton breathe well in the heat",
              "Bright colors and patterns are welcome",
              "Modest doesn't mean boring - express your style respectfully"
            ]
          },
          {
            setting: "Beach/Resort Areas (Red Sea)",
            requirements: [
              "Swimwear appropriate at resort pools and beaches",
              "Cover up when leaving beach/pool areas",
              "One-piece suits or modest bikinis preferred",
              "Beach cover-ups or sarongs essential",
              "Respect local sensibilities even in tourist areas"
            ],
            tips: [
              "All-inclusive resorts more relaxed about swimwear",
              "Public beaches may be more conservative",
              "Bring multiple cover-up options",
              "Sun protection important regardless of modesty"
            ]
          }
        ],
        socialInteractions: [
          {
            situation: "Interacting with Local Men",
            guidelines: [
              "Polite but firm boundaries are respected",
              "Direct eye contact can be misinterpreted - brief and respectful",
              "Handshakes not always expected - follow their lead",
              "Wedding ring (real or fake) can deter unwanted attention",
              "Confident body language important"
            ],
            phrases: [
              "'La, shukran' (No, thank you) - firm but polite",
              "'Maafeeish' (Not available/not interested)",
              "'Khalas' (Enough/stop) - when being persistent",
              "'Ana mutazawiga' (I am married) - if helpful"
            ]
          },
          {
            situation: "Shopping and Bargaining",
            guidelines: [
              "Women can bargain just as effectively as men",
              "Don't accept tea/coffee if it makes you uncomfortable",
              "Bring a friend for moral support if preferred",
              "Trust your instincts about seller behavior",
              "Know when to walk away"
            ],
            strategies: [
              "Start conversations about culture, not just business",
              "Compliment craftsmanship before discussing price",
              "Use humor appropriately during negotiations",
              "Don't be afraid to be assertive about your budget"
            ]
          },
          {
            situation: "Photography Etiquette",
            guidelines: [
              "Always ask permission before photographing people",
              "Some women may not want to be photographed",
              "Respect 'no photography' signs at religious sites",
              "Be discrete when taking photos in markets",
              "Offer to send photos to people you've photographed"
            ],
            considerations: [
              "Tourist areas more accustomed to cameras",
              "Children's photos require parent permission",
              "Religious ceremonies may have restrictions",
              "Street photography requires cultural sensitivity"
            ]
          }
        ]
      },
      safetyGuidelines: {
        personalSafety: [
          {
            category: "Accommodation Safety",
            precautions: [
              "Book reputable hotels with good reviews from female travelers",
              "Request rooms on higher floors but not too isolated",
              "Verify door locks and security features upon arrival",
              "Keep hotel contact information with you at all times",
              "Inform hotel staff of your daily plans if traveling solo"
            ],
            red_flags: [
              "Hotels with only male staff and no female guests",
              "Accommodations that seem uncomfortable with solo female guests",
              "Rooms with windows that don't lock securely",
              "Properties without 24-hour reception",
              "Hotels in areas with poor lighting or isolation"
            ]
          },
          {
            category: "Transportation Safety",
            precautions: [
              "Use reputable taxi companies or hotel-arranged transport",
              "Sit in back seat of taxis, never front passenger seat",
              "Share ride details with someone you trust",
              "Keep phone charged and accessible",
              "Have destination address written in Arabic"
            ],
            options: [
              "Uber/Careem available in major cities (safer option)",
              "Hotel transfers most secure but more expensive",
              "Tourist buses with guides for longer distances",
              "Women-only train cars available on some routes",
              "Domestic flights for long distances"
            ]
          },
          {
            category: "Street Safety",
            precautions: [
              "Stay aware of surroundings, especially in crowded areas",
              "Keep valuables secure and hidden",
              "Avoid walking alone after dark",
              "Trust your instincts if situation feels uncomfortable",
              "Know location of nearest police station or tourist police"
            ],
            strategies: [
              "Walk with confidence and purpose",
              "Avoid displaying expensive jewelry or electronics",
              "Keep emergency contacts easily accessible",
              "Learn basic Arabic phrases for help",
              "Carry whistle or personal alarm if it makes you feel safer"
            ]
          }
        ],
        harassment_prevention: [
          {
            type: "Verbal Harassment",
            prevention: [
              "Ignore catcalls and comments - don't engage",
              "Wear sunglasses to avoid unwanted eye contact",
              "Walk with confidence and purpose",
              "Use headphones to signal you're not available for conversation",
              "Stay in well-populated, well-lit areas"
            ],
            response: [
              "Don't feel obligated to be polite to harassers",
              "Firmly say 'La' (No) and continue walking",
              "Seek help from other women or families nearby",
              "Enter a shop or restaurant if feeling threatened",
              "Contact tourist police if harassment persists"
            ]
          },
          {
            type: "Physical Harassment",
            prevention: [
              "Maintain personal space in crowded areas",
              "Be extra cautious during festivals or crowded events",
              "Avoid being alone in secluded tourist sites",
              "Trust your instincts about people and situations",
              "Consider traveling with a companion for peace of mind"
            ],
            response: [
              "Make noise and draw attention if touched inappropriately",
              "Firmly tell the person to stop in Arabic: 'Bas!' (Stop!)",
              "Seek immediate help from nearby people",
              "Report incidents to tourist police",
              "Don't blame yourself - it's not your fault"
            ]
          }
        ],
        emergency_procedures: [
          {
            emergency: "Lost or Stolen Documents",
            immediate_steps: [
              "Report to local police and get a police report",
              "Contact your embassy or consulate immediately",
              "Notify your bank and credit card companies",
              "Contact accommodation to secure your belongings",
              "Keep digital copies of important documents accessible"
            ],
            prevention: [
              "Keep passport copies separate from original",
              "Store digital copies in cloud storage",
              "Leave copies with someone at home",
              "Use hotel safe for original documents",
              "Carry only copies when sightseeing"
            ]
          },
          {
            emergency: "Medical Emergency",
            immediate_steps: [
              "Call 123 for ambulance or go to nearest hospital",
              "Contact your travel insurance provider",
              "Notify embassy if serious medical situation",
              "Have someone contact your emergency contacts",
              "Keep all medical records and receipts"
            ],
            preparation: [
              "Research hospitals with English-speaking staff",
              "Carry medical information in Arabic and English",
              "Pack prescription medications with extra supply",
              "Know your blood type and any allergies",
              "Have travel insurance that covers medical evacuation"
            ]
          }
        ]
      },
      practicalAdvice: {
        packing_essentials: [
          {
            category: "Clothing Essentials",
            items: [
              "Lightweight, loose-fitting long-sleeve shirts",
              "Comfortable pants and maxi skirts",
              "Modest dress for dining out",
              "Large scarf for mosque visits and sun protection",
              "Comfortable walking shoes with good support",
              "Sandals that can be easily removed",
              "Light cardigan for air-conditioned spaces",
              "Swimwear and cover-ups for beach destinations"
            ],
            tips: [
              "Pack clothes that can be mixed and matched",
              "Choose wrinkle-resistant fabrics",
              "Bring one outfit slightly dressier for nice restaurants",
              "Consider cultural colors - avoid all black in summer heat"
            ]
          },
          {
            category: "Safety and Health Items",
            items: [
              "Personal safety alarm or whistle",
              "High SPF sunscreen and lip balm",
              "Wide-brimmed hat and quality sunglasses",
              "Insect repellent suitable for sensitive skin",
              "Hand sanitizer and wet wipes",
              "Basic first aid kit with feminine hygiene products",
              "Prescription medications with extra supply",
              "Probiotics for digestive health"
            ],
            tips: [
              "Pack medications in original containers",
              "Bring period products from home - quality varies locally",
              "Consider water purification tablets as backup",
              "Pack extra pairs of contact lenses if you wear them"
            ]
          },
          {
            category: "Technology and Communication",
            items: [
              "Portable phone charger and power bank",
              "Universal adapter for Egypt (Type C and Type F)",
              "Offline maps downloaded to phone",
              "Translation app with Arabic language pack",
              "Emergency contact list in phone and written backup",
              "Camera with extra memory cards",
              "Bluetooth headphones for peaceful travel",
              "VPN if you need access to blocked websites"
            ],
            tips: [
              "Download important apps before arriving",
              "Keep phone numbers in both local and international format",
              "Consider local SIM card for data and calls",
              "Backup photos to cloud storage regularly"
            ]
          }
        ],
        money_and_documentation: [
          {
            category: "Financial Planning",
            considerations: [
              "Carry cash in small denominations for tips and small purchases",
              "Use ATMs in banks or hotels rather than street machines",
              "Notify your bank of travel plans to avoid card blocks",
              "Keep money in multiple locations (not all in one place)",
              "Budget extra for taxi rides for safety convenience"
            ],
            tips: [
              "Egyptian pounds work better than USD for small purchases",
              "Tipping is expected - keep small bills handy",
              "Bargaining is normal in markets but not in restaurants",
              "Hotel restaurants and tourist sites often accept cards"
            ]
          },
          {
            category: "Important Documents",
            essentials: [
              "Passport with at least 6 months validity",
              "Visa (if required for your nationality)",
              "Travel insurance documents",
              "Hotel confirmations and tour bookings",
              "Emergency contact information",
              "Medical information and prescriptions",
              "Driver's license if planning to rent transportation",
              "Student ID if applicable for discounts"
            ],
            security: [
              "Keep originals in hotel safe",
              "Carry copies when sightseeing",
              "Store digital copies in secure cloud storage",
              "Share copies with trusted person at home",
              "Keep emergency cash separate from regular money"
            ]
          }
        ],
        solo_travel_tips: [
          "Join group tours for major attractions - safer and more social",
          "Stay in accommodations with good common areas to meet other travelers",
          "Check in regularly with family or friends at home",
          "Consider staying near other female travelers when possible",
          "Use women-only spaces in trains and some restaurants when available",
          "Don't be afraid to ask other women for help or advice",
          "Trust your instincts - if something feels wrong, leave",
          "Have backup plans for accommodation and transportation",
          "Learn basic Arabic phrases for common situations",
          "Consider hiring female guides for more comfortable cultural experiences"
        ]
      },
      empowermentAdvice: {
        building_confidence: [
          "Research Egyptian women's achievements and contributions to history",
          "Learn about strong female figures in Egyptian culture",
          "Understand that many Egyptian women are educated, professional, and independent",
          "Connect with local women when opportunities arise naturally",
          "Remember that you have the right to feel safe and respected",
          "Don't let fear prevent you from experiencing this incredible culture",
          "Trust in your own judgment and travel experience",
          "View challenges as opportunities to grow stronger",
          "Celebrate your courage in choosing to travel independently",
          "Know that thousands of women travel to Egypt safely every year"
        ],
        cultural_appreciation: [
          "Learn about Egyptian women's rights movements and progress",
          "Understand the diversity of experiences among Egyptian women",
          "Appreciate the balance between tradition and modernity",
          "Respect different choices about dress and lifestyle",
          "Engage with local culture without judgment",
          "Support women-owned businesses when possible",
          "Learn basic Arabic greetings to show cultural respect",
          "Ask questions about culture with genuine curiosity",
          "Share your own culture respectfully when asked",
          "Leave with greater understanding and appreciation"
        ],
        positive_interactions: [
          "Many Egyptian families are honored to share their culture with visitors",
          "Egyptian hospitality is legendary - accept kindness graciously",
          "Women often help other women - don't hesitate to ask for assistance",
          "Shop owners' families often include strong, business-savvy women",
          "Hotel staff are generally very protective of female guests",
          "Tourist guides often have experience helping female travelers feel comfortable",
          "Many Egyptians speak multiple languages and enjoy cultural exchange",
          "Genuine compliments about Egyptian culture are always welcome",
          "Showing interest in history and archaeology is universally appreciated",
          "Remember that positive interactions far outnumber any negative ones"
        ]
      },
      specificDestinations: [
        {
          destination: "Cairo",
          female_traveler_tips: [
            "Stay in Zamalek or Garden City for upscale, safer neighborhoods",
            "Egyptian Museum best visited early morning to avoid crowds",
            "Khan El Khalili market can be overwhelming - go with confidence",
            "Coptic Cairo generally very safe and welcoming to women",
            "Use ride-sharing apps rather than hailing street taxis",
            "Nile Corniche nice for evening walks but stay in lit areas",
            "Many cafes welcome women, especially in tourist areas"
          ],
          accommodations: [
            "Four Seasons Nile Plaza - excellent for solo female travelers",
            "Marriott Mena House - historic with great security",
            "Villa Belle Epoque - boutique hotel with personal attention",
            "Steigenberger Hotel El Tahrir - central location with female-friendly staff"
          ]
        },
        {
          destination: "Luxor",
          female_traveler_tips: [
            "Valley of the Kings best visited early with organized tour",
            "Karnak Temple safe during day but bring water and hat",
            "Felucca rides on the Nile are generally safe during daylight",
            "Hot air balloon rides offer stunning views and are well-supervised",
            "Local women often work in temple souvenir shops - great for authentic interactions",
            "Luxor Museum excellent and comfortable for solo visitors",
            "Hotel pools provide respite from heat and sightseeing"
          ],
          accommodations: [
            "Sofitel Winter Palace - historic luxury with excellent security",
            "Hilton Luxor Resort & Spa - resort setting with family-friendly atmosphere",
            "Nefertiti Hotel - local charm with attentive staff"
          ]
        },
        {
          destination: "Aswan",
          female_traveler_tips: [
            "Nubian villages welcome visitors and often have women-led crafts",
            "Philae Temple boat trips safe and beautiful",
            "Souk generally friendly and less aggressive than Cairo markets",
            "Felucca captains often include family members for comfort",
            "High Dam and Unfinished Obelisk good for independent exploration",
            "Elephantine Island peaceful for solo walking",
            "Many hotels offer women-only spa services"
          ],
          accommodations: [
            "Sofitel Legend Old Cataract - luxury with impeccable service",
            "Movenpick Resort Aswan - island location with security",
            "Nubian Guest House - cultural experience with local family"
          ]
        },
        {
          destination: "Red Sea (Hurghada/Sharm El Sheikh)",
          female_traveler_tips: [
            "Resort areas most comfortable for women travelers",
            "Beach activities and water sports well-supervised",
            "Diving instructors used to teaching women and very professional",
            "Shopping areas in resorts generally hassle-free",
            "Many spas offer women-only treatments and relaxation areas",
            "All-inclusive resorts provide comfortable social environments",
            "Desert safari tours available with mixed groups"
          ],
          accommodations: [
            "Four Seasons Resort Sharm El Sheikh - luxury with excellent facilities",
            "The Oberoi Sahl Hasheesh - adults-only sophisticated atmosphere",
            "Steigenberger Coraya Beach - family-friendly with good security"
          ]
        }
      ]
    }
  }
};

export default function PlanningResource() {
  const [, params] = useRoute("/planning/:slug");
  const slug = params?.slug;
  
  const resource = slug ? planningData[slug as keyof typeof planningData] : null;

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cool-limestone">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
          <p className="text-gray-600 mb-6">The planning resource you're looking for doesn't exist.</p>
          <Link href="/travel-planning">
            <Button className="bg-teal-oasis hover:bg-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Planning
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (slug === "best-time-to-visit") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Best Time to Visit</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Seasons Grid */}
          {(resource.content as any)?.seasons && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {(resource.content as any).seasons.map((season: any, index: number) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Thermometer className="h-6 w-6 text-teal-oasis mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{season.season}</h3>
                  </div>
                  
                  <div className="bg-teal-oasis/10 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-teal-oasis">{season.temperature}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{season.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {season.pros?.map((pro: any, i: number) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Cons</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {season.cons?.map((con: any, i: number) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {season.activities?.map((activity: any, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}

          {/* Monthly Timeline */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-teal-oasis mr-3" />
                Monthly Weather Guide
              </h3>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-12 gap-2 min-w-[800px]">
                  {(resource.content as any)?.monthlyGuide?.map((month: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className={`p-3 rounded-lg mb-2 ${
                        month.rating === 'Excellent' ? 'bg-green-100 border-2 border-green-500' :
                        month.rating === 'Very Good' ? 'bg-green-50 border border-green-300' :
                        month.rating === 'Good' ? 'bg-yellow-50 border border-yellow-300' :
                        month.rating === 'Fair' ? 'bg-orange-50 border border-orange-300' :
                        'bg-red-50 border border-red-300'
                      }`}>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{month.month}</h4>
                        <p className="text-xs text-gray-600 mb-1">{month.temp}</p>
                        <p className="text-xs font-medium">{month.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Events */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Special Events & Considerations</h3>
              <div className="space-y-4">
                {(resource.content as any)?.specialEvents?.map((event: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.event}</h4>
                      <p className="text-sm text-teal-oasis font-medium">{event.dates}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "visa-entry") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Visa & Entry</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Visa Types */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Plane className="h-8 w-8 text-teal-oasis mr-3" />
              Visa Options
            </h2>
            
            {(resource.content as any)?.visaTypes?.map((visa: any, index: number) => (
              <Card key={index} className="overflow-hidden border-l-4 border-teal-oasis">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{visa.type}</h3>
                      <p className="text-gray-600 mb-4">{visa.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-gold-accent/20 rounded-lg p-3 mb-2">
                        <p className="font-bold text-gold-accent text-lg">{visa.price}</p>
                      </div>
                      <p className="text-sm text-gray-600">{visa.duration}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Clock className="h-4 w-4 text-teal-oasis mr-2" />
                        Processing Time
                      </h4>
                      <p className="text-gray-600">{visa.processing}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Globe className="h-4 w-4 text-teal-oasis mr-2" />
                        Available for
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {visa.countries.map((country, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FileText className="h-4 w-4 text-teal-oasis mr-2" />
                        Requirements
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.requirements.map((req, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Considerations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {visa.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-teal-oasis/10 rounded-lg p-4">
                    <p className="text-sm font-medium text-teal-oasis">
                      Best for: {visa.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "cultural-etiquette") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Cultural Etiquette</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Practical Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HandHeart className="h-6 w-6 text-teal-oasis mr-3" />
                Practical Cultural Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.practicalTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "packing-guide") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Packing Guide</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Essential Categories */}
          <div className="space-y-8 mb-12">
            {resource.content.essentialCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Package className="h-6 w-6 text-teal-oasis mr-3" />
                    {category.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.essential ? 'border-teal-oasis bg-teal-oasis/5' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.item}</h4>
                          {item.essential && (
                            <Badge variant="secondary" className="text-xs bg-teal-oasis text-white">
                              Essential
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Seasonal Advice */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sun className="h-6 w-6 text-teal-oasis mr-3" />
                Seasonal Packing Advice
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.seasonalAdvice.map((season, index) => (
                  <div key={index} className="bg-gradient-to-br from-teal-oasis/10 to-champagne-sand/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{season.season}</h4>
                    <ul className="space-y-2">
                      {season.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-teal-oasis mr-3 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Packing Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pro Packing Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.packingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gold-accent/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-gold-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "budget-planning") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Budget Planning</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Daily Budgets */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {resource.content.dailyBudgets.map((budget, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-gold-accent">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{budget.category}</h3>
                    <div className="bg-gold-accent/20 rounded-lg p-3 mb-4">
                      <p className="text-2xl font-bold text-gold-accent">{budget.dailyRange}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Accommodation</p>
                      <p className="text-sm text-gray-600">{budget.accommodation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Food</p>
                      <p className="text-sm text-gray-600">{budget.food}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Transport</p>
                      <p className="text-sm text-gray-600">{budget.transport}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Attractions</p>
                      <p className="text-sm text-gray-600">{budget.attractions}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {budget.tips.map((tip, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1 h-1 bg-gold-accent rounded-full mr-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Major Expenses */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-teal-oasis mr-3" />
                Major Expenses to Consider
              </h3>
              
              <div className="space-y-4">
                {resource.content.majorExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{expense.item}</h4>
                      <p className="text-sm text-gray-600">{expense.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gold-accent">{expense.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Money Saving Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="h-6 w-6 text-green-600 mr-3" />
                Money-Saving Tips
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.moneySavingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tipping Guide */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tipping Guide</h3>
              
              <div className="space-y-4">
                {resource.content.tippingGuide.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{tip.service}</h4>
                      <p className="text-sm text-gray-600">{tip.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-oasis">{tip.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "health-safety") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Health & Safety</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Health Precautions */}
          <div className="space-y-8 mb-12">
            {resource.content.healthPrecautions.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Cross className="h-6 w-6 text-red-500 mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.required ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.item}</h4>
                          <Badge variant={item.required ? "destructive" : "secondary"} className="text-xs">
                            {item.required ? "Required" : "Optional"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.prevention && (
                          <p className="text-sm text-green-700 mt-2">
                            <strong>Prevention:</strong> {item.prevention}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Safety Guidelines */}
          <div className="space-y-8 mb-12">
            {resource.content.safetyGuidelines.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Shield className="h-6 w-6 text-teal-oasis mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Contacts */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Phone className="h-6 w-6 text-red-500 mr-3" />
                Emergency Contacts
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{contact.service}</h4>
                      <p className="text-xl font-bold text-red-600">{contact.number}</p>
                    </div>
                    <p className="text-sm text-gray-600">{contact.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "safety-insurance") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Safety & Insurance</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Insurance Types */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Shield className="h-8 w-8 text-teal-oasis mr-3" />
              Travel Insurance Options
            </h2>
            
            {resource.content.insuranceTypes.map((insurance, index) => (
              <Card key={index} className={`overflow-hidden border-l-4 ${
                insurance.essential ? 'border-red-500' : 'border-blue-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{insurance.type}</h3>
                      <p className="text-gray-600 mb-4">{insurance.coverage}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-teal-oasis/20 rounded-lg p-3 mb-2">
                        <p className="font-bold text-teal-oasis text-sm">{insurance.recommendedAmount}</p>
                      </div>
                      <Badge variant={insurance.essential ? "destructive" : "secondary"} className="text-xs">
                        {insurance.essential ? "Essential" : "Optional"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                        Coverage Includes
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {insurance.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        Important Considerations
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {insurance.considerations.map((consideration, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></span>
                            {consideration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Safety Guidelines */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Safety Guidelines by Category</h2>
            
            {resource.content.safetyGuidelines.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Shield className="h-6 w-6 text-teal-oasis mr-3" />
                      {category.category}
                    </h3>
                    <Badge variant={
                      category.riskLevel === 'Low' ? 'default' :
                      category.riskLevel === 'Medium' ? 'secondary' :
                      category.riskLevel === 'Low-Medium' ? 'outline' : 'destructive'
                    }>
                      {category.riskLevel} Risk
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Safety Guidelines</h4>
                      <div className="space-y-2">
                        {category.guidelines.map((guideline, i) => (
                          <div key={i} className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{guideline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Common Risks</h4>
                      <div className="space-y-2">
                        {category.commonRisks.map((risk, i) => (
                          <div key={i} className="flex items-start space-x-3 p-2 bg-orange-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insurance Providers */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Insurance Providers</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.insuranceProviders.map((provider, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{provider.provider}</h4>
                    <p className="text-sm text-gray-600 mb-3">{provider.coverage}</p>
                    
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Strengths:</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.strengths.map((strength, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">{provider.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Preparation */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Emergency Preparation</h2>
            
            {resource.content.emergencyPreparation.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="h-6 w-6 text-teal-oasis mr-3" />
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.importance === 'Critical' ? 'border-red-500 bg-red-50' :
                        item.importance === 'Important' ? 'border-orange-500 bg-orange-50' :
                        'border-blue-500 bg-blue-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.item}</h4>
                          <Badge variant={
                            item.importance === 'Critical' ? 'destructive' :
                            item.importance === 'Important' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {item.importance}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Safety Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Safety Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "getting-around") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Getting Around</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* City Transportation */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <MapPin className="h-8 w-8 text-teal-oasis mr-3" />
              City Transportation
            </h2>
            
            {resource.content.cityTransportation.map((city, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{city.city}</h3>
                    <Badge variant="outline">{city.population}</Badge>
                  </div>
                  
                  <div className="space-y-6">
                    {city.mainOptions.map((option, i) => (
                      <div key={i} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-900">{option.type}</h4>
                          <span className="text-lg font-bold text-teal-oasis">{option.cost}</span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-green-600 mb-2">Advantages</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.pros.map((pro, j) => (
                                <li key={j} className="flex items-center">
                                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-orange-600 mb-2">Considerations</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.cons.map((con, j) => (
                                <li key={j} className="flex items-center">
                                  <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 flex-shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {option.routes && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-900 mb-2">Routes</h5>
                            <div className="flex flex-wrap gap-2">
                              {option.routes.map((route, j) => (
                                <Badge key={j} variant="outline" className="text-xs">
                                  {route}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Practical Tips</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {option.tips.map((tip, j) => (
                              <li key={j} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Inter-city Travel */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Plane className="h-8 w-8 text-teal-oasis mr-3" />
              Inter-city Travel
            </h2>
            
            {resource.content.intercityTravel.map((travel, index) => (
              <Card key={index} className="overflow-hidden border-l-4 border-teal-oasis">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{travel.method}</h3>
                      <p className="text-gray-600 mb-2">Duration: {travel.duration}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {travel.routes.map((route, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {route}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gold-accent/20 rounded-lg p-3 mb-2">
                        <p className="font-bold text-gold-accent">{travel.cost}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">Advantages</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {travel.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3">Considerations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {travel.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Travel Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {travel.tips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {travel.companies && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Companies:</p>
                      <div className="flex flex-wrap gap-2">
                        {travel.companies.map((company, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Tips */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Navigation & Getting Help</h2>
            
            {resource.content.navigationTips.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Globe className="h-6 w-6 text-teal-oasis mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {section.tools && section.tools.map((tool, i) => (
                      <div key={i} className="border rounded-lg p-4 bg-blue-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{tool.app}</h4>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-green-600 mb-2">Pros</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {tool.pros.map((pro, j) => (
                                <li key={j} className="flex items-center">
                                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-orange-600 mb-2">Cons</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {tool.cons.map((con, j) => (
                                <li key={j} className="flex items-center">
                                  <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 flex-shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Tips</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {tool.tips.map((tip, j) => (
                              <li key={j} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    {section.methods && section.methods.map((method, i) => (
                      <div key={i} className="border rounded-lg p-4 bg-green-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{method.method}</h4>
                        <p className="text-gray-600 mb-3">{method.description}</p>
                        
                        <div className="mb-3">
                          <h5 className="font-semibold text-gray-900 mb-2">Examples</h5>
                          <div className="flex flex-wrap gap-2">
                            {method.examples.map((example, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Tips</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {method.tips.map((tip, j) => (
                              <li key={j} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transportation Etiquette */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-teal-oasis mr-3" />
                Transportation Etiquette
              </h3>
              
              <div className="space-y-6">
                {resource.content.transportationEtiquette.map((etiquette, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{etiquette.situation}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {etiquette.guidelines.map((guideline, i) => (
                        <div key={i} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                          <Heart className="h-4 w-4 text-teal-oasis mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{guideline}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-gold-accent mr-3" />
                Transportation Budget Guide
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {resource.content.budgetBreakdown.map((budget, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gold-accent/5">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{budget.category}</h4>
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-gold-accent">{budget.budget}</p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                    
                    <div className="space-y-2">
                      {budget.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.item}</span>
                          <span className="font-semibold text-gray-900">{item.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Transportation Safety Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "currency-payments") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Currency & Payments</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Currency Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-gold-accent mr-3" />
                Egyptian Currency
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gold-accent/10 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{resource.content.currency.name}</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Symbol:</span> {resource.content.currency.symbol}</p>
                    <p><span className="font-semibold">Code:</span> {resource.content.currency.code}</p>
                    <p><span className="font-semibold">Subdivisions:</span> {resource.content.currency.subdivisions}</p>
                    <p><span className="font-semibold">Exchange Rate:</span> {resource.content.currency.exchangeRate}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Denominations</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm text-gray-900 mb-1">Banknotes:</p>
                      <div className="flex flex-wrap gap-2">
                        {resource.content.currency.denominations.banknotes.map((note, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {note} EGP
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 mb-1">Coins:</p>
                      <div className="flex flex-wrap gap-2">
                        {resource.content.currency.denominations.coins.map((coin, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {coin}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Recognition Tips</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.currency.recognitionTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                      <Eye className="h-4 w-4 text-teal-oasis mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <CreditCard className="h-8 w-8 text-teal-oasis mr-3" />
              Payment Methods
            </h2>
            
            {resource.content.paymentMethods.map((method, index) => (
              <Card key={index} className={`overflow-hidden border-l-4 ${
                method.recommended === 'Essential' ? 'border-red-500' :
                method.recommended === 'Backup currency' ? 'border-blue-500' :
                'border-green-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.method}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant={
                          method.acceptance === 'Universal' ? 'default' :
                          method.acceptance === 'Tourist areas' ? 'secondary' :
                          'outline'
                        }>
                          {method.acceptance}
                        </Badge>
                        <Badge variant={
                          method.recommended === 'Essential' ? 'destructive' :
                          method.recommended === 'Backup currency' ? 'secondary' :
                          'default'
                        }>
                          {method.recommended}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {method.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {method.tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Exchange Options */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-teal-oasis mr-3" />
                Currency Exchange Options
              </h3>
              
              <div className="space-y-4">
                {resource.content.exchangeOptions.map((option, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{option.option}</h4>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded text-sm font-semibold ${
                          option.rate === 'Best' ? 'bg-green-100 text-green-800' :
                          option.rate === 'Good' ? 'bg-blue-100 text-blue-800' :
                          option.rate === 'Fair to Poor' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {option.rate} Rate
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Convenience</p>
                        <p className="text-sm text-gray-600">{option.convenience}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Fees</p>
                        <p className="text-sm text-gray-600">{option.fees}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Best For</p>
                        <p className="text-sm text-gray-600">{option.bestFor}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Details</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {option.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tipping Guide */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HandHeart className="h-6 w-6 text-teal-oasis mr-3" />
                Tipping Guide
              </h3>
              
              <div className="space-y-4">
                {resource.content.tippingGuide.map((tip, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    tip.customary ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{tip.service}</h4>
                      <div className="text-right">
                        <p className="text-lg font-bold text-teal-oasis">{tip.amount}</p>
                        <Badge variant={tip.customary ? 'default' : 'outline'} className="text-xs">
                          {tip.customary ? 'Customary' : 'Optional'}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{tip.notes}</p>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Specific Guidelines</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tip.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Money Security</h2>
            
            {resource.content.securityTips.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Shield className="h-6 w-6 text-red-600 mr-3" />
                    {section.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.tips.map((tip, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <Shield className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Common Scams */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                Common Financial Scams
              </h3>
              
              <div className="space-y-4">
                {resource.content.commonScams.map((scam, index) => (
                  <div key={index} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{scam.scam}</h4>
                    <p className="text-sm text-gray-600 mb-3">{scam.description}</p>
                    <div className="bg-white p-3 rounded border-l-4 border-green-500">
                      <p className="text-sm font-semibold text-green-800 mb-1">Prevention:</p>
                      <p className="text-sm text-gray-700">{scam.prevention}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budgeting Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Budgeting Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.budgetingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gold-accent/5 rounded-lg">
                    <DollarSign className="h-5 w-5 text-gold-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "connectivity-sim-cards") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Connectivity & SIM Cards</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Mobile Networks */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Smartphone className="h-8 w-8 text-teal-oasis mr-3" />
              Mobile Network Providers
            </h2>
            
            {resource.content.mobileNetworks.map((network, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{network.provider}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline">{network.marketShare} Market Share</Badge>
                        <Badge variant="secondary">{network.coverage}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{network.bestFor}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Strengths</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {network.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Considerations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {network.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Popular Plans</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {network.plans.map((plan, i) => (
                        <div key={i} className="border rounded-lg p-4 bg-teal-oasis/5">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-gray-900">{plan.name}</h5>
                            <span className="text-lg font-bold text-teal-oasis">{plan.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {plan.data} • {plan.validity}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {plan.features.map((feature, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SIM Card Purchase */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-teal-oasis mr-3" />
                SIM Card Purchase Guide
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.simCardPurchase.requirements.map((req, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{req}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Where to Buy</h4>
                <div className="space-y-4">
                  {resource.content.simCardPurchase.locations.map((location, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="text-lg font-bold text-gray-900">{location.type}</h5>
                        <Badge variant="outline">{location.availability}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="font-semibold text-sm text-green-800 mb-1">Pros:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {location.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-orange-800 mb-1">Cons:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {location.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-blue-800 mb-1">Tips:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {location.tips.map((tip, i) => (
                              <li key={i}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Activation Process</h4>
                <div className="space-y-3">
                  {resource.content.simCardPurchase.activationProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-teal-oasis text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internet Access Options */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wifi className="h-6 w-6 text-teal-oasis mr-3" />
                Internet Access Options
              </h3>
              
              <div className="space-y-4">
                {resource.content.internetAccess.map((access, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{access.type}</h4>
                      <div className="text-right text-sm">
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          access.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                          access.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                          access.quality === 'Variable' || access.quality === 'Good to Excellent' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {access.quality}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Cost</p>
                        <p className="text-sm text-gray-600">{access.cost}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Speed</p>
                        <p className="text-sm text-gray-600">{access.speed}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Reliability</p>
                        <p className="text-sm text-gray-600">{access.reliability}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Coverage</p>
                        <p className="text-sm text-gray-600">{access.coverage}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Tips</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {access.tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Apps */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Essential Apps</h2>
            
            {resource.content.communicationApps.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MessageSquare className="h-6 w-6 text-teal-oasis mr-3" />
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.apps.map((app, i) => (
                      <div key={i} className="border rounded-lg p-4 bg-teal-oasis/5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{app.name}</h4>
                            <p className="text-sm text-gray-600">{app.popularity}</p>
                          </div>
                          <Badge variant="outline">{app.dataUsage} Data</Badge>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="font-semibold text-gray-900 mb-2">Features</h5>
                          <div className="flex flex-wrap gap-2">
                            {app.features.map((feature, j) => (
                              <Badge key={j} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Tips</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {app.tips.map((tip, j) => (
                              <li key={j} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Costs & Savings */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-teal-oasis mr-3" />
                Data Costs & Savings
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Daily Data Estimates</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {resource.content.costs.dailyEstimates.map((estimate, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-green-50">
                      <h5 className="font-bold text-gray-900 mb-2">{estimate.usage}</h5>
                      <p className="text-lg font-bold text-teal-oasis mb-2">{estimate.cost}/day</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {estimate.activities.map((activity, i) => (
                          <li key={i}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Roaming vs Local SIM Savings</h4>
                <div className="space-y-3">
                  {resource.content.costs.comparisonWithRoaming.map((comparison, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{comparison.carrier}</p>
                        <p className="text-sm text-gray-600">
                          Roaming: {comparison.roamingCost} • Local SIM: {comparison.localSIMCost}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{comparison.savings}</p>
                        <p className="text-xs text-gray-600">savings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.practicalTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gold-accent/5 rounded-lg">
                    <Star className="h-5 w-5 text-gold-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-6 w-6 text-teal-oasis mr-3" />
                Troubleshooting Common Issues
              </h3>
              
              <div className="space-y-4">
                {resource.content.troubleshooting.map((problem, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-orange-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{problem.issue}</h4>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Solutions:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {problem.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Connectivity */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                Emergency Connectivity Backup
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.emergencyConnectivity.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "health-vaccinations") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Health & Vaccinations</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Vaccinations */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Syringe className="h-8 w-8 text-teal-oasis mr-3" />
              Vaccination Requirements
            </h2>

            {/* Required Vaccinations */}
            <Card className="border-l-4 border-red-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  Required Vaccinations
                </h3>
                
                {resource.content.vaccinations.required.map((vaccine, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50 mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{vaccine.vaccine}</h4>
                      <Badge variant="destructive">Required</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{vaccine.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Timing</p>
                        <p className="text-sm text-gray-600">{vaccine.timing}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Validity</p>
                        <p className="text-sm text-gray-600">{vaccine.validityPeriod}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">Requirement</p>
                        <p className="text-sm text-gray-600">{vaccine.requirement}</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">Important:</p>
                      <p className="text-sm text-gray-700">{vaccine.notes}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Vaccinations */}
            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Plus className="h-6 w-6 text-blue-500 mr-3" />
                  Recommended Vaccinations
                </h3>
                
                <div className="space-y-4">
                  {resource.content.vaccinations.recommended.map((vaccine, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-900">{vaccine.vaccine}</h4>
                        <Badge variant={
                          vaccine.priority === 'Highly Recommended' ? 'default' :
                          vaccine.priority === 'Recommended' ? 'secondary' :
                          'outline'
                        }>
                          {vaccine.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{vaccine.description}</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Dosing</p>
                          <p className="text-sm text-gray-600">{vaccine.dosing}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Timing</p>
                          <p className="text-sm text-gray-600">{vaccine.timing}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Duration</p>
                          <p className="text-sm text-gray-600">{vaccine.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Routine Vaccinations */}
            <Card className="border-l-4 border-green-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  Routine Vaccinations (Ensure Up to Date)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.vaccinations.routine.map((vaccine, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-green-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{vaccine.vaccine}</h4>
                      <p className="text-sm font-semibold text-green-800 mb-1">{vaccine.status}</p>
                      <p className="text-sm text-gray-600">{vaccine.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Risks */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Activity className="h-8 w-8 text-teal-oasis mr-3" />
              Common Health Risks
            </h2>
            
            {resource.content.healthRisks.map((risk, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{risk.risk}</h3>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{risk.likelihood}</Badge>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        risk.severity.includes('Severe') ? 'bg-red-100 text-red-800' :
                        risk.severity.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.severity}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{risk.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-2" />
                        Prevention
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {risk.prevention.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Plus className="h-4 w-4 text-blue-600 mr-2" />
                        Treatment
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {risk.treatment.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medical Facilities */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plus className="h-6 w-6 text-teal-oasis mr-3" />
                Medical Facilities in Egypt
              </h3>
              
              <div className="space-y-4">
                {resource.content.medicalFacilities.map((facility, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{facility.type}</h4>
                      <div className={`px-3 py-1 rounded text-sm font-semibold ${
                        facility.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                        facility.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                        facility.quality === 'Variable' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {facility.quality}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Locations:</p>
                        <p className="text-sm text-gray-600 mb-3">{facility.locations}</p>
                        
                        <p className="font-semibold text-sm text-gray-900 mb-1">Languages:</p>
                        <p className="text-sm text-gray-600 mb-3">{facility.languages}</p>
                        
                        <p className="font-semibold text-sm text-gray-900 mb-1">Insurance:</p>
                        <p className="text-sm text-gray-600">{facility.insurance}</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-1">Services:</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {facility.services.map((service, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="font-semibold text-sm text-gray-900 mb-1">Examples:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {facility.examples.map((example, i) => (
                            <li key={i}>• {example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm text-gray-700">{facility.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Travel Health Kit */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Pill className="h-6 w-6 text-teal-oasis mr-3" />
                Essential Travel Health Kit
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Prescription Medications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.medications.prescriptions.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Travel Medicine Kit</h4>
                <div className="space-y-4">
                  {resource.content.medications.travelKit.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-teal-oasis/5">
                      <h5 className="font-bold text-gray-900 mb-3">{category.category}</h5>
                      <div className="grid md:grid-cols-2 gap-2">
                        {category.items.map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Phone className="h-6 w-6 text-red-600 mr-3" />
                Emergency Medical Contacts
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.emergencyContacts.map((contact, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50">
                    <h4 className="font-bold text-gray-900 mb-2">{contact.service}</h4>
                    <p className="text-lg font-bold text-red-600 mb-1">{contact.number}</p>
                    <p className="text-sm text-gray-600 mb-1">{contact.availability}</p>
                    <p className="text-xs text-gray-600">{contact.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Considerations */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Special Considerations</h2>
            
            {resource.content.specialConsiderations.map((consideration, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-6 w-6 text-teal-oasis mr-3" />
                    {consideration.category}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {consideration.advice.map((advice, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-teal-oasis mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{advice}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "shopping-bargaining") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Shopping & Bargaining</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Shopping Destinations */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Store className="h-8 w-8 text-teal-oasis mr-3" />
              Top Shopping Destinations
            </h2>
            
            {resource.content.shoppingDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.location}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge variant="outline">{destination.type}</Badge>
                        <span className="text-sm text-gray-600">{destination.atmosphere}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-teal-oasis">{destination.specialty}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{destination.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Star className="h-4 w-4 text-gold-accent mr-2" />
                        Highlights
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {destination.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Tag className="h-4 w-4 text-blue-600 mr-2" />
                        Shopping Tips
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {destination.tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-teal-oasis/10 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-teal-800 mb-1">Bargaining Level:</p>
                    <p className="text-sm text-gray-700">{destination.bargainingLevel}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Hours:</p>
                      <p className="text-gray-600">{destination.location_details.hours}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Access:</p>
                      <p className="text-gray-600">{destination.location_details.access}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Nearby:</p>
                      <p className="text-gray-600">{destination.location_details.nearby}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bargaining Techniques */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Coins className="h-8 w-8 text-teal-oasis mr-3" />
              Master the Art of Bargaining
            </h2>

            {/* Basic Principles */}
            <Card className="border-l-4 border-teal-oasis">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Principles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.bargainingTechniques.basicPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-teal-oasis mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{principle}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step by Step Guide */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Bargaining Guide</h3>
                <div className="space-y-4">
                  {resource.content.bargainingTechniques.stepByStep.map((step, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-teal-oasis text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{step.action}</h4>
                          <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {step.tips.map((tip, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tip}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultural Tips */}
            <Card className="border-l-4 border-gold-accent">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-6 w-6 text-gold-accent mr-3" />
                  Cultural Considerations
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.bargainingTechniques.culturalTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gold-accent/5 rounded-lg">
                      <Heart className="h-4 w-4 text-gold-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Authentic Souvenirs */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Gem className="h-8 w-8 text-teal-oasis mr-3" />
              Authentic Egyptian Souvenirs
            </h2>
            
            {resource.content.authenticSouvenirs.map((souvenir, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{souvenir.item}</h3>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded text-sm font-semibold mb-2 ${
                        souvenir.authenticity === 'High' ? 'bg-green-100 text-green-800' :
                        souvenir.authenticity.includes('Variable') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {souvenir.authenticity}
                      </div>
                      <p className="text-sm font-semibold text-teal-oasis">{souvenir.priceRange}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Quality Indicators</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {souvenir.quality_indicators.map((indicator, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Best Places to Buy</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {souvenir.best_places.map((place, i) => (
                          <li key={i} className="flex items-start">
                            <MapPin className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            {place}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3">
                        <Badge variant="outline" className="text-xs">
                          {souvenir.bargaining_potential} Bargaining
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Shopping Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {souvenir.tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Shopping Safety */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-teal-oasis mr-3" />
                Shopping Safety & Scam Prevention
              </h3>
              
              <div className="space-y-6">
                {resource.content.shoppingSafety.map((safety, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      {safety.concern}
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-800 mb-2">Prevention Strategies</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {safety.prevention.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-red-800 mb-2">Red Flags to Watch</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {safety.red_flags.map((flag, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-teal-oasis mr-3" />
                Payment Methods & Tips
              </h3>
              
              <div className="space-y-4">
                {resource.content.paymentMethods.map((method, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{method.method}</h4>
                      <Badge variant="outline">{method.acceptance}</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-green-800 mb-2">Advantages</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {method.advantages.map((advantage, i) => (
                            <li key={i} className="flex items-start">
                              <Plus className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-red-800 mb-2">Disadvantages</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {method.disadvantages.map((disadvantage, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-blue-800 mb-2">Tips</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {method.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Etiquette */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HandHeart className="h-6 w-6 text-teal-oasis mr-3" />
                Market Etiquette & Cultural Respect
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.marketEtiquette.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg">
                    <HandHeart className="h-4 w-4 text-teal-oasis mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{rule}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Shopping */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-teal-oasis mr-3" />
                Seasonal Shopping Guide
              </h3>
              
              <div className="space-y-6">
                {resource.content.seasonalShopping.map((season, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{season.season}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Characteristics</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {season.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-2"></span>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Shopping Strategies</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {season.strategies.map((strategy, i) => (
                            <li key={i} className="flex items-start">
                              <TrendingUp className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "family-friendly-egypt") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Family-Friendly Egypt</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Kid-Friendly Attractions */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Baby className="h-8 w-8 text-teal-oasis mr-3" />
              Kid-Friendly Attractions
            </h2>
            
            {resource.content.kidFriendlyAttractions.map((attraction, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{attraction.attraction}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge variant="outline">{attraction.location}</Badge>
                        <span className="text-sm text-teal-oasis font-semibold">{attraction.ageRange}</span>
                        <span className="text-sm text-gray-600">{attraction.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{attraction.cost}</p>
                      <p className="text-xs text-gray-600">{attraction.accessibility}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Star className="h-4 w-4 text-gold-accent mr-2" />
                        Highlights
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {attraction.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-gold-accent mr-2 mt-1 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        Family Tips
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {attraction.familyTips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-teal-oasis/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-teal-800 mb-1">Educational Value:</p>
                    <p className="text-sm text-gray-700">{attraction.educational_value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Family Accommodations */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Home className="h-8 w-8 text-teal-oasis mr-3" />
              Family-Friendly Accommodations
            </h2>
            
            {resource.content.familyAccommodations.map((accommodation, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{accommodation.type}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {accommodation.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {accommodation.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <Star className="h-3 w-3 text-gold-accent mr-2 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Booking Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {accommodation.tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Travel Safety */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Shield className="h-8 w-8 text-teal-oasis mr-3" />
              Family Travel Safety
            </h2>

            {/* Health Precautions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Health & Safety Precautions</h3>
                
                <div className="space-y-6">
                  {resource.content.travelSafety.health_precautions.map((precaution, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        {precaution.concern}
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-green-800 mb-2">Prevention Measures</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {precaution.precautions.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-red-800 mb-2">Emergency Preparedness</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {precaution.emergency_tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <Plus className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medical Preparation */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Syringe className="h-5 w-5 text-teal-oasis mr-2" />
                    Vaccination Requirements
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {resource.content.travelSafety.vaccination_requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Pill className="h-5 w-5 text-teal-oasis mr-2" />
                    Medical Preparation
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {resource.content.travelSafety.medical_preparation.map((prep, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                        {prep}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Package className="h-8 w-8 text-teal-oasis mr-3" />
              Practical Family Travel Tips
            </h2>

            {/* Packing Essentials */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Packing Essentials</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {resource.content.practicalTips.packing_essentials.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transportation & Cultural Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Car className="h-5 w-5 text-teal-oasis mr-2" />
                    Transportation Tips
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {resource.content.practicalTips.transportation_tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 text-teal-oasis mr-2" />
                    Cultural Preparation
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {resource.content.practicalTips.cultural_preparation.map((prep, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-teal-oasis rounded-full mr-2 mt-2"></span>
                        {prep}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Budget Planning */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 text-teal-oasis mr-3" />
                Family Budget Planning
              </h3>
              
              <div className="space-y-6 mb-6">
                {resource.content.budgetingTips.cost_breakdown.map((category, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h4>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-teal-oasis mb-2">{category.average_costs}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {category.family_considerations.map((consideration, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-2"></span>
                            {consideration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-green-800 mb-3">Money-Saving Tips</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {resource.content.budgetingTips.money_saving_tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <DollarSign className="h-3 w-3 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Age-Specific Guidance */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Users className="h-8 w-8 text-teal-oasis mr-3" />
              Age-Specific Travel Guidance
            </h2>
            
            {resource.content.ageSpecificGuidance.map((guidance, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{guidance.age_group}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">Recommendations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {guidance.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3">Best Attractions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {guidance.attractions.map((attraction, i) => (
                          <li key={i} className="flex items-start">
                            <Star className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">Potential Challenges</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {guidance.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start">
                            <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Procedures */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-red-600 mr-3" />
                Emergency Procedures
              </h3>
              
              <div className="space-y-6">
                {resource.content.emergencyProcedures.map((procedure, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50">
                    <h4 className="text-lg font-bold text-red-800 mb-4">{procedure.situation}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Immediate Actions</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {procedure.immediate_actions.map((action, i) => (
                            <li key={i} className="flex items-start">
                              <Zap className="h-3 w-3 text-red-600 mr-2 mt-1 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Preparation</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {procedure.preparation.map((prep, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {prep}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "women-travellers-tips") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Women Travellers' Tips</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              {resource.lastUpdated}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {resource.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {resource.description}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {resource.content.overview}
              </p>
            </CardContent>
          </Card>

          {/* Cultural Considerations */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <UserCheck className="h-8 w-8 text-teal-oasis mr-3" />
              Cultural Considerations
            </h2>

            {/* Dressing Appropriately */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shirt className="h-6 w-6 text-teal-oasis mr-3" />
                  Dressing Appropriately
                </h3>
                
                <div className="space-y-6">
                  {resource.content.culturalConsiderations?.dressingAppropriately?.map((setting, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{setting.setting}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Requirements</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {setting.requirements.map((req, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Practical Tips</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {setting.tips.map((tip, i) => (
                              <li key={i} className="flex items-start">
                                <Star className="h-3 w-3 text-gold-accent mr-2 mt-1 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Interactions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="h-6 w-6 text-teal-oasis mr-3" />
                  Social Interactions
                </h3>
                
                <div className="space-y-6">
                  {resource.content.culturalConsiderations?.socialInteractions?.map((interaction, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-blue-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{interaction.situation}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-blue-800 mb-2">Guidelines</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {interaction.guidelines.map((guideline, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                                {guideline}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-blue-800 mb-2">
                            {interaction.phrases ? 'Useful Phrases' : interaction.strategies ? 'Strategies' : 'Considerations'}
                          </h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {(interaction.phrases || interaction.strategies || interaction.considerations || []).map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Safety Guidelines */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Shield className="h-8 w-8 text-teal-oasis mr-3" />
              Safety Guidelines
            </h2>

            {/* Personal Safety */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Safety</h3>
                
                <div className="space-y-6">
                  {resource.content.safetyGuidelines?.personalSafety?.map((safety, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-green-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Lock className="h-5 w-5 text-green-600 mr-2" />
                        {safety.category}
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-green-800 mb-2">Safety Precautions</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {safety.precautions.map((precaution, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {precaution}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">
                            {safety.red_flags ? 'Red Flags' : safety.options ? 'Transportation Options' : 'Safety Strategies'}
                          </h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {(safety.red_flags || safety.options || safety.strategies || []).map((item, i) => (
                              <li key={i} className="flex items-start">
                                {safety.red_flags ? (
                                  <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                ) : (
                                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-2"></span>
                                )}
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Harassment Prevention */}
            <Card className="border-l-4 border-red-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Harassment Prevention & Response</h3>
                
                <div className="space-y-6">
                  {resource.content.safetyGuidelines?.harassment_prevention?.map((harassment, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-red-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{harassment.type}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-green-800 mb-2">Prevention</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {harassment.prevention.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <Shield className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-red-800 mb-2">If It Happens</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {harassment.response.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <Zap className="h-3 w-3 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Procedures */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="h-6 w-6 text-red-600 mr-3" />
                  Emergency Procedures
                </h3>
                
                <div className="space-y-6">
                  {resource.content.safetyGuidelines?.emergency_procedures?.map((emergency, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-yellow-50">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{emergency.emergency}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-red-800 mb-2">Immediate Steps</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {emergency.immediate_steps.map((step, i) => (
                              <li key={i} className="flex items-start">
                                <Zap className="h-3 w-3 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-green-800 mb-2">Prevention</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {emergency.prevention.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Practical Advice */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Package className="h-8 w-8 text-teal-oasis mr-3" />
              Practical Advice
            </h2>

            {/* Packing Essentials */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Packing Essentials for Women</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {resource.content.practicalAdvice?.packing_essentials?.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-teal-oasis/5">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{category.category}</h4>
                      
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-white p-3 rounded border-l-4 border-teal-oasis">
                        <h5 className="font-semibold text-teal-800 mb-1">Tips:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {category.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-teal-oasis rounded-full mr-2 mt-1.5"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Money and Documentation */}
            <div className="grid md:grid-cols-2 gap-6">
              {resource.content.practicalAdvice?.money_and_documentation?.map((section, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      {section.category === 'Financial Planning' ? (
                        <DollarSign className="h-5 w-5 text-teal-oasis mr-2" />
                      ) : (
                        <FileText className="h-5 w-5 text-teal-oasis mr-2" />
                      )}
                      {section.category}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {section.considerations ? 'Considerations' : 'Essentials'}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(section.considerations || section.essentials || []).map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {section.tips ? 'Tips' : 'Security'}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(section.tips || section.security || []).map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Solo Travel Tips */}
            <Card className="border-l-4 border-purple-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Navigation className="h-6 w-6 text-purple-600 mr-3" />
                  Solo Travel Tips
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {resource.content.practicalAdvice.solo_travel_tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Star className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Empowerment Advice */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-teal-oasis mr-3" />
                Empowerment & Confidence Building
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-teal-800 mb-3">Building Confidence</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {resource.content.empowermentAdvice.building_confidence.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Heart className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-3">Cultural Appreciation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {resource.content.empowermentAdvice.cultural_appreciation.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Globe className="h-3 w-3 text-gold-accent mr-2 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-teal-800 mb-3">Positive Interactions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {resource.content.empowermentAdvice.positive_interactions.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Users className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destination-Specific Tips */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <MapPin className="h-8 w-8 text-teal-oasis mr-3" />
              Destination-Specific Tips for Women
            </h2>
            
            {resource.content.specificDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{destination.destination}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Female Traveler Tips</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {destination.female_traveler_tips.map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended Accommodations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {destination.accommodations.map((accommodation, i) => (
                          <li key={i} className="flex items-start">
                            <Home className="h-3 w-3 text-gold-accent mr-2 mt-1 flex-shrink-0" />
                            {accommodation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "family-friendly-egypt") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Family-Friendly Egypt</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              Updated January 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Family-Friendly Egypt
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete guide to exploring Egypt with children - attractions, tips, and practical advice for families
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Users className="h-8 w-8 text-teal-oasis mr-3" />
                Family Adventure Awaits
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Egypt offers an extraordinary educational and adventure experience for families. From exploring ancient pyramids to sailing the Nile, children can witness history come alive while creating unforgettable memories. This comprehensive guide provides practical advice for traveling with children of all ages.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Baby className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-600">Toddlers (2-4)</h3>
                  <p className="text-sm text-gray-600">Outdoor attractions, short tours</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-600">Children (5-12)</h3>
                  <p className="text-sm text-gray-600">Interactive learning, adventures</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-600">Teens (13+)</h3>
                  <p className="text-sm text-gray-600">Cultural immersion, independence</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Family Destinations */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <MapPin className="h-8 w-8 text-teal-oasis mr-3" />
                Top Family Destinations
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Giza Pyramids & Sphinx",
                    age: "All Ages",
                    duration: "Half Day",
                    highlights: ["Great Pyramid interior", "Camel rides", "Sound & Light show", "Panoramic viewpoint"],
                    tips: ["Visit early morning", "Bring sun protection", "Book family guides", "Allow 3-4 hours"],
                    difficulty: "Easy"
                  },
                  {
                    name: "Egyptian Museum, Cairo",
                    age: "6+ Years",
                    duration: "3-4 Hours",
                    highlights: ["Tutankhamun treasures", "Mummy rooms", "Interactive exhibits", "Ancient artifacts"],
                    tips: ["Use audio guides", "Focus on key exhibits", "Visit weekday mornings", "Take breaks"],
                    difficulty: "Moderate"
                  },
                  {
                    name: "Luxor West Bank",
                    age: "8+ Years", 
                    duration: "Full Day",
                    highlights: ["Valley of the Kings", "Hatshepsut Temple", "Tomb explorations", "Ancient paintings"],
                    tips: ["Choose fewer tombs", "Bring flashlights", "Stay hydrated", "Private guides recommended"],
                    difficulty: "Moderate"
                  },
                  {
                    name: "Red Sea Coast",
                    age: "All Ages",
                    duration: "Multi-day",
                    highlights: ["Snorkeling adventures", "Glass-bottom boats", "Beach activities", "Marine life"],
                    tips: ["Family resorts with kids clubs", "Beginner snorkeling", "Reef-safe sunscreen", "All-inclusive options"],
                    difficulty: "Easy"
                  }
                ].map((destination, index) => (
                  <div key={index} className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-teal-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{destination.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-white text-teal-oasis border-teal-oasis">
                          {destination.age}
                        </Badge>
                        <Badge variant="outline" className="bg-white text-blue-600 border-blue-300">
                          {destination.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          Family Highlights
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {destination.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Family Tips
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {destination.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practical Family Tips */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Heart className="h-8 w-8 text-teal-oasis mr-3" />
                Essential Family Tips
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Package className="h-5 w-5 text-purple-600 mr-2" />
                    Packing Essentials
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Sun protection: hats, sunscreen (SPF 50+), sunglasses",
                      "Comfortable walking shoes with good grip",
                      "Light, breathable clothing for hot weather",
                      "Modest clothing for religious sites",
                      "Hand sanitizer and wet wipes",
                      "Reusable water bottles",
                      "Small backpack for day trips",
                      "Entertainment for travel: books, tablets, games"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-orange-600 mr-2" />
                    Safety & Health
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Travel insurance covering medical emergencies",
                      "Copies of passports and important documents",
                      "Emergency contact information in Arabic",
                      "Basic first aid kit with children's medications",
                      "Stay hydrated - drink bottled water only",
                      "Avoid street food, choose reputable restaurants",
                      "Keep children close in crowded areas",
                      "Sun safety: frequent shade breaks, early/late tours"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "women-travellers-tips") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Women Travellers' Guide</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              Updated January 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Women Travellers' Guide to Egypt
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential safety tips, cultural guidance, and empowerment advice for women exploring Egypt confidently
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Shield className="h-8 w-8 text-teal-oasis mr-3" />
                Confident Travel in Egypt
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Egypt welcomes women travelers with its rich history, stunning landscapes, and warm hospitality. While the experience can be incredibly rewarding, understanding local customs, safety considerations, and practical tips will help ensure a confident and enjoyable journey. This comprehensive guide provides essential advice for solo female travelers and women traveling in groups.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-pink-600">Cultural Respect</h3>
                  <p className="text-sm text-gray-600">Understanding local customs</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-600">Personal Safety</h3>
                  <p className="text-sm text-gray-600">Staying safe and confident</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-600">Empowerment</h3>
                  <p className="text-sm text-gray-600">Travel with confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dress Code Guide */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Shirt className="h-8 w-8 text-teal-oasis mr-3" />
                Cultural Dress Code
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    setting: "Religious Sites",
                    requirements: ["Cover shoulders, arms, and legs completely", "Loose-fitting clothing", "Headscarf for mosques", "Remove shoes before entering"],
                    tips: ["Carry lightweight scarf", "Wear slip-on shoes", "Respect photography rules"],
                    color: "rose"
                  },
                  {
                    setting: "General Sightseeing",
                    requirements: ["Modest clothing covering shoulders and knees", "Lightweight, breathable fabrics", "Comfortable walking shoes", "Sun protection"],
                    tips: ["Light colors reflect heat", "Layer for air-conditioned spaces", "Avoid tight clothing"],
                    color: "blue"
                  },
                  {
                    setting: "Beach & Resort Areas",
                    requirements: ["Modest swimwear at pools", "Cover-up when leaving beach", "Respect local customs", "Conservative evening wear"],
                    tips: ["One-piece or modest bikinis", "Bring sarongs", "Check resort dress codes"],
                    color: "teal"
                  }
                ].map((section, index) => (
                  <div key={index} className={`border rounded-lg p-6 bg-gradient-to-r from-${section.color}-50 to-${section.color}-100`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.setting}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`font-semibold text-${section.color}-600 mb-3 flex items-center`}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Requirements
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {section.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className={`h-3 w-3 text-${section.color}-500 mr-2 mt-1 flex-shrink-0`} />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold text-${section.color}-700 mb-3 flex items-center`}>
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Pro Tips
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {section.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <span className={`w-1.5 h-1.5 bg-${section.color}-500 rounded-full mr-2 mt-2`}></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety & Empowerment */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Shield className="h-8 w-8 text-teal-oasis mr-3" />
                Safety & Empowerment
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    Personal Safety
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Trust your instincts in all situations",
                      "Avoid walking alone at night",
                      "Keep copies of documents separate",
                      "Share itinerary with trusted contacts",
                      "Use reputable tour companies",
                      "Stay confident and assertive",
                      "Learn basic Arabic phrases",
                      "Keep emergency contacts handy"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                    Confident Travel
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Book accommodations with good reviews from women",
                      "Join female travel groups or tours",
                      "Use women-only train cars when available",
                      "Stay in well-lit, busy areas",
                      "Negotiate taxi fares beforehand",
                      "Carry a wedding ring (real or fake)",
                      "Learn about local women's rights",
                      "Connect with local women when possible"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Information */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Phone className="h-8 w-8 text-teal-oasis mr-3" />
                Emergency Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-red-700 mb-4">Emergency Contacts</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Police:</strong> 122</li>
                    <li><strong>Tourist Police:</strong> 126</li>
                    <li><strong>Ambulance:</strong> 123</li>
                    <li><strong>Fire:</strong> 180</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Useful Phrases</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>"La" (لا):</strong> No</li>
                    <li><strong>"Imshi" (امشي):</strong> Go away</li>
                    <li><strong>"Mish ayza" (مش عايزة):</strong> I don't want</li>
                    <li><strong>"Sayedni fil hal" (سيبني في حالي):</strong> Leave me alone</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "photography-drone-rules") {
    return (
      <div className="min-h-screen bg-cool-limestone py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-teal-oasis">Home</Link>
            <span>/</span>
            <Link href="/travel-planning" className="hover:text-teal-oasis">Travel Tips</Link>
            <span>/</span>
            <span className="text-gray-900">Photography & Drone Rules</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-accent-coral text-white mb-4">
              Updated January 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Photography & Drone Rules in Egypt
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete guide to photography regulations, drone laws, and legal requirements for travelers in Egypt
            </p>
          </div>

          {/* Critical Drone Warning */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-red-700">Critical: Drone Operations Prohibited</h2>
                </div>
                <p className="text-red-700 text-lg mb-4">
                  Egypt has extremely strict drone regulations. Tourist drone operations are generally prohibited without complex government permits that take months to obtain and cost thousands of dollars.
                </p>
                <div className="bg-red-100 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">Severe Penalties Include:</h3>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Immediate equipment confiscation</li>
                    <li>• Heavy fines (up to $3,000 USD)</li>
                    <li>• Deportation from Egypt</li>
                    <li>• Criminal prosecution under aviation law</li>
                    <li>• Permanent travel ban from Egypt</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photography Regulations */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Camera className="h-8 w-8 text-teal-oasis mr-3" />
                Photography Regulations
              </h2>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-gradient-to-r from-green-50 to-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Personal Tourism Photography</h3>
                    <Badge variant="outline" className="bg-white text-green-600 border-green-300">Generally Permitted</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">Allowed Locations</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Most tourist attractions and monuments</li>
                        <li>• Public squares and traditional markets</li>
                        <li>• Nile River and corniche walkways</li>
                        <li>• Hotel and resort areas</li>
                        <li>• Desert landscapes and oases</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">Important Notes</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Camera fees: 50-300 EGP at monuments</li>
                        <li>• Flash photography often prohibited</li>
                        <li>• Some tombs charge additional fees</li>
                        <li>• Always ask before photographing people</li>
                        <li>• Mummy rooms usually prohibit photography</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-gradient-to-r from-red-50 to-red-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Prohibited Photography</h3>
                    <Badge variant="outline" className="bg-white text-red-600 border-red-300">Strictly Forbidden</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3">Forbidden Subjects</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Military installations and personnel</li>
                        <li>• Government buildings and officials</li>
                        <li>• Bridges and strategic infrastructure</li>
                        <li>• Airport security and customs areas</li>
                        <li>• Police stations and checkpoints</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3">Consequences</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Immediate camera/phone confiscation</li>
                        <li>• Detention for security questioning</li>
                        <li>• Forced deletion of all images</li>
                        <li>• Possible legal prosecution</li>
                        <li>• Diplomatic intervention may be required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-gradient-to-r from-yellow-50 to-yellow-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Commercial Photography</h3>
                    <Badge variant="outline" className="bg-white text-yellow-600 border-yellow-300">Permit Required</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-600 mb-3">Requirements</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Ministry of Tourism permit mandatory</li>
                        <li>• 15-30 day advance application</li>
                        <li>• Professional equipment declaration</li>
                        <li>• Higher fees for commercial shoots</li>
                        <li>• Guide escort may be required</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-700 mb-3">Process</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Submit detailed shooting plan</li>
                        <li>• Pay substantial permit fees</li>
                        <li>• Customs clearance for equipment</li>
                        <li>• Limited shooting hours enforced</li>
                        <li>• Final approval at each location</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidelines */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Lightbulb className="h-8 w-8 text-teal-oasis mr-3" />
                Safe Photography Practices
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Recommended Practices
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Research site-specific photography rules beforehand
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Carry small bills for camera fees (50-300 EGP)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Always ask permission before photographing locals
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Respect religious customs and modest dress codes
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Use hotel safes for expensive camera equipment
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Keep cameras discreet in sensitive areas
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      Backup photos to cloud storage daily
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    Critical Mistakes to Avoid
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Never bring drones without proper permits
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Don't photograph military or police personnel
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Avoid photographing bridges or government buildings
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Never ignore no-photography signs or barriers
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Don't use flash in prohibited museum areas
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Avoid declaring personal equipment as professional
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      Don't assume all tourist areas allow photography
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Official Contacts */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
                <Phone className="h-8 w-8 text-teal-oasis mr-3" />
                Official Information & Permits
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Ministry of Tourism & Antiquities</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Photography Permits:</strong> +20 2 2735 8515</li>
                    <li><strong>Email:</strong> info@tourism.gov.eg</li>
                    <li><strong>Address:</strong> Misr Travel Tower, Abbassia, Cairo</li>
                    <li><strong>Processing Time:</strong> 15-30 business days</li>
                    <li><strong>Commercial Fees:</strong> $200-2000 USD depending on scope</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-red-700 mb-4">Egyptian Civil Aviation Authority</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Drone Permits:</strong> +20 2 2267 4274</li>
                    <li><strong>Email:</strong> info@civilaviation.gov.eg</li>
                    <li><strong>Address:</strong> Cairo International Airport</li>
                    <li><strong>Processing Time:</strong> 60-90 business days</li>
                    <li><strong>Status:</strong> Tourist permits rarely approved</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default layout for other resources
  return (
    <div className="min-h-screen bg-cool-limestone py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{resource.title}</h1>
          <p className="text-xl text-gray-600">{resource.description}</p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6">Content for this resource is coming soon.</p>
            <Link href="/travel-planning">
              <Button className="bg-teal-oasis hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Travel Planning
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}