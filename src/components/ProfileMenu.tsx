import { Camera, QrCode, Share2, Hash, User, GraduationCap, Briefcase, Users, Globe, Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

const menuItems = [
  { icon: Camera, label: "Photo", onClick: () => {} },
  { icon: QrCode, label: "QR Code", onClick: () => {} },
  { icon: Share2, label: "Referral Code", onClick: () => {} },
  { icon: Hash, label: "Unique ID", onClick: () => {} },
];

const profileSections = [
  { icon: User, label: "Personal", onClick: () => {} },
  { icon: GraduationCap, label: "Education", onClick: () => {} },
  { icon: Briefcase, label: "Professional", onClick: () => {} },
  { icon: Users, label: "Sanghs", onClick: () => {} },
  { icon: Globe, label: "Social", onClick: () => {} },
];

const ProfileMenu = () => {
  const navigate = useNavigate();
  const profileCompletion = 65; // Calculate based on filled fields

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="py-4 space-y-4">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3 px-4 pb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
              <User className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <div className="text-center w-full">
            <h3 className="font-semibold text-lg">User Name</h3>
            <p className="text-sm text-muted-foreground">user@example.com</p>
            
            {/* Profile Completion */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Profile Complete</span>
                <span className="font-semibold text-primary">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
          </div>
        </div>

      <Separator />

      {/* Quick Actions */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      <Separator />

      {/* Profile Sections */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-4 mb-2">Profile</h3>
        {profileSections.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      <Separator />

      {/* Admin & Settings */}
      <div className="space-y-1">
        <button 
          onClick={() => navigate("/admin")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left"
        >
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-medium">Admin Panel</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
          <Settings className="w-5 h-5 text-primary" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
      </div>
    </ScrollArea>
  );
};

export default ProfileMenu;
