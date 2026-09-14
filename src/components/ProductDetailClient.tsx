"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, ShoppingBag, Check, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/shop" style={{ color: "var(--color-text-muted)" }}>Shop</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--color-text-main)", fontWeight: 500 }}>{product.name}</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4.5rem",
            alignItems: "start",
          }}
        >
          {/* Product Image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              backgroundColor: "var(--color-bg-subtle)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Product Details */}
          <div>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: "2.3rem", marginBottom: "1rem", lineHeight: 1.2 }}>
              {product.name}
            </h1>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.85rem",
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: "1.75rem",
              }}
            >
              ${product.price.toFixed(2)}
            </div>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Key Highlights</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.95rem",
                        color: "var(--color-text-main)",
                      }}
                    >
                      <Sparkles size={16} color="var(--color-accent)" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions: Quantity & Add to Cart */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-full)",
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ border: "none" }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span
                  style={{
                    padding: "0 0.8rem",
                    fontWeight: 600,
                    minWidth: "2.5rem",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ border: "none" }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn ${added ? "btn-accent" : "btn-primary"}`}
                style={{ flex: 1 }}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add To Cart &bull; ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* Guarantees Box */}
            <div
              style={{
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "1.75rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <ShieldCheck size={20} color="var(--color-accent)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  100% Authentic Salon Product
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Truck size={20} color="var(--color-accent)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  Fast Reliable Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
