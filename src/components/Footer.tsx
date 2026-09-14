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
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                href="/shop"
                className="btn btn-outline btn-sm"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
              >
                Explore Shop
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
              <li><Link href="/contact">Book An Appointment</Link></li>
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
