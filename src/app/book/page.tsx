"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Clock, CheckCircle2 } from "lucide-react";
import { useSchedule } from "@/context/ScheduleContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "bang-cut",     name: "Bang Cut",        price: 20, duration: 30, image: "/images/services/bang_cut.jpg" },
  { id: "men-cut",      name: "Men Cut",          price: 41, duration: 30, image: "/images/services/men_cut.jpg" },
  { id: "women-cut",    name: "Women Cut",        price: 55, duration: 45, image: "/images/services/women_cut.jpg" },
  { id: "student-boy",  name: "Student Boy Cut",  price: 38, duration: 30, image: "/images/services/student_boy.jpg" },
  { id: "student-girl", name: "Student Girl Cut", price: 50, duration: 45, image: "/images/services/student_girl.jpg" },
] as const;

const STYLISTS = [
  { id: "terry-cho",    initials: "TC", name: "Terry Cho" },
  { id: "juana-lee",    initials: "JL", name: "Juana Lee" },
  { id: "betty-balmer", initials: "BB", name: "Betty Balmer" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];
type StylistId = (typeof STYLISTS)[number]["id"];
type Step = 1 | 2 | 3 | 4;

interface BookingState {
  serviceId: ServiceId | null;
  stylistId: StylistId | null;
  date: Date | null;
  timeSlot: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Placeholder time-slots — real availability can be wired to this later
const STUB_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM",
];

// ─── Calendar helpers ─────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // Monday = 0
  return { offset, daysInMonth };
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD format
}

