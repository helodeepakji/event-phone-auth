import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, Calendar, User, Shield } from "lucide-react";

// Mock data - in real app, fetch from database
const mockUsers = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", joinedDate: "2024-01-15", role: "member", status: "active", address: "Mumbai, Maharashtra", emergencyContact: "9876543299", bloodGroup: "O+", skills: ["Event Management", "Public Speaking"] },
  { id: "2", name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", joinedDate: "2024-01-20", role: "volunteer", status: "active", address: "Delhi, NCR", emergencyContact: "9876543288", bloodGroup: "A+", skills: ["First Aid", "Teaching"] },
  { id: "3", name: "Amit Patel", email: "amit@example.com", phone: "9876543212", joinedDate: "2024-01-25", role: "member", status: "active", address: "Ahmedabad, Gujarat", emergencyContact: "9876543277", bloodGroup: "B+", skills: ["Photography", "Social Media"] },
  { id: "4", name: "Sunita Reddy", email: "sunita@example.com", phone: "9876543213", joinedDate: "2024-02-01", role: "admin", status: "active", address: "Hyderabad, Telangana", emergencyContact: "9876543266", bloodGroup: "AB+", skills: ["Leadership", "Coordination"] },
  { id: "5", name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", joinedDate: "2024-02-10", role: "member", status: "inactive", address: "Jaipur, Rajasthan", emergencyContact: "9876543255", bloodGroup: "O-", skills: ["Music", "Sports"] },
];

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "volunteer": return "default";
      case "member": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <Badge variant={user.status === "active" ? "default" : "secondary"}>
          {user.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Blood Group</p>
              <p className="font-medium">{user.bloodGroup}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Emergency Contact</p>
              <p className="font-medium">{user.emergencyContact}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role & Membership
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant={getRoleColor(user.role)} className="mt-1">
                {user.role}
              </Badge>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Joined Date</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(user.joinedDate).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills & Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Volunteered at Diwali Event</p>
                <p className="text-sm text-muted-foreground">October 28, 2024</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Attended Training Session</p>
                <p className="text-sm text-muted-foreground">September 15, 2024</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Registered for Membership</p>
                <p className="text-sm text-muted-foreground">{new Date(user.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserDetails;
