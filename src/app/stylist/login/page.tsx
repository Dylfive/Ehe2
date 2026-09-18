"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, User } from "lucide-react";

export default function StylistLogin() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const { login, currentStylist, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && currentStylist) {
      router.push("/stylist/dashboard");
    }
  }, [isLoaded, currentStylist, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, pin);
    if (success) {
      router.push("/stylist/dashboard");
    } else {
      setError(true);
      setPin("");
    }
  };

  if (!isLoaded || currentStylist) return null; // Avoid flicker

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 70px)" }}>
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="badge" style={{ marginBottom: "0.75rem" }}>Staff Portal</span>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Stylist Login</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
            Enter your credentials to manage your schedule.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-light)" }} />
              <input
                type="text"
                required
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false); }}
                className="book-input"
                style={{ paddingLeft: "2.75rem" }}
                placeholder="e.g. TC"
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
              PIN / Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-light)" }} />
              <input
                type="password"
                required
                value={pin}
                onChange={e => { setPin(e.target.value); setError(false); }}
                className="book-input"
                style={{ paddingLeft: "2.75rem" }}
                placeholder="•••••••"
              />
            </div>
          </div>

          {error && (
            <div style={{ fontSize: "0.85rem", color: "#C00802", backgroundColor: "#FBECED", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid #f5c6c6" }}>
              Invalid username or PIN. Please try again.
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem", width: "100%" }}>
            Access Portal
          </button>
        </form>
      </div>
    </div>
  );
}
