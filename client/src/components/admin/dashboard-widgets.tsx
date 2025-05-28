import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, MapPin, Calendar, Users, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalDestinations: number;
  totalTours: number;
  totalTips: number;
  totalSubscribers: number;
  recentViews: number;
  popularDestination: string;
}

interface DashboardWidgetsProps {
  stats: DashboardStats;
}

export default function DashboardWidgets({ stats }: DashboardWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Content Overview */}
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          <BarChart3 className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-teal-700">
            {stats.totalDestinations + stats.totalTours + stats.totalTips}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {stats.totalDestinations} destinations • {stats.totalTours} tours • {stats.totalTips} tips
          </p>
        </CardContent>
      </Card>

      {/* Popular Destinations */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
          <MapPin className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700">{stats.popularDestination}</div>
          <p className="text-xs text-gray-600 mt-1">Top destination this month</p>
        </CardContent>
      </Card>

      {/* Newsletter Subscribers */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{stats.totalSubscribers}</div>
          <p className="text-xs text-gray-600 mt-1">Newsletter subscribers</p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Views</CardTitle>
          <Eye className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats.recentViews}</div>
          <p className="text-xs text-gray-600 mt-1">Last 24 hours</p>
        </CardContent>
      </Card>

      {/* Tours Performance */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-700">{stats.totalTours}</div>
          <p className="text-xs text-gray-600 mt-1">Available tour packages</p>
        </CardContent>
      </Card>

      {/* Growth Trend */}
      <Card className="border-l-4 border-l-rose-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth</CardTitle>
          <TrendingUp className="h-4 w-4 text-rose-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-700">+12%</div>
          <p className="text-xs text-gray-600 mt-1">Content engagement up</p>
        </CardContent>
      </Card>
    </div>
  );
}