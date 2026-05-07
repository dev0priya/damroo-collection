"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@damroo/ui";
import { api } from "../../lib/api";
import { AdminTable } from "../../components/table";
import { FileUpload } from "../../components/file-upload";
import { Edit2, Trash2, Plus, ImageIcon } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    parentId: "",
    displayRank: 0,
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.get("/admin/categories");
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        parentId: form.parentId === "" ? null : form.parentId,
        displayRank: Number(form.displayRank)
      };
      if (editingId) {
        await api.put(`/admin/categories/${editingId}`, payload);
      } else {
        await api.post("/admin/categories", payload);
      }
      resetForm();
      fetchCategories();
      alert("Category saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    }
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      imageUrl: cat.imageUrl || "",
      parentId: cat.parentId || "",
      displayRank: cat.displayRank,
      isActive: cat.isActive
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This may affect products in this category.")) return;
    try {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      parentId: "",
      displayRank: 0,
      isActive: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Category Management</h1>
        {editingId && (
          <Button variant="outline" onClick={resetForm}>
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        )}
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Category" : "Create New Category"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input 
            placeholder="Category Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
          />
          <Input 
            placeholder="Slug (e.g. ethnic-wear)" 
            value={form.slug} 
            onChange={(e) => setForm({ ...form, slug: e.target.value })} 
          />
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Category Image</label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <FileUpload onUpload={(url) => setForm({ ...form, imageUrl: url })} />
              </div>
              {form.imageUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-stone-200">
                  <img src={form.imageUrl} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
             <div className="flex-1">
               <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Parent Category ID</label>
               <Input 
                  placeholder="Leave empty for root" 
                  value={form.parentId} 
                  onChange={(e) => setForm({ ...form, parentId: e.target.value })} 
                />
             </div>
             <div className="w-32">
                <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Rank</label>
                <Input 
                  type="number" 
                  value={form.displayRank} 
                  onChange={(e) => setForm({ ...form, displayRank: parseInt(e.target.value) || 0 })} 
                />
             </div>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
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
        <div className="mt-6 flex gap-3">
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSave}>
            {editingId ? "Update Category" : "Save Category"}
          </Button>
          {editingId && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Categories List</h2>
        <div className="overflow-auto">
          <AdminTable 
            headers={["Image", "Name", "Slug", "Parent", "Rank", "Status", "Actions"]} 
            rows={categories.map(c => [
              c.imageUrl ? (
                <img src={c.imageUrl} className="w-10 h-10 rounded-full object-cover border border-stone-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
              ),
              <span className="font-bold">{c.name}</span>,
              <code className="text-xs bg-stone-100 px-1 rounded">{c.slug}</code>,
              c.parentId || <span className="text-stone-400 italic">None</span>,
              c.displayRank,
              <span className={`text-xs font-bold ${c.isActive ? 'text-green-600' : 'text-stone-400'}`}>
                {c.isActive ? 'Active' : 'Inactive'}
              </span>,
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(c)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
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
