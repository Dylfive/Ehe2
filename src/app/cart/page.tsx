"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Loader2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? `Server error (${res.status}). Please check Stripe configuration.`);
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div style={{ padding: "4rem 0 6rem", backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <h1 style={{ marginBottom: "2.5rem" }}>Shopping Cart ({totalItems})</h1>

        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 1rem",
              backgroundColor: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <ShoppingBag size={48} color="#D1D5DB" style={{ margin: "0 auto 1.25rem" }} />
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Your cart is currently empty</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              Before you can checkout, you must add some products to your shopping cart.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Return To Shop
            </Link>
          </div>
        ) : (
          <div className="cart-page-grid">
            {/* Items Table */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-subtle)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Products
              </div>

              <div>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      padding: "1.5rem",
                      borderBottom: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 80,
                        height: 80,
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        flexShrink: 0,
                        backgroundColor: "var(--color-bg-subtle)",
                      }}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                          {item.product.name}
                        </h3>
                      </Link>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                        {item.product.category}
                      </span>
                      <div
                        style={{
                          color: "var(--color-accent)",
                          fontWeight: 600,
                          fontSize: "1rem",
                          marginTop: "0.4rem",
                        }}
                      >
                        ${item.product.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: "1.75rem", textAlign: "center", fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        minWidth: "4.5rem",
                        textAlign: "right",
                      }}
                    >
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9CA3AF",
                        padding: "0.4rem",
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div
              style={{
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Order Summary</h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "1rem",
                }}
              >
                <span style={{ color: "var(--color-text-muted)" }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "1rem",
                }}
              >
                <span style={{ color: "var(--color-text-muted)" }}>Estimated Shipping</span>
                <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>Calculated at Checkout</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "1.25rem",
                  marginBottom: "2rem",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {checkoutError && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#C00802",
                    backgroundColor: "#FBECED",
                    border: "1px solid #f5c6c6",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {checkoutError}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                    Redirecting to Stripe…
                  </>
                ) : (
                  <>
                    Proceed To Stripe Checkout
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <ShieldCheck size={16} color="var(--color-accent)" />
                Encrypted &amp; Secured with Stripe Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
