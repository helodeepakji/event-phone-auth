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
              Rashtriya Swayamsevak Sangh
            </h1>
            <p className="text-2xl text-foreground/80">
              Nation Building Through Selfless Service
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              RSS is the world's largest voluntary organization dedicated to nation-building through character formation, social harmony, and cultural renaissance. Join millions of volunteers in serving Bharat with dedication and discipline.
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
              <h3 className="font-semibold text-lg mb-2">Event Participation</h3>
              <p className="text-muted-foreground text-sm">
                Join shakhas, camps, and community service activities across India
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-subtle hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Volunteer Network</h3>
              <p className="text-muted-foreground text-sm">
                Connect with lakhs of swayamsevaks dedicated to serving society
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-subtle hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Character Building</h3>
              <p className="text-muted-foreground text-sm">
                Develop leadership, discipline, and values through structured training
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
