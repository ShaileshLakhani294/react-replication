import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type OrderStatus = "pending" | "completed" | "noshow" | "rejected" | "canceled";

export interface OrderItem {
  name: string;
  modifiers?: string[];
  qty: number;
}

export interface OrderData {
  id: number; // token number
  time: string; // e.g., 04:47 PM
  total: number; // price in ₹
  status: OrderStatus;
  items: OrderItem[];
}

const statusBadge = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-status-completed/10 text-status-completed border-status-completed/20">Completed</Badge>
      );
    case "noshow":
      return <Badge className="bg-status-noshow/15 text-status-noshow border-status-noshow/20">No Show</Badge>;
    case "rejected":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
    case "canceled":
      return <Badge className="bg-status-canceled/10 text-status-canceled border-status-canceled/20">Cancelled</Badge>;
    default:
      return null;
  }
};

export const OrderCard = ({ order }: { order: OrderData }) => {
  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">#{order.id}</h3>
          {order.status !== "pending" && statusBadge(order.status)}
        </div>
        <div className="text-right">
          <div className="text-sm">₹{order.total}</div>
          <div className="text-xs text-muted-foreground">{order.time}</div>
        </div>
      </div>

      <ul className="space-y-1 text-sm">
        {order.items.map((it, idx) => (
          <li key={idx} className="flex items-start justify-between">
            <div>
              <span className="font-medium">{it.name}</span>
              {it.modifiers?.length ? (
                <div className="text-xs text-muted-foreground">- {it.modifiers.join(", ")}</div>
              ) : null}
            </div>
            <span className="text-sm">{it.qty}</span>
          </li>
        ))}
      </ul>

      {order.status === "pending" && (
        <div className="mt-4 flex gap-2">
          <Button variant="destructive" className="flex-1">Reject</Button>
          <Button className="flex-1">Accept</Button>
        </div>
      )}
    </article>
  );
};
