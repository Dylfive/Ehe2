import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop Hair Care Products | Ehe Hair – Paul Mitchell & More",
  description: "Browse Ehe Hair's curated collection of professional hair care products — styling pastes, shampoos, conditioners, and kids' lines from trusted salon brands.",
  openGraph: {
    title: "Shop Premium Hair Care | Ehe Hair",
    description: "Professional styling pastes, shampoos, conditioners, and more — salon-tested and delivered to your door.",
    url: "/shop",
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
