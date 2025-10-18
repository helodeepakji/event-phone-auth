import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

interface Form {
  id: string;
  title: string;
  sections: FormSection[];
  responses: number;
  createdDate: string;
}

const AdminForms = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [forms, setForms] = useState<Form[]>([]);
  
  const [formTitle, setFormTitle] = useState("");
  const [sections, setSections] = useState<FormSection[]>([]);
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");
  const [currentSectionFields, setCurrentSectionFields] = useState<FormField[]>([]);
  const [currentField, setCurrentField] = useState({
    label: "",
    type: "text",
    required: false,
    options: "",
  });

  const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh"];
  const cities = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Lucknow"];
  const professions = ["Student", "Professional", "Business", "Retired", "Other"];

  const handleAddField = () => {
    if (!currentField.label) {
      toast({
        title: "Error",
        description: "Please enter a field label",
        variant: "destructive",
      });
      return;
    }

    const newField: FormField = {
      id: Date.now().toString(),
      label: currentField.label,
      type: currentField.type,
      required: currentField.required,
      options: currentField.options ? currentField.options.split(",").map(o => o.trim()) : undefined,
    };

    setCurrentSectionFields([...currentSectionFields, newField]);
    setCurrentField({ label: "", type: "text", required: false, options: "" });
    toast({
      title: "Field Added",
      description: "Form field has been added to section",
    });
  };

  const handleRemoveField = (id: string) => {
    setCurrentSectionFields(currentSectionFields.filter(f => f.id !== id));
  };

  const handleSaveSection = () => {
    if (!currentSectionTitle) {
      toast({
        title: "Error",
        description: "Please enter a section title",
        variant: "destructive",
      });
      return;
    }

    if (currentSectionFields.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one field to the section",
        variant: "destructive",
      });
      return;
    }

    const newSection: FormSection = {
      id: Date.now().toString(),
      title: currentSectionTitle,
      fields: currentSectionFields,
    };

    setSections([...sections, newSection]);
    setCurrentSectionTitle("");
    setCurrentSectionFields([]);
    setStep(2);
    toast({
      title: "Section Saved",
      description: "Form section has been saved",
    });
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleCreateForm = () => {
    if (!formTitle || sections.length === 0) {
      toast({
        title: "Error",
        description: "Please enter form title and add at least one section",
        variant: "destructive",
      });
      return;
    }

    const newForm: Form = {
      id: Date.now().toString(),
      title: formTitle,
      sections: sections,
      responses: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setForms([...forms, newForm]);
    setFormTitle("");
    setSections([]);
    setCurrentSectionTitle("");
    setCurrentSectionFields([]);
    setStep(1);
    toast({
      title: "Form Created",
      description: "Dynamic form has been created successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Form Management</h1>
        <p className="text-muted-foreground">Create and manage dynamic forms</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create Dynamic Form
            </span>
            <Badge variant="outline">
              {step === 1 ? "Form Title" : step === 2 ? "Add Sections" : step === 3 ? "Add Fields" : "Preview"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  placeholder="Enter form title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>
              <Button onClick={() => setStep(2)} disabled={!formTitle}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Section Examples</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCurrentSectionTitle("Personal Information")}>
                    Personal Information
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCurrentSectionTitle("Post of RSS")}>
                    Post of RSS
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCurrentSectionTitle("Musical Instruments")}>
                    Musical Instruments
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCurrentSectionTitle("Education Details")}>
                    Education Details
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCurrentSectionTitle("Professional Details")}>
                    Professional Details
                  </Badge>
                </div>
              </div>

              {sections.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Sections ({sections.length})</h4>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {section.fields.length} field(s)
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Section
                </Button>
                {sections.length > 0 && (
                  <Button onClick={() => setStep(4)}>
                    Preview Form <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="section-title">Section Title</Label>
                <Input
                  id="section-title"
                  placeholder="e.g., Personal Information, Post of RSS, Musical Instruments"
                  value={currentSectionTitle}
                  onChange={(e) => setCurrentSectionTitle(e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Field Label</Label>
                  <Input
                    id="field-label"
                    placeholder="e.g., Full Name, Instrument Name"
                    value={currentField.label}
                    onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field-type">Field Type</Label>
                  <Select
                    value={currentField.type}
                    onValueChange={(value) => setCurrentField({ ...currentField, type: value })}
                  >
                    <SelectTrigger id="field-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="pincode">Pincode</SelectItem>
                      <SelectItem value="profession">Profession</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {["state", "city", "profession", "dropdown"].includes(currentField.type) && (
                <div className="space-y-2">
                  <Label>Options (comma-separated)</Label>
                  <Input
                    value={currentField.options}
                    onChange={(e) => setCurrentField({ ...currentField, options: e.target.value })}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="field-required"
                  checked={currentField.required}
                  onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
                />
                <Label htmlFor="field-required">Required field</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddField}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {currentSectionFields.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Fields in this section ({currentSectionFields.length})</h4>
                  <div className="space-y-2">
                    {currentSectionFields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{field.label}</p>
                          <p className="text-sm text-muted-foreground">
                            Type: {field.type} {field.required && "(Required)"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveField(field.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sections
                </Button>
                <Button onClick={handleSaveSection} disabled={!currentSectionTitle || currentSectionFields.length === 0}>
                  Save Section
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Form Preview</h4>
                <div className="border rounded p-4 space-y-6">
                  <h3 className="text-xl font-bold">{formTitle}</h3>
                  {sections.map((section) => (
                    <div key={section.id} className="space-y-4">
                      <h4 className="text-lg font-semibold border-b pb-2">{section.title}</h4>
                      {section.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </Label>
                          <Input disabled placeholder={`${field.type} field`} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleCreateForm}>
                  Create Form
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Created Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Total Fields</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell>{form.sections.length}</TableCell>
                  <TableCell>{form.sections.reduce((total, section) => total + section.fields.length, 0)}</TableCell>
                  <TableCell>{form.responses}</TableCell>
                  <TableCell>{form.createdDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Form Data Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">States</h4>
            <div className="flex flex-wrap gap-2">
              {states.map((state) => (
                <Badge key={state} variant="outline">{state}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Cities</h4>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Badge key={city} variant="outline">{city}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Professions</h4>
            <div className="flex flex-wrap gap-2">
              {professions.map((profession) => (
                <Badge key={profession} variant="outline">{profession}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminForms;
