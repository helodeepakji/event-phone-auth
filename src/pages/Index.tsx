import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Avvial
            </h1>
            <p className="text-2xl text-foreground/80">
              Event Management Portal
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your events, connect with communities, and manage everything in one place
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6">
                <Smartphone className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="bg-card rounded-2xl p-6 shadow-subtle hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Event Management</h3>
              <p className="text-muted-foreground text-sm">
                Create, organize, and manage events effortlessly
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-subtle hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Connect</h3>
              <p className="text-muted-foreground text-sm">
                Build and engage with your communities
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-subtle hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Analytics & Insights</h3>
              <p className="text-muted-foreground text-sm">
                Track performance and make data-driven decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
