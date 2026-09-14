"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link href={`/product/${product.slug}`} className="product-card-img-wrap">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="product-card-img"
        />
      </Link>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="product-card-title">{product.name}</h3>
        </Link>
        <div className="product-card-price">${product.price.toFixed(2)}</div>
        <div className="product-card-footer">
          <button
            onClick={handleAdd}
            className={`btn btn-sm ${added ? "btn-accent" : "btn-primary"}`}
            style={{ width: "100%" }}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check size={16} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Add To Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
