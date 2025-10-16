import { useState } from "react";
import { ArrowLeft, Calendar, FileText, Bell, Megaphone, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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
  const [formFields, setFormFields] = useState<Array<{ label: string; type: string }>>([]);

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
    setFormFields([...formFields, { label: "", type: "text" }]);
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="forms">
              <FileText className="w-4 h-4 mr-2" />
              Forms
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="notices">
              <Megaphone className="w-4 h-4 mr-2" />
              Notices
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

          {/* Forms Tab */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Create Dynamic Form</CardTitle>
                <CardDescription>
                  Build custom forms for data collection
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
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Field label"
                        value={field.label}
                        onChange={(e) => {
                          const newFields = [...formFields];
                          newFields[index].label = e.target.value;
                          setFormFields(newFields);
                        }}
                      />
                      <select
                        className="px-3 py-2 border rounded-md"
                        value={field.type}
                        onChange={(e) => {
                          const newFields = [...formFields];
                          newFields[index].type = e.target.value;
                          setFormFields(newFields);
                        }}
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="date">Date</option>
                      </select>
                    </div>
                  ))}
                </div>
                <Button onClick={handleCreateForm} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Form
                </Button>
              </CardContent>
            </Card>
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
