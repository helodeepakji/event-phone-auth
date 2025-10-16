import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, User, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Html5Qrcode } from "html5-qrcode";
import { useToast } from "@/hooks/use-toast";

const QRScanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanType, setScanType] = useState<"person" | "event" | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrReaderRef = useRef<HTMLDivElement>(null);

  const handleScan = (type: "person" | "event") => {
    setScanType(type);
    setScanning(true);
    setScanResult(null);
  };

  useEffect(() => {
    if (scanning && qrReaderRef.current) {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      scanner
        .start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            // Success callback
            setScanResult(decodedText);
            setScanning(false);
            scanner.stop().catch(console.error);
            
            toast({
              title: "QR Code Scanned!",
              description: `Scanned ${scanType}: ${decodedText}`,
            });
          },
          (errorMessage) => {
            // Error callback - ignore continuous errors
            console.log(errorMessage);
          }
        )
        .catch((err) => {
          console.error("Unable to start scanner:", err);
          toast({
            title: "Camera Error",
            description: "Unable to access camera. Please check permissions.",
            variant: "destructive",
          });
          setScanning(false);
        });

      return () => {
        if (scannerRef.current?.isScanning) {
          scannerRef.current.stop().catch(console.error);
        }
      };
    }
  }, [scanning, scanType, toast]);

  const handleBack = () => {
    if (scanning && scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(console.error);
    }
    setScanType(null);
    setScanning(false);
    setScanResult(null);
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
        ) : scanResult ? (
          <div className="space-y-6 max-w-md mx-auto mt-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Scan Successful!</h2>
              <p className="text-muted-foreground mb-6">
                {scanType === "person" ? "Person" : "Event"} QR code detected
              </p>
            </div>

            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Scanned Data:</h3>
                <p className="text-sm text-muted-foreground break-all bg-muted p-3 rounded-lg">
                  {scanResult}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setScanResult(null);
                  setScanning(true);
                }}
              >
                Scan Again
              </Button>
              <Button onClick={handleBack}>
                Done
              </Button>
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

            {/* QR Scanner */}
            <div className="rounded-lg overflow-hidden shadow-medium">
              <div id="qr-reader" ref={qrReaderRef} className="w-full"></div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleBack}
            >
              Cancel Scan
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QRScanner;
