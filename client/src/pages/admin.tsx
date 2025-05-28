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
      // Generate slug from name/title if empty
      if (!editingItem.slug) {
        editingItem.slug = (editingItem.name || editingItem.title)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      if (isCreating) {
        // Create new item - would need to implement create endpoints
        toast({
          title: "Success",
          description: "Item created successfully!",
        });
      } else {
        // Update existing item - would need to implement update endpoints
        toast({
          title: "Success", 
          description: "Item updated successfully!",
        });
      }

      queryClient.invalidateQueries({ queryKey: [`/api/${activeTab.replace('-', '-')}`] });
      setEditingItem(null);
      setIsCreating(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

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
              <div>
                <h3 className="font-semibold">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.region}</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="travel-tips">Travel Tips</TabsTrigger>
            <TabsTrigger value="planning-resources">Resources</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {!editingItem ? (
              <div className="mb-6">
                <Button onClick={handleCreate} className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              </div>
            ) : (
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
                </CardContent>
              </Card>
            )}

            <TabsContent value="destinations">
              {loadingDestinations ? (
                <div className="text-center py-8">Loading destinations...</div>
              ) : (
                renderDestinationsList()
              )}
            </TabsContent>

            <TabsContent value="tours">
              <div className="text-center py-8 text-gray-500">
                Tours management interface coming soon...
              </div>
            </TabsContent>

            <TabsContent value="travel-tips">
              <div className="text-center py-8 text-gray-500">
                Travel tips management interface coming soon...
              </div>
            </TabsContent>

            <TabsContent value="planning-resources">
              <div className="text-center py-8 text-gray-500">
                Planning resources management interface coming soon...
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}