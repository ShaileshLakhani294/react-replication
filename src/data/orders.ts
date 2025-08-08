import type { OrderData } from "@/components/orders/OrderCard";

export const orders: OrderData[] = [
  {
    id: 126,
    time: "04:47 PM",
    total: 160,
    status: "pending",
    items: [
      { name: "Vada Pav", qty: 2, modifiers: ["Butter", "Less Spicy"] },
      { name: "Veg. Sandwich", qty: 2, modifiers: ["Grilled"] },
    ],
  },
  {
    id: 125,
    time: "04:45 PM",
    total: 80,
    status: "pending",
    items: [
      { name: "Regular Thali", qty: 1, modifiers: ["Buttermilk"] },
    ],
  },
  {
    id: 122,
    time: "04:47 PM",
    total: 240,
    status: "pending",
    items: [
      { name: "Vada Pav", qty: 2 },
      { name: "Chizzy Sandwich", qty: 2, modifiers: ["Grilled"] },
    ],
  },
  {
    id: 118,
    time: "04:47 PM",
    total: 200,
    status: "noshow",
    items: [
      { name: "Masala Tea", qty: 1 },
      { name: "Filter Coffee", qty: 2 },
      { name: "Veg. Upma", qty: 1 },
    ],
  },
  {
    id: 119,
    time: "04:47 PM",
    total: 90,
    status: "completed",
    items: [
      { name: "Bhel", qty: 1 },
      { name: "Masala Masti Chips", qty: 2 },
      { name: "Cream & Onion", qty: 2 },
      { name: "Aloo Sev", qty: 3 },
      { name: "Farali Chevdo", qty: 3 },
    ],
  },
  {
    id: 120,
    time: "04:47 PM",
    total: 200,
    status: "canceled",
    items: [
      { name: "Masala Tea", qty: 1 },
      { name: "Filter Coffee", qty: 2 },
      { name: "Veg. Upma", qty: 1 },
    ],
  },
  {
    id: 121,
    time: "04:47 PM",
    total: 80,
    status: "rejected",
    items: [
      { name: "Veg. Sandwich", qty: 2, modifiers: ["Grilled"] },
    ],
  },
];
