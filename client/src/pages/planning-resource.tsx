import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Thermometer, Users, Camera, AlertTriangle, Plane, CreditCard, FileText, MapPin, CheckCircle2, Clock, Globe, Package, Shirt, Sun, Shield, Heart, MessageCircle, Eye, HandHeart, DollarSign, Calculator, TrendingDown, AlertCircle, Phone, Cross, FileSearch } from "lucide-react";
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
          step: "Before Departure",
          tasks: ["Check passport validity (6+ months)", "Obtain visa if required", "Purchase travel insurance", "Prepare required documents"]
        },
        {
          step: "At Egyptian Airport",
          tasks: ["Complete arrival card", "Present passport and visa", "Immigration interview (brief)", "Collect luggage and proceed to customs"]
        },
        {
          step: "Customs Declaration",
          tasks: ["Declare items over $200", "No duty on personal items", "Tobacco and alcohol limits apply", "Currency declaration if over $10,000"]
        }
      ],
      importantNotes: [
        {
          title: "Passport Requirements",
          content: "Your passport must be valid for at least 6 months from entry date and have at least one blank page for the visa stamp."
        },
        {
          title: "Prohibited Items",
          content: "Drones require special permits. Medications should be in original containers with prescriptions. Check latest customs regulations."
        },
        {
          title: "Currency Limits",
          content: "No limit on foreign currency, but amounts over $10,000 must be declared. Egyptian pounds limited to EGP 5,000."
        },
        {
          title: "COVID-19 Updates",
          content: "Check current health requirements before travel. Requirements may change based on global health situations."
        }
      ],
      tips: [
        "Apply for e-Visa at least 7 days before travel",
        "Keep printed copies of visa confirmation",
        "Have hotel booking confirmation ready",
        "Carry sufficient USD cash for visa on arrival",
        "Download offline maps before arrival",
        "Register with your embassy if staying long-term"
      ]
    }
  },
  "packing-guide": {
    title: "Egypt Packing Guide",
    description: "Essential items and smart packing tips for your Egyptian adventure",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Packing for Egypt requires balancing comfort, cultural respect, and practicality. The desert climate, religious sites, and cultural norms all influence what you should bring for an optimal travel experience.",
      essentialCategories: [
        {
          category: "Clothing",
          icon: "👕",
          description: "Dress modestly while staying comfortable in the heat",
          items: [
            {
              item: "Lightweight, long-sleeved shirts",
              purpose: "Sun protection and mosque visits",
              quantity: "3-4 pieces",
              priority: "Essential"
            },
            {
              item: "Loose-fitting pants/trousers",
              purpose: "Cultural respect and comfort",
              quantity: "2-3 pairs",
              priority: "Essential"
            },
            {
              item: "Modest knee-length shorts",
              purpose: "Hotel/resort areas only",
              quantity: "1-2 pairs",
              priority: "Optional"
            },
            {
              item: "Light cardigan or jacket",
              purpose: "Air conditioning and desert evenings",
              quantity: "1 piece",
              priority: "Recommended"
            },
            {
              item: "Scarf or shawl",
              purpose: "Mosque visits and sun protection",
              quantity: "1-2 pieces",
              priority: "Essential"
            }
          ]
        },
        {
          category: "Footwear",
          icon: "👟",
          description: "Comfortable walking shoes for various terrains",
          items: [
            {
              item: "Comfortable walking shoes",
              purpose: "Sightseeing and uneven surfaces",
              quantity: "1 pair",
              priority: "Essential"
            },
            {
              item: "Sandals (closed-toe preferred)",
              purpose: "Hot weather and easy mosque entry",
              quantity: "1 pair",
              priority: "Recommended"
            },
            {
              item: "Flip-flops",
              purpose: "Hotel/beach use",
              quantity: "1 pair",
              priority: "Optional"
            }
          ]
        },
        {
          category: "Sun Protection",
          icon: "☀️",
          description: "Protect yourself from intense desert sun",
          items: [
            {
              item: "High SPF sunscreen (30+)",
              purpose: "Prevent severe sunburn",
              quantity: "Large bottle",
              priority: "Essential"
            },
            {
              item: "Wide-brimmed hat",
              purpose: "Face and neck protection",
              quantity: "1 piece",
              priority: "Essential"
            },
            {
              item: "Polarized sunglasses",
              purpose: "Eye protection from glare",
              quantity: "1 pair + backup",
              priority: "Essential"
            },
            {
              item: "Lip balm with SPF",
              purpose: "Prevent chapped lips",
              quantity: "1-2 tubes",
              priority: "Recommended"
            }
          ]
        },
        {
          category: "Health & Hygiene",
          icon: "🏥",
          description: "Stay healthy and comfortable during travel",
          items: [
            {
              item: "Hand sanitizer",
              purpose: "Hygiene at tourist sites",
              quantity: "Travel-size bottles",
              priority: "Essential"
            },
            {
              item: "Wet wipes",
              purpose: "Quick cleaning without water",
              quantity: "Multiple packs",
              priority: "Recommended"
            },
            {
              item: "Basic first aid kit",
              purpose: "Minor cuts and stomach issues",
              quantity: "Small kit",
              priority: "Recommended"
            },
            {
              item: "Prescription medications",
              purpose: "Personal health needs",
              quantity: "Full trip supply + extra",
              priority: "Essential"
            },
            {
              item: "Probiotics",
              purpose: "Digestive health adjustment",
              quantity: "2-week supply",
              priority: "Optional"
            }
          ]
        },
        {
          category: "Electronics & Documentation",
          icon: "📱",
          description: "Stay connected and organized",
          items: [
            {
              item: "Universal power adapter",
              purpose: "Charge devices (Type C/F plugs)",
              quantity: "1-2 adapters",
              priority: "Essential"
            },
            {
              item: "Portable power bank",
              purpose: "Long sightseeing days",
              quantity: "High capacity",
              priority: "Recommended"
            },
            {
              item: "Waterproof phone case",
              purpose: "Sand and water protection",
              quantity: "1 case",
              priority: "Recommended"
            },
            {
              item: "Passport photocopies",
              purpose: "Backup identification",
              quantity: "3-4 copies",
              priority: "Essential"
            },
            {
              item: "Travel insurance documents",
              purpose: "Emergency medical coverage",
              quantity: "Physical + digital copies",
              priority: "Essential"
            }
          ]
        }
      ],
      seasonalTips: [
        {
          season: "Winter (Dec-Feb)",
          temperature: "Cool evenings, warm days",
          additions: ["Light jacket", "Long pants for evenings", "Closed shoes"],
          considerations: "Pack layers for temperature variations"
        },
        {
          season: "Spring/Fall (Mar-May, Sep-Nov)",
          temperature: "Perfect weather",
          additions: ["Light layers", "Comfortable walking gear"],
          considerations: "Ideal packing season - focus on comfort"
        },
        {
          season: "Summer (Jun-Aug)",
          temperature: "Extremely hot",
          additions: ["Extra sun protection", "Cooling towels", "Electrolyte supplements"],
          considerations: "Minimize outdoor gear, maximize sun protection"
        }
      ],
      culturalGuidelines: [
        {
          rule: "Mosque Visits",
          requirements: "Cover arms, legs, and hair (women). Remove shoes.",
          packingTip: "Bring a large scarf and wear slip-on shoes"
        },
        {
          rule: "Conservative Dress",
          requirements: "Modest clothing in public areas outside resorts.",
          packingTip: "Pack loose, long clothing even in summer"
        },
        {
          rule: "Religious Sites",
          requirements: "Respectful attire required at all historical sites.",
          packingTip: "Keep shoulders and knees covered"
        }
      ],
      expertTips: [
        "Pack light-colored clothing to reflect heat",
        "Bring more underwear and socks than you think you need",
        "Pack a small day bag for excursions",
        "Leave valuable jewelry at home",
        "Bring a reusable water bottle with filter",
        "Pack baby powder to prevent chafing from sand",
        "Bring ziplock bags to protect electronics from sand",
        "Pack comfortable sleepwear for hot nights"
      ]
    }
  },
  "cultural-etiquette": {
    title: "Cultural Etiquette Guide",
    description: "Navigate Egyptian culture with respect and confidence",
    category: "Culture",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt has a rich cultural heritage spanning thousands of years. Understanding local customs, religious practices, and social norms will enhance your experience and help you connect respectfully with Egyptian people.",
      religiousEtiquette: [
        {
          context: "Mosque Visits",
          guidelines: [
            "Remove shoes before entering",
            "Dress modestly - cover arms, legs, and hair (women)",
            "Avoid visiting during prayer times unless invited",
            "Turn off mobile phones or put on silent",
            "Don't point feet toward Mecca",
            "Ask permission before photographing"
          ],
          cultural_note: "Mosques are active places of worship. Show the same respect you would in any religious building."
        },
        {
          context: "Islamic Customs",
          guidelines: [
            "Don't eat, drink, or smoke in public during Ramadan daylight hours",
            "Respect prayer times (5 times daily)",
            "Use your right hand for eating and greeting",
            "Don't show soles of feet when sitting",
            "Avoid public displays of affection",
            "Don't refuse offered hospitality unless absolutely necessary"
          ],
          cultural_note: "Egypt is a predominantly Muslim country. These practices are part of daily life."
        }
      ],
      socialEtiquette: [
        {
          situation: "Greetings",
          men: "Handshakes are common. Close friends may embrace.",
          women: "Wait for women to extend their hand first. Between women, light cheek kisses are normal.",
          mixed: "Let the woman initiate contact. A smile and verbal greeting is always appropriate.",
          tip: "Use 'As-salaam alaikum' (peace be upon you) for a warm greeting."
        },
        {
          situation: "Dining",
          men: "Wait for the host to begin eating. Eat with your right hand.",
          women: "Same etiquette applies. It's polite to try a little of everything offered.",
          mixed: "Meals are social events. Expect multiple courses and lots of conversation.",
          tip: "Leaving a small amount of food shows you were well-fed."
        },
        {
          situation: "Business/Shopping",
          men: "Bargaining is expected in markets. Start at 50% of asking price.",
          women: "Same rules apply. Don't be afraid to negotiate respectfully.",
          mixed: "Building relationships comes before business. Expect tea and conversation.",
          tip: "Patience is key. Rushing negotiations can be seen as disrespectful."
        }
      ],
      dressGuidelines: [
        {
          location: "Religious Sites",
          requirements: "Full coverage required",
          men: "Long pants, shirt with sleeves, closed shoes",
          women: "Long sleeves, long pants/skirt, head covering, closed shoes",
          notes: "Some sites provide coverings, but bring your own to be safe"
        },
        {
          location: "Urban Areas",
          requirements: "Conservative dress recommended",
          men: "Pants/long shorts, t-shirt or collared shirt",
          women: "Knee-length clothing, covered shoulders, modest necklines",
          notes: "More relaxed than religious sites but still conservative"
        },
        {
          location: "Beach/Resort Areas",
          requirements: "Resort wear acceptable within resort grounds",
          men: "Shorts, t-shirts, swimwear in pool/beach areas",
          women: "Summer dresses, swimwear in designated areas",
          notes: "Cover up when leaving resort property"
        },
        {
          location: "Desert Excursions",
          requirements: "Practical coverage for sun protection",
          men: "Light, long-sleeved shirts, long pants, hat",
          women: "Same as men - focus on sun protection over fashion",
          notes: "Function over form - desert sun is intense"
        }
      ],
      communicationTips: [
        {
          topic: "Language",
          advice: "Learn basic Arabic phrases - Egyptians appreciate the effort",
          phrases: ["Shukran (Thank you)", "Ahlan wa sahlan (Welcome)", "Ma'a salama (Goodbye)", "Min fadlik (Please)"]
        },
        {
          topic: "Body Language",
          advice: "Be aware of non-verbal communication differences",
          points: ["Maintain modest eye contact", "Don't use thumbs up (can be offensive)", "Pointing with index finger is rude - use open hand", "Personal space is typically closer than Western norms"]
        },
        {
          topic: "Photography",
          advice: "Always ask permission before photographing people",
          guidelines: ["Never photograph without permission", "Be especially careful with women and children", "Some military/government buildings prohibit photography", "Tip people who pose for photos"]
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
  "budget-planning": {
    title: "Egypt Budget Planning Guide",
    description: "Plan your finances for an unforgettable Egyptian adventure",
    category: "Practical",
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt offers exceptional value for travelers, with costs varying significantly based on your travel style and preferences. From budget backpacking to luxury experiences, understanding local pricing helps you plan effectively and get the most from your Egyptian adventure.",
      budgetCategories: [
        {
          category: "Budget Traveler",
          dailyRange: "$25-40 USD",
          description: "Hostels, local food, public transport",
          breakdown: {
            accommodation: "$8-15/night (hostels, budget hotels)",
            food: "$8-12/day (street food, local restaurants)",
            transport: "$3-5/day (public buses, metro)",
            activities: "$5-8/day (free sites, basic tours)"
          },
          tips: ["Stay in hostels or budget hotels", "Eat at local restaurants", "Use public transportation", "Visit free historical sites"]
        },
        {
          category: "Mid-Range Traveler", 
          dailyRange: "$40-80 USD",
          description: "3-star hotels, mix of local and tourist restaurants",
          breakdown: {
            accommodation: "$20-40/night (3-star hotels, guesthouses)",
            food: "$15-25/day (mix of local and tourist restaurants)",
            transport: "$8-15/day (taxis, private transfers)",
            activities: "$15-25/day (guided tours, entrance fees)"
          },
          tips: ["Book 3-star hotels in advance", "Mix street food with restaurant meals", "Use Uber and taxis", "Join group tours for better rates"]
        },
        {
          category: "Luxury Traveler",
          dailyRange: "$100-300+ USD", 
          description: "5-star hotels, fine dining, private tours",
          breakdown: {
            accommodation: "$80-200+/night (5-star hotels, resorts)",
            food: "$30-60+/day (fine dining, hotel restaurants)",
            transport: "$20-50/day (private drivers, domestic flights)",
            activities: "$40-100+/day (private tours, premium experiences)"
          },
          tips: ["Book luxury hotels with Nile views", "Try hotel fine dining experiences", "Hire private guides and drivers", "Book premium experiences like hot air balloons"]
        }
      ],
      costBreakdowns: [
        {
          category: "Accommodation",
          icon: "🏨",
          items: [
            { type: "Hostel dorm", price: "$8-15/night", notes: "Shared facilities, backpacker areas" },
            { type: "Budget hotel", price: "$15-25/night", notes: "Private room, basic amenities" },
            { type: "Mid-range hotel", price: "$30-60/night", notes: "Good location, pool, breakfast" },
            { type: "Luxury hotel", price: "$100-300+/night", notes: "5-star service, Nile views, spa" },
            { type: "Nile cruise", price: "$80-200/night", notes: "All-inclusive, multiple destinations" }
          ]
        },
        {
          category: "Food & Drinks",
          icon: "🍽️", 
          items: [
            { type: "Street food", price: "$1-3/meal", notes: "Ful, falafel, koshari" },
            { type: "Local restaurant", price: "$5-10/meal", notes: "Traditional Egyptian cuisine" },
            { type: "Tourist restaurant", price: "$10-20/meal", notes: "International menu, tourist areas" },
            { type: "Fine dining", price: "$25-50+/meal", notes: "Hotel restaurants, rooftop dining" },
            { type: "Coffee/tea", price: "$1-3", notes: "Local cafes, hotel lobbies" },
            { type: "Bottled water", price: "$0.25-1", notes: "Essential for staying hydrated" }
          ]
        },
        {
          category: "Transportation",
          icon: "🚗",
          items: [
            { type: "Metro (Cairo)", price: "$0.15-0.30", notes: "Cheapest option in Cairo" },
            { type: "Public bus", price: "$0.30-1", notes: "Local transport, can be crowded" },
            { type: "Taxi (local)", price: "$2-8", notes: "Negotiate fare beforehand" },
            { type: "Uber/Careem", price: "$3-12", notes: "Fixed pricing, air conditioning" },
            { type: "Train (Cairo-Luxor)", price: "$15-40", notes: "Overnight sleeper available" },
            { type: "Domestic flight", price: "$80-150", notes: "Cairo to Aswan/Luxor" }
          ]
        },
        {
          category: "Activities & Sites",
          icon: "🏛️",
          items: [
            { type: "Pyramids of Giza", price: "$13 entry", notes: "Additional fees for inside pyramids" },
            { type: "Egyptian Museum", price: "$12 entry", notes: "Extra for photography" },
            { type: "Valley of Kings", price: "$11 entry", notes: "3 tombs included" },
            { type: "Abu Simbel", price: "$22 entry", notes: "UNESCO World Heritage site" },
            { type: "Day tour (group)", price: "$30-60", notes: "Transportation and guide included" },
            { type: "Private guide", price: "$50-100/day", notes: "Personalized experience" },
            { type: "Hot air balloon", price: "$60-100", notes: "Sunrise over Valley of Kings" },
            { type: "Nile felucca ride", price: "$10-20", notes: "Traditional sailing boat" }
          ]
        }
      ],
      moneyTips: [
        {
          topic: "Currency & Exchange",
          advice: "Egyptian Pound (EGP) is the local currency. USD and EUR widely accepted.",
          details: ["Exchange at banks or authorized dealers", "Keep receipts for currency exchange", "ATMs widely available in cities", "Credit cards accepted in tourist areas"]
        },
        {
          topic: "Tipping Culture",
          advice: "Tipping (baksheesh) is expected and part of service workers' income.",
          details: ["Restaurants: 10-15% of bill", "Hotel staff: $1-2 per service", "Tour guides: $5-10 per day", "Drivers: $3-5 per day", "Felucca captains: $2-3 per ride"]
        },
        {
          topic: "Bargaining",
          advice: "Haggling is expected in markets and with street vendors.",
          details: ["Start at 50% of asking price", "Be prepared to walk away", "Fixed prices in malls and restaurants", "Tourist areas have higher starting prices"]
        },
        {
          topic: "Payment Methods",
          advice: "Cash is king, but digital payments are growing.",
          details: ["Carry small bills for tips", "Credit cards in hotels and tourist restaurants", "Mobile payments available in cities", "Keep emergency cash reserve"]
        }
      ],
      savingTips: [
        "Visit during shoulder season (Mar-Apr, Oct-Nov) for better prices",
        "Book accommodation outside main tourist areas",
        "Eat at local restaurants away from tourist sites",
        "Use public transport instead of taxis when possible",
        "Buy a tourist pass for multiple site visits",
        "Join group tours instead of private tours",
        "Negotiate package deals for multi-day tours", 
        "Stay longer to get better hotel rates",
        "Bring water bottles and refill instead of buying",
        "Shop at local markets instead of tourist shops"
      ],
      budgetAlerts: [
        {
          alert: "Tourist Area Markup",
          description: "Prices near major attractions can be 3-5x higher than local areas",
          solution: "Walk a few blocks away from main sites for better prices"
        },
        {
          alert: "Hidden Fees",
          description: "Some tours exclude entrance fees, meals, or tips",
          solution: "Ask for total cost breakdown before booking"
        },
        {
          alert: "Seasonal Price Surges", 
          description: "Winter months (Dec-Feb) see 50-100% price increases",
          solution: "Book early or visit during shoulder seasons"
        },
        {
          alert: "Cash vs Card",
          description: "Card payments may include service charges",
          solution: "Compare total costs including fees before choosing payment method"
        }
      ]
    }
  },
  "safety-insurance": {
    title: "Safety & Insurance Guide",
    description: "Stay safe and protected during your Egyptian adventure",
    category: "Practical", 
    lastUpdated: "Updated January 2025",
    content: {
      overview: "Egypt is generally safe for tourists, but like any international destination, proper preparation and awareness are essential. Understanding local safety conditions, having appropriate insurance coverage, and knowing emergency procedures will ensure a worry-free journey through this incredible country.",
      safetyOverview: {
        generalSafety: "Egypt has a strong tourism police presence and prioritizes visitor safety. Tourist areas are well-monitored, and violent crime against tourists is rare.",
        currentLevel: "Exercise normal precautions with heightened awareness in certain areas",
        lastUpdated: "January 2025"
      },
      travelInsurance: {
        essential: true,
        coverage: [
          {
            type: "Medical Coverage",
            minAmount: "$100,000",
            importance: "Essential",
            details: ["Emergency medical treatment", "Hospitalization costs", "Medical evacuation if needed", "Prescription medications"]
          },
          {
            type: "Trip Cancellation",
            minAmount: "Trip cost value",
            importance: "Highly Recommended", 
            details: ["Flight cancellations", "Hotel booking issues", "Family emergencies", "Illness before travel"]
          },
          {
            type: "Personal Property",
            minAmount: "$2,000-5,000",
            importance: "Recommended",
            details: ["Lost luggage compensation", "Stolen electronics", "Travel document replacement", "Personal belongings coverage"]
          },
          {
            type: "Adventure Activities",
            minAmount: "Varies",
            importance: "If Applicable",
            details: ["Desert safari coverage", "Diving/snorkeling", "Hot air balloon rides", "Camel trekking"]
          }
        ]
      },
      healthSafety: [
        {
          category: "Vaccinations",
          required: ["No mandatory vaccinations for most countries"],
          recommended: ["Hepatitis A", "Hepatitis B", "Typhoid", "Tetanus/Diphtheria", "Polio (if traveling from endemic areas)"],
          notes: "Consult your doctor 4-6 weeks before travel"
        },
        {
          category: "Health Precautions",
          required: ["Travel insurance with medical coverage"],
          recommended: ["Hand sanitizer", "Basic first aid kit", "Prescription medications", "Probiotics for digestive health"],
          notes: "Drink bottled water and eat at reputable establishments"
        },
        {
          category: "Medical Facilities",
          required: ["Know location of nearest hospital"],
          recommended: ["Private hospitals in tourist areas", "24/7 pharmacies", "Tourist police contact", "Embassy contact information"],
          notes: "Major cities have excellent private medical facilities"
        }
      ],
      personalSafety: [
        {
          situation: "General Security",
          precautions: ["Stay in tourist areas especially at night", "Use licensed tour operators", "Keep copies of important documents", "Register with your embassy"],
          risks: ["Petty theft in crowded areas", "Overcharging by vendors", "Unlicensed tour operators"],
          tips: ["Travel in groups when possible", "Use hotel safes for valuables", "Keep emergency cash separate"]
        },
        {
          situation: "Transportation Safety",
          precautions: ["Use reputable transport companies", "Avoid overcrowded vehicles", "Wear seatbelts when available", "Check vehicle condition before desert trips"],
          risks: ["Traffic accidents", "Unreliable vehicles", "Getting lost in desert areas"],
          tips: ["Book transport through hotels", "Use GPS navigation", "Inform others of travel plans"]
        },
        {
          situation: "Tourist Scams",
          precautions: ["Research common scams beforehand", "Agree on prices before services", "Use official tour operators", "Be cautious of overly friendly strangers"],
          risks: ["Overcharging", "Fake tour guides", "Jewelry/papyrus scams", "False emergency scenarios"],
          tips: ["Walk away from high-pressure sales", "Get recommendations from hotels", "Trust your instincts"]
        }
      ],
      emergencyInfo: [
        {
          service: "Police",
          number: "122",
          notes: "Tourist Police available in major destinations"
        },
        {
          service: "Ambulance", 
          number: "123",
          notes: "Private ambulance services also available"
        },
        {
          service: "Fire Department",
          number: "180",
          notes: "Emergency services in Arabic and some English"
        },
        {
          service: "Tourist Hotline",
          number: "126",
          notes: "24/7 assistance for tourists in multiple languages"
        }
      ],
      areaSpecificTips: [
        {
          area: "Cairo",
          safetyLevel: "Moderate",
          tips: ["Avoid demonstrations and large crowds", "Use ride-hailing apps instead of street taxis", "Stay alert in Khan el-Khalili bazaar", "Keep valuables secure in crowded areas"],
          avoidAreas: ["Some outer suburbs at night", "Unlit areas after dark"]
        },
        {
          area: "Luxor/Aswan",
          safetyLevel: "Good",
          tips: ["Hot weather precautions essential", "Stay hydrated during site visits", "Use licensed Nile cruise operators", "Respect photography restrictions"],
          avoidAreas: ["Remote desert areas without guides"]
        },
        {
          area: "Red Sea Coast",
          safetyLevel: "Very Good", 
          tips: ["Follow diving safety protocols", "Use reef-safe sunscreen", "Stay within resort security areas", "Be cautious of strong currents"],
          avoidAreas: ["Remote beaches without lifeguards"]
        },
        {
          area: "Western Desert",
          safetyLevel: "Requires Caution",
          tips: ["Always travel with experienced guides", "Carry emergency communication devices", "Inform authorities of travel plans", "Bring extra water and supplies"],
          avoidAreas: ["Border areas", "Unguided desert excursions"]
        }
      ],
      travelTips: [
        "Register with your embassy upon arrival",
        "Keep emergency contacts easily accessible", 
        "Carry travel insurance documents at all times",
        "Learn basic Arabic phrases for emergencies",
        "Download offline maps before traveling",
        "Keep local emergency numbers in your phone",
        "Inform family of your daily itinerary",
        "Carry a whistle for emergency situations",
        "Know the location of your country's embassy",
        "Keep a charged power bank for communication"
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
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {resource.content.seasons.map((season, index) => (
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
                        {season.pros.map((pro, i) => (
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
                        {season.cons.map((con, i) => (
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
                      {season.activities.map((activity, i) => (
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

          {/* Monthly Timeline */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-teal-oasis mr-3" />
                Monthly Weather Guide
              </h3>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-12 gap-2 min-w-[800px]">
                  {resource.content.monthlyGuide.map((month, index) => (
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
                {resource.content.specialEvents.map((event, index) => (
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
            
            {resource.content.visaTypes.map((visa, index) => (
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

          {/* Entry Procedure */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-teal-oasis mr-3" />
                Entry Procedure
              </h3>
              
              <div className="space-y-6">
                {resource.content.entryProcedure.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-oasis text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{step.step}</h4>
                      <ul className="text-gray-600 space-y-1">
                        {step.tasks.map((task, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                Important Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.importantNotes.map((note, index) => (
                  <div key={index} className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{note.title}</h4>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expert Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.tips.map((tip, index) => (
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Package className="h-8 w-8 text-teal-oasis mr-3" />
              Essential Items by Category
            </h2>
            
            {resource.content.essentialCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        item.priority === 'Essential' ? 'border-red-500 bg-red-50' :
                        item.priority === 'Recommended' ? 'border-yellow-500 bg-yellow-50' :
                        'border-green-500 bg-green-50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.item}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.priority === 'Essential' ? 'border-red-500 text-red-700' :
                              item.priority === 'Recommended' ? 'border-yellow-500 text-yellow-700' :
                              'border-green-500 text-green-700'
                            }`}
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{item.purpose}</p>
                        <p className="text-xs font-medium text-teal-oasis">{item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Seasonal Packing Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Thermometer className="h-6 w-6 text-teal-oasis mr-3" />
                Seasonal Packing Tips
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {resource.content.seasonalTips.map((season, index) => (
                  <div key={index} className="bg-teal-oasis/5 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{season.season}</h4>
                    <p className="text-sm text-teal-oasis font-medium mb-3">{season.temperature}</p>
                    
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Additional Items:</p>
                      <ul className="text-xs text-gray-600">
                        {season.additions.map((addition, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                            {addition}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-xs text-gray-600 italic">{season.considerations}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cultural Guidelines */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-teal-oasis mr-3" />
                Cultural Dress Guidelines
              </h3>
              
              <div className="space-y-4">
                {resource.content.culturalGuidelines.map((guideline, index) => (
                  <div key={index} className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{guideline.rule}</h4>
                        <p className="text-sm text-gray-600 mb-2">{guideline.requirements}</p>
                        <p className="text-sm font-medium text-orange-700">
                          💡 {guideline.packingTip}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expert Packing Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Packing Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.expertTips.map((tip, index) => (
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

          {/* Religious Etiquette */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-teal-oasis mr-3" />
                Religious Etiquette
              </h3>
              
              <div className="space-y-6">
                {resource.content.religiousEtiquette.map((item, index) => (
                  <div key={index} className="bg-teal-oasis/5 rounded-lg p-6 border-l-4 border-teal-oasis">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">{item.context}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <ul className="space-y-2">
                          {item.guidelines.map((guideline, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <CheckCircle2 className="h-4 w-4 text-teal-oasis mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{guideline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                      <p className="text-sm font-medium text-yellow-800">
                        💡 {item.cultural_note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Etiquette */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-teal-oasis mr-3" />
                Social Etiquette
              </h3>
              
              <div className="space-y-6">
                {resource.content.socialEtiquette.map((item, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">{item.situation}</h4>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-blue-900 mb-2">For Men</h5>
                        <p className="text-sm text-blue-800">{item.men}</p>
                      </div>
                      
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-pink-900 mb-2">For Women</h5>
                        <p className="text-sm text-pink-800">{item.women}</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-green-900 mb-2">Mixed Groups</h5>
                        <p className="text-sm text-green-800">{item.mixed}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gold-accent/10 border-l-4 border-gold-accent p-3 rounded-r-lg">
                      <p className="text-sm font-medium text-gold-accent">
                        ⭐ {item.tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dress Guidelines */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shirt className="h-6 w-6 text-teal-oasis mr-3" />
                Dress Guidelines by Location
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.dressGuidelines.map((guide, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 text-lg">{guide.location}</h4>
                      <p className="text-sm text-teal-oasis font-medium">{guide.requirements}</p>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Men</p>
                        <p className="text-xs text-blue-800">{guide.men}</p>
                      </div>
                      
                      <div className="bg-pink-50 p-3 rounded">
                        <p className="text-xs font-semibold text-pink-900 mb-1">Women</p>
                        <p className="text-xs text-pink-800">{guide.women}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-600 italic">{guide.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 text-teal-oasis mr-3" />
                Communication & Photography
              </h3>
              
              <div className="space-y-6">
                {resource.content.communicationTips.map((tip, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      {tip.topic === 'Language' && <Globe className="h-5 w-5 text-teal-oasis mr-2" />}
                      {tip.topic === 'Body Language' && <Eye className="h-5 w-5 text-teal-oasis mr-2" />}
                      {tip.topic === 'Photography' && <Camera className="h-5 w-5 text-teal-oasis mr-2" />}
                      {tip.topic}
                    </h4>
                    <p className="text-gray-700 mb-3">{tip.advice}</p>
                    
                    {tip.phrases && (
                      <div className="bg-white p-3 rounded border">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Useful Phrases:</p>
                        <div className="flex flex-wrap gap-2">
                          {tip.phrases.map((phrase, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {phrase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {tip.points && (
                      <ul className="space-y-1">
                        {tip.points.map((point, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {tip.guidelines && (
                      <ul className="space-y-1">
                        {tip.guidelines.map((guideline, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{guideline}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cultural Sensitivities */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                Cultural Sensitivities
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.culturalSensitivities.map((item, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-red-900 mb-2">{item.topic}</h4>
                    <p className="text-sm text-red-800 mb-2">{item.guidance}</p>
                    <p className="text-xs text-red-600 italic">{item.reason}</p>
                  </div>
                ))}
              </div>
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

          {/* Budget Categories */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Calculator className="h-8 w-8 text-teal-oasis mr-3" />
              Travel Style Budget Ranges
            </h2>
            
            {resource.content.budgetCategories.map((budget, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{budget.category}</h3>
                      <p className="text-gray-600 mb-4">{budget.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-gold-accent/20 rounded-lg p-3 mb-2">
                        <p className="font-bold text-gold-accent text-lg">{budget.dailyRange}</p>
                        <p className="text-xs text-gray-600">per day</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Daily Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Accommodation:</span>
                          <span className="font-medium">{budget.breakdown.accommodation}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Food:</span>
                          <span className="font-medium">{budget.breakdown.food}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transport:</span>
                          <span className="font-medium">{budget.breakdown.transport}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Activities:</span>
                          <span className="font-medium">{budget.breakdown.activities}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Money-Saving Tips</h4>
                      <ul className="space-y-1">
                        {budget.tips.map((tip, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cost Breakdowns */}
          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <DollarSign className="h-8 w-8 text-teal-oasis mr-3" />
              Detailed Cost Breakdowns
            </h2>
            
            {resource.content.costBreakdowns.map((breakdown, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{breakdown.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{breakdown.category}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {breakdown.items.map((item, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.type}</h4>
                          <span className="font-bold text-teal-oasis text-sm">{item.price}</span>
                        </div>
                        <p className="text-xs text-gray-600">{item.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Money Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 text-teal-oasis mr-3" />
                Essential Money Tips
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resource.content.moneyTips.map((tip, index) => (
                  <div key={index} className="bg-teal-oasis/5 rounded-lg p-6 border-l-4 border-teal-oasis">
                    <h4 className="font-bold text-gray-900 mb-3">{tip.topic}</h4>
                    <p className="text-gray-700 mb-3 text-sm">{tip.advice}</p>
                    
                    <ul className="space-y-1">
                      {tip.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-xs">
                          <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saving Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="h-6 w-6 text-green-600 mr-3" />
                Top Money-Saving Strategies
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.savingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="h-6 w-6 text-orange-500 mr-3" />
                Budget Alerts & Hidden Costs
              </h3>
              
              <div className="space-y-4">
                {resource.content.budgetAlerts.map((alert, index) => (
                  <div key={index} className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900 mb-1 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          {alert.alert}
                        </h4>
                        <p className="text-sm text-orange-800 mb-2">{alert.description}</p>
                        <p className="text-sm font-medium text-orange-700">
                          💡 Solution: {alert.solution}
                        </p>
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

          {/* Safety Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                Current Safety Status
              </h3>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                <h4 className="font-semibold text-green-900 mb-2">General Safety Assessment</h4>
                <p className="text-sm text-green-800 mb-2">{resource.content.safetyOverview.generalSafety}</p>
                <p className="text-sm font-medium text-green-700">
                  Current Level: {resource.content.safetyOverview.currentLevel}
                </p>
              </div>
              
              <p className="text-xs text-gray-600">Last Updated: {resource.content.safetyOverview.lastUpdated}</p>
            </CardContent>
          </Card>

          {/* Travel Insurance */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileSearch className="h-6 w-6 text-teal-oasis mr-3" />
                Travel Insurance Requirements
              </h3>
              
              {resource.content.travelInsurance.essential && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                  <h4 className="font-semibold text-red-900 mb-1 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Travel Insurance is Essential
                  </h4>
                  <p className="text-sm text-red-800">
                    Comprehensive travel insurance is strongly recommended for all visitors to Egypt.
                  </p>
                </div>
              )}

              <div className="grid gap-6">
                {resource.content.travelInsurance.coverage.map((coverage, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{coverage.type}</h4>
                        <Badge 
                          variant={coverage.importance === "Essential" ? "destructive" : 
                                  coverage.importance === "Highly Recommended" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {coverage.importance}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-teal-oasis">{coverage.minAmount}</p>
                        <p className="text-xs text-gray-600">minimum coverage</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-1">
                      {coverage.details.map((detail, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="h-3 w-3 text-teal-oasis mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health & Safety */}
          <div className="space-y-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Cross className="h-8 w-8 text-red-500 mr-3" />
              Health & Medical Safety
            </h2>
            
            {resource.content.healthSafety.map((health, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{health.category}</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-red-700">Required</h4>
                      <ul className="space-y-1">
                        {health.required.map((req, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-green-700">Recommended</h4>
                      <ul className="space-y-1">
                        {health.recommended.map((rec, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> {health.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Personal Safety */}
          <div className="space-y-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <Shield className="h-8 w-8 text-teal-oasis mr-3" />
              Personal Safety Guidelines
            </h2>
            
            {resource.content.personalSafety.map((safety, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{safety.situation}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                        Precautions
                      </h4>
                      <ul className="space-y-1">
                        {safety.precautions.map((precaution, i) => (
                          <li key={i} className="text-sm text-gray-700">• {precaution}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        Common Risks
                      </h4>
                      <ul className="space-y-1">
                        {safety.risks.map((risk, i) => (
                          <li key={i} className="text-sm text-gray-700">• {risk}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Heart className="h-4 w-4 text-blue-600 mr-2" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-1">
                        {safety.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-gray-700">• {tip}</li>
                        ))}
                      </ul>
                    </div>
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
                Emergency Contact Numbers
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.emergencyInfo.map((emergency, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-red-900">{emergency.service}</h4>
                      <span className="font-bold text-2xl text-red-700">{emergency.number}</span>
                    </div>
                    <p className="text-sm text-red-800">{emergency.notes}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Save these numbers in your phone before traveling and keep a written copy as backup.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Area-Specific Safety */}
          <div className="space-y-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif flex items-center">
              <MapPin className="h-8 w-8 text-teal-oasis mr-3" />
              Area-Specific Safety Tips
            </h2>
            
            {resource.content.areaSpecificTips.map((area, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{area.area}</h3>
                    <Badge 
                      variant={area.safetyLevel === "Very Good" ? "default" : 
                              area.safetyLevel === "Good" ? "secondary" : 
                              area.safetyLevel === "Moderate" ? "outline" : "destructive"}
                    >
                      {area.safetyLevel}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Safety Tips</h4>
                      <ul className="space-y-1">
                        {area.tips.map((tip, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Areas to Avoid</h4>
                      <ul className="space-y-1">
                        {area.avoidAreas.map((avoid, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Essential Travel Tips */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-teal-oasis mr-3" />
                Essential Safety Tips
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {resource.content.travelTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-teal-oasis/5 rounded-lg border-l-4 border-teal-oasis">
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