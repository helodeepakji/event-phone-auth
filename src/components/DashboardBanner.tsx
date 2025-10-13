import { Sparkles } from "lucide-react";

const DashboardBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-primary p-8 mx-4 mt-4 rounded-2xl shadow-medium">
      <div className="relative z-10 text-center text-primary-foreground">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Welcome to Aviral</h2>
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="text-primary-foreground/90 max-w-md mx-auto">
          Manage your events, connect with communities, and stay organized
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default DashboardBanner;
