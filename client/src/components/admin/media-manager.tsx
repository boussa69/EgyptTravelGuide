import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image, Trash2, Search, Grid, List } from "lucide-react";

interface MediaItem {
  id: number;
  url: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: 'image' | 'document';
}

export default function MediaManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample media items from your existing content
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1510759591315-6425cba413fe",
      name: "cairo-pyramids.jpg",
      size: "2.3 MB",
      uploadedAt: "2 days ago",
      type: 'image'
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56",
      name: "luxor-temple.jpg", 
      size: "1.8 MB",
      uploadedAt: "3 days ago",
      type: 'image'
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      name: "red-sea-coast.jpg",
      size: "2.1 MB", 
      uploadedAt: "1 week ago",
      type: 'image'
    }
  ]);

  const filteredItems = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };

  const handleDelete = (id: number) => {
    // Handle deletion logic here
    console.log('Delete media item:', id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image className="h-5 w-5 text-teal-600" />
              <span>Media Library</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Upload & Search Controls */}
          <div className="flex items-center justify-between mb-6">
            <Button onClick={handleUpload} className="bg-teal-600 hover:bg-teal-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
            
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Media Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* Info */}
                  <div className="p-3">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} • {item.uploadedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.size} • {item.uploadedAt}</p>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No media items found</p>
              {searchTerm && (
                <p className="text-sm">Try adjusting your search terms</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}