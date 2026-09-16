"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Lock body scroll while drawer is open (important on iOS)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout. Please try again.");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={closeCart} />
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShoppingBag size={22} color="var(--color-accent)" />
            <span className="cart-drawer-title">Your Cart ({totalItems})</span>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <ShoppingBag size={48} color="#D1D5DB" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Your cart is empty</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Explore our selection of premium salon hair care products.
              </p>
              <Link href="/shop" onClick={closeCart} className="btn btn-outline btn-sm">
                Browse Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="cart-item-card">
                <div style={{ position: "relative", width: 75, height: 75, flexShrink: 0 }}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="75px"
                    className="cart-item-img"
                  />
                </div>
                <div className="cart-item-details">
                  <div>
                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="cart-item-qty">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, minWidth: "1.2rem", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9CA3AF",
                        padding: "0.2rem",
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              Taxes and shipping calculated at checkout.
            </p>
            {checkoutError && (
              <p style={{
                fontSize: "0.8rem",
                color: "#C00802",
                backgroundColor: "#FBECED",
                border: "1px solid #f5c6c6",
                borderRadius: "6px",
                padding: "0.6rem 0.75rem",
                marginBottom: "0.75rem",
              }}>
                {checkoutError}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    Redirecting to Stripe…
                  </>
                ) : (
                  <>
                    Checkout with Stripe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn btn-outline btn-sm"
                style={{ width: "100%", justifyContent: "center" }}
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
