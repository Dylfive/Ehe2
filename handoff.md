# Project Handoff: Ehe Hair (WordPress-Free Replatforming)

> **Repository:** [https://github.com/Dylfive/Ehe2](https://github.com/Dylfive/Ehe2)  
> **GitHub Pages Live Deployment:** [https://dylfive.github.io/Ehe2/](https://dylfive.github.io/Ehe2/)  
> **Original Reference Site:** [https://ehehair.com](https://ehehair.com)  
> **Target Production Domain:** `ehehair.com`  

---

## 1. Executive Summary & Goal

This project completely rebuilds and decouples the **Ehe Hair** website away from WordPress, Astra theme, and WooCommerce. The goal is a fast, bespoke, modern web application with a streamlined salon shop, virtual consultation clinic, and direct appointment booking—without any WordPress dependencies.

---

## 2. Technical Stack & Architecture

* **Framework:** Next.js (App Router, v16.3.5) with React 19 & TypeScript.
* **Styling:** Bespoke Vanilla CSS (`src/app/globals.css`). No bloated utility frameworks. Uses CSS custom properties for theming, typography, and layout.
* **Fonts:** `Space Grotesk` (headings) and `Inter` (body), loaded via Google Fonts.
* **Icons:** `lucide-react`.
* **State Management:** React Context (`src/context/CartContext.tsx`) with automatic `localStorage` persistence.
* **Hosting / Deployment:** GitHub Pages using Next.js static export (`output: 'export'`) and automated CI/CD via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 3. Current State of the Codebase

### Completed Features & Pages
1. **Brand Identity & Colors:**
   - Restored the original Ehe Hair brand colors:
     - Primary Red Accent: `#C00802`
     - Bright Red Hover: `#E11B14`
     - Soft Red/Pink Tint: `#FBECED`
     - Deep Brand Dark: `#1D090B`
2. **Zero-Dependency SVG Logo (`src/components/Logo.tsx`):**
   - Replaced fragile image URL paths with an inline SVG component to prevent broken assets and 404s on subpaths like `/Ehe2/`.
3. **Multi-Language Selector (`src/components/LanguageSelector.tsx`):**
   - Implemented an interactive language selector in the header supporting:
     - 🇨🇦 **English** (`en`)
     - 🇫🇷 **Français** (`fr`)
     - 🇨🇳 **中文** (`zh-CN`)
     - 🇯🇵 **日本語** (`ja`)
     - 🇰🇷 **한국어** (`ko`)
   - Powered by an integrated Google Translate script in `src/app/layout.tsx` that actively translates page DOM elements.
4. **Product Catalog & E-Commerce (`src/data/products.ts`):**
   - 16 salon hair products (Paul Mitchell, Mitch, MVRCK, and Kids lines) complete with descriptions, categories, pricing, and images.
5. **Shop System:**
   - **`/shop`:** Real-time search bar, category filtering pills (*Styling, Shampoo, Conditioner, Kids*), and price/alphabetical sorting.
   - **`/product/[slug]`:** Statically generated dynamic product detail pages (`generateStaticParams`) with feature bullet points, quantity pickers, authentic product guarantees, and related products grid.
   - **Cart Drawer (`src/components/CartDrawer.tsx`):** Global slide-out drawer accessible from any page with live subtotal calculation and item count badge.
   - **`/cart`:** Dedicated cart page with itemized summary.
   - **`/checkout/success`:** Post-payment confirmation page that clears the cart upon arrival.
6. **Core Informational Pages:**
   - **Home (`/`):** 1:1 replica of original sections: Hero booking banner, 25+ experience counter, 4 beauty solutions, featured salon products, company background, value propositions, and customer reviews.
   - **About (`/about`):** Company background, mission, purpose, core values, and the post-pandemic virtual salon vision.
   - **Hair Clinic (`/hair-clinic`):** Explains Zoom consultation diagnostics for hair loss, balding, and custom wig styling.
   - **Contact (`/contact`):** Interactive booking/inquiry form, Victoria BC salon address, phone (+1 778-533-1456), email, and hours.

---

## 4. Pending Manual Setup (Action Items)

### A. Stripe Payment Gateway
* **Why it's currently simulated:** GitHub Pages is a purely static host (no Node.js backend to run server-side secret keys securely). Clicking "Checkout" currently simulates the flow by redirecting to `/checkout/success/`.
* **Path forward for next agent:**
  * **Option 1 (Fastest for GitHub Pages):** Create Stripe Payment Links in the client's Stripe Dashboard and set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK="https://buy.stripe.com/..."` in the environment.
  * **Option 2 (Full Dynamic E-Commerce):** Deploy to **Vercel** or a Node-compatible host where `/api/checkout` can execute with `STRIPE_SECRET_KEY` and return dynamic Stripe Checkout Sessions with line items.

### B. Contact Form Email Delivery
* `src/app/contact/page.tsx` has form validation and UI success states.
* **To deliver emails to `rainieh32@gmail.com`:** Connect a serverless form provider like **Formspree** (`https://formspree.io/f/YOUR_ID`), **Resend**, or **EmailJS**.

### C. Domain Cutover
* Once client approves, add a custom domain (`ehehair.com`) in GitHub Pages settings (or Vercel) and update DNS A/CNAME records to retire the old WordPress hosting.

---

## 5. Critical Next Priority: Mobile Viewing Optimization

> [!IMPORTANT]  
> The vast majority of salon clients, appointment bookers, and hair care shoppers visit on mobile devices (iOS Safari and Android Chrome). Mobile responsiveness must be thoroughly audited and perfected.

### Specific Mobile Optimization Checklist for the Incoming Agent:
1. **Viewport & Safe Areas (`100dvh`):**
   - Ensure the `CartDrawer` and full-page overlays use dynamic viewport units (`100dvh` instead of `100vh`) so mobile browser address bars (e.g., Safari bottom bar) do not clip buttons or subtotals.
2. **Sticky Mobile CTAs:**
   - On mobile Product Detail Pages (`/product/[slug]`), consider adding a compact sticky bottom bar with product price and a full-width "Add to Cart" button for frictionless thumb reach.
   - On the homepage, ensure "Book An Appointment" remains prominent without obstructing content.
3. **Form Ergonomics & iOS Zoom Prevention:**
   - Ensure all `<input>`, `<select>`, and `<textarea>` elements have a computed `font-size: 16px` (or `1rem`) on screens `< 768px` to prevent iOS Safari from automatically zooming into the page on tap.
4. **Touch Targets & Spacing:**
   - Audit all buttons, quantity modifiers (`+` / `-`), category filter pills, and navigation icons to ensure a minimum touch target size of **44px × 44px**.
5. **Mobile Navigation & Language Switcher:**
   - Verify that the mobile slide-down menu and language selector dropdown open cleanly without horizontal page jitter or overflow on small viewports (320px – 390px iPhone SE to iPhone 15).
6. **Image Layout Shifts (CLS):**
   - Ensure all product cards and hero banners have explicit aspect ratios to avoid Cumulative Layout Shift while images load over mobile cellular networks.

---

## 6. Helpful Commands

```bash
# Run local development server
npm run dev

# Run full production static export build
npm run build

# Deploy to GitHub Pages
git add .
git commit -m "Your commit message"
git push origin main
```
