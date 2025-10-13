import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Search, Filter, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Pratham Varsh Varg",
      date: "2025-10-20",
      time: "06:00 AM",
      location: "Local Shakha Ground",
      participants: 45,
      status: "upcoming",
      category: "Training",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400",
    },
    {
      id: 2,
      title: "Cultural Program - Diwali",
      date: "2025-10-28",
      time: "06:00 PM",
      location: "Community Hall",
      participants: 120,
      status: "upcoming",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400",
    },
    {
      id: 3,
      title: "Seva Karya - Community Service",
      date: "2025-10-15",
      time: "08:00 AM",
      location: "Various Locations",
      participants: 80,
      status: "ongoing",
      category: "Service",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
    },
    {
      id: 4,
      title: "Monthly Baithak",
      date: "2025-10-05",
      time: "07:00 PM",
      location: "RSS Karyalay",
      participants: 35,
      status: "completed",
      category: "Meeting",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
    },
  ];

  const filterEvents = (status: string) => {
    if (status === "all") return events;
    return events.filter((event) => event.status === status);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 sticky top-0 z-50 shadow-subtle">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Events
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search & Filter */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {filterEvents("upcoming").map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-4">
            {filterEvents("ongoing").map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filterEvents("completed").map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: any }) => {
  const navigate = useNavigate();
  
  const statusColors = {
    upcoming: "bg-blue-500/10 text-blue-500",
    ongoing: "bg-green-500/10 text-green-500",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-medium transition-shadow cursor-pointer"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div className="flex flex-col sm:flex-row">
        <div 
          className="w-full sm:w-48 h-48 sm:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {event.category}
              </Badge>
            </div>
            <Badge className={statusColors[event.status as keyof typeof statusColors]}>
              {event.status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{event.participants} participants</span>
            </div>
          </div>

          {event.status === "upcoming" && (
            <Button className="mt-4 w-full sm:w-auto">
              Register Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Events;
