import { useState } from "react";
import { ArrowLeft, Search, Filter, Users, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Volunteers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  const volunteers = [
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Swayamsevak",
      area: "Connaught Place",
      responsibility: "Sangha Sahayak",
      phone: "+91 98765 43210",
      email: "ramesh.kumar@example.com",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Suresh Sharma",
      role: "Karyakarta",
      area: "Karol Bagh",
      responsibility: "Event Coordinator",
      phone: "+91 98765 43211",
      email: "suresh.sharma@example.com",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Mahesh Gupta",
      role: "Sangha Chalak",
      area: "Rohini",
      responsibility: "Area Head",
      phone: "+91 98765 43212",
      email: "mahesh.gupta@example.com",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Rajesh Verma",
      role: "Swayamsevak",
      area: "Dwarka",
      responsibility: "Cultural Events",
      phone: "+91 98765 43213",
      email: "rajesh.verma@example.com",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Dinesh Patel",
      role: "Karyakarta",
      area: "Connaught Place",
      responsibility: "Training Coordinator",
      phone: "+91 98765 43214",
      email: "dinesh.patel@example.com",
      avatar: "/placeholder.svg",
    },
  ];

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || volunteer.role === roleFilter;
    const matchesArea = areaFilter === "all" || volunteer.area === areaFilter;
    return matchesSearch && matchesRole && matchesArea;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 sticky top-0 z-50 shadow-subtle">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Volunteer Directory
          </h1>
          <p className="text-muted-foreground">स्वयंसेवक सूची - Complete list of registered volunteers</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-subtle">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">248</p>
              <p className="text-sm text-muted-foreground">Total Volunteers</p>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-muted-foreground">Karyakartas</p>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Areas</p>
            </CardContent>
          </Card>
          <Card className="shadow-subtle">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-medium mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Swayamsevak">Swayamsevak</SelectItem>
                  <SelectItem value="Karyakarta">Karyakarta</SelectItem>
                  <SelectItem value="Sangha Chalak">Sangha Chalak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="Connaught Place">Connaught Place</SelectItem>
                  <SelectItem value="Karol Bagh">Karol Bagh</SelectItem>
                  <SelectItem value="Rohini">Rohini</SelectItem>
                  <SelectItem value="Dwarka">Dwarka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer List */}
        <div className="space-y-3">
          {filteredVolunteers.map((volunteer) => (
            <Card 
              key={volunteer.id} 
              className="hover:shadow-medium transition-shadow cursor-pointer"
              onClick={() => navigate(`/volunteers/${volunteer.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={volunteer.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {volunteer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1 mb-2">
                      <Badge variant="secondary">{volunteer.role}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {volunteer.area}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{volunteer.responsibility}</span>
                      </div>
                      <div>{volunteer.phone}</div>
                      <div>{volunteer.email}</div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <Card className="shadow-medium">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No volunteers found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Volunteers;
