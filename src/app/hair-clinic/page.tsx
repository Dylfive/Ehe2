import React from "react";
import Link from "next/link";
import { Video, Calendar, ShieldCheck, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Hair Clinic – Virtual Consultation | Ehe Hair",
  description: "Meet with an Ehe Hair specialist via virtual consultation to diagnose and provide tailored solutions for hair loss, thinning, wigs, and scalp care.",
};

export default function HairClinicPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)", padding: "4rem 0 6rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            Virtual Consultation
          </span>
          <h1 style={{ marginBottom: "1.25rem" }}>Hair Clinic &ndash; Virtual Consultation</h1>
          <p style={{ fontSize: "1.15rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
            Hair Clinic is a virtual consultation Zoom room where you can meet 1-on-1 with a licensed hair specialist to diagnose and receive targeted solutions for hair loss, thinning, balding, wigs, and scalp restoration.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {[
            {
              icon: <Video size={28} color="var(--color-accent)" />,
              title: "Face-to-Face Zoom Session",
              desc: "Direct video consultation in privacy from the comfort of your home with our senior styling directors.",
            },
            {
              icon: <Sparkles size={28} color="var(--color-accent)" />,
              title: "Customized Hair Diagnosis",
              desc: "Comprehensive evaluation of scalp health, hair thinning patterns, or wig fitting recommendations.",
            },
            {
              icon: <ShieldCheck size={28} color="var(--color-accent)" />,
              title: "Targeted Product Plan",
              desc: "Get an exact regimen of salon-tested formulas and maintenance routines suited to your goals.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "2.5rem 2rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How It Works Box */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "3.5rem",
            boxShadow: "var(--shadow-md)",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge" style={{ marginBottom: "0.5rem" }}>Simple Process</span>
            <h2>How Your Consultation Works</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: "0.5rem" }}>
                Step 1
              </div>
              <h4 style={{ marginBottom: "0.5rem" }}>Request An Appointment</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                Submit your inquiry and preferred time window through our online booking portal.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: "0.5rem" }}>
                Step 2
              </div>
              <h4 style={{ marginBottom: "0.5rem" }}>Receive Your Zoom Link</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                We confirm your appointment and send private calendar credentials with your Zoom room link.
              </p>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: "0.5rem" }}>
                Step 3
              </div>
              <h4 style={{ marginBottom: "0.5rem" }}>Diagnose & Transform</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                Discuss your hair history, receive practical solutions, and get curated product pairings.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Schedule Your Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
