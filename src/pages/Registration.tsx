import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, User, Briefcase, Music, Shirt, QrCode, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "RSS Role & Post", icon: Briefcase },
    { id: 3, title: "Cultural & Activities", icon: Music },
    { id: 4, title: "Dress & Logistics", icon: Shirt },
    { id: 5, title: "Complete", icon: CheckCircle2 },
  ];

  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    gender: "",
    age: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    district: "",
    state: "",
    // RSS Role
    rssRole: "",
    yearsAssociated: "",
    trainingLevel: "",
    currentPost: "",
    previousPosts: "",
    // Cultural
    musicalSkills: "",
    instruments: "",
    performanceExperience: "",
    interestAreas: "",
    // Dress & Logistics
    dressSize: "",
    uniformSize: "",
    availability: "",
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show success with QR and Referral
      toast({
        title: "Registration Successful!",
        description: "Your QR code and Referral code have been generated.",
      });
      navigate("/profile");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/login");
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4 pb-20">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Volunteer Registration
          </h1>
          <p className="text-muted-foreground">Complete your profile to join events</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.id
                        ? "bg-gradient-primary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-center hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Steps */}
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="Auto-filled"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Auto-filled"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: RSS Role & Post */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rssRole">Current RSS Role</Label>
                  <Select value={formData.rssRole} onValueChange={(value) => setFormData({ ...formData, rssRole: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swayamsevak">Swayamsevak</SelectItem>
                      <SelectItem value="karyakarta">Karyakarta</SelectItem>
                      <SelectItem value="sangha_chalak">Sangha Chalak</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="yearsAssociated">Years Associated with RSS</Label>
                  <Input
                    id="yearsAssociated"
                    type="number"
                    placeholder="Years"
                    value={formData.yearsAssociated}
                    onChange={(e) => setFormData({ ...formData, yearsAssociated: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="trainingLevel">Training Level</Label>
                  <Select value={formData.trainingLevel} onValueChange={(value) => setFormData({ ...formData, trainingLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select training level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prathamik">Prathamik</SelectItem>
                      <SelectItem value="pratham_varsh">Pratham Varsh</SelectItem>
                      <SelectItem value="dwitiya_varsh">Dwitiya Varsh</SelectItem>
                      <SelectItem value="tritiya_varsh">Tritiya Varsh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentPost">Current Leadership Post</Label>
                  <Input
                    id="currentPost"
                    placeholder="e.g., Mukhya Shikshak"
                    value={formData.currentPost}
                    onChange={(e) => setFormData({ ...formData, currentPost: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="previousPosts">Previous Posts Held</Label>
                  <Textarea
                    id="previousPosts"
                    placeholder="List previous responsibilities"
                    value={formData.previousPosts}
                    onChange={(e) => setFormData({ ...formData, previousPosts: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Cultural & Activities */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="musicalSkills">Musical Skills</Label>
                  <Select value={formData.musicalSkills} onValueChange={(value) => setFormData({ ...formData, musicalSkills: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="instruments">Musical Instruments</Label>
                  <Input
                    id="instruments"
                    placeholder="e.g., Tabla, Harmonium, Flute"
                    value={formData.instruments}
                    onChange={(e) => setFormData({ ...formData, instruments: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="performanceExperience">Performance Experience</Label>
                  <Textarea
                    id="performanceExperience"
                    placeholder="Describe your performance experience"
                    value={formData.performanceExperience}
                    onChange={(e) => setFormData({ ...formData, performanceExperience: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Interest Areas</Label>
                  <RadioGroup value={formData.interestAreas} onValueChange={(value) => setFormData({ ...formData, interestAreas: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cultural" id="cultural" />
                      <Label htmlFor="cultural">Cultural Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organizational" id="organizational" />
                      <Label htmlFor="organizational">Organizational Duties</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Dress & Logistics */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dressSize">Dress Size</Label>
                    <Select value={formData.dressSize} onValueChange={(value) => setFormData({ ...formData, dressSize: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                        <SelectItem value="xxl">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="uniformSize">Uniform Size</Label>
                    <Select value={formData.uniformSize} onValueChange={(value) => setFormData({ ...formData, uniformSize: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">XS</SelectItem>
                        <SelectItem value="s">S</SelectItem>
                        <SelectItem value="m">M</SelectItem>
                        <SelectItem value="l">L</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                        <SelectItem value="xxl">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Availability for Events</Label>
                  <RadioGroup value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekends" id="weekends" />
                      <Label htmlFor="weekends">Weekends Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekdays" id="weekdays" />
                      <Label htmlFor="weekdays">Weekdays</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="anytime" id="anytime" />
                      <Label htmlFor="anytime">Anytime</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 5: Success with QR and Referral */}
            {currentStep === 5 && (
              <div className="text-center space-y-6 py-8">
                <CheckCircle2 className="w-24 h-24 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Registration Complete!</h3>
                <p className="text-muted-foreground">Your unique QR code and Referral code have been generated</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <Card className="bg-gradient-primary/10">
                    <CardContent className="p-6 text-center">
                      <QrCode className="w-12 h-12 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">QR Code</h4>
                      <p className="text-sm text-muted-foreground">View in Profile</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-primary/10">
                    <CardContent className="p-6 text-center">
                      <Share2 className="w-12 h-12 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Referral Code</h4>
                      <p className="text-sm text-muted-foreground">AVR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && currentStep < 5 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1">
                {currentStep === 5 ? "Go to Profile" : "Next"}
                {currentStep < 5 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
