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

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  fields: FormField[];
  responses: number;
  createdDate: string;
}

const AdminForms = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [forms, setForms] = useState<Form[]>([]);
  
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
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

    setFields([...fields, newField]);
    setCurrentField({ label: "", type: "text", required: false, options: "" });
    toast({
      title: "Field Added",
      description: "Form field has been added",
    });
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleCreateForm = () => {
    if (!formTitle || fields.length === 0) {
      toast({
        title: "Error",
        description: "Please enter form title and add at least one field",
        variant: "destructive",
      });
      return;
    }

    const newForm: Form = {
      id: Date.now().toString(),
      title: formTitle,
      fields: fields,
      responses: 0,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setForms([...forms, newForm]);
    setFormTitle("");
    setFields([]);
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
            <Badge variant="outline">Step {step} of 3</Badge>
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
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="field-label">Field Label</Label>
                  <Input
                    id="field-label"
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {["state", "city", "profession"].includes(currentField.type) && (
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

              {fields.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Fields ({fields.length})</h4>
                  <div className="space-y-2">
                    {fields.map((field) => (
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
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={fields.length === 0}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Form Preview</h4>
                <div className="border rounded p-4 space-y-4">
                  <h3 className="text-xl font-bold">{formTitle}</h3>
                  {fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <Input disabled placeholder={`${field.type} field`} />
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
                <TableHead>Fields</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell>{form.fields.length}</TableCell>
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
