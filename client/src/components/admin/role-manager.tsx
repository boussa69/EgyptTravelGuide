import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Shield, Edit, Eye, Trash2 } from "lucide-react";

type UserRole = "admin" | "editor" | "author" | "viewer";
type ContentStatus = "draft" | "review" | "published";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
}

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: ContentStatus;
  author: string;
  lastModified: string;
}

const rolePermissions = {
  admin: ["create", "edit", "delete", "publish", "manage_users"],
  editor: ["create", "edit", "publish", "review"],
  author: ["create", "edit"],
  viewer: ["view"]
};

const roleColors = {
  admin: "bg-red-100 text-red-800",
  editor: "bg-blue-100 text-blue-800", 
  author: "bg-green-100 text-green-800",
  viewer: "bg-gray-100 text-gray-800"
};

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800",
  review: "bg-orange-100 text-orange-800",
  published: "bg-green-100 text-green-800"
};

export default function RoleManager() {
  const [currentUser] = useState<User>({
    id: 1,
    name: "Admin User",
    email: "admin@egypttravel.com", 
    role: "admin",
    lastActive: "now"
  });

  const [users] = useState<User[]>([
    { id: 1, name: "Admin User", email: "admin@egypttravel.com", role: "admin", lastActive: "now" },
    { id: 2, name: "Content Editor", email: "editor@egypttravel.com", role: "editor", lastActive: "2 hours ago" },
    { id: 3, name: "Travel Writer", email: "author@egypttravel.com", role: "author", lastActive: "1 day ago" }
  ]);

  const [contentItems] = useState<ContentItem[]>([
    { id: 1, title: "Siwa Oasis Adventure", type: "destination", status: "draft", author: "Travel Writer", lastModified: "2 hours ago" },
    { id: 2, title: "15-Day Egypt Explorer", type: "tour", status: "review", author: "Travel Writer", lastModified: "1 day ago" },
    { id: 3, title: "Egyptian Currency Guide", type: "tip", status: "published", author: "Content Editor", lastModified: "3 days ago" }
  ]);

  const canPerform = (action: string) => {
    return rolePermissions[currentUser.role]?.includes(action) || false;
  };

  const handleStatusChange = (itemId: number, newStatus: ContentStatus) => {
    if (!canPerform("publish") && newStatus === "published") {
      alert("You don't have permission to publish content");
      return;
    }
    // Update status logic here
    console.log(`Changing item ${itemId} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Current User Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-teal-600" />
            <span>Current User</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
            <Badge className={roleColors[currentUser.role]}>
              {currentUser.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Content Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Content Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {item.type} • by {item.author} • {item.lastModified}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={statusColors[item.status]}>
                    {item.status}
                  </Badge>
                  
                  {canPerform("edit") && (
                    <Select
                      value={item.status}
                      onValueChange={(value) => handleStatusChange(item.id, value as ContentStatus)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        {canPerform("publish") && (
                          <SelectItem value="published">Published</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                  
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    {canPerform("edit") && (
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                    {canPerform("delete") && (
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      {canPerform("manage_users") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-teal-600" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email} • Active {user.lastActive}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}