"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Hair Clinic", href: "/hair-clinic" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Logo width={52} height={35} color="var(--color-primary)" />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.45rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-text-main)",
              }}
            >
              Ehe Hair
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav>
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive ? "active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Language Selector */}
            <LanguageSelector />

            <button
              onClick={toggleCart}
              className="cart-button-header"
              aria-label="View shopping cart"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            <Link
              href="/contact"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex" }}
            >
              Book An Appointment
            </Link>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: "1.5rem 0",
              borderTop: "1px solid var(--color-border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              overflowX: "hidden",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: pathname === link.href ? "var(--color-accent)" : "var(--color-text-main)",
                  padding: "0.25rem 0",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <LanguageSelector />
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
            >
              Book An Appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
