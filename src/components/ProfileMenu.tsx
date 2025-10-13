import { Camera, QrCode, Share2, Hash, User, GraduationCap, Briefcase, Users, Globe, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className="py-4 space-y-4">
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

      {/* Settings */}
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left">
        <Settings className="w-5 h-5 text-primary" />
        <span className="font-medium">Settings</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
