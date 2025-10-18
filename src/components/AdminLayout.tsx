import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Calendar, Users, UserCheck, Bell, FileText, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Events", icon: Calendar, path: "/admin/events" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Event Volunteers", icon: UserCheck, path: "/admin/event-volunteers" },
    { label: "Notifications", icon: Bell, path: "/admin/notifications" },
    { label: "Forms", icon: FileText, path: "/admin/forms" },
  ];

  return (
    <div className="flex h-screen w-full">
      <aside className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">RSS Admin</h2>
          <p className="text-sm text-muted-foreground">Management Panel</p>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Button>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  location.pathname === item.path && "bg-primary text-primary-foreground"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
