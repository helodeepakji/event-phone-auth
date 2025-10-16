import { ArrowLeft, QrCode, Share2, Edit, Camera, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Profile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: "Ramesh Kumar",
    email: "ramesh.kumar@example.com",
    phone: "+91 98765 43210",
    role: "Swayamsevak",
    qrCode: "AVR-QR-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    referralCode: "AVR-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 bg-background pb-20">
          {/* Sidebar Toggle Button */}
          <div className="fixed top-4 left-4 z-50">
            <SidebarTrigger />
          </div>
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-primary-foreground/20">RK</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-foreground text-primary rounded-full flex items-center justify-center shadow-medium">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-primary-foreground/80">{profileData.email}</p>
              <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground">
                {profileData.role}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* QR & Referral Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-primary" />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">{profileData.qrCode}</p>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-primary/10 p-8 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary tracking-wider mb-2">
                  {profileData.referralCode}
                </p>
                <p className="text-sm text-muted-foreground">Share with new volunteers</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Referrals Made</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
              <Button className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Sections */}
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="sanghs">Sanghs</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" id="personal" className="space-y-4 pt-4">
                <ProfileField label="Full Name" value="Ramesh Kumar" />
                <Separator />
                <ProfileField label="Mobile" value="+91 98765 43210" />
                <Separator />
                <ProfileField label="Email" value="ramesh.kumar@example.com" />
                <Separator />
                <ProfileField label="Address" value="123, Main Street, New Delhi, 110001" />
                <Separator />
                <ProfileField label="Age" value="28 years" />
                <Separator />
                <ProfileField label="Gender" value="Male" />
              </TabsContent>

              <TabsContent value="education" id="education" className="space-y-4 pt-4">
                <ProfileField label="Highest Qualification" value="B.Tech Computer Science" />
                <Separator />
                <ProfileField label="University" value="Delhi University" />
                <Separator />
                <ProfileField label="Year of Passing" value="2019" />
              </TabsContent>

              <TabsContent value="professional" id="professional" className="space-y-4 pt-4">
                <ProfileField label="Occupation" value="Software Engineer" />
                <Separator />
                <ProfileField label="Company" value="Tech Solutions Pvt Ltd" />
                <Separator />
                <ProfileField label="Experience" value="5 years" />
                <Separator />
                <ProfileField label="Skills" value="Web Development, Project Management" />
              </TabsContent>

              <TabsContent value="sanghs" id="sanghs" className="space-y-4 pt-4">
                <ProfileField label="Current Role" value="Swayamsevak" />
                <Separator />
                <ProfileField label="Years Associated" value="8 years" />
                <Separator />
                <ProfileField label="Training Level" value="Tritiya Varsh" />
                <Separator />
                <ProfileField label="Current Post" value="Sangha Sahayak" />
                <Separator />
                <ProfileField label="Shakha Location" value="Connaught Place Shakha" />
              </TabsContent>

              <TabsContent value="social" id="social" className="space-y-4 pt-4">
                <ProfileField label="Cultural Skills" value="Music - Harmonium" />
                <Separator />
                <ProfileField label="Performance Experience" value="Regional cultural programs" />
                <Separator />
                <ProfileField label="Interest Areas" value="Cultural Events, Organizational Duties" />
                <Separator />
                <ProfileField label="Availability" value="Weekends & Evenings" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="text-center shadow-subtle">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Events Attended</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-subtle">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Referrals</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-subtle">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Years Active</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-subtle">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default Profile;
