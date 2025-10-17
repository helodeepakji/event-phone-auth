import { useState } from "react";
import { ArrowLeft, Calendar, FileText, Bell, Megaphone, Plus, Users, UserCheck, X, Check } from "lucide-react";
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
  
  // Mock data for volunteers
  const [rssVolunteers] = useState([
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", status: "pending" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", status: "pending" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "9876543212", status: "approved" },
  ]);

  const [eventVolunteers] = useState([
    { id: 1, name: "Suresh Reddy", event: "Republic Day Celebration", email: "suresh@example.com", status: "pending" },
    { id: 2, name: "Meera Singh", event: "Blood Donation Camp", email: "meera@example.com", status: "pending" },
    { id: 3, name: "Vikram Joshi", event: "Tree Plantation Drive", email: "vikram@example.com", status: "accepted" },
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
    toast({
      title: "Event Created",
      description: `${eventName} has been successfully created.`,
    });
    setEventName("");
    setEventDate("");
    setEventDescription("");
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
    toast({
      title: "Notice Added",
      description: "Your notice has been added to the notice board.",
    });
    setNoticeTitle("");
    setNoticeContent("");
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
    toast({
      title: "Form Created",
      description: `${formTitle} has been successfully created.`,
    });
    setFormTitle("");
    setFormFields([]);
  };

  const addFormField = () => {
    setFormFields([...formFields, { label: "", type: "text", options: [] }]);
  };

  const handleApproveVolunteer = (id: number, name: string) => {
    toast({
      title: "Volunteer Approved",
      description: `${name} has been approved to join RSS.`,
    });
  };

  const handleRejectVolunteer = (id: number, name: string) => {
    toast({
      title: "Volunteer Rejected",
      description: `${name}'s application has been rejected.`,
      variant: "destructive",
    });
  };

  const handleAcceptEventVolunteer = (id: number, name: string) => {
    toast({
      title: "Volunteer Accepted",
      description: `${name} has been accepted for the event.`,
    });
  };

  const handleRejectEventVolunteer = (id: number, name: string) => {
    toast({
      title: "Volunteer Rejected",
      description: `${name} has been rejected for the event.`,
      variant: "destructive",
    });
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

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto">
            <TabsTrigger value="events" className="flex-col gap-1 py-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Events</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex-col gap-1 py-2">
              <Users className="w-4 h-4" />
              <span className="text-xs">RSS Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="event-volunteers" className="flex-col gap-1 py-2">
              <UserCheck className="w-4 h-4" />
              <span className="text-xs">Event Volunteers</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex-col gap-1 py-2">
              <FileText className="w-4 h-4" />
              <span className="text-xs">Forms</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-col gap-1 py-2">
              <Bell className="w-4 h-4" />
              <span className="text-xs">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="notices" className="flex-col gap-1 py-2">
              <Megaphone className="w-4 h-4" />
              <span className="text-xs">Notices</span>
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
                <CardDescription>
                  Add a new event for volunteers to participate in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Enter event details..."
                    rows={5}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RSS Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle>RSS Volunteer Applications</CardTitle>
                <CardDescription>
                  Approve or reject volunteers who want to join RSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rssVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{volunteer.name}</p>
                          <Badge variant={volunteer.status === "approved" ? "default" : "secondary"}>
                            {volunteer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                        <p className="text-sm text-muted-foreground">{volunteer.phone}</p>
                      </div>
                      {volunteer.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
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
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Volunteers Tab */}
          <TabsContent value="event-volunteers">
            <Card>
              <CardHeader>
                <CardTitle>Event Volunteer Applications</CardTitle>
                <CardDescription>
                  Accept or reject volunteers for specific events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{volunteer.name}</p>
                          <Badge variant={volunteer.status === "accepted" ? "default" : "secondary"}>
                            {volunteer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Event: {volunteer.event}</p>
                        <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                      </div>
                      {volunteer.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
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
                      )}
                    </div>
                  ))}
                </div>
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
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
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
                    rows={5}
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                </div>
                <Button onClick={handleSendNotification} className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices">
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
                    rows={5}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddNotice} className="w-full">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Add to Notice Board
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
