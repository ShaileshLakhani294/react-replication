import AppLayout from "@/components/layout/AppLayout";
import { categories, items } from "@/data/menu";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Menu = () => {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [date, setDate] = useState<Date>(new Date());
  
  const nextDay = () => setDate(prev => addDays(prev, 1));
  const prevDay = () => setDate(prev => subDays(prev, 1));

  const visible = useMemo(() => items.filter((i) => i.categoryId === activeCat), [activeCat]);
  const selectedList = useMemo(() => items.filter((i) => selected[i.id]), [selected]);

  return (
    <AppLayout title="Today’s Menu • Cafeteria Admin" description="Plan and select items for today’s menu.">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <section className="space-y-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-center gap-4 rounded-xl border p-4">
            <Button variant="outline" size="icon" onClick={prevDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{format(date, 'EEEE')}</h2>
              <p className="text-sm text-muted-foreground">{format(date, 'MMMM d, yyyy')}</p>
            </div>
            <Button variant="outline" size="icon" onClick={nextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories - horizontal chips */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCat === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCat(cat.id)}
                className="flex-shrink-0"
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Items Grid */}
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

        {/* Right sidebar with accordion menu */}
        <aside className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="menu-1">
              <AccordionTrigger>Menu 1</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button variant="secondary" className="w-full">+ Menu 2</Button>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Menu;
