import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: "var(--color-bg-subtle)", padding: "4.5rem 0 5.5rem" }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="badge" style={{ marginBottom: "1rem" }}>
                Discover Your Beauty Potential
              </span>
              <h1 style={{ marginBottom: "1.25rem", color: "var(--color-text-main)" }}>
                Elevate Your Beauty Routine with Ehe Hair
              </h1>
              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-muted)",
                  marginBottom: "2.25rem",
                  maxWidth: "540px",
                }}
              >
                Experience the perfect blend of skill and style at Ehe Hair, where every visit is a step toward your best self.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/book" className="btn btn-primary">
                  Book An Appointment
                </Link>
                <Link href="/shop" className="btn btn-outline">
                  Explore Shop
                </Link>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "550 / 670",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <Image
                  src="https://ehehair.com/wp-content/uploads/2024/09/pexels-photo-897271.jpeg"
                  alt="Ehe Hair Beauty Model"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Float badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  left: "-1.5rem",
                  background: "#FFFFFF",
                  padding: "1.25rem 1.75rem",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Premium Salon</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Craftsmanship & Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section style={{ padding: "3rem 0", borderBottom: "1px solid var(--color-border-subtle)", background: "#FFFFFF" }}>
        <div className="container">
          <div className="stats-row">
            <div className="stat-item">
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "3.2rem",
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  lineHeight: 1.1,
                }}
              >
                25<span style={{ color: "var(--color-accent)" }}>+</span>
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                Years Of Experience
              </div>
            </div>
            <div className="stats-divider" />
            <div className="stat-item">
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "3.2rem",
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  lineHeight: 1.1,
                }}
              >
                400<span style={{ color: "var(--color-accent)" }}>+</span>
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE BEAUTY SOLUTIONS */}
      <section style={{ padding: "6rem 0", backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 4rem" }}>
            <span className="badge" style={{ marginBottom: "1rem" }}>
              Explore Our Diverse Services
            </span>
            <h2 style={{ marginBottom: "1rem" }}>Our Comprehensive Beauty Solutions</h2>
            <p style={{ fontSize: "1.05rem" }}>
              From virtual consultations to expert tutorials, we have everything you need for a fabulous look.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                num: "01.",
                title: "Virtual Consultations",
                desc: "Get personalized beauty advice and expert hair care guidance from our salon team online.",
              },
              {
                num: "02.",
                title: "Product Recommendations",
                desc: "Discover the perfect products tailored specifically to nourish and protect your hair and skin.",
              },
              {
                num: "03.",
                title: "DIY Tutorials",
                desc: "Master the art of beauty with our professional step-by-step hair tutorials and guidance.",
              },
              {
                num: "04.",
                title: "Exclusive Multimedia Content",
                desc: "Access premium beauty insights, trend releases, and care strategies available only at Ehe Hair.",
              },
            ].map((service) => (
              <div
                key={service.num}
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-subtle)",
                  backgroundColor: "var(--color-bg-subtle)",
                  transition: "all var(--transition-normal)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    marginBottom: "1rem",
                  }}
                >
                  {service.num}
                </div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>{service.title}</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem", flex: 1 }}>
                  {service.desc}
                </p>
                <Link
                  href="/hair-clinic"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "var(--color-text-main)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SHOP PRODUCTS */}
      <section style={{ padding: "5.5rem 0", backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <span className="badge" style={{ marginBottom: "0.75rem" }}>
                Salon Shop
              </span>
              <h2>Featured Hair Care Products</h2>
              <p>Top stylist-approved formulas now available with direct checkout.</p>
            </div>
            <Link href="/shop" className="btn btn-outline btn-sm">
              View All 16+ Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEARN ABOUT EHE HAIR */}
      <section style={{ padding: "6rem 0", backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="home-split-grid">
            <div
              className="home-split-img"
              style={{
                position: "relative",
                aspectRatio: "572 / 500",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <Image
                src="https://ehehair.com/wp-content/uploads/2024/09/pexels-photo-3993120.jpeg"
                alt="Hair Stylist Working"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="home-split-text">
              <span className="badge" style={{ marginBottom: "1rem" }}>
                Learn About Ehe Hair
              </span>
              <h2 style={{ marginBottom: "1.25rem" }}>Innovative Beauty Solutions for You</h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Ehe Hair leads the way in beauty innovation, providing a smooth integration of services to elevate your beauty experience. From cutting-edge techniques to top shelf hair care products, we are committed to helping you look and feel your absolute best.
              </p>
              <Link href="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <div className="home-split-grid home-split-grid-reverse">
            <div>
              <span className="badge" style={{ marginBottom: "1rem" }}>
                Why Choose Us?
              </span>
              <h2 style={{ marginBottom: "2.5rem" }}>Our Unique Value Propositions</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {[
                  {
                    icon: <Sparkles size={20} color="var(--color-accent)" />,
                    title: "Digital",
                    desc: "Enjoy a seamless and hassle-free online booking and shopping experience today!",
                  },
                  {
                    icon: <Clock size={20} color="var(--color-accent)" />,
                    title: "Efficient",
                    desc: "Experience no waiting and arrive at your scheduled appointment time without unnecessary delays!",
                  },
                  {
                    icon: <Calendar size={20} color="var(--color-accent)" />,
                    title: "Plan Ahead",
                    desc: "Select your desired service, customize preferences, and secure your salon time ahead of time.",
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1.25rem" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.15rem", marginBottom: "0.35rem" }}>{item.title}</h3>
                      <p style={{ fontSize: "0.95rem" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="home-split-img"
              style={{
                position: "relative",
                aspectRatio: "550 / 650",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <Image
                src="https://ehehair.com/wp-content/uploads/2024/09/pexels-photo-3992859.jpeg"
                alt="Styling Salon Chair"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section
        style={{
          padding: "5rem 0",
          background: "linear-gradient(135deg, #1D090B 0%, #301014 100%)",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <span
            className="badge"
            style={{
              backgroundColor: "rgba(192, 8, 2, 0.2)",
              color: "#FFFFFF",
              marginBottom: "1.25rem",
            }}
          >
            Join the Beauty Revolution
          </span>
          <h2 style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
            Start Your Beauty Transformation Today
          </h2>
          <p
            style={{
              color: "#C5C2BD",
              fontSize: "1.1rem",
              lineHeight: 1.65,
              marginBottom: "2.25rem",
            }}
          >
            Sign up now to unlock the full potential of your beauty journey with Ehe Hair.
          </p>
          <Link href="/contact" className="btn btn-accent">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