function fmtDateLong(d: Date) {
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookPage() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [step, setStep] = useState<Step>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [booking, setBooking] = useState<BookingState>({
    serviceId: null, stylistId: null, date: null, timeSlot: null,
    firstName: "", lastName: "", email: "", phone: "",
  });

  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const { addBooking, bookings, unavailability } = useSchedule();

  const selectedService = SERVICES.find(s => s.id === booking.serviceId) ?? null;
  const selectedStylist = STYLISTS.find(s => s.id === booking.stylistId) ?? null;

  const canProceed = useMemo(() => {
    if (step === 1) return !!booking.serviceId;
    if (step === 2) return !!booking.stylistId && !!booking.date;
    if (step === 3) return !!booking.timeSlot;
    return !!(booking.firstName && booking.lastName && booking.email);
  }, [step, booking]);

  // ── navigation ──────────────────────────────────────────────────────────────

  function goNext() {
    if (!canProceed) return;
    const next = (step + 1) as Step;
    setStep(next);
    if (next === 3) setModalOpen(true);
  }

  function goBack() {
    if (step === 1) return;
    const prev = (step - 1) as Step;
    setStep(prev);
    if (step === 3 || step === 4) setModalOpen(false);
  }

  // ── calendar ────────────────────────────────────────────────────────────────

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  function selectDate(day: number) {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    if (d < today) return;
    setBooking(b => ({ ...b, date: d, timeSlot: null }));
  }

  const { offset, daysInMonth } = buildCalendar(calYear, calMonth);

  const availableSlots = useMemo(() => {
    if (!booking.stylistId || !booking.date) return STUB_SLOTS;
    const dateStr = fmtDate(booking.date);
    
    // Convert 12h time to minutes since midnight for easy range comparison
    const parseTime = (t: string) => {
      const [time, period] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (h === 12) h = period === "AM" ? 0 : 12;
      else if (period === "PM") h += 12;
      return h * 60 + m;
    };

    const isSlotBlocked = (slot: string) => {
      const slotMins = parseTime(slot);
      
      // Check bookings
      const hasBooking = bookings.some(b => 
        b.stylistId === booking.stylistId && 
        b.date === dateStr && 
        b.timeSlot === slot
      );
      if (hasBooking) return true;

      // Check unavailability blocks
      return unavailability.some(u => {
        if (u.stylistId !== booking.stylistId || u.date !== dateStr) return false;
        if (u.startTime === "All Day" || u.endTime === "All Day") return true;
        
        const startMins = parseTime(u.startTime);
        const endMins = parseTime(u.endTime);
        return slotMins >= startMins && slotMins < endMins;
      });
    };

    return STUB_SLOTS.filter(slot => !isSlotBlocked(slot));
  }, [booking.stylistId, booking.date, bookings, unavailability]);

  // ── time slot + submit ──────────────────────────────────────────────────────

  function pickSlot(slot: string) {
    setBooking(b => ({ ...b, timeSlot: slot }));
    setStep(4);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!booking.serviceId || !booking.stylistId || !booking.date || !booking.timeSlot || !selectedService) return;
    
    addBooking({
      stylistId: booking.stylistId,
      clientName: `${booking.firstName} ${booking.lastName}`,
      clientEmail: booking.email,
      clientPhone: booking.phone,
      serviceId: booking.serviceId,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: fmtDate(booking.date),
      timeSlot: booking.timeSlot,
      type: "online"
    });

    setModalOpen(false);
    setConfirmed(true);
  }

  // ── confirmation ────────────────────────────────────────────────────────────

  function resetBooking() {
    setConfirmed(false);
    setStep(1);
    setModalOpen(false);
    setBooking({ serviceId: null, stylistId: null, date: null, timeSlot: null,
                 firstName: "", lastName: "", email: "", phone: "" });
  }

  // ── render ──────────────────────────────────────────────────────────────────

  if (confirmed) {
    return (
      <div className="book-root">
        <div className="container" style={{ maxWidth: 680, textAlign: "center", padding: "6rem 1.5rem" }}>
          <div className="book-confirm-icon">
            <CheckCircle2 size={52} />
          </div>
          <h1 style={{ marginBottom: "1rem" }}>Appointment Requested!</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", marginBottom: "2.5rem" }}>
            Thank you, <strong>{booking.firstName} {booking.lastName}</strong>. We&apos;ll confirm your
            appointment shortly via <strong>{booking.email}</strong>.
          </p>
          <div className="book-confirm-summary">
            <div className="book-confirm-row"><span>Service</span><strong>{selectedService?.name}</strong></div>
            <div className="book-confirm-row"><span>Stylist</span><strong>{selectedStylist?.name}</strong></div>
            <div className="book-confirm-row">
              <span>Date &amp; Time</span>
              <strong>{booking.date ? fmtDateLong(booking.date) : "—"} at {booking.timeSlot}</strong>
            </div>
            <div className="book-confirm-row"><span>Price</span><strong>${selectedService?.price}.00</strong></div>
          </div>
          <button id="book-another-btn" className="btn btn-primary" onClick={resetBooking} style={{ marginTop: "2.5rem" }}>
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-root">
      {/* ── Page header ── */}
      <div className="book-page-top">
        <div className="container">
          <span className="badge" style={{ marginBottom: "0.5rem" }}>Online Booking</span>
          <h1 className="book-h1">Book An Appointment</h1>

          {/* Step breadcrumb */}
          <nav className="book-breadcrumb" aria-label="Booking steps">
            {(["Service", "Staff & Date", "Time", "Details"] as const).map((label, i) => {
              const s = (i + 1) as Step;
              const isActive = step === s;
              const isDone = step > s;
              return (
                <React.Fragment key={label}>
                  <button
                    className={`book-crumb${isActive ? " active" : ""}${isDone ? " done" : ""}`}
                    onClick={() => isDone && setStep(s)}
                    disabled={!isDone}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="book-crumb-num">{isDone ? "✓" : s}</span>
                    <span className="book-crumb-text">{label}</span>
                  </button>
                  {i < 3 && <span className="book-crumb-sep">›</span>}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container book-body">

        {/* ─── STEP 1: Service ─────────────────────────────────────────── */}
        {step === 1 && (
          <section>
            <p className="book-section-label">Please select a service</p>
            <div className="book-service-grid">
              {SERVICES.map(svc => (
                <button
                  key={svc.id}
                  id={`service-${svc.id}`}
                  className={`book-service-card${booking.serviceId === svc.id ? " selected" : ""}`}
                  onClick={() => setBooking(b => ({ ...b, serviceId: svc.id }))}
                >
                  <div className="book-service-hero" style={{ backgroundImage: `url(${svc.image})` }} />
                  <div className="book-service-body">
                    <div className="book-service-info">
                      <div className="book-service-meta">
                        <Clock size={13} />
                        <span>{svc.duration} min</span>
                      </div>
                      <div className="book-service-price">${svc.price}.00</div>
                    </div>
                    <div className="book-service-name">{svc.name}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="book-actions">
              <span />
              <button id="step1-next" className="btn btn-primary" disabled={!canProceed} onClick={goNext}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ─── STEP 2: Staff + Date ─────────────────────────────────────── */}
        {step === 2 && (
          <section>
            <p className="book-section-label">Choose a stylist and date</p>

            <div className="book-step2-layout">
              {/* Calendar */}
              <div className="book-cal-panel">
                <div className="book-cal-nav">
                  <button id="cal-prev" className="book-cal-nav-btn" onClick={prevMonth} aria-label="Previous month">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="book-cal-month">{MONTHS[calMonth]} {calYear}</span>
                  <button id="cal-next" className="book-cal-nav-btn" onClick={nextMonth} aria-label="Next month">
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="book-cal-grid">
                  {WEEKDAYS.map(d => <div key={d} className="book-cal-weekday">{d}</div>)}
                  {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const d = new Date(calYear, calMonth, day);
                    d.setHours(0, 0, 0, 0);
                    const isPast = d < today;
                    const isSel = booking.date?.toDateString() === d.toDateString();
                    const isToday = d.toDateString() === today.toDateString();
                    return (
                      <button
                        key={day}
                        id={`cal-day-${day}`}
                        className={`book-cal-day${isPast ? " past" : ""}${isSel ? " selected" : ""}${isToday ? " today" : ""}`}
                        disabled={isPast}
                        onClick={() => selectDate(day)}
                        aria-label={`${MONTHS[calMonth]} ${day} ${calYear}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Staff dropdown */}
                <div className="book-staff-filter">
                  <span className="book-staff-filter-label">Staff</span>
                  <select
                    id="staff-filter-select"
                    className="book-staff-select"
                    value={booking.stylistId ?? ""}
                    onChange={e => setBooking(b => ({
                      ...b,
                      stylistId: (e.target.value || null) as StylistId | null,
                    }))}
                  >
                    <option value="">Any</option>
                    {STYLISTS.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stylist cards */}
              <div className="book-stylist-area">
                <div className="book-stylist-grid">
                  {(booking.stylistId
                    ? STYLISTS.filter(st => st.id === booking.stylistId)
                    : STYLISTS
                  ).map(stylist => (
                    <button
                      key={stylist.id}
                      id={`stylist-${stylist.id}`}
                      className={`book-stylist-card${booking.stylistId === stylist.id ? " selected" : ""}`}
                      onClick={() =>
                        setBooking(b => ({
                          ...b,
                          stylistId: b.stylistId === stylist.id ? null : stylist.id,
                        }))
                      }
                    >
                      <div className="book-stylist-hero">
                        <div className="book-stylist-pill">
                          <span className="book-stylist-initials">{stylist.initials}</span>
                          <span className="book-stylist-name">{stylist.name}</span>
                        </div>
                      </div>
                      <div className="book-stylist-body">
                        {selectedService && (
                          <>
                            <div className="book-stylist-svc">{selectedService.name}</div>
                            <div className="book-stylist-meta">
                              <Clock size={13} /><span>{selectedService.duration} min</span>
                            </div>
                            <div className="book-stylist-price">${selectedService.price}.00</div>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="book-actions">
              <button id="step2-back" className="btn btn-outline" onClick={goBack}>
                <ChevronLeft size={16} /> Back
              </button>
              <button id="step2-next" className="btn btn-primary" disabled={!canProceed} onClick={goNext}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* ─── STEP 3 + 4 MODAL ──────────────────────────────────────────── */}
        {(step === 3 || step === 4) && modalOpen && (
          <div className="book-modal-backdrop" role="dialog" aria-modal="true" aria-label="Select time and enter details">
            <div className="book-modal">

              {/* Summary row */}
              <div className="book-modal-summary">
                <div className="book-modal-summary-col">
                  <div className="book-modal-label">Service</div>
                  <div className="book-modal-value">{selectedService?.name}</div>
                </div>
                <div className="book-modal-summary-col">
                  <div className="book-modal-label">Staff</div>
                  <div className="book-modal-value">{selectedStylist?.name}</div>
                </div>
                <div className="book-modal-summary-col">
                  <div className="book-modal-label">Date</div>
                  <div className="book-modal-value">
                    {booking.date ? fmtDateLong(booking.date) : "—"}
                    {step === 4 && booking.timeSlot ? ` ${booking.timeSlot.toLowerCase()}` : ""}
                  </div>
                </div>
                {step === 4 && (
                  <div className="book-modal-summary-col">
                    <div className="book-modal-label">Price</div>
                    <div className="book-modal-value">${selectedService?.price}.00</div>
                  </div>
                )}
              </div>
              <hr className="book-modal-hr" />

              {/* Step 3: time slots */}
              {step === 3 && (
                <div className="book-modal-body">
                  <p className="book-modal-instruction">Click on a time slot to proceed with booking</p>
                  <div className="book-time-slots">
                    {availableSlots.length > 0 ? availableSlots.map(slot => (
                      <button
                        key={slot}
                        id={`slot-${slot.replace(/[:\s]/g, "-")}`}
                        className={`book-slot-btn${booking.timeSlot === slot ? " selected" : ""}`}
                        onClick={() => pickSlot(slot)}
                      >
                        {slot}
                      </button>
                    )) : (
                      <p style={{ color: "var(--color-text-muted)" }}>No available time slots on this date.</p>
                    )}
                  </div>
                  <div className="book-modal-actions">
                    <button id="step3-back" className="btn btn-outline btn-sm" onClick={() => { setModalOpen(false); setStep(2); }}>
                      Back
                    </button>
                    <button id="step3-close" className="btn btn-outline btn-sm" onClick={() => { setModalOpen(false); setStep(2); }}>
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: customer details */}
              {step === 4 && (
                <form className="book-modal-body" onSubmit={handleSubmit}>
                  <p className="book-modal-instruction">
                    Please provide your details in the form below to proceed with the booking
                  </p>
                  <div className="book-detail-row">
                    <input
                      id="book-first-name"
                      type="text"
                      required
                      placeholder="First name"
                      className="book-input"
                      value={booking.firstName}
                      onChange={e => setBooking(b => ({ ...b, firstName: e.target.value }))}
                    />
                    <input
                      id="book-last-name"
                      type="text"
                      required
                      placeholder="Last name"
                      className="book-input"
                      value={booking.lastName}
                      onChange={e => setBooking(b => ({ ...b, lastName: e.target.value }))}
                    />
                  </div>
                  <div className="book-detail-row">
                    <input
                      id="book-email"
                      type="email"
                      required
                      placeholder="Email"
                      className="book-input"
                      value={booking.email}
                      onChange={e => setBooking(b => ({ ...b, email: e.target.value }))}
                    />
                    <input
                      id="book-phone"
                      type="tel"
                      placeholder="(506) 234-5678"
                      className="book-input"
                      value={booking.phone}
                      onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))}
                    />
                  </div>
                  <div className="book-modal-actions">
                    <button type="button" id="step4-back" className="btn btn-outline btn-sm" onClick={() => setStep(3)}>
                      Back
                    </button>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button type="button" id="step4-close" className="btn btn-outline btn-sm"
                        onClick={() => { setModalOpen(false); setStep(2); }}>
                        Close
                      </button>
                      <button
                        type="submit"
                        id="step4-book-now"
                        className="btn btn-accent btn-sm"
                        disabled={!booking.firstName || !booking.lastName || !booking.email}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
