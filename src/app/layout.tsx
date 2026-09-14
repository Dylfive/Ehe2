import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ehehair.com"),
  title: "Ehe Hair | Salon Experience & Premium Hair Products",
  description: "Discover Your Beauty Potential. Elevate your beauty routine with Ehe Hair - experience the perfect blend of skill and style, plus top salon hair care products.",
  keywords: "Ehe Hair, hair salon, styling paste, Paul Mitchell, shampoo, hair clinic, beauty",
  openGraph: {
    title: "Ehe Hair | Salon Experience & Premium Hair Care",
    description: "Discover Your Beauty Potential. Elevate your beauty routine with Ehe Hair.",
    url: "https://ehehair.com",
    siteName: "Ehe Hair",
    images: [
      {
        url: "/site-logo-dark.svg",
        width: 120,
        height: 80,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
