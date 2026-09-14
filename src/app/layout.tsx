import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr,zh-CN,ja,ko',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
