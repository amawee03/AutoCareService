import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const categories = ['Detailing', 'Maintenance', 'Repair', 'Inspection', 'Bodywork'];

export default function ServicePackageForm({ initialData, onSubmit, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [newFeature, setNewFeature] = useState('');
  const [form, setForm] = useState({
    pkgName: initialData?.pkgName || '',
    description: initialData?.description || '',
    price: initialData?.price ?? '',
    duration: initialData?.duration || '',
    category: initialData?.category || '',
    features: Array.isArray(initialData?.features) ? initialData.features : [],
    status: initialData?.status || 'active',
    image: initialData?.image || ''
  });

  const addFeature = () => {
    const v = newFeature.trim();
    if (!v || form.features.includes(v)) return;
    setForm((prev) => ({ ...prev, features: [...prev.features, v] }));
    setNewFeature('');
  };

  const removeFeature = (v) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((f) => f !== v) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { ...form, price: Number(form.price), image: imageUrl };
      const method = initialData?._id ? 'PUT' : 'POST';
      const url = initialData?._id ? `/api/packages/${initialData._id}` : '/api/packages';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save package');
      }
      onSubmit && onSubmit();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{initialData?._id ? 'Edit Service Package' : 'Add New Service Package'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="name">Service Name</Label>
              <Input id="name" value={form.pkgName} onChange={(e)=>setForm({...form, pkgName:e.target.value})} required />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category">Category</Label>
              <select id="category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} className="h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="" disabled>Select category</option>
                {categories.map((c)=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="price">Price (Rs.)</Label>
              <Input id="price" type="number" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} min="0" required />
            </div>

            <div className="space-y-3">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" value={form.duration} onChange={(e)=>setForm({...form, duration:e.target.value})} placeholder="e.g., 45 minutes / 3-4 hours" required />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} rows={4} required />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value); setForm({...form, image:e.target.value});}} placeholder="https://..." />
              {imageUrl ? (
                <img src={imageUrl} alt="Service" className="w-40 h-40 object-cover rounded-md border border-border" />
              ) : null}
            </div>
            <div className="space-y-3">
              <Label htmlFor="status">Status</Label>
              <select id="status" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})} className="h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Features</Label>
            <div className="flex gap-3">
              <Input value={newFeature} onChange={(e)=>setNewFeature(e.target.value)} placeholder="Add a feature" onKeyDown={(e)=> e.key==='Enter' && (e.preventDefault(), addFeature())} />
              <Button type="button" onClick={addFeature}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features.map((f)=> (
                <span key={f} className="inline-flex items-center gap-2 bg-primary-muted text-primary px-3 py-1 rounded-full border border-primary/40">
                  {f}
                  <button type="button" className="text-destructive" onClick={()=>removeFeature(f)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (initialData?._id ? 'Update' : 'Create')} Package</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
