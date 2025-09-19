import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const categories = ["Detailing", "Maintenance", "Repair", "Inspection", "Bodywork"];

export function ServicePackageForm({ servicePackage, onSubmit, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(servicePackage?.image || null);
  const [newFeature, setNewFeature] = useState("");
  const [formData, setFormData] = useState({
    name: servicePackage?.name || "",
    description: servicePackage?.description || "",
    price: servicePackage?.price || 0,
    duration: servicePackage?.duration || 0,
    category: servicePackage?.category || "",
    features: servicePackage?.features || [],
    image: servicePackage?.image || "",
    is_active: servicePackage?.is_active ?? true
  });

  // Add a new feature
  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, trimmed]
      }));
      setNewFeature("");
    }
  };

  // Remove a feature
  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // Handle local image selection
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // Submit form to backend (multipart with file)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = servicePackage?._id || servicePackage?.id;
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/packages/${id}` : '/api/packages';

      const data = new FormData();
      data.append('pkgName', String(formData.name || '').trim());
      data.append('description', String(formData.description || '').trim());
      data.append('category', formData.category || '');
      data.append('price', String(Number(formData.price) || 0));
      data.append('duration', typeof formData.duration === 'number' ? `${formData.duration} minutes` : String(formData.duration || ''));
      (Array.isArray(formData.features) ? formData.features : []).forEach(f => data.append('features', f));
      data.append('status', formData.is_active ? 'active' : 'inactive');
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(url, { method, body: data });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save service package');
      }

      onSubmit && onSubmit();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to save service package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{servicePackage ? "Edit Service Package" : "Add New Service Package"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name, Category, Price, Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category || ""}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (Rs.)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          {/* Image file */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e)=>{
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                setImagePreview(file ? URL.createObjectURL(file) : null);
              }}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md border border-border mt-2" />
            ) : null}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <Button type="button" size="sm" onClick={handleAddFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveFeature(feature)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit / Cancel */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : (servicePackage ? "Update" : "Create")} Package
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ServicePackageForm;
