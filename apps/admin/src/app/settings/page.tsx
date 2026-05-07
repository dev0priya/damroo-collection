"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@damroo/ui";
import { api } from "../../lib/api";
import { AdminTable } from "../../components/table";
import { Plus, Trash2, Save, Globe, Instagram, Facebook, Twitter, Info } from "lucide-react";

export default function SettingsPage() {
  const [configs, setConfigs] = useState<{ key: string; value: string }[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [configData, menuData, pageData] = await Promise.all([
        api.get("/admin/site-config"),
        api.get("/admin/menu-items"),
        api.get("/admin/pages")
      ]);
      
      // Ensure specific keys exist in state
      const defaultKeys = [
        "footer_about", "footer_address", "copyright_text", 
        "social_instagram", "social_facebook", "social_twitter"
      ];
      const existingConfigs = configData.configs || [];
      const mergedConfigs = defaultKeys.map(key => {
        const found = existingConfigs.find((c: any) => c.key === key);
        return found ? found : { key, value: "" };
      });

      setConfigs(mergedConfigs);
      setMenus(menuData.items);
      setPages(pageData.pages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      await api.post("/admin/site-config", configs);
      alert("Settings saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async (position: "HEADER" | "FOOTER") => {
    try {
      await api.post("/admin/menu-items", { label: "New Link", position, rank: menus.length });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMenu = async (id: string, data: any) => {
    try {
      await api.put(`/admin/menu-items/${id}`, data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMenu = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/menu-items/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">Site Configuration & CMS</h1>
        <Button onClick={handleSaveConfig} disabled={loading} className="bg-pink-600 hover:bg-pink-700">
          <Save className="w-4 h-4 mr-2" /> Save All Settings
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-pink-600"/> Footer Content</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-500">About the Brand (Footer)</label>
                <textarea 
                  className="w-full p-3 rounded-md border border-stone-200 bg-white min-h-[100px]"
                  value={configs.find(c => c.key === "footer_about")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "footer_about");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-500">Address / Contact Info</label>
                <Input 
                  value={configs.find(c => c.key === "footer_address")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "footer_address");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-500">Copyright Text</label>
                <Input 
                  value={configs.find(c => c.key === "copyright_text")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "copyright_text");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-pink-600"/> Social Media Links</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-stone-400" />
                <Input 
                  placeholder="Instagram URL"
                  value={configs.find(c => c.key === "social_instagram")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "social_instagram");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-stone-400" />
                <Input 
                  placeholder="Facebook URL"
                  value={configs.find(c => c.key === "social_facebook")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "social_facebook");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-stone-400" />
                <Input 
                  placeholder="Twitter URL"
                  value={configs.find(c => c.key === "social_twitter")?.value || ""}
                  onChange={(e) => {
                    const newConfigs = [...configs];
                    const idx = newConfigs.findIndex(c => c.key === "social_twitter");
                    newConfigs[idx].value = e.target.value;
                    setConfigs(newConfigs);
                  }}
                />
              </div>
            </div>
          </Card>
        </div>

        <Card className="h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Navigation Menus</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleAddMenu("HEADER")}><Plus className="w-4 h-4 mr-1"/> Header</Button>
              <Button size="sm" variant="outline" onClick={() => handleAddMenu("FOOTER")}><Plus className="w-4 h-4 mr-1"/> Footer</Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="overflow-auto border rounded-lg">
              <AdminTable 
                headers={["Label", "Pos", "Page/Link", "Rank", "Actions"]} 
                rows={menus.map(m => [
                  <Input 
                    className="w-32"
                    value={m.label} 
                    onBlur={(e) => handleUpdateMenu(m.id, { label: e.target.value })} 
                    onChange={(e) => {
                      const newMenus = [...menus];
                      const idx = newMenus.findIndex(item => item.id === m.id);
                      newMenus[idx].label = e.target.value;
                      setMenus(newMenus);
                    }}
                  />,
                  <span className={`text-[10px] font-black px-1 rounded ${m.position === 'HEADER' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {m.position}
                  </span>,
                  <select 
                    className="w-32 text-xs h-8 rounded border border-stone-200"
                    value={m.pageId || ""}
                    onChange={(e) => handleUpdateMenu(m.id, { pageId: e.target.value || null, externalUrl: e.target.value ? null : m.externalUrl })}
                  >
                    <option value="">Custom Link</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>,
                  <input 
                    type="number" 
                    className="w-12 text-xs border rounded p-1"
                    value={m.rank} 
                    onChange={(e) => handleUpdateMenu(m.id, { rank: parseInt(e.target.value) || 0 })} 
                  />,
                  <Button variant="danger" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteMenu(m.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                ])} 
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
