export interface Museum {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: string;
  highlights: string[];
  imageUrl?: string;
  category: string;
  openingHours?: string;
  entryFee?: string;
  website?: string;
  phone?: string;
  featured: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertMuseum {
  name: string;
  slug: string;
  description: string;
  location: string;
  highlights: string[];
  imageUrl?: string;
  category?: string;
  openingHours?: string;
  entryFee?: string;
  website?: string;
  phone?: string;
  featured?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}

class MuseumStorage {
  private museums: Museum[] = [
    {
      id: 1,
      name: "Egyptian Museum, Cairo",
      slug: "egyptian-museum-cairo",
      description: "Home to the world's largest collection of ancient Egyptian artifacts, including Tutankhamun's treasures.",
      location: "Tahrir Square, Cairo",
      highlights: ["Tutankhamun's mask", "Royal mummies", "Ancient jewelry", "Papyrus collection"],
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800",
      category: "archaeological",
      openingHours: "9:00 AM - 5:00 PM",
      entryFee: "200 EGP",
      website: "https://emi.gov.eg",
      phone: "+20 2 2579 6948",
      featured: true,
      displayOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Islamic Art Museum",
      slug: "islamic-art-museum",
      description: "Showcases one of the world's finest collections of Islamic art and artifacts.",
      location: "Bab al-Khalq, Cairo",
      highlights: ["Mamluk metalwork", "Islamic ceramics", "Textiles and carpets", "Calligraphy collection"],
      imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      category: "islamic",
      openingHours: "9:00 AM - 5:00 PM",
      entryFee: "60 EGP",
      featured: true,
      displayOrder: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Coptic Museum",
      slug: "coptic-museum",
      description: "Preserves the history and culture of Egypt's Christian heritage.",
      location: "Old Cairo",
      highlights: ["Coptic textiles", "Religious manuscripts", "Ancient icons", "Wooden artifacts"],
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      category: "coptic",
      openingHours: "9:00 AM - 4:00 PM",
      entryFee: "60 EGP",
      featured: true,
      displayOrder: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: "Alexandria National Museum",
      slug: "alexandria-national-museum",
      description: "Chronicles the city's rich Greco-Roman and Islamic history.",
      location: "Alexandria",
      highlights: ["Underwater artifacts", "Ptolemaic statues", "Roman mosaics", "Islamic collections"],
      imageUrl: "https://images.unsplash.com/photo-1471919743851-c4df8b6ee130?w=800",
      category: "archaeological",
      openingHours: "9:00 AM - 4:30 PM",
      entryFee: "40 EGP",
      featured: true,
      displayOrder: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      name: "Grand Egyptian Museum",
      slug: "grand-egyptian-museum",
      description: "The world's largest archaeological museum dedicated to a single civilization, housing over 100,000 artifacts.",
      location: "Giza Plateau",
      highlights: ["Complete Tutankhamun collection", "Solar boat exhibit", "Colossal statues", "Interactive displays"],
      imageUrl: "https://images.unsplash.com/photo-1578928476584-6a5a7e5d7e57?w=800",
      category: "archaeological",
      openingHours: "8:00 AM - 6:00 PM",
      entryFee: "600 EGP",
      featured: true,
      displayOrder: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      name: "Nubia Museum",
      slug: "nubia-museum",
      description: "Dedicated to Nubian history and culture, showcasing the heritage of ancient Nubia.",
      location: "Aswan",
      highlights: ["Nubian artifacts", "Archaeological finds", "Traditional crafts", "Cultural exhibits"],
      imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      category: "archaeological",
      openingHours: "9:00 AM - 1:00 PM, 5:00 PM - 9:00 PM",
      entryFee: "140 EGP",
      featured: false,
      displayOrder: 6,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      name: "Luxor Museum",
      slug: "luxor-museum",
      description: "Houses a remarkable collection of ancient Egyptian art from the Theban temples and necropolis.",
      location: "Luxor",
      highlights: ["Pharaonic sculptures", "Temple reliefs", "Mummy exhibits", "Royal artifacts"],
      imageUrl: "https://images.unsplash.com/photo-1578927518215-26f7f4b62bb3?w=800",
      category: "archaeological",
      openingHours: "9:00 AM - 2:00 PM, 4:00 PM - 9:00 PM",
      entryFee: "140 EGP",
      featured: false,
      displayOrder: 7,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      name: "Imhotep Museum",
      slug: "imhotep-museum",
      description: "Located at Saqqara, dedicated to the architect of the first pyramid and ancient Egyptian medicine.",
      location: "Saqqara",
      highlights: ["Pyramid artifacts", "Medical papyri", "Architectural models", "Saqqara finds"],
      imageUrl: "https://images.unsplash.com/photo-1578928476584-6a5a7e5d7e57?w=800",
      category: "specialized",
      openingHours: "8:00 AM - 4:00 PM",
      entryFee: "80 EGP",
      featured: false,
      displayOrder: 8,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private nextId = 9;

  async getAll(): Promise<Museum[]> {
    return this.museums
      .filter(m => m.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: number): Promise<Museum | undefined> {
    return this.museums.find(m => m.id === id && m.isActive);
  }

  async getBySlug(slug: string): Promise<Museum | undefined> {
    return this.museums.find(m => m.slug === slug && m.isActive);
  }

  async getFeatured(): Promise<Museum[]> {
    return this.museums
      .filter(m => m.featured && m.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getByCategory(category: string): Promise<Museum[]> {
    return this.museums
      .filter(m => m.category === category && m.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async create(data: InsertMuseum): Promise<Museum> {
    const museum: Museum = {
      id: this.nextId++,
      name: data.name,
      slug: data.slug,
      description: data.description,
      location: data.location,
      highlights: data.highlights,
      imageUrl: data.imageUrl,
      category: data.category || "archaeological",
      openingHours: data.openingHours,
      entryFee: data.entryFee,
      website: data.website,
      phone: data.phone,
      featured: data.featured || false,
      displayOrder: data.displayOrder || this.nextId,
      isActive: data.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.museums.push(museum);
    return museum;
  }

  async update(id: number, data: Partial<InsertMuseum>): Promise<Museum | undefined> {
    const index = this.museums.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    
    const existing = this.museums[index];
    const updated: Museum = {
      ...existing,
      ...data,
      id: existing.id,
      updatedAt: new Date()
    };
    
    this.museums[index] = updated;
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.museums.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    // Soft delete
    this.museums[index].isActive = false;
    this.museums[index].updatedAt = new Date();
    return true;
  }
}

export const museumStorage = new MuseumStorage();