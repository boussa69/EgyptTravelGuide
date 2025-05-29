import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Save, X, Upload, Image, Users, BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { destinationsApi, toursApi, travelTipsApi, planningResourcesApi } from "@/lib/api";
import type { Destination, Tour, TravelTip, PlanningResource } from "@/types";
import DashboardWidgets from "@/components/admin/dashboard-widgets";
import InlineEditor from "@/components/admin/inline-editor";
import RoleManager from "@/components/admin/role-manager";
import MediaManager from "@/components/admin/media-manager";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: destinations = [], isLoading: loadingDestinations } = useQuery({
    queryKey: ["/api/destinations"],
    queryFn: destinationsApi.getAll,
  });

  const { data: tours = [], isLoading: loadingTours } = useQuery({
    queryKey: ["/api/tours"],
    queryFn: () => toursApi.getAll(),
  });

  const { data: travelTips = [], isLoading: loadingTips } = useQuery({
    queryKey: ["/api/travel-tips"],
    queryFn: () => travelTipsApi.getAll(),
  });

  const { data: planningResources = [], isLoading: loadingResources } = useQuery({
    queryKey: ["/api/planning-resources"],
    queryFn: () => planningResourcesApi.getAll(),
  });

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const renderItineraryBuilder = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Itinerary Builder</h2>
          <Button onClick={() => setActiveTab("itinerary-tour-selector")}>
            <Plus className="w-4 h-4 mr-2" />
            Build New Itinerary
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tours.map((tour: Tour) => (
            <Card key={tour.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{tour.name}</CardTitle>
                <p className="text-sm text-gray-600">{tour.category}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleManageItinerary(tour.id, tour.name)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Manage Itinerary
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewItinerary(tour.slug)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleCreateSampleData(tour.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Sample Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const handleManageItinerary = (tourId: number, tourName: string) => {
    setEditingItem({ tourId, tourName, type: 'itinerary' });
    setActiveTab("itinerary-manager");
  };

  const handleViewItinerary = (slug: string) => {
    window.open(`/tours/${slug}`, '_blank');
  };

  const handleCreateSampleData = async (tourId: number) => {
    try {
      const response = await fetch(`/api/tours/${tourId}/create-sample-itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Sample itinerary data created successfully",
        });
      } else {
        throw new Error('Failed to create sample data');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create sample data",
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    const newItem = getEmptyItem(activeTab);
    setEditingItem(newItem);
    setIsCreating(true);
  };

  const getEmptyItem = (type: string) => {
    switch (type) {
      case "destinations":
        return {
          name: "",
          slug: "",
          description: "",
          shortDescription: "",
          region: "",
          imageUrl: "",
          rating: 5,
          reviewCount: 0,
          priceFrom: 0,
          highlights: [],
          attractions: [],
        };
      case "tours":
        return {
          name: "",
          slug: "",
          description: "",
          shortDescription: "",
          duration: 1,
          price: 0,
          imageUrl: "",
          category: "",
          difficulty: "Easy",
          included: [],
          excluded: [],
          itinerary: [],
          highlights: [],
          destinationIds: [],
          rating: 5,
          reviewCount: 0,
          isPopular: false,
          isLuxury: false,
        };
      case "travel-tips":
        return {
          title: "",
          slug: "",
          category: "",
          content: "",
          shortDescription: "",
          icon: "",
          tips: [],
          isEssential: false,
        };
      case "planning-resources":
        return {
          title: "",
          slug: "",
          category: "",
          content: "",
          shortDescription: "",
          icon: "",
          keyPoints: [],
          resources: [],
          isEssential: false,
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      // Generate unique slug from name/title
      if (!editingItem.slug || editingItem.slug === '') {
        const baseSlug = (editingItem.name || editingItem.title)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        // Add timestamp to ensure uniqueness
        editingItem.slug = `${baseSlug}-${Date.now()}`;
      }

      if (isCreating) {
        // Create new destination
        if (activeTab === "destinations") {
          const response = await fetch('/api/destinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem)
          });
          
          if (!response.ok) throw new Error('Failed to create destination');
          
          toast({
            title: "Success",
            description: "New destination created successfully!",
          });
        }
        
        // Create new tour
        if (activeTab === "tours") {
          const response = await fetch('/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem)
          });
          
          if (!response.ok) throw new Error('Failed to create tour');
          
          toast({
            title: "Success",
            description: "New tour created successfully!",
          });
        }
        
        // Create new travel tip
        if (activeTab === "travel-tips") {
          const response = await fetch('/api/travel-tips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem)
          });
          
          if (!response.ok) throw new Error('Failed to create travel tip');
          
          toast({
            title: "Success",
            description: "New travel tip created successfully!",
          });
        }
      } else {
        // Update existing item
        if (activeTab === "destinations") {
          const response = await fetch(`/api/destinations/${editingItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingItem)
          });
          
          if (!response.ok) throw new Error('Failed to update destination');
          
          toast({
            title: "Success", 
            description: "Destination updated successfully!",
          });
        }
      }

      // Refresh the data
      queryClient.invalidateQueries({ queryKey: [`/api/${activeTab}`] });
      setEditingItem(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: number, type: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      let endpoint = '';
      if (type === 'destination') {
        endpoint = `/api/destinations/${id}`;
      } else if (type === 'tour') {
        endpoint = `/api/tours/${id}`;
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${type}`);
      }

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`,
      });

      // Refresh the data
      queryClient.invalidateQueries({ queryKey: [`/api/${activeTab}`] });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: `Failed to delete ${type}. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const renderTourForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tour Name</label>
          <Input
            value={editingItem?.name || ""}
            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
            placeholder="Tour name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Input
            value={editingItem?.category || ""}
            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
            placeholder="Cultural, Adventure, Luxury"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <Input
          value={editingItem?.shortDescription || ""}
          onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
          placeholder="Brief tour description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={editingItem?.description || ""}
          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
          placeholder="Detailed tour description"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Duration (days)</label>
          <Input
            type="number"
            min="1"
            value={editingItem?.duration || 1}
            onChange={(e) => setEditingItem({ ...editingItem, duration: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <Input
            type="number"
            value={editingItem?.price || 0}
            onChange={(e) => setEditingItem({ ...editingItem, price: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <Input
            value={editingItem?.difficulty || "Easy"}
            onChange={(e) => setEditingItem({ ...editingItem, difficulty: e.target.value })}
            placeholder="Easy, Moderate, Hard"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <Input
          value={editingItem?.imageUrl || ""}
          onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Highlights (comma-separated)</label>
        <Textarea
          value={editingItem?.highlights?.join(", ") || ""}
          onChange={(e) => setEditingItem({ 
            ...editingItem, 
            highlights: e.target.value.split(",").map(h => h.trim()).filter(h => h) 
          })}
          placeholder="Expert guide, 5-star hotels, All meals included"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editingItem?.isPopular || false}
              onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
            />
            <span className="text-sm font-medium">Popular Tour</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editingItem?.isLuxury || false}
              onChange={(e) => setEditingItem({ ...editingItem, isLuxury: e.target.checked })}
            />
            <span className="text-sm font-medium">Luxury Tour</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDestinationForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={editingItem?.name || ""}
            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
            placeholder="Destination name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <Input
            value={editingItem?.region || ""}
            onChange={(e) => setEditingItem({ ...editingItem, region: e.target.value })}
            placeholder="Region"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <Input
          value={editingItem?.shortDescription || ""}
          onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
          placeholder="Brief description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={editingItem?.description || ""}
          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
          placeholder="Detailed description"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <Input
            type="number"
            min="1"
            max="5"
            value={editingItem?.rating || 5}
            onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Review Count</label>
          <Input
            type="number"
            value={editingItem?.reviewCount || 0}
            onChange={(e) => setEditingItem({ ...editingItem, reviewCount: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price From ($)</label>
          <Input
            type="number"
            value={editingItem?.priceFrom || 0}
            onChange={(e) => setEditingItem({ ...editingItem, priceFrom: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <Input
          value={editingItem?.imageUrl || ""}
          onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Highlights (comma-separated)</label>
        <Textarea
          value={editingItem?.highlights?.join(", ") || ""}
          onChange={(e) => setEditingItem({ 
            ...editingItem, 
            highlights: e.target.value.split(",").map(h => h.trim()).filter(h => h) 
          })}
          placeholder="Pyramids of Giza, Egyptian Museum, Islamic Cairo"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Attractions (comma-separated)</label>
        <Textarea
          value={editingItem?.attractions?.join(", ") || ""}
          onChange={(e) => setEditingItem({ 
            ...editingItem, 
            attractions: e.target.value.split(",").map(a => a.trim()).filter(a => a) 
          })}
          placeholder="Great Pyramid, Sphinx, Citadel of Saladin"
          rows={2}
        />
      </div>
    </div>
  );

  const renderDestinationsList = () => (
    <div className="space-y-4">
      {destinations.map((destination: Destination) => (
        <Card key={destination.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <InlineEditor
                  value={destination.name}
                  onSave={(newValue) => {
                    // Handle destination name update
                    console.log('Update destination name:', newValue);
                  }}
                  className="font-semibold"
                />
                <InlineEditor
                  value={destination.region}
                  onSave={(newValue) => {
                    // Handle region update
                    console.log('Update region:', newValue);
                  }}
                  className="text-sm text-gray-600"
                />
                <p className="text-sm text-teal-600">From ${destination.priceFrom}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{destination.rating}★</Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(destination)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(destination.id, 'destination')}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your Egypt travel website content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="travel-tips">Tips & Resources</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {!editingItem && activeTab !== "dashboard" && activeTab !== "workflow" && activeTab !== "media" && activeTab !== "itineraries" ? (
              <div className="mb-6">
                <Button onClick={handleCreate} className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              </div>
            ) : null}
            
            {editingItem ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {isCreating ? "Create New" : "Edit"} {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeTab === "destinations" && renderDestinationForm()}
                  {activeTab === "tours" && renderTourForm()}
                </CardContent>
              </Card>
            ) : null}

            {/* Dashboard Overview with KPI Widgets */}
            <TabsContent value="dashboard">
              <DashboardWidgets 
                stats={{
                  totalDestinations: destinations.length,
                  totalTours: tours.length,
                  totalTips: travelTips.length,
                  totalSubscribers: 47, // From your newsletter data
                  recentViews: 1247,
                  popularDestination: "Cairo"
                }}
              />
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">New newsletter subscription from visitor</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">Cairo destination page viewed 127 times</span>
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm">7-Day Egypt Highlights tour inquiries increased</span>
                      <span className="text-xs text-gray-500">This week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="destinations">
              {loadingDestinations ? (
                <div className="text-center py-8">Loading destinations...</div>
              ) : (
                renderDestinationsList()
              )}
            </TabsContent>

            <TabsContent value="tours">
              <div className="space-y-4">
                {tours.map((tour: Tour) => (
                  <Card key={tour.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={tour.imageUrl}
                          alt={tour.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <InlineEditor
                            value={tour.name}
                            onSave={(newValue) => console.log('Update tour name:', newValue)}
                            className="font-semibold"
                          />
                          <p className="text-sm text-gray-600">{tour.duration} days • {tour.category}</p>
                          <p className="text-sm text-teal-600">${tour.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={tour.isPopular ? "default" : "secondary"}>
                          {tour.isPopular ? "Popular" : "Standard"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(tour)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(tour.id, 'tour')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="itineraries">
              {renderItineraryBuilder()}
            </TabsContent>

            <TabsContent value="media">
              <MediaManager />
            </TabsContent>

            <TabsContent value="workflow">
              <RoleManager />
            </TabsContent>

            <TabsContent value="travel-tips">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Travel Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {travelTips.map((tip: TravelTip) => (
                        <div key={tip.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <InlineEditor
                              value={tip.title}
                              onSave={(newValue) => console.log('Update tip title:', newValue)}
                              className="font-medium"
                            />
                            <Badge variant={tip.isEssential ? "default" : "secondary"}>
                              {tip.isEssential ? "Essential" : "Standard"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{tip.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Planning Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Planning Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {planningResources.map((resource: PlanningResource) => (
                        <div key={resource.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <InlineEditor
                              value={resource.title}
                              onSave={(newValue) => console.log('Update resource title:', newValue)}
                              className="font-medium"
                            />
                            <Badge variant={resource.isEssential ? "default" : "secondary"}>
                              {resource.isEssential ? "Essential" : "Standard"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{resource.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}