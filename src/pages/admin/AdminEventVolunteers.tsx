import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Check, X } from "lucide-react";

interface EventVolunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  appliedDate: string;
  status: "pending" | "accepted" | "rejected";
}

const AdminEventVolunteers = () => {
  const { toast } = useToast();
  const [volunteers, setVolunteers] = useState<EventVolunteer[]>([
    { id: "1", name: "Vikram Singh", email: "vikram@example.com", phone: "9876543210", event: "Community Service Drive", appliedDate: "2024-02-01", status: "pending" },
    { id: "2", name: "Neha Gupta", email: "neha@example.com", phone: "9876543211", event: "Health Camp", appliedDate: "2024-02-02", status: "pending" },
    { id: "3", name: "Rahul Verma", email: "rahul@example.com", phone: "9876543212", event: "Community Service Drive", appliedDate: "2024-01-28", status: "accepted" },
  ]);

  const handleAccept = (id: string) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: "accepted" } : v));
    toast({
      title: "Volunteer Accepted",
      description: "Event volunteer has been accepted successfully",
    });
  };

  const handleReject = (id: string) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: "rejected" } : v));
    toast({
      title: "Volunteer Rejected",
      description: "Event volunteer application has been rejected",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-500";
      case "rejected": return "bg-red-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Event Volunteers</h1>
        <p className="text-muted-foreground">Manage event volunteer applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Volunteer Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.email}</TableCell>
                  <TableCell>{volunteer.phone}</TableCell>
                  <TableCell>{volunteer.event}</TableCell>
                  <TableCell>{volunteer.appliedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(volunteer.status)}>
                      {volunteer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {volunteer.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAccept(volunteer.id)}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleReject(volunteer.id)}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventVolunteers;
