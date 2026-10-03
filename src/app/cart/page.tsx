import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart | Ehe Hair",
  description: "Review your selected Ehe Hair products and proceed to secure checkout. Professional salon hair care delivered to your door.",
};

export default function CartPage() {
  return <CartClient />;
}
