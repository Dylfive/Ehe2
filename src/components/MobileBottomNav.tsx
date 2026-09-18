"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Home, Store, Calendar, ShoppingBag } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCart();

  const navItems = [
    { label: "HOME", href: "/", icon: Home },
    { label: "SHOP", href: "/shop", icon: Store },
    { label: "BOOK", href: "/book", icon: Calendar },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <item.icon size={22} className="mobile-bottom-nav-icon" />
            <span className="mobile-bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
      
      <button 
        className="mobile-bottom-nav-item"
        onClick={toggleCart}
        aria-label="View shopping cart"
      >
        <div style={{ position: "relative" }}>
          <ShoppingBag size={22} className="mobile-bottom-nav-icon" />
          {totalItems > 0 && (
            <span className="mobile-bottom-nav-badge">{totalItems}</span>
          )}
        </div>
        <span className="mobile-bottom-nav-label">CART</span>
      </button>
    </div>
  );
}
