"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["All", "Styling", "Shampoo", "Conditioner", "Kids"];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", padding: "3.5rem 0 6rem" }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
          <span className="badge" style={{ marginBottom: "0.75rem" }}>
            Salon Collection
          </span>
          <h1 style={{ marginBottom: "0.75rem" }}>Ehe Hair Shop</h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)" }}>
            Explore our curated selection of professional hair care, styling clays, and gentle daily cleansers.
          </p>
        </div>

        {/* Filters and Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "3rem",
            backgroundColor: "var(--color-bg-subtle)",
            padding: "1.5rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: "relative",
                flex: "1 1 300px",
                maxWidth: "400px",
              }}
            >
              <Search
                size={18}
                color="#9CA3AF"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.6rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <SlidersHorizontal size={16} color="#666666" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.25rem",
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid",
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    backgroundColor: active ? "var(--color-primary)" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "var(--color-text-main)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.75rem",
            color: "var(--color-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          <span>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</span>
          {searchQuery && (
            <span>
              Searching for: <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 1rem",
              backgroundColor: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>No products found</h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              We couldn&apos;t find any products matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
