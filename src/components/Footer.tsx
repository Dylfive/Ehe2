import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <Logo width={46} height={32} color="#FFFFFF" />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Ehe Hair
              </span>
            </div>
            <p style={{ color: "#A09E9B", fontSize: "0.95rem", maxWidth: "340px", marginBottom: "1.5rem" }}>
              Experience the perfect blend of skill, style, and care at Ehe Hair. Elevating beauty routines with premier salon products and bespoke services.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
              <Link
                href="/shop"
                className="btn btn-outline btn-sm"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
              >
                Explore Shop
              </Link>
              <Link
                href="/stylist/login"
                className="btn btn-sm"
                style={{
                  backgroundColor: "#E53E3E",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 2px 8px rgba(229, 62, 62, 0.4)",
                  border: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Stylist Portal Login
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop All Products</Link></li>
              <li><Link href="/about">About Ehe Hair</Link></li>
              <li><Link href="/hair-clinic">Hair Clinic</Link></li>
              <li><Link href="/book">Book An Appointment</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link href="/shop?category=Styling">Styling</Link></li>
              <li><Link href="/shop?category=Shampoo">Shampoo</Link></li>
              <li><Link href="/shop?category=Conditioner">Conditioner</Link></li>
              <li><Link href="/shop?category=Kids">Kids Care</Link></li>
              <li><Link href="/shop">Paul Mitchell</Link></li>
            </ul>
          </div>

          {/* Salon Info */}
          <div className="footer-col">
            <h4>Salon & Support</h4>
            <p style={{ color: "#A09E9B", fontSize: "0.95rem", marginBottom: "0.8rem" }}>
              Questions about products or hair consultations? Reach out to our dedicated salon team.
            </p>
            <p style={{ color: "var(--color-accent)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              Online Hours: Mon - Sat: 9:00 AM - 7:00 PM
            </p>
            <p style={{ color: "#A09E9B", fontSize: "0.85rem" }}>
              Secure online payments powered by Stripe.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright &copy; {new Date().getFullYear()} Ehe Hair. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ color: "#7E7C79" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "#7E7C79" }}>Terms of Service</Link>
            <Link href="/shipping" style={{ color: "#7E7C79" }}>Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
