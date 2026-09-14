"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
    if (stripePaymentLink) {
      window.location.href = stripePaymentLink;
      return;
    }
    const prefix = process.env.NODE_ENV === "production" ? "/Ehe2" : "";
    setTimeout(() => {
      window.location.href = `${prefix}/checkout/success/`;
    }, 600);
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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                {isCheckingOut ? "Processing..." : "Checkout with Stripe"}
                {!isCheckingOut && <ArrowRight size={16} />}
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
