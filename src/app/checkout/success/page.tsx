"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ padding: "6rem 0", backgroundColor: "var(--color-bg)" }}>
      <div className="container" style={{ maxWidth: "650px", textAlign: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "var(--color-accent-light)",
            color: "var(--color-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.75rem",
          }}
        >
          <CheckCircle2 size={40} />
        </div>

        <span className="badge" style={{ marginBottom: "1rem" }}>
          Payment Successful
        </span>
        <h1 style={{ marginBottom: "1rem" }}>Thank You For Your Order!</h1>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "var(--color-text-muted)",
            marginBottom: "2.5rem",
          }}
        >
          Your payment has been successfully processed. We are preparing your salon products for shipment and a confirmation email has been sent to your inbox.
        </p>

        <div
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "1.75rem",
            marginBottom: "2.5rem",
            textAlign: "left",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Order Status: Processing</div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
            Our salon shipping team fulfills orders Monday through Friday. If you have any inquiries regarding your delivery, please contact our support team.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/shop" className="btn btn-primary">
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link href="/" className="btn btn-outline">
            Return Home <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
