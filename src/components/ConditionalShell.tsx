"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { ScheduleProvider } from "@/context/ScheduleContext";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStylistPortal = pathname?.startsWith("/stylist");

  if (isStylistPortal) {
    return (
      <AuthProvider>
        <ScheduleProvider>
          {children}
        </ScheduleProvider>
      </AuthProvider>
    );
  }

  return (
    <>
      {/* We only wrap the schedule/auth context if needed, but since book page uses ScheduleContext to read availability, we need ScheduleProvider in the public shell too! */}
      <ScheduleProvider>
        <Header />
        <CartDrawer />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </ScheduleProvider>
    </>
  );
}
