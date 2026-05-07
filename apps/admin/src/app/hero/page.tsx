"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@damroo/ui";
import { api } from "../../lib/api";
import { AdminTable } from "../../components/table";
import { FileUpload } from "../../components/file-upload";
import { Edit2, Trash2, Plus, Eye, EyeOff } from "lucide-react";

export default function HeroPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    ctaText: "",
    ctaLink: "",
    rank: 0,
    isActive: true
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await api.get("/admin/hero-banners");
      setBanners(data.banners);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/hero-banners/${editingId}`, form);
      } else {
        await api.post("/admin/hero-banners", form);
      }
      resetForm();
      fetchBanners();
      alert("Banner saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save banner");
    }
  };

  const handleEdit = (banner: any) => {
    setEditingId(banner.id);
    setForm({
      title: banner.title,
      description: banner.description || "",
      imageUrl: banner.imageUrl,
      ctaText: banner.ctaText || "",
      ctaLink: banner.ctaLink || "",
      rank: banner.rank,
      isActive: banner.isActive
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api.delete(`/admin/hero-banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", description: "", imageUrl: "", ctaText: "", ctaLink: "", rank: 0, isActive: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Hero Section Management</h1>
        {editingId && (
          <Button variant="outline" onClick={resetForm}>
            <Plus className="w-4 h-4 mr-2" /> Add New Instead
          </Button>
        )}
      </div>
      
      <Card>
        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Banner" : "Add New Banner"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input 
            placeholder="Heading Text (e.g. Elevate Your Style)" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
          />
          <Input 
            placeholder="Subheading / Description" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
          />
          <div className="md:col-span-2 border-2 border-dashed border-stone-200 rounded-lg p-4 bg-stone-50">
            <label className="text-sm font-bold mb-2 block uppercase text-stone-500 tracking-wider">Banner Image</label>
            <FileUpload onUpload={(url) => setForm({ ...form, imageUrl: url })} />
            {form.imageUrl && (
              <div className="mt-4 relative aspect-[21/9] overflow-hidden rounded-lg border border-stone-200 group">
                <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white font-bold">Image Preview</p>
                </div>
              </div>
            )}
          </div>
          <Input placeholder="CTA Button Text (e.g. Shop Now)" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} />
          <Input placeholder="CTA Button Link (e.g. /shop)" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} />
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Display Rank</label>
              <Input type="number" placeholder="Rank" value={form.rank} onChange={(e) => setForm({ ...form, rank: parseInt(e.target.value) })} />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-stone-300 text-pink-600 focus:ring-pink-500"
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <span className="font-bold text-stone-700">Active</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSave}>
            {editingId ? "Update Banner" : "Save Banner"}
          </Button>
          {editingId && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Existing Banners</h2>
        <div className="overflow-auto">
          <AdminTable 
            headers={["Preview", "Content", "Rank", "Status", "Actions"]} 
            rows={banners.map(b => [
              <div className="w-32 h-16 overflow-hidden rounded border border-stone-200">
                <img src={b.imageUrl} className="w-full h-full object-cover" />
              </div>,
              <div>
                <p className="font-bold">{b.title}</p>
                <p className="text-xs text-stone-500 truncate w-48">{b.description}</p>
              </div>,
              <span className="font-mono">{b.rank}</span>,
              <div className="flex items-center gap-1">
                {b.isActive ? (
                  <span className="flex items-center gap-1 text-green-600 font-bold text-xs"><Eye className="w-3 h-3"/> Active</span>
                ) : (
                  <span className="flex items-center gap-1 text-stone-400 font-bold text-xs"><EyeOff className="w-3 h-3"/> Inactive</span>
                )}
              </div>,
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(b)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(b.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ])} 
          />
        </div>
      </Card>
    </div>
  );
}
