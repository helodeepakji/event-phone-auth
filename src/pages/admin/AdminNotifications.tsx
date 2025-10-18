import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  recipients: string;
  sentDate: string;
}

const AdminNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "Upcoming Event Reminder", message: "Community Service Drive on Feb 15", recipients: "All Members", sentDate: "2024-02-01" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipients: "",
  });

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...formData,
      sentDate: new Date().toISOString().split('T')[0],
    };
    setNotifications([newNotification, ...notifications]);
    setFormData({ title: "", message: "", recipients: "" });
    toast({
      title: "Notification Sent",
      description: "Notification has been sent successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Send and manage notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Send Notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notif-title">Title</Label>
              <Input
                id="notif-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notif-message">Message</Label>
              <Textarea
                id="notif-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notif-recipients">Recipients</Label>
              <Input
                id="notif-recipients"
                placeholder="e.g., All Members, Volunteers, Admins"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Send Notification</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
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
                  <TableCell>{notif.message}</TableCell>
                  <TableCell>{notif.recipients}</TableCell>
                  <TableCell>{notif.sentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
