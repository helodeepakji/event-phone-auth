import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QRScanner = () => {
  const navigate = useNavigate();
  const [scanType, setScanType] = useState<"person" | "event" | null>(null);

  const handleScan = (type: "person" | "event") => {
    setScanType(type);
    // Here you would integrate with a QR scanner library
    // For now, we'll just show a placeholder
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-50 shadow-subtle">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          QR Scanner
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {!scanType ? (
          <div className="space-y-6 max-w-md mx-auto mt-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
                <QrCode className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Scan QR Code</h2>
              <p className="text-muted-foreground">Choose what you want to scan</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card 
                className="shadow-subtle hover:shadow-medium transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => handleScan("person")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Person</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan volunteer or member QR code
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-subtle hover:shadow-medium transition-all cursor-pointer border-2 hover:border-primary"
                onClick={() => handleScan("event")}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Event</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan event QR code for check-in
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-md mx-auto mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Scanning {scanType === "person" ? "Person" : "Event"}
              </h2>
              <p className="text-muted-foreground mb-6">
                Position the QR code within the frame
              </p>
            </div>

            {/* QR Scanner Placeholder */}
            <div className="aspect-square bg-card border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-24 h-24 mx-auto mb-4 text-primary animate-pulse" />
                <p className="text-muted-foreground">
                  Camera scanner will appear here
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setScanType(null)}
            >
              Back to Options
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QRScanner;
