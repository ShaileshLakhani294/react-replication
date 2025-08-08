import AppLayout from "@/components/layout/AppLayout";
import { categories, items } from "@/data/menu";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const visible = useMemo(() => items.filter((i) => i.categoryId === activeCat), [activeCat]);
  const selectedList = useMemo(() => items.filter((i) => selected[i.id]), [selected]);

  return (
    <AppLayout title="Today’s Menu • Cafeteria Admin" description="Plan and select items for today’s menu.">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr_280px]">
        {/* Left categories */}
        <aside className="space-y-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                activeCat === c.id ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
              }`}
            >
              {c.name}
            </button>
          ))}
        </aside>

        {/* Center grid */}
        <section>
          <div className="mb-4 flex items-center gap-2 overflow-auto rounded-full border p-2 text-sm">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className={`rounded-full px-4 py-1 ${idx === 3 ? "bg-secondary" : ""}`}>Mon {idx + 14}</div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((it) => {
              const isSel = !!selected[it.id];
              return (
                <button
                  key={it.id}
                  onClick={() => setSelected((s) => ({ ...s, [it.id]: !s[it.id] }))}
                  className={`group relative overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-all hover:shadow-md ${
                    isSel ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <img src={it.image} alt={`${it.name} photo`} loading="lazy" className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-muted-foreground">₹{it.price}</div>
                  </div>
                  {isSel && (
                    <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">✓</div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Right selection summary */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h2 className="mb-2 text-lg font-semibold">Menu 1</h2>
            <ul className="space-y-2 text-sm">
              {selectedList.length === 0 && (
                <li className="text-muted-foreground">No items selected yet.</li>
              )}
              {selectedList.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">₹{s.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1">Set Menu</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setSelected({})}>Cancel</Button>
            </div>
          </div>
          <Button variant="secondary" className="w-full">+ Menu 2</Button>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Menu;
