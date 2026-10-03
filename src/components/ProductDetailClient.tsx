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
    <div className="product-detail-wrapper">
      <div className="container">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="product-breadcrumbs">
          <Link href="/" style={{ color: "var(--color-text-muted)" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/shop" style={{ color: "var(--color-text-muted)" }}>Shop</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--color-text-main)", fontWeight: 500 }}>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Product Image */}
          <div className="product-detail-image-box">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Product Details */}
          <div className="product-detail-info">
            <span className="badge product-detail-badge">
              {product.category}
            </span>
            <h1 className="product-detail-title">
              {product.name}
            </h1>
            <div className="product-detail-price">
              ${product.price.toFixed(2)}
            </div>

            <p className="product-detail-desc">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="product-detail-features">
                <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem", fontWeight: 600 }}>Key Highlights</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
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
                      <Sparkles size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions: Quantity & Main Add to Cart */}
            <div className="product-actions-row">
              <div
                style={{
                  display: "inline-flex",
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
            <div className="product-detail-guarantees">
              <div className="guarantee-item">
                <ShieldCheck size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>100% Authentic Salon Product</span>
              </div>
              <div className="guarantee-item">
                <Truck size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span>Fast Reliable Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
