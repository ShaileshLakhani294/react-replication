import AppLayout from "@/components/layout/AppLayout";
import { categories as baseCategories, items as baseItems } from "@/data/menu";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Pause, Play, Pencil } from "lucide-react";

const Items = () => {
  const [activeCat, setActiveCat] = useState(baseCategories[2]?.id || baseCategories[0].id);
  const [items, setItems] = useState(baseItems);
  const visible = useMemo(() => items.filter((i) => i.categoryId === activeCat), [items, activeCat]);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <AppLayout title="Add/Edit Items • Cafeteria Admin" description="Manage cafeteria items with images, prices and availability.">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr_340px]">
        {/* Left category list */}
        <aside className="space-y-3">
          {baseCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                activeCat === c.id ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={baseItems.find((i) => i.categoryId === c.id)?.image || baseItems[0]?.image}
                  alt={`${c.name} icon`}
                  className="h-8 w-8 rounded object-cover"
                  loading="lazy"
                />
                <span>{c.name}</span>
              </div>
            </button>
          ))}
        </aside>

        {/* Middle items list */}
        <section className="space-y-2 rounded-xl border p-2 md:p-4">
          {visible.map((it) => (
            <div key={it.id} className="flex items-center gap-4 rounded-xl border px-3 py-2">
              <img src={it.image} alt={`${it.name} image`} className="h-10 w-10 rounded object-cover" loading="lazy" />
              <div className="flex-1">
                <div className="text-sm font-medium">{it.name}</div>
                <div className="text-xs text-muted-foreground">₹{it.price}</div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <button className="rounded-full border p-2 hover:bg-muted" aria-label="Pause"><Pause size={16} /></button>
                <button className="rounded-full border p-2 hover:bg-muted" aria-label="Edit"><Pencil size={16} /></button>
                <button className="rounded-full border p-2 hover:bg-muted" aria-label="Delete"><Trash2 size={16} /></button>
                <button className="rounded-full border p-2 hover:bg-muted" aria-label="Enable"><Play size={16} /></button>
              </div>
            </div>
          ))}
        </section>

        {/* Right add form */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h2 className="mb-4 text-lg font-semibold">Add New Item</h2>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input id="name" placeholder="Enter item’s name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price*</Label>
                <Input id="price" placeholder="Enter item’s price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Available for</Label>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2"><Checkbox className="rounded-none" /> Jain</label>
                  <label className="flex items-center gap-2"><Checkbox className="rounded-none" /> Regular</label>
                  <label className="flex items-center gap-2"><Checkbox className="rounded-none" /> Swaminarayan</label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload media*</Label>
                <div className="grid h-24 place-content-center rounded-xl border border-dashed text-sm text-muted-foreground">Upload photo</div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" className="flex-1">Cancel</Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    if (!name || !price) return;
                    const id = name.toLowerCase().replace(/\s+/g, "-");
                    setItems((prev) => [
                      { id, name, price: Number(price), image: visible[0]?.image || prev[0]?.image, categoryId: activeCat },
                      ...prev,
                    ]);
                    setName("");
                    setPrice("");
                  }}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Items;
