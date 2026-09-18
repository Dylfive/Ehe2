"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function StylistLayout({ children }: { children: React.ReactNode }) {
  const { currentStylist, logout, isLoaded } = useAuth();

  return (
    <div className="stylist-app-root">
      {/* Minimal Top Bar */}
      <header className="stylist-header">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Logo width={42} height={28} color="var(--color-primary)" />
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-main)" }}>
              Ehe Hair <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>| Portal</span>
            </span>
          </div>

          {isLoaded && currentStylist && (
            <button
              onClick={logout}
              className="btn btn-outline btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </header>

      <main className="stylist-main">
        {children}
      </main>
    </div>
  );
}
