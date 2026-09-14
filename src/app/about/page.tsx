import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Target, Globe } from "lucide-react";

export const metadata = {
  title: "About Us | Ehe Hair - Redefining Beauty Standards",
  description: "Learn about Ehe Hair's mission, values, and journey in redefining beauty through innovation, virtual consultations, and salon products.",
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Hero Banner */}
      <section style={{ backgroundColor: "var(--color-bg-subtle)", padding: "5rem 0 4rem", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <span className="badge" style={{ marginBottom: "1rem" }}>
            Discover Beauty Tech Innovation at
          </span>
          <h1 style={{ marginBottom: "1rem" }}>Ehe Hair &ndash; Redefining Beauty Standards</h1>
          <p style={{ fontSize: "1.15rem", color: "var(--color-text-muted)" }}>
            Empowering individuals to embrace their unique beauty confidently through innovative styling techniques, virtual care, and premier salon products.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section style={{ padding: "5.5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <Image
                src="https://ehehair.com/wp-content/uploads/2024/09/pexels-photo-3268732.jpeg"
                alt="Ehe Hair Salon Experience"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <span className="badge" style={{ marginBottom: "0.75rem" }}>
                Learn About Ehe Hair
              </span>
              <h2 style={{ marginBottom: "1.25rem" }}>What We Do</h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                At our salon, we aim to provide a comprehensive experience designed to meet all your hair and beauty needs. Our approach offers maximum accessibility, allowing you to stay beautiful wherever you are.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--color-text-muted)", marginBottom: "2rem" }}>
                Beyond basic features like appointment scheduling, online payments, and client management, our digital presence includes DIY hairstyle tutorials, hair clinic guidance, and professional advice from expert stylists. We also offer virtual consultations, product sales, and modern beauty solutions.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Explore Salon Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section style={{ padding: "5.5rem 0", backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem" }}>
            <span className="badge" style={{ marginBottom: "0.75rem" }}>
              Our Vision & Values
            </span>
            <h2>Mission & Values</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "3rem 2.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-subtle)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Target size={24} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent)", letterSpacing: "0.05em" }}>
                Our Purpose
              </span>
              <h3 style={{ fontSize: "1.35rem", margin: "0.5rem 0 1rem" }}>Empowering Beauty Confidence</h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                Ehe Hair is dedicated to empowering individuals to embrace their unique beauty confidently through innovative styling solutions, bespoke salon services, and personalized product recommendations.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "3rem 2.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-subtle)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Heart size={24} />
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-accent)", letterSpacing: "0.05em" }}>
                Guiding Principles
              </span>
              <h3 style={{ fontSize: "1.35rem", margin: "0.5rem 0 1rem" }}>Core Values</h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                At Ehe Hair, we uphold integrity, creativity, inclusivity, and excellence as our core values to deliver exceptional beauty experiences that inspire lasting self-confidence and empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: "5.5rem 0" }}>
        <div className="container">
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1200 / 480",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              marginBottom: "3.5rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Image
              src="https://ehehair.com/wp-content/uploads/2024/09/pexels-photo-3993447.jpeg"
              alt="Ehe Hair Salon Interior"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="badge" style={{ marginBottom: "0.75rem" }}>
              Growth & Success Story
            </span>
            <h2 style={{ marginBottom: "1.5rem" }}>Our Story</h2>

            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              The COVID-19 pandemic posed significant challenges for hair salons, but it also offered an opportunity to rethink and transform the industry. Entrepreneurs used this time to shift hairdressing businesses from physical locations to a robust online presence, benefiting both stylists and clients.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              Now, hair stylists can provide remote assistance, and clients can conveniently book their favorite stylists online and have salon-grade formulas shipped directly to their door.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: "2rem" }}>
              Ms. He envisions a revolutionary virtual salon that offers hair consultations and solutions for issues like hair loss, wigs, and maintenance, no matter where clients are located. Her goal is to break away from the traditional salon model and create an innovative platform that connects hairdressers with clients worldwide.
            </p>

            <Link href="/contact" className="btn btn-primary">
              Book A Virtual Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
