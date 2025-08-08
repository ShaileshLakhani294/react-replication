import AppLayout from "@/components/layout/AppLayout";
import { orders as allOrders } from "@/data/orders";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


type Status = "all" | "completed" | "noshow" | "rejected" | "canceled" | "pending";

const History = () => {
  const [filter, setFilter] = useState<Status>("noshow");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: allOrders.length, completed: 0, noshow: 0, rejected: 0, canceled: 0, pending: 0 };
    allOrders.forEach((o) => {
      base[o.status] = (base[o.status] || 0) + 1;
    });
    return base;
  }, []);

  const list = useMemo(() => {
    let l = filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter((o) => String(o.id).includes(q) || o.items.some((i) => i.name.toLowerCase().includes(q)));
    }
    return l;
  }, [filter, search]);

  const selected = useMemo(() => list.find((o) => o.id === selectedId) ?? list[0] ?? null, [list, selectedId]);

  return (
    <AppLayout title="Order History • Cafeteria Admin" description="Browse completed, rejected, canceled and no show orders.">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr_360px]">
        {/* Left filter with counts */}
        <aside className="space-y-2">
          {(["all","completed","noshow","rejected","canceled","pending"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                filter === s ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="capitalize">{s}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts[s] ?? 0}</span>
            </button>
          ))}
        </aside>

        {/* Center list with search */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search by order id or item..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="rounded-xl border">
            <ul>
              {list.map((o) => (
                <li key={o.id}>
                  <button
                    onClick={() => setSelectedId(o.id)}
                    className={`grid w-full grid-cols-[120px_1fr_100px] items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selected?.id === o.id ? "bg-secondary/60" : "hover:bg-muted"
                    }`}
                  >
                    <span className="text-sm font-semibold">#{o.id}</span>
                    <span className="text-sm text-muted-foreground">Today • {o.time}</span>
                    <span className="text-sm font-medium justify-self-end">₹{o.total}</span>
                  </button>
                </li>
              ))}
              {list.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-muted-foreground">No orders found.</li>
              )}
            </ul>
          </div>
        </section>

        {/* Right detail panel */}
        <aside className="space-y-3">
          {selected ? (
            <div className="space-y-4 rounded-xl border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Token</div>
                  <div className="text-2xl font-semibold">#{selected.id}</div>
                </div>
                <Badge variant="outline" className="capitalize">{selected.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Date</div>
                  <div>Today</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Time</div>
                  <div>{selected.time}</div>
                </div>
              </div>

              <div>
                <div className="mb-2 font-medium">Items</div>
                <ul className="space-y-2 text-sm">
                  {selected.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>{it.name} × {it.qty}</span>
                      <span className="text-muted-foreground">{it.modifiers?.join(", ")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{selected.total}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹0</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>₹{selected.total}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border p-4 text-sm text-muted-foreground">Select an order to see details.</div>
          )}
        </aside>
      </div>
    </AppLayout>
  );
};

export default History;
