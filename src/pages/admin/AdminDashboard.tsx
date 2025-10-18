import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Bell, FileText, ClipboardList, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Events", value: "12", icon: Calendar, trend: "+2 this month", color: "text-blue-600" },
    { title: "Total Users", value: "156", icon: Users, trend: "+18 this week", color: "text-green-600" },
    { title: "Forms Created", value: "8", icon: FileText, trend: "3 active", color: "text-purple-600" },
    { title: "Notifications Sent", value: "24", icon: Bell, trend: "Last sent today", color: "text-orange-600" },
    { title: "Active Notices", value: "5", icon: ClipboardList, trend: "2 high priority", color: "text-red-600" },
    { title: "Event Registrations", value: "89", icon: TrendingUp, trend: "+12 this week", color: "text-indigo-600" },
  ];

  const quickActions = [
    { label: "Create Event", icon: Calendar, path: "/admin/events" },
    { label: "Manage Users", icon: Users, path: "/admin/users" },
    { label: "Send Notification", icon: Bell, path: "/admin/notifications" },
    { label: "Create Form", icon: FileText, path: "/admin/forms" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of RSS management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-6 w-6" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
