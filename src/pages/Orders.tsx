import AppLayout from "@/components/layout/AppLayout";
import { OrderCard } from "@/components/orders/OrderCard";
import { orders as allOrders } from "@/data/orders";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // counts
  const counts = useMemo(() => {
    const base = { all: allOrders.length, completed: 0, noshow: 0, rejected: 0, canceled: 0, pending: 0 } as Record<string, number>;
    allOrders.forEach((o) => {
      base[o.status] = (base[o.status] || 0) + 1;
    });
    return base;
  }, []);

  const filtered = useMemo(() => {
    const list = filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter);
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [filter, page]);

  const totalPages = useMemo(() => {
    const total = filter === "all" ? allOrders.length : allOrders.filter((o) => o.status === filter).length;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [filter]);

  const setFilterAndReset = (val: string) => {
    setFilter(val);
    setPage(1);
  };

  return (
    <AppLayout title="My Orders • Cafeteria Admin" description="Manage incoming orders, accept or reject, and track statuses.">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main listing */}
        <section className="overflow-x-auto">
          <div className="min-w-[860px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        </section>

        {/* Right controls */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-3">
            <h2 className="mb-2 text-sm font-semibold">Status Filter</h2>
            <div className="space-y-2">
              {(["all","completed","noshow","rejected","canceled","pending"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterAndReset(s)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    filter === s ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="capitalize">{s}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts[s] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-3">
            <h2 className="mb-2 text-sm font-semibold">Pagination</h2>
            <div className="flex items-center justify-between gap-2">
              <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
              <div className="text-sm">Page {page} / {totalPages}</div>
              <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default Orders;
