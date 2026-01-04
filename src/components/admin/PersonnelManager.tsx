import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Save, GripVertical, Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Personnel {
  id: string;
  name: string;
  position: string;
  department: string | null;
  description: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const DEPARTMENTS = [
  "Administration",
  "Junior High School",
  "Senior High School",
  "Support Staff",
  "Guidance Office",
];

const POSITIONS = [
  "School Director",
  "JHS Principal",
  "SHS Principal",
  "Subject Head",
  "Teacher",
  "Treasurer",
  "Guidance Counselor",
  "Admin Assistant",
  "Librarian",
  "Canteen Staff",
  "Security Guard",
  "Maintenance Staff",
];

const PersonnelManager = () => {
  const { toast } = useToast();
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    description: "",
    photo_url: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    const { data, error } = await supabase
      .from("personnel")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch personnel",
        variant: "destructive",
      });
    } else {
      setPersonnel(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      description: "",
      photo_url: "",
      email: "",
      phone: "",
    });
    setEditingId(null);
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("personnel-photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("personnel-photos")
        .getPublicUrl(filePath);

      setFormData({ ...formData, photo_url: publicUrl });
      toast({ title: "Success", description: "Photo uploaded successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleEdit = (person: Personnel) => {
    setFormData({
      name: person.name,
      position: person.position,
      department: person.department || "",
      description: person.description || "",
      photo_url: person.photo_url || "",
      email: person.email || "",
      phone: person.phone || "",
    });
    setEditingId(person.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.position) {
      toast({
        title: "Error",
        description: "Name and position are required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: formData.name,
      position: formData.position,
      department: formData.department || null,
      description: formData.description || null,
      photo_url: formData.photo_url || null,
      email: formData.email || null,
      phone: formData.phone || null,
      display_order: editingId ? undefined : personnel.length + 1,
    };

    if (editingId) {
      const { error } = await supabase
        .from("personnel")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update personnel",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Personnel updated" });
        fetchPersonnel();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("personnel").insert(payload);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add personnel",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Personnel added" });
        fetchPersonnel();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this personnel?")) return;

    const { error } = await supabase.from("personnel").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete personnel",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Personnel deleted" });
      fetchPersonnel();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from("personnel")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (!error) {
      fetchPersonnel();
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personnel Management</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Personnel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Personnel" : "Add New Personnel"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position *</label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      setFormData({ ...formData, position: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Photo</label>
                  <div className="space-y-3">
                    {formData.photo_url && (
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.photo_url}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, photo_url: "" })}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+63..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description or qualifications..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? "Update" : "Add"} Personnel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personnel.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No personnel added yet. Click "Add Personnel" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                personnel.map((person, index) => (
                  <TableRow key={person.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {person.photo_url ? (
                          <img
                            src={person.photo_url}
                            alt={person.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            {person.name.charAt(0)}
                          </div>
                        )}
                        {person.name}
                      </div>
                    </TableCell>
                    <TableCell>{person.position}</TableCell>
                    <TableCell>{person.department || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(person.id, person.is_active)}
                        className={
                          person.is_active !== false
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        {person.is_active !== false ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(person)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(person.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonnelManager;
