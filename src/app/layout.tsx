import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ConditionalShell from "@/components/ConditionalShell";

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
        {/* Hidden Google Translate mount point */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <CartProvider>
          <ConditionalShell>
            {children}
          </ConditionalShell>
        </CartProvider>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr,zh-CN,ja,ko',
                  autoDisplay: false,
                  layout: 0
                }, 'google_translate_element');
              }
              // Aggressively hide the Google Translate toolbar banner
              function hideGoogleBar() {
                var bar = document.querySelector('.goog-te-banner-frame');
                if (bar) bar.style.display = 'none';
                var body = document.body;
                if (body && body.style.top && body.style.top !== '0px') {
                  body.style.top = '0px';
                }
              }
              hideGoogleBar();
              var observer = new MutationObserver(hideGoogleBar);
              observer.observe(document.body, { childList: true, subtree: true, attributes: true });
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
