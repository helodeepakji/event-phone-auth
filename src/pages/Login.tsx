import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/SimpleButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/SimpleLabel";
import { SimpleOTPInput } from "@/components/SimpleOTPInput";
import { toast } from "@/hooks/use-toast";
import { Smartphone, Mail } from "lucide-react";
import aviralLogo from "@/assets/aviral-logo.jpeg";
import { SimpleCountrySelect } from "@/components/SimpleCountrySelect";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  
  const isIndianNumber = countryCode === "+91";

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    if (!isIndianNumber && !email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending OTP
    if (isIndianNumber) {
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${countryCode} ${phoneNumber}`,
      });
    } else {
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${email}`,
      });
    }
    setStep("otp");
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    toast({
      title: "Login Successful",
      description: "Welcome to Aviral",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-strong p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-24 h-24 mx-auto flex items-center justify-center mb-4">
              <img src={aviralLogo} alt="Aviral Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Aviral
            </h1>
            <p className="text-muted-foreground">
              {step === "phone" ? (isIndianNumber ? "Enter your phone number" : "Enter your details") : "Verify your identity"}
            </p>
          </div>

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <SimpleCountrySelect value={countryCode} onValueChange={setCountryCode} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                    className="flex-1"
                  />
                </div>
              </div>

              {!isIndianNumber && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  {isIndianNumber ? (
                    <Smartphone className="w-12 h-12 text-primary" />
                  ) : (
                    <Mail className="w-12 h-12 text-primary" />
                  )}
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {isIndianNumber 
                      ? `Code sent to ${countryCode} ${phoneNumber}`
                      : `Code sent to ${email}`
                    }
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="text-sm text-primary hover:underline"
                  >
                    Change {isIndianNumber ? "number" : "details"}
                  </button>
                </div>

                <div className="flex justify-center">
                  <SimpleOTPInput value={otp} onChange={setOtp} length={6} />
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                  Verify & Login
                </Button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
