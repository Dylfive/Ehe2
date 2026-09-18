"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSchedule, Booking, UnavailabilityBlock } from "@/context/ScheduleContext";
import { Calendar as CalendarIcon, Clock, Plus, Phone, User as UserIcon, X, CalendarDays, Ban } from "lucide-react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STUB_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"];

export default function DashboardPage() {
  const { currentStylist, isLoaded: authLoaded } = useAuth();
  const { bookings, unavailability, addBooking, addUnavailability, removeBooking, removeUnavailability } = useSchedule();
  const router = useRouter();

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Modals
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [blockForm, setBlockForm] = useState({ date: "", startTime: "9:00 AM", endTime: "12:00 PM", reason: "" });
  const [logForm, setLogForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: "Bang Cut", date: "", timeSlot: "9:00 AM", type: "in-person" as const
  });

  useEffect(() => {
    if (authLoaded && !currentStylist) {
      router.push("/stylist/login");
    }
  }, [authLoaded, currentStylist, router]);

  // Derived data
  const weekDates = useMemo(() => {
    const dates = [];
    const curr = new Date(currentDate);
    // adjust to Monday start
    const day = curr.getDay();
    const diff = curr.getDate() - day + (day === 0 ? -6 : 1);
    curr.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const d = new Date(curr);
      d.setDate(curr.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, [currentDate]);

  const handlePrevWeek = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  function fmtDate(d: Date) {
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
  }

  function handleAddBlock(e: React.FormEvent) {
    e.preventDefault();
    if (!currentStylist) return;
    addUnavailability({
      stylistId: currentStylist.id,
      date: blockForm.date,
      startTime: blockForm.startTime,
      endTime: blockForm.endTime,
      reason: blockForm.reason
    });
    setShowBlockModal(false);
  }

  function handleLogBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!currentStylist) return;
    // Map basic service to ID and price for demo
    const sId = logForm.service.toLowerCase().replace(" ", "-");
    let price = 20;
    if (sId.includes("men")) price = 41;
    if (sId.includes("women")) price = 55;
    if (sId.includes("boy")) price = 38;
    if (sId.includes("girl")) price = 50;

    addBooking({
      stylistId: currentStylist.id,
      clientName: `${logForm.firstName} ${logForm.lastName}`,
      clientEmail: logForm.email,
      clientPhone: logForm.phone,
      serviceId: sId,
      serviceName: logForm.service,
      price: price,
      date: logForm.date,
      timeSlot: logForm.timeSlot,
      type: logForm.type
    });
    setShowLogModal(false);
  }

  if (!authLoaded || !currentStylist) return null;

  const selDateStr = fmtDate(selectedDate);
  const dayBookings = bookings.filter(b => b.stylistId === currentStylist.id && b.date === selDateStr);
  const dayBlocks = unavailability.filter(u => u.stylistId === currentStylist.id && u.date === selDateStr);

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Good morning, {currentStylist.name.split(" ")[0]}</h1>
          <p style={{ color: "var(--color-text-muted)" }}>Here is your schedule overview.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => {
              setBlockForm(f => ({ ...f, date: fmtDate(selectedDate) }));
              setShowBlockModal(true);
            }} 
            className="btn btn-outline btn-sm">
            <Ban size={16} /> Add Unavailability
          </button>
          <button onClick={() => {
              setLogForm(f => ({ ...f, date: fmtDate(selectedDate) }));
              setShowLogModal(true);
            }}
            className="btn btn-primary btn-sm">
            <Plus size={16} /> Log Booking
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Weekly Calendar */}
        <div className="dashboard-panel">
          <div className="dash-cal-header">
            <button className="btn btn-outline btn-sm" style={{ padding: "0.3rem 0.6rem" }} onClick={handlePrevWeek}>&lt;</button>
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
              {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <button className="btn btn-outline btn-sm" style={{ padding: "0.3rem 0.6rem" }} onClick={handleNextWeek}>&gt;</button>
          </div>

          <div className="week-grid">
            {weekDates.map((date, i) => {
              const dStr = fmtDate(date);
              const isSel = dStr === selDateStr;
              const isToday = dStr === fmtDate(new Date());
              const bks = bookings.filter(b => b.stylistId === currentStylist.id && b.date === dStr);
              const blks = unavailability.filter(u => u.stylistId === currentStylist.id && u.date === dStr);

              return (
                <div 
                  key={dStr} 
                  className={`week-day-col ${isSel ? "selected" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className={`week-day-head ${isToday ? "today" : ""}`}>
                    <span className="w-name">{WEEKDAYS[i]}</span>
                    <span className="w-num">{date.getDate()}</span>
                  </div>
                  <div className="week-day-body">
                    {blks.map(blk => (
                      <div key={blk.id} className="mini-card block">Block</div>
                    ))}
                    {bks.map(bk => (
                      <div key={bk.id} className={`mini-card ${bk.type}`}>{bk.timeSlot}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Detail */}
        <div className="dashboard-panel">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {dayBlocks.length === 0 && dayBookings.length === 0 && (
              <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>No appointments or blocks for this date.</p>
            )}

            {dayBlocks.map(block => (
              <div key={block.id} className="detail-card block-detail">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Unavailable</strong>
                  <button className="del-btn" onClick={() => removeUnavailability(block.id)} aria-label="Remove block"><X size={14} /></button>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  <Clock size={12} style={{ display: "inline", marginRight: 4 }} /> {block.startTime} - {block.endTime}
                </div>
                {block.reason && <div style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Reason: {block.reason}</div>}
              </div>
            ))}

            {dayBookings.sort((a,b) => a.timeSlot.localeCompare(b.timeSlot)).map(bk => (
              <div key={bk.id} className={`detail-card ${bk.type}-detail`}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <strong style={{ fontSize: "1.1rem" }}>{bk.timeSlot}</strong>
                  <span className={`type-badge ${bk.type}`}>{bk.type}</span>
                </div>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{bk.clientName}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                  {bk.serviceName} • ${bk.price}
                </div>
                <div style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {bk.clientPhone && <span>📞 {bk.clientPhone}</span>}
                  {bk.clientEmail && <span>✉️ {bk.clientEmail}</span>}
                </div>
                <div style={{ marginTop: "1rem", textAlign: "right" }}>
                  <button className="del-btn text-only" onClick={() => removeBooking(bk.id)}>Cancel Booking</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {showBlockModal && (
        <div className="book-modal-backdrop">
          <div className="book-modal" style={{ maxWidth: 500 }}>
            <div className="book-modal-body">
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Add Unavailability</h2>
              <form onSubmit={handleAddBlock}>
                <div className="book-detail-row" style={{ gridTemplateColumns: "1fr" }}>
                  <input type="date" required className="book-input" value={blockForm.date} onChange={e => setBlockForm(f => ({...f, date: e.target.value}))} />
                </div>
                <div className="book-detail-row">
                  <div>
                    <label style={{ fontSize: "0.8rem", display: "block", marginBottom: 4 }}>Start Time</label>
                    <select className="book-input" value={blockForm.startTime} onChange={e => setBlockForm(f => ({...f, startTime: e.target.value}))}>
                      {STUB_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                      <option value="All Day">All Day</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", display: "block", marginBottom: 4 }}>End Time</label>
                    <select className="book-input" value={blockForm.endTime} onChange={e => setBlockForm(f => ({...f, endTime: e.target.value}))}>
                      {STUB_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                      <option value="All Day">All Day</option>
                    </select>
                  </div>
                </div>
                <div className="book-detail-row" style={{ gridTemplateColumns: "1fr" }}>
                  <input type="text" placeholder="Reason (Optional)" className="book-input" value={blockForm.reason} onChange={e => setBlockForm(f => ({...f, reason: e.target.value}))} />
                </div>
                <div className="book-modal-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowBlockModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Block</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showLogModal && (
        <div className="book-modal-backdrop">
          <div className="book-modal" style={{ maxWidth: 600 }}>
            <div className="book-modal-body">
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Log Manual Booking</h2>
              <form onSubmit={handleLogBooking}>
                <div className="book-detail-row" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <select className="book-input" value={logForm.type} onChange={e => setLogForm(f => ({...f, type: e.target.value as any}))}>
                    <option value="in-person">In-Person</option>
                    <option value="phone">Phone</option>
                  </select>
                  <input type="date" required className="book-input" value={logForm.date} onChange={e => setLogForm(f => ({...f, date: e.target.value}))} />
                  <select className="book-input" value={logForm.timeSlot} onChange={e => setLogForm(f => ({...f, timeSlot: e.target.value}))}>
                    {STUB_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="book-detail-row">
                  <input type="text" required placeholder="First Name" className="book-input" value={logForm.firstName} onChange={e => setLogForm(f => ({...f, firstName: e.target.value}))} />
                  <input type="text" required placeholder="Last Name" className="book-input" value={logForm.lastName} onChange={e => setLogForm(f => ({...f, lastName: e.target.value}))} />
                </div>
                <div className="book-detail-row">
                  <input type="email" placeholder="Email (optional)" className="book-input" value={logForm.email} onChange={e => setLogForm(f => ({...f, email: e.target.value}))} />
                  <input type="tel" placeholder="Phone" required className="book-input" value={logForm.phone} onChange={e => setLogForm(f => ({...f, phone: e.target.value}))} />
                </div>
                <div className="book-detail-row" style={{ gridTemplateColumns: "1fr" }}>
                  <select className="book-input" value={logForm.service} onChange={e => setLogForm(f => ({...f, service: e.target.value}))}>
                    <option value="Bang Cut">Bang Cut</option>
                    <option value="Men Cut">Men Cut</option>
                    <option value="Women Cut">Women Cut</option>
                    <option value="Student Boy Cut">Student Boy Cut</option>
                    <option value="Student Girl Cut">Student Girl Cut</option>
                  </select>
                </div>
                <div className="book-modal-actions">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowLogModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
