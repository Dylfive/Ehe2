"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "Appointment Booking",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId) {
      setSubmitError("Contact form is not configured. Please call or email us directly.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message ?? "Failed to send message. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", padding: "4rem 0 6rem" }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 4rem" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            Get in Touch
          </span>
          <h1 style={{ marginBottom: "1rem" }}>Contact Us for Beauty Solutions</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)" }}>
            Whether you are booking a salon visit, scheduling a virtual consultation, or inquiring about our hair products, we are here to assist you.
          </p>
        </div>

        <div className="contact-page-grid">
          {/* Form */}
          <div
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Message Received!</h3>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
                  Thank you for reaching out to Ehe Hair. Our team will review your inquiry and contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.75rem" }}>Send a Message</h2>

                <div className="contact-name-grid">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Service / Inquiry
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Appointment Booking">In-Salon Appointment Booking</option>
                    <option value="Virtual Consultation">Virtual Consultation (Zoom Hair Clinic)</option>
                    <option value="Product Inquiries">Product Recommendations &amp; Inquiries</option>
                    <option value="General Support">General Inquiries</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your hair goals or preferred dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      backgroundColor: "#FFFFFF",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                {submitError && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#C00802",
                      backgroundColor: "#FBECED",
                      border: "1px solid #f5c6c6",
                      borderRadius: "6px",
                      padding: "0.75rem 1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div>
            <span className="badge" style={{ marginBottom: "0.75rem" }}>
              Direct Contact
            </span>
            <h2 style={{ fontSize: "1.85rem", marginBottom: "1rem" }}>Reach Out</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "2.5rem" }}>
              Let us know how we can enhance your beauty experience. Reach out by phone, email, or visit our Victoria location.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Phone</h4>
                  <a
                    href="tel:+17785331456"
                    style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--color-text-main)" }}
                  >
                    +1 778-533-1456
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Email</h4>
                  <a
                    href="mailto:rainieh32@gmail.com"
                    style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--color-text-main)" }}
                  >
                    rainieh32@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Address</h4>
                  <p style={{ fontSize: "1rem", color: "var(--color-text-main)", lineHeight: 1.5 }}>
                    3749 Shelbourne St #207<br />
                    Victoria, BC V8P 5N4
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Hours</h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--color-text-main)" }}>
                    Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
