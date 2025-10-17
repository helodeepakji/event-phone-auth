import { useState } from "react";
import { ArrowLeft, Calendar, FileText, Bell, Megaphone, Plus, Users, UserCheck, X, Check, TrendingUp, Activity, Edit2, Trash2, LayoutDashboard, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState<Array<{ label: string; type: string; options?: string[] }>>([]);
  
  // Mock data for events
  const [events, setEvents] = useState([
    { id: 1, name: "Republic Day Celebration", date: "2025-01-26", location: "Central Park", volunteers: 45, status: "upcoming" },
    { id: 2, name: "Blood Donation Camp", date: "2025-01-20", location: "Community Center", volunteers: 32, status: "ongoing" },
    { id: 3, name: "Tree Plantation Drive", date: "2025-01-15", location: "Green Valley", volunteers: 78, status: "completed" },
    { id: 4, name: "Youth Leadership Workshop", date: "2025-02-01", location: "RSS Office", volunteers: 25, status: "upcoming" },
  ]);

  // Mock data for volunteers
  const [rssVolunteers, setRssVolunteers] = useState([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", status: "pending", joinedDate: "2025-01-10" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", status: "pending", joinedDate: "2025-01-12" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "9876543212", status: "approved", joinedDate: "2025-01-08" },
    { id: 4, name: "Sunita Reddy", email: "sunita@example.com", phone: "9876543213", status: "approved", joinedDate: "2025-01-05" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", status: "pending", joinedDate: "2025-01-14" },
  ]);

  const [eventVolunteers, setEventVolunteers] = useState([
    { id: 1, name: "Suresh Reddy", event: "Republic Day Celebration", email: "suresh@example.com", status: "pending", appliedDate: "2025-01-10" },
    { id: 2, name: "Meera Singh", event: "Blood Donation Camp", email: "meera@example.com", status: "pending", appliedDate: "2025-01-11" },
    { id: 3, name: "Vikram Joshi", event: "Tree Plantation Drive", email: "vikram@example.com", status: "accepted", appliedDate: "2025-01-09" },
    { id: 4, name: "Anjali Gupta", event: "Republic Day Celebration", email: "anjali@example.com", status: "accepted", appliedDate: "2025-01-08" },
  ]);

  // Mock data for created forms
  const [createdForms, setCreatedForms] = useState([
    { id: 1, title: "Volunteer Registration Form", fields: 8, responses: 45, createdDate: "2025-01-05" },
    { id: 2, title: "Event Feedback Form", fields: 5, responses: 23, createdDate: "2025-01-10" },
  ]);

  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Event Reminder", message: "Republic Day event tomorrow", sentDate: "2025-01-15", recipients: 150 },
    { id: 2, title: "New Volunteer Welcome", message: "Welcome to RSS family", sentDate: "2025-01-14", recipients: 5 },
  ]);

  // Mock data for notices
  const [notices, setNotices] = useState([
    { id: 1, title: "Important Announcement", content: "New shakha timings from next week", postedDate: "2025-01-12", priority: "high" },
    { id: 2, title: "Training Schedule", content: "Weekly training every Sunday", postedDate: "2025-01-10", priority: "medium" },
  ]);

  // Form field options data
  const [states] = useState(["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra", "Tamil Nadu", "Uttar Pradesh"]);
  const [cities] = useState(["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"]);
  const [professions] = useState(["Student", "Engineer", "Doctor", "Teacher", "Business", "Government Employee", "Other"]);

  const handleCreateEvent = () => {
    if (!eventName || !eventDate || !eventDescription) {
      toast({
        title: "Error",
        description: "Please fill all event fields",
        variant: "destructive",
      });
      return;
    }
    const newEvent = {
      id: events.length + 1,
      name: eventName,
      date: eventDate,
      location: "TBD",
      volunteers: 0,
      status: "upcoming"
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Event Created",
      description: `${eventName} has been successfully created.`,
    });
    setEventName("");
    setEventDate("");
    setEventDescription("");
  };

  const handleDeleteEvent = (id: number, name: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast({
      title: "Event Deleted",
      description: `${name} has been deleted.`,
    });
  };

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      toast({
        title: "Error",
        description: "Please fill all notification fields",
        variant: "destructive",
      });
      return;
    }
    const newNotification = {
      id: notifications.length + 1,
      title: notificationTitle,
      message: notificationMessage,
      sentDate: new Date().toISOString().split('T')[0],
      recipients: rssVolunteers.length
    };
    setNotifications([newNotification, ...notifications]);
    toast({
      title: "Notification Sent",
      description: "Your notification has been sent to all users.",
    });
    setNotificationTitle("");
    setNotificationMessage("");
  };

  const handleAddNotice = () => {
    if (!noticeTitle || !noticeContent) {
      toast({
        title: "Error",
        description: "Please fill all notice fields",
        variant: "destructive",
      });
      return;
    }
    const newNotice = {
      id: notices.length + 1,
      title: noticeTitle,
      content: noticeContent,
      postedDate: new Date().toISOString().split('T')[0],
      priority: "medium"
    };
    setNotices([newNotice, ...notices]);
    toast({
      title: "Notice Added",
      description: "Your notice has been added to the notice board.",
    });
    setNoticeTitle("");
    setNoticeContent("");
  };

  const handleDeleteNotice = (id: number) => {
    setNotices(notices.filter(n => n.id !== id));
    toast({
      title: "Notice Deleted",
      description: "Notice has been removed.",
    });
  };

  const handleCreateForm = () => {
    if (!formTitle || formFields.length === 0) {
      toast({
        title: "Error",
        description: "Please add a form title and at least one field",
        variant: "destructive",
      });
      return;
    }
    const newForm = {
      id: createdForms.length + 1,
      title: formTitle,
      fields: formFields.length,
      responses: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCreatedForms([...createdForms, newForm]);
    toast({
      title: "Form Created",
      description: `${formTitle} has been successfully created.`,
    });
    setFormTitle("");
    setFormFields([]);
  };

  const handleDeleteForm = (id: number) => {
    setCreatedForms(createdForms.filter(f => f.id !== id));
    toast({
      title: "Form Deleted",
      description: "Form has been deleted.",
    });
  };

  const addFormField = () => {
    setFormFields([...formFields, { label: "", type: "text", options: [] }]);
  };

  const handleApproveVolunteer = (id: number, name: string) => {
    setRssVolunteers(rssVolunteers.map(v => 
      v.id === id ? { ...v, status: "approved" } : v
    ));
    toast({
      title: "Volunteer Approved",
      description: `${name} has been approved to join RSS.`,
    });
  };

  const handleRejectVolunteer = (id: number, name: string) => {
    setRssVolunteers(rssVolunteers.filter(v => v.id !== id));
    toast({
      title: "Volunteer Rejected",
      description: `${name}'s application has been rejected.`,
      variant: "destructive",
    });
  };

  const handleAcceptEventVolunteer = (id: number, name: string) => {
    setEventVolunteers(eventVolunteers.map(v => 
      v.id === id ? { ...v, status: "accepted" } : v
    ));
    toast({
      title: "Volunteer Accepted",
      description: `${name} has been accepted for the event.`,
    });
  };

  const handleRejectEventVolunteer = (id: number, name: string) => {
    setEventVolunteers(eventVolunteers.filter(v => v.id !== id));
    toast({
      title: "Volunteer Rejected",
      description: `${name} has been rejected for the event.`,
      variant: "destructive",
    });
  };

  // Statistics
  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === "upcoming").length,
    totalVolunteers: rssVolunteers.filter(v => v.status === "approved").length,
    pendingApprovals: rssVolunteers.filter(v => v.status === "pending").length,
    totalForms: createdForms.length,
    totalNotifications: notifications.length,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-primary-foreground/80 mt-2">
            Manage events, forms, notifications, and notices
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex w-auto h-auto gap-1 bg-muted p-1">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="volunteers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>RSS Volunteers</span>
              </TabsTrigger>
              <TabsTrigger value="event-volunteers" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>Event Volunteers</span>
              </TabsTrigger>
              <TabsTrigger value="forms" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Forms</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="notices" className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                <span>Notices</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEvents}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.upcomingEvents} upcoming events
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingApprovals} pending approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Forms Created</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalForms}</div>
                  <p className="text-xs text-muted-foreground">
                    Active registration forms
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalNotifications}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Notices</CardTitle>
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{notices.length}</div>
                  <p className="text-xs text-muted-foreground">
                    On notice board
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Event Registrations</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventVolunteers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Pending applications
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">Create Event</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <UserCheck className="w-5 h-5" />
                  <span className="text-xs">Approve Volunteers</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <Bell className="w-5 h-5" />
                  <span className="text-xs">Send Notification</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Create Form</span>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{event.name}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rssVolunteers.filter(v => v.status === "pending").slice(0, 3).map((volunteer) => (
                      <div key={volunteer.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{volunteer.name}</p>
                          <p className="text-xs text-muted-foreground">{volunteer.email}</p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
                <CardDescription>
                  Add a new event for volunteers to participate in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input
                      id="event-name"
                      placeholder="e.g., Republic Day Celebration"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date</Label>
                    <Input
                      id="event-date"
                      type="datetime-local"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Enter event details..."
                    rows={4}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateEvent} className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
                <CardDescription>Manage and view all events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Volunteers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.volunteers}</TableCell>
                        <TableCell>
                          <Badge variant={
                            event.status === "upcoming" ? "default" : 
                            event.status === "ongoing" ? "secondary" : 
                            "outline"
                          }>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDeleteEvent(event.id, event.name)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RSS Volunteers Tab */}
          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>RSS Volunteer Applications</CardTitle>
                <CardDescription>
                  Approve or reject volunteers who want to join RSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rssVolunteers.map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell className="font-medium">{volunteer.name}</TableCell>
                        <TableCell>{volunteer.email}</TableCell>
                        <TableCell>{volunteer.phone}</TableCell>
                        <TableCell>{volunteer.joinedDate}</TableCell>
                        <TableCell>
                          <Badge variant={volunteer.status === "approved" ? "default" : "secondary"}>
                            {volunteer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {volunteer.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveVolunteer(volunteer.id, volunteer.name)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectVolunteer(volunteer.id, volunteer.name)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Approved</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Volunteers Tab */}
          <TabsContent value="event-volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Volunteer Applications</CardTitle>
                <CardDescription>
                  Accept or reject volunteers for specific events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventVolunteers.map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell className="font-medium">{volunteer.name}</TableCell>
                        <TableCell>{volunteer.event}</TableCell>
                        <TableCell>{volunteer.email}</TableCell>
                        <TableCell>{volunteer.appliedDate}</TableCell>
                        <TableCell>
                          <Badge variant={volunteer.status === "accepted" ? "default" : "secondary"}>
                            {volunteer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {volunteer.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptEventVolunteer(volunteer.id, volunteer.name)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectEventVolunteer(volunteer.id, volunteer.name)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Accepted</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Dynamic Form</CardTitle>
                  <CardDescription>
                    Build custom forms with select options for state, pincode, city, profession
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-title">Form Title</Label>
                    <Input
                      id="form-title"
                      placeholder="e.g., Volunteer Registration"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Form Fields</Label>
                      <Button onClick={addFormField} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Field
                      </Button>
                    </div>
                    {formFields.map((field, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <Input
                          placeholder="Field label"
                          value={field.label}
                          onChange={(e) => {
                            const newFields = [...formFields];
                            newFields[index].label = e.target.value;
                            setFormFields(newFields);
                          }}
                        />
                        <Select
                          value={field.type}
                          onValueChange={(value) => {
                            const newFields = [...formFields];
                            newFields[index].type = value;
                            if (value === "state" || value === "city" || value === "profession") {
                              newFields[index].options = 
                                value === "state" ? states : 
                                value === "city" ? cities : professions;
                            }
                            setFormFields(newFields);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Field type" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="state">State</SelectItem>
                            <SelectItem value="city">City</SelectItem>
                            <SelectItem value="pincode">Pincode</SelectItem>
                            <SelectItem value="profession">Profession</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newFields = formFields.filter((_, i) => i !== index);
                            setFormFields(newFields);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleCreateForm} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Form
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Form Data Options</CardTitle>
                  <CardDescription>
                    Configure options for state, city, and profession fields
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>States</Label>
                    <div className="flex flex-wrap gap-2">
                      {states.map((state, idx) => (
                        <Badge key={idx} variant="secondary">{state}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Label>Cities</Label>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city, idx) => (
                        <Badge key={idx} variant="secondary">{city}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Label>Professions</Label>
                    <div className="flex flex-wrap gap-2">
                      {professions.map((prof, idx) => (
                        <Badge key={idx} variant="secondary">{prof}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Created Forms</CardTitle>
                  <CardDescription>View and manage all created forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Form Title</TableHead>
                        <TableHead>Fields</TableHead>
                        <TableHead>Responses</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {createdForms.map((form) => (
                        <TableRow key={form.id}>
                          <TableCell className="font-medium">{form.title}</TableCell>
                          <TableCell>{form.fields} fields</TableCell>
                          <TableCell>{form.responses} responses</TableCell>
                          <TableCell>{form.createdDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDeleteForm(form.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
                <CardDescription>
                  Send push notifications to all users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notif-title">Notification Title</Label>
                  <Input
                    id="notif-title"
                    placeholder="e.g., Upcoming Event Reminder"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notif-message">Message</Label>
                  <Textarea
                    id="notif-message"
                    placeholder="Enter notification message..."
                    rows={4}
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendNotification} className="w-full md:w-auto">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View all sent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notif) => (
                      <TableRow key={notif.id}>
                        <TableCell className="font-medium">{notif.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{notif.message}</TableCell>
                        <TableCell>{notif.recipients} users</TableCell>
                        <TableCell>{notif.sentDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Notice to Board</CardTitle>
                <CardDescription>
                  Post important announcements to the notice board
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notice-title">Notice Title</Label>
                  <Input
                    id="notice-title"
                    placeholder="e.g., Important Announcement"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notice-content">Notice Content</Label>
                  <Textarea
                    id="notice-content"
                    placeholder="Enter notice details..."
                    rows={4}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddNotice} className="w-full md:w-auto">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Add to Notice Board
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notice Board</CardTitle>
                <CardDescription>All posted notices</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notices.map((notice) => (
                      <TableRow key={notice.id}>
                        <TableCell className="font-medium">{notice.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{notice.content}</TableCell>
                        <TableCell>
                          <Badge variant={
                            notice.priority === "high" ? "destructive" : 
                            notice.priority === "medium" ? "default" : 
                            "secondary"
                          }>
                            {notice.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{notice.postedDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDeleteNotice(notice.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
