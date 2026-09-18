"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type BookingType = "online" | "phone" | "in-person";

export interface Booking {
  id: string;
  stylistId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // YYYY-MM-DD format for easier querying
  timeSlot: string;
  type: BookingType;
  notes?: string;
  createdAt: number;
}

export interface UnavailabilityBlock {
  id: string;
  stylistId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g., "09:00 AM" or "All Day"
  endTime: string;
  reason?: string;
  createdAt: number;
}

interface ScheduleContextType {
  bookings: Booking[];
  unavailability: UnavailabilityBlock[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  removeBooking: (id: string) => void;
  addUnavailability: (block: Omit<UnavailabilityBlock, "id" | "createdAt">) => void;
  removeUnavailability: (id: string) => void;
  getBookingsForStylist: (stylistId: string, date: string) => Booking[];
  getUnavailabilityForStylist: (stylistId: string, date: string) => UnavailabilityBlock[];
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [unavailability, setUnavailability] = useState<UnavailabilityBlock[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem("ehe_bookings");
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      const savedUnavailability = localStorage.getItem("ehe_unavailability");
      if (savedUnavailability) {
        setUnavailability(JSON.parse(savedUnavailability));
      }
    } catch (e) {
      console.error("Failed to load schedule from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("ehe_bookings", JSON.stringify(bookings));
      localStorage.setItem("ehe_unavailability", JSON.stringify(unavailability));
    } catch (e) {
      console.error("Failed to save schedule to storage", e);
    }
  }, [bookings, unavailability, isLoaded]);

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const removeBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addUnavailability = (blockData: Omit<UnavailabilityBlock, "id" | "createdAt">) => {
    const newBlock: UnavailabilityBlock = {
      ...blockData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setUnavailability((prev) => [...prev, newBlock]);
  };

  const removeUnavailability = (id: string) => {
    setUnavailability((prev) => prev.filter((b) => b.id !== id));
  };

  const getBookingsForStylist = (stylistId: string, date: string) => {
    return bookings.filter((b) => b.stylistId === stylistId && b.date === date);
  };

  const getUnavailabilityForStylist = (stylistId: string, date: string) => {
    return unavailability.filter((u) => u.stylistId === stylistId && u.date === date);
  };

  return (
    <ScheduleContext.Provider
      value={{
        bookings,
        unavailability,
        addBooking,
        removeBooking,
        addUnavailability,
        removeUnavailability,
        getBookingsForStylist,
        getUnavailabilityForStylist,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
