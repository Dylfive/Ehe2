"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface Stylist {
  id: string;
  initials: string;
  name: string;
}

const STYLISTS: Stylist[] = [
  { id: "terry-cho", initials: "TC", name: "Terry Cho" },
  { id: "juana-lee", initials: "JL", name: "Juana Lee" },
  { id: "betty-balmer", initials: "BB", name: "Betty Balmer" },
];

interface AuthContextType {
  currentStylist: Stylist | null;
  login: (username: string, pin: string) => boolean;
  logout: () => void;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentStylist, setCurrentStylist] = useState<Stylist | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ehe_stylist_session");
      if (saved) {
        setCurrentStylist(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load session", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (username: string, pin: string) => {
    // Basic hardcoded auth for demo purposes
    // tc / ehe2026, jl / ehe2026, bb / ehe2026
    const normalizedUsername = username.toLowerCase().trim();
    if (pin !== "ehe2026") return false;

    let stylist: Stylist | undefined;
    if (normalizedUsername === "tc") {
      stylist = STYLISTS.find((s) => s.id === "terry-cho");
    } else if (normalizedUsername === "jl") {
      stylist = STYLISTS.find((s) => s.id === "juana-lee");
    } else if (normalizedUsername === "bb") {
      stylist = STYLISTS.find((s) => s.id === "betty-balmer");
    }

    if (stylist) {
      setCurrentStylist(stylist);
      sessionStorage.setItem("ehe_stylist_session", JSON.stringify(stylist));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentStylist(null);
    sessionStorage.removeItem("ehe_stylist_session");
    router.push("/stylist/login");
  };

  return (
    <AuthContext.Provider value={{ currentStylist, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
