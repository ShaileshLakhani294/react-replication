export type Category = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
};

import butterRoti from "@/assets/food/butter-roti.jpg";
import puri from "@/assets/food/puri.jpg";
import samosa from "@/assets/food/samosa.jpg";
import sandwich from "@/assets/food/sandwich.jpg";
import kulcha from "@/assets/food/kulcha.jpg";
import masalaTea from "@/assets/food/masala-tea.jpg";
import fries from "@/assets/food/fries.jpg";
import bhakhri from "@/assets/food/bhakhri.jpg";
import bhel from "@/assets/food/bhel.jpg";

export const categories: Category[] = [
  { id: "breads", name: "Breads" },
  { id: "vegetables", name: "Vegetables" },
  { id: "snacks", name: "Evening Snacks" },
  { id: "drinks", name: "Drinks" },
];

export const items: MenuItem[] = [
  { id: "butter-roti", name: "Butter Roti (4)", price: 40, image: butterRoti, categoryId: "breads" },
  { id: "puri", name: "Puri", price: 50, image: puri, categoryId: "breads" },
  { id: "bhakhri", name: "Bhakhri", price: 45, image: bhakhri, categoryId: "breads" },
  { id: "kulcha", name: "Kulcha", price: 70, image: kulcha, categoryId: "breads" },

  { id: "samosa", name: "Samosa", price: 20, image: samosa, categoryId: "snacks" },
  { id: "sandwich", name: "Sandwich", price: 55, image: sandwich, categoryId: "snacks" },
  { id: "fries", name: "French Fries", price: 80, image: fries, categoryId: "snacks" },
  { id: "bhel", name: "Bhel", price: 40, image: bhel, categoryId: "snacks" },

  { id: "masala-tea", name: "Masala Tea", price: 15, image: masalaTea, categoryId: "drinks" },
];
