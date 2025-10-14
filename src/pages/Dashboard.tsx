import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, Home, Calendar, FileText, User, QrCode, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardBanner from "@/components/DashboardBanner";
import ProfileMenu from "@/components/ProfileMenu";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "New Event", message: "Republic Day Celebration on 26th January", time: "2 hours ago", unread: true },
    { id: 2, title: "Profile Update", message: "Please complete your registration", time: "1 day ago", unread: true },
    { id: 3, title: "Reminder", message: "Weekly Shakha tomorrow at 6 AM", time: "2 days ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-subtle">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ProfileMenu />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Aviral
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 rounded-lg border ${notif.unread ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{notif.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                          <span className="text-xs text-muted-foreground mt-2 block">{notif.time}</span>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
              </SheetHeader>
              <ProfileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <DashboardBanner />

        {/* News/Display Section */}
        <div className="px-4 py-6">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            <TabsContent value="news" className="mt-4 space-y-4">
              {/* News Marquee */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-4 overflow-hidden border border-primary/20">
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Latest Updates</h3>
                <div className="relative overflow-hidden">
                  <div className="flex animate-marquee whitespace-nowrap">
                    <span className="inline-block mx-4">🎉 Republic Day Celebration - 26th January 2025</span>
                    <span className="inline-block mx-4">📢 New Volunteer Registration Open</span>
                    <span className="inline-block mx-4">🏆 Annual Sports Event - Register Now</span>
                    <span className="inline-block mx-4">📚 Weekly Shakha - Every Sunday 6 AM</span>
                    <span className="inline-block mx-4">🎯 Youth Leadership Program Starting Soon</span>
                    <span className="inline-block mx-4">🎉 Republic Day Celebration - 26th January 2025</span>
                    <span className="inline-block mx-4">📢 New Volunteer Registration Open</span>
                    <span className="inline-block mx-4">🏆 Annual Sports Event - Register Now</span>
                    <span className="inline-block mx-4">📚 Weekly Shakha - Every Sunday 6 AM</span>
                    <span className="inline-block mx-4">🎯 Youth Leadership Program Starting Soon</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="shadow-subtle hover:shadow-medium transition-shadow cursor-pointer"
                  onClick={() => navigate("/volunteers")}
                >
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Volunteers</h3>
                    <p className="text-sm text-muted-foreground">
                      View volunteer directory
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className="shadow-subtle hover:shadow-medium transition-shadow cursor-pointer"
                  onClick={() => navigate("/registration")}
                >
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Complete Registration</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill your volunteer profile
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="display" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Display content will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => { setActiveTab("home"); navigate("/dashboard"); }}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => { setActiveTab("events"); navigate("/events"); }}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "events" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </button>

          <button
            onClick={() => setActiveTab("qr")}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 -mt-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
              <QrCode className="w-6 h-6 text-primary-foreground" />
            </div>
          </button>

          <button
            onClick={() => { setActiveTab("journals"); navigate("/calendar"); }}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "journals" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Calendar</span>
          </button>

          <button
            onClick={() => { setActiveTab("profile"); navigate("/profile"); }}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
