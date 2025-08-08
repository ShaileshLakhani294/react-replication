import AppLayout from "@/components/layout/AppLayout";
import { OrderCard } from "@/components/orders/OrderCard";
import { orders } from "@/data/orders";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const History = () => {
  const [filter, setFilter] = useState("noshow");
  const filtered = useMemo(() => orders.filter((o) => (filter === "all" ? true : o.status === filter)), [filter]);

  return (
    <AppLayout title="Order History • Cafeteria Admin" description="Browse completed, rejected, canceled and no show orders.">
      <Tabs value={filter} onValueChange={setFilter} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 overflow-auto rounded-full bg-muted p-1 md:w-auto md:grid-cols-5">
          <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
          <TabsTrigger value="noshow" className="rounded-full">No Show</TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-full">Rejected</TabsTrigger>
          <TabsTrigger value="canceled" className="rounded-full">Canceled</TabsTrigger>
          <TabsTrigger value="all" className="rounded-full">All</TabsTrigger>
        </TabsList>
        <TabsContent value={filter} className="mt-0">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </section>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default History;
