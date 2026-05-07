"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@damroo/ui";
import { api } from "../../lib/api";
import { AdminTable } from "../../components/table";
import { FileUpload } from "../../components/file-upload";
import { Edit2, Trash2, Plus, ImageIcon, X, GripVertical } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    name: "",
    slug: "",
    brand: "Damroo",
    categoryId: "",
    description: "",
    material: "",
    care: "",
    status: "PUBLISHED",
    isFeatured: false,
    isBestSeller: false,
    variants: [],
    images: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodData, catData] = await Promise.all([
        api.get("/admin/products"),
        api.get("/admin/categories")
      ]);
      setProducts(prodData.products);
      setCategories(catData.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, form);
      } else {
        await api.post("/admin/products", form);
      }
      resetForm();
      fetchData();
      alert("Product saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      ...product,
      variants: product.variants || [],
      images: product.images || []
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      brand: "Damroo",
      categoryId: "",
      description: "",
      material: "",
      care: "",
      status: "PUBLISHED",
      isFeatured: false,
      isBestSeller: false,
      variants: [],
      images: []
    });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { sku: "", size: "", color: "", mrp: 0, salePrice: 0, stock: 0 }]
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = [...form.variants];
    newVariants.splice(index, 1);
    setForm({ ...form, variants: newVariants });
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const newVariants = [...form.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setForm({ ...form, variants: newVariants });
  };

  const addImage = (url: string) => {
    setForm({
      ...form,
      images: [...form.images, { url, alt: form.name, rank: form.images.length }]
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...form.images];
    newImages.splice(index, 1);
    setForm({ ...form, images: newImages });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Product Management</h1>
        {editingId && (
          <Button variant="outline" onClick={resetForm}>
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input 
                placeholder="Product Name" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
              />
              <Input 
                placeholder="Slug" 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
              />
              <select 
                className="w-full h-10 px-3 rounded-md border border-stone-200 bg-white"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Input 
                placeholder="Brand" 
                value={form.brand} 
                onChange={(e) => setForm({ ...form, brand: e.target.value })} 
              />
              <div className="md:col-span-2">
                <textarea 
                  className="w-full p-3 rounded-md border border-stone-200 bg-white min-h-[100px]"
                  placeholder="Product Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Variants (Sizes & Colors)</h2>
              <Button size="sm" onClick={addVariant}><Plus className="w-4 h-4 mr-1" /> Add</Button>
            </div>
            <div className="space-y-4">
              {form.variants.map((v: any, idx: number) => (
                <div key={idx} className="grid gap-2 grid-cols-2 md:grid-cols-6 items-end border-b border-stone-100 pb-4">
                  <Input placeholder="SKU" value={v.sku} onChange={(e) => updateVariant(idx, 'sku', e.target.value)} />
                  <Input placeholder="Size" value={v.size} onChange={(e) => updateVariant(idx, 'size', e.target.value)} />
                  <Input placeholder="Color" value={v.color} onChange={(e) => updateVariant(idx, 'color', e.target.value)} />
                  <Input type="number" placeholder="MRP" value={v.mrp} onChange={(e) => updateVariant(idx, 'mrp', parseInt(e.target.value) || 0)} />
                  <Input type="number" placeholder="Sale" value={v.salePrice} onChange={(e) => updateVariant(idx, 'salePrice', parseInt(e.target.value) || 0)} />
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Stock" value={v.stock} onChange={(e) => updateVariant(idx, 'stock', parseInt(e.target.value) || 0)} />
                    <Button variant="danger" size="sm" onClick={() => removeVariant(idx)}><X className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
              {form.variants.length === 0 && <p className="text-stone-400 italic text-sm">No variants added. Products need at least one variant to be purchasable.</p>}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Product Gallery</h2>
            <div className="space-y-4">
              <FileUpload onUpload={addImage} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {form.images.map((img: any, idx: number) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-stone-200">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="danger" size="sm" className="h-6 w-6 p-0" onClick={() => removeImage(idx)}><X className="w-3 h-3"/></Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 text-center font-bold uppercase">
                      {idx === 0 ? "Main Image" : `Image ${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">Status & Visibility</h2>
            <div className="space-y-4">
              <select 
                className="w-full h-10 px-3 rounded-md border border-stone-200 bg-white"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-stone-50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-stone-300 text-pink-600 focus:ring-pink-500"
                  checked={form.isFeatured} 
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} 
                />
                <span className="font-bold text-stone-700">Featured Product</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-stone-50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-stone-300 text-pink-600 focus:ring-pink-500"
                  checked={form.isBestSeller} 
                  onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} 
                />
                <span className="font-bold text-stone-700">Best Seller</span>
              </label>
            </div>
            <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700" onClick={handleSave}>
              {editingId ? "Update Product" : "Save Product"}
            </Button>
            {editingId && (
              <Button variant="outline" className="w-full mt-2" onClick={resetForm}>Cancel Edit</Button>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Material & Care</h2>
            <div className="space-y-3">
              <Input placeholder="Material (e.g. 100% Silk)" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
              <textarea 
                className="w-full p-3 rounded-md border border-stone-200 bg-white min-h-[80px]"
                placeholder="Care Instructions"
                value={form.care}
                onChange={(e) => setForm({ ...form, care: e.target.value })}
              />
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Products List</h2>
        <div className="overflow-auto">
          <AdminTable 
            headers={["Image", "Name", "Category", "Price", "Stock", "Status", "Actions"]} 
            rows={products.map(p => [
              <div className="w-12 h-12 rounded border border-stone-200 overflow-hidden">
                <img src={p.images?.[0]?.url || ""} className="w-full h-full object-cover" />
              </div>,
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-xs text-stone-500">{p.brand}</p>
              </div>,
              <span className="text-sm">{p.category?.name}</span>,
              <span className="font-bold">₹{p.variants?.[0]?.salePrice / 100}</span>,
              <span className={`font-mono ${p.variants?.reduce((acc: any, v: any) => acc + v.stock, 0) < 5 ? 'text-red-600 font-bold' : ''}`}>
                {p.variants?.reduce((acc: any, v: any) => acc + v.stock, 0)}
              </span>,
              <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${p.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                {p.status}
              </span>,
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
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
